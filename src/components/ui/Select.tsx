import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  placeholder?: string
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  searchable?: boolean
  clearable?: boolean
  multiple?: boolean
  variant?: 'default' | 'filled' | 'outlined' | 'ghost' | 'neon'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  error?: boolean
  loading?: boolean
}

const selectVariants = {
  default: 'border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
  filled: 'border-transparent bg-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100',
  outlined: 'border-2 border-gray-300 bg-transparent text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-100',
  ghost: 'border-transparent bg-transparent text-gray-900 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:text-gray-100 dark:focus:bg-gray-800',
  neon: 'border-2 border-cyan-400 bg-black text-cyan-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400',
}

const sizeVariants = {
  sm: 'h-9 px-3 py-1 text-sm',
  default: 'h-11 px-4 py-2 text-sm',
  lg: 'h-13 px-6 py-3 text-base',
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option...',
  onValueChange,
  disabled = false,
  searchable = false,
  clearable = false,
  multiple = false,
  variant = 'default',
  size = 'default',
  className,
  error = false,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    value || defaultValue || (multiple ? [] : '')
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
  
  const selectRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentValue = value !== undefined ? value : selectedValue

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  const selectedOption = multiple
    ? options.filter(option => Array.isArray(currentValue) && currentValue.includes(option.value))
    : options.find(option => option.value === currentValue)

  // Calculate dropdown position to prevent overflow
  const calculateDropdownPosition = () => {
    if (!selectRef.current) return

    const selectRect = selectRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - selectRect.bottom
    const spaceAbove = selectRect.top
    const dropdownHeight = Math.min(320, filteredOptions.length * 48 + (searchable ? 60 : 20)) // Estimated height

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setDropdownPosition('top')
    } else {
      setDropdownPosition('bottom')
    }
  }

  const handleSelect = (optionValue: string) => {
    let newValue: string | string[]

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : []
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter(v => v !== optionValue)
      } else {
        newValue = [...currentArray, optionValue]
      }
    } else {
      newValue = optionValue
      setIsOpen(false)
    }

    if (value === undefined) {
      setSelectedValue(newValue)
    }
    onValueChange?.(newValue)
    setSearchQuery('')
    setHighlightedIndex(-1)
  }

  const handleClear = () => {
    const newValue = multiple ? [] : ''
    if (value === undefined) {
      setSelectedValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex].value)
        } else {
          setIsOpen(!isOpen)
          if (!isOpen) {
            calculateDropdownPosition()
          }
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          calculateDropdownPosition()
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
        }
        break
    }
  }

  const handleToggle = () => {
    if (disabled) return
    
    if (!isOpen) {
      calculateDropdownPosition()
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition()
      }
    }

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  const displayValue = () => {
    if (multiple && Array.isArray(selectedOption)) {
      if (selectedOption.length === 0) return placeholder
      if (selectedOption.length === 1) return selectedOption[0].label
      return `${selectedOption.length} items selected`
    }
    return (selectedOption as SelectOption)?.label || placeholder
  }

  return (
    <div ref={selectRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between rounded-xl border transition-all duration-200',
          'focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          selectVariants[variant],
          sizeVariants[size],
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          isOpen && 'ring-2',
          disabled && 'bg-gray-50 dark:bg-gray-800'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {multiple && Array.isArray(selectedOption) && selectedOption.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOption.slice(0, 2).map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                >
                  {option.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelect(option.value)
                    }}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {selectedOption.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{selectedOption.length - 2} more
                </span>
              )}
            </div>
          ) : (
            <span className={cn(
              'truncate',
              !selectedOption && 'text-gray-500 dark:text-gray-400'
            )}>
              {displayValue()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          
          {clearable && (selectedOption || (multiple && Array.isArray(currentValue) && currentValue.length > 0)) && !loading && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ 
              opacity: 0, 
              y: dropdownPosition === 'bottom' ? -8 : 8, 
              scale: 0.98 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              y: dropdownPosition === 'bottom' ? -8 : 8, 
              scale: 0.98 
            }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
              'rounded-xl shadow-lg overflow-hidden',
              dropdownPosition === 'bottom' ? 'mt-2' : 'mb-2 bottom-full',
              variant === 'neon' && 'bg-black border-cyan-400 shadow-cyan-400/25'
            )}
            style={{
              maxHeight: dropdownPosition === 'bottom' 
                ? `min(320px, ${window.innerHeight - (selectRef.current?.getBoundingClientRect().bottom || 0) - 20}px)`
                : `min(320px, ${(selectRef.current?.getBoundingClientRect().top || 0) - 20}px)`
            }}
          >
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className={cn(
                      'w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none outline-none',
                      'placeholder:text-gray-500 dark:placeholder:text-gray-400'
                    )}
                  />
                </div>
              </div>
            )}

            <div className="py-1 overflow-y-auto" style={{ maxHeight: searchable ? '260px' : '300px' }}>
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = multiple
                    ? Array.isArray(currentValue) && currentValue.includes(option.value)
                    : currentValue === option.value
                  const isHighlighted = index === highlightedIndex

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors',
                        'hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed',
                        isSelected && 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
                        isHighlighted && 'bg-gray-100 dark:bg-gray-800',
                        variant === 'neon' && 'hover:bg-cyan-400/10 text-gray-300'
                      )}
                      whileHover={{ x: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      {option.icon && (
                        <span className="flex-shrink-0">
                          {option.icon}
                        </span>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {option.description}
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0"
                        >
                          <Check size={16} />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 