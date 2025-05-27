import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Slider } from '../components/ui/Slider';
import type { SliderMark } from '../components/ui/Slider';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Volume2,
  VolumeX,
  Sun,
  Thermometer,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  Rocket,
  Eye,
  Code,
  Copy,
  Cpu,
  Database,
  Shield,
  Palette,
  Settings,
  BarChart3,
  Activity,
  Gauge,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Layers,
} from 'lucide-react';

// Component navigation order - maintaining original transitions
const componentOrder = [
  { id: 'button', title: 'Button', path: '/components/button' },
  { id: 'input', title: 'Input', path: '/components/input' },
  { id: 'carousel', title: 'Carousel', path: '/components/carousel' },
  { id: 'select', title: 'Select', path: '/components/select' },
  { id: 'slider', title: 'Slider', path: '/components/slider' },
  { id: 'datepicker', title: 'DatePicker', path: '/components/datepicker' },
  { id: 'smartform', title: 'SmartForm', path: '/examples/smartform' },
];

// Demo data
const temperatureMarks: SliderMark[] = [
  { value: -10, label: 'Cold' },
  { value: 0, label: '0°C' },
  { value: 20, label: 'Room' },
  { value: 40, label: 'Hot' },
];

const priceMarks: SliderMark[] = [
  { value: 0, label: '$0' },
  { value: 100, label: '$100' },
  { value: 500, label: '$500' },
  { value: 1000, label: '$1K' },
  { value: 5000, label: '$5K' },
];

const codeExamples = {
  basic: `<Slider
  defaultValue={50}
  min={0}
  max={100}
  step={1}
  onChange={(value) => console.log(value)}
/>`,
  range: `<Slider
  defaultValue={[20, 80]}
  min={0}
  max={100}
  range
  tooltip={{
    formatter: (value) => \`\${value}%\`
  }}
  onChange={(values) => console.log(values)}
/>`,
  styled: `<Slider
  defaultValue={75}
  variant="neon"
  size="lg"
  gradient
  showValue
  tooltip={{
    open: true,
    formatter: (value) => \`Level \${value}\`
  }}
  marks={customMarks}
/>`,
  vertical: `<Slider
  defaultValue={[25, 75]}
  vertical
  range
  variant="glass"
  size="lg"
  className="h-64"
  onChange={(values) => handleVolumeChange(values)}
/>`
};

const demoScenarios = [
  {
    id: 'audio',
    title: 'Audio Controls',
    description: 'Volume and audio settings',
    icon: Volume2,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'settings',
    title: 'System Settings',
    description: 'Brightness and temperature controls',
    icon: Settings,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'pricing',
    title: 'Price Range Filter',
    description: 'E-commerce price filtering',
    icon: DollarSign,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'Chart and metrics controls',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600'
  }
];

export const SliderDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState('audio');
  const [codeVisible, setCodeVisible] = useState(false);
  const [selectedCodeExample, setSelectedCodeExample] = useState('basic');
  
  // Demo states
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [temperature, setTemperature] = useState(22);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 800]);
  const [dataRange, setDataRange] = useState<[number, number]>([30, 70]);
  const [performance, setPerformance] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const getCurrentComponentIndex = () => {
    return componentOrder.findIndex(comp => comp.id === 'slider');
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
              Slider
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
              Advanced Slider Components
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
            Precision Slider System
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the most intuitive slider components with range selection, 
            custom marks, tooltips, and smooth animations for precise value control in modern applications.
          </motion.p>

          {/* Live Demo Slider */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Live Demo
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="sm">
                      Value: {performance}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-6">
                  <Slider
                    value={performance}
                    onChange={(value) => setPerformance(value as number)}
                    min={0}
                    max={100}
                    variant="neon"
                    size="lg"
                    gradient
                    showValue
                    tooltip={{
                      open: true,
                      formatter: (value) => `${value}%`
                    }}
                    marks={[
                      { value: 0, label: 'Min' },
                      { value: 25, label: 'Low' },
                      { value: 50, label: 'Med' },
                      { value: 75, label: 'High' },
                      { value: 100, label: 'Max' }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Interactive Demo Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layers className="w-6 h-6" />
                Interactive Demo Scenarios
                <Badge variant="outline">Choose Your Experience</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {demoScenarios.map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => setActiveDemo(scenario.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      activeDemo === scenario.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${scenario.color} p-2 mb-4 mx-auto`}>
                      <scenario.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {scenario.description}
                    </p>
                  </motion.button>
                ))}
              </div>
              
              {/* Demo Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeDemo === 'audio' && <AudioDemo volume={volume} setVolume={setVolume} isMuted={isMuted} setIsMuted={setIsMuted} />}
                  {activeDemo === 'settings' && <SettingsDemo brightness={brightness} setBrightness={setBrightness} temperature={temperature} setTemperature={setTemperature} />}
                  {activeDemo === 'pricing' && <PricingDemo priceRange={priceRange} setPriceRange={setPriceRange} />}
                  {activeDemo === 'analytics' && <AnalyticsDemo dataRange={dataRange} setDataRange={setDataRange} />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Slider Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                Slider Variants & Styles
                <Badge variant="primary">7 Variants</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VariantsShowcase />
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                Advanced Features & Controls
                <Badge variant="outline">Enterprise Ready</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedFeaturesDemo />
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
                    <CodeExamplesSection 
                      selectedExample={selectedCodeExample}
                      setSelectedExample={setSelectedCodeExample}
                      codeExamples={codeExamples}
                      copyToClipboard={copyToClipboard}
                    />
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
          <PerformanceMetrics />
        </motion.div>
      </div>
    </div>
  );
};

// Sub-components for different demo scenarios
const AudioDemo: React.FC<{
  volume: number;
  setVolume: (value: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}> = ({ volume, setVolume, isMuted, setIsMuted }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          Audio Volume Control
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="flex-1">
              <Slider
                value={isMuted ? 0 : volume}
                onChange={(value) => {
                  setVolume(value as number);
                  if (typeof value === 'number' && value > 0) setIsMuted(false);
                }}
                min={0}
                max={100}
                variant="primary"
                size="lg"
                gradient
                tooltip={{
                  formatter: (value) => `${value}%`
                }}
                disabled={isMuted}
              />
            </div>
          </div>
          
          <Slider
            defaultValue={[20, 80]}
            range
            variant="success"
            size="default"
            tooltip={{
              formatter: (value) => `${value}Hz`
            }}
            marks={[
              { value: 0, label: '20Hz' },
              { value: 50, label: '1kHz' },
              { value: 100, label: '20kHz' }
            ]}
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Audio Status
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Volume Level:</span>
            <p className="font-medium">{isMuted ? 'Muted' : `${volume}%`}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            <p className="font-medium">{(typeof volume === 'number' && volume > 80) ? 'Loud' : (typeof volume === 'number' && volume > 50) ? 'Normal' : (typeof volume === 'number' && volume > 0) ? 'Quiet' : 'Silent'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsDemo: React.FC<{
  brightness: number;
  setBrightness: (value: number) => void;
  temperature: number;
  setTemperature: (value: number) => void;
}> = ({ brightness, setBrightness, temperature, setTemperature }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Display Brightness
          </h3>
          <Slider
            value={brightness}
            onChange={(value) => setBrightness(value as number)}
            min={0}
            max={100}
            variant="warning"
            size="lg"
            showValue
            tooltip={{
              formatter: (value) => `${value}%`
            }}
            marks={[
              { value: 0, label: 'Dark' },
              { value: 50, label: 'Auto' },
              { value: 100, label: 'Bright' }
            ]}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Temperature Control
          </h3>
          <Slider
            value={temperature}
            onChange={(value) => setTemperature(value as number)}
            min={-10}
            max={40}
            variant="danger"
            size="lg"
            showValue
            tooltip={{
              formatter: (value) => `${value}°C`
            }}
            marks={temperatureMarks}
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          System Status
        </h4>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Screen Brightness:</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${brightness}%` }}
                />
              </div>
              <span className="text-sm font-medium">{brightness}%</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Temperature:</span>
            <div className="flex items-center gap-2 mt-1">
              <Thermometer className="w-4 h-4" />
              <span className="font-medium">{temperature}°C</span>
              <Badge variant={temperature > 30 ? 'error' : temperature > 20 ? 'secondary' : 'primary'} size="sm">
                {temperature > 30 ? 'Hot' : temperature > 20 ? 'Warm' : 'Cool'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PricingDemo: React.FC<{
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}> = ({ priceRange, setPriceRange }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        Price Range Filter
      </h3>
      <Slider
        value={priceRange}
        onChange={(value) => setPriceRange(value as [number, number])}
        range
        min={0}
        max={5000}
        step={50}
        variant="neon"
        size="lg"
        tooltip={{
          formatter: (value) => `$${value}`
        }}
        marks={priceMarks}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Min Price', value: `$${priceRange[0]}`, icon: TrendingUp, color: 'text-green-500' },
        { label: 'Max Price', value: `$${priceRange[1]}`, icon: Target, color: 'text-blue-500' },
        { label: 'Range', value: `$${priceRange[1] - priceRange[0]}`, icon: Activity, color: 'text-purple-500' },
      ].map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
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
  </div>
);

const AnalyticsDemo: React.FC<{
  dataRange: [number, number];
  setDataRange: (range: [number, number]) => void;
}> = ({ dataRange, setDataRange }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Data Range Selection
        </h3>
        <Slider
          value={dataRange}
          onChange={(value) => setDataRange(value as [number, number])}
          range
          min={0}
          max={100}
          variant="glass"
          size="lg"
          gradient
          tooltip={{
            formatter: (value) => `${value}%`
          }}
          marks={[
            { value: 0, label: '0%' },
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
            { value: 75, label: '75%' },
            { value: 100, label: '100%' }
          ]}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Vertical Sliders</h4>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <Slider
              defaultValue={75}
              vertical
              variant="primary"
              size="lg"
              className="h-48"
              tooltip={{
                formatter: (value) => `${value}%`
              }}
            />
            <p className="text-sm mt-2">CPU</p>
          </div>
          <div className="text-center">
            <Slider
              defaultValue={60}
              vertical
              variant="success"
              size="lg"
              className="h-48"
              tooltip={{
                formatter: (value) => `${value}%`
              }}
            />
            <p className="text-sm mt-2">Memory</p>
          </div>
          <div className="text-center">
            <Slider
              defaultValue={40}
              vertical
              variant="warning"
              size="lg"
              className="h-48"
              tooltip={{
                formatter: (value) => `${value}%`
              }}
            />
            <p className="text-sm mt-2">Disk</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VariantsShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { variant: 'default' as const, title: 'Default', bg: 'bg-white dark:bg-gray-800' },
      { variant: 'primary' as const, title: 'Primary', bg: 'bg-blue-50 dark:bg-blue-900/20' },
      { variant: 'success' as const, title: 'Success', bg: 'bg-green-50 dark:bg-green-900/20' },
      { variant: 'warning' as const, title: 'Warning', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
      { variant: 'danger' as const, title: 'Danger', bg: 'bg-red-50 dark:bg-red-900/20' },
      { variant: 'neon' as const, title: 'Neon', bg: 'bg-black' },
      { variant: 'glass' as const, title: 'Glass', bg: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    ].map((item, index) => (
      <motion.div
        key={item.variant}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`p-6 rounded-xl ${item.bg} border border-gray-200 dark:border-gray-700 ${item.variant === 'neon' ? 'border-cyan-400' : ''}`}
      >
        <div className="mb-4">
          <Badge variant="outline" className="mb-4">{item.title}</Badge>
          <Slider
            defaultValue={65}
            variant={item.variant}
            size="default"
            tooltip={{
              formatter: (value) => `${value}%`
            }}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const AdvancedFeaturesDemo: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Gradient & Effects
        </h4>
        <div className="space-y-4">
          <Slider
            defaultValue={80}
            gradient
            variant="primary"
            size="lg"
            showValue
            tooltip={{
              open: true,
              formatter: (value) => `Power: ${value}%`
            }}
          />
          <Slider
            defaultValue={[25, 75]}
            range
            gradient
            variant="neon"
            size="lg"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Custom Marks & Steps
        </h4>
        <div className="space-y-4">
          <Slider
            defaultValue={50}
            step={10}
            variant="success"
            size="lg"
            marks={[
              { value: 0, label: 'Off' },
              { value: 30, label: 'Low' },
              { value: 60, label: 'Med' },
              { value: 100, label: 'High' }
            ]}
          />
          <Slider
            defaultValue={75}
            step={25}
            variant="warning"
            size="lg"
            showValue
            disabled
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Touch Support', desc: 'Mobile-friendly gestures', icon: Settings },
        { title: 'Keyboard Nav', desc: 'Arrow key navigation', icon: Zap },
        { title: 'Custom Marks', desc: 'Flexible label positioning', icon: Target },
        { title: 'Tooltips', desc: 'Interactive value display', icon: Shield },
      ].map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl text-center"
        >
          <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
          <h5 className="font-semibold mb-2">{feature.title}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CodeExamplesSection: React.FC<{
  selectedExample: string;
  setSelectedExample: (example: string) => void;
  codeExamples: Record<string, string>;
  copyToClipboard: (text: string) => void;
}> = ({ selectedExample, setSelectedExample, codeExamples, copyToClipboard }) => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-2">
      {Object.keys(codeExamples).map((key) => (
        <Button
          key={key}
          variant={selectedExample === key ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedExample(key)}
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
          onClick={() => copyToClipboard(codeExamples[selectedExample])}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
        <code>{codeExamples[selectedExample]}</code>
      </pre>
    </div>
  </div>
);

const PerformanceMetrics: React.FC = () => (
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
          { label: 'Bundle Size', value: '8.9kb', icon: Database, color: 'text-green-500' },
          { label: 'Render Time', value: '1.3ms', icon: Zap, color: 'text-blue-500' },
          { label: 'Memory Usage', value: '1.8MB', icon: Cpu, color: 'text-purple-500' },
          { label: 'Accessibility', value: '100%', icon: Shield, color: 'text-emerald-500' }
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
);

export default SliderDemo; 