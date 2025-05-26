import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'neon' | 'glass' | 'gradient' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  variant = 'default',
  size = 'md',
  label,
  description,
  className,
  id,
  name,
  required = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);
  const switchRef = useRef<HTMLButtonElement>(null);

  const currentChecked = checked !== undefined ? checked : isChecked;

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !currentChecked;
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  const sizeConfig = {
    sm: {
      track: 'h-4 w-7',
      thumb: 'h-3 w-3',
      translate: 'translate-x-3',
      text: 'text-xs',
    },
    md: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
      text: 'text-sm',
    },
    lg: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-base',
    },
  };

  const variantConfig = {
    default: {
      trackOff: 'bg-gray-200 dark:bg-gray-700',
      trackOn: 'bg-blue-600 dark:bg-blue-500',
      thumb: 'bg-white shadow-lg',
      focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    },
    neon: {
      trackOff: 'bg-gray-800 border border-gray-600',
      trackOn: 'bg-cyan-500/20 border border-cyan-400',
      thumb: 'bg-cyan-400 shadow-lg shadow-cyan-400/50',
      focus: 'focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900',
    },
    glass: {
      trackOff: 'bg-white/10 border border-white/20 backdrop-blur-sm',
      trackOn: 'bg-blue-500/30 border border-blue-400/50 backdrop-blur-sm',
      thumb: 'bg-white/90 shadow-lg backdrop-blur-sm',
      focus: 'focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent',
    },
    gradient: {
      trackOff: 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600',
      trackOn: 'bg-gradient-to-r from-purple-500 to-blue-500',
      thumb: 'bg-white shadow-lg',
      focus: 'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
    },
    minimal: {
      trackOff: 'bg-gray-100 dark:bg-gray-800',
      trackOn: 'bg-gray-900 dark:bg-gray-100',
      thumb: 'bg-white dark:bg-gray-900 shadow-sm',
      focus: 'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    },
  };

  const config = sizeConfig[size];
  const colors = variantConfig[variant];

  const switchElement = (
    <button
      ref={switchRef}
      type="button"
      role="switch"
      aria-checked={currentChecked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out',
        'focus:outline-none',
        config.track,
        colors.focus,
        currentChecked ? colors.trackOn : colors.trackOff,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <motion.span
        className={cn(
          'pointer-events-none inline-block rounded-full transition-transform duration-200 ease-in-out',
          config.thumb,
          colors.thumb
        )}
        animate={{
          x: currentChecked ? config.translate.replace('translate-x-', '') : '0',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      
      {/* Hidden input for form submission */}
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={currentChecked}
        onChange={() => {}} // Controlled by button click
        required={required}
        className="sr-only"
        tabIndex={-1}
      />
    </button>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {switchElement}
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'font-medium text-gray-900 dark:text-gray-100 cursor-pointer',
                config.text,
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                'text-gray-500 dark:text-gray-400',
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs',
                disabled && 'opacity-50'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return switchElement;
};

export default Switch; 