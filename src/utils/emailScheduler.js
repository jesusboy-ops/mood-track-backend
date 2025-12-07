import prisma from '../prisma/client.js';
import { sendEmail } from '../config/email.js';
import logger from './logger.js';

/**
 * Check and send due reminders
 */
export const checkReminders = async () => {
  try {
    const now = new Date();
    
    // Find all active reminders that are due
    const dueReminders = await prisma.reminder.findMany({
      where: {
        active: true,
        time: {
          lte: now,
        },
      },
      include: {
        User: true,
      },
    });

    for (const reminder of dueReminders) {
      // Send email
      await sendEmail(
        reminder.User.email,
        'MoodMate Reminder',
        `Hello ${reminder.User.name},\n\n${reminder.message}\n\nBest regards,\nMoodMate Team`
      );

      // Handle repeat logic
      if (reminder.repeat === 'daily') {
        const nextTime = new Date(reminder.time);
        nextTime.setDate(nextTime.getDate() + 1);
        await prisma.reminder.update({
          where: { id: reminder.id },
          data: { time: nextTime },
        });
      } else if (reminder.repeat === 'weekly') {
        const nextTime = new Date(reminder.time);
        nextTime.setDate(nextTime.getDate() + 7);
        await prisma.reminder.update({
          where: { id: reminder.id },
          data: { time: nextTime },
        });
      } else {
        // One-time reminder, deactivate it
        await prisma.reminder.update({
          where: { id: reminder.id },
          data: { active: false },
        });
      }

      logger.info(`Reminder sent to ${reminder.User.email}`);
    }
  } catch (error) {
    logger.error('Error checking reminders:', error);
  }
};

/**
 * Start reminder scheduler (check every minute)
 */
export const startReminderScheduler = () => {
  setInterval(checkReminders, 60000); // Check every minute
  logger.info('Reminder scheduler started');
};
