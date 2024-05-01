import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Activity {
  id: number;
  title: string;
  description: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  status: string;
  tags: string;
  activittyType: string;
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

  const handleMarkAsCompleted = (id: number) => {
    axios.put(`http://localhost:5000/api/activities/${id}`, { status: 'completed', endDate: new Date().toISOString() })
      .then(response => {
        console.log('Activity marked as completed successfully.', response.data);
        setActivities(activities.map(activity => activity.id === id ? { ...activity, status: 'completed', endDate: new Date().toISOString() } : activity));
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
      <h1 className="mb-4">Activities</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/add-activity')}>Add a New Activity</button>
      </div>
      {activities.map(activity => (
        <div key={activity.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{activity.title}</h5>
            <div>
              {activity.status === 'completed' ? 
                <strong>Completed: {formatDate(activity.endDate)}</strong> : 
                <div className="text-right">
                  <strong className="me-0">In Progress</strong>
                </div>
              }
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">{activity.description}</p>
            {activity.url && <p className="card-text mb-1">URL: {activity.url}</p>}
            <div className="d-flex align-items-center">
              <p className="mb-1 me-1">Date Created: {formatDate(activity.createdAt)}</p>
              {activity.createdAt !== activity.updatedAt && 
                <p className="mb-1"><em>(Last Updated: {formatDate(activity.updatedAt)})</em></p>}
            </div>
            <div>
              <button className="btn btn-primary me-2" onClick={() => handleEdit(activity.id)}>Edit</button>
              <button className="btn btn-danger me-2" onClick={() => handleRemove(activity.id)}>Remove</button>
              <button className="btn btn-success" onClick={() => handleMarkAsCompleted(activity.id)}>Mark as Completed</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default ActivitiesPage;
