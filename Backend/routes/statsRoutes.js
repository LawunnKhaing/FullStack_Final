import express from 'express';
import { getStats } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
