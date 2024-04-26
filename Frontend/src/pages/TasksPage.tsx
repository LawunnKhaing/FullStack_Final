import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  status: string;

}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-task/${id}`);
  };

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      axios.delete(`http://localhost:5000/api/tasks/${id}`)
        .then(response => {
          console.log('Task deleted successfully.', response.data);
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  };

  const handleMarkAsCompleted = (id: number) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { status: 'completed' })
      .then(response => {
        console.log('Task marked as completed successfully.', response.data);
        setTasks(tasks.map(task => task.id === id ? { ...task, status: 'completed' } : task));
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };
  

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/add-task')}>Add New Task</button>
      </div>
      <div className="list-group">
        {tasks.map(task => (
          <div className="list-group-item" key={task.id}>
            <h5 className="mb-1">{task.name}</h5>
            <p className="mb-1">{task.description}</p>
            <p className="mb-1">Date Created: {formatDate(task.createdAt)}</p>
            <p className="mb-1">Status: {task.status === 'completed' ? 'Completed' : 'In Progress'}</p>
            {task.createdAt !== task.updatedAt && <p className="mb-1"><em>Last Updated: {formatDate(task.updatedAt)}</em></p>}
            <br />
            <button className="btn btn-primary me-2" onClick={() => handleEdit(task.id)}>Edit</button>
            <button className="btn btn-danger me-2" onClick={() => handleRemove(task.id)}>Remove</button>
            {task.status === 'in_progress' && (
              <button className="btn btn-success" onClick={() => handleMarkAsCompleted(task.id)}>Mark as Completed</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;