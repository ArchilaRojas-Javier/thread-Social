import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT'] ?? 5432),
  username: process.env['DB_USER'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? '',
  database: process.env['DB_NAME'] ?? 'thread_social',
  logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
  define: {
    underscored: false,
    timestamps: true,
  },
});

export default sequelize;
