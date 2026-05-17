import { Router } from 'express';
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// /api/posts/:postId/comments
router.get('/:postId/comments', getCommentsByPost);
router.post('/:postId/comments', authenticate, createComment);
router.delete('/comments/:id', authenticate, deleteComment);

export default router;
