import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  title: string;
  description: string;
  url?: string;
  createdAt: string;
}

const EditActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(activity);
  }, [activity])

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/activities/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch activity');
      }
      const data = await res.json();
      setActivity(data);
      setTitle(data.title);
      setDescription(data.description);
      setUrl(data.url || '');
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedActivity = {
      title,
      description,
      url
    };

    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      alert('The activity was updated successfully.');
      navigate('/activities');
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Activity</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="activityTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="activityTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="activityDescription" className="form-label">Description</label>
          <textarea className="form-control" id="activityDescription" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="activityUrl" className="form-label">URL (optional)</label>
          <input type="url" className="form-control" id="activityUrl" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Activity</button>
      </form>
    </div>
  );
};

export default EditActivityPage;
