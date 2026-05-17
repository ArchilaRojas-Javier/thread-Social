import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './config/database';
import './models'; // initialize associations

import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';

const app = express();
const PORT = Number(process.env['PORT'] ?? 3000);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', likeRoutes);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const start = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log('Connexion à la base de données établie.');

  await sequelize.sync({ alter: process.env['NODE_ENV'] === 'development' });
  console.log('Tables synchronisées.');

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error('Erreur au démarrage :', err);
  process.exit(1);
});
