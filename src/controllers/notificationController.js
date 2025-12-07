import { asyncHandler } from '../utils/asyncHandler.js';
import * as notificationService from '../services/notificationService.js';

/**
 * Get user notifications
 * GET /api/notifications
 */
export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const unreadOnly = req.query.unreadOnly === 'true';
  
  const notifications = await notificationService.getUserNotifications(userId, unreadOnly);
  
  res.json({ notifications });
});

/**
 * Mark notification as read
 * PUT /api/notifications/:id/read
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  await notificationService.markNotificationAsRead(id, userId);
  
  res.json({ message: 'Notification marked as read' });
});

/**
 * Mark all notifications as read
 * PUT /api/notifications/read-all
 */
export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  await notificationService.markAllNotificationsAsRead(userId);
  
  res.json({ message: 'All notifications marked as read' });
});

/**
 * Delete notification
 * DELETE /api/notifications/:id
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  await notificationService.deleteNotification(id, userId);
  
  res.json({ message: 'Notification deleted' });
});
