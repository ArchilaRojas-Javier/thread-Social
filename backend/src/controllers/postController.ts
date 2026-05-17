import { Request, Response } from 'express';
import { Post, User, Comment, Like } from '../models';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body as { content?: string };

  if (!content?.trim()) {
    res.status(400).json({ error: 'Le contenu est requis' });
    return;
  }

  const post = await Post.create({ content: content.trim(), userId: req.user!.id });
  res.status(201).json(post);
};

export const getFeed = async (_req: Request, res: Response): Promise<void> => {
  const posts = await Post.findAll({
    include: [
      { model: User, as: 'author', attributes: ['id', 'username'] },
      { model: Comment, as: 'comments', attributes: ['id'] },
      { model: Like, as: 'likes', attributes: ['id'] },
    ],
    order: [['createdAt', 'DESC']],
  });

  const data = posts.map((p) => ({
    id: p.id,
    content: p.content,
    createdAt: p.createdAt,
    author: (p as unknown as { author: { id: number; username: string } }).author,
    commentsCount: ((p as unknown as { comments: unknown[] }).comments ?? []).length,
    likesCount: ((p as unknown as { likes: unknown[] }).likes ?? []).length,
  }));

  res.json(data);
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findByPk(req.params['id'] as string, {
    include: [
      { model: User, as: 'author', attributes: ['id', 'username'] },
      {
        model: Comment,
        as: 'comments',
        include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
        order: [['createdAt', 'ASC']],
      },
      { model: Like, as: 'likes', attributes: ['id', 'userId'] },
    ],
  });

  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  res.json(post);
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findByPk(req.params['id'] as string);

  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  if (post.userId !== req.user!.id) {
    res.status(403).json({ error: 'Non autorisé' });
    return;
  }

  const { content } = req.body as { content?: string };
  if (!content?.trim()) {
    res.status(400).json({ error: 'Le contenu est requis' });
    return;
  }

  await post.update({ content: content.trim() });
  res.json(post);
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findByPk(req.params['id'] as string);

  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  if (post.userId !== req.user!.id) {
    res.status(403).json({ error: 'Non autorisé' });
    return;
  }

  await post.destroy();
  res.status(204).send();
};
