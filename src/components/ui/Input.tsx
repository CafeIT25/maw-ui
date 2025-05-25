import React, { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { Eye, EyeOff, Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const inputVariants = cva(
  "flex w-full rounded-xl border transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 relative",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
        filled: "border-transparent bg-gray-100 text-gray-900 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-800 dark:text-gray-100",
        outlined: "border-2 border-gray-300 bg-transparent text-gray-900 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:text-gray-100",
        ghost: "border-transparent bg-transparent text-gray-900 focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-100 dark:focus-visible:bg-gray-800",
        gradient: "border-transparent bg-gradient-to-r from-blue-50 to-purple-50 text-gray-900 focus-visible:from-blue-100 focus-visible:to-purple-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:from-blue-950 dark:to-purple-950 dark:text-gray-100",
        neon: "border-2 border-cyan-400 bg-black text-cyan-400 focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400 placeholder:text-cyan-600",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md text-white focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50 placeholder:text-white/70",
      },
      size: {
        sm: "h-9 px-3 py-1 text-sm",
        default: "h-11 px-4 py-2 text-sm",
        lg: "h-13 px-6 py-3 text-base",
        xl: "h-16 px-8 py-4 text-lg",
      },
      state: {
        default: "",
        error: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  loading?: boolean
  label?: string
  helperText?: string
  errorText?: string
  successText?: string
  floating?: boolean
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = "text",
    variant,
    size,
    state,
    leftIcon,
    rightIcon,
    clearable = false,
    loading = false,
    label,
    helperText,
    errorText,
    successText,
    floating = false,
    value,
    onChange,
    onClear,
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')

    const currentValue = value !== undefined ? value : internalValue
    const hasValue = Boolean(currentValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>
      
      if (value === undefined) {
        setInternalValue('')
      }
      onChange?.(event)
      onClear?.()
    }

    const currentState = errorText ? 'error' : successText ? 'success' : state

    const inputType = type === 'password' && showPassword ? 'text' : type

    return (
      <div className="relative w-full">
        {label && !floating && (
          <motion.label
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {floating && label && (
            <motion.label
              className={cn(
                "absolute left-3 text-gray-500 pointer-events-none transition-all duration-200",
                leftIcon && "left-10",
                (isFocused || hasValue) ? "top-2 text-xs" : "top-1/2 transform -translate-y-1/2 text-sm"
              )}
              animate={{
                y: (isFocused || hasValue) ? -8 : 0,
                scale: (isFocused || hasValue) ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          <motion.input
            ref={ref}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            disabled={disabled || loading}
            className={cn(
              inputVariants({ variant, size, state: currentState, className }),
              leftIcon && "pl-10",
              (rightIcon || clearable || type === 'password' || loading) && "pr-10",
              floating && label && "pt-6 pb-2"
            )}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...(props as HTMLMotionProps<"input">)}
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              />
            )}

            {type === 'password' && !loading && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </motion.button>
            )}

            {clearable && hasValue && !loading && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            )}

            {rightIcon && !loading && !(clearable && hasValue) && (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {(helperText || errorText || successText) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2"
            >
              {errorText && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errorText}
                </p>
              )}
              {successText && !errorText && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {successText}
                </p>
              )}
              {helperText && !errorText && !successText && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {helperText}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = "Input"

// Search Input Component
export const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon' | 'type'>>(
  ({ placeholder = "検索...", ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      leftIcon={<Search size={16} />}
      placeholder={placeholder}
      clearable
      {...props}
    />
  )
)

SearchInput.displayName = "SearchInput"

export { Input, inputVariants } 