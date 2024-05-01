import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Tag {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  status: string;
  tags: Tag[];
  activityId: number;

}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        //console.log("Received data:", response.data);  // Log the received data
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
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:5000/api/tasks/${id}`)
        .then(response => {
          console.log('Task deleted successfully.', response.data);
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  };

  const handleMarkAsCompleted = (id: number) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { status: 'completed', endDate: new Date().toISOString() })
      .then(response => {
        console.log('Task marked as completed successfully.', response.data);
        setTasks(tasks.map(task => task.id === id ? { ...task, status: 'completed', endDate: new Date().toISOString() } : task));
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
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };
  
  
  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/add-task')}>Add a New Task</button>
      </div>
      {tasks.map(task => (
        <div key={task.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{task.name}</h5>
            <div>
              {task.status === 'completed' ? 
                <strong>Completed: {formatDate(task.endDate)}</strong> : 
                <div className="text-right">
                  <strong className="me-0">In Progress</strong>
                </div>
              }
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">{task.description}</p>
            <p className="card-text mb-1">  {/* Adjusted margin for closer alignment */}
              Tags: {task.tags && task.tags.length > 0 ? task.tags.map(tag => tag.name).join(', ') : 'No Tags'}
            </p>
            <div className="d-flex align-items-center"> {/* Added align-items-center for vertical alignment */}
              <p className="mb-1 me-1">Date Created: {formatDate(task.createdAt)}</p>
              {task.createdAt !== task.updatedAt && 
                <p className="mb-1"><em>(Last Updated: {formatDate(task.updatedAt)})</em></p>}
            </div>
            <div className="mt-2">
              <button className="btn btn-primary me-2" onClick={() => handleEdit(task.id)}>Edit</button>
              <button className="btn btn-danger me-2" onClick={() => handleRemove(task.id)}>Remove</button>
              {task.status === 'in_progress' && (
                <button className="btn btn-success" onClick={() => handleMarkAsCompleted(task.id)}>Mark as Completed</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default TasksPage;