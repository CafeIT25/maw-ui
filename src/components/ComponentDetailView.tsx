import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Download, 
  Code, 
  Eye, 
  Settings, 
  BookOpen, 
  Zap,
  Star,
  Heart,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
  Package,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Tabs } from './ui/Tabs';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import type { ComponentItem } from './ComponentNavigation';

interface ComponentDetailViewProps {
  component: ComponentItem;
  onBack: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'tsx' | 'jsx' | 'css' | 'json';
  category: 'basic' | 'advanced' | 'custom' | 'integration';
}

interface ComponentProperty {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  examples?: string[];
}

interface UsageExample {
  title: string;
  description: string;
  scenario: string;
  code: string;
  preview?: React.ReactNode;
}

const getComponentExamples = (componentId: string): CodeExample[] => {
  const examples: Record<string, CodeExample[]> = {
    button: [
      {
        title: 'Basic Usage',
        description: 'Simple button with different variants',
        language: 'tsx',
        category: 'basic',
        code: `import { Button } from '@/components/ui/Button';

export function BasicButtons() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="premium">Premium</Button>
      <Button variant="neon">Neon</Button>
      <Button variant="glass">Glass</Button>
    </div>
  );
}`
      },
      {
        title: 'With Icons and Loading',
        description: 'Buttons with icons and loading states',
        language: 'tsx',
        category: 'advanced',
        code: `import { Button } from '@/components/ui/Button';
import { Download, Heart, Star } from 'lucide-react';

export function IconButtons() {
  const [loading, setLoading] = useState(false);
  
  const handleDownload = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="flex gap-4">
      <Button 
        leftIcon={<Download />}
        onClick={handleDownload}
        loading={loading}
      >
        Download
      </Button>
      <Button variant="outline" rightIcon={<Heart />}>
        Like
      </Button>
      <Button variant="ghost" leftIcon={<Star />}>
        Favorite
      </Button>
    </div>
  );
}`
      }
    ],
    card: [
      {
        title: 'Basic Card Layout',
        description: 'Standard card with header and content',
        language: 'tsx',
        category: 'basic',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function BasicCard() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can place any content.</p>
      </CardContent>
    </Card>
  );
}`
      }
    ]
  };

  return examples[componentId] || [];
};

const getComponentProperties = (componentId: string): ComponentProperty[] => {
  const properties: Record<string, ComponentProperty[]> = {
    button: [
      {
        name: 'variant',
        type: '"default" | "premium" | "neon" | "glass" | "destructive" | "success" | "warning" | "outline" | "ghost" | "link" | "gradient"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the button',
        examples: ['default', 'premium', 'neon']
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg"',
        required: false,
        default: '"md"',
        description: 'The size of the button',
        examples: ['sm', 'md', 'lg']
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Shows loading spinner when true'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Disables the button when true'
      }
    ],
    card: [
      {
        name: 'variant',
        type: '"default" | "elevated" | "outline" | "ghost" | "gradient" | "glass" | "neon" | "premium"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the card',
        examples: ['default', 'elevated', 'gradient']
      },
      {
        name: 'interactive',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Adds hover effects when true'
      }
    ]
  };

  return properties[componentId] || [];
};

const getUsageExamples = (componentId: string): UsageExample[] => {
  const examples: Record<string, UsageExample[]> = {
    button: [
      {
        title: 'Form Submission',
        description: 'Using buttons in forms with loading states',
        scenario: 'User submits a form and needs visual feedback',
        code: `const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitForm(formData);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
    <Button 
      type="submit" 
      loading={isSubmitting}
      variant="premium"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
  </form>
);`
      }
    ]
  };

  return examples[componentId] || [];
};

export const ComponentDetailView: React.FC<ComponentDetailViewProps> = ({
  component,
  onBack,
  onNext,
  onPrevious
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToast } = useToast();

  const codeExamples = getComponentExamples(component.id);
  const properties = getComponentProperties(component.id);
  const usageExamples = getUsageExamples(component.id);

  const copyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopied(title);
    addToast({
      type: 'success',
      title: t('action.copied'),
      description: `${title}のコードがクリップボードにコピーされました`,
      duration: 2000
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getViewportIcon = () => {
    switch (viewportSize) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
    }
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      case 'desktop': return 'w-full';
    }
  };

  // Demo component renderer
  const renderDemo = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading</Button>
              <Button leftIcon={<Heart className="w-4 h-4" />}>Like</Button>
              <Button rightIcon={<Star className="w-4 h-4" />}>Favorite</Button>
              <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                Download
              </Button>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" className="p-6">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standard card design</p>
            </Card>
            <Card variant="elevated" className="p-6">
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced shadow effect</p>
            </Card>
            <Card variant="gradient" className="p-6">
              <h3 className="font-semibold mb-2">Gradient Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Beautiful gradient background</p>
            </Card>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Demo Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Interactive demo for this component is being prepared
            </p>
          </div>
        );
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Back to Components
            </Button>
            
            <div className="flex gap-2">
              {onPrevious && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              )}
              {onNext && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {component.icon && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                {React.cloneElement(component.icon as React.ReactElement, { className: 'w-8 h-8' })}
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{component.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(component.complexity)}`}>
                  {component.complexity}
                </span>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {component.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{component.dependencies.length} dependencies</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {component.new && <Badge variant="success">New</Badge>}
            {component.premium && <Badge variant="premium">Pro</Badge>}
            {component.featured && <Badge variant="warning">Featured</Badge>}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="grid w-full grid-cols-4">
          <Tabs.Trigger value="overview" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger value="examples" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {t('code.examples')}
          </Tabs.Trigger>
          <Tabs.Trigger value="props" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t('code.props')}
          </Tabs.Trigger>
          <Tabs.Trigger value="usage" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {t('code.usage')}
          </Tabs.Trigger>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Content value="overview">
          <div className="space-y-8">
            {/* Interactive Demo */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Interactive Demo
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <Button
                        variant={viewportSize === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('desktop')}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewportSize === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('tablet')}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewportSize === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('mobile')}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`transition-all duration-300 ${getViewportClass()}`}>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
                    {renderDemo()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card variant="gradient">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">Performance</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-2">
                    Optimized for speed and efficiency
                  </p>
                  <div className="text-2xl font-bold text-white">
                    Optimized
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold">Dependencies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Minimal external dependencies
                  </p>
                  <div className="text-2xl font-bold">
                    {component.dependencies.length} packages
                  </div>
                </CardContent>
              </Card>

              <Card variant="neon">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold">Code Quality</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Lightweight and tree-shakeable
                  </p>
                  <div className="text-2xl font-bold">
                    High Quality
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dependencies */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {component.dependencies.map((dep) => (
                    <div
                      key={dep}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded">
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">{dep}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Required
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        {/* Examples Tab */}
        <Tabs.Content value="examples">
          <div className="space-y-6">
            {codeExamples.map((example, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={
                            example.category === 'basic' ? 'success' :
                            example.category === 'advanced' ? 'warning' :
                            example.category === 'custom' ? 'premium' : 'default'
                          }
                          size="sm"
                        >
                          {example.category}
                        </Badge>
                      </div>
                      <CardTitle>{example.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(example.code, example.title)}
                      leftIcon={copied === example.title ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    >
                      {copied === example.title ? t('action.copied') : t('action.copy')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs.Content>

        {/* Properties Tab */}
        <Tabs.Content value="props">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Component Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold">Property</th>
                      <th className="text-left py-3 px-4 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Required</th>
                      <th className="text-left py-3 px-4 font-semibold">Default</th>
                      <th className="text-left py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((prop, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                            {prop.name}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-blue-600 dark:text-blue-400 text-sm">
                            {prop.type}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          {prop.required ? (
                            <Badge variant="error" size="sm">Required</Badge>
                          ) : (
                            <Badge variant="outline" size="sm">Optional</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {prop.default ? (
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                              {prop.default}
                            </code>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {prop.description}
                          {prop.examples && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {prop.examples.map((example, i) => (
                                <code key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-xs">
                                  {example}
                                </code>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        {/* Usage Tab */}
        <Tabs.Content value="usage">
          <div className="space-y-6">
            {usageExamples.map((example, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    {example.description}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" size="sm">
                      {example.scenario}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}; 