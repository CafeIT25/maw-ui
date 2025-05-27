import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Select } from '../components/ui/Select';
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
  Globe,
  Search,
  Filter,
  Users,
  Building,
  ChevronDown,
  CheckCircle,
  Settings,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Flag,
  Brain,
  Target,
  Layers,
  Cpu,
  Lock,
  Award,
  Crown,
  Gem,
  Lightbulb,
  Workflow,
  Network,
  Server
} from 'lucide-react';

export const SelectDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchableValue, setSearchableValue] = useState<string>('');
  const [asyncValue, setAsyncValue] = useState<string>('');
  const [premiumValue, setPremiumValue] = useState<string[]>([]);
  const [isAsyncLoading, setIsAsyncLoading] = useState(false);

  // Basic options
  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
  ];

  // Country options with flags
  const countryOptions = [
    { value: 'us', label: 'United States', icon: <Flag className="w-4 h-4" />, description: 'North America' },
    { value: 'jp', label: 'Japan', icon: <Flag className="w-4 h-4" />, description: 'Asia Pacific' },
    { value: 'de', label: 'Germany', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
    { value: 'uk', label: 'United Kingdom', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
    { value: 'ca', label: 'Canada', icon: <Flag className="w-4 h-4" />, description: 'North America' },
    { value: 'au', label: 'Australia', icon: <Flag className="w-4 h-4" />, description: 'Oceania' },
    { value: 'fr', label: 'France', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
    { value: 'kr', label: 'South Korea', icon: <Flag className="w-4 h-4" />, description: 'Asia Pacific' },
    { value: 'sg', label: 'Singapore', icon: <Flag className="w-4 h-4" />, description: 'Asia Pacific' },
    { value: 'nl', label: 'Netherlands', icon: <Flag className="w-4 h-4" />, description: 'Europe' },
  ];

  // Technology stack options
  const techStackOptions = [
    { value: 'react', label: 'React', icon: <Cpu className="w-4 h-4 text-blue-500" />, description: 'Frontend Framework' },
    { value: 'vue', label: 'Vue.js', icon: <Cpu className="w-4 h-4 text-green-500" />, description: 'Frontend Framework' },
    { value: 'angular', label: 'Angular', icon: <Cpu className="w-4 h-4 text-red-500" />, description: 'Frontend Framework' },
    { value: 'node', label: 'Node.js', icon: <Server className="w-4 h-4 text-green-600" />, description: 'Backend Runtime' },
    { value: 'python', label: 'Python', icon: <Server className="w-4 h-4 text-yellow-500" />, description: 'Backend Language' },
    { value: 'java', label: 'Java', icon: <Server className="w-4 h-4 text-orange-500" />, description: 'Backend Language' },
    { value: 'postgres', label: 'PostgreSQL', icon: <Database className="w-4 h-4 text-blue-600" />, description: 'Database' },
    { value: 'mongo', label: 'MongoDB', icon: <Database className="w-4 h-4 text-green-700" />, description: 'Database' },
    { value: 'redis', label: 'Redis', icon: <Database className="w-4 h-4 text-red-600" />, description: 'Cache/Database' },
    { value: 'aws', label: 'AWS', icon: <Cloud className="w-4 h-4 text-orange-600" />, description: 'Cloud Platform' },
    { value: 'gcp', label: 'Google Cloud', icon: <Cloud className="w-4 h-4 text-blue-500" />, description: 'Cloud Platform' },
    { value: 'azure', label: 'Microsoft Azure', icon: <Cloud className="w-4 h-4 text-blue-700" />, description: 'Cloud Platform' },
  ];

  // Enterprise roles with hierarchy
  const enterpriseRoles = [
    { value: 'ceo', label: 'Chief Executive Officer', icon: <Crown className="w-4 h-4 text-purple-600" />, description: 'C-Level Executive' },
    { value: 'cto', label: 'Chief Technology Officer', icon: <Crown className="w-4 h-4 text-blue-600" />, description: 'C-Level Executive' },
    { value: 'cfo', label: 'Chief Financial Officer', icon: <Crown className="w-4 h-4 text-green-600" />, description: 'C-Level Executive' },
    { value: 'vp_eng', label: 'VP of Engineering', icon: <Award className="w-4 h-4 text-indigo-600" />, description: 'Vice President' },
    { value: 'vp_product', label: 'VP of Product', icon: <Award className="w-4 h-4 text-purple-500" />, description: 'Vice President' },
    { value: 'director_eng', label: 'Director of Engineering', icon: <Target className="w-4 h-4 text-blue-500" />, description: 'Director Level' },
    { value: 'principal_eng', label: 'Principal Engineer', icon: <Gem className="w-4 h-4 text-cyan-500" />, description: 'Senior Individual Contributor' },
    { value: 'staff_eng', label: 'Staff Engineer', icon: <Star className="w-4 h-4 text-yellow-500" />, description: 'Senior Individual Contributor' },
    { value: 'senior_eng', label: 'Senior Engineer', icon: <Rocket className="w-4 h-4 text-orange-500" />, description: 'Individual Contributor' },
    { value: 'engineer', label: 'Software Engineer', icon: <Code className="w-4 h-4 text-gray-600" />, description: 'Individual Contributor' },
    { value: 'product_manager', label: 'Product Manager', icon: <Lightbulb className="w-4 h-4 text-yellow-600" />, description: 'Product Team' },
    { value: 'designer', label: 'Product Designer', icon: <Palette className="w-4 h-4 text-pink-500" />, description: 'Design Team' },
    { value: 'data_scientist', label: 'Data Scientist', icon: <Brain className="w-4 h-4 text-purple-500" />, description: 'Data Team' },
    { value: 'devops', label: 'DevOps Engineer', icon: <Workflow className="w-4 h-4 text-green-500" />, description: 'Infrastructure Team' },
    { value: 'security', label: 'Security Engineer', icon: <Lock className="w-4 h-4 text-red-500" />, description: 'Security Team' },
  ];

  // Simulate async loading
  const handleAsyncLoad = useCallback(async () => {
    setIsAsyncLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAsyncLoading(false);
    setAsyncValue('loaded_data');
  }, []);

  const asyncOptions = useMemo(() => [
    { value: 'loading', label: 'Loading...', disabled: true },
    { value: 'loaded_data', label: 'Loaded Data from API' },
    { value: 'cached_data', label: 'Cached Data' },
  ], []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add toast notification here
  };

  const codeExamples = {
    basic: `<Select
  options={basicOptions}
  value={value}
  onValueChange={setValue}
  placeholder="Select an option..."
/>`,
    searchable: `<Select
  options={countryOptions}
  value={value}
  onValueChange={setValue}
  placeholder="Search countries..."
  searchable
  clearable
/>`,
    multiple: `<Select
  options={techStackOptions}
  value={value}
  onValueChange={setValue}
  placeholder="Select technologies..."
  multiple
  searchable
  clearable
/>`,
    async: `const [loading, setLoading] = useState(false);

<Select
  options={asyncOptions}
  value={value}
  onValueChange={setValue}
  placeholder="Load data..."
  loading={loading}
  onFocus={() => loadAsyncData()}
/>`,
    variants: `{/* Different variants */}
<Select variant="default" {...props} />
<Select variant="filled" {...props} />
<Select variant="outlined" {...props} />
<Select variant="ghost" {...props} />
<Select variant="neon" {...props} />`,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium">
          <ChevronDown className="w-4 h-4" />
          Next-Generation Select Component
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Advanced Select Demo
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Experience the most sophisticated select component with enterprise-grade features, 
          intelligent search, async loading, and stunning animations that will impress developers from any major tech company.
        </p>
        
        <div className="flex justify-center gap-2 mt-6">
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

      <Tabs defaultValue="showcase" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* Interactive Showcase */}
        <TabsContent value="showcase" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Interactive Showcase
              </CardTitle>
              <CardDescription>
                Try different configurations and see real-time behavior changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Select */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Basic Select
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Standard select with clean design and smooth animations
                </p>
                <div className="max-w-md">
                  <Select
                    options={basicOptions}
                    value={basicValue}
                    onValueChange={(value) => setBasicValue(value as string)}
                    placeholder="Choose an option..."
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Selected: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{basicValue || 'none'}</code>
                </div>
              </div>

              {/* Searchable Country Select */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Searchable with Icons & Descriptions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Global country selector with intelligent search and contextual information
                </p>
                <div className="max-w-md">
                  <Select
                    options={countryOptions}
                    value={searchableValue}
                    onValueChange={(value) => setSearchableValue(value as string)}
                    placeholder="Search countries..."
                    searchable
                    clearable
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Selected: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{searchableValue || 'none'}</code>
                </div>
              </div>

              {/* Multi-Select Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Multi-Select Technology Stack
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select multiple technologies with smart tag management and categorization
                </p>
                <div className="max-w-lg">
                  <Select
                    options={techStackOptions}
                    value={multiValue}
                    onValueChange={(value) => setMultiValue(value as string[])}
                    placeholder="Select your tech stack..."
                    multiple
                    searchable
                    clearable
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Selected ({multiValue.length}): 
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-1">
                    {multiValue.length > 0 ? multiValue.join(', ') : 'none'}
                  </code>
                </div>
              </div>

              {/* Async Loading */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Async Data Loading
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Demonstrates async data fetching with loading states and error handling
                </p>
                <div className="flex gap-4 items-end max-w-lg">
                  <div className="flex-1">
                    <Select
                      options={asyncOptions}
                      value={asyncValue}
                      onValueChange={(value) => setAsyncValue(value as string)}
                      placeholder="Load async data..."
                      loading={isAsyncLoading}
                      clearable
                    />
                  </div>
                  <Button 
                    onClick={handleAsyncLoad} 
                    disabled={isAsyncLoading}
                    className="whitespace-nowrap"
                  >
                    {isAsyncLoading ? 'Loading...' : 'Load Data'}
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Status: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {isAsyncLoading ? 'loading...' : asyncValue || 'ready'}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variants */}
        <TabsContent value="variants" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['default', 'filled', 'outlined', 'ghost', 'neon'] as const).map((variant) => (
              <Card key={variant} className={variant === 'neon' ? 'bg-black border-cyan-400' : ''}>
                <CardHeader>
                  <CardTitle className={`capitalize ${variant === 'neon' ? 'text-cyan-400' : ''}`}>
                    {variant} Variant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select
                      options={basicOptions}
                      placeholder={`${variant} select...`}
                      variant={variant}
                    />
                    <Select
                      options={basicOptions}
                      placeholder={`${variant} searchable...`}
                      variant={variant}
                      searchable
                      clearable
                    />
                    <Select
                      options={basicOptions}
                      placeholder={`${variant} disabled...`}
                      variant={variant}
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Advanced Features */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Size Variants</CardTitle>
                <CardDescription>Different sizes for various use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Small</label>
                  <Select
                    options={basicOptions}
                    placeholder="Small select..."
                    size="sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default</label>
                  <Select
                    options={basicOptions}
                    placeholder="Default select..."
                    size="default"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Large</label>
                  <Select
                    options={basicOptions}
                    placeholder="Large select..."
                    size="lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* States */}
            <Card>
              <CardHeader>
                <CardTitle>Component States</CardTitle>
                <CardDescription>Loading, error, and disabled states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loading State</label>
                  <Select
                    options={basicOptions}
                    placeholder="Loading..."
                    loading
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Error State</label>
                  <Select
                    options={basicOptions}
                    placeholder="Error state..."
                    error
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disabled State</label>
                  <Select
                    options={basicOptions}
                    placeholder="Disabled..."
                    disabled
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Search className="w-5 h-5" />, title: 'Intelligent Search', desc: 'Real-time filtering with fuzzy matching' },
              { icon: <Layers className="w-5 h-5" />, title: 'Multi-Selection', desc: 'Advanced tag management system' },
              { icon: <Cloud className="w-5 h-5" />, title: 'Async Loading', desc: 'Seamless data fetching integration' },
              { icon: <Filter className="w-5 h-5" />, title: 'Smart Filtering', desc: 'Context-aware option filtering' },
              { icon: <Settings className="w-5 h-5" />, title: 'Customizable', desc: 'Extensive theming and styling options' },
              { icon: <Shield className="w-5 h-5" />, title: 'Accessible', desc: 'WCAG 2.1 AA compliant' },
              { icon: <Smartphone className="w-5 h-5" />, title: 'Mobile Optimized', desc: 'Touch-friendly interactions' },
              { icon: <Zap className="w-5 h-5" />, title: 'High Performance', desc: 'Virtual scrolling for large datasets' },
              { icon: <Globe className="w-5 h-5" />, title: 'Internationalization', desc: 'Built-in i18n support' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Enterprise Use Cases */}
        <TabsContent value="enterprise" className="space-y-6">
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Enterprise Role Selection
              </CardTitle>
              <CardDescription>
                Hierarchical role management with intelligent categorization and search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-lg">
                <Select
                  options={enterpriseRoles}
                  value={premiumValue}
                  onValueChange={(value) => setPremiumValue(value as string[])}
                  placeholder="Select organizational roles..."
                  multiple
                  searchable
                  clearable
                  variant="outlined"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Selected Roles ({premiumValue.length}):</h4>
                <div className="flex flex-wrap gap-2">
                  {premiumValue.map((roleValue) => {
                    const role = enterpriseRoles.find(r => r.value === roleValue);
                    return role ? (
                      <Badge key={roleValue} variant="premium" className="flex items-center gap-1">
                        {role.icon}
                        {role.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
                
                {premiumValue.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No roles selected. Try searching for "engineer" or "executive".
                  </p>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Enterprise Features
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Hierarchical role categorization</li>
                  <li>• Icon-based visual identification</li>
                  <li>• Smart search across roles and descriptions</li>
                  <li>• Multi-selection with tag management</li>
                  <li>• Accessibility-first design</li>
                  <li>• Enterprise-grade performance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Use Case Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Perfect for HR systems, project management tools, and organizational charts.
                </p>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Features</span>
                  <ul className="text-sm space-y-1">
                    <li>✓ Role hierarchy visualization</li>
                    <li>✓ Permission level indicators</li>
                    <li>✓ Department categorization</li>
                    <li>✓ Bulk assignment capabilities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  System Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Seamlessly integrates with LDAP, Active Directory, and SSO providers.
                </p>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Integrations</span>
                  <ul className="text-sm space-y-1">
                    <li>✓ Active Directory sync</li>
                    <li>✓ SAML/OAuth2 compatible</li>
                    <li>✓ Real-time user updates</li>
                    <li>✓ Audit trail support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Code Examples */}
        <TabsContent value="code" className="space-y-6">
          {Object.entries(codeExamples).map(([key, code]) => (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{key.replace('_', ' ')} Example</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(code)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{code}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* API Reference */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Complete props and methods documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Props Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Props</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3 font-semibold">Prop</th>
                          <th className="text-left p-3 font-semibold">Type</th>
                          <th className="text-left p-3 font-semibold">Default</th>
                          <th className="text-left p-3 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[
                          { prop: 'options', type: 'SelectOption[]', default: '[]', desc: 'Array of selectable options' },
                          { prop: 'value', type: 'string | string[]', default: 'undefined', desc: 'Controlled value' },
                          { prop: 'defaultValue', type: 'string | string[]', default: 'undefined', desc: 'Default uncontrolled value' },
                          { prop: 'placeholder', type: 'string', default: '"Select..."', desc: 'Placeholder text' },
                          { prop: 'onValueChange', type: '(value) => void', default: 'undefined', desc: 'Value change callback' },
                          { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the select' },
                          { prop: 'searchable', type: 'boolean', default: 'false', desc: 'Enable search functionality' },
                          { prop: 'clearable', type: 'boolean', default: 'false', desc: 'Show clear button' },
                          { prop: 'multiple', type: 'boolean', default: 'false', desc: 'Allow multiple selections' },
                          { prop: 'variant', type: 'SelectVariant', default: '"default"', desc: 'Visual variant' },
                          { prop: 'size', type: 'SelectSize', default: '"default"', desc: 'Size variant' },
                          { prop: 'error', type: 'boolean', default: 'false', desc: 'Show error state' },
                          { prop: 'loading', type: 'boolean', default: 'false', desc: 'Show loading state' },
                        ].map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="p-3 font-mono text-sm text-purple-600 dark:text-purple-400">{row.prop}</td>
                            <td className="p-3 font-mono text-sm">{row.type}</td>
                            <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-400">{row.default}</td>
                            <td className="p-3 text-sm">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Types</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">SelectOption</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
{`interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
}`}
                        </pre>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">SelectVariant</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
{`type SelectVariant = 
  | 'default' 
  | 'filled' 
  | 'outlined' 
  | 'ghost' 
  | 'neon'`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Usage Examples */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Advanced Usage</h3>
                  <Card>
                    <CardContent className="p-4">
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
{`// Enterprise team selection with async loading
const TeamSelector = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadTeams = async () => {
    setLoading(true);
    const data = await api.getTeams();
    setTeams(data.map(team => ({
      value: team.id,
      label: team.name,
      icon: <Building className="w-4 h-4" />,
      description: \`\${team.memberCount} members\`
    })));
    setLoading(false);
  };
  
  return (
    <Select
      options={teams}
      onValueChange={handleTeamChange}
      placeholder="Select team..."
      searchable
      multiple
      loading={loading}
      onFocus={loadTeams}
      variant="outlined"
      size="lg"
    />
  );
};`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Installation & Setup */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Installation & Setup
          </CardTitle>
          <CardDescription>
            Get started with the advanced Select component in your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Installation</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm">
                <code>npm install @maw-ui/select framer-motion</code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Import</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm">
                <code>{`import { Select } from '@maw-ui/select'`}</code>
              </pre>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 Pro Tips for Enterprise Usage
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use `searchable` for lists with &gt;10 options</li>
              <li>• Implement virtual scrolling for &gt;1000 items</li>
              <li>• Consider async loading for dynamic data</li>
              <li>• Always provide meaningful descriptions for accessibility</li>
              <li>• Use consistent icons across similar option types</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 