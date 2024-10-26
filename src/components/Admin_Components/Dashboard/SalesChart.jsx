import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Online Sales',
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        backgroundColor: 'rgba(173, 216, 230, 0.8)', // Purple color
        borderColor: 'rgba(173, 216, 230, 0.8)',
        borderWidth: 1,
      },
      {
        label: 'Direct Sales',
        data: [10000, 17000, 2000, 7000, 15000, 25000],
        backgroundColor: 'rgba(0, 0, 139, 0.8)', // Yellow color
        borderColor: 'rgba(0,0,139, 0.8)',
        borderWidth: 1,
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
        text: 'Sales Data',
      },
    },
  };

  return (
    <div className="lg:w-[800px] md:w-[520px] sm:w-[500px] w-[380px] md:ml-6 ml-1">
         <h1 className='text-2xl mr-[650px] mt-10 '>Monthly Sales</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
