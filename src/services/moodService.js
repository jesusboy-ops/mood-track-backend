import prisma from '../prisma/client.js';

/**
 * Create mood entry
 */
export const createMoodEntry = async (userId, mood, note) => {
  const moodEntry = await prisma.moodEntry.create({
    data: {
      userId,
      mood,
      note,
    },
  });
  return moodEntry;
};

/**
 * Get user mood entries
 */
export const getUserMoodEntries = async (userId, limit = 50) => {
  const entries = await prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      JournalEntry: true,
    },
  });
  return entries;
};

/**
 * Get mood entry by ID
 */
export const getMoodEntryById = async (id, userId) => {
  const entry = await prisma.moodEntry.findFirst({
    where: { id, userId },
    include: {
      JournalEntry: true,
    },
  });
  return entry;
};

/**
 * Update mood entry
 */
export const updateMoodEntry = async (id, userId, data) => {
  const entry = await prisma.moodEntry.updateMany({
    where: { id, userId },
    data,
  });
  return entry;
};

/**
 * Delete mood entry
 */
export const deleteMoodEntry = async (id, userId) => {
  await prisma.moodEntry.deleteMany({
    where: { id, userId },
  });
};
