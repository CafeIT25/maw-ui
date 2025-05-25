import React, { forwardRef, useState, useRef, useCallback, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Link, Image, Video, Table, Undo, Redo,
  Type, Palette, Highlighter, Subscript, Superscript, Indent, Outdent,
  Save, Download, Upload, Share, Eye, EyeOff, Maximize2, Minimize2,
  Users, MessageCircle, Clock, CheckCircle, AlertCircle
} from 'lucide-react'
import { cn } from '../../lib/utils'

const editorVariants = cva(
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
        sm: "h-64",
        default: "h-96",
        lg: "h-[32rem]",
        xl: "h-[40rem]",
        full: "h-screen",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface EditorCommand {
  id: string
  name: string
  icon: React.ReactNode
  action: () => void
  isActive?: boolean
  shortcut?: string
  group?: string
}

export interface Collaborator {
  id: string
  name: string
  avatar?: string
  color: string
  cursor?: { x: number; y: number }
  selection?: { start: number; end: number }
  isOnline: boolean
}

export interface Comment {
  id: string
  author: Collaborator
  content: string
  timestamp: Date
  position: { start: number; end: number }
  resolved?: boolean
  replies?: Comment[]
}

export interface RichTextEditorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof editorVariants> {
  content?: string
  placeholder?: string
  readOnly?: boolean
  collaborative?: boolean
  collaborators?: Collaborator[]
  comments?: Comment[]
  showToolbar?: boolean
  showStatusBar?: boolean
  showLineNumbers?: boolean
  showWordCount?: boolean
  showCollaborators?: boolean
  showComments?: boolean
  autoSave?: boolean
  autoSaveInterval?: number
  spellCheck?: boolean
  syntaxHighlight?: boolean
  theme?: 'light' | 'dark' | 'auto'
  maxLength?: number
  onChange?: (content: string) => void
  onSave?: (content: string) => void
  onComment?: (comment: Omit<Comment, 'id' | 'timestamp'>) => void
  onCollaboratorJoin?: (collaborator: Collaborator) => void
  onCollaboratorLeave?: (collaboratorId: string) => void
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ 
    className, 
    variant, 
    size,
    content = '',
    placeholder = 'Start writing...',
    readOnly = false,
    collaborative = false,
    collaborators = [],
    comments = [],
    showToolbar = true,
    showStatusBar = true,
    showLineNumbers = false,
    showWordCount = true,
    showCollaborators = true,
    showComments = true,
    autoSave = false,
    autoSaveInterval = 30000,
    spellCheck = true,
    syntaxHighlight = false,
    theme = 'auto',
    maxLength,
    onChange,
    onSave,
    onComment,
    onCollaboratorJoin,
    onCollaboratorLeave,
    ...props 
  }, ref) => {
    const [editorContent, setEditorContent] = useState(content)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [selectedText, setSelectedText] = useState('')
    const [cursorPosition, setCursorPosition] = useState(0)
    const [wordCount, setWordCount] = useState(0)
    const [characterCount, setCharacterCount] = useState(0)
    const [isPreview, setIsPreview] = useState(false)
    const [showCommentDialog, setShowCommentDialog] = useState(false)
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
    const [history, setHistory] = useState<string[]>([content])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    
    const editorRef = useRef<HTMLDivElement>(null)
    const toolbarRef = useRef<HTMLDivElement>(null)

    // Update content when prop changes
    useEffect(() => {
      setEditorContent(content)
    }, [content])

    // Auto-save functionality
    useEffect(() => {
      if (autoSave && editorContent !== content) {
        const timer = setTimeout(() => {
          onSave?.(editorContent)
          setLastSaved(new Date())
        }, autoSaveInterval)
        
        return () => clearTimeout(timer)
      }
    }, [editorContent, autoSave, autoSaveInterval, onSave, content])

    // Word and character count
    useEffect(() => {
      const words = editorContent.trim().split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
      setCharacterCount(editorContent.length)
    }, [editorContent])

    // Editor commands
    const commands: EditorCommand[] = [
      {
        id: 'bold',
        name: 'Bold',
        icon: <Bold className="w-4 h-4" />,
        action: () => execCommand('bold'),
        isActive: activeFormats.has('bold'),
        shortcut: 'Ctrl+B',
        group: 'format'
      },
      {
        id: 'italic',
        name: 'Italic',
        icon: <Italic className="w-4 h-4" />,
        action: () => execCommand('italic'),
        isActive: activeFormats.has('italic'),
        shortcut: 'Ctrl+I',
        group: 'format'
      },
      {
        id: 'underline',
        name: 'Underline',
        icon: <Underline className="w-4 h-4" />,
        action: () => execCommand('underline'),
        isActive: activeFormats.has('underline'),
        shortcut: 'Ctrl+U',
        group: 'format'
      },
      {
        id: 'strikethrough',
        name: 'Strikethrough',
        icon: <Strikethrough className="w-4 h-4" />,
        action: () => execCommand('strikeThrough'),
        isActive: activeFormats.has('strikethrough'),
        group: 'format'
      },
      {
        id: 'alignLeft',
        name: 'Align Left',
        icon: <AlignLeft className="w-4 h-4" />,
        action: () => execCommand('justifyLeft'),
        group: 'align'
      },
      {
        id: 'alignCenter',
        name: 'Align Center',
        icon: <AlignCenter className="w-4 h-4" />,
        action: () => execCommand('justifyCenter'),
        group: 'align'
      },
      {
        id: 'alignRight',
        name: 'Align Right',
        icon: <AlignRight className="w-4 h-4" />,
        action: () => execCommand('justifyRight'),
        group: 'align'
      },
      {
        id: 'alignJustify',
        name: 'Justify',
        icon: <AlignJustify className="w-4 h-4" />,
        action: () => execCommand('justifyFull'),
        group: 'align'
      },
      {
        id: 'bulletList',
        name: 'Bullet List',
        icon: <List className="w-4 h-4" />,
        action: () => execCommand('insertUnorderedList'),
        group: 'list'
      },
      {
        id: 'numberedList',
        name: 'Numbered List',
        icon: <ListOrdered className="w-4 h-4" />,
        action: () => execCommand('insertOrderedList'),
        group: 'list'
      },
      {
        id: 'quote',
        name: 'Quote',
        icon: <Quote className="w-4 h-4" />,
        action: () => execCommand('formatBlock', 'blockquote'),
        group: 'block'
      },
      {
        id: 'code',
        name: 'Code',
        icon: <Code className="w-4 h-4" />,
        action: () => execCommand('formatBlock', 'pre'),
        group: 'block'
      },
      {
        id: 'link',
        name: 'Link',
        icon: <Link className="w-4 h-4" />,
        action: () => insertLink(),
        group: 'insert'
      },
      {
        id: 'image',
        name: 'Image',
        icon: <Image className="w-4 h-4" />,
        action: () => insertImage(),
        group: 'insert'
      },
      {
        id: 'undo',
        name: 'Undo',
        icon: <Undo className="w-4 h-4" />,
        action: () => undo(),
        shortcut: 'Ctrl+Z',
        group: 'history'
      },
      {
        id: 'redo',
        name: 'Redo',
        icon: <Redo className="w-4 h-4" />,
        action: () => redo(),
        shortcut: 'Ctrl+Y',
        group: 'history'
      }
    ]

    const execCommand = useCallback((command: string, value?: string) => {
      document.execCommand(command, false, value)
      updateActiveFormats()
    }, [])

    const updateActiveFormats = useCallback(() => {
      const formats = new Set<string>()
      if (document.queryCommandState('bold')) formats.add('bold')
      if (document.queryCommandState('italic')) formats.add('italic')
      if (document.queryCommandState('underline')) formats.add('underline')
      if (document.queryCommandState('strikeThrough')) formats.add('strikethrough')
      setActiveFormats(formats)
    }, [])

    const insertLink = () => {
      const url = prompt('Enter URL:')
      if (url) {
        execCommand('createLink', url)
      }
    }

    const insertImage = () => {
      const url = prompt('Enter image URL:')
      if (url) {
        execCommand('insertImage', url)
      }
    }

    const undo = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setEditorContent(history[newIndex])
      }
    }

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setEditorContent(history[newIndex])
      }
    }

    const addToHistory = (content: string) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(content)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML
      setEditorContent(newContent)
      onChange?.(newContent)
      addToHistory(newContent)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault()
            execCommand('bold')
            break
          case 'i':
            e.preventDefault()
            execCommand('italic')
            break
          case 'u':
            e.preventDefault()
            execCommand('underline')
            break
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case 'y':
            e.preventDefault()
            redo()
            break
          case 's':
            e.preventDefault()
            onSave?.(editorContent)
            setLastSaved(new Date())
            break
        }
      }
    }

    const renderToolbar = () => {
      const groupedCommands = commands.reduce((acc, command) => {
        const group = command.group || 'misc'
        if (!acc[group]) acc[group] = []
        acc[group].push(command)
        return acc
      }, {} as Record<string, EditorCommand[]>)

      return (
        <div ref={toolbarRef} className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 flex-wrap">
            {Object.entries(groupedCommands).map(([group, groupCommands], groupIndex) => (
              <React.Fragment key={group}>
                {groupIndex > 0 && (
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
                )}
                {groupCommands.map((command) => (
                  <button
                    key={command.id}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                      command.isActive && "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
                      variant === 'neon' && "hover:bg-cyan-400/10",
                      variant === 'glass' && "hover:bg-white/10",
                      variant === 'premium' && "hover:bg-purple-50 dark:hover:bg-purple-950/50"
                    )}
                    onClick={command.action}
                    title={`${command.name}${command.shortcut ? ` (${command.shortcut})` : ''}`}
                    disabled={readOnly}
                  >
                    {command.icon}
                  </button>
                ))}
              </React.Fragment>
            ))}

            <div className="flex-1" />

            {/* View controls */}
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsPreview(!isPreview)}
                title="Toggle Preview"
              >
                {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              
              <button
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {onSave && (
                <button
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    onSave(editorContent)
                    setLastSaved(new Date())
                  }}
                  title="Save"
                >
                  <Save className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    const renderCollaborators = () => {
      if (!collaborative || !showCollaborators || collaborators.length === 0) return null

      return (
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div className="flex -space-x-2">
            {collaborators.slice(0, 3).map((collaborator) => (
              <motion.div
                key={collaborator.id}
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {collaborator.avatar ? (
                  <img
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: collaborator.color }}
                  >
                    {collaborator.name.charAt(0)}
                  </div>
                )}
                {collaborator.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800" />
                )}
              </motion.div>
            ))}
            {collaborators.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                +{collaborators.length - 3}
              </div>
            )}
          </div>
          <Users className="w-4 h-4 opacity-60" />
        </div>
      )
    }

    const renderStatusBar = () => {
      if (!showStatusBar) return null

      return (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm opacity-60">
          <div className="flex items-center gap-4">
            {showWordCount && (
              <span>{wordCount} words, {characterCount} characters</span>
            )}
            {maxLength && (
              <span className={characterCount > maxLength ? 'text-red-500' : ''}>
                {characterCount}/{maxLength}
              </span>
            )}
            {lastSaved && (
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {collaborative && (
              <span>{collaborators.filter(c => c.isOnline).length} online</span>
            )}
            <span>Line {Math.floor(cursorPosition / 80) + 1}</span>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          editorVariants({ variant, size, className }),
          isFullscreen && "fixed inset-4 z-50 h-auto"
        )}
        {...props}
      >
        {showToolbar && renderToolbar()}
        
        {renderCollaborators()}

        {/* Editor content */}
        <div className="flex-1 relative">
          {isPreview ? (
            <div
              className="p-6 prose prose-sm max-w-none dark:prose-invert overflow-auto h-full"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
          ) : (
            <div
              ref={editorRef}
              className={cn(
                "p-6 outline-none overflow-auto h-full",
                variant === 'neon' && "text-cyan-100",
                variant === 'glass' && "text-white",
                variant === 'premium' && "text-purple-900 dark:text-purple-100"
              )}
              contentEditable={!readOnly}
              suppressContentEditableWarning
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              onMouseUp={updateActiveFormats}
              onKeyUp={updateActiveFormats}
              data-placeholder={placeholder}
              spellCheck={spellCheck}
              style={{
                minHeight: '200px',
                ...(editorContent === '' && {
                  '&::before': {
                    content: `"${placeholder}"`,
                    color: '#9CA3AF',
                    position: 'absolute',
                    pointerEvents: 'none'
                  }
                })
              }}
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
          )}

          {/* Line numbers */}
          {showLineNumbers && !isPreview && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2 text-xs opacity-60">
              {Array.from({ length: Math.max(10, Math.floor(characterCount / 80)) }, (_, i) => (
                <div key={i} className="h-5 flex items-center">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
        </div>

        {renderStatusBar()}

        {/* Comments panel */}
        {showComments && comments.length > 0 && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-auto">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments ({comments.length})
            </h3>
            
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {comment.author.avatar ? (
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                        style={{ backgroundColor: comment.author.color }}
                      >
                        {comment.author.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <span className="text-xs opacity-60">
                      {comment.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  {comment.resolved && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Resolved
                    </div>
                  )}
                </div>
              ))}
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

RichTextEditor.displayName = "RichTextEditor"

export { RichTextEditor } 