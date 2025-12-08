import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database.js';
import { setupSocket } from './src/config/socket.js';
import { startReminderScheduler } from './src/utils/emailScheduler.js';
import { startMotivationScheduler } from './src/utils/motivationScheduler.js';
import routes from './src/routes/index.js';
import { errorHandler, notFoundHandler } from './src/middlewares/errorHandler.js';
import logger from './src/utils/logger.js';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

// Create necessary directories
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Mount API routes
app.use('/api', routes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize services
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('🚀 Starting MoodMate Backend...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    console.log('🔌 Port:', PORT);
    console.log('💾 Database URL exists:', !!process.env.DATABASE_URL);
    console.log('🔑 JWT Secret exists:', !!process.env.JWT_SECRET);
    
    // Connect to database
    console.log('📡 Connecting to database...');
    await connectDatabase();
    console.log('✅ Database connected successfully');
    
    // Initialize Socket.io
    console.log('🔌 Setting up Socket.io...');
    setupSocket(server);
    console.log('✅ Socket.io configured');
    
    // Start reminder scheduler
    console.log('⏰ Starting reminder scheduler...');
    startReminderScheduler();
    console.log('✅ Reminder scheduler started');
    
    // Start motivational notification scheduler
    console.log('💪 Starting motivation scheduler...');
    startMotivationScheduler();
    console.log('✅ Motivation scheduler started');
    
    // Start server
    server.listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`💾 Database connected: ${!!process.env.DATABASE_URL}`);
      logger.info(`🔗 Health check: http://0.0.0.0:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Start the server (only in non-serverless environment)
if (process.env.VERCEL !== '1') {
  startServer();
}

// Export app for Vercel
export default app;
