import express from 'express';
import { getActivities, addActivity, deleteActivity, getActivityById } from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.post('/', addActivity);
router.delete('/:id', deleteActivity);
router.get('/:id', getActivityById);

export default router;
