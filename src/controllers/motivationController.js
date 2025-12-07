import { asyncHandler } from '../utils/asyncHandler.js';
import * as motivationService from '../services/motivationService.js';

/**
 * Get motivational message by mood type
 * GET /api/motivation/:mood
 */
export const getMotivationByMood = asyncHandler(async (req, res) => {
  const { mood } = req.params;

  // Validate mood type
  const validMoodTypes = ['positive', 'neutral', 'negative'];
  const validMoods = ['happy', 'sad', 'anxious', 'calm', 'excited', 'angry', 'neutral'];

  let moodType;
  
  if (validMoodTypes.includes(mood)) {
    moodType = mood;
  } else if (validMoods.includes(mood)) {
    moodType = motivationService.getMoodType(mood);
  } else {
    return res.status(400).json({
      error: 'Invalid mood. Must be one of: happy, sad, anxious, calm, excited, angry, neutral, positive, negative',
    });
  }

  const message = await motivationService.getMotivationalMessage(moodType);

  if (!message) {
    return res.status(404).json({
      error: 'No motivational messages found for this mood type',
    });
  }

  res.json({
    motivation: message,
    moodType,
  });
});

/**
 * Get all motivational messages (admin)
 * GET /api/motivation
 */
export const getAllMotivations = asyncHandler(async (req, res) => {
  const messages = await motivationService.getAllMotivationalMessages();
  
  res.json({
    motivations: messages,
    count: messages.length,
  });
});

/**
 * Create motivational message (admin)
 * POST /api/motivation
 */
export const createMotivation = asyncHandler(async (req, res) => {
  const { moodType, content } = req.body;

  // Validate mood type
  const validMoodTypes = ['positive', 'neutral', 'negative'];
  if (!validMoodTypes.includes(moodType)) {
    return res.status(400).json({
      error: 'Invalid mood type. Must be: positive, neutral, or negative',
    });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({
      error: 'Content is required',
    });
  }

  const message = await motivationService.createMotivationalMessage(moodType, content);

  res.status(201).json({
    message: 'Motivational message created',
    motivation: message,
  });
});

/**
 * Seed motivational messages (admin)
 * POST /api/motivation/seed
 */
export const seedMotivations = asyncHandler(async (req, res) => {
  const count = await motivationService.seedMotivationalMessages();

  if (count === 0) {
    return res.json({
      message: 'Motivational messages already seeded',
    });
  }

  res.json({
    message: `Successfully seeded ${count} motivational messages`,
    count,
  });
});
