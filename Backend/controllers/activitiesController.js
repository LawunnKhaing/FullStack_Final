import { Activity } from '../models/index.js';

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).send("Activity not found");
    }
    res.json(activity);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Activity.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send("Activity deleted");
    }
    throw new Error("Activity not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
  export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).send("Activity not found");
    }
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Activity.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedActivity = await Activity.findByPk(id);
      return res.json(updatedActivity);
    }
    throw new Error("Activity not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

