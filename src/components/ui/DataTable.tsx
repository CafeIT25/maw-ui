import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Input } from './Input'
import { Select } from './Select'

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string
  title: string
  dataIndex?: string
  width?: number | string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, record: T, index: number) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  ellipsis?: boolean
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    onChange?: (page: number, pageSize: number) => void
  }
  rowSelection?: {
    type?: 'checkbox' | 'radio'
    selectedRowKeys?: React.Key[]
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
    getCheckboxProps?: (record: T) => { disabled?: boolean }
  }
  rowKey?: string | ((record: T) => React.Key)
  onRow?: (record: T, index: number) => {
    onClick?: () => void
    onDoubleClick?: () => void
    onContextMenu?: () => void
  }
  scroll?: { x?: number | string; y?: number | string }
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  showHeader?: boolean
  title?: () => React.ReactNode
  footer?: () => React.ReactNode
  expandable?: {
    expandedRowRender?: (record: T, index: number) => React.ReactNode
    expandedRowKeys?: React.Key[]
    onExpand?: (expanded: boolean, record: T) => void
  }
  className?: string
  variant?: 'default' | 'minimal' | 'modern' | 'glass' | 'neon'
}

const tableVariants = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
  minimal: 'bg-transparent border-none',
  modern: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg',
  glass: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50',
  neon: 'bg-black border-2 border-cyan-400 shadow-cyan-400/25'
}

const sizeVariants = {
  small: 'text-xs',
  middle: 'text-sm',
  large: 'text-base'
}

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  pagination,
  rowSelection,
  rowKey = 'id',
  onRow,
  scroll,
  size = 'middle',
  bordered = false,
  showHeader = true,
  title,
  footer,
  expandable,
  className,
  variant = 'default'
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRows, setSelectedRows] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  )
  const [expandedRows, setExpandedRows] = useState<React.Key[]>(
    expandable?.expandedRowKeys || []
  )

  const getRowKey = useCallback((record: T, index: number): React.Key => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return (record as Record<string, unknown>)[rowKey as string] as React.Key || index
  }, [rowKey])

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortConfig.key]
      const bValue = (b as Record<string, unknown>)[sortConfig.key]

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1

      // Convert to comparable values
      const aCompare = typeof aValue === 'string' || typeof aValue === 'number' ? aValue : String(aValue)
      const bCompare = typeof bValue === 'string' || typeof bValue === 'number' ? bValue : String(bValue)

      if (aCompare < bCompare) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aCompare > bCompare) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  // Filtering logic
  const filteredData = useMemo(() => {
    let filtered = sortedData

    // Apply global search
    if (searchQuery) {
      filtered = filtered.filter(item => {
        return columns.some(column => {
          const value = String((item as Record<string, unknown>)[column.dataIndex || column.key] || '').toLowerCase()
          return value.includes(searchQuery.toLowerCase())
        })
      })
    }

    return filtered
  }, [sortedData, searchQuery, columns])

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData

    const start = (pagination.current - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return filteredData.slice(start, end)
  }, [filteredData, pagination])

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' }
        } else {
          return null
        }
      }
      return { key, direction: 'asc' }
    })
  }

  const handleRowSelect = (rowKey: React.Key, selected: boolean) => {
    const newSelectedRows = selected
      ? [...selectedRows, rowKey]
      : selectedRows.filter(key => key !== rowKey)
    
    setSelectedRows(newSelectedRows)
    
    if (rowSelection?.onChange) {
      const selectedRecords = data.filter(record => 
        newSelectedRows.includes(getRowKey(record, data.indexOf(record)))
      )
      rowSelection.onChange(newSelectedRows, selectedRecords)
    }
  }

  const handleSelectAll = (selected: boolean) => {
    const allRowKeys = paginatedData.map((record, index) => getRowKey(record, index))
    const newSelectedRows = selected ? allRowKeys : []
    
    setSelectedRows(newSelectedRows)
    
    if (rowSelection?.onChange) {
      const selectedRecords = selected ? paginatedData : []
      rowSelection.onChange(newSelectedRows, selectedRecords)
    }
  }

  const handleExpand = (rowKey: React.Key, expanded: boolean) => {
    const newExpandedRows = expanded
      ? [...expandedRows, rowKey]
      : expandedRows.filter(key => key !== rowKey)
    
    setExpandedRows(newExpandedRows)
    
    if (expandable?.onExpand) {
      const record = data.find((item, index) => getRowKey(item, index) === rowKey)
      if (record) {
        expandable.onExpand(expanded, record)
      }
    }
  }

  const renderCell = (column: DataTableColumn<T>, record: T, index: number) => {
    const value = (record as Record<string, unknown>)[column.dataIndex || column.key]
    
    if (column.render) {
      return column.render(value, record, index)
    }
    
    if (column.ellipsis && typeof value === 'string' && value.length > 50) {
      return (
        <span title={value} className="truncate block">
          {value}
        </span>
      )
    }
    
    return value as React.ReactNode
  }

  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every(record => 
      selectedRows.includes(getRowKey(record, paginatedData.indexOf(record)))
    )

  const isIndeterminate = selectedRows.length > 0 && !isAllSelected

  const scrollStyle = scroll ? {
    overflowX: scroll.x ? 'auto' as const : undefined,
    overflowY: scroll.y ? 'auto' as const : undefined,
    maxWidth: scroll.x,
    maxHeight: scroll.y
  } : undefined

  return (
    <div className={cn('w-full', className)}>
      {/* Table Header */}
      {(title || searchQuery !== undefined) && (
        <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {title && (
            <div className="flex-1">
              {title()}
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
              className="w-64"
            />
            <Button variant="outline" leftIcon={<Filter size={16} />}>
              Filter
            </Button>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className={cn(
        'rounded-xl overflow-hidden',
        tableVariants[variant],
        bordered && 'border'
      )}>
        <div className="overflow-x-auto" style={scrollStyle}>
          <table className="w-full">
            {/* Table Head */}
            {showHeader && (
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {rowSelection && (
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={input => {
                          if (input) input.indeterminate = isIndeterminate
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                  )}
                  
                  {expandable && (
                    <th className="px-4 py-3 w-12"></th>
                  )}
                  
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        'px-4 py-3 font-semibold text-gray-900 dark:text-gray-100',
                        sizeVariants[size],
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                      style={{ width: column.width }}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.title}</span>
                        {column.sortable && (
                          <div className="flex flex-col">
                            {sortConfig?.key === column.key ? (
                              sortConfig.direction === 'asc' ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )
                            ) : (
                              <ArrowUpDown size={14} className="text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                  
                  <th className="px-4 py-3 w-12">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </th>
                </tr>
              </thead>
            )}

            {/* Table Body */}
            <tbody>
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0) + 1}>
                      <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0) + 1}>
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No data available
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((record, index) => {
                    const key = getRowKey(record, index)
                    const isSelected = selectedRows.includes(key)
                    const isExpanded = expandedRows.includes(key)
                    const rowProps = onRow?.(record, index)

                    return (
                      <React.Fragment key={key}>
                        <motion.tr
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={cn(
                            'border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
                            isSelected && 'bg-blue-50 dark:bg-blue-900/20',
                            rowProps?.onClick && 'cursor-pointer'
                          )}
                          onClick={rowProps?.onClick}
                          onDoubleClick={rowProps?.onDoubleClick}
                          onContextMenu={rowProps?.onContextMenu}
                        >
                          {rowSelection && (
                            <td className="px-4 py-3">
                              <input
                                type={rowSelection.type || 'checkbox'}
                                checked={isSelected}
                                onChange={(e) => handleRowSelect(key, e.target.checked)}
                                disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                          )}
                          
                          {expandable && (
                            <td className="px-4 py-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleExpand(key, !isExpanded)}
                                className="p-1"
                              >
                                <motion.div
                                  animate={{ rotate: isExpanded ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight size={16} />
                                </motion.div>
                              </Button>
                            </td>
                          )}
                          
                          {columns.map((column) => (
                            <td
                              key={column.key}
                              className={cn(
                                'px-4 py-3',
                                sizeVariants[size],
                                column.align === 'center' && 'text-center',
                                column.align === 'right' && 'text-right'
                              )}
                            >
                              {renderCell(column, record, index)}
                            </td>
                          ))}
                          
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="p-1">
                                <Eye size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1 text-red-500">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                        
                        {/* Expanded Row */}
                        {expandable && isExpanded && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td colSpan={columns.length + (rowSelection ? 1 : 0) + 2}>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                                {expandable.expandedRowRender?.(record, index)}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} entries
          </div>
          
          <div className="flex items-center gap-2">
            {pagination.showSizeChanger && (
              <Select
                options={[
                  { value: '10', label: '10 / page' },
                  { value: '20', label: '20 / page' },
                  { value: '50', label: '50 / page' },
                  { value: '100', label: '100 / page' }
                ]}
                value={String(pagination.pageSize)}
                onValueChange={(value) => 
                  pagination.onChange?.(1, parseInt(value as string))
                }
                className="w-32"
              />
            )}
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange?.(1, pagination.pageSize)}
                disabled={pagination.current === 1}
              >
                <ChevronsLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange?.(pagination.current - 1, pagination.pageSize)}
                disabled={pagination.current === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              
              <span className="px-3 py-1 text-sm">
                {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange?.(pagination.current + 1, pagination.pageSize)}
                disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              >
                <ChevronRight size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange?.(Math.ceil(pagination.total / pagination.pageSize), pagination.pageSize)}
                disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              >
                <ChevronsRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {footer && (
        <div className="mt-4">
          {footer()}
        </div>
      )}
    </div>
  )
} 