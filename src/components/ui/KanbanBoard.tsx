import React, { forwardRef, useState, useRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MoreHorizontal, User, Calendar, AlertCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

const kanbanBoardVariants = cva(
  "flex gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800",
  {
    variants: {
      variant: {
        default: "bg-gray-50 dark:bg-gray-900 min-h-[400px]",
        modern: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 min-h-[400px]",
        minimal: "bg-white dark:bg-gray-800 min-h-[400px]",
        neon: "bg-black min-h-[400px]",
        glass: "bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-lg min-h-[400px]",
        premium: "bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 min-h-[400px]",
        compact: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 min-h-[350px] max-h-[450px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const kanbanColumnVariants = cva(
  "flex flex-col bg-white dark:bg-gray-800 rounded-xl flex-shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default: "border border-gray-200 dark:border-gray-700 min-w-[280px] max-w-[320px]",
        modern: "border border-blue-200 dark:border-blue-800 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-950/50 min-w-[280px] max-w-[320px]",
        minimal: "border-none shadow-none bg-gray-50 dark:bg-gray-700 min-w-[280px] max-w-[320px]",
        neon: "border border-cyan-400/50 bg-gray-900 shadow-lg shadow-cyan-400/20 min-w-[280px] max-w-[320px]",
        glass: "border border-white/20 bg-white/10 backdrop-blur-md shadow-lg min-w-[280px] max-w-[320px]",
        premium: "border border-purple-200 dark:border-purple-800 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-950/50 shadow-lg min-w-[280px] max-w-[320px]",
        compact: "border border-blue-200 dark:border-blue-800 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-950/50 min-w-[220px] max-w-[240px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const kanbanCardVariants = cva(
  "p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 group",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-900 dark:border-gray-700",
        modern: "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.02] dark:bg-gray-900 dark:border-gray-700",
        minimal: "bg-white border-l-4 border-l-blue-500 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700",
        neon: "bg-black border border-cyan-400 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30",
        premium: "bg-gradient-to-br from-white to-purple-50 border border-purple-200 shadow-sm hover:shadow-lg dark:from-gray-900 dark:to-purple-950 dark:border-purple-800",
        compact: "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.01] dark:bg-gray-900 dark:border-gray-700 p-2",
      },
      priority: {
        low: "border-l-green-500",
        medium: "border-l-yellow-500",
        high: "border-l-orange-500",
        urgent: "border-l-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface KanbanCard {
  id: string
  title: string
  description?: string
  assignee?: {
    name: string
    avatar?: string
  }
  dueDate?: Date
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  tags?: string[]
  attachments?: number
  comments?: number
  progress?: number
  status?: string
  metadata?: Record<string, unknown>
}

export interface KanbanColumn {
  id: string
  title: string
  description?: string
  cards: KanbanCard[]
  limit?: number
  color?: string
  icon?: React.ReactNode
}

export interface KanbanBoardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kanbanBoardVariants> {
  columns: KanbanColumn[]
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string, newIndex: number) => void
  onCardClick?: (card: KanbanCard) => void
  onColumnAdd?: () => void
  onCardAdd?: (columnId: string) => void
  editable?: boolean
  showAddColumn?: boolean
  showAddCard?: boolean
}

const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ 
    className, 
    variant,
    columns: initialColumns,
    onCardMove,
    onCardClick,
    onColumnAdd,
    onCardAdd,
    editable = true,
    showAddColumn = true,
    showAddCard = true,
    ...props 
  }, ref) => {
    const [columns, setColumns] = useState(initialColumns)
    const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null)
    const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null)
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
    const dragCounter = useRef(0)

    // Update columns when initialColumns change
    React.useEffect(() => {
      setColumns(initialColumns)
    }, [initialColumns])

    const handleDragStart = (card: KanbanCard, columnId: string) => {
      setDraggedCard(card)
      setDraggedFromColumn(columnId)
    }

    const handleDragEnd = () => {
      setDraggedCard(null)
      setDraggedFromColumn(null)
      setDragOverColumn(null)
      dragCounter.current = 0
    }

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
      e.preventDefault()
      setDragOverColumn(columnId)
    }

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault()
      dragCounter.current++
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      dragCounter.current--
      if (dragCounter.current === 0) {
        setDragOverColumn(null)
      }
    }

    const handleDrop = (e: React.DragEvent, columnId: string) => {
      e.preventDefault()
      
      if (draggedCard && draggedFromColumn && draggedFromColumn !== columnId) {
        // Update local state
        setColumns(prevColumns => {
          const newColumns = [...prevColumns]
          
          // Remove card from source column
          const sourceColumnIndex = newColumns.findIndex(col => col.id === draggedFromColumn)
          if (sourceColumnIndex !== -1) {
            newColumns[sourceColumnIndex] = {
              ...newColumns[sourceColumnIndex],
              cards: newColumns[sourceColumnIndex].cards.filter(card => card.id !== draggedCard.id)
            }
          }
          
          // Add card to target column
          const targetColumnIndex = newColumns.findIndex(col => col.id === columnId)
          if (targetColumnIndex !== -1) {
            newColumns[targetColumnIndex] = {
              ...newColumns[targetColumnIndex],
              cards: [...newColumns[targetColumnIndex].cards, draggedCard]
            }
          }
          
          return newColumns
        })
        
        // Call external callback
        const targetColumn = columns.find(col => col.id === columnId)
        const newIndex = targetColumn ? targetColumn.cards.length : 0
        onCardMove?.(draggedCard.id, draggedFromColumn, columnId, newIndex)
      }
      
      handleDragEnd()
    }

    const getPriorityColor = (priority?: string) => {
      switch (priority) {
        case 'low':
          return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
        case 'medium':
          return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
        case 'high':
          return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300'
        case 'urgent':
          return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
        default:
          return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
      }
    }

    const formatDate = (date: Date) => {
      const now = new Date()
      const diffTime = date.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) {
        return `${Math.abs(diffDays)} days overdue`
      } else if (diffDays === 0) {
        return 'Due today'
      } else if (diffDays === 1) {
        return 'Due tomorrow'
      } else {
        return `Due in ${diffDays} days`
      }
    }

    return (
      <div
        ref={ref}
        className={cn(kanbanBoardVariants({ variant, className }))}
        {...props}
      >
        {columns.map((column) => (
          <motion.div
            key={column.id}
            className={cn(
              kanbanColumnVariants({ variant }),
              dragOverColumn === column.id && "ring-2 ring-blue-500 ring-opacity-50"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {column.icon && (
                    <div className={cn(
                      "p-1 rounded",
                      variant === 'neon' && "text-cyan-400",
                      variant === 'glass' && "text-white",
                      variant === 'premium' && "text-purple-600 dark:text-purple-400"
                    )}>
                      {column.icon}
                    </div>
                  )}
                  <h3 className={cn(
                    "font-semibold",
                    variant === 'neon' && "text-cyan-100",
                    variant === 'glass' && "text-white",
                    variant === 'premium' && "text-purple-900 dark:text-purple-100"
                  )}>
                    {column.title}
                  </h3>
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    variant === 'neon' && "bg-cyan-400/20 text-cyan-300",
                    variant === 'glass' && "bg-white/20 text-white",
                    variant === 'premium' && "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
                    !['neon', 'glass', 'premium'].includes(variant || '') && "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  )}>
                    {column.cards.length}
                    {column.limit && `/${column.limit}`}
                  </span>
                </div>
                
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              {column.description && (
                <p className={cn(
                  "text-sm opacity-70",
                  variant === 'neon' && "text-cyan-200",
                  variant === 'glass' && "text-white/70",
                  variant === 'premium' && "text-purple-700 dark:text-purple-300"
                )}>
                  {column.description}
                </p>
              )}
            </div>

            {/* Cards Container */}
            <div className="flex-1 p-4 space-y-3 min-h-[200px]">
              <AnimatePresence>
                {column.cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className={cn(
                      kanbanCardVariants({ variant, priority: card.priority }),
                      draggedCard?.id === card.id && "opacity-50"
                    )}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    draggable={editable}
                    onDragStart={() => handleDragStart(card, column.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onCardClick?.(card)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Card Header */}
                    <div className="mb-3">
                      <h4 className={cn(
                        "font-medium mb-1 break-words",
                        variant === 'neon' && "text-cyan-100",
                        variant === 'glass' && "text-white",
                        variant === 'premium' && "text-purple-900 dark:text-purple-100"
                      )}>
                        {card.title}
                      </h4>
                      
                      {card.description && (
                        <p className={cn(
                          "text-sm opacity-70 break-words",
                          variant === 'neon' && "text-cyan-200",
                          variant === 'glass' && "text-white/70",
                          variant === 'premium' && "text-purple-700 dark:text-purple-300"
                        )}>
                          {card.description}
                        </p>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {card.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="opacity-70">Progress</span>
                          <span className="opacity-70">{card.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {card.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={cn(
                              "px-2 py-1 text-xs rounded-full truncate max-w-full",
                              variant === 'neon' && "bg-cyan-400/20 text-cyan-300",
                              variant === 'glass' && "bg-white/20 text-white",
                              variant === 'premium' && "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
                              !['neon', 'glass', 'premium'].includes(variant || '') && "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                        {card.tags.length > 4 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            +{card.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="flex items-start justify-between text-xs gap-2">
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        {card.priority && (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-xs font-medium",
                              getPriorityColor(card.priority)
                            )}>
                              {card.priority.toUpperCase()}
                            </span>
                          </div>
                        )}
                        
                        {card.assignee && (
                          <div className="flex items-center gap-1">
                            {card.assignee.avatar ? (
                              <img
                                src={card.assignee.avatar}
                                alt={card.assignee.name}
                                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-3 h-3" />
                              </div>
                            )}
                            <span className="opacity-70 truncate">{card.assignee.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {card.dueDate && (
                          <div className={cn(
                            "flex items-center gap-1",
                            new Date(card.dueDate) < new Date() && "text-red-500"
                          )}>
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="whitespace-nowrap text-xs">{formatDate(card.dueDate)}</span>
                          </div>
                        )}
                        
                        {(card.attachments || card.comments) && (
                          <div className="flex items-center gap-1 opacity-70">
                            {card.attachments && (
                              <span className="text-xs">📎 {card.attachments}</span>
                            )}
                            {card.comments && (
                              <span className="text-xs">💬 {card.comments}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Card Button */}
              {showAddCard && editable && (
                <motion.button
                  className={cn(
                    "w-full p-3 border-2 border-dashed rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700",
                    variant === 'neon' && "border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10",
                    variant === 'glass' && "border-white/30 hover:border-white/50 hover:bg-white/10",
                    variant === 'premium' && "border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-950",
                    !['neon', 'glass', 'premium'].includes(variant || '') && "border-gray-300 dark:border-gray-600"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCardAdd?.(column.id)}
                >
                  <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                    <Plus className="w-4 h-4" />
                    Add Card
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Add Column Button */}
        {showAddColumn && editable && (
          <motion.div
            className={cn(
              "min-w-[280px] max-w-[320px] flex-shrink-0 p-6 border-2 border-dashed rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
              variant === 'neon' && "border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10",
              variant === 'glass' && "border-white/30 hover:border-white/50 hover:bg-white/10",
              variant === 'premium' && "border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-950",
              !['neon', 'glass', 'premium'].includes(variant || '') && "border-gray-300 dark:border-gray-600"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onColumnAdd}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Plus className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm opacity-70">Add Column</span>
            </div>
          </motion.div>
        )}
      </div>
    )
  }
)

KanbanBoard.displayName = "KanbanBoard"

export { KanbanBoard } 