import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import activitiesRouter from './routes/activitesRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Using environment variables from .env file
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(express.json());
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
