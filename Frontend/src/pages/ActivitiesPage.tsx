import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Activity {
  id: number;
  title: string;
  description: string;
  url?: string;
  createdAt: string;
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-activity/${id}`);
  };

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      axios.delete(`http://localhost:5000/api/activities/${id}`)
        .then(response => {
          console.log('Activity deleted successfully.', response.data);
          setActivities(activities.filter(activity => activity.id !== id));
        })
        .catch(error => console.error(`Error: ${error}`));
    }
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
      <h1 className="mb-4">Activities</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate('/add-activity')}>Add New Activity</button>
      </div>
      <div className="list-group">
        {activities.map(activity => (
          <div key={activity.id} className="list-group-item">
            <h2 className="mb-2">{activity.title}</h2>
            <p className="mb-1">{activity.description}</p>
            <p className="mb-1">URL: {activity.url}</p>
            <p className="mb-1">Date Created: {formatDate(activity.createdAt)}</p>
            <button className="btn btn-primary me-2" onClick={() => handleEdit(activity.id)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleRemove(activity.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
