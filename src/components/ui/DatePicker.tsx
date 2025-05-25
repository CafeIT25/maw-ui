import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  X,
  Check
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Input } from './Input'

export interface DatePickerProps {
  value?: Date | [Date, Date] | null
  defaultValue?: Date | [Date, Date] | null
  onChange?: (date: Date | [Date, Date] | null) => void
  placeholder?: string
  format?: string
  range?: boolean
  showTime?: boolean
  disabled?: boolean
  disabledDate?: (date: Date) => boolean
  presets?: Array<{
    label: string
    value: Date | [Date, Date]
  }>
  className?: string
  variant?: 'default' | 'filled' | 'outlined' | 'ghost' | 'neon'
  size?: 'sm' | 'default' | 'lg'
  clearable?: boolean
  showToday?: boolean
  showWeekNumbers?: boolean
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatDate = (date: Date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
}

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

const isInRange = (date: Date, start: Date, end: Date) => {
  return date >= start && date <= end
}

const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = 'Select date',
  format = 'YYYY-MM-DD',
  range = false,
  showTime = false,
  disabled = false,
  disabledDate,
  presets,
  className,
  variant = 'default',
  size = 'default',
  clearable = true,
  showToday = true,
  showWeekNumbers = false,
  firstDayOfWeek = 0
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<Date | [Date, Date] | null>(
    value !== undefined ? value : defaultValue || null
  )
  const [viewDate, setViewDate] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [timeValue, setTimeValue] = useState({ hours: 0, minutes: 0 })
  
  const containerRef = useRef<HTMLDivElement>(null)
  const currentValue = value !== undefined ? value : internalValue

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - ((firstDay.getDay() - firstDayOfWeek + 7) % 7))
    
    const days = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (disabled || disabledDate?.(date)) return

    let newValue: Date | [Date, Date] | null

    if (range) {
      if (!currentValue || !Array.isArray(currentValue)) {
        newValue = [date, date]
      } else {
        const [start, end] = currentValue
        if (isSameDay(start, end)) {
          newValue = date < start ? [date, start] : [start, date]
        } else {
          newValue = [date, date]
        }
      }
    } else {
      newValue = new Date(date)
      if (showTime) {
        newValue.setHours(timeValue.hours, timeValue.minutes)
      }
      setIsOpen(false)
    }

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  // Handle preset selection
  const handlePresetSelect = (presetValue: Date | [Date, Date]) => {
    if (value === undefined) {
      setInternalValue(presetValue)
    }
    onChange?.(presetValue)
    setIsOpen(false)
  }

  // Handle clear
  const handleClear = () => {
    if (value === undefined) {
      setInternalValue(null)
    }
    onChange?.(null)
  }

  // Handle time change
  const handleTimeChange = (type: 'hours' | 'minutes', val: number) => {
    const newTime = { ...timeValue, [type]: val }
    setTimeValue(newTime)
    
    if (currentValue && !Array.isArray(currentValue)) {
      const newDate = new Date(currentValue)
      newDate.setHours(newTime.hours, newTime.minutes)
      
      if (value === undefined) {
        setInternalValue(newDate)
      }
      onChange?.(newDate)
    }
  }

  // Format display value
  const getDisplayValue = () => {
    if (!currentValue) return ''
    
    if (Array.isArray(currentValue)) {
      const [start, end] = currentValue
      if (isSameDay(start, end)) {
        return formatDate(start, format)
      }
      return `${formatDate(start, format)} - ${formatDate(end, format)}`
    }
    
    return formatDate(currentValue, showTime ? `${format} HH:mm` : format)
  }

  // Check if date is selected
  const isDateSelected = (date: Date) => {
    if (!currentValue) return false
    
    if (Array.isArray(currentValue)) {
      const [start, end] = currentValue
      return isInRange(date, start, end)
    }
    
    return isSameDay(date, currentValue)
  }

  // Check if date is in hover range
  const isDateInHoverRange = (date: Date) => {
    if (!range || !hoveredDate || !currentValue || !Array.isArray(currentValue)) return false
    
    const [start, end] = currentValue
    if (!isSameDay(start, end)) return false
    
    const rangeStart = hoveredDate < start ? hoveredDate : start
    const rangeEnd = hoveredDate > start ? hoveredDate : start
    
    return isInRange(date, rangeStart, rangeEnd)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const today = new Date()

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <Input
        value={getDisplayValue()}
        placeholder={placeholder}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        variant={variant}
        size={size}
        leftIcon={<Calendar size={16} />}
        rightIcon={
          clearable && currentValue ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          ) : undefined
        }
        className="cursor-pointer"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
              'rounded-xl shadow-lg overflow-hidden',
              variant === 'neon' && 'bg-black border-cyan-400 shadow-cyan-400/25'
            )}
          >
            <div className="flex">
              {/* Presets */}
              {presets && presets.length > 0 && (
                <div className="w-48 border-r border-gray-200 dark:border-gray-700 p-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quick Select
                  </div>
                  <div className="space-y-1">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => handlePresetSelect(preset.value)}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calendar */}
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <div className="text-lg font-semibold">
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {showWeekNumbers && <div className="w-8 h-8" />}
                  {WEEKDAYS.map((day, index) => {
                    const dayIndex = (index + firstDayOfWeek) % 7
                    return (
                      <div
                        key={day}
                        className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
                      >
                        {WEEKDAYS[dayIndex]}
                      </div>
                    )
                  })}
                </div>

                {/* Calendar Grid */}
                <div className="space-y-1">
                  {Array.from({ length: 6 }, (_, weekIndex) => (
                    <div key={weekIndex} className="flex gap-1">
                      {showWeekNumbers && (
                        <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">
                          {getWeekNumber(calendarDays[weekIndex * 7])}
                        </div>
                      )}
                      {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => {
                        const isCurrentMonth = date.getMonth() === viewDate.getMonth()
                        const isToday = isSameDay(date, today)
                        const isSelected = isDateSelected(date)
                        const isHovered = isDateInHoverRange(date)
                        const isDisabled = disabledDate?.(date)

                        return (
                          <motion.button
                            key={`${weekIndex}-${dayIndex}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateSelect(date)}
                            onMouseEnter={() => setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            disabled={isDisabled}
                            className={cn(
                              'w-8 h-8 flex items-center justify-center text-sm rounded-lg transition-all duration-150',
                              'hover:bg-gray-100 dark:hover:bg-gray-800',
                              !isCurrentMonth && 'text-gray-400 dark:text-gray-600',
                              isToday && 'font-bold text-blue-600 dark:text-blue-400',
                              isSelected && 'bg-blue-500 text-white hover:bg-blue-600',
                              isHovered && !isSelected && 'bg-blue-100 dark:bg-blue-900/50',
                              isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
                            )}
                          >
                            {date.getDate()}
                          </motion.button>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Time Picker */}
                {showTime && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <div className="flex items-center gap-1">
                        <select
                          value={timeValue.hours}
                          onChange={(e) => handleTimeChange('hours', parseInt(e.target.value))}
                          className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>
                              {String(i).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <span className="text-gray-500">:</span>
                        <select
                          value={timeValue.minutes}
                          onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value))}
                          className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option key={i} value={i}>
                              {String(i).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  {showToday && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDateSelect(today)}
                    >
                      Today
                    </Button>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    {range && (
                      <Button
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        leftIcon={<Check size={14} />}
                      >
                        OK
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 