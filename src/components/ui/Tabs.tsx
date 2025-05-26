import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  variant: 'default' | 'pills' | 'underline' | 'cards' | 'neon'
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component')
  }
  return context
}

export interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'pills' | 'underline' | 'cards' | 'neon'
  className?: string
  children: React.ReactNode
}

export const TabsRoot: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  className,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue || '')

  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setActiveTab(newValue)
    }
    onValueChange?.(newValue)
  }

  const currentValue = value !== undefined ? value : activeTab

  return (
    <TabsContext.Provider
      value={{
        activeTab: currentValue,
        setActiveTab: handleTabChange,
        orientation,
        variant,
      }}
    >
      <div
        className={cn(
          'w-full',
          orientation === 'vertical' && 'flex gap-6',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  className?: string
  children: React.ReactNode
}

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const { orientation, variant, activeTab } = useTabsContext()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const listRef = useRef<HTMLDivElement>(null)

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg',
    pills: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-xl',
    underline: 'border-b border-gray-200 dark:border-gray-700',
    cards: 'bg-transparent',
    neon: 'bg-black/50 border border-cyan-400/30 p-1 rounded-lg backdrop-blur-sm',
  }

  useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return
      
      const activeButton = listRef.current.querySelector('[data-state="active"]') as HTMLElement
      if (activeButton) {
        const listRect = listRef.current.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()
        
        if (orientation === 'horizontal') {
          setIndicatorStyle({
            left: buttonRect.left - listRect.left,
            width: buttonRect.width,
            top: 0,
            height: buttonRect.height,
          })
        } else {
          setIndicatorStyle({
            left: 0,
            width: buttonRect.width,
            top: buttonRect.top - listRect.top,
            height: buttonRect.height,
          })
        }
      }
    }

    // Update indicator immediately and on activeTab change
    updateIndicator()
    
    // Use requestAnimationFrame for smooth updates
    const timeoutId = setTimeout(() => {
      updateIndicator()
    }, 0)

    window.addEventListener('resize', updateIndicator)
    return () => {
      window.removeEventListener('resize', updateIndicator)
      clearTimeout(timeoutId)
    }
  }, [orientation, activeTab]) // Add activeTab to dependencies

  return (
    <div
      ref={listRef}
      className={cn(
        'relative flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        variantClasses[variant],
        className
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {/* Animated indicator */}
      {(variant === 'default' || variant === 'pills' || variant === 'neon') && (
        <motion.div
          className={cn(
            'absolute rounded-md',
            variant === 'default' && 'bg-white dark:bg-gray-700 shadow-sm',
            variant === 'pills' && 'bg-white dark:bg-gray-700 shadow-lg',
            variant === 'neon' && 'bg-cyan-400/20 border border-cyan-400/50 shadow-lg shadow-cyan-400/25'
          )}
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            top: indicatorStyle.top,
            height: indicatorStyle.height,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  className,
  children,
}) => {
  const { activeTab, setActiveTab, variant } = useTabsContext()
  const isActive = activeTab === value

  const variantClasses = {
    default: cn(
      'relative z-10 px-3 py-1.5 text-sm font-medium transition-colors',
      'hover:text-gray-900 dark:hover:text-gray-100',
      isActive
        ? 'text-gray-900 dark:text-gray-100 font-semibold'
        : 'text-gray-600 dark:text-gray-400'
    ),
    pills: cn(
      'relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
      'hover:text-gray-900 dark:hover:text-gray-100',
      isActive
        ? 'text-gray-900 dark:text-gray-100 font-semibold'
        : 'text-gray-600 dark:text-gray-400'
    ),
    underline: cn(
      'relative px-4 py-2 text-sm font-medium transition-colors border-b-2',
      'hover:text-gray-900 dark:hover:text-gray-100',
      isActive
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-semibold'
        : 'text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
    ),
    cards: cn(
      'px-4 py-2 text-sm font-medium transition-all rounded-lg border',
      isActive
        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
        : 'bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
    ),
    neon: cn(
      'relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-md',
      isActive
        ? 'text-cyan-400'
        : 'text-gray-400 hover:text-cyan-300'
    ),
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      disabled={disabled}
      className={cn(
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={() => !disabled && setActiveTab(value)}
    >
      <motion.span
        initial={false}
        animate={{ scale: isActive ? 1 : 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.span>
    </button>
  )
}

export interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
}) => {
  const { activeTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={value}
          role="tabpanel"
          id={`panel-${value}`}
          aria-labelledby={`tab-${value}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn('mt-4 focus:outline-none', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Compound component exports with proper typing
export const Tabs = TabsRoot as React.FC<TabsProps> & {
  List: React.FC<TabsListProps>
  Trigger: React.FC<TabsTriggerProps>
  Content: React.FC<TabsContentProps>
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent 