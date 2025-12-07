import express from 'express';
import * as moodController from '../controllers/moodController.js';
import { validate, schemas } from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(schemas.moodEntry), moodController.createMood);
router.get('/', moodController.getMoods);
router.get('/:id', moodController.getMoodById);
router.put('/:id', validate(schemas.moodEntry), moodController.updateMood);
router.delete('/:id', moodController.deleteMood);

export default router;
