import React, { forwardRef, useState, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, Activity, Download, Maximize2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const chartVariants = cva(
  "relative rounded-xl border transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700",
        modern: "bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-lg dark:bg-gray-900/95 dark:border-gray-700/50",
        minimal: "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-md border-white/20",
        premium: "bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg dark:from-gray-900 dark:to-purple-950 dark:border-purple-800",
      },
      size: {
        sm: "h-48",
        default: "h-64",
        lg: "h-80",
        xl: "h-96",
        "2xl": "h-[32rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface DataPoint {
  label: string
  value: number
  color?: string
  metadata?: Record<string, unknown>
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    color?: string
    gradient?: boolean
    fill?: boolean
    tension?: number
  }>
}

export interface DataVisualizationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartVariants> {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'radar' | 'heatmap'
  data: ChartData | DataPoint[]
  title?: string
  subtitle?: string
  animated?: boolean
  interactive?: boolean
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showExport?: boolean
  showFullscreen?: boolean
  gradient?: boolean
  responsive?: boolean
  theme?: 'light' | 'dark' | 'auto'
  onDataPointClick?: (point: DataPoint, index: number) => void
  onExport?: (format: 'png' | 'svg' | 'pdf') => void
}

const DataVisualization = forwardRef<HTMLDivElement, DataVisualizationProps>(
  ({ 
    className, 
    variant, 
    size,
    type,
    data,
    title,
    subtitle,
    animated = true,
    interactive = true,
    showLegend = true,
    showGrid = true,
    showTooltip = true,
    showExport = false,
    showFullscreen = false,
    gradient = false,
    responsive = true,
    theme = 'auto',
    onDataPointClick,
    onExport,
    ...props 
  }, ref) => {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const chartRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    // Convert data to consistent format
    const chartData = Array.isArray(data) ? data : data.datasets?.[0]?.data.map((value, index) => ({
      label: data.labels?.[index] || `Item ${index + 1}`,
      value,
      color: data.datasets[0]?.color
    })) || []

    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
    ]

    const getColor = (index: number, customColor?: string) => {
      if (customColor) return customColor
      return colors[index % colors.length]
    }

    // Safe calculations with fallbacks for empty data
    const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 100
    const minValue = chartData.length > 0 ? Math.min(...chartData.map(d => d.value)) : 0

    // Line Chart Component
    const LineChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
      // Early return if no data
      if (!data || data.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available</p>
          </div>
        )
      }

      const width = 400
      const height = 200
      const padding = 40

      const xScale = (index: number) => {
        if (data.length <= 1) return padding + (width - 2 * padding) / 2
        return (index / (data.length - 1)) * (width - 2 * padding) + padding
      }
      
      const yScale = (value: number) => {
        const range = maxValue - minValue
        if (range === 0) return height / 2
        return height - padding - ((value - minValue) / range) * (height - 2 * padding)
      }

      const pathData = data.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.value)}`
      ).join(' ')

      const areaData = data.length > 1 
        ? `${pathData} L ${xScale(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`
        : `M ${xScale(0)} ${yScale(data[0].value)} L ${xScale(0)} ${height - padding} L ${padding} ${height - padding} Z`

      return (
        <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid */}
          {showGrid && (
            <g className="opacity-20">
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1={padding}
                  y1={padding + (i * (height - 2 * padding)) / 4}
                  x2={width - padding}
                  y2={padding + (i * (height - 2 * padding)) / 4}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </g>
          )}

          {/* Area fill */}
          {type === 'area' && (
            <motion.path
              d={areaData}
              fill={gradient ? "url(#areaGradient)" : getColor(0)}
              fillOpacity={0.2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          )}

          {/* Gradient definitions */}
          {gradient && (
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={getColor(0)} stopOpacity={0.8} />
                <stop offset="100%" stopColor={getColor(0)} stopOpacity={0.1} />
              </linearGradient>
            </defs>
          )}

          {/* Line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={getColor(0)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animated ? 1 : 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data points */}
          {data.map((point, index) => (
            <motion.circle
              key={index}
              cx={xScale(index)}
              cy={yScale(point.value)}
              r={hoveredIndex === index ? 6 : 4}
              fill={getColor(index, point.color)}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onDataPointClick?.(point, index)}
            />
          ))}

          {/* Tooltip */}
          {showTooltip && hoveredIndex !== null && (
            <g>
              <rect
                x={xScale(hoveredIndex) - 30}
                y={yScale(data[hoveredIndex].value) - 35}
                width="60"
                height="25"
                fill="black"
                fillOpacity={0.8}
                rx="4"
              />
              <text
                x={xScale(hoveredIndex)}
                y={yScale(data[hoveredIndex].value) - 18}
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                {data[hoveredIndex].value}
              </text>
            </g>
          )}
        </svg>
      )
    }

    // Bar Chart Component
    const BarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
      // Early return if no data
      if (!data || data.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available</p>
          </div>
        )
      }

      const width = 400
      const height = 200
      const padding = 40
      const barWidth = (width - 2 * padding) / data.length * 0.8

      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Grid */}
          {showGrid && (
            <g className="opacity-20">
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1={padding}
                  y1={padding + (i * (height - 2 * padding)) / 4}
                  x2={width - padding}
                  y2={padding + (i * (height - 2 * padding)) / 4}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </g>
          )}

          {/* Bars */}
          {data.map((point, index) => {
            const range = maxValue - minValue
            const barHeight = range === 0 ? height / 4 : ((point.value - minValue) / range) * (height - 2 * padding)
            const x = padding + (index * (width - 2 * padding)) / data.length + ((width - 2 * padding) / data.length - barWidth) / 2
            const y = height - padding - barHeight

            return (
              <motion.rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={gradient ? "url(#barGradient)" : getColor(index, point.color)}
                rx="4"
                className="cursor-pointer"
                initial={{ height: 0, y: height - padding }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 1, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onDataPointClick?.(point, index)}
              />
            )
          })}

          {/* Gradient definitions */}
          {gradient && (
            <defs>
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity={1} />
              </linearGradient>
            </defs>
          )}
        </svg>
      )
    }

    // Pie Chart Component
    const PieChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
      // Early return if no data
      if (!data || data.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available</p>
          </div>
        )
      }

      const radius = 80
      const centerX = 100
      const centerY = 100
      const total = data.reduce((sum, point) => sum + point.value, 0)

      // Handle case where total is 0
      if (total === 0) {
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data to display</p>
          </div>
        )
      }

      let currentAngle = -90

      return (
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {data.map((point, index) => {
            const angle = (point.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle += angle

            const startAngleRad = (startAngle * Math.PI) / 180
            const endAngleRad = (endAngle * Math.PI) / 180

            const x1 = centerX + radius * Math.cos(startAngleRad)
            const y1 = centerY + radius * Math.sin(startAngleRad)
            const x2 = centerX + radius * Math.cos(endAngleRad)
            const y2 = centerY + radius * Math.sin(endAngleRad)

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ')

            return (
              <motion.path
                key={index}
                d={pathData}
                fill={getColor(index, point.color)}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onDataPointClick?.(point, index)}
              />
            )
          })}

          {/* Center circle for doughnut */}
          {type === 'doughnut' && (
            <circle
              cx={centerX}
              cy={centerY}
              r={radius * 0.6}
              fill={variant === 'neon' ? 'black' : 'white'}
            />
          )}
        </svg>
      )
    }

    const renderChart = () => {
      switch (type) {
        case 'line':
        case 'area':
          return <LineChart data={chartData} />
        case 'bar':
          return <BarChart data={chartData} />
        case 'pie':
        case 'doughnut':
          return <PieChart data={chartData} />
        default:
          return <LineChart data={chartData} />
      }
    }

    const getChartIcon = () => {
      switch (type) {
        case 'line':
        case 'area':
          return <LineChart className="w-4 h-4" />
        case 'bar':
          return <BarChart3 className="w-4 h-4" />
        case 'pie':
        case 'doughnut':
          return <PieChart className="w-4 h-4" />
        default:
          return <Activity className="w-4 h-4" />
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          chartVariants({ variant, size, className }),
          isFullscreen && "fixed inset-4 z-50 h-auto"
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                variant === 'neon' && "bg-cyan-400/20 text-cyan-400",
                variant === 'glass' && "bg-white/20 text-white",
                variant === 'premium' && "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
                !['neon', 'glass', 'premium'].includes(variant || '') && "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              )}>
                {getChartIcon()}
              </div>
              <div>
                {title && (
                  <h3 className={cn(
                    "font-semibold",
                    variant === 'neon' && "text-cyan-100",
                    variant === 'glass' && "text-white",
                    variant === 'premium' && "text-purple-900 dark:text-purple-100"
                  )}>
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className={cn(
                    "text-sm opacity-70",
                    variant === 'neon' && "text-cyan-200",
                    variant === 'glass' && "text-white/70",
                    variant === 'premium' && "text-purple-700 dark:text-purple-300"
                  )}>
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showExport && (
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => onExport?.('png')}
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              {showFullscreen && (
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="p-4 flex-1 flex items-center justify-center">
          <div ref={chartRef} className="w-full h-full">
            {renderChart()}
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              {chartData.slice(0, 6).map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getColor(index, point.color) }}
                  />
                  <span className={cn(
                    "text-sm",
                    variant === 'neon' && "text-cyan-200",
                    variant === 'glass' && "text-white/80",
                    variant === 'premium' && "text-purple-700 dark:text-purple-300"
                  )}>
                    {point.label}
                  </span>
                </div>
              ))}
              {chartData.length > 6 && (
                <span className="text-sm opacity-60">
                  +{chartData.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl pointer-events-none" />
        )}
      </div>
    )
  }
)

DataVisualization.displayName = "DataVisualization"

// Analytics Dashboard Component
export interface AnalyticsDashboardProps {
  metrics: Array<{
    title: string
    value: string | number
    change?: number
    trend?: 'up' | 'down' | 'neutral'
    icon?: React.ReactNode
  }>
  charts: Array<{
    title: string
    type: 'line' | 'bar' | 'pie' | 'doughnut'
    data: ChartData | DataPoint[]
    size?: 'sm' | 'default' | 'lg'
  }>
  variant?: 'default' | 'modern' | 'neon' | 'glass' | 'premium'
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  metrics,
  charts,
  variant = 'default'
}) => {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className={cn(
              "p-6 rounded-xl border",
              variant === 'neon' && "bg-black border-cyan-400 shadow-lg shadow-cyan-400/25",
              variant === 'glass' && "bg-white/10 backdrop-blur-md border-white/20",
              variant === 'premium' && "bg-gradient-to-br from-white to-purple-50 border-purple-200 dark:from-gray-900 dark:to-purple-950 dark:border-purple-800",
              !['neon', 'glass', 'premium'].includes(variant) && "bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={cn(
                "text-sm font-medium",
                variant === 'neon' && "text-cyan-200",
                variant === 'glass' && "text-white/80",
                variant === 'premium' && "text-purple-700 dark:text-purple-300"
              )}>
                {metric.title}
              </span>
              {metric.icon && (
                <div className={cn(
                  "p-2 rounded-lg",
                  variant === 'neon' && "bg-cyan-400/20 text-cyan-400",
                  variant === 'glass' && "bg-white/20 text-white",
                  variant === 'premium' && "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                )}>
                  {metric.icon}
                </div>
              )}
            </div>
            
            <div className="flex items-end gap-2">
              <span className={cn(
                "text-2xl font-bold",
                variant === 'neon' && "text-cyan-100",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-900 dark:text-purple-100"
              )}>
                {metric.value}
              </span>
              
              {metric.change !== undefined && (
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  metric.trend === 'up' && "text-green-500",
                  metric.trend === 'down' && "text-red-500",
                  metric.trend === 'neutral' && "text-gray-500"
                )}>
                  {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  {Math.abs(metric.change)}%
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <DataVisualization
              type={chart.type}
              data={chart.data}
              title={chart.title}
              variant={variant}
              size={chart.size || 'default'}
              animated
              interactive
              showLegend
              showGrid
              showTooltip
              gradient
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { DataVisualization } 