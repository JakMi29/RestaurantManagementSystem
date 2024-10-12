import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartComponent = ({ dataset, xLabel, yLabel, title, dataKey, labelKey }) => {
  const chartData = {
    labels: dataset.map(data => data[labelKey]),
    datasets: [
      {
        label: title,
        data: dataset.map(data => data[dataKey]),
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        borderColor: 'rgba(33, 150, 243, 1)', 
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(60, 60, 211,0.7)',
        hoverBorderColor: 'rgba(60, 60, 211,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        callbacks: {
          label: function (context) {
            return `${title}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
          font: {
            size: 16,
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          font: {
            size: 16,
          },
        },
        ticks: {
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
