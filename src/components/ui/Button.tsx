import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus-visible:ring-blue-500",
        destructive: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 focus-visible:ring-red-500",
        outline: "border-2 border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus-visible:ring-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800",
        secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-sm hover:from-gray-200 hover:to-gray-300 focus-visible:ring-gray-500 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500 dark:text-blue-400",
        success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 focus-visible:ring-green-500",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-orange-600 focus-visible:ring-yellow-500",
        premium: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-purple-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500",
        neon: "bg-black text-cyan-400 border-2 border-cyan-400 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50 hover:text-cyan-300 hover:border-cyan-300 focus-visible:ring-cyan-400",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 focus-visible:ring-white/50",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 py-1.5 text-xs",
        lg: "h-13 px-8 py-3 text-base",
        xl: "h-16 px-10 py-4 text-lg",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-13 w-13",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        wiggle: "hover:animate-wiggle",
        glow: "animate-glow",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
  gradient?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    ripple = true,
    gradient = false,
    children,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return
      
      if (ripple) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        const rippleElement = document.createElement('span')
        rippleElement.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `
        
        button.appendChild(rippleElement)
        setTimeout(() => rippleElement.remove(), 600)
      }
      
      onClick?.(e)
    }

    const motionProps = {
      whileHover: { scale: variant === 'premium' ? 1.05 : 1.02 },
      whileTap: { scale: 0.995 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    } as const

    const buttonClassName = cn(
      buttonVariants({ variant, size, animation, className }),
      gradient && "bg-gradient-to-r from-current to-transparent",
      loading && "cursor-not-allowed"
    )

    if (asChild) {
      return (
        <Slot
          className={buttonClassName}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        className={buttonClassName}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        {...motionProps}
        {...(props as HTMLMotionProps<"button">)}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-200",
          loading && "opacity-0"
        )}>
          {leftIcon && (
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              {leftIcon}
            </motion.span>
          )}
          
          {children && (
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.span>
          )}
          
          {rightIcon && (
            <motion.span
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0"
            >
              {rightIcon}
            </motion.span>
          )}
        </div>
        
        {/* Shine effect for premium variant */}
        {variant === 'premium' && (
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
        
        {/* Glow effect for neon variant */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/10 rounded-xl blur-xl group-hover:bg-cyan-400/20 transition-colors duration-300" />
        )}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants } 