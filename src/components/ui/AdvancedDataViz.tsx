import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Brain,
  Eye,
  Download,
  Share2,
  Settings,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Search,
  Calendar,
  Clock,
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Award,
  Sparkles,
  Layers,
  Grid3X3,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { Button } from './Button';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Badge } from './Badge';
import { useToast } from './Toast';

// Data types
export interface DataPoint {
  id: string;
  label: string;
  value: number;
  timestamp?: Date;
  category?: string;
  metadata?: Record<string, any>;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  changePercent?: number;
}

export interface ChartSeries {
  id: string;
  name: string;
  data: DataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area' | 'scatter';
  visible?: boolean;
  yAxis?: 'left' | 'right';
}

export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap' | 'gauge' | 'funnel' | 'radar' | 'treemap';
  series: ChartSeries[];
  xAxis?: {
    label?: string;
    type?: 'category' | 'time' | 'numeric';
    format?: string;
  };
  yAxis?: {
    label?: string;
    min?: number;
    max?: number;
    format?: string;
  };
  legend?: {
    show?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  tooltip?: {
    show?: boolean;
    format?: string;
  };
  animation?: {
    enabled?: boolean;
    duration?: number;
    easing?: string;
  };
  realtime?: {
    enabled?: boolean;
    interval?: number;
    maxPoints?: number;
  };
  interactive?: {
    zoom?: boolean;
    pan?: boolean;
    brush?: boolean;
    crossfilter?: boolean;
  };
  ai?: {
    insights?: boolean;
    predictions?: boolean;
    anomalies?: boolean;
    recommendations?: boolean;
  };
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'text' | 'image';
  config: ChartConfig | MetricConfig | TableConfig | TextConfig | ImageConfig;
  position: { x: number; y: number; w: number; h: number };
  visible?: boolean;
  refreshInterval?: number;
}

export interface MetricConfig {
  id: string;
  title: string;
  value: number;
  previousValue?: number;
  target?: number;
  format?: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  color?: string;
}

export interface TableConfig {
  id: string;
  title: string;
  columns: Array<{
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'badge' | 'progress';
    format?: string;
    sortable?: boolean;
  }>;
  data: Array<Record<string, any>>;
  pagination?: boolean;
  search?: boolean;
  export?: boolean;
}

export interface TextConfig {
  id: string;
  title: string;
  content: string;
  markdown?: boolean;
}

export interface ImageConfig {
  id: string;
  title: string;
  src: string;
  alt?: string;
}

export interface AdvancedDataVizProps extends VariantProps<typeof vizVariants> {
  config: ChartConfig | DashboardWidget[];
  className?: string;
  onDataUpdate?: (data: any) => void;
  onInsight?: (insight: string) => void;
  realtime?: boolean;
  interactive?: boolean;
  ai?: boolean;
}

const vizVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg",
        minimal: "bg-transparent",
        card: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6",
        floating: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl",
        gradient: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg",
        glass: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl",
        neon: "bg-gray-900 border-2 border-cyan-400 rounded-xl shadow-lg shadow-cyan-400/25",
        premium: "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-xl"
      },
      size: {
        sm: "h-64",
        md: "h-96",
        lg: "h-[32rem]",
        xl: "h-[40rem]",
        full: "h-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// Mock data generator
const generateMockData = (type: string, count: number = 10): DataPoint[] => {
  const categories = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const data: DataPoint[] = [];
  
  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 1000) + 100;
    const previousValue = Math.floor(Math.random() * 1000) + 100;
    const change = value - previousValue;
    const changePercent = (change / previousValue) * 100;
    
    data.push({
      id: `point-${i}`,
      label: type === 'time' ? `Day ${i + 1}` : categories[i % categories.length],
      value,
      timestamp: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000),
      category: categories[i % categories.length],
      change,
      changePercent,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      color: `hsl(${(i * 360) / count}, 70%, 50%)`
    });
  }
  
  return data;
};

// AI Insights Hook
const useAIInsights = (data: DataPoint[], enabled: boolean = false) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<DataPoint[]>([]);
  const [anomalies, setAnomalies] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !data.length) return;

    const generateInsights = async () => {
      setLoading(true);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newInsights: string[] = [];
      const values = data.map(d => d.value);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);
      
      // Generate insights
      if (max > avg * 1.5) {
        newInsights.push(`Peak value detected: ${max.toLocaleString()} is 50% above average`);
      }
      
      if (min < avg * 0.5) {
        newInsights.push(`Low value detected: ${min.toLocaleString()} is 50% below average`);
      }
      
      const trend = values.slice(-3).every((val, i, arr) => i === 0 || val > arr[i - 1]);
      if (trend) {
        newInsights.push('Positive trend detected in recent data points');
      }
      
      // Generate predictions (next 3 points)
      const lastValue = values[values.length - 1];
      const growthRate = 0.05; // 5% growth
      const newPredictions: DataPoint[] = [];
      
      for (let i = 1; i <= 3; i++) {
        newPredictions.push({
          id: `prediction-${i}`,
          label: `Prediction ${i}`,
          value: Math.round(lastValue * Math.pow(1 + growthRate, i)),
          timestamp: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
        });
      }
      
      // Detect anomalies (values > 2 standard deviations)
      const stdDev = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / values.length);
      const newAnomalies = data.filter(d => Math.abs(d.value - avg) > 2 * stdDev);
      
      setInsights(newInsights);
      setPredictions(newPredictions);
      setAnomalies(newAnomalies);
      setLoading(false);
    };

    generateInsights();
  }, [data, enabled]);

  return { insights, predictions, anomalies, loading };
};

// Realtime Data Hook
const useRealtimeData = (initialData: DataPoint[], enabled: boolean = false, interval: number = 5000) => {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [isPlaying, setIsPlaying] = useState(enabled);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setData(prevData => {
        const newPoint: DataPoint = {
          id: `realtime-${Date.now()}`,
          label: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 1000) + 100,
          timestamp: new Date(),
          trend: Math.random() > 0.5 ? 'up' : 'down'
        };

        // Keep only last 50 points for performance
        const updatedData = [...prevData.slice(-49), newPoint];
        return updatedData;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval]);

  return { data, isPlaying, setIsPlaying };
};

// Chart Component
const Chart: React.FC<{
  config: ChartConfig;
  data: DataPoint[];
  className?: string;
  onDataUpdate?: (data: any) => void;
}> = ({ config, data, className, onDataUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simple canvas-based chart rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up chart area
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * chartWidth) / 10;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i * chartHeight) / 10;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw chart based on type
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1;

    if (config.type === 'line' || config.type === 'area') {
      // Line/Area chart
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Fill area if area chart
      if (config.type === 'area') {
        ctx.lineTo(width - padding, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
      }

      // Draw points
      data.forEach((point, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = point.color || '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    } else if (config.type === 'bar') {
      // Bar chart
      const barWidth = chartWidth / data.length * 0.8;
      const barSpacing = chartWidth / data.length * 0.2;

      data.forEach((point, index) => {
        const x = padding + index * (chartWidth / data.length) + barSpacing / 2;
        const barHeight = ((point.value - minValue) / valueRange) * chartHeight;
        const y = height - padding - barHeight;

        ctx.fillStyle = point.color || '#3b82f6';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Add value labels
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(point.value.toString(), x + barWidth / 2, y - 5);
      });
    }

    // Draw axes labels
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels
    data.forEach((point, index) => {
      if (index % Math.ceil(data.length / 5) === 0) {
        const x = padding + (index * chartWidth) / (data.length - 1);
        ctx.fillText(point.label, x, height - 10);
      }
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange * i) / 5;
      const y = height - padding - (i * chartHeight) / 5;
      ctx.fillText(Math.round(value).toString(), padding - 10, y + 5);
    }

  }, [config, data]);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full cursor-crosshair"
        onClick={(e) => {
          // Handle point selection
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Find closest data point (simplified)
          const pointIndex = Math.round((x - 40) / ((rect.width - 80) / (data.length - 1)));
          if (pointIndex >= 0 && pointIndex < data.length) {
            setSelectedPoint(data[pointIndex]);
          }
        }}
      />
      
      {/* Tooltip */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-10"
          >
            <div className="text-sm font-medium">{selectedPoint.label}</div>
            <div className="text-lg font-bold text-blue-600">{selectedPoint.value.toLocaleString()}</div>
            {selectedPoint.trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                selectedPoint.trend === 'up' ? 'text-green-600' : 
                selectedPoint.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              )}>
                {selectedPoint.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                 selectedPoint.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                 <Minus className="w-4 h-4" />}
                {selectedPoint.changePercent?.toFixed(1)}%
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{
  config: MetricConfig;
  className?: string;
}> = ({ config, className }) => {
  const change = config.previousValue ? config.value - config.previousValue : 0;
  const changePercent = config.previousValue ? (change / config.previousValue) * 100 : 0;
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {config.title}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold">
              {config.value.toLocaleString()}
              {config.unit && <span className="text-sm text-gray-500 ml-1">{config.unit}</span>}
            </span>
            {config.previousValue && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-gray-600'
              )}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> :
                 trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> :
                 <Minus className="w-4 h-4" />}
                {Math.abs(changePercent).toFixed(1)}%
              </div>
            )}
          </div>
          {config.target && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress to target</span>
                <span>{((config.value / config.target) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((config.value / config.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
        {config.icon && (
          <div className={cn(
            "p-3 rounded-lg",
            config.status === 'success' ? 'bg-green-100 text-green-600' :
            config.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
            config.status === 'error' ? 'bg-red-100 text-red-600' :
            'bg-blue-100 text-blue-600'
          )}>
            {config.icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// AI Insights Panel
const AIInsightsPanel: React.FC<{
  insights: string[];
  predictions: DataPoint[];
  anomalies: DataPoint[];
  loading: boolean;
}> = ({ insights, predictions, anomalies, loading }) => {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Insights
          {loading && <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Insights */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Key Insights</h4>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        {predictions.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Predictions</h4>
            <div className="space-y-2">
              {predictions.map((prediction, index) => (
                <div key={prediction.id} className="flex items-center justify-between text-sm">
                  <span>{prediction.label}</span>
                  <Badge variant="outline">{prediction.value.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anomalies */}
        {anomalies.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Anomalies Detected</h4>
            <div className="space-y-2">
              {anomalies.map((anomaly) => (
                <div key={anomaly.id} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>{anomaly.label}: {anomaly.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main AdvancedDataViz Component
export const AdvancedDataViz: React.FC<AdvancedDataVizProps> = ({
  config,
  variant,
  size,
  className,
  onDataUpdate,
  onInsight,
  realtime = false,
  interactive = true,
  ai = false
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const { addToast } = useToast();

  // Handle single chart config
  const chartConfig = Array.isArray(config) ? null : config as ChartConfig;
  const mockData = useMemo(() => 
    chartConfig ? generateMockData(chartConfig.type, 20) : [], 
    [chartConfig]
  );

  const { data: realtimeData, isPlaying, setIsPlaying } = useRealtimeData(mockData, realtime);
  const { insights, predictions, anomalies, loading: aiLoading } = useAIInsights(realtimeData, ai);

  const currentData = realtime ? realtimeData : mockData;

  // Handle dashboard config
  const dashboardWidgets = Array.isArray(config) ? config as DashboardWidget[] : null;

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chart-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Data Exported',
      description: 'Chart data has been exported successfully',
      duration: 3000
    });
  }, [currentData, addToast]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: chartConfig?.title || 'Data Visualization',
        text: chartConfig?.description || 'Check out this data visualization',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied',
        description: 'Chart link has been copied to clipboard',
        duration: 3000
      });
    }
  }, [chartConfig, addToast]);

  if (dashboardWidgets) {
    // Render dashboard
    return (
      <div className={cn(vizVariants({ variant, size }), "p-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardWidgets.map((widget) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "col-span-1",
                widget.position.w > 1 && `md:col-span-${Math.min(widget.position.w, 2)}`,
                widget.position.w > 2 && `lg:col-span-${Math.min(widget.position.w, 3)}`,
                widget.position.w > 3 && `xl:col-span-${Math.min(widget.position.w, 4)}`
              )}
            >
              {widget.type === 'metric' && (
                <MetricCard config={widget.config as MetricConfig} />
              )}
              {widget.type === 'chart' && (
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>{widget.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      config={widget.config as ChartConfig}
                      data={generateMockData('chart', 10)}
                      onDataUpdate={onDataUpdate}
                    />
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (!chartConfig) return null;

  return (
    <div className={cn(vizVariants({ variant, size }), className)}>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {chartConfig.type === 'line' && <LineChart className="w-5 h-5" />}
                {chartConfig.type === 'bar' && <BarChart3 className="w-5 h-5" />}
                {chartConfig.type === 'pie' && <PieChart className="w-5 h-5" />}
                {chartConfig.title}
                {realtime && (
                  <Badge variant={isPlaying ? "success" : "outline"} size="sm">
                    <Activity className="w-3 h-3 mr-1" />
                    {isPlaying ? 'Live' : 'Paused'}
                  </Badge>
                )}
              </CardTitle>
              {chartConfig.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {chartConfig.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {realtime && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Time Range:</label>
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="1d">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Chart Type:</label>
                    <select
                      value={chartConfig.type}
                      onChange={(e) => {
                        // Handle chart type change
                        onDataUpdate?.({ ...chartConfig, type: e.target.value });
                      }}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="line">Line</option>
                      <option value="bar">Bar</option>
                      <option value="area">Area</option>
                      <option value="pie">Pie</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Main Chart */}
            <div className="lg:col-span-3">
              <Chart
                config={chartConfig}
                data={currentData}
                onDataUpdate={onDataUpdate}
                className="h-full"
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="p-4">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Points:</span>
                    <span className="font-medium">{currentData.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average:</span>
                    <span className="font-medium">
                      {Math.round(currentData.reduce((sum, d) => sum + d.value, 0) / currentData.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Max Value:</span>
                    <span className="font-medium text-green-600">
                      {Math.max(...currentData.map(d => d.value)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Min Value:</span>
                    <span className="font-medium text-red-600">
                      {Math.min(...currentData.map(d => d.value)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>

              {/* AI Insights */}
              {ai && (
                <AIInsightsPanel
                  insights={insights}
                  predictions={predictions}
                  anomalies={anomalies}
                  loading={aiLoading}
                />
              )}

              {/* Legend */}
              {chartConfig.legend?.show !== false && (
                <Card className="p-4">
                  <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">Legend</h4>
                  <div className="space-y-2">
                    {chartConfig.series.map((series) => (
                      <div key={series.id} className="flex items-center gap-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: series.color || '#3b82f6' }}
                        />
                        <span>{series.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedDataViz; 