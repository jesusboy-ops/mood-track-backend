import express from 'express';
import * as motivationController from '../controllers/motivationController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get motivational message by mood
router.get('/:mood', motivationController.getMotivationByMood);

// Get all motivational messages (admin)
router.get('/', motivationController.getAllMotivations);

// Create motivational message (admin)
router.post('/', motivationController.createMotivation);

// Seed motivational messages (admin)
router.post('/seed', motivationController.seedMotivations);

export default router;
