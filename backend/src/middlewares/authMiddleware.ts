import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }
}

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token manquant ou mal formé' });
    return;
  }

  const token = authHeader.slice(7); // strip 'Bearer '

  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    res.status(500).json({ error: 'Configuration serveur invalide' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as unknown as JwtPayload;
    const user = await User.findByPk(payload.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(401).json({ error: 'Utilisateur introuvable' });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
