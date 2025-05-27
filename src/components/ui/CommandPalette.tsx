import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, ArrowUp, ArrowDown, CornerDownLeft, Hash, User, Settings, FileText, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

const commandPaletteVariants = cva(
  "fixed inset-0 z-50 flex items-start justify-center pt-[20vh]",
  {
    variants: {
      variant: {
        default: "",
        modern: "",
        minimal: "",
        neon: "",
        glass: "",
        premium: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const commandDialogVariants = cva(
  "w-full max-w-2xl mx-4 rounded-xl shadow-2xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700",
        modern: "bg-white/95 backdrop-blur-xl border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50",
        minimal: "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-2xl border-white/20",
        premium: "bg-gradient-to-br from-white to-purple-50 border-purple-200 dark:from-gray-900 dark:to-purple-950 dark:border-purple-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const commandItemVariants = cva(
  "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 group",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-100 dark:hover:bg-gray-800",
        modern: "hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
        minimal: "hover:bg-gray-50 dark:hover:bg-gray-700",
        neon: "hover:bg-cyan-400/10 hover:border-l-2 hover:border-l-cyan-400",
        glass: "hover:bg-white/10",
        premium: "hover:bg-purple-50 dark:hover:bg-purple-950/50",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        selected: true,
        class: "bg-blue-50 border-l-2 border-l-blue-500 dark:bg-blue-950/50",
      },
      {
        variant: "modern",
        selected: true,
        class: "bg-blue-50/80 border-l-2 border-l-blue-500 dark:bg-blue-950/50",
      },
      {
        variant: "minimal",
        selected: true,
        class: "bg-gray-100 dark:bg-gray-700",
      },
      {
        variant: "neon",
        selected: true,
        class: "bg-cyan-400/20 border-l-2 border-l-cyan-400",
      },
      {
        variant: "glass",
        selected: true,
        class: "bg-white/20",
      },
      {
        variant: "premium",
        selected: true,
        class: "bg-purple-100 border-l-2 border-l-purple-500 dark:bg-purple-950",
      },
    ],
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  }
)

export interface CommandItem {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  category?: string
  action?: () => void
  href?: string
  keywords?: string[]
  disabled?: boolean
}

export interface CommandGroup {
  id: string
  title: string
  items: CommandItem[]
  icon?: React.ReactNode
}

export interface CommandPaletteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandPaletteVariants> {
  open: boolean
  onOpenChange: (open: boolean) => void
  items?: CommandItem[]
  groups?: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  showShortcuts?: boolean
  showCategories?: boolean
  maxResults?: number
  onItemSelect?: (item: CommandItem) => void
}

const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({ 
    className, 
    variant,
    open,
    onOpenChange,
    items = [],
    groups = [],
    placeholder = "Type a command or search...",
    emptyMessage = "No results found.",
    showShortcuts = true,
    showCategories = true,
    maxResults = 50,
    onItemSelect,
    ...props 
  }, ref) => {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    // Combine items from both props
    const allItems = React.useMemo(() => {
      const groupItems = groups.flatMap(group => 
        group.items.map(item => ({ ...item, category: item.category || group.title }))
      )
      return [...items, ...groupItems]
    }, [items, groups])

    // Filter items based on query
    const filteredItems = React.useMemo(() => {
      if (!query.trim()) return allItems.slice(0, maxResults)
      
      const searchTerms = query.toLowerCase().split(' ').filter(Boolean)
      
      return allItems
        .filter(item => {
          if (item.disabled) return false
          
          const searchableText = [
            item.title,
            item.description,
            item.category,
            ...(item.keywords || [])
          ].join(' ').toLowerCase()
          
          return searchTerms.every(term => searchableText.includes(term))
        })
        .slice(0, maxResults)
    }, [query, allItems, maxResults])

    // Group filtered items by category
    const groupedItems = React.useMemo(() => {
      if (!showCategories) return [{ title: '', items: filteredItems }]
      
      const grouped = filteredItems.reduce((acc, item) => {
        const category = item.category || 'Other'
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(item)
        return acc
      }, {} as Record<string, CommandItem[]>)
      
      return Object.entries(grouped).map(([title, items]) => ({ title, items }))
    }, [filteredItems, showCategories])

    // Reset selection when items change
    useEffect(() => {
      setSelectedIndex(0)
    }, [filteredItems])

    // Focus input when opened
    useEffect(() => {
      if (open && inputRef.current) {
        inputRef.current.focus()
      }
    }, [open])

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          const selectedItem = filteredItems[selectedIndex]
          if (selectedItem) {
            handleItemSelect(selectedItem)
          }
          break
        case 'Escape':
          e.preventDefault()
          onOpenChange(false)
          break
      }
    }, [filteredItems, selectedIndex, onOpenChange])

    // Scroll selected item into view
    useEffect(() => {
      if (listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'nearest' })
        }
      }
    }, [selectedIndex])

    const handleItemSelect = (item: CommandItem) => {
      if (item.disabled) return
      
      onItemSelect?.(item)
      
      if (item.action) {
        item.action()
      } else if (item.href) {
        window.location.href = item.href
      }
      
      onOpenChange(false)
      setQuery('')
    }

    const getItemIcon = (item: CommandItem) => {
      if (item.icon) return item.icon
      
      // Default icons based on category
      switch (item.category?.toLowerCase()) {
        case 'navigation':
        case 'pages':
          return <FileText className="w-4 h-4" />
        case 'users':
        case 'people':
          return <User className="w-4 h-4" />
        case 'settings':
        case 'preferences':
          return <Settings className="w-4 h-4" />
        case 'actions':
        case 'commands':
          return <Zap className="w-4 h-4" />
        default:
          return <Hash className="w-4 h-4" />
      }
    }

    const renderShortcut = (shortcut: string[]) => {
      return (
        <div className="flex items-center gap-1">
          {shortcut.map((key, index) => (
            <kbd
              key={index}
              className={cn(
                "px-1.5 py-0.5 text-xs font-mono rounded border",
                variant === 'neon' && "bg-cyan-400/20 border-cyan-400/50 text-cyan-300",
                variant === 'glass' && "bg-white/20 border-white/30 text-white",
                variant === 'premium' && "bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-300",
                !['neon', 'glass', 'premium'].includes(variant || '') && "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              )}
            >
              {key}
            </kbd>
          ))}
        </div>
      )
    }

    if (!open) return null

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          className={cn(
            commandPaletteVariants({ variant }),
            className
          )}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={props.style}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Dialog */}
          <motion.div
            className={cn(commandDialogVariants({ variant }))}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className={cn(
                "w-5 h-5",
                variant === 'neon' && "text-cyan-400",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-600 dark:text-purple-400",
                !['neon', 'glass', 'premium'].includes(variant || '') && "text-gray-400"
              )} />
              
              <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "flex-1 bg-transparent border-none outline-none text-lg placeholder:text-gray-400",
                  variant === 'neon' && "text-cyan-100 placeholder:text-cyan-400/50",
                  variant === 'glass' && "text-white placeholder:text-white/50",
                  variant === 'premium' && "text-purple-900 dark:text-purple-100 placeholder:text-purple-400"
                )}
              />
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border">
                  <Command className="w-3 h-3" />
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border">K</kbd>
              </div>
            </div>

            {/* Results */}
            <div 
              ref={listRef}
              className="max-h-96 overflow-y-auto"
            >
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <div className={cn(
                    "text-gray-500 dark:text-gray-400",
                    variant === 'neon' && "text-cyan-400/70",
                    variant === 'glass' && "text-white/70",
                    variant === 'premium' && "text-purple-600/70 dark:text-purple-400/70"
                  )}>
                    {emptyMessage}
                  </div>
                </div>
              ) : (
                <div>
                  {groupedItems.map((group, groupIndex) => (
                    <div key={group.title || groupIndex}>
                      {group.title && showCategories && (
                        <div className={cn(
                          "px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b border-gray-100 dark:border-gray-800",
                          variant === 'neon' && "text-cyan-300 border-cyan-400/20",
                          variant === 'glass' && "text-white/80 border-white/10",
                          variant === 'premium' && "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
                          !['neon', 'glass', 'premium'].includes(variant || '') && "text-gray-500 dark:text-gray-400"
                        )}>
                          {group.title}
                        </div>
                      )}
                      
                      {group.items.map((item, itemIndex) => {
                        const globalIndex = groupedItems
                          .slice(0, groupIndex)
                          .reduce((acc, g) => acc + g.items.length, 0) + itemIndex
                        
                        return (
                          <motion.div
                            key={item.id}
                            className={cn(
                              commandItemVariants({ 
                                variant, 
                                selected: globalIndex === selectedIndex 
                              }),
                              item.disabled && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => handleItemSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.1 }}
                          >
                            <div className={cn(
                              "flex-shrink-0",
                              variant === 'neon' && "text-cyan-400",
                              variant === 'glass' && "text-white",
                              variant === 'premium' && "text-purple-600 dark:text-purple-400",
                              !['neon', 'glass', 'premium'].includes(variant || '') && "text-gray-400"
                            )}>
                              {getItemIcon(item)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className={cn(
                                "font-medium truncate",
                                variant === 'neon' && "text-cyan-100",
                                variant === 'glass' && "text-white",
                                variant === 'premium' && "text-purple-900 dark:text-purple-100"
                              )}>
                                {item.title}
                              </div>
                              {item.description && (
                                <div className={cn(
                                  "text-sm truncate mt-0.5",
                                  variant === 'neon' && "text-cyan-300/70",
                                  variant === 'glass' && "text-white/70",
                                  variant === 'premium' && "text-purple-700/70 dark:text-purple-300/70",
                                  !['neon', 'glass', 'premium'].includes(variant || '') && "text-gray-500 dark:text-gray-400"
                                )}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                            
                            {showShortcuts && item.shortcut && (
                              <div className="flex-shrink-0">
                                {renderShortcut(item.shortcut)}
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={cn(
              "flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs",
              variant === 'neon' && "text-cyan-400/70 border-cyan-400/20",
              variant === 'glass' && "text-white/70 border-white/10",
              variant === 'premium' && "text-purple-600/70 dark:text-purple-400/70 border-purple-200 dark:border-purple-800",
              !['neon', 'glass', 'premium'].includes(variant || '') && "text-gray-500 dark:text-gray-400"
            )}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <ArrowDown className="w-3 h-3" />
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3" />
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">esc</kbd>
                  <span>to close</span>
                </div>
              </div>
              
              {filteredItems.length > 0 && (
                <div>
                  {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }
)

CommandPalette.displayName = "CommandPalette"

// Hook for command palette
export const useCommandPalette = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { open, setOpen }
}

export { CommandPalette } 