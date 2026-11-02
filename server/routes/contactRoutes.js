import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact (Public)
router.post('/', submitContact);

export default router;
