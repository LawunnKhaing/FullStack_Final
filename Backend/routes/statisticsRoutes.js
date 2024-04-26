import express from 'express';
import { getStats} from '../controllers/statisticsController.js';

const router = express.Router();

router.get('/tasks/stats', getStats);


export default router;
