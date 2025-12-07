import { asyncHandler } from '../utils/asyncHandler.js';
import * as userService from '../services/userService.js';

/**
 * Get user profile
 * GET /api/users/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  const user = await userService.getUserProfile(userId);
  
  res.json({ user });
});

/**
 * Update user profile
 * PUT /api/users/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const avatarFile = req.file;
  
  const user = await userService.updateUserProfile(userId, data, avatarFile);
  
  res.json({
    message: 'Profile updated',
    user,
  });
});

/**
 * Get user stats
 * GET /api/users/stats
 */
export const getStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  const stats = await userService.getUserStats(userId);
  
  res.json({ stats });
});
