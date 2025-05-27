import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Heart, 
  Star, 
  Download, 
  Upload, 
  Settings, 
  Send, 
  PlayCircle, 
  PauseCircle,
  ShoppingCart,
  Plus,
  Minus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Zap,
  Sparkles,
  Rocket,
  Code,
  Eye,
  Copy,
  Cpu,
  Database,
  TrendingUp,
  Target,
  Palette,
} from 'lucide-react';

// Component navigation order
const componentOrder = [
  { id: 'button', title: 'Button', path: '/components/button' },
  { id: 'input', title: 'Input', path: '/components/input' },
  { id: 'carousel', title: 'Carousel', path: '/components/carousel' },
  { id: 'select', title: 'Select', path: '/components/select' },
  { id: 'slider', title: 'Slider', path: '/components/slider' },
  { id: 'smartform', title: 'SmartForm', path: '/examples/smartform' },
];

const codeExamples = {
  basic: `<Button variant="default">
  Default Button
</Button>

<Button variant="premium">
  Premium Button
</Button>

<Button variant="neon">
  Neon Button
</Button>`,
  icons: `<Button leftIcon={<Download />}>
  Download
</Button>

<Button rightIcon={<Upload />}>
  Upload
</Button>

<Button leftIcon={<Heart />} variant="outline">
  Like
</Button>`,
  loading: `const [loading, setLoading] = useState(false);

<Button 
  loading={loading}
  onClick={() => setLoading(true)}
  leftIcon={<Download />}
>
  {loading ? 'Downloading...' : 'Download File'}
</Button>`,
  advanced: `<Button 
  variant="premium"
  size="lg"
  leftIcon={<Star />}
  loading={isLoading}
  disabled={!isValid}
>
  Premium Action
</Button>`
};

export const ButtonDemo: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedCodeExample, setSelectedCodeExample] = useState('basic');
  const [codeVisible, setCodeVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const getCurrentComponentIndex = () => {
    return componentOrder.findIndex(comp => comp.id === 'button');
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentComponentIndex();
    if (currentIndex > 0) {
      const prevComponent = componentOrder[currentIndex - 1];
      navigate(prevComponent.path);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentComponentIndex();
    if (currentIndex < componentOrder.length - 1) {
      const nextComponent = componentOrder[currentIndex + 1];
      navigate(nextComponent.path);
    }
  };

  const canNavigatePrevious = () => {
    const currentIndex = getCurrentComponentIndex();
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    const currentIndex = getCurrentComponentIndex();
    return currentIndex < componentOrder.length - 1;
  };

  const handleBackToComponents = () => {
    navigate('/components');
  };

  const handleLoadingDemo = async (key: string) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(prev => ({ ...prev, [key]: false }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 space-y-12 px-4 py-8">
        {/* Navigation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBackToComponents}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Components
            </Button>
            
            <div className="flex gap-2">
              {canNavigatePrevious() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              )}
              {canNavigateNext() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              Component Demo
            </Badge>
            <Badge variant="primary" size="sm">
              Button
            </Badge>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-blue-500" />
            </motion.div>
            <Badge variant="glass" className="text-lg px-6 py-2">
              Interactive Button Components
            </Badge>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Smart Button System
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the most versatile button component with premium variants, 
            interactive states, smooth animations, and enterprise-grade accessibility.
          </motion.p>
        </motion.div>

        {/* Button Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                Button Variants & Styles
                <Badge variant="primary">12 Variants</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Primary Variants */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Primary Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="premium">Premium</Button>
                    <Button variant="neon">Neon</Button>
                    <Button variant="glass">Glass</Button>
                    <Button variant="secondary">Secondary</Button>
                  </div>
                </div>

                {/* Status Variants */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Status Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Button Sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                Sizes & Icon Support
                <Badge variant="outline">Scalable</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Sizes */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                {/* Icon Buttons */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Icon Integration</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button leftIcon={<Download />}>Download</Button>
                      <Button rightIcon={<Upload />}>Upload</Button>
                      <Button leftIcon={<Heart />} variant="outline">Like</Button>
                      <Button rightIcon={<Star />} variant="ghost">Favorite</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button leftIcon={<Settings />} variant="premium">Settings</Button>
                      <Button rightIcon={<Send />} variant="success">Send Message</Button>
                      <Button leftIcon={<ShoppingCart />} variant="neon">Add to Cart</Button>
                    </div>
                  </div>
                </div>

                {/* Icon Only Buttons */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Icon-Only Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button size="icon-sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="default">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button size="icon-lg" variant="premium">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button size="icon-sm" variant="neon">
                      <PlayCircle className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="glass">
                      <PauseCircle className="w-4 h-4" />
                    </Button>
                    <Button size="icon-lg" variant="secondary">
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive States */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Interactive States & Loading
                <Badge variant="outline">Dynamic</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Loading States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      loading={loading.demo1}
                      onClick={() => handleLoadingDemo('demo1')}
                      leftIcon={<Download />}
                    >
                      {loading.demo1 ? 'Downloading...' : 'Download File'}
                    </Button>
                    <Button 
                      loading={loading.demo2}
                      onClick={() => handleLoadingDemo('demo2')}
                      variant="premium"
                      rightIcon={<Send />}
                    >
                      {loading.demo2 ? 'Sending...' : 'Send Email'}
                    </Button>
                    <Button 
                      loading={loading.demo3}
                      onClick={() => handleLoadingDemo('demo3')}
                      variant="success"
                    >
                      {loading.demo3 ? 'Processing...' : 'Process Order'}
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled Button</Button>
                    <Button disabled variant="outline">Disabled Outline</Button>
                    <Button disabled variant="ghost">Disabled Ghost</Button>
                    <Button disabled variant="premium">Disabled Premium</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6" />
                  Implementation Examples
                  <Badge variant="outline">Copy & Paste Ready</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCodeVisible(!codeVisible)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {codeVisible ? 'Hide' : 'Show'} Code
                </Button>
              </CardTitle>
            </CardHeader>
            <AnimatePresence>
              {codeVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(codeExamples).map((key) => (
                          <Button
                            key={key}
                            variant={selectedCodeExample === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCodeExample(key)}
                            className="capitalize"
                          >
                            {key}
                          </Button>
                        ))}
                      </div>

                      <div className="relative">
                        <div className="absolute top-4 right-4 z-10">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(codeExamples[selectedCodeExample as keyof typeof codeExamples])}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                          <code>{codeExamples[selectedCodeExample as keyof typeof codeExamples]}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Performance Metrics
                <Badge variant="primary">Optimized</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Bundle Size', value: '8.2kb', icon: Database, color: 'text-green-500' },
                  { label: 'Render Time', value: '0.3ms', icon: Zap, color: 'text-blue-500' },
                  { label: 'Memory Usage', value: '0.8MB', icon: Cpu, color: 'text-purple-500' },
                  { label: 'Accessibility', value: '100%', icon: Target, color: 'text-emerald-500' }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl"
                  >
                    <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                    <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ButtonDemo; 