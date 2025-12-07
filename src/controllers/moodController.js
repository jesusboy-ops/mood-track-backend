import { asyncHandler } from '../utils/asyncHandler.js';
import * as moodService from '../services/moodService.js';
import * as motivationService from '../services/motivationService.js';
import { emitToUser } from '../sockets/socketHandler.js';

/**
 * Create mood entry
 * POST /api/moods
 */
export const createMood = asyncHandler(async (req, res) => {
  const { mood, note } = req.body;
  const userId = req.user.id;
  
  const moodEntry = await moodService.createMoodEntry(userId, mood, note);
  
  // Get motivational message for this mood
  const motivation = await motivationService.getMotivationByMood(mood);
  
  // Emit real-time notification
  emitToUser(userId, 'mood:created', moodEntry);
  
  res.status(201).json({
    message: 'Mood entry created',
    moodEntry,
    motivation: motivation || undefined,
  });
});

/**
 * Get user mood entries
 * GET /api/moods
 */
export const getMoods = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 50;
  
  const entries = await moodService.getUserMoodEntries(userId, limit);
  
  res.json({ moodEntries: entries });
});

/**
 * Get mood entry by ID
 * GET /api/moods/:id
 */
export const getMoodById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const entry = await moodService.getMoodEntryById(id, userId);
  
  if (!entry) {
    return res.status(404).json({ error: 'Mood entry not found' });
  }
  
  res.json({ moodEntry: entry });
});

/**
 * Update mood entry
 * PUT /api/moods/:id
 */
export const updateMood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { mood, note } = req.body;
  
  await moodService.updateMoodEntry(id, userId, { mood, note });
  
  res.json({ message: 'Mood entry updated' });
});

/**
 * Delete mood entry
 * DELETE /api/moods/:id
 */
export const deleteMood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  await moodService.deleteMoodEntry(id, userId);
  
  res.json({ message: 'Mood entry deleted' });
});
