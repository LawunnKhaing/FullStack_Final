import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TasksPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Example tasks list (This should ideally come from your API)
  const tasks = [
    { id: 1, name: "Task 1", description: "Description for Task 1" },
    // Add more tasks
  ];

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate('/add-task')}>Add New Task</button>
      </div>
      <div className="list-group">
        {tasks.map(task => (
          <a href="#" className="list-group-item list-group-item-action" key={task.id}>
            <h5 className="mb-1">{task.name}</h5>
            <p className="mb-1">{task.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
