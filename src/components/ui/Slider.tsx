import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface SliderMark {
  value: number
  label?: React.ReactNode
  style?: React.CSSProperties
}

export interface SliderProps {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  marks?: SliderMark[] | Record<number, React.ReactNode>
  range?: boolean
  disabled?: boolean
  vertical?: boolean
  reverse?: boolean
  tooltip?: {
    open?: boolean
    formatter?: (value: number) => React.ReactNode
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }
  onChange?: (value: number | [number, number]) => void
  onAfterChange?: (value: number | [number, number]) => void
  className?: string
  trackStyle?: React.CSSProperties
  handleStyle?: React.CSSProperties
  railStyle?: React.CSSProperties
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neon' | 'glass'
  size?: 'sm' | 'default' | 'lg'
  showValue?: boolean
  gradient?: boolean
}

const variantStyles = {
  default: {
    track: 'bg-blue-500',
    handle: 'bg-white border-2 border-blue-500 shadow-lg',
    rail: 'bg-gray-200 dark:bg-gray-700'
  },
  primary: {
    track: 'bg-blue-600',
    handle: 'bg-white border-2 border-blue-600 shadow-lg',
    rail: 'bg-gray-200 dark:bg-gray-700'
  },
  success: {
    track: 'bg-green-500',
    handle: 'bg-white border-2 border-green-500 shadow-lg',
    rail: 'bg-gray-200 dark:bg-gray-700'
  },
  warning: {
    track: 'bg-yellow-500',
    handle: 'bg-white border-2 border-yellow-500 shadow-lg',
    rail: 'bg-gray-200 dark:bg-gray-700'
  },
  danger: {
    track: 'bg-red-500',
    handle: 'bg-white border-2 border-red-500 shadow-lg',
    rail: 'bg-gray-200 dark:bg-gray-700'
  },
  neon: {
    track: 'bg-cyan-400 shadow-cyan-400/50',
    handle: 'bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/50',
    rail: 'bg-gray-800'
  },
  glass: {
    track: 'bg-white/30 backdrop-blur-sm',
    handle: 'bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg',
    rail: 'bg-gray-200/50 dark:bg-gray-700/50'
  }
}

const sizeStyles = {
  sm: {
    rail: 'h-1',
    track: 'h-1',
    handle: 'w-4 h-4'
  },
  default: {
    rail: 'h-2',
    track: 'h-2',
    handle: 'w-5 h-5'
  },
  lg: {
    rail: 'h-3',
    track: 'h-3',
    handle: 'w-6 h-6'
  }
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  marks,
  range = false,
  disabled = false,
  vertical = false,
  reverse = false,
  tooltip,
  onChange,
  onAfterChange,
  className,
  trackStyle,
  handleStyle,
  railStyle,
  variant = 'default',
  size = 'default',
  showValue = false,
  gradient = false
}) => {
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    value !== undefined ? value : defaultValue
  )
  const [isDragging, setIsDragging] = useState(false)
  const [activeHandle, setActiveHandle] = useState<number | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const currentValue = value !== undefined ? value : internalValue

  // Normalize marks
  const normalizedMarks = React.useMemo(() => {
    if (!marks) return []
    
    if (Array.isArray(marks)) {
      return marks
    }
    
    return Object.entries(marks).map(([value, label]) => ({
      value: Number(value),
      label,
      style: undefined
    }))
  }, [marks])

  // Calculate percentage from value
  const getPercentage = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100
  }, [min, max])

  // Calculate value from percentage
  const getValue = useCallback((percentage: number) => {
    const rawValue = min + (percentage / 100) * (max - min)
    return Math.round(rawValue / step) * step
  }, [min, max, step])

  // Get position from mouse/touch event
  const getPositionFromEvent = useCallback((event: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return 0

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

    if (vertical) {
      const position = ((rect.bottom - clientY) / rect.height) * 100
      return reverse ? 100 - position : position
    } else {
      const position = ((clientX - rect.left) / rect.width) * 100
      return reverse ? 100 - position : position
    }
  }, [vertical, reverse])

  // Handle mouse/touch start
  const handleStart = useCallback((event: React.MouseEvent | React.TouchEvent, handleIndex?: number) => {
    if (disabled) return

    event.preventDefault()
    setIsDragging(true)
    setActiveHandle(handleIndex ?? 0)
    setShowTooltip(true)

    const percentage = getPositionFromEvent(event.nativeEvent as MouseEvent | TouchEvent)
    const newValue = getValue(Math.max(0, Math.min(100, percentage)))

    if (range && Array.isArray(currentValue)) {
      const [start, end] = currentValue
      let newRange: [number, number]

      if (handleIndex === 0) {
        newRange = [Math.min(newValue, end), end]
      } else if (handleIndex === 1) {
        newRange = [start, Math.max(newValue, start)]
      } else {
        // Determine which handle is closer
        const startDistance = Math.abs(newValue - start)
        const endDistance = Math.abs(newValue - end)
        
        if (startDistance < endDistance) {
          newRange = [Math.min(newValue, end), end]
          setActiveHandle(0)
        } else {
          newRange = [start, Math.max(newValue, start)]
          setActiveHandle(1)
        }
      }

      if (value === undefined) {
        setInternalValue(newRange)
      }
      onChange?.(newRange)
    } else {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      if (value === undefined) {
        setInternalValue(clampedValue)
      }
      onChange?.(clampedValue)
    }
  }, [disabled, getPositionFromEvent, getValue, range, currentValue, value, onChange, min, max])

  // Handle mouse/touch move
  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging || disabled) return

    const percentage = getPositionFromEvent(event)
    const newValue = getValue(Math.max(0, Math.min(100, percentage)))

    if (range && Array.isArray(currentValue)) {
      const [start, end] = currentValue
      let newRange: [number, number]

      if (activeHandle === 0) {
        newRange = [Math.min(newValue, end), end]
      } else {
        newRange = [start, Math.max(newValue, start)]
      }

      if (value === undefined) {
        setInternalValue(newRange)
      }
      onChange?.(newRange)
    } else {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      if (value === undefined) {
        setInternalValue(clampedValue)
      }
      onChange?.(clampedValue)
    }
  }, [isDragging, disabled, getPositionFromEvent, getValue, range, currentValue, activeHandle, value, onChange, min, max])

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    setActiveHandle(null)
    setShowTooltip(false)
    onAfterChange?.(currentValue)
  }, [isDragging, onAfterChange, currentValue])

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e)
      const handleTouchMove = (e: TouchEvent) => handleMove(e)
      const handleMouseUp = () => handleEnd()
      const handleTouchEnd = () => handleEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMove, handleEnd])

  // Render tooltip
  const renderTooltip = (val: number, position: number) => {
    if (!tooltip?.open && !showTooltip) return null

    const content = tooltip?.formatter ? tooltip.formatter(val) : val

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg',
            'pointer-events-none whitespace-nowrap',
            vertical ? 'left-full ml-2' : 'bottom-full mb-2',
            vertical ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'
          )}
          style={vertical ? { top: `${100 - position}%` } : { left: `${position}%` }}
        >
          {content}
          <div
            className={cn(
              'absolute w-1 h-1 bg-gray-900 rotate-45',
              vertical ? '-left-0.5 top-1/2 -translate-y-1/2' : 'top-full left-1/2 -translate-x-1/2 -mt-0.5'
            )}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  // Calculate track style for range
  const getTrackStyle = () => {
    if (range && Array.isArray(currentValue)) {
      const [start, end] = currentValue
      const startPercentage = getPercentage(start)
      const endPercentage = getPercentage(end)
      
      if (vertical) {
        return {
          bottom: `${startPercentage}%`,
          height: `${endPercentage - startPercentage}%`
        }
      } else {
        return {
          left: `${startPercentage}%`,
          width: `${endPercentage - startPercentage}%`
        }
      }
    } else {
      const percentage = getPercentage(currentValue as number)
      
      if (vertical) {
        return {
          bottom: 0,
          height: `${percentage}%`
        }
      } else {
        return {
          left: 0,
          width: `${percentage}%`
        }
      }
    }
  }

  // Get handle positions
  const getHandlePositions = () => {
    if (range && Array.isArray(currentValue)) {
      return currentValue.map(val => getPercentage(val))
    } else {
      return [getPercentage(currentValue as number)]
    }
  }

  const handlePositions = getHandlePositions()
  const trackStyleObj = getTrackStyle()

  return (
    <div
      className={cn(
        'relative flex items-center',
        vertical ? 'flex-col h-64 w-8' : 'w-full h-8',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Value display */}
      {showValue && (
        <div className={cn(
          'text-sm font-medium text-gray-700 dark:text-gray-300',
          vertical ? 'mb-2' : 'mr-4'
        )}>
          {Array.isArray(currentValue) ? `${currentValue[0]} - ${currentValue[1]}` : currentValue}
        </div>
      )}

      {/* Slider container */}
      <div
        ref={sliderRef}
        className={cn(
          'relative flex-1 cursor-pointer',
          vertical ? 'w-full' : 'h-full',
          disabled && 'cursor-not-allowed'
        )}
        onMouseDown={(e) => handleStart(e)}
        onTouchStart={(e) => handleStart(e)}
      >
        {/* Rail */}
        <div
          className={cn(
            'absolute rounded-full',
            vertical ? 'w-full h-full' : 'w-full h-full',
            sizeStyles[size].rail,
            variantStyles[variant].rail
          )}
          style={{
            ...railStyle,
            ...(vertical ? { width: sizeStyles[size].rail.replace('h-', 'w-') } : {})
          }}
        />

        {/* Track */}
        <div
          className={cn(
            'absolute rounded-full transition-all duration-200',
            sizeStyles[size].track,
            gradient 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : variantStyles[variant].track
          )}
          style={{
            ...trackStyleObj,
            ...trackStyle,
            ...(vertical ? { width: sizeStyles[size].track.replace('h-', 'w-') } : {})
          }}
        />

        {/* Marks */}
        {normalizedMarks.map((mark) => {
          const position = getPercentage(mark.value)
          
          return (
            <div
              key={mark.value}
              className={cn(
                'absolute flex items-center justify-center',
                vertical ? 'left-full ml-2' : 'top-full mt-2'
              )}
              style={{
                ...(vertical ? { bottom: `${position}%` } : { left: `${position}%` }),
                transform: vertical ? 'translateY(50%)' : 'translateX(-50%)',
                ...mark.style
              }}
            >
              <div className={cn(
                'w-1 h-1 bg-gray-400 rounded-full',
                vertical ? 'absolute right-full mr-1' : 'absolute bottom-full mb-1'
              )} />
              {mark.label && (
                <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {mark.label}
                </span>
              )}
            </div>
          )
        })}

        {/* Handles */}
        {handlePositions.map((position, index) => (
          <div
            key={index}
            className={cn(
              'absolute rounded-full cursor-grab active:cursor-grabbing transition-all duration-200',
              'flex items-center justify-center',
              sizeStyles[size].handle,
              variantStyles[variant].handle,
              isDragging && activeHandle === index && 'scale-110 shadow-xl',
              disabled && 'cursor-not-allowed'
            )}
            style={{
              ...(vertical ? { 
                bottom: `${position}%`,
                left: '50%',
                transform: 'translate(-50%, 50%)'
              } : { 
                left: `${position}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }),
              ...handleStyle
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              handleStart(e, index)
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              handleStart(e, index)
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => !isDragging && setShowTooltip(false)}
          >
            {/* Handle inner dot */}
            <div className="w-2 h-2 bg-current rounded-full opacity-30" />
            
            {/* Tooltip */}
            {renderTooltip(
              Array.isArray(currentValue) ? currentValue[index] : currentValue as number,
              position
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 