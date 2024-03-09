import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AddTaskPage from './pages/AddTaskPage';
import AddActivityPage from './pages/AddActivityPage';

// Import other pages

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/add-activity" element={<AddActivityPage />} />
        {/* Define routes for other components or pages */}
      </Routes>
    </Router>
  );
};

export default App;
