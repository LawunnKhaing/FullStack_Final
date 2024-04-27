import express from 'express';
import { getTasks, addTask, deleteTask, getTaskById, updateTask } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);


export default router;