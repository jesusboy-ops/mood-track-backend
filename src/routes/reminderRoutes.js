import express from 'express';
import * as reminderController from '../controllers/reminderController.js';
import { validate, schemas } from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(schemas.reminder), reminderController.createReminder);
router.get('/', reminderController.getReminders);
router.put('/:id', reminderController.updateReminder);
router.delete('/:id', reminderController.deleteReminder);

export default router;
