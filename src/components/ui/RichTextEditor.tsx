import React, { forwardRef, useState, useRef, useCallback, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Link, Image, Undo, Redo,
  Save, Eye, EyeOff, Maximize2, Minimize2,
  Users, MessageCircle, CheckCircle, X
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Input } from './Input'

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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
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
  autoSaveInterval?: number
  spellCheck?: boolean
  syntaxHighlight?: boolean
  theme?: 'light' | 'dark' | 'auto'
  maxLength?: number
  onContentChange?: (content: string) => void
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
    autoSaveInterval = 5000,
    spellCheck = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    syntaxHighlight = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    theme = 'auto',
    maxLength,
    onContentChange,
    onSave,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onComment,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCollaboratorJoin,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCollaboratorLeave,
    ...props 
  }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editorContent, setEditorContent] = useState(content)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFullscreen, setIsFullscreen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [wordCount, setWordCount] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [characterCount, setCharacterCount] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPreview, setIsPreview] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_showCommentDialog, _setShowCommentDialog] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [history, setHistory] = useState<string[]>([content])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [historyIndex, setHistoryIndex] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showLinkModal, setShowLinkModal] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [linkUrl, setLinkUrl] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [linkText, setLinkText] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedRange, setSelectedRange] = useState<Range | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showCodeModal, setShowCodeModal] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [codeContent, setCodeContent] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [codeLanguage, setCodeLanguage] = useState('javascript')
    
    const editorRef = useRef<HTMLDivElement>(null)
    const toolbarRef = useRef<HTMLDivElement>(null)

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

    // Update content when prop changes
    useEffect(() => {
      if (editorRef.current && !editorRef.current.innerHTML && content) {
        editorRef.current.innerHTML = content
      }
    }, [])

    // propsのcontentが変更された時のみエディターを更新
    useEffect(() => {
      if (content !== editorContent) {
        updateEditorContent(content)
        setEditorContent(content)
      }
    }, [content, editorContent])

    // Auto-save functionality
    useEffect(() => {
      if (autoSaveInterval && editorContent !== content) {
        const timer = setTimeout(() => {
          onSave?.(editorContent)
          setLastSaved(new Date())
        }, autoSaveInterval)
        
        return () => clearTimeout(timer)
      }
    }, [editorContent, autoSaveInterval, onSave, content])

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
        id: 'insertCode',
        name: 'Insert Code',
        icon: <Code className="w-4 h-4" />,
        action: () => insertCode(),
        group: 'insert'
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

    const insertLink = () => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        setSelectedRange(range)
        setLinkText(selection.toString())
        setShowLinkModal(true)
      } else {
        setSelectedRange(null)
        setLinkText('')
        setShowLinkModal(true)
      }
    }

    const insertImage = () => {
      const url = prompt('Enter image URL:')
      if (url) {
        execCommand('insertImage', url)
      }
    }

    const insertCode = () => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        setSelectedRange(range)
        setCodeContent(selection.toString())
        setShowCodeModal(true)
      } else {
        setSelectedRange(null)
        setCodeContent('')
        setShowCodeModal(true)
      }
    }

    const formatCode = (code: string): string => {
      // 基本的なコード整形機能
      let formatted = code
      
      // 行の先頭と末尾の空白を除去
      formatted = formatted.split('\n').map(line => line.trim()).join('\n')
      
      // 括弧に基づくインデント
      const lines = formatted.split('\n')
      let indentLevel = 0
      const indentSize = 2
      
      const formattedLines = lines.map(line => {
        if (line.trim() === '') return ''
        
        // 閉じ括弧の場合、先にインデントレベルを減らす
        if (line.trim().match(/^[\}\]\)]/)) {
          indentLevel = Math.max(0, indentLevel - 1)
        }
        
        const indentedLine = ' '.repeat(indentLevel * indentSize) + line.trim()
        
        // 開き括弧の場合、インデントレベルを増やす
        if (line.trim().match(/[\{\[\(]$/)) {
          indentLevel++
        }
        
        return indentedLine
      })
      
      return formattedLines.join('\n')
    }

    const formatCodeAdvanced = (code: string, language: string): string => {
      let formatted = code.trim()
      
      // 言語固有の整形
      switch (language) {
        case 'javascript':
        case 'typescript':
          return formatJavaScript(formatted)
        case 'python':
          return formatPython(formatted)
        case 'java':
        case 'cpp':
          return formatCStyleLanguage(formatted)
        case 'html':
          return formatHTML(formatted)
        case 'css':
          return formatCSS(formatted)
        default:
          return formatCode(formatted)
      }
    }

    const formatJavaScript = (code: string): string => {
      return code
        .replace(/\b(const|let|var|function|class|if|else|for|while|switch|case|return|import|export|default)\b/g, '<span class="text-blue-600 dark:text-blue-400 font-semibold">$1</span>')
        .replace(/(\d+)/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-600 dark:text-green-400">$1$2$3</span>')
        .replace(/([{}])/g, '<span class="text-purple-600 dark:text-purple-400 font-bold">$1</span>')
        .replace(/([[\]()])/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>')
    }

    const formatPython = (code: string): string => {
      const lines = code.split('\n')
      let indentLevel = 0
      const indentSize = 4 // Pythonは4スペース
      
      return lines.map(line => {
        const trimmed = line.trim()
        if (trimmed === '') return ''
        
        // インデントを減らすキーワード
        if (trimmed.match(/^(except|finally|else|elif)/)) {
          indentLevel = Math.max(0, indentLevel - 1)
        }
        
        const indented = ' '.repeat(indentLevel * indentSize) + trimmed
        
        // インデントを増やすキーワード
        if (trimmed.match(/:\s*$/) && !trimmed.match(/^#/)) {
          indentLevel++
        }
        
        return indented
      }).join('\n')
    }

    const formatCStyleLanguage = (code: string): string => {
      return code
        .replace(/\b(int|float|double|char|void|if|else|for|while|switch|case|return|include|define|struct|class|public|private|protected)\b/g, '<span class="text-blue-600 dark:text-blue-400 font-semibold">$1</span>')
        .replace(/(\d+)/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>')
        .replace(/(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-600 dark:text-green-400">$1$2$3</span>')
        .replace(/([{[])/g, '<span class="text-purple-600 dark:text-purple-400 font-bold">$1</span>')
        .replace(/([}[\]()])/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>')
    }

    const formatHTML = (code: string): string => {
      const lines = code.split('\n')
      let indentLevel = 0
      const indentSize = 2
      
      return lines.map(line => {
        const trimmed = line.trim()
        if (trimmed === '') return ''
        
        // 閉じタグの処理
        if (trimmed.match(/^<\//)) {
          indentLevel = Math.max(0, indentLevel - 1)
        }
        
        const indented = ' '.repeat(indentLevel * indentSize) + trimmed
        
        // 開きタグの処理（自己終了タグでない場合）
        if (trimmed.match(/^<[^\/!][^>]*>$/) && !trimmed.match(/\/>$/)) {
          indentLevel++
        }
        
        return indented
      }).join('\n')
    }

    const formatCSS = (code: string): string => {
      const lines = code.split('\n')
      let indentLevel = 0
      const indentSize = 2
      
      return lines.map(line => {
        const trimmed = line.trim()
        if (trimmed === '') return ''
        
        if (trimmed === '}') {
          indentLevel = Math.max(0, indentLevel - 1)
        }
        
        const indented = ' '.repeat(indentLevel * indentSize) + trimmed
        
        if (trimmed.match(/\{$/) || trimmed.match(/@media/) || trimmed.match(/@keyframes/)) {
          indentLevel++
        }
        
        return indented
      }).join('\n')
    }

    const handleCodeSubmit = () => {
      if (codeContent && editorRef.current) {
        const formattedCode = formatCodeAdvanced(codeContent, codeLanguage)
        
        if (selectedRange) {
          // 既存の選択範囲がある場合
          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(selectedRange)
          }
        }
        
        const preElement = document.createElement('pre')
        const codeElement = document.createElement('code')
        codeElement.className = `language-${codeLanguage}`
        codeElement.textContent = formattedCode
        preElement.appendChild(codeElement)
        
        // スタイリングを適用
        preElement.style.backgroundColor = '#1a1a1a'
        preElement.style.color = '#22c55e'
        preElement.style.padding = '16px'
        preElement.style.borderRadius = '8px'
        preElement.style.overflow = 'auto'
        preElement.style.margin = '8px 0'
        preElement.style.border = '1px solid #374151'
        preElement.style.fontFamily = 'Monaco, Consolas, monospace'
        preElement.style.fontSize = '14px'
        preElement.style.lineHeight = '1.5'
        
        if (selectedRange) {
          selectedRange.deleteContents()
          selectedRange.insertNode(preElement)
          // カーソルを要素の後に移動
          const newRange = document.createRange()
          newRange.setStartAfter(preElement)
          newRange.collapse(true)
          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
        } else {
          // カーソル位置に挿入
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            range.insertNode(preElement)
            range.setStartAfter(preElement)
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
        
        // 変更を反映
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML
          setEditorContent(newContent)
          onContentChange?.(newContent)
          addToHistory(newContent)
        }
      }
      
      // モーダルを閉じる
      setShowCodeModal(false)
      setCodeContent('')
      setCodeLanguage('javascript')
      setSelectedRange(null)
      
      // フォーカスを戻す
      if (editorRef.current) {
        editorRef.current.focus()
      }
    }

    const handleCodeCancel = () => {
      // モーダルを閉じる
      setShowCodeModal(false)
      setCodeContent('')
      setCodeLanguage('javascript')
      setSelectedRange(null)
      
      // フォーカスを戻す
      if (editorRef.current) {
        editorRef.current.focus()
      }
    }

    const undo = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        const previousContent = history[newIndex]
        setHistoryIndex(newIndex)
        setEditorContent(previousContent)
        
        // エディターの内容を更新
        if (editorRef.current) {
          editorRef.current.innerHTML = previousContent
          onContentChange?.(previousContent)
        }
      }
    }

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        const nextContent = history[newIndex]
        setHistoryIndex(newIndex)
        setEditorContent(nextContent)
        
        // エディターの内容を更新
        if (editorRef.current) {
          editorRef.current.innerHTML = nextContent
          onContentChange?.(nextContent)
        }
      }
    }

    const addToHistory = (content: string) => {
      // 同じ内容は履歴に追加しない
      if (history[historyIndex] === content) return
      
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(content)
      
      // 履歴が長すぎる場合は古いものを削除
      if (newHistory.length > 50) {
        newHistory.shift()
      } else {
        setHistoryIndex(newHistory.length - 1)
      }
      
      setHistory(newHistory)
    }

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML
      setEditorContent(newContent)
      onContentChange?.(newContent)
      addToHistory(newContent)
    }

    // カーソル位置を保存・復元する関数
    const saveSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0)
      }
      return null
    }

    const restoreSelection = (range: Range | null) => {
      if (range) {
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }

    const updateEditorContent = (newContent: string) => {
      if (editorRef.current && newContent !== editorRef.current.innerHTML) {
        const savedRange = saveSelection()
        editorRef.current.innerHTML = newContent
        restoreSelection(savedRange)
      }
    }

    // プレースホルダーの表示制御
    const handleFocus = () => {
      if (editorRef.current && editorRef.current.innerHTML === '') {
        editorRef.current.innerHTML = ''
      }
    }

    const handleBlur = () => {
      if (editorRef.current && editorRef.current.innerHTML.trim() === '') {
        editorRef.current.innerHTML = ''
        setEditorContent('')
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Shift+Enterで引用から抜ける
      if (e.key === 'Enter' && e.shiftKey) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const container = range.commonAncestorContainer
          
          // 引用内かチェック
          let blockquote = null
          let node = container.nodeType === Node.TEXT_NODE ? container.parentNode : container
          
          while (node && node !== editorRef.current) {
            if (node.nodeName === 'BLOCKQUOTE') {
              blockquote = node
              break
            }
            node = node.parentNode
          }
          
          if (blockquote) {
            e.preventDefault()
            
            // 引用の後に新しいパラグラフを作成
            const p = document.createElement('p')
            p.innerHTML = '<br>'
            
            if (blockquote.nextSibling) {
              blockquote.parentNode?.insertBefore(p, blockquote.nextSibling)
            } else {
              blockquote.parentNode?.appendChild(p)
            }
            
            // カーソルを新しいパラグラフに移動
            const newRange = document.createRange()
            newRange.setStart(p, 0)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
            
            // 変更を反映
            handleContentChange({ currentTarget: editorRef.current } as React.FormEvent<HTMLDivElement>)
            return
          }
        }
      }
      
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

    const handleLinkSubmit = () => {
      if (linkUrl && editorRef.current) {
        if (selectedRange) {
          // 既存の選択範囲がある場合
          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(selectedRange)
          }
        }
        
        const linkElement = document.createElement('a')
        linkElement.href = linkUrl
        linkElement.textContent = linkText || linkUrl
        linkElement.style.color = '#3b82f6'
        linkElement.style.textDecoration = 'underline'
        linkElement.style.cursor = 'pointer'
        linkElement.setAttribute('target', '_blank')
        linkElement.setAttribute('rel', 'noopener noreferrer')
        
        if (selectedRange) {
          selectedRange.deleteContents()
          selectedRange.insertNode(linkElement)
        } else {
          // カーソル位置に挿入
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            range.insertNode(linkElement)
            range.setStartAfter(linkElement)
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
        
        // 変更を反映
        handleContentChange({ currentTarget: editorRef.current } as React.FormEvent<HTMLDivElement>)
      }
      
      setShowLinkModal(false)
      setLinkUrl('')
      setLinkText('')
      setSelectedRange(null)
    }

    const handleLinkCancel = () => {
      setShowLinkModal(false)
      setLinkUrl('')
      setLinkText('')
      setSelectedRange(null)
      
      // フォーカスを戻す
      if (editorRef.current) {
        editorRef.current.focus()
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
        <div ref={toolbarRef} className="p-3 border-b border-gray-200 dark:border-gray-700 relative z-30 bg-inherit">
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
                      "p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative z-10",
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
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 relative z-10"
                onClick={() => setIsPreview(!isPreview)}
                title="Toggle Preview"
              >
                {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              
              <button
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 relative z-10"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {onSave && (
                <button
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 relative z-10"
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
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10 pointer-events-none">
          <div className="flex -space-x-2 pointer-events-auto">
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
          <Users className="w-4 h-4 opacity-60 pointer-events-auto" />
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
            <span>Line {Math.floor(characterCount / 80) + 1}</span>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          editorVariants({ variant, size, className }),
          isFullscreen && "fixed inset-4 z-40 h-auto"
        )}
        {...props}
      >
        {showToolbar && renderToolbar()}
        
        {renderCollaborators()}

        {/* Editor content */}
        <div className="flex-1 relative overflow-hidden">
          {isPreview ? (
            <div
              className="p-6 prose prose-sm max-w-none dark:prose-invert overflow-auto h-full"
              dangerouslySetInnerHTML={{ 
                __html: editorContent
                  .replace(
                    /<blockquote>/g, 
                    '<div style="border: 2px solid #3b82f6; border-left: 6px solid #1d4ed8; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px 24px; margin: 20px 0; border-radius: 12px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); font-style: italic; color: #1e40af; position: relative; overflow: hidden;" class="quote-block"><div style="position: absolute; top: 12px; left: 12px; font-size: 24px; color: #3b82f6; font-family: serif;">"</div><div style="margin-left: 16px;">'
                  )
                  .replace(/<\/blockquote>/g, '</div><div style="position: absolute; bottom: 12px; right: 12px; font-size: 24px; color: #3b82f6; font-family: serif;">"</div></div>')
                  .replace(
                    /<pre>/g,
                    '<div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: #22c55e; padding: 20px; border-radius: 12px; margin: 20px 0; border: 2px solid #374151; box-shadow: 0 8px 16px rgba(0,0,0,0.3); font-family: Monaco, Consolas, monospace; font-size: 14px; line-height: 1.6; overflow-x: auto; position: relative;" class="code-block"><div style="position: absolute; top: 8px; right: 12px; font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">CODE</div><div style="margin-top: 8px;">'
                  )
                  .replace(/<\/pre>/g, '</div></div>')
                  .replace(
                    /<code>/g,
                    '<span style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); color: #dc2626; padding: 4px 8px; border-radius: 6px; font-family: Monaco, Consolas, monospace; font-size: 13px; border: 1px solid #d1d5db; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-weight: 600;">'
                  )
                  .replace(/<\/code>/g, '</span>')
                  .replace(
                    /<a\s+([^>]*)>/g,
                    '<a $1 style="color: #2563eb; text-decoration: underline; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">'
                  )
              }}
            />
          ) : (
            <div
              ref={editorRef}
              className={cn(
                "p-6 outline-none overflow-auto h-full relative z-0",
                "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none empty:before:absolute",
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              data-placeholder={placeholder}
              spellCheck={spellCheck}
              style={{
                minHeight: '200px'
              }}
            />
          )}

          {/* Add custom styles for quote and code elements */}
          <style dangerouslySetInnerHTML={{
            __html: `
              div[contenteditable] blockquote {
                border: 2px solid #3b82f6 !important;
                border-left: 6px solid #1d4ed8 !important;
                background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important;
                padding: 16px 20px !important;
                margin: 16px 0 !important;
                border-radius: 12px !important;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15) !important;
                font-style: italic !important;
                color: #1e40af !important;
                position: relative !important;
              }
              
              div[contenteditable] blockquote::before {
                content: '"' !important;
                position: absolute !important;
                top: 8px !important;
                left: 8px !important;
                font-size: 24px !important;
                color: #3b82f6 !important;
                font-family: serif !important;
              }
              
              div[contenteditable] blockquote::after {
                content: '"' !important;
                position: absolute !important;
                bottom: 8px !important;
                right: 8px !important;
                font-size: 24px !important;
                color: #3b82f6 !important;
                font-family: serif !important;
              }
              
              div[contenteditable] pre {
                background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important;
                color: #22c55e !important;
                padding: 20px !important;
                border-radius: 12px !important;
                margin: 16px 0 !important;
                border: 2px solid #374151 !important;
                box-shadow: 0 8px 16px rgba(0,0,0,0.3) !important;
                font-family: Monaco, Consolas, monospace !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
                overflow-x: auto !important;
                position: relative !important;
              }
              
              div[contenteditable] pre::before {
                content: 'CODE' !important;
                position: absolute !important;
                top: 8px !important;
                right: 12px !important;
                font-size: 10px !important;
                color: #6b7280 !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
              }
              
              div[contenteditable] code {
                background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important;
                color: #dc2626 !important;
                padding: 4px 8px !important;
                border-radius: 6px !important;
                font-family: Monaco, Consolas, monospace !important;
                font-size: 13px !important;
                border: 1px solid #d1d5db !important;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
                font-weight: 600 !important;
              }
              
              div[contenteditable] a {
                color: #2563eb !important;
                text-decoration: underline !important;
                font-weight: 500 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
              }
            `
          }} />

          {/* Line numbers */}
          {showLineNumbers && !isPreview && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2 text-xs opacity-60 z-5">
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
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-auto z-20 pointer-events-auto">
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
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl pointer-events-none z-[-1]" />
        )}

        {showLinkModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Insert Link</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLinkCancel}
                  leftIcon={<X className="w-4 h-4" />}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <Input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Text
                  </label>
                  <Input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Link text (optional)"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={handleLinkCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleLinkSubmit}
                  disabled={!linkUrl.trim()}
                >
                  Insert Link
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {showCodeModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Insert Code</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCodeCancel}
                  leftIcon={<X className="w-4 h-4" />}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6 h-96">
                {/* Left side - Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="sql">SQL</option>
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Code
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCodeContent(formatCodeAdvanced(codeContent, codeLanguage))}
                        disabled={!codeContent.trim()}
                      >
                        Format Code
                      </Button>
                    </div>
                    <textarea
                      value={codeContent}
                      onChange={(e) => setCodeContent(e.target.value)}
                      placeholder="Enter your code here..."
                      className="w-full h-64 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none"
                      style={{ fontFamily: 'Monaco, Consolas, "Liberation Mono", Courier, monospace' }}
                    />
                  </div>
                </div>
                
                {/* Right side - Preview */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preview
                  </label>
                  <div className="h-64 p-3 bg-gray-900 text-green-400 rounded-lg overflow-auto border border-gray-700">
                    <pre className="text-sm leading-relaxed" style={{ fontFamily: 'Monaco, Consolas, monospace' }}>
                      <code>{codeContent ? formatCodeAdvanced(codeContent, codeLanguage) : 'Code preview will appear here...'}</code>
                    </pre>
                  </div>
                  
                  {/* Format info */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p>• Auto-formatting will apply proper indentation</p>
                    <p>• Language-specific rules will be applied</p>
                    <p>• {codeLanguage === 'python' ? '4 spaces' : '2 spaces'} indentation for {codeLanguage}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={handleCodeCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleCodeSubmit}
                  disabled={!codeContent.trim()}
                >
                  Insert Code
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }
)

RichTextEditor.displayName = "RichTextEditor"

export { RichTextEditor } 