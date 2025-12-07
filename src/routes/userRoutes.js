import express from 'express';
import * as userController from '../controllers/userController.js';
import { validate, schemas } from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', upload.single('avatar'), userController.updateProfile);
router.get('/stats', userController.getStats);

export default router;
