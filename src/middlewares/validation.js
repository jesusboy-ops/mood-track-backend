import { z } from 'zod';

/**
 * Validate request body against Zod schema
 * @param {z.ZodSchema} schema - Zod schema
 * @returns {Function} Express middleware
 */
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// Validation schemas
export const schemas = {
  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),

  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),

  googleAuth: z.object({
    token: z.string().min(1, 'Token is required'),
  }),

  moodEntry: z.object({
    mood: z.enum(['happy', 'sad', 'anxious', 'calm', 'excited', 'angry', 'neutral']),
    note: z.string().optional(),
  }),

  journalEntry: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    moodEntryId: z.string().uuid().optional(),
  }),

  reminder: z.object({
    message: z.string().min(1, 'Message is required'),
    time: z.string().datetime('Invalid datetime format'),
    repeat: z.enum(['none', 'daily', 'weekly']).default('none'),
  }),

  updateProfile: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    theme: z.enum(['light', 'dark']).optional(),
  }),
};
