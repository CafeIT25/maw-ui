import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { X, Zap, Star, Crown, Shield } from 'lucide-react'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800",
        secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
        success: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800",
        error: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800",
        neon: "bg-black border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs rounded",
        sm: "px-2 py-1 text-xs rounded-md",
        default: "px-2.5 py-1.5 text-sm rounded-md",
        lg: "px-3 py-2 text-base rounded-lg",
        xl: "px-4 py-2.5 text-lg rounded-lg",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  closable?: boolean
  onClose?: () => void
  pulse?: boolean
  glow?: boolean
  count?: number
  maxCount?: number
  showZero?: boolean
  dot?: boolean
  animated?: boolean
  href?: string
  target?: string
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape,
    icon,
    iconPosition = 'left',
    closable = false,
    onClose,
    pulse = false,
    glow = false,
    count,
    maxCount = 99,
    showZero = false,
    dot = false,
    animated = false,
    href,
    target,
    children,
    ...props 
  }, ref) => {
    const displayCount = count !== undefined ? (count > maxCount ? `${maxCount}+` : count.toString()) : null
    const shouldShow = count !== undefined ? (showZero || count > 0) : true

    if (!shouldShow) return null

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        
        {dot ? (
          <span className="w-2 h-2 rounded-full bg-current" />
        ) : count !== undefined ? (
          displayCount
        ) : (
          children
        )}
        
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        
        {closable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="ml-1 flex-shrink-0 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </>
    )

    const badgeClasses = cn(
      badgeVariants({ variant, size, shape, className }),
      pulse && "animate-pulse",
      glow && variant === 'neon' && "animate-pulse",
      animated && "hover:scale-105 active:scale-95"
    )

    const motionProps = animated ? {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    } : {}

    if (href) {
      return (
        <motion.a
          ref={ref as any}
          href={href}
          target={target}
          className={badgeClasses}
          {...motionProps}
          {...props}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <motion.span
        ref={ref}
        className={badgeClasses}
        {...motionProps}
        {...props}
      >
        {content}
        
        {/* Neon glow effect */}
        {variant === 'neon' && glow && (
          <span className="absolute inset-0 bg-cyan-400/20 rounded-inherit blur-sm -z-10" />
        )}
      </motion.span>
    )
  }
)

Badge.displayName = "Badge"

// Status Badge Component
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'idle'
  showText?: boolean
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showText = true,
  ...props
}) => {
  const statusConfig = {
    online: { variant: 'success' as const, text: 'Online', icon: '🟢' },
    offline: { variant: 'secondary' as const, text: 'Offline', icon: '⚫' },
    away: { variant: 'warning' as const, text: 'Away', icon: '🟡' },
    busy: { variant: 'error' as const, text: 'Busy', icon: '🔴' },
    idle: { variant: 'info' as const, text: 'Idle', icon: '🟠' },
  }

  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      dot={!showText}
      {...props}
    >
      {showText ? config.text : null}
    </Badge>
  )
}

// Notification Badge Component
export interface NotificationBadgeProps extends BadgeProps {
  children: React.ReactNode
  count?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  offset?: { x?: number; y?: number }
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  children,
  count,
  position = 'top-right',
  offset = {},
  ...badgeProps
}) => {
  const getPositionClasses = () => {
    const { x = 0, y = 0 } = offset
    const positions = {
      'top-right': `top-0 right-0 transform translate-x-1/2 -translate-y-1/2`,
      'top-left': `top-0 left-0 transform -translate-x-1/2 -translate-y-1/2`,
      'bottom-right': `bottom-0 right-0 transform translate-x-1/2 translate-y-1/2`,
      'bottom-left': `bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2`,
    }
    
    return `${positions[position]} ${x !== 0 ? `translate-x-[${x}px]` : ''} ${y !== 0 ? `translate-y-[${y}px]` : ''}`
  }

  return (
    <div className="relative inline-block">
      {children}
      {(count !== undefined && count > 0) && (
        <Badge
          count={count}
          variant="error"
          size="xs"
          shape="pill"
          className={cn("absolute z-10", getPositionClasses())}
          animated
          {...badgeProps}
        />
      )}
    </div>
  )
}

// Achievement Badge Component
export interface AchievementBadgeProps extends BadgeProps {
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  title?: string
  description?: string
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  title,
  description,
  ...props
}) => {
  const achievementConfig = {
    bronze: { 
      variant: 'warning' as const, 
      icon: <Shield className="w-4 h-4" />,
      gradient: 'from-amber-600 to-amber-800'
    },
    silver: { 
      variant: 'secondary' as const, 
      icon: <Star className="w-4 h-4" />,
      gradient: 'from-gray-400 to-gray-600'
    },
    gold: { 
      variant: 'warning' as const, 
      icon: <Crown className="w-4 h-4" />,
      gradient: 'from-yellow-400 to-yellow-600'
    },
    platinum: { 
      variant: 'info' as const, 
      icon: <Zap className="w-4 h-4" />,
      gradient: 'from-blue-400 to-blue-600'
    },
    diamond: { 
      variant: 'premium' as const, 
      icon: <Star className="w-4 h-4" />,
      gradient: 'from-purple-400 to-pink-600'
    },
  }

  const config = achievementConfig[type]

  return (
    <div className="group relative">
      <Badge
        variant={config.variant}
        icon={config.icon}
        glow={type === 'diamond'}
        animated
        className={cn(
          type === 'diamond' && "bg-gradient-to-r from-purple-500 to-pink-500",
          "cursor-pointer"
        )}
        {...props}
      >
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
      
      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
        </div>
      )}
    </div>
  )
}

// Tag Badge Component
export interface TagBadgeProps extends BadgeProps {
  tags: string[]
  maxVisible?: number
  onTagClick?: (tag: string) => void
  onTagRemove?: (tag: string) => void
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tags,
  maxVisible = 3,
  onTagClick,
  onTagRemove,
  ...props
}) => {
  const visibleTags = tags.slice(0, maxVisible)
  const hiddenCount = Math.max(0, tags.length - maxVisible)

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tag, index) => (
        <Badge
          key={index}
          variant="outline"
          size="sm"
          closable={!!onTagRemove}
          onClose={() => onTagRemove?.(tag)}
          onClick={() => onTagClick?.(tag)}
          className={onTagClick ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700" : ""}
          {...props}
        >
          {tag}
        </Badge>
      ))}
      
      {hiddenCount > 0 && (
        <Badge
          variant="secondary"
          size="sm"
          {...props}
        >
          +{hiddenCount} more
        </Badge>
      )}
    </div>
  )
}

export { Badge } 