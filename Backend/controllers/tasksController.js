import { Task } from '../models/index.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.json({ message: `Task with id ${id} deleted.` });
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.update({ status });
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};