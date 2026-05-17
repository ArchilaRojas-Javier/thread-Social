import { Router } from 'express';
import {
  createPost,
  getFeed,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getFeed);
router.get('/:id', getPost);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

export default router;
