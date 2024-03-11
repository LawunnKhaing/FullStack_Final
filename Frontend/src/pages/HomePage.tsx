import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Task and Activity Manager</h1>
      <p>This is your go-to app for managing tasks and activities efficiently.</p>
      <div className="mt-4">
        <Link to="/tasks" className="btn btn-primary me-2">View Tasks</Link>
        <Link to="/activities" className="btn btn-primary me-2">View Activities</Link>
        <Link to="/statistics" className="btn btn-primary me-2">View Statistics</Link>
      </div>
    </div>
  );
};

export default HomePage;
