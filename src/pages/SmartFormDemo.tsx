import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Rocket, 
  Heart, 
  Shield, 
  Target, 
  User,
  CreditCard,
  Eye,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  Layers,
  Wand2,
  BookOpen,
  Briefcase,
  GraduationCap,
  Coffee
} from 'lucide-react';
import { SmartForm, type SmartFormConfig } from '../components/ui/SmartForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const SmartFormDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<string>('registration');
  const [formResults, setFormResults] = useState<Record<string, Record<string, unknown>>>({});
  const [animationKey, setAnimationKey] = useState(0);

  // フォーム送信結果をリセット
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedDemo]);

  // ユーザー登録フォーム設定
  const registrationFormConfig: SmartFormConfig = {
    id: 'user-registration',
    title: '✨ Next-Gen User Registration',
    description: 'Experience the future of form interaction with AI-powered assistance and smart validation.',
    showProgress: true,
    aiAssistance: true,
    autoSave: true,
    fields: [
      {
        id: 'avatar',
        type: 'file',
        label: 'Profile Picture',
        description: 'Upload your profile picture (optional)',
        accept: 'image/*',
        aiSuggestions: false
      },
      {
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
        aiSuggestions: true,
        smartValidation: true,
        validation: [
          { type: 'required', message: 'First name is required' },
          { type: 'minLength', value: 2, message: 'First name must be at least 2 characters' }
        ]
      },
      {
        id: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true,
        validation: [
          { type: 'required', message: 'Last name is required' },
          { type: 'minLength', value: 2, message: 'Last name must be at least 2 characters' }
        ]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        required: true,
        aiSuggestions: true,
        smartValidation: true,
        validation: [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]
      },
      {
        id: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Create a strong password',
        required: true,
        description: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        validation: [
          { type: 'required', message: 'Password is required' },
          { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
          { 
            type: 'pattern', 
            value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$',
            message: 'Password must contain uppercase, lowercase, and numbers'
          }
        ]
      },
      {
        id: 'birthDate',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        validation: [
          { type: 'required', message: 'Date of birth is required' }
        ]
      },
      {
        id: 'interests',
        type: 'multiselect',
        label: 'Interests',
        description: 'Select your areas of interest',
        options: [
          { value: 'technology', label: 'Technology', icon: <Code className="w-4 h-4" /> },
          { value: 'design', label: 'Design', icon: <Palette className="w-4 h-4" /> },
          { value: 'business', label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
          { value: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
          { value: 'lifestyle', label: 'Lifestyle', icon: <Coffee className="w-4 h-4" /> }
        ]
      },
      {
        id: 'newsletter',
        type: 'checkbox',
        label: 'Subscribe to our newsletter for the latest updates and exclusive content'
      }
    ],
    onSubmit: async (data) => {
      setFormResults(prev => ({ ...prev, registration: data }));
    }
  };

  // マルチステップ注文フォーム設定
  const orderFormConfig: SmartFormConfig = {
    id: 'multi-step-order',
    title: '🛍️ Smart Order Form',
    description: 'Complete your order with our intelligent multi-step form',
    multiStep: true,
    showProgress: true,
    aiAssistance: true,
    steps: [
      {
        id: 'personal',
        title: 'Personal Info',
        description: 'Tell us about yourself',
        fields: ['fullName', 'email', 'phone']
      },
      {
        id: 'shipping',
        title: 'Shipping',
        description: 'Where should we send your order?',
        fields: ['address', 'city', 'zipCode', 'country']
      },
      {
        id: 'payment',
        title: 'Payment',
        description: 'Secure payment information',
        fields: ['cardNumber', 'expiryDate', 'cvv', 'cardName']
      },
      {
        id: 'review',
        title: 'Review',
        description: 'Review your order details',
        fields: ['orderNotes', 'rating']
      }
    ],
    fields: [
      {
        id: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        aiSuggestions: true,
        validation: [
          { type: 'required', message: 'Full name is required' }
        ]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true,
        validation: [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email' }
        ]
      },
      {
        id: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        required: true,
        validation: [
          { type: 'required', message: 'Phone number is required' }
        ]
      },
      {
        id: 'address',
        type: 'textarea',
        label: 'Street Address',
        placeholder: 'Enter your street address',
        required: true,
        rows: 3,
        validation: [
          { type: 'required', message: 'Address is required' }
        ]
      },
      {
        id: 'city',
        type: 'text',
        label: 'City',
        placeholder: 'Enter your city',
        required: true,
        validation: [
          { type: 'required', message: 'City is required' }
        ]
      },
      {
        id: 'zipCode',
        type: 'text',
        label: 'ZIP Code',
        placeholder: 'Enter ZIP code',
        required: true,
        validation: [
          { type: 'required', message: 'ZIP code is required' }
        ]
      },
      {
        id: 'country',
        type: 'select',
        label: 'Country',
        placeholder: 'Select your country',
        required: true,
        options: [
          { value: 'us', label: 'United States' },
          { value: 'jp', label: 'Japan' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'ca', label: 'Canada' }
        ]
      },
      {
        id: 'cardNumber',
        type: 'text',
        label: 'Card Number',
        placeholder: '1234 5678 9012 3456',
        required: true,
        validation: [
          { type: 'required', message: 'Card number is required' }
        ]
      },
      {
        id: 'expiryDate',
        type: 'text',
        label: 'Expiry Date',
        placeholder: 'MM/YY',
        required: true,
        validation: [
          { type: 'required', message: 'Expiry date is required' }
        ]
      },
      {
        id: 'cvv',
        type: 'password',
        label: 'CVV',
        placeholder: '123',
        required: true,
        validation: [
          { type: 'required', message: 'CVV is required' }
        ]
      },
      {
        id: 'cardName',
        type: 'text',
        label: 'Name on Card',
        placeholder: 'Enter cardholder name',
        required: true,
        validation: [
          { type: 'required', message: 'Cardholder name is required' }
        ]
      },
      {
        id: 'orderNotes',
        type: 'textarea',
        label: 'Order Notes',
        placeholder: 'Any special instructions?',
        rows: 3
      },
      {
        id: 'rating',
        type: 'rating',
        label: 'Rate Your Experience',
        description: 'How was your form experience so far?'
      }
    ],
    onSubmit: async (data) => {
      setFormResults(prev => ({ ...prev, order: data }));
    }
  };

  // フィードバックフォーム設定
  const feedbackFormConfig: SmartFormConfig = {
    id: 'feedback-form',
    title: '💭 Share Your Feedback',
    description: 'Help us improve with your valuable feedback',
    showProgress: true,
    aiAssistance: true,
    fields: [
      {
        id: 'experience',
        type: 'radio',
        label: 'How was your experience?',
        required: true,
        options: [
          { value: 'excellent', label: '🤩 Excellent', description: 'Exceeded expectations' },
          { value: 'good', label: '😊 Good', description: 'Met expectations' },
          { value: 'average', label: '😐 Average', description: 'Could be better' },
          { value: 'poor', label: '😞 Poor', description: 'Below expectations' }
        ]
      },
      {
        id: 'recommendation',
        type: 'range',
        label: 'Likelihood to Recommend',
        description: 'How likely are you to recommend us? (0-10)',
        min: 0,
        max: 10,
        step: 1,
        required: true
      },
      {
        id: 'features',
        type: 'tags',
        label: 'Favorite Features',
        description: 'Tag the features you love most'
      },
      {
        id: 'improvements',
        type: 'textarea',
        label: 'Suggestions for Improvement',
        placeholder: 'What could we do better?',
        rows: 4,
        aiSuggestions: true
      },
      {
        id: 'contact',
        type: 'checkbox',
        label: 'I\'m open to being contacted for follow-up questions'
      }
    ],
    onSubmit: async (data) => {
      setFormResults(prev => ({ ...prev, feedback: data }));
    }
  };

  const demoConfigs = {
    registration: registrationFormConfig,
    order: orderFormConfig,
    feedback: feedbackFormConfig
  };

  const demoOptions = [
    {
      id: 'registration',
      title: 'User Registration',
      description: 'Complete user onboarding experience',
      icon: <User className="w-5 h-5" />,
      badge: 'AI-Powered',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'order',
      title: 'Multi-Step Order',
      description: 'E-commerce checkout process',
      icon: <CreditCard className="w-5 h-5" />,
      badge: 'Multi-Step',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'feedback',
      title: 'Feedback Form',
      description: 'User experience feedback collection',
      icon: <Heart className="w-5 h-5" />,
      badge: 'Interactive',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
        />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="premium" size="lg" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Next-Generation Forms
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              SmartForm Demo
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of form interactions with AI-powered assistance, 
              smart validation, and next-generation UX design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: <Brain />, text: 'AI-Powered' },
              { icon: <Zap />, text: 'Lightning Fast' },
              { icon: <Shield />, text: 'Secure' },
              { icon: <Target />, text: 'Precise' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
              >
                <div className="text-blue-500">
                  {feature.icon}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Demo Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our collection of advanced form examples showcasing different use cases and features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {demoOptions.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedDemo(demo.id)}
              >
                <Card className={`relative overflow-hidden transition-all duration-300 ${
                  selectedDemo === demo.id 
                    ? 'ring-2 ring-blue-500 shadow-xl' 
                    : 'hover:shadow-lg'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-5`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${demo.color} text-white`}>
                        {demo.icon}
                      </div>
                      <Badge variant="outline">
                        {demo.badge}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl">{demo.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">
                      {demo.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      variant={selectedDemo === demo.id ? "default" : "outline"}
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {selectedDemo === demo.id ? 'Selected' : 'Try Demo'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Demo */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            <motion.div
              key={`${selectedDemo}-${animationKey}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SmartForm
                config={demoConfigs[selectedDemo as keyof typeof demoConfigs]}
                variant="floating"
                size="lg"
                spacing="relaxed"
              />
            </motion.div>
          </AnimatePresence>

          {/* Results Display */}
          <AnimatePresence>
            {formResults[selectedDemo] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      Form Submitted Successfully!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        Submitted Data:
                      </h4>
                      <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-auto">
                        {JSON.stringify(formResults[selectedDemo], null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the advanced capabilities that make SmartForm the next generation of form components.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'AI-Powered Suggestions',
                description: 'Intelligent auto-completion and smart suggestions powered by advanced AI algorithms.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Smart Validation',
                description: 'Real-time validation with contextual error messages and intelligent field dependencies.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: 'Multi-Step Forms',
                description: 'Complex workflows broken down into intuitive steps with progress tracking.',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: <Wand2 className="w-8 h-8" />,
                title: 'Auto-Save',
                description: 'Never lose your progress with automatic form data saving and restoration.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: 'Adaptive UI',
                description: 'Interface that adapts to user behavior and preferences for optimal experience.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: 'Performance Optimized',
                description: 'Lightning-fast rendering with optimized animations and smooth interactions.',
                color: 'from-red-500 to-pink-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Forms?
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who have already upgraded to SmartForm.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="glass"
                size="lg"
                leftIcon={<BookOpen className="w-5 h-5" />}
              >
                View Documentation
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50"
                leftIcon={<Code className="w-5 h-5" />}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SmartFormDemo; 