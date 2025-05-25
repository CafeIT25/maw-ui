import React, { forwardRef, useEffect, useState, createContext, useContext } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, AlertTriangle, Info, AlertCircle, Bell, Star } from 'lucide-react'
import { cn } from '../../lib/utils'

const notificationVariants = cva(
  "relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white/90 border-gray-200 text-gray-900 dark:bg-gray-900/90 dark:border-gray-700 dark:text-white",
        success: "bg-green-50/90 border-green-200 text-green-900 dark:bg-green-950/90 dark:border-green-800 dark:text-green-100",
        warning: "bg-yellow-50/90 border-yellow-200 text-yellow-900 dark:bg-yellow-950/90 dark:border-yellow-800 dark:text-yellow-100",
        error: "bg-red-50/90 border-red-200 text-red-900 dark:bg-red-950/90 dark:border-red-800 dark:text-red-100",
        info: "bg-blue-50/90 border-blue-200 text-blue-900 dark:bg-blue-950/90 dark:border-blue-800 dark:text-blue-100",
        neon: "bg-black/90 border-2 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 border-white/20 text-white backdrop-blur-md",
        premium: "bg-gradient-to-br from-purple-50/90 to-pink-50/90 border-purple-200 text-purple-900 dark:from-purple-950/90 dark:to-pink-950/90 dark:border-purple-800 dark:text-purple-100",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4",
        lg: "p-6 text-lg",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "top-right",
    },
  }
)

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'primary' | 'secondary'
  }>
  closable?: boolean
  onClose?: () => void
  duration?: number
  progress?: boolean
  avatar?: string
  timestamp?: Date
  persistent?: boolean
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ 
    className, 
    variant, 
    size, 
    title,
    description,
    icon,
    actions,
    closable = true,
    onClose,
    duration = 5000,
    progress = false,
    avatar,
    timestamp,
    persistent = false,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true)
    const [progressValue, setProgressValue] = useState(100)

    useEffect(() => {
      if (!persistent && duration > 0) {
        const progressInterval = setInterval(() => {
          setProgressValue(prev => {
            const newValue = prev - (100 / (duration / 100))
            if (newValue <= 0) {
              clearInterval(progressInterval)
              handleClose()
              return 0
            }
            return newValue
          })
        }, 100)

        return () => clearInterval(progressInterval)
      }
    }, [duration, persistent])

    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300)
    }

    const getIcon = () => {
      if (icon) return icon
      
      switch (variant) {
        case 'success':
          return <Check className="w-5 h-5" />
        case 'warning':
          return <AlertTriangle className="w-5 h-5" />
        case 'error':
          return <AlertCircle className="w-5 h-5" />
        case 'info':
          return <Info className="w-5 h-5" />
        case 'neon':
          return <Star className="w-5 h-5" />
        default:
          return <Bell className="w-5 h-5" />
      }
    }

    const getIconColor = () => {
      switch (variant) {
        case 'success':
          return 'text-green-600 dark:text-green-400'
        case 'warning':
          return 'text-yellow-600 dark:text-yellow-400'
        case 'error':
          return 'text-red-600 dark:text-red-400'
        case 'info':
          return 'text-blue-600 dark:text-blue-400'
        case 'neon':
          return 'text-cyan-400'
        case 'premium':
          return 'text-purple-600 dark:text-purple-400'
        default:
          return 'text-gray-600 dark:text-gray-400'
      }
    }

    if (!isVisible) return null

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(notificationVariants({ variant, size, className }))}
        id={props.id}
        style={props.style}
        onClick={props.onClick}
      >
        {/* Progress bar */}
        {progress && !persistent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10">
            <motion.div
              className="h-full bg-current opacity-30"
              initial={{ width: "100%" }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        )}

        <div className="flex items-start space-x-3">
          {/* Avatar or Icon */}
          <div className="flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className={cn("flex-shrink-0", getIconColor())}>
                {getIcon()}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h4 className="font-semibold text-sm mb-1">
                    {title}
                  </h4>
                )}
                {description && (
                  <p className="text-sm opacity-90">
                    {description}
                  </p>
                )}
                {children}
              </div>

              {/* Close button */}
              {closable && (
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Timestamp */}
            {timestamp && (
              <p className="text-xs opacity-60 mt-1">
                {timestamp.toLocaleTimeString()}
              </p>
            )}

            {/* Actions */}
            {actions && actions.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                      action.variant === 'primary' && "bg-current text-white opacity-90 hover:opacity-100",
                      action.variant === 'secondary' && "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20",
                      !action.variant && "hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl" />
        )}
      </motion.div>
    )
  }
)

Notification.displayName = "Notification"

// Notification Context and Provider
interface NotificationContextType {
  notifications: NotificationItem[]
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

interface NotificationItem extends NotificationProps {
  id: string
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export interface NotificationProviderProps {
  children: React.ReactNode
  position?: VariantProps<typeof notificationVariants>['position']
  maxNotifications?: number
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = 'top-right',
  maxNotifications = 5
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev]
      return updated.slice(0, maxNotifications)
    })
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-4 right-4'
    }
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      
      {/* Notification Container */}
      <div className={cn("fixed z-50 space-y-2 w-96 max-w-sm", getPositionClasses())}>
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

// Notification Stack Component
export interface NotificationStackProps {
  notifications: NotificationItem[]
  position?: VariantProps<typeof notificationVariants>['position']
  onRemove?: (id: string) => void
}

export const NotificationStack: React.FC<NotificationStackProps> = ({
  notifications,
  position = 'top-right',
  onRemove
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-4 right-4'
    }
  }

  return (
    <div className={cn("fixed z-50 space-y-2 w-96 max-w-sm", getPositionClasses())}>
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ 
              opacity: 1 - (index * 0.1), 
              scale: 1 - (index * 0.05), 
              y: 0,
              zIndex: notifications.length - index
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
              transform: `translateY(${index * -8}px) scale(${1 - (index * 0.05)})`,
              zIndex: notifications.length - index
            }}
          >
            <Notification
              {...notification}
              onClose={() => onRemove?.(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export { Notification } 