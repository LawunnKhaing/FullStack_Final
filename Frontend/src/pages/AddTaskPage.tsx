import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests

const AddTaskPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make an API call to create a new task
    await axios.post('http://localhost:5000/api/tasks', { name, description });

    navigate('/tasks');
  };

  return (
    <div className="container mt-5">
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Name</label>
          <input type="text" className="form-control" id="taskName" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Description</label>
          <textarea className="form-control" id="taskDescription" rows={3} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
