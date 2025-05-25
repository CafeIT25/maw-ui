import React, { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, Edit3 } from 'lucide-react'
import { cn } from '../../lib/utils'

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        primary: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
        success: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
        error: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
        neon: "bg-black border-2 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
        premium: "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 dark:from-purple-900 dark:to-pink-900 dark:text-purple-400",
      },
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        default: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl",
        "2xl": "w-20 h-20 text-2xl",
        "3xl": "w-24 h-24 text-3xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-xl",
      },
      border: {
        none: "",
        thin: "ring-2 ring-white dark:ring-gray-800",
        thick: "ring-4 ring-white dark:ring-gray-800",
        colored: "ring-2 ring-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "circle",
      border: "none",
    },
  }
)

const statusVariants = cva(
  "absolute rounded-full border-2 border-white dark:border-gray-800",
  {
    variants: {
      status: {
        online: "bg-green-500",
        offline: "bg-gray-400",
        away: "bg-yellow-500",
        busy: "bg-red-500",
      },
      size: {
        xs: "w-2 h-2 bottom-0 right-0",
        sm: "w-2.5 h-2.5 bottom-0 right-0",
        default: "w-3 h-3 bottom-0 right-0",
        lg: "w-3.5 h-3.5 bottom-0 right-0",
        xl: "w-4 h-4 bottom-0 right-0",
        "2xl": "w-5 h-5 bottom-0 right-0",
        "3xl": "w-6 h-6 bottom-0 right-0",
      },
    },
    defaultVariants: {
      status: "online",
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
  editable?: boolean
  onEdit?: () => void
  loading?: boolean
  pulse?: boolean
  hover?: boolean
  badge?: React.ReactNode
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape, 
    border,
    src, 
    alt, 
    fallback,
    status,
    showStatus = false,
    editable = false,
    onEdit,
    loading = false,
    pulse = false,
    hover = false,
    badge,
    badgePosition = 'top-right',
    children,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleImageError = () => {
      setImageError(true)
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const getBadgePosition = () => {
      const positions = {
        'top-right': 'top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
        'top-left': 'top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
        'bottom-right': 'bottom-0 right-0 transform translate-x-1/2 translate-y-1/2',
        'bottom-left': 'bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2',
      }
      return positions[badgePosition]
    }

    const motionProps = hover ? {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    } : {}

    return (
      <motion.div
        ref={ref}
        className={cn(
          avatarVariants({ variant, size, shape, border, className }),
          editable && "cursor-pointer",
          pulse && "animate-pulse",
          loading && "animate-pulse"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={editable ? onEdit : undefined}
        {...motionProps}
        {...props}
      >
        {loading ? (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : fallback ? (
          <span className="font-medium">
            {getInitials(fallback)}
          </span>
        ) : children ? (
          children
        ) : (
          <User className="w-1/2 h-1/2" />
        )}

        {/* Status indicator */}
        {showStatus && status && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(statusVariants({ status, size }))}
          />
        )}

        {/* Badge */}
        {badge && (
          <div className={cn("absolute z-10", getBadgePosition())}>
            {badge}
          </div>
        )}

        {/* Edit overlay */}
        {editable && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-inherit"
              >
                <Edit3 className="w-1/3 h-1/3 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/10 rounded-inherit blur-xl" />
        )}
      </motion.div>
    )
  }
)

Avatar.displayName = "Avatar"

// Avatar Group Component
export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
  spacing?: 'tight' | 'normal' | 'loose'
  showMore?: boolean
  moreText?: string
  onMoreClick?: () => void
  animated?: boolean
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  size = 'default',
  spacing = 'normal',
  showMore = true,
  moreText = '+{count} more',
  onMoreClick,
  animated = true
}) => {
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, max)
  const hiddenCount = Math.max(0, childrenArray.length - max)

  const getSpacing = () => {
    switch (spacing) {
      case 'tight':
        return '-space-x-1'
      case 'loose':
        return 'space-x-2'
      default:
        return '-space-x-2'
    }
  }

  return (
    <div className={cn("flex items-center", getSpacing())}>
      {visibleChildren.map((child, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
          style={{ zIndex: visibleChildren.length - index }}
        >
          {React.cloneElement(child as React.ReactElement, {
            size,
            border: 'thin'
          })}
        </motion.div>
      ))}
      
      {hiddenCount > 0 && showMore && (
        <motion.div
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: visibleChildren.length * 0.1 }}
          className="relative"
        >
          <Avatar
            size={size}
            variant="default"
            border="thin"
            fallback={moreText.replace('{count}', hiddenCount.toString())}
            onClick={onMoreClick}
            className={onMoreClick ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" : ""}
          />
        </motion.div>
      )}
    </div>
  )
}

// Avatar Upload Component
export interface AvatarUploadProps extends AvatarProps {
  onUpload?: (file: File) => void
  accept?: string
  maxSize?: number
  uploadText?: string
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  uploadText = "Upload Photo",
  ...avatarProps
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }
    onUpload?.(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="relative">
      <Avatar
        {...avatarProps}
        editable
        onEdit={handleClick}
        className={cn(
          avatarProps.className,
          isDragging && "ring-2 ring-blue-500 ring-offset-2"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Upload button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors"
      >
        <Camera className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

export { Avatar } 