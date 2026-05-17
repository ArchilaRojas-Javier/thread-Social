import { Request, Response } from 'express';
import { Like, Post } from '../models';

export const toggleLike = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params['postId']);
  const userId = req.user!.id;

  const post = await Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  const existing = await Like.findOne({ where: { userId, postId } });

  if (existing) {
    await existing.destroy();
    res.json({ liked: false, likesCount: await Like.count({ where: { postId } }) });
  } else {
    await Like.create({ userId, postId });
    res.status(201).json({ liked: true, likesCount: await Like.count({ where: { postId } }) });
  }
};

export const getLikesByPost = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params['postId']);

  const post = await Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  const count = await Like.count({ where: { postId } });
  const userLiked =
    req.user != null
      ? (await Like.findOne({ where: { postId, userId: req.user.id } })) !== null
      : false;

  res.json({ likesCount: count, liked: userLiked });
};
