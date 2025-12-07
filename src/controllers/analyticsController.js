import { asyncHandler } from '../utils/asyncHandler.js';
import * as analyticsService from '../services/analyticsService.js';

/**
 * Get mood analytics
 * GET /api/analytics
 */
export const getAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const days = parseInt(req.query.days) || 30;
  
  const analytics = await analyticsService.getMoodAnalytics(userId, days);
  
  res.json({ analytics });
});

/**
 * Get analytics history
 * GET /api/analytics/history
 */
export const getAnalyticsHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 10;
  
  const history = await analyticsService.getAnalyticsHistory(userId, limit);
  
  res.json({ history });
});
