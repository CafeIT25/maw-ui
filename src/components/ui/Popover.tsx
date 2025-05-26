import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover component');
  }
  return context;
};

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
  className?: string;
}

export interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neon' | 'minimal' | 'elevated';
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
  hideWhenDetached?: boolean;
  sticky?: 'partial' | 'always';
}

export interface PopoverArrowProps {
  className?: string;
  width?: number;
  height?: number;
}

const PopoverRoot: React.FC<PopoverProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
  modal = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(open ?? defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentOpen = open !== undefined ? open : isOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (open === undefined) {
      setIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentOpen &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && currentOpen) {
        handleOpenChange(false);
        triggerRef.current?.focus();
      }
    };

    if (currentOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [currentOpen]);

  return (
    <PopoverContext.Provider
      value={{
        isOpen: currentOpen,
        setIsOpen: handleOpenChange,
        triggerRef,
        contentRef,
      }}
    >
      <div className={cn('relative inline-block', className)}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  className,
  asChild = false,
}) => {
  const { isOpen, setIsOpen, triggerRef } = usePopoverContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      'aria-expanded': isOpen,
      'aria-haspopup': 'dialog',
    } as any);
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
};

const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  className,
  variant = 'default',
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  alignOffset = 0,
  avoidCollisions = true,
  collisionPadding = 8,
  hideWhenDetached = false,
  sticky = 'partial',
}) => {
  const { isOpen, triggerRef, contentRef } = usePopoverContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
    glass: 'bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50 backdrop-blur-md shadow-xl',
    neon: 'bg-black/90 border border-cyan-400/50 shadow-lg shadow-cyan-400/25',
    minimal: 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl',
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let x = 0;
    let y = 0;

    // Calculate base position
    switch (side) {
      case 'top':
        x = triggerRect.left;
        y = triggerRect.top - contentRect.height - sideOffset;
        break;
      case 'bottom':
        x = triggerRect.left;
        y = triggerRect.bottom + sideOffset;
        break;
      case 'left':
        x = triggerRect.left - contentRect.width - sideOffset;
        y = triggerRect.top;
        break;
      case 'right':
        x = triggerRect.right + sideOffset;
        y = triggerRect.top;
        break;
    }

    // Apply alignment
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'center':
          x = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'end':
          x = triggerRect.right - contentRect.width;
          break;
      }
      x += alignOffset;
    } else {
      switch (align) {
        case 'center':
          y = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
          break;
        case 'end':
          y = triggerRect.bottom - contentRect.height;
          break;
      }
      y += alignOffset;
    }

    // Collision detection
    if (avoidCollisions) {
      if (x < collisionPadding) x = collisionPadding;
      if (x + contentRect.width > viewport.width - collisionPadding) {
        x = viewport.width - contentRect.width - collisionPadding;
      }
      if (y < collisionPadding) y = collisionPadding;
      if (y + contentRect.height > viewport.height - collisionPadding) {
        y = viewport.height - contentRect.height - collisionPadding;
      }
    }

    setPosition({ x, y });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);

      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, scale: 0.95, y: side === 'top' ? 10 : -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: side === 'top' ? 10 : -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'fixed z-50 rounded-lg p-4 focus:outline-none',
            variantClasses[variant],
            className
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

const PopoverArrow: React.FC<PopoverArrowProps> = ({
  className,
  width = 10,
  height = 5,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('absolute', className)}
    >
      <polygon
        points={`0,${height} ${width / 2},0 ${width},${height}`}
        className="fill-current"
      />
    </svg>
  );
};

// Compound component exports
export const Popover = PopoverRoot as React.FC<PopoverProps> & {
  Trigger: React.FC<PopoverTriggerProps>;
  Content: React.FC<PopoverContentProps>;
  Arrow: React.FC<PopoverArrowProps>;
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Arrow = PopoverArrow;

export default Popover; 