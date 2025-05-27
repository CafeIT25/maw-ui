import React, { forwardRef, useState, createContext, useContext } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Plus, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'

const accordionVariants = cva(
  "border rounded-lg overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
        outlined: "border-2 border-gray-300 bg-transparent dark:border-gray-600",
        filled: "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800",
        ghost: "border-transparent bg-transparent",
        neon: "border-2 border-cyan-400 bg-black shadow-lg shadow-cyan-400/25",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md",
        premium: "border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-800 dark:from-purple-950 dark:to-pink-950",
      },
      size: {
        sm: "text-sm",
        default: "",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const accordionItemVariants = cva(
  "border-b last:border-b-0 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 dark:border-gray-700",
        outlined: "border-gray-300 dark:border-gray-600",
        filled: "border-gray-200 dark:border-gray-700",
        ghost: "border-gray-100 dark:border-gray-800",
        neon: "border-cyan-400/30",
        glass: "border-white/10",
        premium: "border-purple-200 dark:border-purple-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between p-4 text-left font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
        outlined: "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
        filled: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
        ghost: "text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
        neon: "text-cyan-100 hover:bg-cyan-400/10",
        glass: "text-white hover:bg-white/10",
        premium: "text-purple-900 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-900/50",
      },
      state: {
        closed: "",
        open: "bg-gray-50 dark:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "closed",
    },
  }
)

// Accordion Context
interface AccordionContextType {
  type?: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: VariantProps<typeof accordionVariants>['variant']
  collapsible?: boolean
  disabled?: boolean
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion')
  }
  return context
}

// Accordion Root Component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: VariantProps<typeof accordionVariants>['variant']
  size?: VariantProps<typeof accordionVariants>['size']
  collapsible?: boolean
  disabled?: boolean
  animated?: boolean
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    className, 
    type = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant,
    size,
    collapsible = false,
    disabled = false,
    children,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (type === 'multiple' ? [] : '')
    )

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const handleValueChange = (newValue: string | string[]) => {
      if (disabled) return
      
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <AccordionContext.Provider value={{
        type,
        value,
        onValueChange: handleValueChange,
        variant,
        collapsible,
        disabled
      }}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = "Accordion"

// Accordion Item Component
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, disabled = false, children, ...props }, ref) => {
    const { variant } = useAccordion()

    return (
      <div
        ref={ref}
        className={cn(accordionItemVariants({ variant, className }))}
        data-state={disabled ? "disabled" : "enabled"}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = "AccordionItem"

// Accordion Trigger Component
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: 'chevron' | 'plus' | 'arrow' | React.ReactNode
  iconPosition?: 'left' | 'right'
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ 
    className, 
    children, 
    icon = 'chevron',
    iconPosition = 'right',
    ...props 
  }, ref) => {
    const { type, value, onValueChange, variant, disabled } = useAccordion()
    const itemValue = React.useContext(AccordionItemContext)
    
    if (!itemValue) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }

    const isOpen = type === 'multiple' 
      ? Array.isArray(value) && value.includes(itemValue)
      : value === itemValue

    const handleClick = () => {
      if (disabled) return

      if (type === 'multiple') {
        const currentValue = Array.isArray(value) ? value : []
        const newValue = isOpen
          ? currentValue.filter(v => v !== itemValue)
          : [...currentValue, itemValue]
        onValueChange?.(newValue)
      } else {
        const newValue = isOpen ? '' : itemValue
        onValueChange?.(newValue)
      }
    }

    const getIcon = () => {
      if (React.isValidElement(icon)) return icon

      const iconProps = {
        className: cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )
      }

      switch (icon) {
        case 'plus':
          return isOpen ? <Minus {...iconProps} /> : <Plus {...iconProps} />
        case 'arrow':
          return <ChevronRight {...iconProps} className={cn(iconProps.className, isOpen && "rotate-90")} />
        case 'chevron':
        default:
          return <ChevronDown {...iconProps} />
      }
    }

    return (
      <button
        ref={ref}
        className={cn(
          accordionTriggerVariants({ 
            variant, 
            state: isOpen ? 'open' : 'closed',
            className 
          }),
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleClick}
        disabled={disabled}
        aria-expanded={isOpen}
        {...props}
      >
        {iconPosition === 'left' && (
          <span className="mr-2">
            {getIcon()}
          </span>
        )}
        
        <span className="flex-1 text-left">
          {children}
        </span>
        
        {iconPosition === 'right' && (
          <span className="ml-2">
            {getIcon()}
          </span>
        )}
      </button>
    )
  }
)

AccordionTrigger.displayName = "AccordionTrigger"

// Accordion Content Component
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, forceMount = false, ...props }, ref) => {
    const { type, value } = useAccordion()
    const itemValue = React.useContext(AccordionItemContext)
    
    if (!itemValue) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const isOpen = type === 'multiple' 
      ? Array.isArray(value) && value.includes(itemValue)
      : value === itemValue

    if (!forceMount && !isOpen) return null

    return (
      <AnimatePresence initial={false}>
        {(isOpen || forceMount) && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isOpen ? "auto" : 0, 
              opacity: isOpen ? 1 : 0 
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className={cn(
              "overflow-hidden",
              className
            )}
            style={props.style}
            data-state={isOpen ? "open" : "closed"}
          >
            <div className="p-4 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

AccordionContent.displayName = "AccordionContent"

// Context for AccordionItem value
const AccordionItemContext = React.createContext<string | undefined>(undefined)

// Enhanced AccordionItem with context
const EnhancedAccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={value}>
        <AccordionItem ref={ref} value={value} {...props}>
          {children}
        </AccordionItem>
      </AccordionItemContext.Provider>
    )
  }
)

EnhancedAccordionItem.displayName = "AccordionItem"

// Nested Accordion Component
export interface NestedAccordionProps extends AccordionProps {
  level?: number
}

const NestedAccordion = forwardRef<HTMLDivElement, NestedAccordionProps>(
  ({ level = 0, className, ...props }, ref) => {
    const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : ''
    
    return (
      <Accordion
        ref={ref}
        className={cn(
          indentClass,
          level > 0 && "border-l-2 border-gray-200 dark:border-gray-700 rounded-l-none",
          className
        )}
        {...props}
      />
    )
  }
)

NestedAccordion.displayName = "NestedAccordion"

// FAQ Accordion Component
export interface FAQItem {
  question: string
  answer: string | React.ReactNode
  category?: string
  tags?: string[]
}

export interface FAQAccordionProps extends Omit<AccordionProps, 'children'> {
  items: FAQItem[]
  searchable?: boolean
  categorized?: boolean
  onSearch?: (query: string) => void
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  searchable = false,
  categorized = false,
  onSearch,
  ...accordionProps
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const categorizedItems = categorized
    ? filteredItems.reduce((acc, item) => {
        const category = item.category || 'General'
        if (!acc[category]) acc[category] = []
        acc[category].push(item)
        return acc
      }, {} as Record<string, FAQItem[]>)
    : { 'All': filteredItems }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}

      {Object.entries(categorizedItems).map(([category, categoryItems]) => (
        <div key={category}>
          {categorized && (
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {category}
            </h3>
          )}
          
          <Accordion {...accordionProps}>
            {categoryItems.map((item, index) => (
              <EnhancedAccordionItem key={index} value={`${category}-${index}`}>
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {typeof item.answer === 'string' ? (
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </p>
                  ) : (
                    item.answer
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </EnhancedAccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )
}

export { 
  Accordion, 
  EnhancedAccordionItem as AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  NestedAccordion,
  FAQAccordion
} 