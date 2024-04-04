import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddActivityPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activityData = {
      title,
      description,
      url,
    };

    try {
      const response = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }

      const data = await response.json();
      console.log(data);

      navigate('/activities');
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add New Activity</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="activityTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="activityTitle" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="activityDescription" className="form-label">Description</label>
          <textarea className="form-control" id="activityDescription" rows={3} value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="activityUrl" className="form-label">URL (optional)</label>
          <input type="url" className="form-control" id="activityUrl" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddActivityPage;
