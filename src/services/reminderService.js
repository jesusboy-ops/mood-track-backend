import prisma from '../prisma/client.js';

/**
 * Create reminder
 */
export const createReminder = async (userId, message, time, repeat = 'none') => {
  const reminder = await prisma.reminder.create({
    data: {
      userId,
      message,
      time: new Date(time),
      repeat,
    },
  });
  return reminder;
};

/**
 * Get user reminders
 */
export const getUserReminders = async (userId, activeOnly = false) => {
  const where = { userId };
  if (activeOnly) {
    where.active = true;
  }

  const reminders = await prisma.reminder.findMany({
    where,
    orderBy: { time: 'asc' },
  });
  return reminders;
};

/**
 * Update reminder
 */
export const updateReminder = async (id, userId, data) => {
  if (data.time) {
    data.time = new Date(data.time);
  }

  const reminder = await prisma.reminder.updateMany({
    where: { id, userId },
    data,
  });
  return reminder;
};

/**
 * Delete reminder
 */
export const deleteReminder = async (id, userId) => {
  await prisma.reminder.deleteMany({
    where: { id, userId },
  });
};
