import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Default options for all charts
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface LineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

interface PieChartProps {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
}

export const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Line data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Bar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Pie data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}; 