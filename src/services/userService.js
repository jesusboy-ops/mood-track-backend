import prisma from '../prisma/client.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      theme: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, data, avatarFile) => {
  let updateData = { ...data };

  // Upload avatar if provided
  if (avatarFile) {
    const result = await uploadToCloudinary(avatarFile.path, 'moodmate/avatars');
    updateData.avatar = result.url;
    
    // Delete local file
    await fs.unlink(avatarFile.path);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      theme: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

/**
 * Get user stats
 */
export const getUserStats = async (userId) => {
  const [moodCount, journalCount, reminderCount] = await Promise.all([
    prisma.moodEntry.count({ where: { userId } }),
    prisma.journalEntry.count({ where: { userId } }),
    prisma.reminder.count({ where: { userId, active: true } }),
  ]);

  return {
    totalMoodEntries: moodCount,
    totalJournalEntries: journalCount,
    activeReminders: reminderCount,
  };
};
