import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const { user, token } = await authService.registerUser(name, email, password);
  
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  });
});

/**
 * Login user
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { user, token } = await authService.loginUser(email, password);
  
  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  });
});

/**
 * Google OAuth login
 * POST /api/auth/google
 */
export const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;
  
  const { user, token: jwtToken } = await authService.googleLogin(token);
  
  res.json({
    message: 'Google login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token: jwtToken,
  });
});

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.token);
  
  res.json({ message: 'Logout successful' });
});

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
});
