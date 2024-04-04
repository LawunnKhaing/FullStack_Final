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
      setUrl(data.url);
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
      url,
      createdAt: activity?.createdAt || '',
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

      alert('The update was successful');
      navigate('/activities');
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <div>
      <h2>Edit Activity</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          URL:
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <button type="submit">Update Activity</button>
      </form>
    </div>
  );
};

export default EditActivityPage;