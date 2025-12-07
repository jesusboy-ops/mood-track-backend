import express from 'express';
import * as journalController from '../controllers/journalController.js';
import { validate, schemas } from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', upload.single('image'), journalController.createJournal);
router.get('/', journalController.getJournals);
router.get('/:id', journalController.getJournalById);
router.put('/:id', upload.single('image'), journalController.updateJournal);
router.delete('/:id', journalController.deleteJournal);

export default router;
