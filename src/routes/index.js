import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import moodRoutes from './moodRoutes.js';
import journalRoutes from './journalRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import reminderRoutes from './reminderRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import motivationRoutes from './motivationRoutes.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MoodMate API is running' });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/moods', moodRoutes);
router.use('/journals', journalRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reminders', reminderRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/motivation', motivationRoutes);

export default router;
