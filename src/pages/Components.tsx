import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ComponentNavigation, type ComponentItem } from '../components/ComponentNavigation';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { 
  Sparkles, 
  Download,
  Filter,
  Search,
  Eye,
  Code,
  BookOpen,
  Rocket,
  Crown,
  Target,
  Layers
} from 'lucide-react';

interface ComponentsPageState {
  view: 'navigation' | 'detail';
  selectedComponent: ComponentItem | null;
  allComponents: ComponentItem[];
  featuredComponents: ComponentItem[];
  recentlyViewed: ComponentItem[];
}

export default function Components() {
  const { t } = useTranslation();
  const [state, setState] = useState<ComponentsPageState>({
    view: 'navigation',
    selectedComponent: null,
    allComponents: [],
    featuredComponents: [],
    recentlyViewed: []
  });

  const { addToast } = useToast();
  const navigate = useNavigate();

  // Initialize component data
  useEffect(() => {
    // Enhanced component library with next-generation components
    const mockComponents: ComponentItem[] = [
      // Basic Components
      {
        id: 'button',
        name: t('component.button'),
        description: t('desc.button'),
        category: 'form',
        tags: ['interactive', 'action', 'primary', 'form'],
        complexity: 'basic',
        featured: true,
        codeSize: 207,
        dependencies: ['framer-motion', 'class-variance-authority']
      },
      {
        id: 'input',
        name: t('component.input'),
        description: t('desc.input'),
        category: 'form',
        tags: ['input', 'validation', 'accessibility', 'form'],
        complexity: 'basic',
        featured: true,
        codeSize: 189,
        dependencies: ['react-hook-form', 'zod']
      },
      {
        id: 'card',
        name: t('component.card'),
        description: t('desc.card'),
        category: 'layout',
        tags: ['container', 'content', 'flexible', 'responsive'],
        complexity: 'basic',
        featured: true,
        codeSize: 158,
        dependencies: ['class-variance-authority']
      },
      {
        id: 'modal',
        name: t('component.modal'),
        description: t('desc.modal'),
        category: 'feedback',
        tags: ['dialog', 'overlay', 'accessible', 'animation'],
        complexity: 'intermediate',
        featured: true,
        codeSize: 234,
        dependencies: ['framer-motion', 'focus-trap-react']
      },
      {
        id: 'tabs',
        name: t('component.tabs'),
        description: t('desc.tabs'),
        category: 'navigation',
        tags: ['navigation', 'keyboard', 'accessible', 'interactive'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 198,
        dependencies: ['framer-motion']
      },
      {
        id: 'accordion',
        name: t('component.accordion'),
        description: t('desc.accordion'),
        category: 'layout',
        tags: ['collapsible', 'content', 'animation', 'space-saving'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 176,
        dependencies: ['framer-motion']
      },
      {
        id: 'avatar',
        name: t('component.avatar'),
        description: t('desc.avatar'),
        category: 'data',
        tags: ['user', 'profile', 'image', 'fallback'],
        complexity: 'basic',
        featured: false,
        codeSize: 123,
        dependencies: []
      },
      {
        id: 'badge',
        name: t('component.badge'),
        description: t('desc.badge'),
        category: 'data',
        tags: ['status', 'notification', 'label', 'indicator'],
        complexity: 'basic',
        featured: false,
        codeSize: 89,
        dependencies: ['class-variance-authority']
      },
      {
        id: 'carousel',
        name: t('component.carousel'),
        description: t('desc.carousel'),
        category: 'layout',
        tags: ['slider', 'touch', 'responsive', 'infinite'],
        complexity: 'advanced',
        featured: true,
        codeSize: 345,
        dependencies: ['swiper', 'framer-motion']
      },
      {
        id: 'datatable',
        name: t('component.dataTable'),
        description: t('desc.dataTable'),
        category: 'data',
        tags: ['table', 'sorting', 'filtering', 'pagination'],
        complexity: 'advanced',
        featured: true,
        codeSize: 567,
        dependencies: ['react-table', '@tanstack/react-table']
      },
      {
        id: 'datavisualization',
        name: t('component.dataVisualization'),
        description: t('desc.dataVisualization'),
        category: 'data',
        tags: ['charts', 'graphs', 'analytics', 'animation'],
        complexity: 'expert',
        premium: true,
        featured: true,
        codeSize: 678,
        dependencies: ['recharts', 'd3', 'framer-motion']
      },
      {
        id: 'commandpalette',
        name: t('component.commandPalette'),
        description: t('desc.commandPalette'),
        category: 'navigation',
        tags: ['command', 'search', 'actions', 'keyboard'],
        complexity: 'expert',
        premium: true,
        new: true,
        codeSize: 527,
        dependencies: ['cmdk', 'fuse.js']
      },
      {
        id: 'datepicker',
        name: t('component.datePicker'),
        description: t('desc.datePicker'),
        category: 'form',
        tags: ['date', 'calendar', 'input', 'picker'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 298,
        dependencies: ['date-fns', 'react-day-picker']
      },
      {
        id: 'filemanager',
        name: t('component.fileManager'),
        description: t('desc.fileManager'),
        category: 'advanced',
        tags: ['files', 'upload', 'management', 'drag-drop'],
        complexity: 'expert',
        premium: true,
        featured: false,
        codeSize: 789,
        dependencies: ['react-dropzone', 'file-saver']
      },
      {
        id: 'kanbanboard',
        name: t('component.kanbanBoard'),
        description: t('desc.kanbanBoard'),
        category: 'advanced',
        tags: ['kanban', 'drag-drop', 'project', 'management'],
        complexity: 'expert',
        premium: true,
        featured: false,
        codeSize: 654,
        dependencies: ['react-beautiful-dnd', 'uuid']
      },
      {
        id: 'notification',
        name: t('component.notification'),
        description: t('desc.notification'),
        category: 'feedback',
        tags: ['toast', 'alert', 'notification', 'queue'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 234,
        dependencies: ['framer-motion']
      },
      {
        id: 'progress',
        name: t('component.progress'),
        description: t('desc.progress'),
        category: 'feedback',
        tags: ['progress', 'loading', 'indicator', 'animation'],
        complexity: 'basic',
        featured: false,
        codeSize: 145,
        dependencies: ['framer-motion']
      },
      {
        id: 'richtexteditor',
        name: t('component.richTextEditor'),
        description: t('desc.richTextEditor'),
        category: 'form',
        tags: ['editor', 'wysiwyg', 'text', 'formatting'],
        complexity: 'expert',
        premium: true,
        featured: false,
        codeSize: 892,
        dependencies: ['slate', 'slate-react']
      },
      {
        id: 'select',
        name: t('component.select'),
        description: t('desc.select'),
        category: 'form',
        tags: ['dropdown', 'select', 'search', 'multi-select'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 267,
        dependencies: ['downshift', 'fuse.js']
      },
      {
        id: 'slider',
        name: t('component.slider'),
        description: t('desc.slider'),
        category: 'form',
        tags: ['range', 'slider', 'input', 'control'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 189,
        dependencies: ['framer-motion']
      },
      {
        id: 'smartform',
        name: t('component.smartForm'),
        description: t('desc.smartForm'),
        category: 'form',
        tags: ['form', 'validation', 'dynamic', 'intelligent'],
        complexity: 'expert',
        premium: true,
        featured: false,
        codeSize: 723,
        dependencies: ['react-hook-form', 'zod', 'ai']
      },
      {
        id: 'timeline',
        name: t('component.timeline'),
        description: t('desc.timeline'),
        category: 'data',
        tags: ['timeline', 'events', 'chronological', 'visual'],
        complexity: 'intermediate',
        featured: false,
        codeSize: 298,
        dependencies: ['framer-motion']
      },
      {
        id: 'toast',
        name: t('component.toast'),
        description: t('desc.toast'),
        category: 'feedback',
        tags: ['toast', 'notification', 'alert', 'temporary'],
        complexity: 'basic',
        featured: false,
        codeSize: 167,
        dependencies: ['framer-motion']
      },

      // Next-Generation Components
      {
        id: 'neuralnetwork',
        name: t('component.neuralNetwork'),
        description: t('desc.neuralNetwork'),
        category: 'experimental',
        tags: ['ai', 'neural', 'machine-learning', 'visualization'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: true,
        codeSize: 1234,
        dependencies: ['tensorflow', 'd3', 'three', 'framer-motion']
      },
      {
        id: 'quantuminterface',
        name: t('component.quantumInterface'),
        description: t('desc.quantumInterface'),
        category: 'experimental',
        tags: ['quantum', 'computing', 'qubits', 'interface'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: true,
        codeSize: 1567,
        dependencies: ['qiskit-js', 'three', 'cannon', 'framer-motion']
      },
      {
        id: 'holographicdisplay',
        name: t('component.holographicDisplay'),
        description: t('desc.holographicDisplay'),
        category: 'experimental',
        tags: ['hologram', '3d', 'spatial', 'immersive'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: true,
        codeSize: 1789,
        dependencies: ['three', 'cannon', 'webxr', 'framer-motion']
      },
      {
        id: 'aiassistant',
        name: t('component.aiAssistant'),
        description: t('desc.aiAssistant'),
        category: 'experimental',
        tags: ['ai', 'assistant', 'nlp', 'chat'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: true,
        codeSize: 1456,
        dependencies: ['openai', 'langchain', 'speech-synthesis', 'framer-motion']
      },
      {
        id: 'voiceinterface',
        name: t('component.voiceInterface'),
        description: t('desc.voiceInterface'),
        category: 'experimental',
        tags: ['voice', 'speech', 'recognition', 'control'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 987,
        dependencies: ['speech-recognition', 'speech-synthesis', 'framer-motion']
      },
      {
        id: 'gesturecontrol',
        name: t('component.gestureControl'),
        description: t('desc.gestureControl'),
        category: 'experimental',
        tags: ['gesture', 'hand', 'tracking', 'control'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 1123,
        dependencies: ['mediapipe', 'tensorflow', 'framer-motion']
      },
      {
        id: 'biometricauth',
        name: t('component.biometricAuth'),
        description: t('desc.biometricAuth'),
        category: 'experimental',
        tags: ['biometric', 'authentication', 'security', 'fingerprint'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 876,
        dependencies: ['webauthn', 'face-api', 'framer-motion']
      },
      {
        id: 'blockchainwallet',
        name: t('component.blockchainWallet'),
        description: t('desc.blockchainWallet'),
        category: 'experimental',
        tags: ['blockchain', 'wallet', 'crypto', 'web3'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 1345,
        dependencies: ['ethers', 'web3', 'metamask', 'framer-motion']
      },
      {
        id: 'arviewer',
        name: t('component.arViewer'),
        description: t('desc.arViewer'),
        category: 'experimental',
        tags: ['ar', 'augmented-reality', 'viewer', 'tracking'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 1678,
        dependencies: ['ar.js', 'three', 'webxr', 'framer-motion']
      },
      {
        id: 'vrinterface',
        name: t('component.vrInterface'),
        description: t('desc.vrInterface'),
        category: 'experimental',
        tags: ['vr', 'virtual-reality', 'immersive', 'interface'],
        complexity: 'expert',
        premium: true,
        new: true,
        experimental: true,
        featured: false,
        codeSize: 1890,
        dependencies: ['aframe', 'three', 'webxr', 'framer-motion']
      }
    ];

    setState(prev => ({
      ...prev,
      allComponents: mockComponents,
      featuredComponents: mockComponents.filter(c => c.featured),
      recentlyViewed: mockComponents.slice(0, 3)
    }));
  }, [t]);

  const handleComponentSelect = (component: ComponentItem) => {
    if (!component) return;
    
    setState(prev => ({
      ...prev,
      recentlyViewed: [
        component,
        ...prev.recentlyViewed.filter(c => c && c.id !== component.id)
      ].slice(0, 5)
    }));

    addToast({
      type: 'info',
      title: `${component.name} を表示`,
      description: 'コンポーネントの詳細を確認しています...',
      duration: 2000
    });

    navigate(`/components/${component.id}`);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {t('page.components.title')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6"
          >
            {t('page.components.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            {t('page.components.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              leftIcon={<Rocket className="w-5 h-5" />}
              onClick={() => {
                const firstComponent = state.featuredComponents[0];
                if (firstComponent) handleComponentSelect(firstComponent);
              }}
            >
              {t('hero.exploreLibrary')}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Download className="w-5 h-5" />}
            >
              {t('action.download')}
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {state.allComponents.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t('nav.components')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t('feature.accessible')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              TS
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t('feature.typescript')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              MIT
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {t('footer.license')}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Components */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('page.components.featured')}
          </h2>
          <Button
            variant="ghost"
            rightIcon={<Eye className="w-4 h-4" />}
          >
            {t('action.view')} {t('action.all')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.featuredComponents.slice(0, 6).map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              onClick={() => handleComponentSelect(component)}
              className="cursor-pointer"
            >
              <Card variant={component.premium ? "premium" : "elevated"} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {component.new && (
                        <Badge variant="success" size="sm">
                          {t('status.new')}
                        </Badge>
                      )}
                      {component.premium && (
                        <Badge variant="premium" size="sm">
                          {t('status.premium')}
                        </Badge>
                      )}
                      {component.experimental && (
                        <Badge variant="warning" size="sm">
                          {t('status.experimental')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {component.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {t(`complexity.${component.complexity}`)}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {component.codeSize} lines
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      rightIcon={<Code className="w-4 h-4" />}
                    >
                      {t('action.view')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recently Viewed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recently Viewed */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-500" />
                {t('page.components.recent')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.recentlyViewed.slice(0, 3).map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ x: 4 }}
                    onClick={() => handleComponentSelect(component)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{component.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {component.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {t('page.components.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Search className="w-4 h-4" />}
                  onClick={() => {
                    // Focus search input when navigation loads
                    setTimeout(() => {
                      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                      searchInput?.focus();
                    }, 100);
                  }}
                >
                  {t('page.components.searchComponents')}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Filter className="w-4 h-4" />}
                >
                  {t('page.components.filterByCategory')}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  {t('page.components.downloadAll')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Component Categories */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-500" />
                {t('category.basic')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['basic', 'forms', 'data', 'navigation', 'feedback', 'layout', 'advanced', 'experimental'].map((category) => {
                  const count = state.allComponents.filter(c => c.category === category || (category === 'experimental' && c.experimental)).length;
                  return (
                    <div key={category} className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t(`category.${category}`)}
                      </span>
                      <Badge variant="outline" size="sm">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Main Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ComponentNavigation
          onComponentSelect={handleComponentSelect}
          selectedComponent={state.selectedComponent || undefined}
        />
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <Card variant="premium" className="p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('page.components.readyToBuild')}
            </h2>
            
            <p className="text-white/80 text-lg mb-8">
              {t('page.components.startUsing')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="glass"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
              >
                {t('page.components.downloadLibrary')}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                leftIcon={<BookOpen className="w-5 h-5" />}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('page.components.viewDocumentation')}
              </Button>
            </div>
          </div>
        </Card>
      </motion.section>
    </div>
  );
} 