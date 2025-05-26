import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'glass' | 'neon' | 'gradient'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  title?: string
  description?: string
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

const variantClasses = {
  default: 'bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
  neon: 'bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25',
  gradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 dark:border-purple-800',
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    open,
    onOpenChange,
    children,
    className,
    size = 'md',
    variant = 'default',
    closeOnOverlayClick = true,
    showCloseButton = true,
    title,
    description,
  }, ref) => {
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onOpenChange(false)
      }
    }

    const handleClose = () => {
      onOpenChange(false)
    }

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOverlayClick}
            />

            {/* Modal Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              whileHover={{ scale: 1.01 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4 
              }}
              className={cn(
                'relative w-full mx-4 rounded-2xl shadow-2xl transform-gpu',
                'hover:shadow-3xl transition-shadow duration-300',
                sizeClasses[size],
                variantClasses[variant],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {showCloseButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={16} />
                </motion.button>
              )}

              {/* Header */}
              {(title || description) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700"
                >
                  {title && (
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  'p-6',
                  (title || description) ? 'pt-4' : ''
                )}
              >
                {children}
              </motion.div>

              {/* Glow effect for neon variant */}
              {variant === 'neon' && (
                <div className="absolute inset-0 bg-cyan-400/5 rounded-2xl blur-xl" />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

Modal.displayName = "Modal"

// Modal Header Component
export const ModalHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
)
ModalHeader.displayName = "ModalHeader"

// Modal Title Component
export const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
ModalTitle.displayName = "ModalTitle"

// Modal Description Component
export const ModalDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
      {...props}
    />
  )
)
ModalDescription.displayName = "ModalDescription"

// Modal Footer Component
export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
)
ModalFooter.displayName = "ModalFooter"

// Confirmation Modal Component
export interface ConfirmationModalProps extends Omit<ModalProps, 'children' | 'variant'> {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: 'default' | 'destructive' | 'warning'
  loading?: boolean
  modalVariant?: 'default' | 'glass' | 'neon' | 'gradient'
}

export const ConfirmationModal = ({
  title,
  description,
  confirmText = '確認',
  cancelText = 'キャンセル',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
  ...modalProps
}: ConfirmationModalProps) => {
  const handleCancel = () => {
    onCancel?.()
    modalProps.onOpenChange(false)
  }

  const handleConfirm = () => {
    onConfirm()
  }

  const buttonVariant = variant === 'destructive' ? 'destructive' : variant === 'warning' ? 'warning' : 'default'

  return (
    <Modal {...modalProps} size="sm">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={buttonVariant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export { Modal } 