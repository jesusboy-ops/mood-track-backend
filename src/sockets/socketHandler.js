import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import logger from '../utils/logger.js';

let io;
const userSockets = new Map(); // Map userId to socket IDs

/**
 * Initialize Socket.io
 */
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user.id;
      socket.user = user;
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.userId}`);
    
    // Store socket connection
    if (!userSockets.has(socket.userId)) {
      userSockets.set(socket.userId, new Set());
    }
    userSockets.get(socket.userId).add(socket.id);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.userId}`);
      const sockets = userSockets.get(socket.userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          userSockets.delete(socket.userId);
        }
      }
    });

    // Handle custom events
    socket.on('notification:read', async (data) => {
      try {
        await prisma.notification.update({
          where: { id: data.notificationId },
          data: { read: true },
        });
        socket.emit('notification:updated', { notificationId: data.notificationId });
      } catch (error) {
        logger.error('Error marking notification as read:', error);
      }
    });
  });

  logger.info('Socket.io initialized');
  return io;
};

/**
 * Emit event to specific user
 */
export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

/**
 * Send notification to user
 */
export const sendNotification = async (userId, message) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
      },
    });

    emitToUser(userId, 'notification:new', notification);
    return notification;
  } catch (error) {
    logger.error('Error sending notification:', error);
  }
};

export default { initializeSocket, emitToUser, sendNotification };
