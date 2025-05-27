import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, Edit, Eye, Upload, Send, Trash2, Copy, 
  User, Clock, CheckCircle, Star, FileText
} from 'lucide-react'
import { Button } from './Button'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { Input } from './Input'
import { RichTextEditor } from './RichTextEditor'
import { useToast } from './Toast'
import { cn } from '../../lib/utils'

export const RichTextEditorDemo = () => {
  const [editorContent, setEditorContent] = useState('')
  const [submittedPosts, setSubmittedPosts] = useState<Array<{
    id: string
    content: string
    timestamp: Date
    author: string
    title: string
  }>>([])
  const [postTitle, setPostTitle] = useState('')
  const [authorName, setAuthorName] = useState('Demo User')
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'modern' | 'minimal' | 'neon' | 'glass' | 'premium'>('modern')
  const [editorSize, setEditorSize] = useState<'sm' | 'default' | 'lg' | 'xl'>('default')
  const [showPreview, setShowPreview] = useState(false)
  
  const { addToast } = useToast()

  const handleSubmit = () => {
    if (!editorContent.trim() || !postTitle.trim()) {
      addToast({
        title: 'Validation Error',
        description: 'Please enter both title and content.',
        type: 'warning'
      })
      return
    }

    const newPost = {
      id: Date.now().toString(),
      content: editorContent,
      timestamp: new Date(),
      author: authorName,
      title: postTitle
    }

    setSubmittedPosts(prev => [newPost, ...prev])
    setEditorContent('')
    setPostTitle('')
    
    addToast({
      title: 'Post Created!',
      description: 'Your rich text content has been successfully submitted.',
      type: 'success'
    })
  }

  const formatContent = (content: string) => {
    // Simple HTML formatting for demo purposes
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div className="space-y-8">
      {/* Editor Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Editor Configuration
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Customize the editor appearance and behavior
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Editor Variant</label>
              <div className="grid grid-cols-2 gap-2">
                {(['default', 'modern', 'minimal', 'neon', 'glass', 'premium'] as const).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={cn(
                      "px-3 py-2 text-sm rounded-lg border transition-colors capitalize",
                      selectedVariant === variant
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    )}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Editor Size</label>
              <div className="grid grid-cols-2 gap-2">
                {(['sm', 'default', 'lg', 'xl'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setEditorSize(size)}
                    className={cn(
                      "px-3 py-2 text-sm rounded-lg border transition-colors capitalize",
                      editorSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview Mode</label>
              <div className="flex items-center gap-2">
                <Button
                  variant={showPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Rich Text Editor
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create formatted content with our powerful editor
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Post Configuration */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Post Title</label>
                  <Input
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter your post title..."
                    variant="default"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Author Name</label>
                  <Input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name..."
                    variant="default"
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Content</label>
                <RichTextEditor
                  variant={selectedVariant}
                  size={editorSize}
                  content={editorContent}
                  onContentChange={setEditorContent}
                  placeholder="Start writing your content here... 

You can use:
- **Bold text** (Ctrl+B)
- *Italic text* (Ctrl+I)
- `Code snippets` 
- > Blockquotes for emphasis

Try the toolbar buttons above for more formatting options!"
                  showToolbar={true}
                  showStatusBar={true}
                  showWordCount={true}
                  autoSaveInterval={30000}
                  maxLength={10000}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditorContent('')
                      setPostTitle('')
                      addToast({
                        title: 'Editor Cleared',
                        description: 'All content has been cleared.',
                        type: 'info'
                      })
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const sampleContent = `# Welcome to the Rich Text Editor!

This is a **sample post** to demonstrate the *powerful features* of our editor.

## Features Include:

- **Bold** and *italic* text formatting
- \`Inline code\` snippets  
- Code blocks for longer snippets
- Links and embedded content
- Lists and structured content

> "The best way to predict the future is to create it." - Peter Drucker

Try editing this content and see the live preview!`
                      setEditorContent(sampleContent)
                      setPostTitle('Sample Rich Text Post')
                      addToast({
                        title: 'Sample Loaded',
                        description: 'Sample content has been loaded into the editor.',
                        type: 'info'
                      })
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Load Sample
                  </Button>
                </div>
                
                <Button
                  onClick={handleSubmit}
                  disabled={!editorContent.trim() || !postTitle.trim()}
                  variant="premium"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time preview of your content
                </p>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                  {postTitle && (
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {postTitle}
                    </h1>
                  )}
                  {editorContent ? (
                    <div 
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formatContent(editorContent) }}
                    />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Start typing to see the preview...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Submitted Posts */}
      {submittedPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Published Posts ({submittedPosts.length})
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Posts created using the rich text editor
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {submittedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(post.content)
                          addToast({
                            title: 'Content Copied',
                            description: 'Post content copied to clipboard.',
                            type: 'success'
                          })
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSubmittedPosts(prev => prev.filter(p => p.id !== post.id))
                          addToast({
                            title: 'Post Deleted',
                            description: 'Post has been removed.',
                            type: 'success'
                          })
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Editor Features Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Editor Features
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive rich text editing capabilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Text Formatting</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Bold, Italic, Underline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Strikethrough, Subscript, Superscript
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Text Color & Highlighting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Font Size & Family
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Structure & Layout</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Headers (H1-H6)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Ordered & Unordered Lists
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Blockquotes & Code Blocks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Text Alignment
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Features</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Link & Image Insertion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Table Creation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Undo/Redo History
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Auto-save & Word Count
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 