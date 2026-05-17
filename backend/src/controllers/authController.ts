import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const signToken = (user: InstanceType<typeof User>): string => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) throw new Error('JWT_SECRET non défini');
  type TokenExpiry = Exclude<jwt.SignOptions['expiresIn'], undefined>;
  const expiresIn = (process.env['JWT_EXPIRES_IN'] ?? '7d') as TokenExpiry;
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    secret,
    { expiresIn }
  );
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body as {
    username?: string;
    email?: string;
    password?: string;
  };

  if (!username || !email || !password) {
    res.status(400).json({ error: 'username, email et password sont requis' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Le mot de passe doit faire au moins 6 caractères' });
    return;
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'Cet email est déjà utilisé' });
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashed });

  const token = signToken(user);
  res.status(201).json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email et password sont requis' });
    return;
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401).json({ error: 'Identifiants invalides' });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ error: 'Identifiants invalides' });
    return;
  }

  const token = signToken(user);
  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
};

export const me = (req: Request, res: Response): void => {
  const u = req.user!;
  res.json({ id: u.id, username: u.username, email: u.email });
};
