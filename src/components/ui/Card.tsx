import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

const cardVariants = cva(
  "rounded-2xl border transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-900 dark:border-gray-800",
        elevated: "bg-white border-gray-200 shadow-lg hover:shadow-xl dark:bg-gray-900 dark:border-gray-800",
        outlined: "bg-transparent border-2 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500",
        ghost: "bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
        gradient: "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 dark:from-blue-950 dark:to-purple-950 dark:border-blue-800",
        glass: "bg-white/10 backdrop-blur-md border-white/20 shadow-lg",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50",
        premium: "bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-200 shadow-lg hover:shadow-xl dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 dark:border-purple-800",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        none: "",
        lift: "",
        scale: "",
        glow: "hover:shadow-2xl",
        tilt: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "lift",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean
  loading?: boolean
  shimmer?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, interactive = false, loading = false, shimmer = false, children, ...props }, ref) => {
    const motionProps = interactive ? {
      whileHover: { 
        scale: hover === 'scale' ? 1.05 : 1,
        y: hover === 'lift' ? -8 : 0,
        rotateX: hover === 'tilt' ? 5 : 0,
        rotateY: hover === 'tilt' ? 5 : 0,
      },
      whileTap: { scale: 0.98 },
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.5,
        duration: 0.15
      },
    } : {}

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, hover, className }),
          interactive && "cursor-pointer",
          loading && "animate-pulse"
        )}
        {...motionProps}
        {...(props as HTMLMotionProps<"div">)}
      >
        {shimmer && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
        )}
        
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
            <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700 w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700 w-1/2" />
          </div>
        ) : (
          children
        )}
        
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/5 rounded-2xl blur-xl group-hover:bg-cyan-400/10 transition-colors duration-300" />
        )}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-6", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 