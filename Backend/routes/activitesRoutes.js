import express from 'express';
import { getActivities, addActivity, deleteActivity } from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities, getActivities);
router.post('/', addActivity);
router.delete('/:id', deleteActivity);

export default router;
