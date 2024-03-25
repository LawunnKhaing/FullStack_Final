import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'; // Combine imports for cleanliness

// Example activity data type
interface Activity {
  id: number;
  title: string;
  description: string;
  url?: string; // Removed since 'Learn more' link is no longer needed
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const navigate = useNavigate();

  // Simulate fetching data from an API
  useEffect(() => {
    // Placeholder for fetching activities data from an API
    setActivities([
      { id: 1, title: 'Hiking Trip', description: 'Exploring the mountains' },
      { id: 2, title: 'Book Club', description: 'Discussing our latest read' },
      // Add more activities here
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate('/add-activity')}>Add New Activity</button>
      </div>
      <div className="list-group">
        {activities.map(activity => (
          <div key={activity.id} className="list-group-item list-group-item-action">
            {/* Removed the Link component and use span with styles for text appearance */}
            <div className="mb-2" style={{ color: 'black', textDecoration: 'none' }}>
              <h5 className="mb-1">{activity.title}</h5>
              <p className="mb-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;