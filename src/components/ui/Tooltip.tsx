import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  variant?: 'default' | 'dark' | 'light' | 'neon' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  disabled?: boolean;
  arrow?: boolean;
  interactive?: boolean;
  className?: string;
  contentClassName?: string;
  maxWidth?: number;
  offset?: number;
}

interface Position {
  x: number;
  y: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  variant = 'default',
  size = 'md',
  delay = 200,
  disabled = false,
  arrow = true,
  interactive = false,
  className,
  contentClassName,
  maxWidth = 300,
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const variantClasses = {
    default: 'bg-gray-900 text-white border border-gray-700',
    dark: 'bg-black text-white border border-gray-800',
    light: 'bg-white text-gray-900 border border-gray-200 shadow-lg',
    neon: 'bg-black/90 text-cyan-400 border border-cyan-400/50 shadow-lg shadow-cyan-400/25',
    glass: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let x = 0;
    let y = 0;

    // Calculate base position
    switch (side) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Apply alignment
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          x = triggerRect.left;
          break;
        case 'end':
          x = triggerRect.right - tooltipRect.width;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          y = triggerRect.top;
          break;
        case 'end':
          y = triggerRect.bottom - tooltipRect.height;
          break;
      }
    }

    // Viewport collision detection
    if (x < 8) x = 8;
    if (x + tooltipRect.width > viewport.width - 8) {
      x = viewport.width - tooltipRect.width - 8;
    }
    if (y < 8) y = 8;
    if (y + tooltipRect.height > viewport.height - 8) {
      y = viewport.height - tooltipRect.height - 8;
    }

    setPosition({ x, y });
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (!interactive) {
      setIsVisible(false);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }
  };

  const handleTooltipEnter = () => {
    if (interactive && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTooltipLeave = () => {
    if (interactive) {
      hideTooltip();
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 transform rotate-45';
    const variantArrowClasses = {
      default: 'bg-gray-900 border-l border-t border-gray-700',
      dark: 'bg-black border-l border-t border-gray-800',
      light: 'bg-white border-l border-t border-gray-200',
      neon: 'bg-black/90 border-l border-t border-cyan-400/50',
      glass: 'bg-white/10 border-l border-t border-white/20',
      gradient: 'bg-purple-600',
    };

    let positionClasses = '';
    switch (side) {
      case 'top':
        positionClasses = 'bottom-[-4px] left-1/2 -translate-x-1/2';
        break;
      case 'bottom':
        positionClasses = 'top-[-4px] left-1/2 -translate-x-1/2';
        break;
      case 'left':
        positionClasses = 'right-[-4px] top-1/2 -translate-y-1/2';
        break;
      case 'right':
        positionClasses = 'left-[-4px] top-1/2 -translate-y-1/2';
        break;
    }

    return cn(baseClasses, variantArrowClasses[variant], positionClasses);
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.95, y: side === 'top' ? 10 : side === 'bottom' ? -10 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: side === 'top' ? 10 : side === 'bottom' ? -10 : 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'fixed z-50 rounded-lg font-medium pointer-events-auto',
            variantClasses[variant],
            sizeClasses[size],
            contentClassName
          )}
          style={{
            left: position.x,
            top: position.y,
            maxWidth,
          }}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          {content}
          {arrow && <div className={getArrowClasses()} />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('inline-block', className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip; 