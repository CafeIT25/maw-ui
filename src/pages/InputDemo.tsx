import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { 
  Code, 
  Copy, 
  Star, 
  Zap, 
  Sparkles, 
  Rocket,
  Shield,
  FileText,
  Terminal,
  Palette,
  Settings,
  Download,
  CheckCircle,
  Eye,
  Lock,
  Mail,
  Phone,
  Search,
  DollarSign,
  Key
} from 'lucide-react';

type InputVariant = 'default' | 'ghost' | 'neon' | 'glass' | 'gradient' | 'filled' | 'outlined';
type InputSize = 'default' | 'sm' | 'lg' | 'xl';

export const InputDemo: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<InputVariant>('default');
  const [selectedSize, setSelectedSize] = useState<InputSize>('default');
  
  // Basic inputs states
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  
  // Advanced inputs states
  const [floatingValue, setFloatingValue] = useState('');
  const [copyableValue, setCopyableValue] = useState('Copy this text to clipboard');
  const [successValue] = useState('Success input state');
  const [errorValue] = useState('Error input state');
  const [validatedUsername, setValidatedUsername] = useState('');
  const [validatedEmail, setValidatedEmail] = useState('');
  const [validatedPassword, setValidatedPassword] = useState('');
  const [validatedUrl, setValidatedUrl] = useState('');
  
  // Demo values for showcase
  const [demoValues, setDemoValues] = useState<Record<string, string>>({});
  const [floatingLabel, setFloatingLabel] = useState(false);
  const [animated, setAnimated] = useState(true);

  const handleValueChange = (key: string, value: string) => {
    setDemoValues(prev => ({ ...prev, [key]: value }));
  };

  const variants: { value: InputVariant; label: string; description: string }[] = [
    { value: 'default', label: 'Default', description: 'Clean and classic input design' },
    { value: 'outlined', label: 'Outlined', description: 'Bordered input with clear boundaries' },
    { value: 'filled', label: 'Filled', description: 'Filled background input style' },
    { value: 'ghost', label: 'Ghost', description: 'Minimal borderless input' },
    { value: 'neon', label: 'Neon', description: 'Futuristic glowing neon effect' },
    { value: 'glass', label: 'Glass', description: 'Glassmorphism with backdrop blur' },
    { value: 'gradient', label: 'Gradient', description: 'Colorful gradient styling' }
  ];

  const sizes: { value: InputSize; label: string; height: string }[] = [
    { value: 'sm', label: 'Small', height: '32px' },
    { value: 'default', label: 'Default', height: '40px' },
    { value: 'lg', label: 'Large', height: '48px' },
    { value: 'xl', label: 'Extra Large', height: '56px' }
  ];

  const codeExample = `import { Input } from '@maw-ui/react';

function MyForm() {
  const [email, setEmail] = useState('');
  
  return (
    <Input
      type="email"
      label="Email Address"
      placeholder="your@email.com"
      variant="${selectedVariant}"
      size="${selectedSize}"
      ${floatingLabel ? 'floatingLabel' : ''}
      ${!animated ? 'animated={false}' : ''}
      clearable
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      validation={{
        required: true,
        pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
      }}
      onValidate={(isValid, error) => {
        console.log({ isValid, error });
      }}
    />
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Input Components
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Next-generation input components with advanced validation, accessibility features, 
            beautiful animations, and comprehensive customization options.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="premium" size="lg">
              <Star className="w-4 h-4 mr-1" />
              Enterprise Ready
            </Badge>
            <Badge variant="outline" size="lg">
              <Shield className="w-4 h-4 mr-1" />
              TypeScript
            </Badge>
            <Badge variant="premium" size="lg">
              <Sparkles className="w-4 h-4 mr-1" />
              Animated
            </Badge>
            <Badge variant="outline" size="lg">
              <CheckCircle className="w-4 h-4 mr-1" />
              Accessible
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="showcase" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="showcase">
              <Palette className="w-4 h-4 mr-2" />
              Showcase
            </TabsTrigger>
            <TabsTrigger value="variants">
              <Settings className="w-4 h-4 mr-2" />
              Variants
            </TabsTrigger>
            <TabsTrigger value="features">
              <Rocket className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="validation">
              <Shield className="w-4 h-4 mr-2" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-2" />
              Code
            </TabsTrigger>
          </TabsList>

          {/* Showcase Tab */}
          <TabsContent value="showcase" className="space-y-8">
            {/* Interactive Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Interactive Demo
                </CardTitle>
                <CardDescription>
                  Customize the input component with different options and see real-time changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Variant</label>
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value as InputVariant)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {variants.map((variant) => (
                        <option key={variant.value} value={variant.value}>
                          {variant.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value as InputSize)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {sizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={floatingLabel}
                        onChange={(e) => setFloatingLabel(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Floating Label</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={animated}
                        onChange={(e) => setAnimated(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Animations</span>
                    </label>
                  </div>
                </div>

                {/* Demo Input */}
                <div className="max-w-md mx-auto">
                  <Input
                    type="text"
                    label="Demo Input"
                    placeholder="Try typing here..."
                    variant={selectedVariant}
                    size={selectedSize}
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email..."
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password..."
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value)}
                  />

                  <Input
                    type="text"
                    label="Text Input"
                    placeholder="Floating label input"
                    value={floatingValue}
                    onChange={(e) => setFloatingValue(e.target.value)}
                  />

                  {variants.map((variant) => (
                    <div key={variant.value} className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                        {variant.label} Input
                      </h4>
                      <Input
                        type="text"
                        placeholder={`${variant.label} style input`}
                        variant={variant.value}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {variant.description}
                      </p>
                    </div>
                  ))}

                  <Input
                    type="text"
                    label="Sample Input"
                    placeholder="Basic input example"
                    value={copyableValue}
                    onChange={(e) => setCopyableValue(e.target.value)}
                  />

                  <Input
                    type="text"
                    label="Success State"
                    placeholder="This input shows success"
                    value={successValue}
                    onChange={() => {}}
                  />

                  <Input
                    type="text"
                    label="Error State"
                    placeholder="This input shows error"
                    value={errorValue}
                    onChange={() => {}}
                  />

                  <Input
                    type="text"
                    label="Username"
                    placeholder="Enter a username"
                    value={validatedUsername}
                    onChange={(e) => setValidatedUsername(e.target.value)}
                  />

                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter a valid email"
                    value={validatedEmail}
                    onChange={(e) => setValidatedEmail(e.target.value)}
                  />

                  <Input
                    type="password"
                    label="Strong Password"
                    placeholder="Enter a strong password"
                    value={validatedPassword}
                    onChange={(e) => setValidatedPassword(e.target.value)}
                  />

                  <Input
                    type="url"
                    label="Website URL"
                    placeholder="https://example.com"
                    value={validatedUrl}
                    onChange={(e) => setValidatedUrl(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Feature Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="your@email.com"
                    value={demoValues.email || ''}
                    onChange={(e) => handleValueChange('email', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Password Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={demoValues.password || ''}
                    onChange={(e) => handleValueChange('password', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="search"
                    label="Search"
                    placeholder="Search anything..."
                    value={demoValues.search || ''}
                    onChange={(e) => handleValueChange('search', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Phone Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    leftIcon={<Phone className="w-4 h-4" />}
                    value={demoValues.phone || ''}
                    onChange={(e) => handleValueChange('phone', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Currency Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    label="Price"
                    placeholder="Enter amount"
                    value={demoValues.currency || ''}
                    onChange={(e) => handleValueChange('currency', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Floating Label
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    label="Your Name"
                    placeholder="Enter your name"
                    value={demoValues.floating || ''}
                    onChange={(e) => handleValueChange('floating', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Key Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    label="API Key"
                    placeholder="sk-1234567890abcdef"
                    leftIcon={<Key className="w-4 h-4" />}
                    value={demoValues.apiKey || ''}
                    onChange={(e) => handleValueChange('apiKey', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Secure Password Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="password"
                    label="Secure Password"
                    placeholder="Enter secure password"
                    leftIcon={<Lock className="w-4 h-4" />}
                    variant="default"
                    value={demoValues.password || ''}
                    onChange={(e) => handleValueChange('password', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Animated Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    label="Animated Input"
                    placeholder="Type here to see animation"
                    leftIcon={<Star className="w-4 h-4" />}
                    variant="filled"
                    value={demoValues.animated || ''}
                    onChange={(e) => handleValueChange('animated', e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {variants.map((variant) => (
                <Card key={variant.value}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {variant.label}
                      <Badge variant="outline">{variant.value}</Badge>
                    </CardTitle>
                    <CardDescription>{variant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      variant={variant.value}
                      label="Sample Input"
                      placeholder="Type something..."
                      clearable
                      value={demoValues[variant.value] || ''}
                      onChange={(e) => handleValueChange(variant.value, e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                  <CardDescription>Copy, clear, and interactive features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="text"
                    label="API Key"
                    placeholder="Enter API key"
                    value={demoValues.advanced1 || ''}
                    onChange={(e) => handleValueChange('advanced1', e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Sample Input"
                    placeholder="Basic input example"
                    value={demoValues.advanced2 || ''}
                    onChange={(e) => handleValueChange('advanced2', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>States & Feedback</CardTitle>
                  <CardDescription>Basic input states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="text"
                    label="Success State"
                    placeholder="This is valid"
                    value="Valid input"
                    onChange={() => {}}
                  />
                  <Input
                    type="text"
                    label="Error State"
                    placeholder="This has an error"
                    value="Invalid"
                    onChange={() => {}}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Validation Tab */}
          <TabsContent value="validation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Examples</CardTitle>
                <CardDescription>
                  Basic input examples with different types
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    label="Username"
                    placeholder="Enter username"
                    value={demoValues.validation1 || ''}
                    onChange={(e) => handleValueChange('validation1', e.target.value)}
                  />

                  <Input
                    type="email"
                    label="Email"
                    placeholder="your@email.com"
                    value={demoValues.validation2 || ''}
                    onChange={(e) => handleValueChange('validation2', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={demoValues.validation3 || ''}
                    onChange={(e) => handleValueChange('validation3', e.target.value)}
                  />

                  <Input
                    type="url"
                    label="Website URL"
                    placeholder="https://example.com"
                    value={demoValues.validation4 || ''}
                    onChange={(e) => handleValueChange('validation4', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Code Example
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(codeExample)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </CardTitle>
                <CardDescription>
                  Basic usage example with current configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExample}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>
                  Get started with MAW UI Input component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">npm</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>npm install @maw-ui/react</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">pnpm</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>pnpm add @maw-ui/react</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pb-8"
        >
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="premium" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </Button>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Built with ❤️ for the next generation of web applications
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InputDemo; 