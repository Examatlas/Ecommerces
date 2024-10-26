import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LearnerSignupChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Active Learners',
        data: [50, 100, 150, 200, 300, 500, 800], // Rising trend
        borderColor: 'rgba(173, 216, 230, 1)', // Purple
        backgroundColor: 'rgba(173, 216, 230, 1)',
        tension: 0.4, // Curve effect for a smooth spike
      },
      {
        label: 'New Signups',
        data: [30, 60, 90, 120, 180, 250, 400], // Rising trend
        borderColor: 'rgba(0, 0, 139, 1)', // Yellow
        backgroundColor: 'rgba(0, 0, 139, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active Learners and New Signups',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
    },
  };

  return (
    <div className="lg:w-[800px] md:w-[520px] sm:w-[500px] w-[380px] md:ml-6 m-2">
        <h1 className='text-2xl mr-[650px]'>Monthly Signups</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LearnerSignupChart;
