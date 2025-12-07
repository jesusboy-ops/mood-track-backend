import prisma from '../prisma/client.js';

/**
 * Map mood to mood type (positive, neutral, negative)
 */
export const getMoodType = (mood) => {
  const moodMap = {
    happy: 'positive',
    excited: 'positive',
    calm: 'neutral',
    neutral: 'neutral',
    sad: 'negative',
    anxious: 'negative',
    angry: 'negative',
  };
  return moodMap[mood] || 'neutral';
};

/**
 * Get random motivational message by mood type
 */
export const getMotivationalMessage = async (moodType) => {
  const messages = await prisma.motivationalMessage.findMany({
    where: { moodType },
  });

  if (messages.length === 0) {
    return null;
  }

  // Return random message
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

/**
 * Get motivational message by mood
 */
export const getMotivationByMood = async (mood) => {
  const moodType = getMoodType(mood);
  return await getMotivationalMessage(moodType);
};

/**
 * Create motivational message (admin function)
 */
export const createMotivationalMessage = async (moodType, content) => {
  return await prisma.motivationalMessage.create({
    data: {
      moodType,
      content,
    },
  });
};

/**
 * Get all motivational messages
 */
export const getAllMotivationalMessages = async () => {
  return await prisma.motivationalMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Seed initial motivational messages
 */
export const seedMotivationalMessages = async () => {
  const messages = [
    // Positive messages
    { moodType: 'positive', content: '🌟 Keep shining! Your positive energy is contagious!' },
    { moodType: 'positive', content: '✨ Amazing! You\'re doing great. Keep up the good vibes!' },
    { moodType: 'positive', content: '🎉 Your happiness is inspiring! Share that smile with the world!' },
    { moodType: 'positive', content: '💫 You\'re radiating positivity! Keep spreading that joy!' },
    { moodType: 'positive', content: '🌈 What a wonderful mood! Remember this feeling!' },
    
    // Neutral messages
    { moodType: 'neutral', content: '🌿 Balance is beautiful. Take time to appreciate the calm.' },
    { moodType: 'neutral', content: '☁️ Steady and stable. You\'re doing just fine.' },
    { moodType: 'neutral', content: '🍃 Sometimes neutral is exactly what we need. Be present.' },
    { moodType: 'neutral', content: '🌊 Riding the waves of life with grace. Keep going.' },
    { moodType: 'neutral', content: '🕊️ Peace in the ordinary. You\'re exactly where you need to be.' },
    
    // Negative messages
    { moodType: 'negative', content: '💪 Tough times don\'t last, but tough people do. You\'ve got this!' },
    { moodType: 'negative', content: '🌱 Every storm runs out of rain. Better days are coming.' },
    { moodType: 'negative', content: '🤗 It\'s okay to not be okay. Be gentle with yourself today.' },
    { moodType: 'negative', content: '🌅 This feeling is temporary. You\'re stronger than you know.' },
    { moodType: 'negative', content: '💙 Take a deep breath. You\'re doing better than you think.' },
    { moodType: 'negative', content: '🌟 Even the darkest night will end and the sun will rise.' },
    { moodType: 'negative', content: '🫂 You\'re not alone. Reach out if you need support.' },
  ];

  const existingCount = await prisma.motivationalMessage.count();
  
  if (existingCount === 0) {
    await prisma.motivationalMessage.createMany({
      data: messages,
    });
    return messages.length;
  }
  
  return 0;
};

export default {
  getMotivationalMessage,
  getMotivationByMood,
  createMotivationalMessage,
  getAllMotivationalMessages,
  seedMotivationalMessages,
  getMoodType,
};
