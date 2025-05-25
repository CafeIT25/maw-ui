import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComponentNavigation, type ComponentItem } from '../components/ComponentNavigation';
import { ComponentDetailView } from '../components/ComponentDetailView';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { 
  Sparkles, 
  Zap, 
  Star, 
  Download,
  Heart,
  Bookmark,
  Filter,
  Search,
  Eye,
  Code,
  BookOpen,
  Rocket,
  Crown,
  Target
} from 'lucide-react';

interface ComponentsPageState {
  view: 'navigation' | 'detail';
  selectedComponent: ComponentItem | null;
  allComponents: ComponentItem[];
  featuredComponents: ComponentItem[];
  recentlyViewed: ComponentItem[];
  favorites: ComponentItem[];
  bookmarks: ComponentItem[];
}

export default function Components() {
  const [state, setState] = useState<ComponentsPageState>({
    view: 'navigation',
    selectedComponent: null,
    allComponents: [],
    featuredComponents: [],
    recentlyViewed: [],
    favorites: [],
    bookmarks: []
  });

  const { addToast } = useToast();

  // Initialize component data
  useEffect(() => {
    // This would typically come from an API or context
    const mockComponents: ComponentItem[] = [
      {
        id: 'button',
        name: 'Button',
        description: 'Versatile button component with 11 variants and advanced features',
        category: 'form',
        tags: ['interactive', 'action', 'primary', 'form'],
        complexity: 'basic',
        popularity: 95,
        featured: true,
        codeSize: 207,
        dependencies: ['framer-motion', 'class-variance-authority']
      },
      {
        id: 'card',
        name: 'Card',
        description: 'Flexible container with 8 style variants and responsive design',
        category: 'layout',
        tags: ['container', 'content', 'flexible', 'responsive'],
        complexity: 'basic',
        popularity: 92,
        featured: true,
        codeSize: 158,
        dependencies: ['class-variance-authority']
      },
      {
        id: 'datatable',
        name: 'Data Table',
        description: 'Advanced table with sorting, filtering, and pagination',
        category: 'data',
        tags: ['table', 'sorting', 'filtering', 'pagination'],
        complexity: 'advanced',
        popularity: 89,
        featured: true,
        codeSize: 567,
        dependencies: ['react-table', '@tanstack/react-table']
      },
      {
        id: 'datavisualization',
        name: 'Data Visualization',
        description: 'Charts and graphs for data presentation with animations',
        category: 'data',
        tags: ['charts', 'graphs', 'analytics', 'animation'],
        complexity: 'expert',
        popularity: 91,
        premium: true,
        featured: true,
        codeSize: 678,
        dependencies: ['recharts', 'd3', 'framer-motion']
      },
      {
        id: 'commandpalette',
        name: 'Command Palette',
        description: 'Quick action command interface with fuzzy search',
        category: 'navigation',
        tags: ['command', 'search', 'actions', 'keyboard'],
        complexity: 'expert',
        popularity: 86,
        premium: true,
        new: true,
        codeSize: 527,
        dependencies: ['cmdk', 'fuse.js']
      }
    ];

    setState(prev => ({
      ...prev,
      allComponents: mockComponents,
      featuredComponents: mockComponents.filter(c => c.featured),
      recentlyViewed: mockComponents.slice(0, 3),
      favorites: mockComponents.filter(c => c.popularity > 90),
      bookmarks: mockComponents.slice(1, 4)
    }));
  }, []);

  const handleComponentSelect = (component: ComponentItem) => {
    setState(prev => ({
      ...prev,
      view: 'detail',
      selectedComponent: component,
      recentlyViewed: [
        component,
        ...prev.recentlyViewed.filter(c => c.id !== component.id)
      ].slice(0, 5)
    }));

    addToast({
      type: 'info',
      title: `${component.name}を表示中`,
      description: 'コンポーネントの詳細情報を確認できます',
      duration: 2000
    });
  };

  const handleBackToNavigation = () => {
    setState(prev => ({
      ...prev,
      view: 'navigation',
      selectedComponent: null
    }));
  };

  const handleNextComponent = () => {
    if (!state.selectedComponent) return;
    
    const currentIndex = state.allComponents.findIndex(c => c.id === state.selectedComponent!.id);
    const nextIndex = (currentIndex + 1) % state.allComponents.length;
    const nextComponent = state.allComponents[nextIndex];
    
    handleComponentSelect(nextComponent);
  };

  const handlePreviousComponent = () => {
    if (!state.selectedComponent) return;
    
    const currentIndex = state.allComponents.findIndex(c => c.id === state.selectedComponent!.id);
    const prevIndex = currentIndex === 0 ? state.allComponents.length - 1 : currentIndex - 1;
    const prevComponent = state.allComponents[prevIndex];
    
    handleComponentSelect(prevComponent);
  };

  const toggleFavorite = (component: ComponentItem) => {
    setState(prev => {
      const isFavorited = prev.favorites.some(c => c.id === component.id);
      return {
        ...prev,
        favorites: isFavorited
          ? prev.favorites.filter(c => c.id !== component.id)
          : [...prev.favorites, component]
      };
    });

    addToast({
      type: 'success',
      title: state.favorites.some(c => c.id === component.id) ? 'お気に入りから削除' : 'お気に入りに追加',
      description: `${component.name}を${state.favorites.some(c => c.id === component.id) ? '削除' : '追加'}しました`,
      duration: 2000
    });
  };

  const toggleBookmark = (component: ComponentItem) => {
    setState(prev => {
      const isBookmarked = prev.bookmarks.some(c => c.id === component.id);
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter(c => c.id !== component.id)
          : [...prev.bookmarks, component]
      };
    });

    addToast({
      type: 'success',
      title: state.bookmarks.some(c => c.id === component.id) ? 'ブックマークから削除' : 'ブックマークに追加',
      description: `${component.name}を${state.bookmarks.some(c => c.id === component.id) ? '削除' : '追加'}しました`,
      duration: 2000
    });
  };

  if (state.view === 'detail' && state.selectedComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <ComponentDetailView
          component={state.selectedComponent}
          onBack={handleBackToNavigation}
          onNext={handleNextComponent}
          onPrevious={handlePreviousComponent}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Next-Generation UI Components
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Component
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Library</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our collection of premium, highly customizable UI components designed for modern web applications. 
              Built with performance, accessibility, and developer experience in mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                variant="premium"
                size="lg"
                leftIcon={<Rocket className="w-5 h-5" />}
                onClick={() => {
                  const firstComponent = state.featuredComponents[0];
                  if (firstComponent) handleComponentSelect(firstComponent);
                }}
              >
                Explore Components
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Library
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {state.allComponents.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {state.featuredComponents.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  11
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Variants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">TypeScript</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Access Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Featured Components */}
          <Card variant="gradient" className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5" />
                Featured Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.featuredComponents.slice(0, 3).map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleComponentSelect(component)}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    <div className="p-2 bg-white/20 rounded">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{component.name}</div>
                      <div className="text-sm text-white/70">{component.complexity}</div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="warning" size="sm">
                        {component.popularity}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Viewed */}
          <Card variant="glass" className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Recently Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.recentlyViewed.length > 0 ? (
                  state.recentlyViewed.slice(0, 3).map((component) => (
                    <motion.div
                      key={component.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleComponentSelect(component)}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded">
                        <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{component.category}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No components viewed yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="neon" className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Actions
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
                  Search Components
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Filter className="w-4 h-4" />}
                >
                  Filter by Category
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites and Bookmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Favorites */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Favorites ({state.favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {state.favorites.slice(0, 4).map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ y: -2 }}
                    onClick={() => handleComponentSelect(component)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{component.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(component);
                        }}
                      >
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {component.description.slice(0, 60)}...
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {component.complexity}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{component.popularity}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bookmarks */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-500" />
                Bookmarks ({state.bookmarks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {state.bookmarks.slice(0, 4).map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ y: -2 }}
                    onClick={() => handleComponentSelect(component)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{component.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(component);
                        }}
                      >
                        <Bookmark className="w-4 h-4 text-blue-500 fill-current" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {component.description.slice(0, 60)}...
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {component.category}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {component.codeSize} lines
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Main Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
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
        transition={{ delay: 0.8 }}
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
              Ready to Build Something Amazing?
            </h2>
            
            <p className="text-white/80 text-lg mb-8">
              Start using our component library today and create beautiful, 
              performant applications with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="glass"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Library
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                leftIcon={<BookOpen className="w-5 h-5" />}
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </motion.section>
    </div>
  );
} 