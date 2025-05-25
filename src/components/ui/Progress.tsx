import React, { forwardRef, useEffect, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const progressVariants = cva(
  "relative overflow-hidden rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-200 dark:bg-gray-700",
        success: "bg-green-100 dark:bg-green-900",
        warning: "bg-yellow-100 dark:bg-yellow-900",
        error: "bg-red-100 dark:bg-red-900",
        info: "bg-blue-100 dark:bg-blue-900",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-md border border-white/20",
        premium: "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900",
      },
      size: {
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const progressBarVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-blue-600",
        success: "bg-green-600",
        warning: "bg-yellow-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        neon: "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50",
        glass: "bg-white/30 backdrop-blur-sm",
        premium: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  animated?: boolean
  striped?: boolean
  pulse?: boolean
  showValue?: boolean
  label?: string
  gradient?: boolean
  glow?: boolean
  indeterminate?: boolean
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    variant, 
    size, 
    value = 0, 
    max = 100, 
    animated = false,
    striped = false,
    pulse = false,
    showValue = false,
    label,
    gradient = false,
    glow = false,
    indeterminate = false,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = useState(0)
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    useEffect(() => {
      if (!indeterminate) {
        const timer = setTimeout(() => {
          setDisplayValue(percentage)
        }, 100)
        return () => clearTimeout(timer)
      }
    }, [percentage, indeterminate])

    const getGradientClass = () => {
      if (!gradient) return ''
      
      switch (variant) {
        case 'success':
          return 'bg-gradient-to-r from-green-400 to-emerald-600'
        case 'warning':
          return 'bg-gradient-to-r from-yellow-400 to-orange-600'
        case 'error':
          return 'bg-gradient-to-r from-red-400 to-rose-600'
        case 'info':
          return 'bg-gradient-to-r from-blue-400 to-indigo-600'
        case 'neon':
          return 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600'
        case 'premium':
          return 'bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500'
        default:
          return 'bg-gradient-to-r from-blue-400 to-purple-600'
      }
    }

    const getStripedPattern = () => {
      if (!striped) return ''
      return 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px]'
    }

    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex justify-between items-center text-sm">
            {label && (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {showValue && (
              <motion.span
                key={displayValue}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-semibold text-gray-600 dark:text-gray-400"
              >
                {Math.round(displayValue)}%
              </motion.span>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(
            progressVariants({ variant, size, className }),
            glow && variant === 'neon' && "shadow-lg shadow-cyan-400/25"
          )}
          {...props}
        >
          {indeterminate ? (
            <motion.div
              className={cn(
                "h-full w-1/3 rounded-full",
                progressBarVariants({ variant }),
                gradient && getGradientClass(),
                striped && getStripedPattern()
              )}
              animate={{
                x: ['-100%', '300%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ) : (
            <motion.div
              className={cn(
                progressBarVariants({ variant }),
                gradient && getGradientClass(),
                striped && getStripedPattern(),
                animated && "animate-pulse",
                pulse && "animate-pulse"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${displayValue}%` }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              {striped && animated && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
              
              {glow && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
              )}
            </motion.div>
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"

// Multi-step Progress Component
export interface MultiStepProgressProps {
  steps: Array<{
    label: string
    description?: string
    completed?: boolean
    current?: boolean
    error?: boolean
  }>
  variant?: 'default' | 'neon' | 'premium'
  orientation?: 'horizontal' | 'vertical'
  showLabels?: boolean
  animated?: boolean
}

export const MultiStepProgress: React.FC<MultiStepProgressProps> = ({
  steps,
  variant = 'default',
  orientation = 'horizontal',
  showLabels = true,
  animated = true
}) => {
  const getStepColor = (step: {
    label: string
    description?: string
    completed?: boolean
    current?: boolean
    error?: boolean
  }) => {
    if (step.error) return 'bg-red-500 border-red-500'
    if (step.completed) return 'bg-green-500 border-green-500'
    if (step.current) {
      switch (variant) {
        case 'neon':
          return 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
        case 'premium':
          return 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
        default:
          return 'bg-blue-500 border-blue-500'
      }
    }
    return 'bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-600'
  }

  const getConnectorColor = (index: number) => {
    const nextStep = steps[index + 1]
    if (steps[index].completed && nextStep?.completed) {
      return 'bg-green-500'
    }
    if (steps[index].completed || steps[index].current) {
      switch (variant) {
        case 'neon':
          return 'bg-gradient-to-r from-cyan-400 to-gray-300'
        case 'premium':
          return 'bg-gradient-to-r from-purple-500 to-gray-300'
        default:
          return 'bg-gradient-to-r from-blue-500 to-gray-300'
      }
    }
    return 'bg-gray-300 dark:bg-gray-600'
  }

  if (orientation === 'vertical') {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={animated ? { scale: 0 } : {}}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-sm font-semibold",
                  getStepColor(step)
                )}
              >
                {step.completed ? '✓' : step.error ? '✕' : index + 1}
              </motion.div>
              {index < steps.length - 1 && (
                <div className={cn("w-0.5 h-8 mt-2", getConnectorColor(index))} />
              )}
            </div>
            {showLabels && (
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium",
                  step.current ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              initial={animated ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center text-white font-semibold",
                getStepColor(step)
              )}
            >
              {step.completed ? '✓' : step.error ? '✕' : index + 1}
            </motion.div>
            {showLabels && (
              <div className="text-center">
                <p className={cn(
                  "text-xs font-medium",
                  step.current ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={cn("flex-1 h-0.5", getConnectorColor(index))} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// Circular Progress Component
export interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neon' | 'premium'
  showValue?: boolean
  label?: string
  animated?: boolean
  gradient?: boolean
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showValue = true,
  label,
  animated = true,
  gradient = false
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  const getStrokeColor = () => {
    switch (variant) {
      case 'success':
        return gradient ? 'url(#success-gradient)' : '#10b981'
      case 'warning':
        return gradient ? 'url(#warning-gradient)' : '#f59e0b'
      case 'error':
        return gradient ? 'url(#error-gradient)' : '#ef4444'
      case 'neon':
        return gradient ? 'url(#neon-gradient)' : '#06b6d4'
      case 'premium':
        return gradient ? 'url(#premium-gradient)' : '#8b5cf6'
      default:
        return gradient ? 'url(#default-gradient)' : '#3b82f6'
    }
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="default-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="warning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="error-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={animated ? { duration: 1, ease: "easeOut" } : {}}
          className={variant === 'neon' ? 'drop-shadow-lg' : ''}
          style={{
            filter: variant === 'neon' ? 'drop-shadow(0 0 8px currentColor)' : undefined
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <motion.span
            key={displayValue}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {Math.round(displayValue)}%
          </motion.span>
        )}
        {label && (
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

export { Progress } 