import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
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
  Percent,
  Star,
  CheckCircle,
  AlertCircle,
  Zap,
  Sparkles,
  Shield,
  Fingerprint,
  Palette,
  Headphones,
  MessageSquare,
  MapPin,
  Building
} from 'lucide-react';

export const InputDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    amount: '',
    search: '',
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    address: '',
    city: '',
    zipCode: '',
    bio: ''
  });

  const [validationStates] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string>('');
  const [typingAnimation, setTypingAnimation] = useState('');

  // Animated typing effect for demo
  useEffect(() => {
    const messages = [
      'Enter your email address...',
      'Type your password securely...',
      'Search for anything...',
      'Input your information...'
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    const typeWriter = () => {
      const currentMessage = messages[messageIndex];
      
      if (isDeleting) {
        setTypingAnimation(currentMessage.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingAnimation(currentMessage.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFieldFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Next-Generation Input Components</Badge>
              <Zap className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Intelligent Input System
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience the future of form interactions with AI-powered validation,
              premium animations, and enterprise-grade security features.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-md mx-auto">
              <p className="text-white/80 text-sm mb-2">Live Typing Demo:</p>
              <div className="font-mono text-white h-6 flex items-center">
                {typingAnimation}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Variants Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Variants</Badge>
            Premium Input Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                  Default Input
                </label>
                <Input
                  type="text"
                  placeholder="Enter your text..."
                  leftIcon={<User />}
                  variant="default"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                  Outlined Input
                </label>
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  leftIcon={<Mail />}
                  variant="outlined"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                  Filled Input
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  leftIcon={<Phone />}
                  variant="filled"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                  Floating Label
                </label>
                <Input
                  type="text"
                  label="Company Name"
                  leftIcon={<Building />}
                  variant="default"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-cyan-300">
                  Neon Input
                </label>
                <Input
                  type="text"
                  placeholder="Cyberpunk mode activated..."
                  leftIcon={<Zap />}
                  variant="neon"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Glass Morphism
                </label>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg">
                  <Input
                    type="text"
                    placeholder="Glass effect input..."
                    leftIcon={<Sparkles />}
                    variant="glass"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Gradient Input
                </label>
                <Input
                  type="text"
                  placeholder="Premium gradient style..."
                  leftIcon={<Palette />}
                  variant="gradient"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-amber-700 dark:text-amber-300">
                  Premium Gold
                </label>
                <Input
                  type="text"
                  placeholder="Luxury experience..."
                  leftIcon={<Star />}
                  variant="default"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Form Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Interactive</Badge>
            Smart Form Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  leftIcon={<Mail />}
                  clearable
                  onFocus={() => handleFieldFocus('email')}
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  leftIcon={<Lock />}
                  onFocus={() => handleFieldFocus('password')}
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  leftIcon={<Shield />}
                  onFocus={() => handleFieldFocus('confirmPassword')}
                />
              </div>

              <div>
                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  leftIcon={<Phone />}
                  onFocus={() => handleFieldFocus('phone')}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Input
                  type="url"
                  label="Website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  leftIcon={<Globe />}
                  onFocus={() => handleFieldFocus('website')}
                />
              </div>

              <div>
                <Input
                  type="currency"
                  label="Budget"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  leftIcon={<DollarSign />}
                  onFocus={() => handleFieldFocus('amount')}
                />
              </div>

              <div>
                <Input
                  type="search"
                  label="Search"
                  placeholder="Search anything..."
                  value={formData.search}
                  onChange={(e) => handleInputChange('search', e.target.value)}
                  leftIcon={<Search />}
                  clearable
                  onFocus={() => handleFieldFocus('search')}
                  variant="neon"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Current Focus: <span className="font-mono text-blue-600 dark:text-blue-400">{focusedField || 'None'}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Validation Status: 
                  <span className="ml-2">
                    {Object.entries(validationStates).map(([field, isValid]) => (
                      <span key={field} className="inline-flex items-center gap-1 mr-2">
                        {isValid ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                        {field}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Input Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Specialized</Badge>
            Specialized Input Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Financial
              </h3>
              
              <Input
                type="currency"
                label="Amount"
                placeholder="0.00"
                leftIcon={<DollarSign />}
                size="lg"
              />

              <Input
                type="percentage"
                label="Interest Rate"
                placeholder="5.25"
                leftIcon={<Percent />}
              />

              <Input
                type="text"
                label="Credit Card Number"
                placeholder="1234 5678 9012 3456"
                leftIcon={<CreditCard />}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date & Time
              </h3>
              
              <Input
                type="date"
                label="Birth Date"
                leftIcon={<Calendar />}
              />

              <Input
                type="time"
                label="Meeting Time"
                leftIcon={<Calendar />}
              />

              <Input
                type="datetime-local"
                label="Event DateTime"
                leftIcon={<Calendar />}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communication
              </h3>
              
              <Input
                type="email"
                label="Support Email"
                placeholder="support@company.com"
                leftIcon={<Headphones />}
              />

              <Input
                type="tel"
                label="Emergency Contact"
                placeholder="+1 (911) 123-4567"
                leftIcon={<Phone />}
              />

              <Input
                type="text"
                label="Address"
                placeholder="123 Main St, City, State"
                leftIcon={<MapPin />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Advanced</Badge>
            Enterprise Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" />
                  Security Features
                </h3>
                
                <Input
                  type="password"
                  label="Enterprise Password"
                  placeholder="Enter secure password"
                  leftIcon={<Lock />}
                />

                <Input
                  type="text"
                  label="API Secret Key"
                  placeholder="sk-..."
                  leftIcon={<Zap />}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Rich Interactions
                </h3>
                
                <Input
                  type="text"
                  label="AI-Powered Search"
                  placeholder="Ask anything..."
                  leftIcon={<Search />}
                  rightIcon={<Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />}
                  variant="default"
                  size="lg"
                  clearable
                  loading={false}
                />

                <Input
                  type="text"
                  label="Smart Autocomplete"
                  placeholder="Start typing for suggestions..."
                  leftIcon={<MessageSquare />}
                  variant="filled"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Input Component Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive form input capabilities
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">12+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Input Types</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Variants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">4</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sizes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">A11Y</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accessible</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputDemo; 