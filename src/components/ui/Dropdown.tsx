import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown component');
  }
  return context;
};

export interface DropdownProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  modal?: boolean;
  className?: string;
}

export interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'neon' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  asChild?: boolean;
}

export interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neon' | 'minimal';
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
}

export interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shortcut?: string;
}

export interface DropdownSeparatorProps {
  className?: string;
}

export interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownRoot: React.FC<DropdownProps> = ({
  children,
  onOpenChange,
  defaultOpen = false,
  modal = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOpenChange(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen: handleOpenChange,
        triggerRef,
        contentRef,
      }}
    >
      <div className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  asChild = false,
}) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdownContext();

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    neon: 'bg-black/50 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10',
    glass: 'bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      'aria-expanded': isOpen,
      'aria-haspopup': 'menu',
      disabled,
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      disabled={disabled}
    >
      {children}
      <ChevronDown
        className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
};

const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  className,
  variant = 'default',
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  alignOffset = 0,
  avoidCollisions = true,
  collisionPadding = 8,
  sticky = 'partial',
  hideWhenDetached = false,
}) => {
  const { isOpen, triggerRef, contentRef } = useDropdownContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
    glass: 'bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50 backdrop-blur-md shadow-xl',
    neon: 'bg-black/90 border border-cyan-400/50 shadow-lg shadow-cyan-400/25',
    minimal: 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm',
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
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'fixed z-50 min-w-[8rem] rounded-lg p-1 focus:outline-none',
            variantClasses[variant],
            className
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  disabled = false,
  destructive = false,
  selected = false,
  onSelect,
  leftIcon,
  rightIcon,
  shortcut,
}) => {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    if (!disabled) {
      onSelect?.();
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700',
        destructive && 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
        selected && 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {leftIcon && (
        <span className="mr-2 h-4 w-4 flex-shrink-0">
          {leftIcon}
        </span>
      )}
      
      <span className="flex-1">{children}</span>
      
      {selected && !rightIcon && (
        <span className="ml-2 h-4 w-4 flex-shrink-0">
          <Check className="h-4 w-4" />
        </span>
      )}
      
      {rightIcon && (
        <span className="ml-2 h-4 w-4 flex-shrink-0">
          {rightIcon}
        </span>
      )}
      
      {shortcut && (
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {shortcut}
        </span>
      )}
    </div>
  );
};

const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className }) => {
  return (
    <div
      role="separator"
      className={cn(
        'my-1 h-px bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  );
};

const DropdownLabel: React.FC<DropdownLabelProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component exports
export const Dropdown = DropdownRoot as React.FC<DropdownProps> & {
  Trigger: React.FC<DropdownTriggerProps>;
  Content: React.FC<DropdownContentProps>;
  Item: React.FC<DropdownItemProps>;
  Separator: React.FC<DropdownSeparatorProps>;
  Label: React.FC<DropdownLabelProps>;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Label = DropdownLabel;

export default Dropdown; 