import { Router } from 'express';
import { toggleLike, getLikesByPost } from '../controllers/likeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// /api/posts/:postId/likes
router.get('/:postId/likes', authenticate, getLikesByPost);
router.post('/:postId/likes', authenticate, toggleLike);

export default router;
