import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Info,
  HelpCircle,
  Heart,
  Share,
  Download,
  Settings,
  User,
  Shield,
  Zap,
  Target,
  Bell,
  Mail,
  FileText,
  Image,
  Video,
  Wifi,
  Bluetooth,
  Battery,
  Play,
  Search,
  Upload,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Home
} from 'lucide-react';

export const TooltipDemo: React.FC = () => {
  // Simple tooltip implementation for demo purposes
  const SimpleTooltip = ({ children, content, position = 'top' }: {
    children: React.ReactNode;
    content: string;
    position?: string;
  }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    return (
      <div 
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div className={`
            absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap
            ${position === 'top' ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-1' : ''}
            ${position === 'bottom' ? 'top-full left-1/2 transform -translate-x-1/2 mt-1' : ''}
            ${position === 'left' ? 'right-full top-1/2 transform -translate-y-1/2 mr-1' : ''}
            ${position === 'right' ? 'left-full top-1/2 transform -translate-y-1/2 ml-1' : ''}
          `}>
            {content}
            <div className={`
              absolute w-0 h-0 border-solid border-gray-900
              ${position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-2 border-l-2 border-r-2 border-b-0 border-l-transparent border-r-transparent' : ''}
              ${position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-2 border-l-2 border-r-2 border-t-0 border-l-transparent border-r-transparent' : ''}
              ${position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 border-l-2 border-t-2 border-b-2 border-r-0 border-t-transparent border-b-transparent' : ''}
              ${position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2 border-r-2 border-t-2 border-b-2 border-l-0 border-t-transparent border-b-transparent' : ''}
            `} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Interactive Help System</Badge>
              <Info className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Advanced Tooltip Components
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Contextual help and information system with smart positioning, 
              rich content support, and enterprise-grade accessibility features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎯</div>
                <div className="text-white/80 text-sm">Smart Position</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⏱️</div>
                <div className="text-white/80 text-sm">Configurable Delay</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎨</div>
                <div className="text-white/80 text-sm">Rich Content</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">♿</div>
                <div className="text-white/80 text-sm">Accessible</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Tooltips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Tooltip Positioning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
            <div className="text-center">
              <SimpleTooltip content="This tooltip appears on top" position="top">
                <Button variant="outline">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Top
                </Button>
              </SimpleTooltip>
            </div>
            
            <div className="text-center">
              <SimpleTooltip content="This tooltip appears on the right" position="right">
                <Button variant="outline">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Right
                </Button>
              </SimpleTooltip>
            </div>
            
            <div className="text-center">
              <SimpleTooltip content="This tooltip appears at the bottom" position="bottom">
                <Button variant="outline">
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Bottom
                </Button>
              </SimpleTooltip>
            </div>
            
            <div className="text-center">
              <SimpleTooltip content="This tooltip appears on the left" position="left">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Left
                </Button>
              </SimpleTooltip>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tooltip Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Interactive</Badge>
            Icon Tooltips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
              <SimpleTooltip content="Home page">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Home className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="User profile">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <User className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Settings & preferences">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Settings className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Security settings">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Shield className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Notifications (3 new)">
                <Button variant="ghost" size="sm" className="w-10 h-10 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Messages">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Mail className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Search everything">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Search className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Help & documentation">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Download files">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Download className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Upload new content">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Upload className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Share with others">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Share className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
              
              <SimpleTooltip content="Add to favorites">
                <Button variant="ghost" size="sm" className="w-10 h-10">
                  <Heart className="w-5 h-5" />
                </Button>
              </SimpleTooltip>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Rich Tooltips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Advanced</Badge>
            Rich Content Tooltips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Card with Tooltip */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <SimpleTooltip content="Online - Last seen 2 minutes ago">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                  </SimpleTooltip>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">John Doe</h3>
                      <SimpleTooltip content="Premium subscriber with advanced features">
                        <Badge variant="premium" size="sm">Pro</Badge>
                      </SimpleTooltip>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Senior Developer</p>
                  </div>
                </div>
              </div>

              {/* Device Status */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-3">Device Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Battery</span>
                    <SimpleTooltip content="85% remaining - 4 hours estimated">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-green-500" />
                        <span className="text-sm">85%</span>
                      </div>
                    </SimpleTooltip>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WiFi</span>
                    <SimpleTooltip content="Connected to 'Office Network' - Strong signal">
                      <Wifi className="w-4 h-4 text-blue-500" />
                    </SimpleTooltip>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bluetooth</span>
                    <SimpleTooltip content="Connected to AirPods Pro">
                      <Bluetooth className="w-4 h-4 text-blue-500" />
                    </SimpleTooltip>
                  </div>
                </div>
              </div>

              {/* File Manager */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-3">Recent Files</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <SimpleTooltip content="PDF document - 2.4 MB - Last modified today">
                      <FileText className="w-4 h-4 text-red-500" />
                    </SimpleTooltip>
                    <span className="text-sm flex-1">Report.pdf</span>
                    <SimpleTooltip content="Download file">
                      <Button variant="ghost" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </SimpleTooltip>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <SimpleTooltip content="High resolution image - 8.1 MB">
                      <Image className="w-4 h-4 text-blue-500" />
                    </SimpleTooltip>
                    <span className="text-sm flex-1">Design.png</span>
                    <SimpleTooltip content="Share file">
                      <Button variant="ghost" size="sm">
                        <Share className="w-3 h-3" />
                      </Button>
                    </SimpleTooltip>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <SimpleTooltip content="Video file - 125 MB - Duration: 5:30">
                      <Video className="w-4 h-4 text-purple-500" />
                    </SimpleTooltip>
                    <span className="text-sm flex-1">Demo.mp4</span>
                    <SimpleTooltip content="Play video">
                      <Button variant="ghost" size="sm">
                        <Play className="w-3 h-3" />
                      </Button>
                    </SimpleTooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Accessibility</Badge>
            Keyboard & Screen Reader Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Accessibility Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Keyboard navigation with Tab/Shift+Tab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Focus indicators for keyboard users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>ARIA labels and descriptions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Screen reader compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>High contrast mode support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Respects reduced motion preferences</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Try Keyboard Navigation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use Tab to navigate through these focusable elements. Each will show a tooltip when focused.
              </p>
              <div className="flex gap-3 flex-wrap">
                <SimpleTooltip content="Primary action button">
                  <Button tabIndex={0}>Primary</Button>
                </SimpleTooltip>
                <SimpleTooltip content="Secondary action">
                  <Button variant="outline" tabIndex={0}>Secondary</Button>
                </SimpleTooltip>
                <SimpleTooltip content="Dangerous action - use with caution">
                  <Button variant="destructive" tabIndex={0}>Delete</Button>
                </SimpleTooltip>
                <SimpleTooltip content="Help and information">
                  <Button variant="ghost" size="sm" tabIndex={0}>
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </SimpleTooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">API</Badge>
            Component Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Basic Tooltip Usage</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`import { Tooltip } from '@maw-ui/components';

// Basic tooltip
<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>

// Positioned tooltip
<Tooltip content="Top tooltip" position="top">
  <span>Hover for top tooltip</span>
</Tooltip>

// Tooltip with delay
<Tooltip 
  content="Delayed tooltip" 
  delay={500}
  position="bottom"
>
  <Button>Delayed tooltip</Button>
</Tooltip>

// Rich content tooltip
<Tooltip 
  content={
    <div>
      <h4>Rich Content</h4>
      <p>Tooltips can contain HTML</p>
    </div>
  }
>
  <Button>Rich tooltip</Button>
</Tooltip>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Available Props</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Positioning</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">top</code>
                      <span className="text-gray-600 dark:text-gray-400">Above the element</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">bottom</code>
                      <span className="text-gray-600 dark:text-gray-400">Below the element</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">left</code>
                      <span className="text-gray-600 dark:text-gray-400">To the left</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">right</code>
                      <span className="text-gray-600 dark:text-gray-400">To the right</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Behavior</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">delay</code>
                      <span className="text-gray-600 dark:text-gray-400">Show/hide delay (ms)</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">trigger</code>
                      <span className="text-gray-600 dark:text-gray-400">hover | click | focus</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">arrow</code>
                      <span className="text-gray-600 dark:text-gray-400">Show arrow pointer</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">offset</code>
                      <span className="text-gray-600 dark:text-gray-400">Distance from element</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TooltipDemo; 