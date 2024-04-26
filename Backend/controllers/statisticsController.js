import { Activity, Task } from '../models/index.js';

export const getStats = async (req, res) => {
  try {
    const activitiesCount = await Activity.count();
    const tasksCount = await Task.count();
    const completedTasksCount = await Task.count({ where: { status: 'completed' } });

    res.json({
      activities: activitiesCount,
      tasks: tasksCount,
      completedTasks: completedTasksCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};