import { asyncHandler } from '../utils/asyncHandler.js';
import * as journalService from '../services/journalService.js';

/**
 * Create journal entry
 * POST /api/journals
 */
export const createJournal = asyncHandler(async (req, res) => {
  const { title, content, moodEntryId } = req.body;
  const userId = req.user.id;
  const imageFile = req.file;
  
  const journalEntry = await journalService.createJournalEntry(
    userId,
    title,
    content,
    moodEntryId,
    imageFile
  );
  
  res.status(201).json({
    message: 'Journal entry created',
    journalEntry,
  });
});

/**
 * Get user journal entries
 * GET /api/journals
 */
export const getJournals = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 50;
  
  const entries = await journalService.getUserJournalEntries(userId, limit);
  
  res.json({ journalEntries: entries });
});

/**
 * Get journal entry by ID
 * GET /api/journals/:id
 */
export const getJournalById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const entry = await journalService.getJournalEntryById(id, userId);
  
  if (!entry) {
    return res.status(404).json({ error: 'Journal entry not found' });
  }
  
  res.json({ journalEntry: entry });
});

/**
 * Update journal entry
 * PUT /api/journals/:id
 */
export const updateJournal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content, moodEntryId } = req.body;
  const imageFile = req.file;
  
  await journalService.updateJournalEntry(
    id,
    userId,
    { title, content, moodEntryId },
    imageFile
  );
  
  res.json({ message: 'Journal entry updated' });
});

/**
 * Delete journal entry
 * DELETE /api/journals/:id
 */
export const deleteJournal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  await journalService.deleteJournalEntry(id, userId);
  
  res.json({ message: 'Journal entry deleted' });
});
