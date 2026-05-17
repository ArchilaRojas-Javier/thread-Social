import { Request, Response } from 'express';
import { Comment, Post, User } from '../models';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body as { content?: string };
  const postId = Number(req.params['postId']);

  if (!content?.trim()) {
    res.status(400).json({ error: 'Le contenu est requis' });
    return;
  }

  const post = await Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  const comment = await Comment.create({
    content: content.trim(),
    userId: req.user!.id,
    postId,
  });

  const withAuthor = await Comment.findByPk(comment.id, {
    include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
  });

  res.status(201).json(withAuthor);
};

export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params['postId']);

  const post = await Post.findByPk(postId);
  if (!post) {
    res.status(404).json({ error: 'Post introuvable' });
    return;
  }

  const comments = await Comment.findAll({
    where: { postId },
    include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    order: [['createdAt', 'ASC']],
  });

  res.json(comments);
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const comment = await Comment.findByPk(req.params['id'] as string);

  if (!comment) {
    res.status(404).json({ error: 'Commentaire introuvable' });
    return;
  }

  if (comment.userId !== req.user!.id) {
    res.status(403).json({ error: 'Non autorisé' });
    return;
  }

  await comment.destroy();
  res.status(204).send();
};
