import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StatisticsPage: React.FC = () => {
  const [data, setData] = useState({ activities: 0, tasks: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const chartData = {
    labels: ['Activities', 'Tasks'],
    datasets: [
      {
        label: 'Count',
        data: [data.activities, data.tasks],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1>Task Progression</h1>
      <div className="row">
        <div className="col">
          <h2>Tasks</h2>
          <p>Here you can view the progress of your tasks.</p>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

