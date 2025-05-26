import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Save, Tag, 
  FileText, Paperclip, 
  Upload, Image, File, Check, Trash2,
  Flag, Activity, TrendingUp
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Input } from './Input'
import { Select } from './Select'
import { Badge } from './Badge'
import { Avatar } from './Avatar'
import { Progress } from './Progress'
import { DatePicker } from './DatePicker'
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './Modal'
import type { KanbanCard } from './KanbanBoard'

export interface TaskEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: KanbanCard | null
  onSave: (task: KanbanCard) => void
  onDelete?: (taskId: string) => void
  assignees?: Array<{
    id: string
    name: string
    avatar?: string
    email?: string
    role?: string
  }>
  tags?: string[]
  variant?: 'default' | 'glass' | 'neon' | 'premium'
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  open,
  onOpenChange,
  task,
  onSave,
  onDelete,
  assignees = [],
  tags = [],
  variant = 'premium'
}) => {
  const [formData, setFormData] = useState<Partial<KanbanCard>>({})
  const [attachments, setAttachments] = useState<File[]>([])
  const [customTags, setCustomTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [activeTab, setActiveTab] = useState('details')
  const fileInputRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        tags: task.tags || []
      })
      setCustomTags(task.tags || [])
    }
  }, [task])

  const handleSave = () => {
    if (!task || !formData.title) return
    
    const updatedTask: KanbanCard = {
      ...task,
      ...formData,
      tags: customTags,
      title: formData.title,
      description: formData.description || '',
      priority: formData.priority || 'medium',
      progress: formData.progress || 0,
      dueDate: formData.dueDate,
      assignee: formData.assignee,
      attachments: attachments.length,
      metadata: {
        ...task.metadata,
        lastEdited: new Date().toISOString(),
        attachmentFiles: attachments.map(f => ({ name: f.name, size: f.size }))
      }
    }
    
    onSave(updatedTask)
    onOpenChange(false)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5) // Limit to 5 files
      setAttachments(prev => [...prev, ...newFiles].slice(0, 5))
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag && !customTags.includes(newTag)) {
      setCustomTags(prev => [...prev, newTag])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setCustomTags(prev => prev.filter(t => t !== tag))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="w-4 h-4" />
    }
    return <File className="w-4 h-4" />
  }

  const tabs = [
    { id: 'details', label: 'Details', icon: <FileText className="w-4 h-4" /> },
    { id: 'attachments', label: 'Attachments', icon: <Paperclip className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> }
  ]

  if (!task) return null

  return (
    <Modal 
      open={open} 
      onOpenChange={onOpenChange}
      size="xl"
      variant={variant}
      className="max-h-[90vh]"
    >
      <div className="flex flex-col max-h-[80vh]">
        {/* Header */}
        <ModalHeader className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <ModalTitle className="text-2xl font-bold mb-2">
                Edit Task
              </ModalTitle>
              <ModalDescription>
                Modify task details, add attachments, and track progress
              </ModalDescription>
            </div>
            <div className="flex items-center gap-2">
              {task.priority && (
                <Badge 
                  variant={
                    task.priority === 'urgent' ? 'destructive' :
                    task.priority === 'high' ? 'warning' :
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }
                  className="capitalize"
                >
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </Badge>
              )}
            </div>
          </div>
        </ModalHeader>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all",
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Task Title *
                  </label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title..."
                    className="w-full"
                    variant="premium"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the task..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Priority
                    </label>
                    <Select
                      value={formData.priority || 'medium'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as 'low' | 'medium' | 'high' | 'urgent' }))}
                      options={[
                        { value: 'low', label: 'Low Priority' },
                        { value: 'medium', label: 'Medium Priority' },
                        { value: 'high', label: 'High Priority' },
                        { value: 'urgent', label: 'Urgent' }
                      ]}
                      variant="default"
                    />
                  </div>

                  {/* Due Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date
                    </label>
                    <DatePicker
                      selected={formData.dueDate ? new Date(formData.dueDate) : null}
                      onSelect={(date: Date | null) => setFormData(prev => ({ ...prev, dueDate: date || undefined }))}
                      variant="default"
                      placeholder="Select due date"
                    />
                  </div>
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Assignee
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {assignees.map((person) => (
                      <motion.button
                        key={person.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          assignee: prev.assignee?.name === person.name ? undefined : {
                            name: person.name,
                            avatar: person.avatar
                          }
                        }))}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg border transition-all",
                          formData.assignee?.name === person.name
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        )}
                      >
                        <Avatar 
                          fallback={person.name.charAt(0)} 
                          size="sm"
                          src={person.avatar}
                        />
                        <div className="text-left">
                          <div className="font-medium text-sm">{person.name}</div>
                          {person.role && (
                            <div className="text-xs text-gray-500">{person.role}</div>
                          )}
                        </div>
                        {formData.assignee?.name === person.name && (
                          <Check className="w-4 h-4 text-blue-500" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress: {formData.progress || 0}%
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress || 0}
                      onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                    />
                    <Progress
                      value={formData.progress || 0}
                      variant="default"
                      animated
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add new tag..."
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1"
                      />
                      <Button onClick={addTag} size="sm" variant="outline">
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Existing Tags */}
                    <div className="flex flex-wrap gap-2">
                      {customTags.map((tag, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Badge 
                            variant="premium" 
                            className="flex items-center gap-1 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <X className="w-3 h-3" />
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Predefined Tags */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">Suggested tags:</div>
                      <div className="flex flex-wrap gap-2">
                        {tags.filter(tag => !customTags.includes(tag)).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setCustomTags(prev => [...prev, tag])}
                            className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'attachments' && (
              <motion.div
                key="attachments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    Drop files here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports images, documents, and more (max 5 files)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    accept="*/*"
                  />
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Attached Files ({attachments.length})
                    </h4>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          {getFileIcon(file.name)}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{file.name}</div>
                            <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center py-8">
                  <Activity className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Activity Timeline
                  </h3>
                  <p className="text-gray-500">
                    Task activity and history will appear here
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <ModalFooter className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {onDelete && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (task.id) {
                      onDelete(task.id)
                      onOpenChange(false)
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Task
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.title}
                variant="premium"
                className="min-w-[100px]"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </ModalFooter>
      </div>
    </Modal>
  )
}

export default TaskEditModal 