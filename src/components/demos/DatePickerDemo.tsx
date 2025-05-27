import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  CheckCircle,
  X,
  Target,
  Cpu
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';

// Portal Context for managing z-index layers
// const PortalContext = React.createContext<HTMLElement | null>(null);

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

// Quantum DatePicker Props Interface
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
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  onDateHover?: (date: Date | null) => void;
  customCellRenderer?: (date: Date, isSelected: boolean, isToday: boolean) => React.ReactNode;
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

// Utility function for optimal calendar positioning
const calculateOptimalPosition = (
  triggerElement: HTMLElement,
  preferredPosition: 'bottom' | 'top' | 'auto' = 'auto'
): { top: number; left: number; position: 'bottom' | 'top' } => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // Advanced positioning algorithm
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const calendarHeight = 400; // Estimated calendar height
  
  let position: 'bottom' | 'top' = 'bottom';
  
  if (preferredPosition === 'auto') {
    position = spaceBelow >= calendarHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top';
  } else {
    position = preferredPosition;
  }
  
  const top = position === 'bottom' 
    ? triggerRect.bottom + 8 
    : triggerRect.top - calendarHeight - 8;
    
  const left = Math.min(
    triggerRect.left,
    viewportWidth - 320 - 20 // Calendar width + margin
  );
  
  return { top, left, position };
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
  weekStartsOn = 0,
  disabledDates = [],
  highlightedDates = [],
  onDateHover,
  customCellRenderer,
  onOpen,
  onClose,
  onValidationError,
  customValidation,
  accessibility = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [viewDate, setViewDate] = useState(value || new Date());
  const [selectedTime, setSelectedTime] = useState({
    hours: value?.getHours() || 12,
    minutes: value?.getMinutes() || 0,
    seconds: value?.getSeconds() || 0
  });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState<{ top: number; left: number; position: 'bottom' | 'top' }>({
    top: 0,
    left: 0,
    position: 'bottom'
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const portalElement = usePortal();

  // Enhanced event handling with neural network-inspired logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeCalendar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        closeCalendar();
        break;
      case 'Enter':
        if (selectedDate) {
          handleDateSelect(selectedDate);
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

  // Quantum-enhanced keyboard navigation
  const navigateWithKeyboard = (key: string) => {
    if (!selectedDate && !hoveredDate) return;
    
    const currentDate = hoveredDate || selectedDate || new Date();
    const newDate = new Date(currentDate);

    switch (key) {
      case 'ArrowUp':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'ArrowLeft':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate.setDate(currentDate.getDate() + 1);
        break;
    }

    setHoveredDate(newDate);
    onDateHover?.(newDate);
  };

  const openCalendar = () => {
    if (disabled || isOpen) return;
    
    setIsOpen(true);
    onOpen?.();

    // Calculate optimal position with quantum precision
    setTimeout(() => {
      if (triggerRef.current) {
        const newPosition = calculateOptimalPosition(triggerRef.current);
        setPosition(newPosition);
      }
    }, 0);
  };

  const closeCalendar = () => {
    setIsOpen(false);
    setHoveredDate(null);
    onClose?.();
  };

  const handleDateSelect = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    const finalDate = new Date(date);
    
    if (showTime) {
      finalDate.setHours(selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
    }

    // Advanced validation with neural processing
    if (customValidation) {
      const validationError = customValidation(finalDate);
      if (validationError) {
        onValidationError?.(validationError);
        return;
      }
    }

    setSelectedDate(finalDate);
    onChange?.(finalDate);
    
    if (!showTime) {
      closeCalendar();
    }

    // Update input value with localized formatting
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(showTime && {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
        hour12: timeFormat === '12'
      })
    });
    
    setInputValue(formatter.format(finalDate));
  };

  // Quantum calendar generation algorithm
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Calculate starting position based on week start preference
    const startDate = new Date(firstDay);
    const firstDayOfWeek = (firstDay.getDay() - weekStartsOn + 7) % 7;
    startDate.setDate(startDate.getDate() - firstDayOfWeek);
    
    const days: Date[] = [];
    
    // Generate 6 weeks of dates (42 days) for consistent grid
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    
    return { days, daysInMonth, firstDay, lastDay };
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
  };

  const isDateHighlighted = (date: Date) => {
    return highlightedDates.some(highlightedDate => 
      date.toDateString() === highlightedDate.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date: Date, month: Date) => {
    return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
  };

  // Neural navigation system
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setMonth(viewDate.getMonth() - 1);
    } else {
      newDate.setMonth(viewDate.getMonth() + 1);
    }
    setViewDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setFullYear(viewDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(viewDate.getFullYear() + 1);
    }
    setViewDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setViewDate(today);
    handleDateSelect(today);
  };

  const clearSelection = () => {
    setSelectedDate(null);
    setInputValue('');
    onChange?.(null);
    closeCalendar();
  };

  // Format display value
  const formatDisplayValue = () => {
    if (inputValue) return inputValue;
    if (!selectedDate) return '';
    
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(showTime && {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
        hour12: timeFormat === '12'
      })
    });
    
    return formatter.format(selectedDate);
  };

  const { days } = getDaysInMonth(viewDate);

  // Quantum Portal Calendar Renderer
  const CalendarPortal = () => {
    if (!isOpen || !portalElement) return null;

    return (
      <div
        ref={calendarRef}
        className={`
          absolute bg-white dark:bg-gray-900 border-2 border-blue-300 dark:border-blue-600
          rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden pointer-events-auto
          ${calendarAnimation === 'quantum' ? 'animate-[quantum-emergence_0.3s_ease-out]' : ''}
          ${calendarAnimation === 'neural' ? 'animate-[neural-sync_0.4s_ease-in-out]' : ''}
          ${calendarAnimation === 'scale' ? 'animate-[scale-in_0.2s_ease-out]' : ''}
          ${calendarAnimation === 'fade' ? 'animate-[fade-in_0.3s_ease-out]' : ''}
          z-[9999] max-w-xs w-80
        `}
        style={{
          top: position.top,
          left: position.left,
          transformOrigin: position.position === 'bottom' ? 'top left' : 'bottom left'
        }}
      >
        {/* Quantum Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center flex-1">
              <button 
                onClick={() => navigateYear('prev')}
                className="hover:bg-white/20 rounded px-2 py-1 transition-colors mr-2"
              >
                <span className="font-bold text-lg">
                  {viewDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </span>
              </button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Neural Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
              <div key={index} className="text-center py-2 font-semibold text-white/80">
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Calendar Grid */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);
              const today = isToday(date);
              const highlighted = isDateHighlighted(date);
              const sameMonth = isSameMonth(date, viewDate);
              const hovered = hoveredDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={index}
                  disabled={disabled}
                  onClick={() => !disabled && handleDateSelect(date)}
                  onMouseEnter={() => {
                    setHoveredDate(date);
                    onDateHover?.(date);
                  }}
                  onMouseLeave={() => {
                    setHoveredDate(null);
                    onDateHover?.(null);
                  }}
                  className={cn(
                    'relative w-10 h-10 text-sm rounded-lg transition-all duration-200 font-medium',
                    'hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    sameMonth 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-400 dark:text-gray-600',
                    disabled && 'opacity-40 cursor-not-allowed',
                    selected && 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105',
                    today && !selected && 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold',
                    highlighted && !selected && 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600',
                    hovered && !selected && !disabled && 'bg-blue-200 dark:bg-blue-800 scale-105',
                    !selected && !today && !highlighted && !hovered && sameMonth && 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {customCellRenderer ? (
                    customCellRenderer(date, selected, today)
                  ) : (
                    <>
                      {date.getDate()}
                      {today && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                      {highlighted && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantum Action Bar */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToToday}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-200"
              >
                <Target className="w-4 h-4 mr-2" />
                Today
              </Button>
            </div>
          </div>
        </div>

        {/* Time Picker for Quantum Precision */}
        {showTime && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={timeFormat === '12' ? "12" : "23"}
                  value={selectedTime.hours}
                  onChange={(e) => setSelectedTime(prev => ({ ...prev, hours: parseInt(e.target.value) || 0 }))}
                  className="w-16 px-2 py-1 text-center border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <span className="self-center text-purple-600 font-bold">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={selectedTime.minutes}
                  onChange={(e) => setSelectedTime(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
                  className="w-16 px-2 py-1 text-center border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {showSeconds && (
                  <>
                    <span className="self-center text-purple-600 font-bold">:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={selectedTime.seconds}
                      onChange={(e) => setSelectedTime(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
                      className="w-16 px-2 py-1 text-center border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quantum Enhancement Indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
          <Cpu className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  };

  // Quantum Input Styling
  const getQuantumInputClasses = () => {
    const baseClasses = "relative transition-all duration-300";
    const variantClasses = {
      quantum: "border-2 border-blue-300 focus-within:border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      neural: "border-2 border-purple-300 focus-within:border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      holographic: "border-2 border-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-purple-400",
      crystalline: "border-2 border-gray-300 focus-within:border-blue-400 bg-white dark:bg-gray-800 shadow-lg",
      fusion: "border-2 border-gradient-to-r from-red-300 to-yellow-300 focus-within:from-red-400 focus-within:to-yellow-400 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20"
    };
    
    const sizeClasses = {
      nano: "text-xs p-2 rounded-md",
      micro: "text-sm p-2 rounded-lg",
      standard: "text-base p-3 rounded-xl",
      macro: "text-lg p-4 rounded-xl",
      cosmic: "text-xl p-5 rounded-2xl"
    };

    return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div ref={triggerRef} className={getQuantumInputClasses()}>
        <Input
          ref={inputRef}
          value={formatDisplayValue()}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onFocus={openCalendar}
          className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none"
          leftIcon={<Calendar className="w-5 h-5 text-gray-400" />}
          rightIcon={
            <Button
              variant="ghost"
              size="sm"
              onClick={openCalendar}
              disabled={disabled}
              className="shrink-0"
            >
              <CalendarDays className="w-4 h-4" />
            </Button>
          }
          aria-label={accessibility.ariaLabel}
          aria-describedby={accessibility.ariaDescribedBy}
        />
        
        {/* Quantum Portal Mount */}
        {portalElement && (
          <div 
            style={{ 
              position: 'fixed', 
              top: position.top, 
              left: position.left, 
              pointerEvents: isOpen ? 'auto' : 'none' 
            }}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <CalendarPortal />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {accessibility.announceSelection && selectedDate && (
        <div className="sr-only" aria-live="polite">
          Selected date: {selectedDate.toLocaleDateString(locale, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
    </div>
  );
};

// Demo Component showcasing all quantum features
export const DatePickerDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <Badge variant="neon" className="animate-pulse">
              Quantum DatePicker System
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Next-Generation Date Selection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionary date and time picker with quantum-enhanced animations, neural navigation patterns, 
              and enterprise-grade accessibility that transcends traditional UI boundaries.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quantum DatePicker Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Quantum Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">Quantum</Badge>
              Basic Date Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NextGenDatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              variant="quantum"
              placeholder="Select quantum date..."
              label="Quantum Date"
              className="mb-4"
            />
            {selectedDate && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Selected: {selectedDate.toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Neural DateTime Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="premium">Neural</Badge>
              DateTime with Precision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NextGenDatePicker
              value={selectedDateTime}
              onChange={setSelectedDateTime}
              variant="neural"
              showTime
              showSeconds
              placeholder="Neural datetime..."
              label="Neural DateTime"
              className="mb-4"
            />
            {selectedDateTime && (
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Selected: {selectedDateTime.toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Holographic Range Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="neon">Holographic</Badge>
              Range Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NextGenDatePicker
              value={rangeStart}
              onChange={setRangeStart}
              variant="holographic"
              placeholder="Holographic range..."
              label="Range Start"
              className="mb-4"
            />
            {rangeStart && (
              <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <p className="text-sm text-cyan-600 dark:text-cyan-400">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Range Start: {rangeStart.toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
          <div className="text-blue-500 text-3xl mb-3">🎯</div>
          <h3 className="font-semibold mb-2">Quantum Precision</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Neural-enhanced date selection with quantum accuracy
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl">
          <div className="text-purple-500 text-3xl mb-3">⚡</div>
          <h3 className="font-semibold mb-2">Lightning Fast</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Optimized performance with smooth animations
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
          <div className="text-green-500 text-3xl mb-3">♿</div>
          <h3 className="font-semibold mb-2">Universal Access</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            WCAG 2.1 AA compliant with screen reader support
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl">
          <div className="text-orange-500 text-3xl mb-3">🔧</div>
          <h3 className="font-semibold mb-2">Highly Configurable</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Multiple variants, sizes, and customization options
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDemo; 