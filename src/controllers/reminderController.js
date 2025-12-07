import { asyncHandler } from '../utils/asyncHandler.js';
import * as reminderService from '../services/reminderService.js';

/**
 * Create reminder
 * POST /api/reminders
 */
export const createReminder = asyncHandler(async (req, res) => {
  const { message, time, repeat } = req.body;
  const userId = req.user.id;
  
  const reminder = await reminderService.createReminder(userId, message, time, repeat);
  
  res.status(201).json({
    message: 'Reminder created',
    reminder,
  });
});

/**
 * Get user reminders
 * GET /api/reminders
 */
export const getReminders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const activeOnly = req.query.activeOnly === 'true';
  
  const reminders = await reminderService.getUserReminders(userId, activeOnly);
  
  res.json({ reminders });
});

/**
 * Update reminder
 * PUT /api/reminders/:id
 */
export const updateReminder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = req.body;
  
  await reminderService.updateReminder(id, userId, data);
  
  res.json({ message: 'Reminder updated' });
});

/**
 * Delete reminder
 * DELETE /api/reminders/:id
 */
export const deleteReminder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  await reminderService.deleteReminder(id, userId);
  
  res.json({ message: 'Reminder deleted' });
});
