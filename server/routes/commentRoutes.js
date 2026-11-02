import express from 'express';
import protect from '../middleware/auth.js';
import { getComments, createComment } from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

// Mounted as /api/blog/:postId/comments
// GET (Public)
router.get('/', getComments);
// POST (Protected)
router.post('/', protect, createComment);

export default router;
