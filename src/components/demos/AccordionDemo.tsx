import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  Shield,
  CreditCard,
  HelpCircle,
  Star,
  Clock,
  Zap,
  Sparkles,
  Layers,
  Info,
  CheckCircle,
  Monitor,
  Code,
  Download,
  Camera,
  Lock,
  Eye,
  Bell,
  Trash2,
  Save
} from 'lucide-react';

// 高度なAccordionコンポーネント（デモ用）
interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  icon?: React.ReactNode;
  badge?: string;
  variant?: 'default' | 'outlined' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  isOpen,
  onToggle,
  icon,
  badge,
  variant = 'default',
  size = 'md',
  disabled = false
}) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const variantClasses = {
    default: 'border border-gray-200 dark:border-gray-700',
    outlined: 'border-2 border-blue-200 dark:border-blue-800',
    filled: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    ghost: 'border-0 shadow-none'
  };

  return (
    <div className={`rounded-lg overflow-hidden transition-all duration-200 ${variantClasses[variant]} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}>
      <button
        onClick={() => !disabled && onToggle(id)}
        className={`
          w-full flex items-center justify-between text-left 
          ${sizeClasses[size]}
          ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}
          <span className="font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
          {badge && (
            <Badge variant="outline" size="sm">
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex-shrink-0 ml-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          )}
        </div>
      </button>
      
      <div
        id={`accordion-content-${id}`}
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className={`${sizeClasses[size]} pt-0 border-t border-gray-100 dark:border-gray-700`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const AccordionDemo: React.FC = () => {
  // State management for different accordion types
  const [basicAccordion, setBasicAccordion] = useState<string[]>(['overview']);
  const [multiAccordion, setMultiAccordion] = useState<string[]>(['features', 'performance']);
  const [faqAccordion, setFaqAccordion] = useState<string[]>([]);
  const [settingsAccordion, setSettingsAccordion] = useState<string[]>([]);

  // Handler for single-expand accordion
  const handleSingleToggle = useCallback((accordionState: string[], setAccordion: (state: string[]) => void) => 
    (id: string) => {
      setAccordion(accordionState.includes(id) ? [] : [id]);
    }, []
  );

  // Handler for multi-expand accordion
  const handleMultiToggle = useCallback((setAccordion: React.Dispatch<React.SetStateAction<string[]>>) => 
    (id: string) => {
      setAccordion((prev: string[]) => 
        prev.includes(id) 
          ? prev.filter((item: string) => item !== id)
          : [...prev, id]
      );
    }, []
  );

  // Form data for settings
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    email: 'john@example.com',
    twoFactor: true,
    notifications: true,
    plan: 'pro'
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Enterprise Accordion System</Badge>
              <Sparkles className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Next-Gen Accordion Components
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionary collapsible content system with advanced animations, 
              intelligent state management, and enterprise-grade accessibility that surpasses industry standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎯</div>
                <div className="text-white/80 text-sm">Smart Expansion</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⚡</div>
                <div className="text-white/80 text-sm">Smooth Animations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🔧</div>
                <div className="text-white/80 text-sm">Multi-Variant</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">♿</div>
                <div className="text-white/80 text-sm">WCAG 2.1 AA</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Single Expand Accordion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AccordionItem
              id="overview"
              title="Component Overview"
              isOpen={basicAccordion.includes('overview')}
              onToggle={handleSingleToggle(basicAccordion, setBasicAccordion)}
              icon={<Info className="w-5 h-5" />}
              badge="Essential"
            >
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our accordion component is designed with enterprise-grade features including 
                  smooth animations, keyboard navigation, and comprehensive accessibility support. 
                  Built with modern React patterns and optimized for performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-blue-500 mb-2" />
                    <h4 className="font-semibold mb-1">Accessible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">WCAG 2.1 compliant</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <Zap className="w-6 h-6 text-green-500 mb-2" />
                    <h4 className="font-semibold mb-1">Performant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Optimized animations</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <Settings className="w-6 h-6 text-purple-500 mb-2" />
                    <h4 className="font-semibold mb-1">Customizable</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multiple variants</p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="features"
              title="Advanced Features"
              isOpen={basicAccordion.includes('features')}
              onToggle={handleSingleToggle(basicAccordion, setBasicAccordion)}
              icon={<Star className="w-5 h-5" />}
              badge="Premium"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Core Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Single & Multi-expand modes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Smooth CSS animations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Keyboard navigation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Custom icons and badges</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Advanced Options</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Multiple size variants</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Disabled states</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Controlled & uncontrolled</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>TypeScript support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="usage"
              title="Usage Examples"
              isOpen={basicAccordion.includes('usage')}
              onToggle={handleSingleToggle(basicAccordion, setBasicAccordion)}
              icon={<Code className="w-5 h-5" />}
            >
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`import { Accordion } from '@maw-ui/components';

function MyComponent() {
  const [openItems, setOpenItems] = useState(['item1']);

  return (
    <Accordion
      items={accordionItems}
      openItems={openItems}
      onToggle={setOpenItems}
      variant="outlined"
      size="lg"
    />
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </AccordionItem>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Expand Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Advanced</Badge>
            Multi-Expand Accordion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AccordionItem
              id="features"
              title="Interactive Features"
              isOpen={multiAccordion.includes('features')}
              onToggle={handleMultiToggle(setMultiAccordion)}
              icon={<Sparkles className="w-5 h-5" />}
              variant="outlined"
            >
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Experience multiple panels open simultaneously with independent state management.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="success">Multi-State</Badge>
                  <Badge variant="premium">Enterprise</Badge>
                  <Badge variant="neon">Interactive</Badge>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="performance"
              title="Performance Optimization"
              isOpen={multiAccordion.includes('performance')}
              onToggle={handleMultiToggle(setMultiAccordion)}
              icon={<Zap className="w-5 h-5" />}
              variant="outlined"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Rendering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Optimized with React.memo and callback memoization for minimal re-renders
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Animations
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hardware-accelerated CSS transitions for 60fps smooth animations
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="accessibility"
              title="Accessibility Standards"
              isOpen={multiAccordion.includes('accessibility')}
              onToggle={handleMultiToggle(setMultiAccordion)}
              icon={<Shield className="w-5 h-5" />}
              variant="outlined"
            >
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">WCAG 2.1 AA Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Keyboard navigation (Space/Enter)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Focus management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Screen reader support</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>ARIA attributes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>High contrast support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Reduced motion respect</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">FAQ</Badge>
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AccordionItem
              id="faq-getting-started"
              title="How do I get started with the component library?"
              isOpen={faqAccordion.includes('faq-getting-started')}
              onToggle={handleSingleToggle(faqAccordion, setFaqAccordion)}
              icon={<HelpCircle className="w-5 h-5" />}
              variant="filled"
            >
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Begin by installing the library via your preferred package manager:
                </p>
                <div className="bg-gray-900 rounded-lg p-3 text-sm">
                  <code className="text-green-400">npm install @maw-ui/components</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Then import the components you need and check our comprehensive documentation 
                  for detailed setup instructions and best practices.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              id="faq-customization"
              title="Can I customize the component styles and themes?"
              isOpen={faqAccordion.includes('faq-customization')}
              onToggle={handleSingleToggle(faqAccordion, setFaqAccordion)}
              icon={<Settings className="w-5 h-5" />}
              variant="filled"
            >
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! Our components are built with maximum flexibility:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Tailwind CSS integration with custom themes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>CSS variables for easy theming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Custom variant system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Dark mode support out of the box</span>
                  </li>
                </ul>
              </div>
            </AccordionItem>

            <AccordionItem
              id="faq-typescript"
              title="Does the library support TypeScript?"
              isOpen={faqAccordion.includes('faq-typescript')}
              onToggle={handleSingleToggle(faqAccordion, setFaqAccordion)}
              icon={<Code className="w-5 h-5" />}
              variant="filled"
            >
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! The entire library is written in TypeScript with comprehensive type definitions:
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span>Full IntelliSense support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span>Type safety for all props</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span>Generic component types</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span>Exported type definitions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="faq-performance"
              title="How is performance optimized for large applications?"
              isOpen={faqAccordion.includes('faq-performance')}
              onToggle={handleSingleToggle(faqAccordion, setFaqAccordion)}
              icon={<Zap className="w-5 h-5" />}
              variant="filled"
            >
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Performance is a core focus with enterprise-grade optimizations:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-semibold">Bundle Optimization</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Tree-shaking support</li>
                      <li>• Code splitting ready</li>
                      <li>• Minimal dependencies</li>
                      <li>• Gzip optimized</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-semibold">Runtime Performance</h5>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>• React.memo optimization</li>
                      <li>• Callback memoization</li>
                      <li>• Lazy loading support</li>
                      <li>• Virtual scrolling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>
        </CardContent>
      </Card>

      {/* Settings Panel Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Interactive</Badge>
            Settings Management Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AccordionItem
              id="profile-settings"
              title="Profile & Account"
              isOpen={settingsAccordion.includes('profile-settings')}
              onToggle={handleMultiToggle(setSettingsAccordion)}
              icon={<User className="w-5 h-5" />}
              size="lg"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Display Name
                    </label>
                    <Input
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Enter your display name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500">Recommended: 256x256px, PNG or JPG</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="ghost">Cancel</Button>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="security-settings"
              title="Security & Privacy"
              isOpen={settingsAccordion.includes('security-settings')}
              onToggle={handleMultiToggle(setSettingsAccordion)}
              icon={<Shield className="w-5 h-5" />}
              size="lg"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Authentication</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Enhanced security for your account</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                          className={`
                            relative w-11 h-6 rounded-full transition-colors duration-200
                            ${formData.twoFactor ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                          `}
                        >
                          <div className={`
                            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                            ${formData.twoFactor ? 'translate-x-5' : 'translate-x-0'}
                          `} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Login Notifications</p>
                            <p className="text-sm text-gray-500">Get notified of new sign-ins</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, notifications: !prev.notifications }))}
                          className={`
                            relative w-11 h-6 rounded-full transition-colors duration-200
                            ${formData.notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                          `}
                        >
                          <div className={`
                            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                            ${formData.notifications ? 'translate-x-5' : 'translate-x-0'}
                          `} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Privacy</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        View Data Usage
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              id="billing-settings"
              title="Billing & Subscription"
              isOpen={settingsAccordion.includes('billing-settings')}
              onToggle={handleMultiToggle(setSettingsAccordion)}
              icon={<CreditCard className="w-5 h-5" />}
              size="lg"
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">Pro Plan</h4>
                      <p className="text-gray-600 dark:text-gray-400">Advanced features for professionals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$29<span className="text-sm font-normal">/month</span></p>
                      <Badge variant="success" size="sm">Active</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">∞</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">API Requests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">24/7</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Support</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">100GB</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Storage</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline">
                    Change Plan
                  </Button>
                  <Button variant="ghost">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </AccordionItem>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Developer API</Badge>
            Enterprise Accordion Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Advanced Usage Examples</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`import { Accordion } from '@maw-ui/components';

// Single expand accordion
<Accordion
  mode="single"
  openItems={openItems}
  onToggle={handleToggle}
  variant="outlined"
  size="lg"
>
  <Accordion.Item 
    id="item1" 
    title="Advanced Features"
    icon={<Star />}
    badge="Premium"
  >
    <p>Content goes here...</p>
  </Accordion.Item>
</Accordion>

// Multi-expand with custom styling
<Accordion
  mode="multiple"
  openItems={multipleItems}
  onToggle={handleMultiToggle}
  className="custom-accordion"
  animationDuration={300}
>
  {accordionData.map(item => (
    <Accordion.Item key={item.id} {...item}>
      {item.content}
    </Accordion.Item>
  ))}
</Accordion>`}</code>
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Component Props</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">mode</code>
                    <span className="text-gray-600 dark:text-gray-400">single | multiple</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">variant</code>
                    <span className="text-gray-600 dark:text-gray-400">default | outlined | filled | ghost</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">size</code>
                    <span className="text-gray-600 dark:text-gray-400">sm | md | lg</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">disabled</code>
                    <span className="text-gray-600 dark:text-gray-400">boolean</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Enterprise Features</h4>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>WCAG 2.1 AA accessibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Keyboard navigation support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Smooth CSS animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>TypeScript full support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Customizable theming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Performance optimized</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccordionDemo; 