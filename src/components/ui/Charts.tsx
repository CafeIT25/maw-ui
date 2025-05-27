import React from 'react'
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon
} from 'lucide-react'

// Chart types (stub for chart.js types)
type ChartData = {
  labels?: string[]
  datasets: Array<{
    label?: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
}

type ChartOptions = {
  responsive?: boolean
  maintainAspectRatio?: boolean
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right'
    }
    title?: {
      display?: boolean
      text?: string
    }
  }
}

// Stub Chart Components (since chart.js is not installed)
const Line: React.FC<{ data: ChartData; options?: ChartOptions; [key: string]: unknown }> = () => (
  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
    <div className="text-gray-500 flex items-center gap-2">
      <LineChartIcon className="w-8 h-8" />
      <span>Line Chart (Demo)</span>
    </div>
  </div>
)

const ChartBar: React.FC<{ data: ChartData; options?: ChartOptions; [key: string]: unknown }> = () => (
  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
    <div className="text-gray-500 flex items-center gap-2">
      <BarChart3 className="w-8 h-8" />
      <span>Bar Chart (Demo)</span>
    </div>
  </div>
)

const Pie: React.FC<{ data: ChartData; options?: ChartOptions; [key: string]: unknown }> = () => (
  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
    <div className="text-gray-500 flex items-center gap-2">
      <PieChartIcon className="w-8 h-8" />
      <span>Pie Chart (Demo)</span>
    </div>
  </div>
)

// Alias for compatibility
const Bar = ChartBar

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
  data: ChartData;
  options?: ChartOptions;
}

interface BarChartProps {
  data: ChartData;
  options?: ChartOptions;
}

interface PieChartProps {
  data: ChartData;
  options?: ChartOptions;
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