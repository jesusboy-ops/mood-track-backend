import prisma from '../prisma/client.js';

/**
 * Create notification
 */
export const createNotification = async (userId, message) => {
  const notification = await prisma.notification.create({
    data: {
      userId,
      message,
    },
  });
  return notification;
};

/**
 * Get user notifications
 */
export const getUserNotifications = async (userId, unreadOnly = false) => {
  const where = { userId };
  if (unreadOnly) {
    where.read = false;
  }

  const notifications = await prisma.notification.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return notifications;
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (id, userId) => {
  await prisma.notification.updateMany({
    where: { id, userId },
    data: { read: true },
  });
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
};

/**
 * Delete notification
 */
export const deleteNotification = async (id, userId) => {
  await prisma.notification.deleteMany({
    where: { id, userId },
  });
};
