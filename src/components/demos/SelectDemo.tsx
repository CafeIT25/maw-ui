import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Users, 
  Star, 
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Sparkles,
  Palette,
  Target,
  Settings,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  Database,
  Server,
  Cloud,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Heart,
  Eye,
  Download
} from 'lucide-react';

export const SelectDemo: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string | string[]>>({
    country: '',
    cities: [],
    skills: [],
    priorities: [],
    tools: []
  });

  // Sample data for different categories
  const countries = [
    { value: 'us', label: 'United States', icon: '🇺🇸' },
    { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
    { value: 'jp', label: 'Japan', icon: '🇯🇵' },
    { value: 'de', label: 'Germany', icon: '🇩🇪' },
    { value: 'fr', label: 'France', icon: '🇫🇷' },
    { value: 'ca', label: 'Canada', icon: '🇨🇦' },
    { value: 'au', label: 'Australia', icon: '🇦🇺' },
    { value: 'sg', label: 'Singapore', icon: '🇸🇬' }
  ];

  const cities = [
    { value: 'ny', label: 'New York', description: 'The Big Apple' },
    { value: 'sf', label: 'San Francisco', description: 'Tech Hub' },
    { value: 'london', label: 'London', description: 'Financial Center' },
    { value: 'tokyo', label: 'Tokyo', description: 'Modern Metropolis' },
    { value: 'berlin', label: 'Berlin', description: 'Cultural Capital' },
    { value: 'paris', label: 'Paris', description: 'City of Light' },
    { value: 'toronto', label: 'Toronto', description: 'Diverse City' },
    { value: 'sydney', label: 'Sydney', description: 'Harbor City' }
  ];

  const skills = [
    { value: 'react', label: 'React', icon: <Zap className="w-4 h-4" /> },
    { value: 'typescript', label: 'TypeScript', icon: <Sparkles className="w-4 h-4" /> },
    { value: 'nodejs', label: 'Node.js', icon: <Server className="w-4 h-4" /> },
    { value: 'python', label: 'Python', icon: <Cpu className="w-4 h-4" /> },
    { value: 'design', label: 'UI/UX Design', icon: <Palette className="w-4 h-4" /> },
    { value: 'aws', label: 'AWS', icon: <Cloud className="w-4 h-4" /> },
    { value: 'docker', label: 'Docker', icon: <Database className="w-4 h-4" /> },
    { value: 'kubernetes', label: 'Kubernetes', icon: <Settings className="w-4 h-4" /> }
  ];

  const devices = [
    { value: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
    { value: 'tablet', label: 'Tablet', icon: <Tablet className="w-4 h-4" /> },
    { value: 'laptop', label: 'Laptop', icon: <Laptop className="w-4 h-4" /> },
    { value: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4" /> }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', icon: '🔴' },
    { value: 'medium', label: 'Medium Priority', icon: '🟡' },
    { value: 'low', label: 'Low Priority', icon: '🟢' },
    { value: 'urgent', label: 'Urgent', icon: '🚨' }
  ];

  const analytics = [
    { value: 'views', label: 'Page Views', icon: <Eye className="w-4 h-4" /> },
    { value: 'users', label: 'Active Users', icon: <Users className="w-4 h-4" /> },
    { value: 'engagement', label: 'Engagement Rate', icon: <Heart className="w-4 h-4" /> },
    { value: 'conversion', label: 'Conversion Rate', icon: <Target className="w-4 h-4" /> },
    { value: 'revenue', label: 'Revenue', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'performance', label: 'Performance', icon: <Activity className="w-4 h-4" /> }
  ];

  const handleSelectChange = (key: string, value: string | string[]) => {
    setSelectedValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Filter className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Next-Generation Select Components</Badge>
              <Target className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Intelligent Selection System
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience advanced selection components with smart search, 
              multi-selection, rich icons, and enterprise-grade performance.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">5</div>
                <div className="text-white/80 text-sm">Variants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">3</div>
                <div className="text-white/80 text-sm">Sizes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">Multi</div>
                <div className="text-white/80 text-sm">Selection</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">Search</div>
                <div className="text-white/80 text-sm">Enabled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Variants</Badge>
            Select Variants & Styles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Default Select</label>
                <Select
                  options={countries}
                  placeholder="Choose your country..."
                  variant="default"
                  value={selectedValues.country}
                  onValueChange={(value) => handleSelectChange('country', value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Filled Select</label>
                <Select
                  options={devices}
                  placeholder="Select device type..."
                  variant="filled"
                  value={selectedValues.device}
                  onValueChange={(value) => handleSelectChange('device', value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Outlined Select</label>
                <Select
                  options={priorities}
                  placeholder="Set priority level..."
                  variant="outlined"
                  value={selectedValues.priority}
                  onValueChange={(value) => handleSelectChange('priority', value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Ghost Select</label>
                <Select
                  options={cities}
                  placeholder="Select a city..."
                  variant="ghost"
                  value={selectedValues.city}
                  onValueChange={(value) => handleSelectChange('city', value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-cyan-300">Neon Select</label>
                <Select
                  options={skills}
                  placeholder="Choose your skills..."
                  variant="neon"
                  value={selectedValues.skill}
                  onValueChange={(value) => handleSelectChange('skill', value)}
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Selected Values:
                </p>
                <pre className="text-xs bg-white dark:bg-gray-900 p-2 rounded overflow-auto">
                  {JSON.stringify(selectedValues, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Advanced</Badge>
            Multi-Selection & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Multiple Cities Selection
                </label>
                <Select
                  options={cities}
                  placeholder="Select multiple cities..."
                  multiple
                  searchable
                  clearable
                  value={selectedValues.cities}
                  onValueChange={(value) => handleSelectChange('cities', value)}
                  size="lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Search and select multiple cities for your campaign
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Searchable Skills
                </label>
                <Select
                  options={skills}
                  placeholder="Search and select skills..."
                  multiple
                  searchable
                  clearable
                  value={selectedValues.skills}
                  onValueChange={(value) => handleSelectChange('skills', value)}
                  variant="filled"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Type to filter through hundreds of technical skills
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Priority Management
                </label>
                <Select
                  options={priorities}
                  placeholder="Set task priorities..."
                  multiple
                  value={selectedValues.priorities}
                  onValueChange={(value) => handleSelectChange('priorities', value)}
                  variant="outlined"
                  clearable
                />
                <p className="text-xs text-gray-500 mt-1">
                  Organize tasks by priority levels
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Development Tools
                </label>
                <Select
                  options={[
                    { value: 'vscode', label: 'VS Code', icon: <Zap className="w-4 h-4" /> },
                    { value: 'webstorm', label: 'WebStorm', icon: <Sparkles className="w-4 h-4" /> },
                    { value: 'sublime', label: 'Sublime Text', icon: <Star className="w-4 h-4" /> },
                    { value: 'atom', label: 'Atom', icon: <Award className="w-4 h-4" /> },
                    { value: 'vim', label: 'Vim', icon: <Shield className="w-4 h-4" /> },
                    { value: 'emacs', label: 'Emacs', icon: <Cpu className="w-4 h-4" /> }
                  ]}
                  placeholder="Choose your tools..."
                  multiple
                  searchable
                  value={selectedValues.tools}
                  onValueChange={(value) => handleSelectChange('tools', value)}
                  variant="ghost"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select your preferred development environment
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Analytics Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Dashboard</Badge>
            Analytics Dashboard Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select
                  options={[
                    { value: '24h', label: 'Last 24 Hours', icon: <Clock className="w-4 h-4" /> },
                    { value: '7d', label: 'Last 7 Days', icon: <Calendar className="w-4 h-4" /> },
                    { value: '30d', label: 'Last 30 Days', icon: <Calendar className="w-4 h-4" /> },
                    { value: '90d', label: 'Last 90 Days', icon: <Calendar className="w-4 h-4" /> },
                    { value: 'custom', label: 'Custom Range', icon: <Settings className="w-4 h-4" /> }
                  ]}
                  placeholder="Select time range..."
                  size="sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Metrics</label>
                <Select
                  options={analytics}
                  placeholder="Choose metrics..."
                  multiple
                  size="sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Chart Type</label>
                <Select
                  options={[
                    { value: 'line', label: 'Line Chart', icon: <TrendingUp className="w-4 h-4" /> },
                    { value: 'bar', label: 'Bar Chart', icon: <BarChart3 className="w-4 h-4" /> },
                    { value: 'pie', label: 'Pie Chart', icon: <PieChart className="w-4 h-4" /> },
                    { value: 'area', label: 'Area Chart', icon: <Activity className="w-4 h-4" /> }
                  ]}
                  placeholder="Chart type..."
                  size="sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Export</label>
                <Select
                  options={[
                    { value: 'pdf', label: 'PDF', icon: <Download className="w-4 h-4" /> },
                    { value: 'excel', label: 'Excel', icon: <Download className="w-4 h-4" /> },
                    { value: 'csv', label: 'CSV', icon: <Download className="w-4 h-4" /> },
                    { value: 'json', label: 'JSON', icon: <Download className="w-4 h-4" /> }
                  ]}
                  placeholder="Export format..."
                  size="sm"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Select Component Features</h3>
                <Badge variant="success">Ready</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">Icons</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rich Icons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Search</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Searchable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">Clear</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clearable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">A11Y</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accessible</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Enterprise</Badge>
            Enterprise-Grade Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Compliance
                </h3>
                
                <div className="space-y-4">
                  <Select
                    options={[
                      { value: 'gdpr', label: 'GDPR Compliant', icon: <Shield className="w-4 h-4" /> },
                      { value: 'hipaa', label: 'HIPAA Certified', icon: <Shield className="w-4 h-4" /> },
                      { value: 'soc2', label: 'SOC 2 Type II', icon: <Award className="w-4 h-4" /> },
                      { value: 'iso27001', label: 'ISO 27001', icon: <Star className="w-4 h-4" /> }
                    ]}
                    placeholder="Select compliance standards..."
                    multiple
                    searchable
                    variant="outlined"
                  />

                  <Select
                    options={[
                      { value: 'admin', label: 'Administrator', description: 'Full system access' },
                      { value: 'manager', label: 'Manager', description: 'Team management' },
                      { value: 'user', label: 'User', description: 'Basic access' },
                      { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
                    ]}
                    placeholder="Assign user role..."
                    searchable
                    variant="filled"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Performance & Scale
                </h3>
                
                <div className="space-y-4">
                  <Select
                    options={[
                      { value: 'us-east-1', label: 'US East (Virginia)', icon: <Server className="w-4 h-4" /> },
                      { value: 'us-west-2', label: 'US West (Oregon)', icon: <Server className="w-4 h-4" /> },
                      { value: 'eu-west-1', label: 'EU West (Ireland)', icon: <Server className="w-4 h-4" /> },
                      { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', icon: <Server className="w-4 h-4" /> },
                      { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)', icon: <Server className="w-4 h-4" /> }
                    ]}
                    placeholder="Select deployment region..."
                    searchable
                    variant="neon"
                  />

                  <Select
                    options={[
                      { value: 't3.micro', label: 't3.micro (1 vCPU, 1GB RAM)', description: 'Basic workloads' },
                      { value: 't3.small', label: 't3.small (2 vCPU, 2GB RAM)', description: 'Light production' },
                      { value: 'm5.large', label: 'm5.large (2 vCPU, 8GB RAM)', description: 'General purpose' },
                      { value: 'c5.xlarge', label: 'c5.xlarge (4 vCPU, 8GB RAM)', description: 'Compute optimized' },
                      { value: 'r5.2xlarge', label: 'r5.2xlarge (8 vCPU, 64GB RAM)', description: 'Memory optimized' }
                    ]}
                    placeholder="Choose instance type..."
                    searchable
                    variant="ghost"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Usage Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Best practices for Select component implementation
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm">Multi-Selection</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use multiple selection for categories, tags, and skill sets
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-sm">Search Feature</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enable search for lists with more than 7 options
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">Variants</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose variants based on your design system theme
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectDemo; 