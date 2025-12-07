import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', analyticsController.getAnalytics);
router.get('/history', analyticsController.getAnalyticsHistory);

export default router;
