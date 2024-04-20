import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests

interface Task {
  name: string;
  description: string;
}

const EditTaskPage: React.FC = () => {
  const [task, setTask] = useState<Task>({ name: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Make an API call to update the task
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
  
      // Display a success message
      window.alert('Task updated successfully!');
  
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      window.alert('An error occurred while updating the task. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  

  return (
        <div className="container mt-5">
          <h1>Edit Task</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="taskName" className="form-label">Name</label>
              <input type="text" className="form-control" id="taskName" name="name" value={task.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">Description</label>
              <textarea className="form-control" id="taskDescription" name="description" rows={3} value={task.description} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Update Task</button>
          </form>
        </div>
      );
};

export default EditTaskPage;