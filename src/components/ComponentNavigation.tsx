import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Zap, 
  Layers, 
  Database, 
  Navigation as NavIcon,
  BarChart3,
  FileText,
  Settings,
  Users,
  Calendar,
  MessageSquare,
  Camera,
  Monitor,
  Target,
  Wand2,
  Brain,
  Volume2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

// Export types at the top
export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  new?: boolean;
  premium?: boolean;
  featured?: boolean;
  experimental?: boolean;
  icon?: React.ReactNode;
  previewImage?: string;
  dependencies: string[];
  codeSize?: number;
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  components: ComponentItem[];
  featured?: boolean;
  new?: boolean;
  premium?: boolean;
}

// Function to get translated component categories
export const componentCategories = (t: (key: string) => string): ComponentCategory[] => [
  {
    id: 'form',
    name: t('category.formControls'),
    description: t('category.formControlsDesc'),
    icon: <FileText className="w-6 h-6" />,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
    components: [
      {
        id: 'button',
        name: t('component.button'),
        description: t('desc.button'),
        category: 'form',
        tags: ['interactive', 'action', 'primary'],
        complexity: 'basic',
        featured: true,
        icon: <Target className="w-4 h-4" />,
        dependencies: ['framer-motion', 'class-variance-authority']
      },
      {
        id: 'input',
        name: t('component.input'),
        description: t('desc.input'),
        category: 'form',
        tags: ['text', 'validation', 'form'],
        complexity: 'intermediate',
        icon: <FileText className="w-4 h-4" />,
        dependencies: ['react-hook-form', 'zod']
      },
      {
        id: 'select',
        name: t('component.select'),
        description: t('desc.select'),
        category: 'form',
        tags: ['dropdown', 'selection', 'options'],
        complexity: 'intermediate',
        icon: <List className="w-4 h-4" />,
        dependencies: ['@radix-ui/react-select']
      },
      {
        id: 'slider',
        name: t('component.slider'),
        description: t('desc.slider'),
        category: 'form',
        tags: ['range', 'value', 'control'],
        complexity: 'intermediate',
        icon: <Settings className="w-4 h-4" />,
        dependencies: ['framer-motion']
      },
      {
        id: 'datepicker',
        name: t('component.datePicker'),
        description: t('desc.datePicker'),
        category: 'form',
        tags: ['date', 'time', 'calendar'],
        complexity: 'advanced',
        icon: <Calendar className="w-4 h-4" />,
        dependencies: ['date-fns', 'react-datepicker']
      },
      {
        id: 'aiassistant',
        name: t('component.aiAssistant'),
        description: t('desc.aiAssistant'),
        category: 'form',
        tags: ['ai', 'chat', 'voice', 'intelligent'],
        complexity: 'expert',
        premium: true,
        new: true,
        icon: <Brain className="w-4 h-4" />,
        dependencies: ['framer-motion', 'speech-recognition']
      }
    ]
  },
  {
    id: 'layout',
    name: t('category.layoutComponents'),
    description: t('category.layoutComponentsDesc'),
    icon: <Grid3X3 className="w-6 h-6" />,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    components: [
      {
        id: 'card',
        name: t('component.card'),
        description: t('desc.card'),
        category: 'layout',
        tags: ['container', 'content', 'flexible'],
        complexity: 'basic',
        featured: true,
        icon: <Layers className="w-4 h-4" />,
        dependencies: ['class-variance-authority']
      },
      {
        id: 'tabs',
        name: t('component.tabs'),
        description: t('desc.tabs'),
        category: 'layout',
        tags: ['navigation', 'organization', 'content'],
        complexity: 'intermediate',
        icon: <NavIcon className="w-4 h-4" />,
        dependencies: ['@radix-ui/react-tabs']
      },
      {
        id: 'accordion',
        name: t('component.accordion'),
        description: t('desc.accordion'),
        category: 'layout',
        tags: ['collapsible', 'expandable', 'content'],
        complexity: 'intermediate',
        icon: <List className="w-4 h-4" />,
        dependencies: ['@radix-ui/react-accordion']
      },
      {
        id: 'modal',
        name: t('component.modal'),
        description: t('desc.modal'),
        category: 'layout',
        tags: ['overlay', 'dialog', 'popup'],
        complexity: 'intermediate',
        icon: <Monitor className="w-4 h-4" />,
        dependencies: ['@radix-ui/react-dialog']
      }
    ]
  },
  {
    id: 'data',
    name: t('category.dataDisplay'),
    description: t('category.dataDisplayDesc'),
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    new: true,
    components: [
      {
        id: 'datatable',
        name: t('component.dataTable'),
        description: t('desc.dataTable'),
        category: 'data',
        tags: ['table', 'data', 'sorting', 'filtering'],
        complexity: 'advanced',
        featured: true,
        icon: <Database className="w-4 h-4" />,
        dependencies: ['@tanstack/react-table']
      },
      {
        id: 'datavisualization',
        name: t('component.dataVisualization'),
        description: t('desc.dataVisualization'),
        category: 'data',
        tags: ['charts', 'graphs', 'visualization'],
        complexity: 'advanced',
        icon: <BarChart3 className="w-4 h-4" />,
        dependencies: ['recharts', 'd3']
      },
      {
        id: 'advanceddataviz',
        name: t('component.advancedDataViz'),
        description: t('desc.advancedDataViz'),
        category: 'data',
        tags: ['advanced', 'interactive', 'real-time'],
        complexity: 'expert',
        premium: true,
        icon: <BarChart3 className="w-4 h-4" />,
        dependencies: ['d3', 'three.js']
      },
      {
        id: 'avatar',
        name: t('component.avatar'),
        description: t('desc.avatar'),
        category: 'data',
        tags: ['user', 'profile', 'image'],
        complexity: 'basic',
        icon: <Users className="w-4 h-4" />,
        dependencies: []
      },
      {
        id: 'badge',
        name: 'Badge',
        description: 'Status indicators and labels',
        category: 'data',
        tags: ['status', 'label', 'indicator'],
        complexity: 'basic',
        icon: <Target className="w-4 h-4" />,
        dependencies: []
      },
      {
        id: 'modelviewer3d',
        name: '3D Model Viewer',
        description: 'Interactive 3D model visualization with AR/VR support',
        category: 'data',
        tags: ['3d', 'model', 'ar', 'vr', 'interactive'],
        complexity: 'expert',
        premium: true,
        new: true,
        icon: <Layers className="w-4 h-4" />,
        dependencies: ['three.js', 'react-three-fiber']
      },
      {
        id: 'audioplayer',
        name: 'Audio Player',
        description: 'Advanced audio player with waveform visualization',
        category: 'data',
        tags: ['audio', 'music', 'waveform', 'player'],
        complexity: 'advanced',
        new: true,
        icon: <Volume2 className="w-4 h-4" />,
        dependencies: ['wavesurfer.js', 'framer-motion']
      },
      {
        id: 'videoplayer',
        name: 'Video Player',
        description: 'Professional video player with advanced controls',
        category: 'data',
        tags: ['video', 'player', 'streaming', 'controls'],
        complexity: 'advanced',
        new: true,
        icon: <Monitor className="w-4 h-4" />,
        dependencies: ['video.js', 'hls.js']
      }
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'User feedback and notification components',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    components: [
      {
        id: 'toast',
        name: 'Toast',
        description: 'Temporary notification messages',
        category: 'feedback',
        tags: ['notification', 'message', 'temporary'],
        complexity: 'intermediate',
        icon: <MessageSquare className="w-4 h-4" />,
        dependencies: ['framer-motion']
      },
      {
        id: 'notification',
        name: 'Notification',
        description: 'Persistent notification system',
        category: 'feedback',
        tags: ['alert', 'persistent', 'system'],
        complexity: 'intermediate',
        icon: <MessageSquare className="w-4 h-4" />,
        dependencies: ['zustand']
      },
      {
        id: 'progress',
        name: 'Progress',
        description: 'Progress indicators and loading states',
        category: 'feedback',
        tags: ['loading', 'progress', 'indicator'],
        complexity: 'intermediate',
        icon: <Zap className="w-4 h-4" />,
        dependencies: ['framer-motion']
      },
      {
        id: 'tooltip',
        name: 'Tooltip',
        description: 'Contextual information overlays',
        category: 'feedback',
        tags: ['overlay', 'contextual', 'information'],
        complexity: 'intermediate',
        new: true,
        icon: <MessageSquare className="w-4 h-4" />,
        dependencies: ['framer-motion', 'react-dom']
      }
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation and interaction components',
    icon: <NavIcon className="w-6 h-6" />,
    color: 'teal',
    gradient: 'from-teal-500 to-green-500',
    new: true,
    components: [
      {
        id: 'dropdown',
        name: 'Dropdown',
        description: 'Advanced dropdown menus with positioning',
        category: 'navigation',
        tags: ['menu', 'dropdown', 'positioning'],
        complexity: 'advanced',
        featured: true,
        new: true,
        icon: <NavIcon className="w-4 h-4" />,
        dependencies: ['framer-motion', 'react-dom']
      },
      {
        id: 'popover',
        name: 'Popover',
        description: 'Floating content containers with rich interactions',
        category: 'navigation',
        tags: ['popover', 'floating', 'overlay'],
        complexity: 'advanced',
        featured: true,
        new: true,
        icon: <MessageSquare className="w-4 h-4" />,
        dependencies: ['framer-motion', 'react-dom']
      }
    ]
  },
  {
    id: 'input',
    name: 'Input Controls',
    description: 'Advanced input and control components',
    icon: <Settings className="w-6 h-6" />,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    components: [
      {
        id: 'switch',
        name: 'Switch',
        description: 'Toggle switches with multiple variants',
        category: 'input',
        tags: ['toggle', 'switch', 'boolean'],
        complexity: 'intermediate',
        new: true,
        icon: <Settings className="w-4 h-4" />,
        dependencies: ['framer-motion']
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Complex and specialized components',
    icon: <Wand2 className="w-6 h-6" />,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    premium: true,
    components: [
      {
        id: 'carousel',
        name: 'Carousel',
        description: 'Image and content carousel with touch support',
        category: 'advanced',
        tags: ['carousel', 'slider', 'touch', 'images'],
        complexity: 'advanced',
        icon: <Camera className="w-4 h-4" />,
        dependencies: ['embla-carousel-react']
      },
      {
        id: 'commandpalette',
        name: 'Command Palette',
        description: 'Quick action command interface',
        category: 'advanced',
        tags: ['command', 'search', 'actions', 'keyboard'],
        complexity: 'advanced',
        featured: true,
        icon: <Search className="w-4 h-4" />,
        dependencies: ['cmdk', 'fuse.js']
      },
      {
        id: 'filemanager',
        name: 'File Manager',
        description: 'Complete file management interface',
        category: 'advanced',
        tags: ['files', 'upload', 'management', 'drag-drop'],
        complexity: 'expert',
        premium: true,
        icon: <FileText className="w-4 h-4" />,
        dependencies: ['react-dropzone', 'file-saver']
      },
      {
        id: 'kanbanboard',
        name: 'Kanban Board',
        description: 'Drag-and-drop project management board',
        category: 'advanced',
        tags: ['kanban', 'drag-drop', 'project', 'management'],
        complexity: 'expert',
        premium: true,
        icon: <Grid3X3 className="w-4 h-4" />,
        dependencies: ['@dnd-kit/core', '@dnd-kit/sortable']
      },
      {
        id: 'richtexteditor',
        name: 'Rich Text Editor',
        description: 'WYSIWYG text editor with formatting',
        category: 'advanced',
        tags: ['editor', 'wysiwyg', 'text', 'formatting'],
        complexity: 'expert',
        premium: true,
        icon: <FileText className="w-4 h-4" />,
        dependencies: ['@tiptap/react', '@tiptap/starter-kit']
      },
      {
        id: 'smartform',
        name: 'Smart Form',
        description: 'Intelligent form with dynamic validation',
        category: 'advanced',
        tags: ['form', 'validation', 'dynamic', 'smart'],
        complexity: 'expert',
        premium: true,
        icon: <Wand2 className="w-4 h-4" />,
        dependencies: ['react-hook-form', 'zod', 'ai-validation']
      },
      {
        id: 'timeline',
        name: 'Timeline',
        description: 'Visual timeline for events and milestones',
        category: 'advanced',
        tags: ['timeline', 'events', 'chronological', 'visual'],
        complexity: 'advanced',
        icon: <Calendar className="w-4 h-4" />,
        dependencies: ['framer-motion']
      }
    ]
  }
];

interface ComponentNavigationProps {
  onComponentSelect: (component: ComponentItem) => void;
  selectedComponent?: ComponentItem;
}

export const ComponentNavigation: React.FC<ComponentNavigationProps> = ({
  onComponentSelect,
  selectedComponent
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [complexityFilter, setComplexityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'complexity'>('name');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter and search logic
  const filteredComponents = React.useMemo(() => {
    let allComponents: ComponentItem[] = [];
    
    if (selectedCategory === 'all') {
      allComponents = componentCategories(t).flatMap(cat => cat.components);
    } else {
      const category = componentCategories(t).find(cat => cat.id === selectedCategory);
      allComponents = category?.components || [];
    }

    // Apply search filter
    if (searchQuery) {
      allComponents = allComponents.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply complexity filter
    if (complexityFilter !== 'all') {
      allComponents = allComponents.filter(component => component.complexity === complexityFilter);
    }

    // Sort components
    allComponents.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'complexity': {
          const complexityOrder = { basic: 0, intermediate: 1, advanced: 2, expert: 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        }
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return allComponents;
  }, [searchQuery, selectedCategory, complexityFilter, sortBy, t]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t('nav.components')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t('componentLibrary.description', `Discover our collection of ${componentCategories(t).reduce((acc, cat) => acc + cat.components.length, 0)} premium UI components`)}
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              ref={searchInputRef}
              placeholder={t('action.search') + "... (⌘K)"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              {t('action.filter')}
            </Button>
            
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              onClick={() => setViewMode('grid')}
              size="sm"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              onClick={() => setViewMode('list')}
              size="sm"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{t('ui.complexity')}:</label>
                <select
                  value={complexityFilter}
                  onChange={(e) => setComplexityFilter(e.target.value)}
                  className="px-3 py-1 rounded border bg-white dark:bg-gray-700"
                >
                  <option value="all">{t('ui.all')}</option>
                  <option value="basic">{t('ui.basic')}</option>
                  <option value="intermediate">{t('ui.intermediate')}</option>
                  <option value="advanced">{t('ui.advanced')}</option>
                  <option value="expert">{t('ui.expert')}</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{t('action.sort')}:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'complexity')}
                  className="px-3 py-1 rounded border bg-white dark:bg-gray-700"
                >
                  <option value="name">{t('ui.name')}</option>
                  <option value="complexity">{t('ui.complexity')}</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {t('ui.all')} {t('nav.components')}
          </motion.button>
          
          {componentCategories(t).map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category.icon}
              {category.name}
              {category.new && <Badge variant="success" size="sm">New</Badge>}
              {category.premium && <Badge variant="premium" size="sm">Pro</Badge>}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Components Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => onComponentSelect(component)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedComponent?.id === component.id
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 ring-2 ring-blue-500'
                    : 'bg-white dark:bg-gray-800 hover:shadow-xl'
                } shadow-lg border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {component.icon && (
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                        {component.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{component.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(component.complexity)}`}>
                          {component.complexity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    {component.new && <Badge variant="success" size="sm">{t('ui.new')}</Badge>}
                    {component.premium && <Badge variant="premium" size="sm">{t('ui.pro')}</Badge>}
                    {component.featured && <Badge variant="warning" size="sm">{t('ui.featured')}</Badge>}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {component.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {component.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {component.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                      +{component.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{component.dependencies.length} {t('ui.dependencies')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onComponentSelect(component)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedComponent?.id === component.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 ring-2 ring-blue-500'
                    : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                } shadow border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {component.icon && (
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                        {component.icon}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl">{component.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(component.complexity)}`}>
                          {component.complexity}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{component.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {component.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <div>{component.dependencies.length} {t('ui.dependencies')}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {component.new && <Badge variant="success" size="sm">{t('ui.new')}</Badge>}
                      {component.premium && <Badge variant="premium" size="sm">{t('ui.pro')}</Badge>}
                      {component.featured && <Badge variant="warning" size="sm">{t('ui.featured')}</Badge>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {filteredComponents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {t('status.notFound')}
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}; 