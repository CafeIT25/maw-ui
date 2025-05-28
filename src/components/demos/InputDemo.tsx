import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, SearchInput } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Search, 
  Mail, 
  Phone, 
  User, 
  Lock, 
  Globe, 
  CreditCard, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Zap,
  Sparkles,
  Shield,
  Palette,
  MapPin,
  Building,
  Eye,
  Code,
  Layers,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Terminal,
  Cpu,
  Database,
  TrendingUp,
  Rocket,
  Settings,
  Target,
  Tag,
} from 'lucide-react';

// Interactive demo data
const demoScenarios = [
  {
    id: 'signup',
    title: 'User Registration',
    description: 'Complete user onboarding experience',
    icon: User,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'payment',
    title: 'Payment Processing',
    description: 'Secure financial data collection',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'search',
    title: 'Search Interface',
    description: 'Advanced search capabilities',
    icon: Search,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'User profile management',
    icon: Settings,
    color: 'from-purple-500 to-pink-600'
  }
];

const codeExamples = {
  basic: `<Input
  placeholder="Enter your text..."
  leftIcon={<User />}
  variant="default"
/>`,
  floating: `<Input
  label="Email Address"
  type="email"
  floating
  leftIcon={<Mail />}
  helperText="We'll never share your email"
/>`,
  validation: `<Input
  type="password"
  label="Password"
  errorText="Password must be at least 8 characters"
  state="error"
/>`,
  advanced: `<Input
  type="text"
  variant="glass"
  floating
  label="Premium Input"
  leftIcon={<Sparkles />}
  clearable
  loading={isLoading}
  rightIcon={<CheckCircle />}
/>`
};

export const InputDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('signup');
  const [codeVisible, setCodeVisible] = useState(false);
  const [typingDemo, setTypingDemo] = useState('');
  const [selectedCodeExample, setSelectedCodeExample] = useState('basic');
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
    company: '',
    search: '',
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bio: '',
    website: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [validationStates, setValidationStates] = useState<Record<string, {
    isValid: boolean;
    message: string;
    strength: number;
  }>>({});
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Enhanced typing animation with multiple scenarios
  useEffect(() => {
    if (!isPlaying) return;

    const scenarios = [
      { text: 'john.doe@company.com', delay: 150 },
      { text: 'secure_password_123', delay: 120 },
      { text: 'Search AI-powered components...', delay: 80 },
      { text: '+1 (555) 123-4567', delay: 200 },
      { text: 'Next-gen UI Library', delay: 100 }
    ];

    let scenarioIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    const typeWriter = () => {
      const currentScenario = scenarios[scenarioIndex];
      const currentText = currentScenario.text;
      
      if (isDeleting) {
        setTypingDemo(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingDemo(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : currentScenario.delay;

      if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        scenarioIndex = (scenarioIndex + 1) % scenarios.length;
        speed = 500;
      }

      timeoutId = setTimeout(typeWriter, speed);
    };

    typeWriter();
    return () => clearTimeout(timeoutId);
  }, [isPlaying]);

  // Enhanced validation logic
  const validateField = useCallback((field: string, value: string) => {
    const validations: Record<string, {
      isValid: boolean;
      message: string;
      strength: number;
    }> = {};

    switch (field) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validations.email = {
          isValid: emailRegex.test(value),
          message: emailRegex.test(value) ? 'Valid email address' : 'Please enter a valid email',
          strength: value.length > 0 ? (emailRegex.test(value) ? 100 : 20) : 0
        };
        break;
      }
      case 'password': {
        const strength = calculatePasswordStrength(value);
        validations.password = {
          isValid: strength >= 60,
          message: getPasswordMessage(strength),
          strength
        };
        break;
      }
      case 'phone': {
        const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
        validations.phone = {
          isValid: phoneRegex.test(value),
          message: phoneRegex.test(value) ? 'Valid phone number' : 'Please enter a valid phone number',
          strength: value.length > 0 ? (phoneRegex.test(value) ? 100 : 30) : 0
        };
        break;
      }
    }

    setValidationStates(prev => ({ ...prev, ...validations }));
  }, []);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const getPasswordMessage = (strength: number): string => {
    if (strength < 30) return 'Very weak password';
    if (strength < 50) return 'Weak password';
    if (strength < 70) return 'Good password';
    if (strength < 90) return 'Strong password';
    return 'Very strong password';
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  }, [validateField]);

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
              Next-Generation Input Components
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
            Intelligent Input System
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the future of form interactions with AI-powered validation, 
            premium animations, real-time feedback, and enterprise-grade security features.
          </motion.p>

          {/* Live Typing Demo */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Live Demo
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-xs"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTypingDemo('')}
                      className="text-xs"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  value={typingDemo}
                  readOnly
                  variant="default"
                  size="lg"
                  leftIcon={<Zap className="animate-pulse" />}
                  rightIcon={<Sparkles className="animate-spin" />}
                  className="text-center font-mono"
                />
                <div className="flex justify-center mt-4 space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
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
                  {activeDemo === 'signup' && <SignupDemo formData={formData} handleInputChange={handleInputChange} validationStates={validationStates} />}
                  {activeDemo === 'payment' && <PaymentDemo formData={formData} handleInputChange={handleInputChange} />}
                  {activeDemo === 'search' && <SearchDemo formData={formData} handleInputChange={handleInputChange} />}
                  {activeDemo === 'profile' && <ProfileDemo formData={formData} handleInputChange={handleInputChange} />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Component Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                Component Variants & Themes
                <Badge variant="primary">8 Variants</Badge>
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
                <Cpu className="w-6 h-6" />
                Advanced Features & Props
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
const SignupDemo: React.FC<{
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
  validationStates: Record<string, { isValid: boolean; message: string; strength: number }>;
}> = ({ formData, handleInputChange, validationStates }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <User className="w-5 h-5" />
        User Registration Flow
      </h3>
      
      <Input
        type="text"
        label="First Name"
        value={formData.firstName}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
        leftIcon={<User />}
        variant="outlined"
        floating
        helperText="Enter your first name"
      />

      <Input
        type="text"
        label="Last Name" 
        value={formData.lastName}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
        leftIcon={<User />}
        variant="outlined"
        floating
        helperText="Enter your last name"
      />

      <Input
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        leftIcon={<Mail />}
        variant="outlined"
        floating
        clearable
        state={validationStates.email?.isValid === false ? 'error' : validationStates.email?.isValid ? 'success' : 'default'}
        errorText={validationStates.email?.isValid === false ? validationStates.email.message : undefined}
        successText={validationStates.email?.isValid ? validationStates.email.message : undefined}
      />

      <Input
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        leftIcon={<Lock />}
        variant="outlined"
        floating
        state={validationStates.password?.isValid === false ? 'error' : validationStates.password?.isValid ? 'success' : 'default'}
        helperText={validationStates.password?.message || 'Password strength will be validated'}
      />
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Real-time Validation
      </h4>
      
      {validationStates.email && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Email Validation</span>
            <span className="text-sm">{validationStates.email.strength}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${validationStates.email.isValid ? 'bg-green-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${validationStates.email.strength}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {validationStates.password && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Password Strength</span>
            <span className="text-sm">{validationStates.password.strength}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                validationStates.password.strength < 30 ? 'bg-red-500' :
                validationStates.password.strength < 60 ? 'bg-yellow-500' :
                validationStates.password.strength < 80 ? 'bg-blue-500' : 'bg-green-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${validationStates.password.strength}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

const PaymentDemo: React.FC<{
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
}> = ({ formData, handleInputChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Secure Payment Processing
      </h3>
      
      <Input
        type="text"
        label="Card Number"
        value={formData.cardNumber}
        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
        leftIcon={<CreditCard />}
        variant="outlined"
        floating
        placeholder="1234 5678 9012 3456"
        helperText="Your card information is encrypted"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="Expiry Date"
          value={formData.expiryDate}
          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          leftIcon={<Calendar />}
          variant="outlined"
          floating
          placeholder="MM/YY"
        />

        <Input
          type="text"
          label="CVV"
          value={formData.cvv}
          onChange={(e) => handleInputChange('cvv', e.target.value)}
          leftIcon={<Shield />}
          variant="outlined"
          floating
          placeholder="123"
        />
      </div>

      <Input
        type="text"
        label="Amount"
        value={formData.amount}
        onChange={(e) => handleInputChange('amount', e.target.value)}
        leftIcon={<DollarSign />}
        variant="default"
        floating
        placeholder="0.00"
        helperText="Enter the payment amount"
      />
    </div>

    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Security Features
      </h4>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">256-bit SSL Encryption</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">PCI DSS Compliant</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">Real-time Fraud Detection</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm">Tokenized Data Storage</span>
        </div>
      </div>
    </div>
  </div>
);

const SearchDemo: React.FC<{
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
}> = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold flex items-center gap-2">
      <Search className="w-5 h-5" />
      Advanced Search Interface
    </h3>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SearchInput
        value={formData.search}
        onChange={(e) => handleInputChange('search', e.target.value)}
        placeholder="Search components..."
        variant="outlined"
        size="lg"
      />

      <Input
        type="text"
        leftIcon={<Building />}
        placeholder="Filter by category..."
        variant="filled"
        size="lg"
      />

      <Input
        type="text"
        leftIcon={<Tag />}
        placeholder="Filter by tags..."
        variant="ghost"
        size="lg"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Tooltip', 'Badge', 'Avatar'].map((component, index) => (
        <motion.div
          key={component}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-colors cursor-pointer"
        >
          <h4 className="font-medium">{component}</h4>
          <p className="text-sm text-gray-500 mt-1">React component</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProfileDemo: React.FC<{
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
}> = ({ formData, handleInputChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Profile Settings
      </h3>
      
      <Input
        type="text"
        label="Company"
        value={formData.company}
        onChange={(e) => handleInputChange('company', e.target.value)}
        leftIcon={<Building />}
        variant="default"
        floating
        helperText="Your organization name"
      />

      <Input
        type="url"
        label="Website"
        value={formData.website}
        onChange={(e) => handleInputChange('website', e.target.value)}
        leftIcon={<Globe />}
        variant="glass"
        floating
        placeholder="https://yourwebsite.com"
      />

      <Input
        type="tel"
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        leftIcon={<Phone />}
        variant="neon"
        floating
        placeholder="+1 (555) 123-4567"
      />
    </div>

    <div className="space-y-6">
      <h4 className="text-lg font-medium">Address Information</h4>
      
      <Input
        type="text"
        label="Street Address"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        leftIcon={<MapPin />}
        variant="outlined"
        floating
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="City"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          leftIcon={<Building />}
          variant="outlined"
          floating
        />

        <Input
          type="text"
          label="Zip Code"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          leftIcon={<MapPin />}
          variant="outlined"
          floating
        />
      </div>
    </div>
  </div>
);

const VariantsShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { variant: 'default' as const, title: 'Default', icon: User, bg: 'bg-white' },
      { variant: 'outlined' as const, title: 'Outlined', icon: Mail, bg: 'bg-gray-50' },
      { variant: 'filled' as const, title: 'Filled', icon: Phone, bg: 'bg-blue-50' },
      { variant: 'ghost' as const, title: 'Ghost', icon: Search, bg: 'bg-transparent' },
      { variant: 'gradient' as const, title: 'Gradient', icon: Sparkles, bg: 'bg-gradient-to-r from-blue-50 to-purple-50' },
      { variant: 'neon' as const, title: 'Neon', icon: Zap, bg: 'bg-black' },
      { variant: 'glass' as const, title: 'Glass', icon: Eye, bg: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    ].map((item, index) => (
      <motion.div
        key={item.variant}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`p-6 rounded-xl ${item.bg === 'bg-black' ? 'bg-black' : item.bg === 'bg-gradient-to-r from-purple-600 to-pink-600' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : item.bg} border border-gray-200 dark:border-gray-700`}
      >
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">{item.title}</Badge>
          <Input
            type="text"
            placeholder={`${item.title} input...`}
            leftIcon={<item.icon className="w-4 h-4" />}
            variant={item.variant}
            size="sm"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const AdvancedFeaturesDemo: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Loading States
        </h4>
        <Input placeholder="Loading example..." loading leftIcon={<Cpu />} />
        <Input placeholder="Processing..." loading variant="default" />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Validation States
        </h4>
        <Input placeholder="Success state" state="success" successText="Valid input!" leftIcon={<CheckCircle />} />
        <Input placeholder="Error state" state="error" errorText="Invalid format" leftIcon={<AlertCircle />} />
        <Input placeholder="Warning state" state="warning" helperText="Please check this field" leftIcon={<AlertCircle />} />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Sizes & Options
        </h4>
        <Input placeholder="Small size" size="sm" leftIcon={<User />} />
        <Input placeholder="Large size" size="lg" leftIcon={<Mail />} clearable />
        <Input placeholder="Extra large" size="xl" leftIcon={<Building />} />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div>
        <h4 className="font-semibold mb-4">Floating Labels</h4>
        <div className="space-y-4">
          <Input label="Username" floating leftIcon={<User />} />
          <Input label="Email Address" type="email" floating leftIcon={<Mail />} />
          <Input label="Password" type="password" floating leftIcon={<Lock />} />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Interactive Features</h4>
        <div className="space-y-4">
          <Input placeholder="Clearable input" clearable leftIcon={<Search />} />
          <Input placeholder="With right icon" leftIcon={<User />} rightIcon={<CheckCircle />} />
          <SearchInput placeholder="Search with built-in functionality..." />
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
          { label: 'Bundle Size', value: '12.3kb', icon: Database, color: 'text-green-500' },
          { label: 'Render Time', value: '0.8ms', icon: Zap, color: 'text-blue-500' },
          { label: 'Memory Usage', value: '1.2MB', icon: Cpu, color: 'text-purple-500' },
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

export default InputDemo; 