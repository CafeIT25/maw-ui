import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  X,
  CalendarDays,
  Target,
  Cpu
} from 'lucide-react';

// Portal Context for managing z-index layers
const PortalContext = React.createContext<HTMLElement | null>(null);

// Utility hook for creating high-level portals
const usePortal = () => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '999999'; // Extremely high z-index
    element.setAttribute('data-portal', 'date-picker-calendar');
    
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

  return portalElement;
};

// Advanced DatePicker Props Interface
interface NextGenDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: 'quantum' | 'neural' | 'holographic' | 'crystalline' | 'fusion';
  size?: 'nano' | 'micro' | 'standard' | 'macro' | 'cosmic';
  showTime?: boolean;
  showSeconds?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  timeFormat?: '12' | '24';
  calendarAnimation?: 'slide' | 'scale' | 'fade' | 'quantum' | 'neural';
  theme?: 'light' | 'dark' | 'auto' | 'matrix' | 'neon';
  precision?: 'day' | 'hour' | 'minute' | 'second';
  multiSelect?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  onDateHover?: (date: Date | null) => void;
  customCellRenderer?: (date: Date, isSelected: boolean, isToday: boolean) => React.ReactNode;
  quickPresets?: Array<{ label: string; value: Date; icon?: React.ReactNode }>;
  showWeekNumbers?: boolean;
  showOtherMonths?: boolean;
  enableKeyboardNavigation?: boolean;
  portalContainer?: HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
  onValidationError?: (error: string) => void;
  customValidation?: (date: Date) => string | null;
  accessibility?: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    announceSelection?: boolean;
  };
}

// Advanced Calendar Position Calculator
const calculateOptimalPosition = (
  triggerElement: HTMLElement,
  calendarElement: HTMLElement,
  preferredPosition: 'bottom' | 'top' | 'auto' = 'auto'
): { top: number; left: number; position: 'bottom' | 'top' } => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const calendarRect = calendarElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const calendarHeight = 400; // Estimated calendar height
  
  let finalPosition: 'bottom' | 'top' = 'bottom';
  let top: number;
  let left: number;

  // Determine vertical position
  if (preferredPosition === 'auto') {
    finalPosition = spaceBelow >= calendarHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top';
  } else {
    finalPosition = preferredPosition;
  }

  // Calculate top position
  if (finalPosition === 'bottom') {
    top = triggerRect.bottom + 8;
  } else {
    top = triggerRect.top - calendarHeight - 8;
  }

  // Calculate left position (center-aligned with bounds checking)
  left = triggerRect.left + (triggerRect.width / 2) - (380 / 2); // 380 is calendar width
  
  // Ensure calendar stays within viewport
  if (left < 16) left = 16;
  if (left + 380 > viewportWidth - 16) left = viewportWidth - 380 - 16;
  
  // Ensure top position is within viewport
  if (top < 16) top = 16;
  if (top + calendarHeight > viewportHeight - 16) top = viewportHeight - calendarHeight - 16;

  return { top, left, position: finalPosition };
};

// Next-Gen DatePicker Component
const NextGenDatePicker: React.FC<NextGenDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date & time",
  disabled = false,
  variant = 'quantum',
  size = 'standard',
  showTime = false,
  showSeconds = false,
  minDate,
  maxDate,
  locale = 'en-US',
  className = '',
  label,
  error,
  required = false,
  autoFocus = false,
  timeFormat = '24',
  calendarAnimation = 'quantum',
  theme = 'auto',
  precision = 'day',
  multiSelect = false,
  weekStartsOn = 0,
  disabledDates = [],
  highlightedDates = [],
  onDateHover,
  customCellRenderer,
  quickPresets = [],
  showWeekNumbers = false,
  showOtherMonths = true,
  enableKeyboardNavigation = true,
  portalContainer,
  onOpen,
  onClose,
  onValidationError,
  customValidation,
  accessibility = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [selectedTime, setSelectedTime] = useState(value ? {
    hours: value.getHours(),
    minutes: value.getMinutes(),
    seconds: value.getSeconds()
  } : { hours: 12, minutes: 0, seconds: 0 });
  const [inputValue, setInputValue] = useState('');
  const [focusedDate, setFocusedDate] = useState<Date | null>(value || null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0, position: 'bottom' as 'bottom' | 'top' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const portalElement = usePortal();

  // Format date with advanced internationalization
  const formatDate = useCallback((date: Date | null) => {
    if (!date) return '';
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(showTime && {
        hour: timeFormat === '12' ? 'numeric' : '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
        ...(timeFormat === '12' && { hour12: true })
      })
    };
    
    return date.toLocaleDateString(locale, options);
  }, [locale, showTime, timeFormat, showSeconds]);

  // Update input value when date changes
  useEffect(() => {
    if (value) {
      setInputValue(formatDate(value));
    } else {
      setInputValue('');
    }
  }, [value, formatDate]);

  // Auto-focus functionality
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Calculate calendar position when opened
  useEffect(() => {
    if (isOpen && inputRef.current && calendarRef.current) {
      const position = calculateOptimalPosition(inputRef.current, calendarRef.current);
      setCalendarPosition(position);
    }
  }, [isOpen]);

  // Enhanced click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const calendarElement = calendarRef.current;
      const inputElement = inputRef.current;
      
      if (calendarElement && inputElement && 
          !calendarElement.contains(target) && 
          !inputElement.contains(target)) {
        closeCalendar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          closeCalendar();
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedDate) {
            handleDateSelect(focusedDate);
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          event.preventDefault();
          navigateWithKeyboard(event.key);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedDate, enableKeyboardNavigation]);

  const navigateWithKeyboard = (key: string) => {
    if (!focusedDate) return;
    
    const newDate = new Date(focusedDate);
    
    switch (key) {
      case 'ArrowUp':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'ArrowLeft':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    
    setFocusedDate(newDate);
    if (newDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(newDate);
    }
  };

  const openCalendar = () => {
    if (disabled) return;
    setIsAnimating(true);
    setIsOpen(true);
    onOpen?.();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeCalendar = () => {
    setIsAnimating(true);
    setIsOpen(false);
    onClose?.();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDateSelect = (date: Date) => {
    if (disabled) return;
    
    const isDateDisabled = disabledDates.some(d => 
      d.getTime() === date.getTime()
    );
    
    if (isDateDisabled) return;
    
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    let finalDate = new Date(date);
    
    if (showTime) {
      finalDate.setHours(selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
    }

    // Custom validation
    if (customValidation) {
      const validationError = customValidation(finalDate);
      if (validationError) {
        onValidationError?.(validationError);
        return;
      }
    }

    onChange?.(finalDate);
    setFocusedDate(finalDate);
    
    if (!showTime) {
      closeCalendar();
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = (firstDay.getDay() - weekStartsOn + 7) % 7;

    const days = [];
    
    // Previous month's trailing days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: false,
        isFocused: false,
        isHighlighted: false
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = new Date().toDateString() === currentDate.toDateString();
      const isSelected = value?.toDateString() === currentDate.toDateString();
      const isFocused = focusedDate?.toDateString() === currentDate.toDateString();
      const isDisabled = (minDate && currentDate < minDate) || 
                        (maxDate && currentDate > maxDate) ||
                        disabledDates.some(d => d.toDateString() === currentDate.toDateString());
      const isHighlighted = highlightedDates.some(d => d.toDateString() === currentDate.toDateString());
      
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled,
        isFocused,
        isHighlighted
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: false,
        isFocused: false,
        isHighlighted: false
      });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  // Variant styles with quantum-inspired themes
  const variantStyles = {
    quantum: {
      input: 'border-2 border-blue-400/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      calendar: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 shadow-[0_20px_40px_rgba(59,130,246,0.2)]'
    },
    neural: {
      input: 'border-2 border-emerald-400/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      calendar: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-[0_20px_40px_rgba(16,185,129,0.2)]'
    },
    holographic: {
      input: 'border-2 border-violet-400/50 bg-gradient-to-r from-violet-50/50 to-fuchsia-50/50 dark:from-violet-900/20 dark:to-fuchsia-900/20 backdrop-blur-sm focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      calendar: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-violet-200/50 dark:border-violet-800/50 shadow-[0_20px_40px_rgba(139,92,246,0.2)]'
    },
    crystalline: {
      input: 'border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-50/50 to-sky-50/50 dark:from-cyan-900/20 dark:to-sky-900/20 backdrop-blur-sm focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      calendar: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-cyan-200/50 dark:border-cyan-800/50 shadow-[0_20px_40px_rgba(6,182,212,0.2)]'
    },
    fusion: {
      input: 'border-2 border-orange-400/50 bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm focus:border-orange-500 focus:shadow-[0_0_20px_rgba(249,115,22,0.3)]',
      calendar: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-orange-200/50 dark:border-orange-800/50 shadow-[0_20px_40px_rgba(249,115,22,0.2)]'
    }
  };

  const sizeStyles = {
    nano: 'px-2 py-1 text-xs',
    micro: 'px-3 py-2 text-sm',
    standard: 'px-4 py-3 text-base',
    macro: 'px-6 py-4 text-lg',
    cosmic: 'px-8 py-6 text-xl'
  };

  const animationClass = {
    slide: 'transition-all duration-300 ease-out',
    scale: 'transition-all duration-300 ease-out transform-gpu',
    fade: 'transition-opacity duration-300 ease-out',
    quantum: 'transition-all duration-500 ease-out transform-gpu animate-pulse',
    neural: 'transition-all duration-400 ease-in-out transform-gpu'
  };

  // Calendar Portal Component
  const CalendarPortal = () => {
    if (!isOpen || !portalElement) return null;

    return createPortal(
      <div
        ref={calendarRef}
        className={`
          fixed pointer-events-auto z-[999999]
          ${variantStyles[variant].calendar}
          ${animationClass[calendarAnimation]}
          ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
          rounded-3xl p-8 min-w-[400px] max-w-lg transform-gpu
        `}
        style={{
          top: `${calendarPosition.top}px`,
          left: `${calendarPosition.left}px`,
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
        }}
      >
        {/* Enhanced Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-3 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-blue-500 transition-colors transform group-hover:scale-110" />
          </Button>
          
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <Badge variant="glass" size="sm" className="text-xs">
                {variant.toUpperCase()}
              </Badge>
              {showTime && (
                <Badge variant="success" size="sm" className="text-xs">
                  {timeFormat}H FORMAT
                </Badge>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-3 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 group"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-blue-500 transition-colors transform group-hover:scale-110" />
          </Button>
        </div>

        {/* Enhanced Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
            <div key={day} className={`text-center text-sm font-bold py-3 rounded-lg ${
              [0, 6].includes(index) ? 'text-red-500 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Enhanced Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {getDaysInMonth(currentMonth).map((day, index) => {
            const dayComponent = customCellRenderer ? 
              customCellRenderer(day.date, day.isSelected, day.isToday) : (
                <span className="relative z-10">
                  {day.date.getDate()}
                </span>
              );

            return (
              <button
                key={index}
                onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                onMouseEnter={() => {
                  setHoveredDate(day.date);
                  onDateHover?.(day.date);
                }}
                onMouseLeave={() => {
                  setHoveredDate(null);
                  onDateHover?.(null);
                }}
                disabled={day.isDisabled}
                className={`
                  relative p-4 text-sm rounded-2xl transition-all duration-300 transform-gpu
                  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  ${day.isCurrentMonth 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500'
                  }
                  ${day.isSelected 
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-blue-500/25 scale-110 z-20' 
                    : ''
                  }
                  ${day.isToday && !day.isSelected 
                    ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-300 dark:ring-blue-700' 
                    : ''
                  }
                  ${day.isFocused && !day.isSelected
                    ? 'ring-2 ring-purple-400 bg-purple-50 dark:bg-purple-900/30'
                    : ''
                  }
                  ${day.isHighlighted && !day.isSelected && !day.isToday
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    : ''
                  }
                  ${day.isDisabled
                    ? 'opacity-30 cursor-not-allowed hover:scale-100'
                    : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }
                  ${hoveredDate?.getTime() === day.date.getTime() && !day.isSelected
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 scale-105'
                    : ''
                  }
                `}
              >
                {dayComponent}
                {day.isToday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
                )}
                {day.isHighlighted && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Enhanced Time Picker */}
        {showTime && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
              <h4 className="text-lg font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Precise Time Selection
              </h4>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Hour
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTime.hours}
                      onChange={(e) => setSelectedTime(prev => ({ ...prev, hours: parseInt(e.target.value) }))}
                      className="px-6 py-4 border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 text-center font-mono text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {Array.from({ length: timeFormat === '12' ? 12 : 24 }, (_, i) => {
                        const hour = timeFormat === '12' ? (i === 0 ? 12 : i) : i;
                        return (
                          <option key={i} value={timeFormat === '12' ? hour : i}>
                            {(timeFormat === '12' ? hour : i).toString().padStart(2, '0')}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-blue-400 pt-8 animate-pulse">:</div>
                
                <div className="text-center">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Minute
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTime.minutes}
                      onChange={(e) => setSelectedTime(prev => ({ ...prev, minutes: parseInt(e.target.value) }))}
                      className="px-6 py-4 border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 text-center font-mono text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {showSeconds && (
                  <>
                    <div className="text-4xl font-bold text-blue-400 pt-8 animate-pulse">:</div>
                    <div className="text-center">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Second
                      </label>
                      <div className="relative">
                        <select
                          value={selectedTime.seconds}
                          onChange={(e) => setSelectedTime(prev => ({ ...prev, seconds: parseInt(e.target.value) }))}
                          className="px-6 py-4 border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-white dark:bg-gray-800 text-center font-mono text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {timeFormat === '12' && (
                  <>
                    <div className="text-center">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Period
                      </label>
                      <div className="flex gap-2">
                        <Button
                          variant={selectedTime.hours < 12 ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedTime(prev => ({ 
                            ...prev, 
                            hours: prev.hours >= 12 ? prev.hours - 12 : prev.hours 
                          }))}
                          className="px-6 py-4 font-bold"
                        >
                          AM
                        </Button>
                        <Button
                          variant={selectedTime.hours >= 12 ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedTime(prev => ({ 
                            ...prev, 
                            hours: prev.hours < 12 ? prev.hours + 12 : prev.hours 
                          }))}
                          className="px-6 py-4 font-bold"
                        >
                          PM
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer Actions */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange?.(null);
                setInputValue('');
                closeCalendar();
              }}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date();
                if (showTime) {
                  today.setHours(selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
                }
                onChange?.(today);
                setCurrentMonth(today);
                setFocusedDate(today);
              }}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-200"
            >
              <Target className="w-4 h-4 mr-2" />
              Today
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={closeCalendar}
              className="px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Cancel
            </Button>
            
            {showTime && (
              <Button
                size="sm"
                onClick={closeCalendar}
                className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Apply
              </Button>
            )}
          </div>
        </div>

        {/* Quantum Enhancement Indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
          <Cpu className="w-3 h-3 text-white" />
        </div>
      </div>,
      portalElement
    );
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1 text-lg">*</span>}
        </label>
      )}
      
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={openCalendar}
          onFocus={openCalendar}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-2xl transition-all duration-300 cursor-pointer transform-gpu
            ${sizeStyles[size]}
            ${variantStyles[variant].input}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] group-hover:shadow-xl'}
            ${error ? 'border-red-500 focus:ring-red-500 shadow-red-200' : ''}
          `}
          readOnly
          aria-label={accessibility.ariaLabel || `${label} date picker`}
          aria-describedby={accessibility.ariaDescribedBy}
        />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300 group-hover:scale-110">
          <Calendar className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
        </div>

        {/* Quantum Enhancement Ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse pointer-events-none" />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}

      <CalendarPortal />
    </div>
  );
};

// Main Demo Component
export const DatePickerDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="space-y-8">
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <CalendarDays className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Next-Gen DatePicker v3.0</Badge>
              <Clock className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Quantum DatePicker Engine
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionary portal-based calendar rendering with absolute z-index control
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portal-Based Calendar Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <NextGenDatePicker
              label="Advanced Date Selection"
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select date with portal rendering"
              variant="quantum"
              size="standard"
              showTime
              calendarAnimation="quantum"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatePickerDemo; 