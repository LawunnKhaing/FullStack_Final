import express from 'express';
import { getActivities, addActivity, deleteActivity } from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.post('/', addActivity);
router.delete('/:id', deleteActivity);

export default router;
