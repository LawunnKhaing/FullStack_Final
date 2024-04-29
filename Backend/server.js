import express from 'express';
import cors from 'cors';
import activitiesRouter from './routes/activitesRoutes.js';
import tasksRouter from './routes/tasksRoutes.js';
import statsRouter from './routes/statsRoutes.js';
import dotenv from 'dotenv';
import { connectAndSyncDb } from './models/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect and sync database
connectAndSyncDb().catch((err) => {
  console.error('Unable to connect to the database:', err);
});

app.use(cors());
app.use(express.json());
app.use('/api/activities', activitiesRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/stats', statsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});