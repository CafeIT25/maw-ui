import React, { forwardRef, useState, useRef, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, File, Image, Video, Music, Archive, FileText, Code, 
  Download, Upload, Trash2, Edit, Copy, Move, Share, Star,
  Grid, List, Search, Filter, SortAsc, SortDesc, MoreHorizontal,
  FolderPlus, FilePlus, Eye, Info, Lock, Unlock, Clock
} from 'lucide-react'
import { cn } from '../../lib/utils'

const fileManagerVariants = cva(
  "relative rounded-xl border transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700",
        modern: "bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-lg dark:bg-gray-900/95 dark:border-gray-700/50",
        minimal: "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600",
        neon: "bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/25",
        glass: "bg-white/10 backdrop-blur-md border-white/20",
        premium: "bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg dark:from-gray-900 dark:to-purple-950 dark:border-purple-800",
      },
      size: {
        sm: "h-96",
        default: "h-[32rem]",
        lg: "h-[40rem]",
        xl: "h-[48rem]",
        full: "h-screen",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: number
  mimeType?: string
  extension?: string
  createdAt: Date
  modifiedAt: Date
  thumbnail?: string
  isStarred?: boolean
  isLocked?: boolean
  permissions?: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
  }
  metadata?: Record<string, unknown>
  children?: FileItem[]
}

export interface FileManagerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileManagerVariants> {
  files: FileItem[]
  currentPath?: string[]
  viewMode?: 'grid' | 'list' | 'tree'
  sortBy?: 'name' | 'size' | 'date' | 'type'
  sortOrder?: 'asc' | 'desc'
  showHidden?: boolean
  allowUpload?: boolean
  allowDelete?: boolean
  allowRename?: boolean
  allowMove?: boolean
  allowShare?: boolean
  multiSelect?: boolean
  searchable?: boolean
  filterable?: boolean
  showThumbnails?: boolean
  showDetails?: boolean
  onFileSelect?: (file: FileItem) => void
  onFileOpen?: (file: FileItem) => void
  onFileUpload?: (files: File[]) => void
  onFileDelete?: (files: FileItem[]) => void
  onFileRename?: (file: FileItem, newName: string) => void
  onFileMove?: (files: FileItem[], destination: FileItem) => void
  onFolderCreate?: (name: string, parent?: FileItem) => void
  onFileShare?: (files: FileItem[]) => void
}

const FileManager = forwardRef<HTMLDivElement, FileManagerProps>(
  ({ 
    className, 
    variant, 
    size,
    files,
    currentPath = [],
    viewMode = 'grid',
    sortBy = 'name',
    sortOrder = 'asc',
    showHidden = false,
    allowUpload = true,
    allowDelete = true,
    allowRename = true,
    allowMove = true,
    allowShare = true,
    multiSelect = true,
    searchable = true,
    filterable = true,
    showThumbnails = true,
    showDetails = true,
    onFileSelect,
    onFileOpen,
    onFileUpload,
    onFileDelete,
    onFileRename,
    onFileMove,
    onFolderCreate,
    onFileShare,
    ...props 
  }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState<string>('all')
    const [currentViewMode, setCurrentViewMode] = useState(viewMode)
    const [currentSortBy, setCurrentSortBy] = useState(sortBy)
    const [currentSortOrder, setCurrentSortOrder] = useState(sortOrder)
    const [dragOver, setDragOver] = useState(false)
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; file?: FileItem } | null>(null)
    const [renameFile, setRenameFile] = useState<FileItem | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // File type icons
    const getFileIcon = (file: FileItem) => {
      if (file.type === 'folder') return <Folder className="w-5 h-5" />
      
      const ext = file.extension?.toLowerCase()
      const mime = file.mimeType?.toLowerCase()
      
      if (mime?.startsWith('image/')) return <Image className="w-5 h-5" />
      if (mime?.startsWith('video/')) return <Video className="w-5 h-5" />
      if (mime?.startsWith('audio/')) return <Music className="w-5 h-5" />
      if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) return <Archive className="w-5 h-5" />
      if (['txt', 'md', 'doc', 'docx', 'pdf'].includes(ext || '')) return <FileText className="w-5 h-5" />
      if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'py', 'java'].includes(ext || '')) return <Code className="w-5 h-5" />
      
      return <File className="w-5 h-5" />
    }

    // Format file size
    const formatFileSize = (bytes?: number) => {
      if (!bytes) return '-'
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
    }

    // Format date
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }

    // Filter and sort files
    const processedFiles = files
      .filter(file => {
        if (!showHidden && file.name.startsWith('.')) return false
        if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (filterType !== 'all') {
          if (filterType === 'folders' && file.type !== 'folder') return false
          if (filterType === 'images' && !file.mimeType?.startsWith('image/')) return false
          if (filterType === 'documents' && !['txt', 'doc', 'docx', 'pdf'].includes(file.extension || '')) return false
        }
        return true
      })
      .sort((a, b) => {
        let comparison = 0
        
        // Folders first
        if (a.type === 'folder' && b.type === 'file') return -1
        if (a.type === 'file' && b.type === 'folder') return 1
        
        switch (currentSortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'size':
            comparison = (a.size || 0) - (b.size || 0)
            break
          case 'date':
            comparison = a.modifiedAt.getTime() - b.modifiedAt.getTime()
            break
          case 'type':
            comparison = (a.extension || '').localeCompare(b.extension || '')
            break
        }
        
        return currentSortOrder === 'asc' ? comparison : -comparison
      })

    // Handle file selection
    const handleFileSelect = (file: FileItem, event?: React.MouseEvent) => {
      if (!multiSelect) {
        setSelectedFiles([file])
        onFileSelect?.(file)
        return
      }

      if (event?.ctrlKey || event?.metaKey) {
        setSelectedFiles(prev => 
          prev.includes(file) 
            ? prev.filter(f => f.id !== file.id)
            : [...prev, file]
        )
      } else if (event?.shiftKey && selectedFiles.length > 0) {
        const lastSelected = selectedFiles[selectedFiles.length - 1]
        const lastIndex = processedFiles.findIndex(f => f.id === lastSelected.id)
        const currentIndex = processedFiles.findIndex(f => f.id === file.id)
        const start = Math.min(lastIndex, currentIndex)
        const end = Math.max(lastIndex, currentIndex)
        setSelectedFiles(processedFiles.slice(start, end + 1))
      } else {
        setSelectedFiles([file])
      }
      
      onFileSelect?.(file)
    }

    // Handle file double click
    const handleFileDoubleClick = (file: FileItem) => {
      onFileOpen?.(file)
    }

    // Handle drag and drop
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      
      const droppedFiles = Array.from(e.dataTransfer.files)
      if (droppedFiles.length > 0 && allowUpload) {
        onFileUpload?.(droppedFiles)
      }
    }, [allowUpload, onFileUpload])

    // Handle context menu
    const handleContextMenu = (e: React.MouseEvent, file?: FileItem) => {
      e.preventDefault()
      setContextMenu({ x: e.clientX, y: e.clientY, file })
    }

    // Handle file upload
    const handleFileUploadClick = () => {
      fileInputRef.current?.click()
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFiles = Array.from(e.target.files || [])
      if (uploadedFiles.length > 0) {
        onFileUpload?.(uploadedFiles)
      }
    }

    // Render file item
    const renderFileItem = (file: FileItem, index: number) => {
      const isSelected = selectedFiles.includes(file)
      
      if (currentViewMode === 'list') {
        return (
          <motion.div
            key={file.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group",
              isSelected && "bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800",
              !isSelected && "hover:bg-gray-50 dark:hover:bg-gray-800",
              variant === 'neon' && "hover:bg-cyan-400/10",
              variant === 'glass' && "hover:bg-white/10",
              variant === 'premium' && "hover:bg-purple-50 dark:hover:bg-purple-950/50"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={(e) => handleFileSelect(file, e)}
            onDoubleClick={() => handleFileDoubleClick(file)}
            onContextMenu={(e) => handleContextMenu(e, file)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn(
                "flex-shrink-0",
                variant === 'neon' && "text-cyan-400",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-600 dark:text-purple-400"
              )}>
                {getFileIcon(file)}
              </div>
              
              {showThumbnails && file.thumbnail && (
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="w-8 h-8 rounded object-cover flex-shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium truncate",
                    variant === 'neon' && "text-cyan-100",
                    variant === 'glass' && "text-white",
                    variant === 'premium' && "text-purple-900 dark:text-purple-100"
                  )}>
                    {file.name}
                  </span>
                  {file.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />}
                  {file.isLocked && <Lock className="w-4 h-4 text-red-500 flex-shrink-0" />}
                </div>
              </div>
            </div>
            
            {showDetails && (
              <div className="flex items-center gap-6 text-sm opacity-60">
                <span className="w-16 text-right">{formatFileSize(file.size)}</span>
                <span className="w-32 text-right">{formatDate(file.modifiedAt)}</span>
              </div>
            )}
          </motion.div>
        )
      }

      // Grid view
      return (
        <motion.div
          key={file.id}
          className={cn(
            "p-4 rounded-xl cursor-pointer transition-all duration-200 group border",
            isSelected && "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
            !isSelected && "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
            variant === 'neon' && "hover:bg-cyan-400/10 hover:border-cyan-400/50",
            variant === 'glass' && "hover:bg-white/10 hover:border-white/20",
            variant === 'premium' && "hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-200 dark:hover:border-purple-800"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={(e) => handleFileSelect(file, e)}
          onDoubleClick={() => handleFileDoubleClick(file)}
          onContextMenu={(e) => handleContextMenu(e, file)}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            {showThumbnails && file.thumbnail ? (
              <div className="relative">
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute -top-1 -right-1 flex gap-1">
                  {file.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                  {file.isLocked && <Lock className="w-3 h-3 text-red-500" />}
                </div>
              </div>
            ) : (
              <div className={cn(
                "w-16 h-16 rounded-lg flex items-center justify-center relative",
                file.type === 'folder' && "bg-blue-100 dark:bg-blue-900/50",
                file.type === 'file' && "bg-gray-100 dark:bg-gray-800",
                variant === 'neon' && file.type === 'folder' && "bg-cyan-400/20",
                variant === 'premium' && file.type === 'folder' && "bg-purple-100 dark:bg-purple-900/50"
              )}>
                <div className={cn(
                  "text-2xl",
                  file.type === 'folder' && "text-blue-600 dark:text-blue-400",
                  variant === 'neon' && file.type === 'folder' && "text-cyan-400",
                  variant === 'premium' && file.type === 'folder' && "text-purple-600 dark:text-purple-400"
                )}>
                  {getFileIcon(file)}
                </div>
                <div className="absolute -top-1 -right-1 flex gap-1">
                  {file.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                  {file.isLocked && <Lock className="w-3 h-3 text-red-500" />}
                </div>
              </div>
            )}
            
            <div className="w-full">
              <p className={cn(
                "font-medium text-sm truncate",
                variant === 'neon' && "text-cyan-100",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-900 dark:text-purple-100"
              )}>
                {file.name}
              </p>
              {showDetails && file.type === 'file' && (
                <p className="text-xs opacity-60 mt-1">
                  {formatFileSize(file.size)}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          fileManagerVariants({ variant, size, className }),
          dragOver && "border-blue-500 bg-blue-50/50 dark:bg-blue-950/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
      >
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className={cn(
                "font-semibold",
                variant === 'neon' && "text-cyan-100",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-900 dark:text-purple-100"
              )}>
                File Manager
              </h3>
              
              {currentPath.length > 0 && (
                <div className="flex items-center gap-1 text-sm opacity-60">
                  <span>/</span>
                  {currentPath.map((path, index) => (
                    <React.Fragment key={index}>
                      <span>{path}</span>
                      {index < currentPath.length - 1 && <span>/</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className={cn(
                    "p-2 transition-colors",
                    currentViewMode === 'grid' && "bg-blue-500 text-white",
                    currentViewMode !== 'grid' && "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => setCurrentViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  className={cn(
                    "p-2 transition-colors",
                    currentViewMode === 'list' && "bg-blue-500 text-white",
                    currentViewMode !== 'list' && "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => setCurrentViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => setCurrentSortOrder(currentSortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {currentSortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>

              {/* Upload */}
              {allowUpload && (
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={handleFileUploadClick}
                >
                  <Upload className="w-4 h-4" />
                </button>
              )}

              {/* New folder */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => onFolderCreate?.('New Folder')}
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search and filters */}
          {(searchable || filterable) && (
            <div className="flex items-center gap-4">
              {searchable && (
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 rounded-lg border transition-colors",
                      variant === 'neon' && "bg-black border-cyan-400/50 text-cyan-100 placeholder:text-cyan-400/50",
                      variant === 'glass' && "bg-white/10 border-white/20 text-white placeholder:text-white/50",
                      variant === 'premium' && "bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800",
                      !['neon', 'glass', 'premium'].includes(variant || '') && "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    )}
                  />
                </div>
              )}

              {filterable && (
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={cn(
                    "px-3 py-2 rounded-lg border transition-colors",
                    variant === 'neon' && "bg-black border-cyan-400/50 text-cyan-100",
                    variant === 'glass' && "bg-white/10 border-white/20 text-white",
                    variant === 'premium' && "bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800",
                    !['neon', 'glass', 'premium'].includes(variant || '') && "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  )}
                >
                  <option value="all">All Files</option>
                  <option value="folders">Folders</option>
                  <option value="images">Images</option>
                  <option value="documents">Documents</option>
                </select>
              )}
            </div>
          )}
        </div>

        {/* File list */}
        <div className="flex-1 overflow-auto p-4">
          {processedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Folder className="w-16 h-16 opacity-20 mb-4" />
              <p className="text-lg font-medium opacity-60">No files found</p>
              <p className="text-sm opacity-40">
                {searchQuery ? 'Try adjusting your search' : 'Upload files to get started'}
              </p>
            </div>
          ) : (
            <div className={cn(
              currentViewMode === 'grid' && "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
              currentViewMode === 'list' && "space-y-1"
            )}>
              {processedFiles.map((file, index) => renderFileItem(file, index))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm opacity-60">
          <span>{processedFiles.length} items</span>
          {selectedFiles.length > 0 && (
            <span>{selectedFiles.length} selected</span>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Context menu */}
        {contextMenu && (
          <div
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onBlur={() => setContextMenu(null)}
          >
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Open
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Rename
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
              <Move className="w-4 h-4" />
              Move
            </button>
            <hr className="my-2" />
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}

        {/* Drag overlay */}
        {dragOver && (
          <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-2 text-blue-500" />
              <p className="text-lg font-medium text-blue-600">Drop files here to upload</p>
            </div>
          </div>
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl pointer-events-none" />
        )}
      </div>
    )
  }
)

FileManager.displayName = "FileManager"

export { FileManager } 