import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Select } from '../components/ui/Select';
import type { SelectOption } from '../components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Search,
  X,
  Globe,
  MapPin,
  Building,
  Clock,
  Star,
  Settings,
  Filter,
  Tag,
  Flag,
  Palette,
  Code,
  Eye,
  Copy,
  Cpu,
  Database,
  TrendingUp,
  Sparkles,
  Rocket,
  Zap,
  Target,
  Layers,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
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

// Demo data
const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', icon: <Flag className="w-4 h-4" />, description: 'North America' },
  { value: 'jp', label: 'Japan', icon: <Flag className="w-4 h-4" />, description: 'Asia' },
  { value: 'gb', label: 'United Kingdom', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
  { value: 'de', label: 'Germany', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
  { value: 'fr', label: 'France', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
  { value: 'ca', label: 'Canada', icon: <Flag className="w-4 h-4" />, description: 'North America' },
  { value: 'au', label: 'Australia', icon: <Flag className="w-4 h-4" />, description: 'Oceania' },
  { value: 'kr', label: 'South Korea', icon: <Flag className="w-4 h-4" />, description: 'Asia' },
];

const skillOptions: SelectOption[] = [
  { value: 'react', label: 'React', icon: <Code className="w-4 h-4" />, description: 'JavaScript Library' },
  { value: 'typescript', label: 'TypeScript', icon: <Code className="w-4 h-4" />, description: 'Programming Language' },
  { value: 'nodejs', label: 'Node.js', icon: <Code className="w-4 h-4" />, description: 'Runtime Environment' },
  { value: 'python', label: 'Python', icon: <Code className="w-4 h-4" />, description: 'Programming Language' },
  { value: 'docker', label: 'Docker', icon: <Code className="w-4 h-4" />, description: 'Containerization' },
  { value: 'aws', label: 'AWS', icon: <Code className="w-4 h-4" />, description: 'Cloud Platform' },
  { value: 'kubernetes', label: 'Kubernetes', icon: <Code className="w-4 h-4" />, description: 'Container Orchestration' },
  { value: 'graphql', label: 'GraphQL', icon: <Code className="w-4 h-4" />, description: 'Query Language' },
];

const priorityOptions: SelectOption[] = [
  { value: 'low', label: 'Low Priority', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  { value: 'medium', label: 'Medium Priority', icon: <AlertCircle className="w-4 h-4 text-yellow-500" /> },
  { value: 'high', label: 'High Priority', icon: <AlertCircle className="w-4 h-4 text-red-500" /> },
  { value: 'urgent', label: 'Urgent', icon: <Zap className="w-4 h-4 text-purple-500" /> },
];

const categoryOptions: SelectOption[] = [
  { value: 'frontend', label: 'Frontend Development', icon: <Globe className="w-4 h-4" /> },
  { value: 'backend', label: 'Backend Development', icon: <Database className="w-4 h-4" /> },
  { value: 'fullstack', label: 'Full Stack Development', icon: <Layers className="w-4 h-4" /> },
  { value: 'mobile', label: 'Mobile Development', icon: <Cpu className="w-4 h-4" /> },
  { value: 'devops', label: 'DevOps & Infrastructure', icon: <Settings className="w-4 h-4" /> },
  { value: 'design', label: 'UI/UX Design', icon: <Palette className="w-4 h-4" /> },
];

const codeExamples = {
  basic: `<Select
  options={options}
  placeholder="Select an option..."
  onValueChange={(value) => console.log(value)}
/>`,
  searchable: `<Select
  options={countryOptions}
  placeholder="Search countries..."
  searchable
  clearable
  onValueChange={(value) => setCountry(value)}
/>`,
  multiple: `<Select
  options={skillOptions}
  placeholder="Select your skills..."
  multiple
  searchable
  clearable
  onValueChange={(values) => setSkills(values)}
/>`,
  advanced: `<Select
  options={categoryOptions}
  value={selectedCategory}
  variant="neon"
  size="lg"
  searchable
  clearable
  loading={isLoading}
  error={hasError}
  onValueChange={(value) => handleCategoryChange(value)}
/>`
};

const demoScenarios = [
  {
    id: 'country',
    title: 'Country Selection',
    description: 'Global location picker with search',
    icon: Globe,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'skills',
    title: 'Multi-Select Skills',
    description: 'Multiple selection with chips',
    icon: Star,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'priority',
    title: 'Priority Selection',
    description: 'Status-based options with icons',
    icon: Flag,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'category',
    title: 'Category Filter',
    description: 'Advanced filtering options',
    icon: Filter,
    color: 'from-purple-500 to-pink-600'
  }
];

export const SelectDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState('country');
  const [codeVisible, setCodeVisible] = useState(false);
  const [selectedCodeExample, setSelectedCodeExample] = useState('basic');
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const [formData, setFormData] = useState({
    country: '',
    skills: [] as string[],
    priority: '',
    category: '',
    timezone: '',
    language: '',
    department: '',
    role: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const getCurrentComponentIndex = () => {
    return componentOrder.findIndex(comp => comp.id === 'select');
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

  const handleSelectChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              Select
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
              Advanced Select Components
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
            Smart Select System
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the most powerful select component with search capabilities, 
            multi-selection, dynamic filtering, and premium animations for modern web applications.
          </motion.p>
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
                  {activeDemo === 'country' && <CountryDemo formData={formData} handleSelectChange={handleSelectChange} />}
                  {activeDemo === 'skills' && <SkillsDemo formData={formData} handleSelectChange={handleSelectChange} />}
                  {activeDemo === 'priority' && <PriorityDemo formData={formData} handleSelectChange={handleSelectChange} />}
                  {activeDemo === 'category' && <CategoryDemo formData={formData} handleSelectChange={handleSelectChange} />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Select Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                Select Variants & Styles
                <Badge variant="primary">5 Variants</Badge>
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
                Advanced Features & States
                <Badge variant="outline">Enterprise Ready</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedFeaturesDemo loading={loading} handleLoadingDemo={handleLoadingDemo} />
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
const CountryDemo: React.FC<{
  formData: Record<string, string | string[]>;
  handleSelectChange: (field: string, value: string | string[]) => void;
}> = ({ formData, handleSelectChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Globe className="w-5 h-5" />
        Global Location Selection
      </h3>
      
      <Select
        options={countryOptions}
        value={formData.country}
        placeholder="Search and select your country..."
        searchable
        clearable
        variant="outlined"
        size="lg"
        onValueChange={(value) => handleSelectChange('country', value)}
      />

      <Select
        options={[
          { value: 'utc-12', label: 'UTC-12:00 (Baker Island)' },
          { value: 'utc-11', label: 'UTC-11:00 (American Samoa)' },
          { value: 'utc-10', label: 'UTC-10:00 (Hawaii)' },
          { value: 'utc-9', label: 'UTC-09:00 (Alaska)' },
          { value: 'utc-8', label: 'UTC-08:00 (Pacific Time)' },
          { value: 'utc-7', label: 'UTC-07:00 (Mountain Time)' },
          { value: 'utc-6', label: 'UTC-06:00 (Central Time)' },
          { value: 'utc-5', label: 'UTC-05:00 (Eastern Time)' },
          { value: 'utc+0', label: 'UTC+00:00 (London)' },
          { value: 'utc+9', label: 'UTC+09:00 (Tokyo, Seoul)' },
        ]}
        value={formData.timezone}
        placeholder="Select timezone..."
        searchable
        variant="default"
        onValueChange={(value) => handleSelectChange('timezone', value)}
      />

      <Select
        options={[
          { value: 'en', label: 'English', icon: <Flag className="w-4 h-4" /> },
          { value: 'ja', label: '日本語', icon: <Flag className="w-4 h-4" /> },
          { value: 'ko', label: '한국어', icon: <Flag className="w-4 h-4" /> },
          { value: 'zh', label: '中文', icon: <Flag className="w-4 h-4" /> },
          { value: 'es', label: 'Español', icon: <Flag className="w-4 h-4" /> },
          { value: 'fr', label: 'Français', icon: <Flag className="w-4 h-4" /> },
          { value: 'de', label: 'Deutsch', icon: <Flag className="w-4 h-4" /> },
        ]}
        value={formData.language}
        placeholder="Select language..."
        variant="filled"
        onValueChange={(value) => handleSelectChange('language', value)}
      />
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Selected Location Details
      </h4>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Country:</span>
          <p className="font-medium">{formData.country || 'No country selected'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Timezone:</span>
          <p className="font-medium">{formData.timezone || 'No timezone selected'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
          <p className="font-medium">{formData.language || 'No language selected'}</p>
        </div>
      </div>
    </div>
  </div>
);

const SkillsDemo: React.FC<{
  formData: Record<string, string | string[]>;
  handleSelectChange: (field: string, value: string | string[]) => void;
}> = ({ formData, handleSelectChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Star className="w-5 h-5" />
        Multi-Select Skills
      </h3>
      
      <Select
        options={skillOptions}
        value={formData.skills}
        placeholder="Select your technical skills..."
        multiple
        searchable
        clearable
        variant="outlined"
        size="lg"
        onValueChange={(value) => handleSelectChange('skills', value)}
      />

      <Select
        options={categoryOptions}
        value={formData.category}
        placeholder="Select your specialization..."
        searchable
        clearable
        variant="default"
        onValueChange={(value) => handleSelectChange('category', value)}
      />
    </div>

    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Skills Summary
      </h4>
      
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Selected Skills:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
              formData.skills.map((skill: string) => (
                <Badge key={skill} variant="primary" size="sm">
                  {skillOptions.find(opt => opt.value === skill)?.label || skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills selected</span>
            )}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Specialization:</span>
          <p className="font-medium">{formData.category || 'No specialization selected'}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Skills Count:</span>
          <p className="font-medium">{Array.isArray(formData.skills) ? formData.skills.length : 0}</p>
        </div>
      </div>
    </div>
  </div>
);

const PriorityDemo: React.FC<{
  formData: Record<string, string | string[]>;
  handleSelectChange: (field: string, value: string | string[]) => void;
}> = ({ formData, handleSelectChange }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold flex items-center gap-2">
      <Flag className="w-5 h-5" />
      Priority & Status Selection
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Select
        options={priorityOptions}
        value={formData.priority}
        placeholder="Select priority level..."
        variant="default"
        size="lg"
        onValueChange={(value) => handleSelectChange('priority', value)}
      />

      <Select
        options={[
          { value: 'draft', label: 'Draft', icon: <AlertCircle className="w-4 h-4 text-gray-500" /> },
          { value: 'review', label: 'In Review', icon: <Clock className="w-4 h-4 text-yellow-500" /> },
          { value: 'approved', label: 'Approved', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
          { value: 'rejected', label: 'Rejected', icon: <X className="w-4 h-4 text-red-500" /> },
        ]}
        placeholder="Select status..."
        variant="outlined"
        size="lg"
      />

      <Select
        options={[
          { value: 'planning', label: 'Planning Phase' },
          { value: 'development', label: 'In Development' },
          { value: 'testing', label: 'Testing' },
          { value: 'deployment', label: 'Deployment' },
          { value: 'completed', label: 'Completed' },
        ]}
        placeholder="Select project phase..."
        variant="filled"
        size="lg"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {[
        { title: 'Task Priority', value: formData.priority, options: priorityOptions },
        { title: 'Status Overview', value: 'Active selections will appear here', options: [] },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h4 className="font-medium mb-3">{item.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.value || 'No selection made'}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CategoryDemo: React.FC<{
  formData: Record<string, string | string[]>;
  handleSelectChange: (field: string, value: string | string[]) => void;
}> = ({ formData, handleSelectChange }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold flex items-center gap-2">
      <Filter className="w-5 h-5" />
      Advanced Category Filtering
    </h3>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Select
          options={categoryOptions}
          value={formData.category}
          placeholder="Filter by category..."
          searchable
          clearable
          variant="neon"
          size="lg"
          onValueChange={(value) => handleSelectChange('category', value)}
        />

        <Select
          options={[
            { value: 'engineering', label: 'Engineering', icon: <Code className="w-4 h-4" /> },
            { value: 'design', label: 'Design', icon: <Palette className="w-4 h-4" /> },
            { value: 'product', label: 'Product', icon: <Target className="w-4 h-4" /> },
            { value: 'marketing', label: 'Marketing', icon: <TrendingUp className="w-4 h-4" /> },
            { value: 'sales', label: 'Sales', icon: <Building className="w-4 h-4" /> },
            { value: 'support', label: 'Support', icon: <Shield className="w-4 h-4" /> },
          ]}
          value={formData.department}
          placeholder="Select department..."
          variant="ghost"
          size="lg"
          onValueChange={(value) => handleSelectChange('department', value)}
        />

        <Select
          options={[
            { value: 'junior', label: 'Junior Level', description: '0-2 years experience' },
            { value: 'mid', label: 'Mid Level', description: '2-5 years experience' },
            { value: 'senior', label: 'Senior Level', description: '5+ years experience' },
            { value: 'lead', label: 'Lead/Principal', description: '8+ years experience' },
            { value: 'executive', label: 'Executive', description: 'Leadership role' },
          ]}
          value={formData.role}
          placeholder="Select experience level..."
          searchable
          variant="outlined"
          size="lg"
          onValueChange={(value) => handleSelectChange('role', value)}
        />
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Filter Results
        </h4>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Results</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Matched</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {[formData.category, formData.department, formData.role].filter(Boolean).map((filter, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {filter as string}
                </Badge>
              ))}
              {![formData.category, formData.department, formData.role].some(Boolean) && (
                <span className="text-gray-500 text-sm">No filters applied</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VariantsShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {[
      { variant: 'default' as const, title: 'Default', bg: 'bg-white dark:bg-gray-800' },
      { variant: 'filled' as const, title: 'Filled', bg: 'bg-gray-50 dark:bg-gray-700' },
      { variant: 'outlined' as const, title: 'Outlined', bg: 'bg-white dark:bg-gray-800' },
      { variant: 'ghost' as const, title: 'Ghost', bg: 'bg-transparent' },
      { variant: 'neon' as const, title: 'Neon', bg: 'bg-black' },
    ].map((item, index) => (
      <motion.div
        key={item.variant}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`p-6 rounded-xl ${item.bg} border border-gray-200 dark:border-gray-700 ${item.variant === 'neon' ? 'border-cyan-400' : ''}`}
      >
        <div className="mb-4">
          <Badge variant="outline" className="mb-3">{item.title}</Badge>
          <Select
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
            placeholder={`${item.title} select...`}
            variant={item.variant}
            size="sm"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const AdvancedFeaturesDemo: React.FC<{
  loading: Record<string, boolean>;
  handleLoadingDemo: (key: string) => Promise<void>;
}> = ({ loading, handleLoadingDemo }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Search className="w-5 h-5" />
          Searchable Options
        </h4>
        <Select
          options={countryOptions}
          placeholder="Search countries..."
          searchable
          size="lg"
        />
        <Select
          options={skillOptions}
          placeholder="Search skills..."
          searchable
          clearable
          multiple
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Loading & States
        </h4>
        <Select
          options={priorityOptions}
          placeholder="Loading example..."
          loading={loading.demo1}
          onValueChange={() => handleLoadingDemo('demo1')}
        />
        <Select
          options={categoryOptions}
          placeholder="Error state example"
          error
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Sizes & Options
        </h4>
        <Select options={priorityOptions} placeholder="Small size" size="sm" />
        <Select options={countryOptions} placeholder="Large size" size="lg" clearable />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div>
        <h4 className="font-semibold mb-4">Multi-Selection</h4>
        <div className="space-y-4">
          <Select
            options={skillOptions}
            placeholder="Select multiple skills..."
            multiple
            searchable
            clearable
          />
          <Select
            options={categoryOptions}
            placeholder="Multiple categories..."
            multiple
            variant="outlined"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Icons & Descriptions</h4>
        <div className="space-y-4">
          <Select
            options={priorityOptions}
            placeholder="Options with icons..."
            searchable
          />
          <Select
            options={[
              { value: 'opt1', label: 'Option 1', description: 'Detailed description here' },
              { value: 'opt2', label: 'Option 2', description: 'Another description' },
              { value: 'opt3', label: 'Option 3', description: 'More details available' },
            ]}
            placeholder="Options with descriptions..."
          />
        </div>
      </div>
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
          { label: 'Bundle Size', value: '15.4kb', icon: Database, color: 'text-green-500' },
          { label: 'Render Time', value: '1.2ms', icon: Zap, color: 'text-blue-500' },
          { label: 'Memory Usage', value: '2.1MB', icon: Cpu, color: 'text-purple-500' },
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

export default SelectDemo; 