import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests

const AddTaskPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // Add a new state variable for tags
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make an API call to create a new task
    await axios.post('http://localhost:5000/api/tasks', { 
      name, 
      description, 
      tags: tags.split(',').map((tag: string) => tag.trim()),  // Split the tags by comma and trim whitespace
    });

    navigate('/tasks');
  };

  return (
    <div className="container mt-5">
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Name</label>
          <input type="text" className="form-control" id="taskName" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Description</label>
          <textarea className="form-control" id="taskDescription" rows={3} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="taskTags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="taskTags" value={tags} onChange={e => setTags(e.target.value)} placeholder="Currently not working(?)" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
