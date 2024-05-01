import { Task, Tag } from '../models/index.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{
        model: Tag,
        as: 'Tags',
        through: { attributes: [] }
      }],
    });
    console.log("Tasks with tags:", tasks);  // Log the tasks with their tags
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send(error);
  }
};



export const addTask = async (req, res) => {
  const { name, description, tags } = req.body;
  try {
    // Create a new task without tags
    const task = await Task.create({ name, description });
    // Handle tags if they are provided
    if (tags && tags.length) {
      // Find existing tags or create new ones and avoid duplicates
      const tagsToAdd = await Promise.all(
        tags.map(tagName =>
          Tag.findOrCreate({
            where: { name: tagName.trim() },
            defaults: { name: tagName.trim() }
          }).then(([tag]) => tag) // Destructure the findOrCreate response to get the tag instance
        )
      );

      // Associate the found/created tags with the new task
      await task.setTags(tagsToAdd);
    }

    // Fetch the newly created task with associated tags to return in the response
    const returnTask = await Task.findByPk(task.id, {
      include: [{ model: Tag, as: 'Tags' }]
    });

    // Return the created task along with its tags
    res.status(201).json(returnTask);
  } catch (error) {
    console.error('Error creating task with tags:', error);
    res.status(500).json({ message: 'Error creating task with tags', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.json({ message: `Task with id ${id} deleted.` });
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id, {
      include: [{
        model: Tag,
        as: 'Tags', // Again, ensure the alias matches
        through: { attributes: [] }
      }]
    });
    res.json(task);
  } catch (error) {
    console.error('Error fetching task by id:', error);
    res.status(500).send(error);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let endDate;
  if (status === 'completed') {
    endDate = new Date();
  }
  const [updated] = await Task.update({ ...req.body, endDate }, {
    where: { id: id }
  });
  if (updated) {
    const updatedTask = await Task.findByPk(id);
    return res.json(updatedTask);
  }
  res.status(404).json({ message: 'Task not found' });
};


export const getTasksByStatus = async (req, res) => {
  const { status } = req.params;
  const tasks = await Task.findAll({ where: { status } });
  res.json(tasks);
}
