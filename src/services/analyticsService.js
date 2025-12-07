import prisma from '../prisma/client.js';

/**
 * Get mood analytics for user
 */
export const getMoodAnalytics = async (userId, days = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get mood entries
  const moodEntries = await prisma.moodEntry.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Calculate mood counts
  const moodCounts = {};
  moodEntries.forEach((entry) => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  // Calculate trend data (daily mood distribution)
  const trendData = {};
  moodEntries.forEach((entry) => {
    const date = entry.createdAt.toISOString().split('T')[0];
    if (!trendData[date]) {
      trendData[date] = {};
    }
    trendData[date][entry.mood] = (trendData[date][entry.mood] || 0) + 1;
  });

  // Save analytics log
  await prisma.analyticsLog.create({
    data: {
      userId,
      moodCounts,
      trendData,
    },
  });

  return {
    moodCounts,
    trendData,
    totalEntries: moodEntries.length,
    period: `${days} days`,
  };
};

/**
 * Get analytics history
 */
export const getAnalyticsHistory = async (userId, limit = 10) => {
  const logs = await prisma.analyticsLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return logs;
};
