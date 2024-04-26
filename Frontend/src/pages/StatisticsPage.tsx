import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StatisticsPage = () => {
  const [data, setData] = useState({ activities: 0, tasks: 0, completedTasks: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Activities', 'Tasks', 'Completed Tasks'],
    datasets: [
      {
        label: 'Count',
        data: [data.activities, data.tasks, data.completedTasks],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="container mt-5">
      <h1>Activities and Tasks Progression</h1>
      <div className="row">
        <div className="col">
          <h2>Charts for activities and tasks</h2>
          <p>Here you can view the progress of your activities and tasks.</p>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;