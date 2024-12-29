import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ChartComponentProps {
  dataset: any[];
  xLabel: string;
  yLabel: string;
  title: string;
  dataKey: string;
  labelKey: string;
}

const ChartComponent = (props:ChartComponentProps) => {
  const chartData = {
    labels: props.dataset.map(data => data[props.labelKey] as string),
    datasets: [
      {
        label: props.title,
        data: props.dataset.map(data => data[props.dataKey] as number), 
        hoverBackgroundColor: 'rgba(60, 60, 211,1)',
        backgroundColor: 'rgba(60, 60, 211,0.7)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
        font: {
          size: 24,
        },
        color: '#333',
        padding: {
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        callbacks: {
          label: function (context: any) {
            return `${props.title}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: props.xLabel,
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
          text: props.yLabel,
          font: {
            size: 16,
          },
        },
        ticks: {},
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    } as const, 
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
