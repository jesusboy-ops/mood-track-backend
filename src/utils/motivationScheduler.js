import prisma from '../prisma/client.js';
import * as motivationService from '../services/motivationService.js';
import { sendNotification } from '../sockets/socketHandler.js';
import { sendEmail } from '../config/email.js';
import logger from './logger.js';

/**
 * Send motivational notifications to users based on their last mood
 */
export const sendMotivationalNotifications = async () => {
  try {
    logger.info('Starting motivational notification scheduler');

    // Get all users with their last mood entry
    const users = await prisma.user.findMany({
      include: {
        MoodEntry: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    let notificationsSent = 0;

    for (const user of users) {
      // Skip users without mood entries
      if (user.MoodEntry.length === 0) {
        continue;
      }

      const lastMood = user.MoodEntry[0];
      const moodType = motivationService.getMoodType(lastMood.mood);

      // Get motivational message
      const motivation = await motivationService.getMotivationalMessage(moodType);

      if (!motivation) {
        logger.warn(`No motivational message found for mood type: ${moodType}`);
        continue;
      }

      // Create notification in database and send via Socket.io
      await sendNotification(user.id, motivation.content);

      // Optional: Send email notification
      try {
        await sendEmail(
          user.email,
          'MoodMate Motivation',
          `Hello ${user.name},\n\n${motivation.content}\n\nKeep tracking your mood and stay motivated!\n\nBest regards,\nMoodMate Team`
        );
      } catch (emailError) {
        logger.error(`Failed to send motivation email to ${user.email}:`, emailError);
        // Don't fail the whole process if email fails
      }

      notificationsSent++;
      logger.info(`Sent motivational notification to user ${user.id} (${user.email})`);
    }

    logger.info(`Motivational notifications sent: ${notificationsSent} out of ${users.length} users`);
  } catch (error) {
    logger.error('Error in motivational notification scheduler:', error);
  }
};

/**
 * Start motivational notification scheduler (runs every 7 hours)
 */
export const startMotivationScheduler = () => {
  const SEVEN_HOURS = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

  // Run immediately on startup
  sendMotivationalNotifications();

  // Then run every 7 hours
  setInterval(sendMotivationalNotifications, SEVEN_HOURS);

  logger.info('Motivational notification scheduler started (runs every 7 hours)');
};

export default {
  sendMotivationalNotifications,
  startMotivationScheduler,
};
