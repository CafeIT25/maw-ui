import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { Check, Clock, AlertCircle, Calendar, MapPin } from 'lucide-react'
import { cn } from '../../lib/utils'

const timelineVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "",
        modern: "space-y-8",
        minimal: "space-y-4",
        neon: "space-y-6",
        glass: "space-y-6",
        premium: "space-y-8",
      },
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row overflow-x-auto pb-4",
      },
      size: {
        sm: "text-sm",
        default: "",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
      size: "default",
    },
  }
)

const timelineItemVariants = cva(
  "relative flex items-start group",
  {
    variants: {
      variant: {
        default: "",
        modern: "pb-8",
        minimal: "pb-4",
        neon: "pb-6",
        glass: "pb-6",
        premium: "pb-8",
      },
      orientation: {
        vertical: "flex-row",
        horizontal: "flex-col min-w-[300px] mr-8",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
)

const timelineConnectorVariants = cva(
  "absolute bg-gray-200 dark:bg-gray-700",
  {
    variants: {
      variant: {
        default: "bg-gray-200 dark:bg-gray-700",
        modern: "bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800",
        minimal: "bg-gray-300 dark:bg-gray-600",
        neon: "bg-gradient-to-b from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/20 backdrop-blur-sm",
        premium: "bg-gradient-to-b from-purple-400 to-pink-400",
      },
      orientation: {
        vertical: "left-4 top-8 bottom-0 w-0.5",
        horizontal: "top-4 left-8 right-0 h-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
)

const timelineDotVariants = cva(
  "relative z-10 flex items-center justify-center rounded-full border-4 border-white dark:border-gray-900 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white",
        modern: "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
        minimal: "bg-gray-400 text-white",
        neon: "bg-black border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/50",
        glass: "bg-white/20 backdrop-blur-md border-white/40 text-white",
        premium: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
      },
      size: {
        sm: "w-6 h-6",
        default: "w-8 h-8",
        lg: "w-10 h-10",
        xl: "w-12 h-12",
      },
      status: {
        pending: "opacity-50",
        current: "scale-110 ring-4 ring-blue-200 dark:ring-blue-800",
        completed: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const timelineContentVariants = cva(
  "flex-1 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "ml-6",
        modern: "ml-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700",
        minimal: "ml-4",
        neon: "ml-8 p-6 bg-black border border-cyan-400 rounded-xl shadow-lg shadow-cyan-400/25",
        glass: "ml-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl",
        premium: "ml-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl border border-purple-200 dark:border-purple-800",
      },
      orientation: {
        vertical: "",
        horizontal: "mt-6 ml-0",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
)

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  content?: React.ReactNode
  date?: string | Date
  time?: string
  status?: 'pending' | 'current' | 'completed' | 'error' | 'warning'
  icon?: React.ReactNode
  metadata?: Record<string, unknown>
  onClick?: () => void
  href?: string
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[]
  animated?: boolean
  interactive?: boolean
  showConnector?: boolean
  dotSize?: 'sm' | 'default' | 'lg' | 'xl'
  onItemClick?: (item: TimelineItem, index: number) => void
  onStepClick?: (step: TimelineItem, index: number) => void
  onComplete?: () => void
  className?: string
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ 
    className, 
    variant, 
    orientation, 
    size,
    items,
    animated = true,
    interactive = false,
    showConnector = true,
    dotSize = 'default',
    onItemClick,
    ...props 
  }, ref) => {
    const statusClasses = {
      pending: 'opacity-60',
      current: 'ring-2 ring-blue-500',
      completed: 'bg-green-50 dark:bg-green-900/20',
      error: 'bg-red-50 dark:bg-red-900/20',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20'
    };

    const getStatusIcon = (status?: string, icon?: React.ReactNode) => {
      if (icon) return icon
      
      switch (status) {
        case 'completed':
          return <Check className="w-4 h-4" />
        case 'current':
          return <Clock className="w-4 h-4" />
        case 'error':
          return <AlertCircle className="w-4 h-4" />
        case 'warning':
          return <AlertCircle className="w-4 h-4" />
        default:
          return null
      }
    }

    const formatDate = (date: string | Date) => {
      if (typeof date === 'string') return date
      return date.toLocaleDateString()
    }

    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant, orientation, size, className }))}
        {...props}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              timelineItemVariants({ variant, orientation }),
              item.status && statusClasses[item.status]
            )}
            initial={animated ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              zIndex: items.length - index,
              cursor: interactive && onItemClick ? 'pointer' : 'default'
            }}
            onClick={() => interactive && onItemClick && onItemClick(item, index)}
          >
            {/* Connector line */}
            {showConnector && index < items.length - 1 && (
              <div className={cn(timelineConnectorVariants({ variant, orientation }))} />
            )}

            {/* Timeline dot */}
            <motion.div
              className={cn(
                timelineDotVariants({ 
                  variant, 
                  size: dotSize, 
                  status: item.status 
                })
              )}
              whileHover={interactive ? { scale: 1.1 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
            >
              {getStatusIcon(item.status, item.icon)}
            </motion.div>

            {/* Content */}
            <div className={cn(timelineContentVariants({ variant, orientation }))}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold",
                    variant === 'neon' && "text-cyan-100",
                    variant === 'glass' && "text-white",
                    variant === 'premium' && "text-purple-900 dark:text-purple-100"
                  )}>
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className={cn(
                      "text-sm mt-1 opacity-80",
                      variant === 'neon' && "text-cyan-200",
                      variant === 'glass' && "text-white/80",
                      variant === 'premium' && "text-purple-700 dark:text-purple-200"
                    )}>
                      {item.description}
                    </p>
                  )}
                </div>

                {(item.date || item.time) && (
                  <div className={cn(
                    "text-xs opacity-60 ml-4 flex flex-col items-end",
                    variant === 'neon' && "text-cyan-300",
                    variant === 'glass' && "text-white/60",
                    variant === 'premium' && "text-purple-600 dark:text-purple-300"
                  )}>
                    {item.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date)}
                      </div>
                    )}
                    {item.time && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {item.content && (
                <div className="mt-3">
                  {item.content}
                </div>
              )}

              {item.metadata && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <span
                      key={key}
                      className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        variant === 'neon' && "bg-cyan-400/20 text-cyan-300",
                        variant === 'glass' && "bg-white/20 text-white",
                        variant === 'premium' && "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
                        !['neon', 'glass', 'premium'].includes(variant || '') && "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      )}
                    >
                      {key}: {String(value)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
)

Timeline.displayName = "Timeline"

// Roadmap Timeline Component
export interface RoadmapTimelineProps extends Omit<TimelineProps, 'items'> {
  milestones: Array<{
    id: string | number
    title: string
    description?: string
    targetDate: string | Date
    status: 'completed' | 'in-progress' | 'planned' | 'delayed'
    features?: string[]
    progress?: number
  }>
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  milestones,
  ...timelineProps
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'in-progress':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
      case 'planned':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
      case 'delayed':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const timelineItems: TimelineItem[] = milestones.map(milestone => ({
    id: milestone.id,
    title: milestone.title,
    description: milestone.description,
    date: milestone.targetDate,
    status: milestone.status === 'completed' ? 'completed' : 
            milestone.status === 'in-progress' ? 'current' : 'pending',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            getStatusColor(milestone.status)
          )}>
            {milestone.status.replace('-', ' ').toUpperCase()}
          </span>
          {milestone.progress !== undefined && (
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
          )}
        </div>
        
        {milestone.features && milestone.features.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Features:</h4>
            <ul className="space-y-1">
              {milestone.features.map((feature, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }))

  return <Timeline {...timelineProps} items={timelineItems} />
}

// Activity Timeline Component
export interface ActivityTimelineProps extends Omit<TimelineProps, 'items'> {
  activities: Array<{
    id: string | number
    user: {
      name: string
      avatar?: string
    }
    action: string
    target?: string
    timestamp: Date
    location?: string
    details?: React.ReactNode
  }>
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  ...timelineProps
}) => {
  const timelineItems: TimelineItem[] = activities.map(activity => ({
    id: activity.id,
    title: `${activity.user.name} ${activity.action}`,
    description: activity.target,
    date: activity.timestamp,
    time: activity.timestamp.toLocaleTimeString(),
    icon: activity.user.avatar ? (
      <img 
        src={activity.user.avatar} 
        alt={activity.user.name}
        className="w-6 h-6 rounded-full object-cover"
      />
    ) : (
      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
        {activity.user.name.charAt(0)}
      </div>
    ),
    content: (
      <div className="space-y-2">
        {activity.location && (
          <div className="flex items-center gap-1 text-sm opacity-70">
            <MapPin className="w-3 h-3" />
            {activity.location}
          </div>
        )}
        {activity.details && activity.details}
      </div>
    )
  }))

  return <Timeline {...timelineProps} items={timelineItems} dotSize="lg" />
}

export { Timeline } 