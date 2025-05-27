import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Settings, 
  Bell, 
  Heart, 
  Star, 
  Download, 
  Upload, 
  ChevronRight, 
  Play, 
  Pause, 
  Eye,
  Copy,
  ExternalLink,
  Check,
  X,
  Mail,
  Globe,
  Shield,
  Zap,
  Moon,
  Palette,
  Image,
  Video,
  Smartphone,
  Tablet,
  Monitor,
  AlertTriangle,
  AlertCircle,
  MessageCircle,
  Send,
  CheckCircle,
  Crown,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  Lightbulb,
  Rocket,
  Layers,
  Award,
  ShoppingCart,
  Trophy,
  ChevronLeft,
  Package,
  Info,
  Code,
  BookOpen,
  Target,
  RotateCcw
} from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import type { ComponentItem } from './ComponentNavigation';
import { DatePicker } from './ui/DatePicker';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion';
import { Avatar, AvatarGroup } from './ui/Avatar';
import { Input } from './ui/Input';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './ui/Modal';
import { Carousel } from './ui/Carousel';
import { KanbanBoard } from './ui/KanbanBoard';
import { AIAssistant } from './ui/AIAssistant';
import { AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { SmartForm } from './ui/SmartForm';
import TaskEditModal from './ui/TaskEditModal';
import { RichTextEditorDemo } from './ui/RichTextEditorDemo';
import type { KanbanCard } from './ui/KanbanBoard';

interface ComponentDetailViewProps {
  component: ComponentItem;
  onBack: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'tsx' | 'jsx' | 'css' | 'json';
  category: 'basic' | 'advanced' | 'custom' | 'integration';
}

interface ComponentProperty {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  examples?: string[];
}

interface UsageExample {
  title: string;
  description: string;
  scenario: string;
  code: string;
  preview?: React.ReactNode;
}

const getComponentExamples = (componentId: string): CodeExample[] => {
  const examples: Record<string, CodeExample[]> = {
    button: [
      {
        title: 'Basic Usage',
        description: 'Simple button with different variants',
        language: 'tsx',
        category: 'basic',
        code: `import { Button } from '@/components/ui/Button';

export function BasicButtons() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="premium">Premium</Button>
      <Button variant="neon">Neon</Button>
      <Button variant="glass">Glass</Button>
    </div>
  );
}`
      },
      {
        title: 'With Icons and Loading',
        description: 'Buttons with icons and loading states',
        language: 'tsx',
        category: 'advanced',
        code: `import { Button } from '@/components/ui/Button';
import { Download, Heart, Star } from 'lucide-react';

export function IconButtons() {
  const [loading, setLoading] = useState(false);
  
  const handleDownload = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="flex gap-4">
      <Button 
        leftIcon={<Download />}
        onClick={handleDownload}
        loading={loading}
      >
        Download
      </Button>
      <Button variant="outline" rightIcon={<Heart />}>
        Like
      </Button>
      <Button variant="ghost" leftIcon={<Star />}>
        Favorite
      </Button>
    </div>
  );
}`
      }
    ],
    card: [
      {
        title: 'Basic Card Layout',
        description: 'Standard card with header and content',
        language: 'tsx',
        category: 'basic',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function BasicCard() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can place any content.</p>
      </CardContent>
    </Card>
  );
}`
      }
    ],
    datepicker: [
      {
        title: 'Basic Date Pickers',
        description: 'Simple date pickers with different styles',
        language: 'tsx',
        category: 'basic',
        code: `import { DatePicker } from '@/components/ui/DatePicker';

export function BasicDatePickers() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-lg">Basic Date Pickers</h4>
          <div className="space-y-4">
            <DatePicker placeholder="Select date" />
            <DatePicker 
              variant="neon"
              placeholder="Neon date picker"
            />
            <DatePicker 
              range
              placeholder="Select date range"
            />
            </div>
          </div>
        
        <div className="space-y-6">
          <h4 className="font-semibold text-lg">Advanced Features</h4>
    <div className="space-y-4">
            <DatePicker 
              showTime
              placeholder="Select date & time"
              variant="filled"
            />
            <DatePicker 
              placeholder="With presets"
              presets={[
                { label: 'Today', value: new Date() },
                { label: 'Tomorrow', value: new Date(Date.now() + 24 * 60 * 60 * 1000) },
                { label: 'Next Week', value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
              ]}
              variant="outlined"
            />
            <DatePicker 
              range
              placeholder="Date range with presets"
              presets={[
                { 
                  label: 'This Week', 
                  value: [
                    new Date(), 
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  ] 
                },
                { 
                  label: 'This Month', 
                  value: [
                    new Date(), 
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  ] 
                }
              ]}
              variant="ghost"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">Specialized Use Cases</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h5 className="font-medium">Event Booking</h5>
            <DatePicker 
              placeholder="Event date"
              disabledDate={(date) => date < new Date()}
              showToday
              variant="filled"
            />
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium">Appointment</h5>
            <DatePicker 
              placeholder="Appointment date"
              disabledDate={(date) => {
                const day = date.getDay();
                return day === 0 || day === 6; // Disable weekends
              }}
              showWeekNumbers
              firstDayOfWeek={1}
              variant="neon"
            />
          </div>
          
          <div className="space-y-3">
            <h5 className="font-medium">Birthday</h5>
            <DatePicker 
              placeholder="Birth date"
              disabledDate={(date) => date > new Date()}
              variant="outlined"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl overflow-visible">
        <h4 className="font-semibold text-lg mb-4">Premium Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
          <div className="space-y-3 overflow-visible">
            <Badge variant="premium">Premium</Badge>
            <div className="overflow-visible">
              <DatePicker 
                range
                showTime
                placeholder="Full-featured date range"
                presets={[
                  { label: 'Last 7 days', value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()] },
                  { label: 'Last 30 days', value: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()] },
                  { label: 'Last 90 days', value: [new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()] }
                ]}
                showWeekNumbers
                variant="neon"
              />
            </div>
          </div>
          
          <div className="space-y-3 overflow-visible">
            <Badge variant="neon">AI-Powered</Badge>
            <div className="overflow-visible">
              <DatePicker 
                placeholder="Smart date picker"
                variant="neon"
                // AI suggestions would be implemented here
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Suggests optimal dates based on your schedule and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`
      }
    ],
    modal: [
      {
        title: 'Basic Modal Examples',
        description: 'Simple modal examples',
        language: 'tsx',
        category: 'basic',
        code: `import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export function BasicModalExamples() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="space-y-8">
      {/* Basic Modal Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Modals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button onClick={() => setModalOpen(true)} variant="default">
            Basic Modal
        </Button>
          <Button onClick={() => setConfirmModalOpen(true)} variant="destructive">
            Confirmation Modal
          </Button>
          <Button onClick={() => setFormModalOpen(true)} variant="neon">
            Form Modal
          </Button>
        </div>
      </div>

      {/* Advanced Modal Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Modals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={() => setGalleryModalOpen(true)} variant="premium">
            <Image className="w-4 h-4 mr-2" />
            Gallery Modal
          </Button>
          <Button variant="glass" className="relative">
            <Video className="w-4 h-4 mr-2" />
            Video Modal
            <Badge variant="premium" className="ml-2">Pro</Badge>
          </Button>
        </div>
      </div>

      {/* Modal Variants Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modal Variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['default', 'neon', 'glass', 'premium'] as const).map((variant) => (
            <Button key={variant} variant={variant} size="sm">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
          ))}
        </div>
      </div>

      {/* Basic Modal */}
      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalHeader>
          <ModalTitle>Welcome to Our Platform</ModalTitle>
          <ModalDescription>
            Discover the next generation of UI components designed for modern applications.
          </ModalDescription>
        </ModalHeader>
        <div className="py-6">
          <p className="text-gray-600 dark:text-gray-300">
            This is a basic modal example showcasing clean design and smooth animations. 
            Our modal system supports various configurations and can be easily customized 
            to match your application's design language.
          </p>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>
            Get Started
          </Button>
        </ModalFooter>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmModalOpen} onOpenChange={setConfirmModalOpen} variant="default">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Confirm Deletion
          </ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <div className="py-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800 dark:text-red-200">Warning</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  All your projects, files, and team collaborations will be permanently lost.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => setConfirmModalOpen(false)}>
            Delete Account
          </Button>
        </ModalFooter>
      </Modal>

      {/* Form Modal */}
      <Modal open={formModalOpen} onOpenChange={setFormModalOpen} variant="neon" size="lg">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Contact Us
          </ModalTitle>
          <ModalDescription>
            Send us a message and we'll get back to you as soon as possible.
          </ModalDescription>
        </ModalHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <Input
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={4}
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
      />
    </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setFormModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="neon" onClick={() => {
            addToast({
              title: "Message Sent!",
              description: "We'll get back to you soon.",
              type: "success"
            });
            setFormModalOpen(false);
          }}>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </ModalFooter>
      </Modal>

      {/* Gallery Modal */}
      <Modal open={galleryModalOpen} onOpenChange={setGalleryModalOpen} variant="glass" size="xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Image Gallery
            <Badge variant="premium">Premium</Badge>
          </ModalTitle>
          <ModalDescription>
            Browse through our curated collection of high-quality images.
          </ModalDescription>
        </ModalHeader>
        <div className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="glass">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setGalleryModalOpen(false)}>
            Close
          </Button>
          <Button variant="premium">
            <Upload className="w-4 h-4 mr-2" />
            Upload Images
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
`
      }
    ]
  };

  return examples[componentId] || [];
};

const getComponentProperties = (componentId: string): ComponentProperty[] => {
  const properties: Record<string, ComponentProperty[]> = {
    button: [
      {
        name: 'variant',
        type: '"default" | "premium" | "neon" | "glass" | "destructive" | "success" | "warning" | "outline" | "ghost" | "link" | "gradient"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the button',
        examples: ['default', 'premium', 'neon']
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg"',
        required: false,
        default: '"md"',
        description: 'The size of the button',
        examples: ['sm', 'md', 'lg']
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Shows loading spinner when true'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Disables the button when true'
      }
    ],
    card: [
      {
        name: 'variant',
        type: '"default" | "elevated" | "outline" | "ghost" | "gradient" | "glass" | "neon" | "premium"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the card',
        examples: ['default', 'elevated', 'gradient']
      },
      {
        name: 'interactive',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Adds hover effects when true'
      }
    ]
  };

  return properties[componentId] || [];
};

const getUsageExamples = (componentId: string): UsageExample[] => {
  const examples: Record<string, UsageExample[]> = {
    button: [
      {
        title: 'Form Submission',
        description: 'Using buttons in forms with loading states',
        scenario: 'User submits a form and needs visual feedback',
        code: `const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitForm(formData);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
    <Button 
      type="submit" 
      loading={isSubmitting}
      variant="premium"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
  </form>
);`
      }
    ]
  };

  return examples[componentId] || [];
};

export const ComponentDetailView: React.FC<ComponentDetailViewProps> = ({
  component,
  onBack,
  onNext,
  onPrevious
}) => {
  const { t } = useTranslation();
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [modalOpen, setModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToast } = useToast();

  // Demo states
  const [activeTabDemo, setActiveTabDemo] = useState('dashboard');
  const [accordionValue, setAccordionValue] = useState<string>('');
  const [multiAccordionValue, setMultiAccordionValue] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // DatePicker demo states
  const [datePickerValues, setDatePickerValues] = useState({
    basic: null as Date | null,
    neon: null as Date | null,
    range: null as [Date, Date] | null,
    withTime: null as Date | null,
    withPresets: null as Date | null,
    rangeWithPresets: null as [Date, Date] | null,
    eventBooking: null as Date | null,
    appointment: null as Date | null,
    birthday: null as Date | null,
    premium: null as [Date, Date] | null,
    smart: null as Date | null
  });

  // Kanban Board demo states
  const [kanbanColumns, setKanbanColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      description: 'Items ready to start',
      cards: [
        {
          id: 'task-1',
          title: 'User Authentication System',
          description: 'Implement OAuth 2.0 authentication with social login support',
          assignee: { name: 'John Doe', avatar: 'JD' },
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: 'high' as const,
          tags: ['Backend', 'Security', 'API'],
          attachments: 3,
          comments: 5,
          status: 'New'
        },
        {
          id: 'task-2',
          title: 'Mobile App UI Redesign',
          description: 'Update mobile interface to match new design system',
          assignee: { name: 'Alice Smith', avatar: 'AS' },
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: 'medium' as const,
          tags: ['Frontend', 'Mobile', 'Design'],
          attachments: 8,
          comments: 12,
          status: 'Approved'
        },
        {
          id: 'task-3',
          title: 'Database Migration Script',
          description: 'Create migration scripts for new user table structure',
          assignee: { name: 'Mike Johnson', avatar: 'MJ' },
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: 'urgent' as const,
          tags: ['Database', 'Migration'],
          attachments: 2,
          comments: 3,
          status: 'Ready'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      description: 'Items currently being worked on',
      cards: [
        {
          id: 'task-4',
          title: 'Payment Gateway Integration',
          description: 'Integrate Stripe payment processing with checkout flow',
          assignee: { name: 'Sarah Wilson', avatar: 'SW' },
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high' as const,
          tags: ['Payment', 'Integration', 'API'],
          attachments: 5,
          comments: 8,
          progress: 65,
          status: 'Active'
        },
        {
          id: 'task-5',
          title: 'Performance Optimization',
          description: 'Optimize database queries and implement caching',
          assignee: { name: 'Tom Brown', avatar: 'TB' },
          dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
          priority: 'medium' as const,
          tags: ['Performance', 'Database', 'Caching'],
          attachments: 1,
          comments: 4,
          progress: 30,
          status: 'Active'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      description: 'Completed items',
      cards: [
        {
          id: 'task-6',
          title: 'User Profile Management',
          description: 'Complete user profile CRUD operations',
          assignee: { name: 'Emma Wilson', avatar: 'EW' },
          dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          priority: 'high' as const,
          tags: ['Frontend', 'User Management'],
          attachments: 3,
          comments: 9,
          status: 'Closed'
        },
        {
          id: 'task-7',
          title: 'Security Audit',
          description: 'Complete security audit and vulnerability assessment',
          assignee: { name: 'James Lee', avatar: 'JL' },
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          priority: 'urgent' as const,
          tags: ['Security', 'Audit'],
          attachments: 7,
          comments: 15,
          status: 'Closed'
        }
      ]
    }
  ]);

  // Task Edit Modal states
  const [taskEditModalOpen, setTaskEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanCard | null>(null);
  
  // Mock data for task editing
  const mockAssignees = [
    { id: '1', name: 'John Doe', avatar: 'JD', role: 'Frontend Developer' },
    { id: '2', name: 'Alice Smith', avatar: 'AS', role: 'UI/UX Designer' },
    { id: '3', name: 'Mike Johnson', avatar: 'MJ', role: 'Backend Developer' },
    { id: '4', name: 'Sarah Wilson', avatar: 'SW', role: 'Full Stack Developer' },
    { id: '5', name: 'Tom Brown', avatar: 'TB', role: 'DevOps Engineer' },
    { id: '6', name: 'Emma Wilson', avatar: 'EW', role: 'Product Manager' },
    { id: '7', name: 'James Lee', avatar: 'JL', role: 'Security Engineer' }
  ];
  
  const mockTags = [
    'Frontend', 'Backend', 'Database', 'Security', 'API', 'Mobile', 'Design',
    'Performance', 'Testing', 'DevOps', 'Documentation', 'Research', 'Bug Fix',
    'Feature', 'Improvement', 'Critical', 'High Priority', 'Low Priority'
  ];

  const handleTaskSave = (updatedTask: KanbanCard) => {
    setKanbanColumns(prevColumns => {
      return prevColumns.map(column => ({
        ...column,
        cards: column.cards.map(card => 
          card.id === updatedTask.id ? {
            ...updatedTask,
            description: updatedTask.description || '',
            progress: updatedTask.progress || 0
          } : card
        )
      })) as typeof prevColumns
    })
    
    addToast({
      title: "Task Updated",
      description: `"${updatedTask.title}" has been updated successfully.`,
      type: "success",
      duration: 3000
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setKanbanColumns(prevColumns => {
      return prevColumns.map(column => ({
        ...column,
        cards: column.cards.filter(card => card.id !== taskId)
      }))
    })
    
    addToast({
      title: "Task Deleted",
      description: "Task has been permanently deleted.",
      type: "success",
      duration: 3000
    });
  };

  const codeExamples = getComponentExamples(component.id);
  const properties = getComponentProperties(component.id);
  const usageExamples = getUsageExamples(component.id);

  const copyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopied(title);
    addToast({
      type: 'success',
      title: t('action.copied'),
      description: `${title} がクリップボードにコピーされました`,
      duration: 2000
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getViewportClass = () => {
    return {
      desktop: 'w-full',
      tablet: 'w-3/4 mx-auto',
      mobile: 'w-1/2 mx-auto'
    }[viewport];
  };

  // Demo component renderer
  const renderDemo = () => {
    switch (component.id) {
      case 'button':
return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading</Button>
              <Button leftIcon={<Heart className="w-4 h-4" />}>Like</Button>
              <Button rightIcon={<Star className="w-4 h-4" />}>Favorite</Button>
              <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                Download
    </Button>
      </div>
          </div>
        );
      case 'card':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" className="p-6">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standard card design</p>
  </Card>
            <Card variant="elevated" className="p-6">
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced shadow effect</p>
            </Card>
            <Card variant="gradient" className="p-6">
              <h3 className="font-semibold mb-2">Gradient Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Beautiful gradient background</p>
            </Card>
        </div>
        );
      case 'datepicker':
        return (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Interactive Demo:</strong> Click on any date picker to open the calendar. The calendar will automatically position itself to stay visible on screen.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h4 className="font-semibold text-lg">Basic Date Pickers</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Standard Date Picker</label>
                    <DatePicker 
                      placeholder="Select date" 
                      value={datePickerValues.basic}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, basic: date as Date }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Neon Style</label>
                    <DatePicker 
                      variant="neon"
                      placeholder="Neon date picker"
                      value={datePickerValues.neon}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, neon: date as Date }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range Picker</label>
                    <DatePicker 
                      range
                      placeholder="Select date range"
                      value={datePickerValues.range}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, range: date as [Date, Date] }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <h4 className="font-semibold text-lg">Advanced Features</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time Picker</label>
                    <DatePicker 
                      showTime
                      placeholder="Select date & time"
                      variant="filled"
                      value={datePickerValues.withTime}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, withTime: date as Date }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">With Quick Presets</label>
                    <DatePicker 
                      placeholder="With presets"
                      presets={[
                        { label: 'Today', value: new Date() },
                        { label: 'Tomorrow', value: new Date(Date.now() + 24 * 60 * 60 * 1000) },
                        { label: 'Next Week', value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
                      ]}
                      variant="outlined"
                      value={datePickerValues.withPresets}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, withPresets: date as Date }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Range with Presets</label>
                    <DatePicker 
                      range
                      placeholder="Date range with presets"
                      presets={[
                        { 
                          label: 'This Week', 
                          value: [
                            new Date(), 
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          ] 
                        },
                        { 
                          label: 'This Month', 
                          value: [
                            new Date(), 
                            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                          ] 
                        }
                      ]}
                      variant="ghost"
                      value={datePickerValues.rangeWithPresets}
                      onChange={(date) => setDatePickerValues(prev => ({ ...prev, rangeWithPresets: date as [Date, Date] }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-lg">Specialized Use Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h5 className="font-medium">Event Booking</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prevents past dates</p>
                  <DatePicker 
                    placeholder="Event date"
                    disabledDate={(date) => date < new Date()}
                    showToday
                    variant="filled"
                    value={datePickerValues.eventBooking}
                    onChange={(date) => setDatePickerValues(prev => ({ ...prev, eventBooking: date as Date }))}
                  />
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium">Appointment</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekdays only</p>
                  <DatePicker 
                    placeholder="Appointment date"
                    disabledDate={(date) => {
                      const day = date.getDay();
                      return day === 0 || day === 6; // Disable weekends
                    }}
                    showWeekNumbers
                    firstDayOfWeek={1}
                    variant="neon"
                    value={datePickerValues.appointment}
                    onChange={(date) => setDatePickerValues(prev => ({ ...prev, appointment: date as Date }))}
                  />
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium">Birthday</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Past dates only</p>
                  <DatePicker 
                    placeholder="Birth date"
                    disabledDate={(date) => date > new Date()}
                    variant="outlined"
                    value={datePickerValues.birthday}
                    onChange={(date) => setDatePickerValues(prev => ({ ...prev, birthday: date as Date }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl">
              <h4 className="font-semibold text-lg mb-6">Premium Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Badge variant="premium">Premium</Badge>
                  <h5 className="font-medium">Full-Featured Date Range</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Combines range selection, time picker, presets, and week numbers
                  </p>
                  <div className="min-h-[60px]">
                    <DatePicker 
                      range
                      showTime
                      placeholder="Full-featured date range"
                      presets={[
                        { label: 'Last 7 days', value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()] },
                        { label: 'Last 30 days', value: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()] },
                        { label: 'Last 90 days', value: [new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()] }
                      ]}
                      showWeekNumbers
                      variant="gradient"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Badge variant="neon">AI-Powered</Badge>
                  <h5 className="font-medium">Smart Date Picker</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Future feature: AI suggestions based on context and user patterns
                  </p>
                  <div className="min-h-[60px]">
                    <DatePicker 
                      placeholder="Smart date picker (Coming Soon)"
                      variant="glass"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'modal':
  return (
          <div className="space-y-8">
            {/* Basic Modal Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Modals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button onClick={() => setModalOpen(true)} variant="default">
                  Basic Modal
                </Button>
                <Button onClick={() => setConfirmModalOpen(true)} variant="destructive">
                  Confirmation Modal
                </Button>
                <Button onClick={() => setFormModalOpen(true)} variant="neon">
                  Form Modal
                </Button>
              </div>
            </div>

            {/* Advanced Modal Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Modals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => setGalleryModalOpen(true)} variant="premium">
                  <Image className="w-4 h-4 mr-2" />
                  Gallery Modal
                </Button>
                <Button onClick={() => setVideoModalOpen(true)} variant="glass" className="relative">
                  <Video className="w-4 h-4 mr-2" />
                  Video Modal
                  <Badge variant="premium" className="ml-2">Pro</Badge>
                </Button>
            </div>
            </div>

            {/* Modal Variants Showcase */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modal Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['default', 'neon', 'glass', 'premium'] as const).map((variant) => (
                  <Button key={variant} variant={variant} size="sm">
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
          ))}
        </div>
    </div>
    
            {/* Basic Modal */}
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalHeader>
                <ModalTitle>Welcome to Our Platform</ModalTitle>
                <ModalDescription>
                  Discover the next generation of UI components designed for modern applications.
                </ModalDescription>
              </ModalHeader>
              <div className="py-6">
                <p className="text-gray-600 dark:text-gray-300">
                  This is a basic modal example showcasing clean design and smooth animations. 
                  Our modal system supports various configurations and can be easily customized 
                  to match your application's design language.
                </p>
    </div>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                  Get Started
                </Button>
              </ModalFooter>
            </Modal>

            {/* Confirmation Modal */}
            <Modal open={confirmModalOpen} onOpenChange={setConfirmModalOpen} variant="default">
              <ModalHeader>
                <ModalTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Confirm Deletion
                </ModalTitle>
                <ModalDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </ModalDescription>
              </ModalHeader>
              <div className="py-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200">Warning</h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        All your projects, files, and team collaborations will be permanently lost.
                      </p>
          </div>
        </div>
                </div>
              </div>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setConfirmModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => setConfirmModalOpen(false)}>
                  Delete Account
                </Button>
              </ModalFooter>
            </Modal>

            {/* Form Modal */}
            <Modal open={formModalOpen} onOpenChange={setFormModalOpen} variant="neon" size="lg">
              <ModalHeader>
                <ModalTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </ModalTitle>
                <ModalDescription>
                  Send us a message and we'll get back to you as soon as possible.
                </ModalDescription>
              </ModalHeader>
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
      <Input
        type="email"
                    placeholder="your.email@example.com"
        value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
          </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
          </div>
        </div>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setFormModalOpen(false)}>
                  Cancel
          </Button>
                <Button variant="neon" onClick={() => {
                  addToast({
                    title: "Message Sent!",
                    description: "We'll get back to you soon.",
                    type: "success"
                  });
                  setFormModalOpen(false);
                }}>
                  <Send className="w-4 h-4 mr-2" />
            Send Message
                </Button>
              </ModalFooter>
            </Modal>

            {/* Gallery Modal */}
            <Modal open={galleryModalOpen} onOpenChange={setGalleryModalOpen} variant="glass" size="xl">
              <ModalHeader>
                <ModalTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Image Gallery
                  <Badge variant="premium">Premium</Badge>
                </ModalTitle>
                <ModalDescription>
                  Browse through our curated collection of high-quality images.
                </ModalDescription>
              </ModalHeader>
              <div className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="glass">
                            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setGalleryModalOpen(false)}>
                  Close
                </Button>
                <Button variant="premium">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
              </ModalFooter>
            </Modal>

            {/* Video Modal */}
            <Modal open={videoModalOpen} onOpenChange={setVideoModalOpen} variant="glass" size="xl">
              <ModalHeader>
                <ModalTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Player
                  <Badge variant="premium">Premium</Badge>
                </ModalTitle>
                <ModalDescription>
                  Experience our advanced video player with premium features.
                </ModalDescription>
              </ModalHeader>
              <div className="py-6">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white">
                        <h3 className="text-lg font-semibold">Premium Video Player</h3>
                        <p className="text-sm text-gray-300">Advanced playback controls and features</p>
                      </div>
                      <Button variant="premium" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Play Video
      </Button>
      </div>
                  </div>
                  {/* Video controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Video className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 bg-white/20 rounded-full h-1">
                        <div className="bg-white rounded-full h-1 w-1/3"></div>
                      </div>
                      <span className="text-white text-sm">2:34 / 7:42</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">4K Quality</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">HDR Support</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Subtitles</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Offline Mode</span>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setVideoModalOpen(false)}>
                  Close
                </Button>
                <Button variant="premium">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      case 'tabs':
        return (
          <div className="space-y-8">
            {/* Basic Tabs Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Tabs</h3>
              <Tabs value={activeTabDemo} onValueChange={setActiveTabDemo} variant="default">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <div className="min-h-[400px] w-full">
                  <TabsContent value="dashboard" className="mt-6">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          Dashboard Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-blue-600 dark:text-blue-400">Total Users</p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">12,345</p>
    </div>
                              <Users className="w-8 h-8 text-blue-500" />
                            </div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-green-600 dark:text-green-400">Revenue</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">$89,432</p>
                              </div>
                              <DollarSign className="w-8 h-8 text-green-500" />
                            </div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-purple-600 dark:text-purple-400">Growth</p>
                                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">+23.5%</p>
                              </div>
                              <TrendingUp className="w-8 h-8 text-purple-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="mt-6">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Analytics Report
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-blue-500" />
                              <span>Page Views</span>
                            </div>
                            <span className="font-semibold">45,678</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-green-500" />
                              <span>Avg. Session Duration</span>
                            </div>
                            <span className="font-semibold">4m 32s</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <TrendingUp className="w-5 h-5 text-purple-500" />
                              <span>Conversion Rate</span>
                            </div>
                            <span className="font-semibold">3.2%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="users" className="mt-6">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          User Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                            { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
                            { name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive' }
                          ].map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar fallback={user.name} size="sm" />
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
    <div className="flex items-center gap-2">
                                <Badge variant={user.role === 'Admin' ? 'premium' : 'default'}>
                                  {user.role}
                                </Badge>
                                <Badge variant={user.status === 'Active' ? 'success' : 'outline'}>
                                  {user.status}
                                </Badge>
    </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-6">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          Application Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Application Name</label>
                            <Input placeholder="My Awesome App" />
                          </div>
                          <div className="flex items-center justify-between">
          <div>
                              <p className="font-medium">Enable Notifications</p>
                              <p className="text-sm text-gray-500">Receive email notifications</p>
          </div>
                            <Button variant="neon" size="sm">
                              <Bell className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Dark Mode</p>
                              <p className="text-sm text-gray-500">Toggle dark theme</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Moon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
        </div>
        
            {/* Tabs Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tab Variants</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pills Variant */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Pills Style</h4>
                  <Tabs defaultValue="home" variant="pills">
                    <TabsList>
                      <TabsTrigger value="home">Home</TabsTrigger>
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>
                    <TabsContent value="home" className="mt-4">
                      <p className="text-gray-600 dark:text-gray-300">Welcome to our homepage!</p>
                    </TabsContent>
                    <TabsContent value="about" className="mt-4">
                      <p className="text-gray-600 dark:text-gray-300">Learn more about our company.</p>
                    </TabsContent>
                    <TabsContent value="contact" className="mt-4">
                      <p className="text-gray-600 dark:text-gray-300">Get in touch with us.</p>
                    </TabsContent>
                  </Tabs>
          </div>

                {/* Neon Variant */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Neon Style</h4>
                  <Tabs defaultValue="gaming" variant="neon">
                    <TabsList>
                      <TabsTrigger value="gaming">Gaming</TabsTrigger>
                      <TabsTrigger value="streaming">Streaming</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gaming" className="mt-4">
                      <p className="text-gray-600 dark:text-gray-300">Latest gaming news and updates.</p>
                    </TabsContent>
                    <TabsContent value="streaming" className="mt-4">
                      <p className="text-gray-600 dark:text-gray-300">Live streaming content.</p>
                    </TabsContent>
                  </Tabs>
          </div>
          </div>
        </div>
          </div>
        );
      case 'accordion':
        return (
          <div className="space-y-8">
            {/* Basic Accordion */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Accordion</h3>
              <Accordion type="single" value={accordionValue} onValueChange={(value) => setAccordionValue(value as string)} collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    What is this component library?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      This is a next-generation UI component library built with React, TypeScript, and Tailwind CSS. 
                      It provides a comprehensive set of accessible, customizable, and performant components for modern web applications.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    How do I get started?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        Getting started is easy! Follow these simple steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Install the package: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm install @maw/ui</code></li>
                        <li>Import the components you need</li>
                        <li>Start building amazing interfaces!</li>
                      </ol>
              </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Is it accessible?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes! All components are built with accessibility in mind, following WCAG guidelines and supporting 
                      keyboard navigation, screen readers, and proper ARIA attributes.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Premium Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        Unlock advanced features with our premium plan:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">Advanced animations</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">Custom themes</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">Advanced components</span>
                        </div>
                      </div>
                      <Button variant="premium" className="w-full">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium
          </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Multiple Accordion */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multiple Selection</h3>
              <Accordion type="multiple" value={multiAccordionValue} onValueChange={(value) => setMultiAccordionValue(value as string[])}>
                <AccordionItem value="features">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Key Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                        <h4 className="font-medium">Performance</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• Tree-shakeable components</li>
                          <li>• Optimized bundle size</li>
                          <li>• Lazy loading support</li>
                        </ul>
                </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Developer Experience</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• TypeScript support</li>
                          <li>• Comprehensive documentation</li>
                          <li>• Live examples</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="customization">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Customization Options
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        Customize every aspect of the components to match your brand:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Colors', 'Typography', 'Spacing', 'Animations'].map((item) => (
                          <div key={item} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="support">
                  <AccordionTrigger className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Support & Community
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        Get help and connect with our community:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="default" className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Discord
                        </Button>
                        <Button variant="neon" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Documentation
                        </Button>
                        <Button variant="premium" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Support
          </Button>
        </div>
      </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
    </div>

            {/* Accordion Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accordion Variants</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Neon Variant */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Neon Style</h4>
                  <Accordion type="single" defaultValue="neon-1" variant="neon">
                    <AccordionItem value="neon-1">
                      <AccordionTrigger>Gaming Setup</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Optimize your gaming experience with our neon-themed components.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="neon-2">
                      <AccordionTrigger>RGB Lighting</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Customize RGB lighting effects and animations.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
          </div>

                {/* Premium Variant */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Premium Style</h4>
                  <Accordion type="single" defaultValue="premium-1" variant="premium">
                    <AccordionItem value="premium-1">
                      <AccordionTrigger className="flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Exclusive Features
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Access premium-only features and advanced customization options.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium-2">
                      <AccordionTrigger className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Priority Support
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Get priority support and dedicated assistance from our team.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
        </div>
            </div>
          </div>
          </div>
        );
      case 'avatar':
        return (
          <div className="space-y-8">
            {/* Basic Avatars */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Avatars</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="JD" />
                <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
                <Avatar fallback="AS" variant="primary" />
                <Avatar fallback="MK" variant="success" />
                <Avatar fallback="LR" variant="warning" />
                <Avatar fallback="TP" variant="error" />
            </div>
                  </div>

            {/* Avatar Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avatar Sizes</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="XS" size="xs" />
                <Avatar fallback="SM" size="sm" />
                <Avatar fallback="MD" size="default" />
                <Avatar fallback="LG" size="lg" />
                <Avatar fallback="XL" size="xl" />
                <Avatar fallback="2XL" size="2xl" />
                <Avatar fallback="3XL" size="3xl" />
            </div>
          </div>

            {/* Avatar with Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status Indicators</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="ON" showStatus status="online" />
                <Avatar fallback="AW" showStatus status="away" />
                <Avatar fallback="BS" showStatus status="busy" />
                <Avatar fallback="OF" showStatus status="offline" />
              </div>
            </div>

            {/* Avatar Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avatar Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <Avatar fallback="NE" variant="neon" size="lg" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Neon</p>
            </div>
                <div className="text-center space-y-2">
                  <Avatar fallback="GL" variant="glass" size="lg" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Glass</p>
          </div>
                <div className="text-center space-y-2">
                  <Avatar fallback="PR" variant="premium" size="lg" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Premium</p>
                </div>
                <div className="text-center space-y-2">
                  <Avatar fallback="DF" variant="default" size="lg" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Default</p>
                </div>
              </div>
            </div>

            {/* Avatar Shapes */}
              <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avatar Shapes</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar fallback="CI" shape="circle" size="lg" />
                <Avatar fallback="SQ" shape="square" size="lg" />
                <Avatar fallback="RD" shape="rounded" size="lg" />
              </div>
            </div>

            {/* Avatar Group */}
              <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avatar Groups</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Team Members</h4>
                  <AvatarGroup max={4} spacing="normal">
                    <Avatar fallback="JD" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <Avatar fallback="AS" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                    <Avatar fallback="MK" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                    <Avatar fallback="LR" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" />
                    <Avatar fallback="TP" />
                    <Avatar fallback="KL" />
                  </AvatarGroup>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Compact Group</h4>
                  <AvatarGroup max={3} spacing="tight" size="sm">
                    <Avatar fallback="A1" variant="primary" />
                    <Avatar fallback="B2" variant="success" />
                    <Avatar fallback="C3" variant="warning" />
                    <Avatar fallback="D4" variant="error" />
                    <Avatar fallback="E5" variant="neon" />
                  </AvatarGroup>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Premium Group</h4>
                  <AvatarGroup max={5} spacing="loose" size="lg" animated>
                    <Avatar fallback="P1" variant="premium" />
                    <Avatar fallback="P2" variant="glass" />
                    <Avatar fallback="P3" variant="neon" />
                    <Avatar fallback="P4" variant="premium" />
                    <Avatar fallback="P5" variant="glass" />
                    <Avatar fallback="P6" variant="neon" />
                  </AvatarGroup>
                </div>
              </div>
            </div>

            {/* Interactive Avatars */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Editable Avatar</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-3">
                    <Avatar 
                      fallback="ED" 
                      size="xl" 
                      editable 
                      onEdit={() => addToast({
                        title: "Edit Avatar",
                        description: "Avatar edit functionality triggered",
                        type: "info"
                      })}
                    />
                    <p className="text-xs text-gray-500 text-center">Click to edit</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Hover Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-3">
                    <Avatar fallback="HV" size="xl" hover variant="neon" />
                    <p className="text-xs text-gray-500 text-center">Hover for animation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">With Badge</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-3">
                    <Avatar 
                      fallback="BD" 
                      size="xl" 
                      variant="premium"
                      badge={<Badge variant="premium" className="text-xs">Pro</Badge>}
                      badgePosition="top-right"
                    />
                    <p className="text-xs text-gray-500 text-center">Premium user</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* User Profile Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Profile Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'John Doe', role: 'Senior Developer', status: 'online', variant: 'primary' },
                  { name: 'Jane Smith', role: 'Product Manager', status: 'away', variant: 'success' },
                  { name: 'Mike Johnson', role: 'UI Designer', status: 'busy', variant: 'premium' },
                  { name: 'Sarah Wilson', role: 'DevOps Engineer', status: 'online', variant: 'neon' },
                  { name: 'Tom Brown', role: 'QA Engineer', status: 'offline', variant: 'warning' },
                  { name: 'Lisa Davis', role: 'Tech Lead', status: 'online', variant: 'glass' }
                ].map((user, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar 
                          fallback={user.name.split(' ').map(n => n[0]).join('')}
                          variant={user.variant as "primary" | "success" | "premium" | "neon" | "warning" | "glass"}
                          showStatus
                          status={user.status as "online" | "away" | "busy" | "offline"}
                          size="lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {user.role}
                          </p>
              </div>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      case 'badge':
  return (
          <div className="space-y-8">
            {/* Basic Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>
          </div>

            {/* Badge Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Badge Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge size="xs" variant="primary">Extra Small</Badge>
                <Badge size="sm" variant="success">Small</Badge>
                <Badge size="default" variant="warning">Default</Badge>
                <Badge size="lg" variant="error">Large</Badge>
                <Badge size="xl" variant="info">Extra Large</Badge>
        </div>
      </div>
      
            {/* Premium Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="premium">Premium</Badge>
                <Badge variant="neon">Neon</Badge>
                <Badge variant="glass">Glass</Badge>
                <Badge variant="premium">Premium Style</Badge>
              </div>
            </div>

            {/* Interactive Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge 
                  variant="primary" 
                  animated 
                  onClick={() => addToast({
                    title: "Badge Clicked!",
                    description: "Interactive badge was clicked",
                    type: "info"
                  })}
                >
                  Clickable
                </Badge>
                <Badge variant="success" closable onClose={() => addToast({
                  title: "Badge Removed!",
                  description: "Badge was removed",
                  type: "success"
                })}>
                  Removable
                </Badge>
                <Badge variant="warning" animated icon={<Star className="w-3 h-3" />}>
                  With Icon
                </Badge>
                <Badge variant="error" animated icon={<X className="w-3 h-3" />} iconPosition="right">
                  Right Icon
                </Badge>
              </div>
            </div>

            {/* Status Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Server Status</span>
                      <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                        Online
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Build Status</span>
                      <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
                        Building
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Deploy Status</span>
                      <Badge variant="error" icon={<AlertCircle className="w-3 h-3" />}>
                        Failed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notification Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Badge 
                    variant="error" 
                    size="xs" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    3
                  </Badge>
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                  <Badge 
                    variant="primary" 
                    size="xs" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    12
                  </Badge>
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                  <Badge 
                    variant="success" 
                    size="xs" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    5
                  </Badge>
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorites
                  </Button>
                  <Badge 
                    variant="neon" 
                    size="xs" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    99+
                  </Badge>
                </div>
              </div>
            </div>

            {/* Category Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category Tags</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">React</Badge>
                    <Badge variant="info">TypeScript</Badge>
                    <Badge variant="success">Node.js</Badge>
                    <Badge variant="warning">JavaScript</Badge>
                    <Badge variant="premium">Next.js</Badge>
                    <Badge variant="neon">Tailwind CSS</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="premium">Frontend</Badge>
                    <Badge variant="glass">Backend</Badge>
                    <Badge variant="outline">DevOps</Badge>
                    <Badge variant="default">UI/UX</Badge>
                    <Badge variant="premium">Full Stack</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="info" icon={<Clock className="w-3 h-3" />}>In Progress</Badge>
                    <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Completed</Badge>
                    <Badge variant="warning" icon={<AlertTriangle className="w-3 h-3" />}>On Hold</Badge>
                    <Badge variant="error" icon={<X className="w-3 h-3" />}>Cancelled</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Profile Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
        <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Avatar fallback="JD" size="lg" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span>John Doe</span>
                          <Badge variant="premium" size="sm">Pro</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Senior Developer</p>
                      </div>
          </CardTitle>
        </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="success" size="sm">Verified</Badge>
                        <Badge variant="info" size="sm">Team Lead</Badge>
                        <Badge variant="neon" size="sm">Top Contributor</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Achievements:</span>
                        <Badge variant="warning" size="xs" icon={<Trophy className="w-3 h-3" />}>
                          100 Commits
                        </Badge>
                        <Badge variant="premium" size="xs" icon={<Award className="w-3 h-3" />}>
                          Code Review Master
                        </Badge>
                      </div>
                    </div>
        </CardContent>
      </Card>
      
                <Card>
        <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Avatar fallback="AS" size="lg" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span>Alice Smith</span>
                          <Badge variant="premium" size="sm">Enterprise</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Product Manager</p>
                      </div>
          </CardTitle>
        </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary" size="sm">Admin</Badge>
                        <Badge variant="success" size="sm">Active</Badge>
                        <Badge variant="glass" size="sm">Beta Tester</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Permissions:</span>
                        <Badge variant="error" size="xs">Full Access</Badge>
                        <Badge variant="warning" size="xs">Billing</Badge>
                        <Badge variant="info" size="xs">Analytics</Badge>
                      </div>
                    </div>
        </CardContent>
      </Card>
              </div>
            </div>
    </div>
  );
      case 'carousel':
        return (
          <div className="space-y-8">
            {/* Basic Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Image Carousel</h3>
              <Carousel
                items={[
                  {
                    id: 1,
                    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
                    title: "Mountain Landscape",
                    description: "Beautiful mountain scenery with crystal clear lakes"
                  },
                  {
                    id: 2,
                    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
                    title: "Forest Path",
                    description: "Serene forest pathway in autumn colors"
                  },
                  {
                    id: 3,
                    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
                    title: "Ocean Waves",
                    description: "Peaceful ocean waves at sunset"
                  },
                  {
                    id: 4,
                    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
                    title: "Desert Dunes",
                    description: "Golden sand dunes under starry sky"
                  }
                ]}
                autoPlay
                autoPlayInterval={4000}
                showDots
                showArrows
                variant="elevated"
                size="lg"
                className="max-w-4xl mx-auto"
              />
      </div>
      
            {/* Content Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Carousel</h3>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 h-full flex flex-col justify-center">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                            <Rocket className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Fast Performance</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Lightning-fast components optimized for modern web applications
                </p>
              </div>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <div className="p-8 text-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 h-full flex flex-col justify-center">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                            <Shield className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Built with security best practices and comprehensive testing
                        </p>
                      </div>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <div className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 h-full flex flex-col justify-center">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto flex items-center justify-center">
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Enterprise-grade components with premium design and features
                        </p>
                      </div>
                    )
                  }
                ]}
                autoPlay={false}
                showDots
                showArrows
                variant="premium"
                size="lg"
                className="max-w-4xl mx-auto"
              />
            </div>
            
            {/* Multi-slide Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multi-slide Carousel</h3>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Avatar fallback="JD" size="lg" className="mx-auto mb-4" />
                            <h4 className="font-semibold mb-2">John Doe</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              "Amazing component library! Saved us months of development time."
                            </p>
                            <div className="flex justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                </div>
                </div>
                        </CardContent>
                      </Card>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Avatar fallback="AS" size="lg" className="mx-auto mb-4" />
                            <h4 className="font-semibold mb-2">Alice Smith</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              "The best UI library I've ever used. Highly recommended!"
                            </p>
                            <div className="flex justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
              </div>
                          </div>
          </CardContent>
        </Card>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Avatar fallback="MJ" size="lg" className="mx-auto mb-4" />
                            <h4 className="font-semibold mb-2">Mike Johnson</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              "Perfect for our enterprise application. Great performance!"
                            </p>
                            <div className="flex justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  },
                  {
                    id: 4,
                    content: (
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Avatar fallback="SW" size="lg" className="mx-auto mb-4" />
                            <h4 className="font-semibold mb-2">Sarah Wilson</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              "Incredible design system with excellent documentation."
                            </p>
                            <div className="flex justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                ]}
                slidesToShow={3}
                slidesToScroll={1}
                autoPlay
                autoPlayInterval={3000}
                showDots
                showArrows
                variant="default"
                size="auto"
                className="max-w-6xl mx-auto"
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 640,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
              />
            </div>

            {/* Vertical Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vertical Carousel</h3>
              <div className="max-w-md mx-auto">
                <Carousel
                  items={[
                    {
                      id: 1,
                      content: (
                        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                          <h4 className="text-xl font-bold mb-2">Feature 1</h4>
                          <p>Advanced component architecture with TypeScript support</p>
                        </div>
                      )
                    },
                    {
                      id: 2,
                      content: (
                        <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg">
                          <h4 className="text-xl font-bold mb-2">Feature 2</h4>
                          <p>Responsive design with mobile-first approach</p>
                        </div>
                      )
                    },
                    {
                      id: 3,
                      content: (
                        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
                          <h4 className="text-xl font-bold mb-2">Feature 3</h4>
                          <p>Dark mode support with smooth transitions</p>
                        </div>
                      )
                    }
                  ]}
                  autoPlay
                  autoPlayInterval={2500}
                  showDots
                  showArrows
                  variant="minimal"
                  size="sm"
                  effect="fade"
                />
              </div>
            </div>

            {/* Premium Carousel Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Variants</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Neon Carousel */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Neon Style</h4>
                  <Carousel
                    items={[
                      {
                        id: 1,
                        content: (
                          <div className="p-6 text-center text-cyan-400">
                            <div className="w-12 h-12 bg-cyan-400/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Gaming UI</h4>
                            <p className="text-cyan-300">Next-gen gaming interface components</p>
                          </div>
                        )
                      },
                      {
                        id: 2,
                        content: (
                          <div className="p-6 text-center text-cyan-400">
                            <div className="w-12 h-12 bg-cyan-400/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <Star className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Cyber Theme</h4>
                            <p className="text-cyan-300">Futuristic design elements</p>
                          </div>
                        )
                      }
                    ]}
                    autoPlay
                    showDots
                    variant="neon"
                    size="sm"
                  />
                </div>

                {/* Glass Carousel */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Glass Style</h4>
                  <Carousel
                    items={[
                      {
                        id: 1,
                        content: (
                          <div className="p-6 text-center text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <Heart className="w-6 h-6" />
            </div>
                            <h4 className="text-lg font-bold mb-2">Elegant Design</h4>
                            <p className="text-white/80">Beautiful glassmorphism effects</p>
            </div>
                        )
                      },
                      {
                        id: 2,
                        content: (
                          <div className="p-6 text-center text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <Crown className="w-6 h-6" />
          </div>
                            <h4 className="text-lg font-bold mb-2">Premium Feel</h4>
                            <p className="text-white/80">Luxury user experience</p>
          </div>
                        )
                      }
                    ]}
                    autoPlay
                    showDots
                    variant="glass"
                    size="sm"
                  />
            </div>
                  </div>
            </div>

            {/* Interactive Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Features</h3>
              <Carousel
                items={[
                  {
                    id: 1,
                    content: (
                      <div className="p-8 text-center">
                        <h4 className="text-xl font-bold mb-4">Auto-play Control</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Automatic slideshow with play/pause controls
                        </p>
                        <Button variant="neon" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Try Interactive Demo
                        </Button>
                      </div>
                    )
                  },
                  {
                    id: 2,
                    content: (
                      <div className="p-8 text-center">
                        <h4 className="text-xl font-bold mb-4">Touch & Swipe</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Full touch support with smooth swipe gestures
                        </p>
                        <Button variant="premium" size="sm">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Mobile Optimized
                        </Button>
                      </div>
                    )
                  },
                  {
                    id: 3,
                    content: (
                      <div className="p-8 text-center">
                        <h4 className="text-xl font-bold mb-4">Responsive Design</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Adapts to any screen size automatically
                        </p>
                        <Button variant="success" size="sm">
                          <Monitor className="w-4 h-4 mr-2" />
                          All Devices
                        </Button>
                      </div>
                    )
                  }
                ]}
                autoPlay
                autoPlayInterval={5000}
                showDots
                showArrows
                showPlayPause
                pauseOnHover
                variant="elevated"
                size="lg"
                className="max-w-4xl mx-auto"
                onSlideChange={(index) => {
                  addToast({
                    title: "Slide Changed",
                    description: `Now showing slide ${index + 1}`,
                    type: "info",
                    duration: 2000
                  });
                }}
              />
            </div>
          </div>
        );
      case 'kanban':
        return (
          <div className="space-y-8">
            {/* Basic Kanban Board */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Kanban Board</h3>
              <KanbanBoard columns={[
                {
                  id: 'todo',
                  title: 'To Do',
                  cards: [
                    {
                      id: 'basic-1',
                      title: 'Sample Task',
                      description: 'This is a sample task',
                      priority: 'medium' as const
                    }
                  ]
                },
                {
                  id: 'done',
                  title: 'Done',
                  cards: []
                }
              ]} />
            </div>
          </div>
        );
      case 'kanbanboard':
        return (
          <div className="space-y-8">
            {/* Modern Project Management Board */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Management Board</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg max-h-[600px] w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">Sprint 23.4 - Q4 2024</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dec 1 - Dec 15, 2024 • 14 days remaining</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="info">7 / 10 items</Badge>
                  </div>
                </div>
                
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 <strong>Interactive Demo:</strong> Try dragging cards between columns to see the real-time updates!
                  </p>
                </div>
                
                <div className="h-[450px] overflow-auto w-full">
                  <KanbanBoard
                    variant="modern"
                    columns={kanbanColumns}
                    showAddColumn={false}
                    showAddCard={false}
                    onCardMove={(cardId, fromColumn, toColumn) => {
                      // Update the kanban columns state
                      setKanbanColumns(prevColumns => {
                        const newColumns = [...prevColumns]
                        
                        // Find the card and remove it from source column
                        let movedCard: KanbanCard | null = null
                        const sourceColumnIndex = newColumns.findIndex(col => col.id === fromColumn)
                        if (sourceColumnIndex !== -1) {
                          const cardIndex = newColumns[sourceColumnIndex].cards.findIndex(card => card.id === cardId)
                          if (cardIndex !== -1) {
                            movedCard = newColumns[sourceColumnIndex].cards[cardIndex]
                            newColumns[sourceColumnIndex] = {
                              ...newColumns[sourceColumnIndex],
                              cards: newColumns[sourceColumnIndex].cards.filter(card => card.id !== cardId)
                            }
                          }
                        }
                        
                        // Add card to target column
                        if (movedCard) {
                          const targetColumnIndex = newColumns.findIndex(col => col.id === toColumn)
                          if (targetColumnIndex !== -1) {
                            // Ensure the moved card has all required properties
                            const completeCard = {
                              ...movedCard,
                              description: movedCard.description || '',
                              assignee: {
                                name: movedCard.assignee?.name || 'Unassigned',
                                avatar: movedCard.assignee?.avatar || 'U'
                              },
                              dueDate: movedCard.dueDate || new Date(),
                              priority: (movedCard.priority as "low" | "medium" | "high" | "urgent") || 'medium',
                              tags: movedCard.tags || [],
                              attachments: movedCard.attachments || 0,
                              comments: movedCard.comments || 0,
                              status: movedCard.status || 'pending',
                              progress: movedCard.progress || 0
                            };
                            newColumns[targetColumnIndex] = {
                              ...newColumns[targetColumnIndex],
                              cards: [...newColumns[targetColumnIndex].cards, completeCard as any]
                            }
                          }
                        }
                        
                        return newColumns
                      })
                      
                      addToast({
                        title: "Card Moved",
                        description: `Moved "${cardId}" from ${fromColumn} to ${toColumn}`,
                        type: "success",
                        duration: 3000
                      });
                    }}
                    onCardClick={(card) => {
                      setSelectedTask(card);
                      setTaskEditModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Interactive Features Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Features</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Kanban Board Features</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag and drop cards between columns, click cards for details, and manage your workflow efficiently.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">Team Collaboration</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Assign tasks, track progress, and collaborate with your team
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">Progress Tracking</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Visual progress indicators and sprint analytics
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">Premium Features</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Advanced workflows, custom fields, and automation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Task Edit Modal */}
            <TaskEditModal
              open={taskEditModalOpen}
              onOpenChange={setTaskEditModalOpen}
              task={selectedTask}
              onSave={handleTaskSave}
              onDelete={handleTaskDelete}
              assignees={mockAssignees}
              tags={mockTags}
              variant="premium"
            />
          </div>
        );
      case 'aiassistant':
        return (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                🤖 <strong>AI Assistant Demo:</strong> Experience next-generation conversational AI with voice support, file uploads, and intelligent suggestions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-lg">Default Assistant</h4>
                <AIAssistant
                  variant="default"
                  theme="light"
                  capabilities={['text', 'voice', 'file']}
                  personality="professional"
                  maxHeight={400}
                  customPrompts={[
                    "Help me write a professional email",
                    "Explain React hooks",
                    "Create a project plan"
                  ]}
                />
              </div>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-lg">Creative Assistant</h4>
                <AIAssistant
                  variant="default"
                  theme="gradient"
                  capabilities={['text', 'voice', 'image', 'file']}
                  personality="creative"
                  maxHeight={400}
                  customPrompts={[
                    "Generate creative ideas",
                    "Write a story",
                    "Design a logo concept"
                  ]}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Floating Assistant</h4>
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
                <AIAssistant
                  variant="floating"
                  theme="neon"
                  capabilities={['text', 'voice']}
                  personality="technical"
                  showBranding={false}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Floating AI Assistant
                    </h5>
                    <p className="text-gray-500 dark:text-gray-400">
                      Click the floating button to start chatting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'modelviewer3d':
        return (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                🎯 <strong>シンプル3Dデモ:</strong> ボタンを押して3Dモデル処理のデモをご覧ください。
              </p>
            </div>

            <div className="text-center space-y-6">
              <Card variant="elevated" className="p-8 max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Layers className="w-5 h-5 text-blue-500" />
                    3D Model Viewer Demo
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    3Dモデルの処理デモを開始
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl mx-auto flex items-center justify-center">
                    <Layers className="w-12 h-12 text-blue-500" />
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    size="lg"
                    onClick={() => {
                      setModalOpen(true);
                      setTimeout(() => setModalOpen(false), 6000);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    3Dモデル処理を開始
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 3D Processing Modal */}
            <AnimatePresence>
              {modalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setModalOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Layers className="w-16 h-16 text-blue-500 mx-auto" />
                      </motion.div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">3D Processing</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          モデルを処理しています...
                        </p>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "easeInOut" }}
                        />
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5 }}
                        className="text-center"
                      >
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold text-green-600">処理完了！</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          3Dモデルの処理が正常に完了しました
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      case 'toast':
      case 'notification':
        return (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Basic Toast Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Toast Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20"
                  onClick={() => addToast({
                    title: 'Success!',
                    description: 'Your changes have been saved successfully.',
                    type: 'success'
                  })}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Success Toast
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20"
                  onClick={() => addToast({
                    title: 'Error Occurred',
                    description: 'Something went wrong. Please try again.',
                    type: 'error'
                  })}
                >
                  <X className="w-4 h-4 mr-2" />
                  Error Toast
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
                  onClick={() => addToast({
                    title: 'Warning',
                    description: 'Please check your input before proceeding.',
                    type: 'warning'
                  })}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Warning Toast
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20"
                  onClick={() => addToast({
                    title: 'Information',
                    description: 'Here\'s some helpful information for you.',
                    type: 'info'
                  })}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Info Toast
                </Button>
              </div>
            </div>

            {/* Advanced Toast Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  variant="premium"
                  onClick={() => addToast({
                    title: 'Premium Feature Unlocked',
                    description: 'You now have access to advanced analytics and reporting.',
                    type: 'success',
                    duration: 8000
                  })}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Long Duration (8s)
                </Button>
                
                <Button 
                  variant="neon"
                  onClick={() => addToast({
                    title: 'System Update',
                    description: 'New features are now available!',
                    type: 'info',
                    duration: 0,
                  })}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Persistent Toast
                </Button>
                
                <Button 
                  variant="glass"
                  onClick={() => addToast({
                    title: 'Action Required',
                    description: 'Would you like to enable notifications?',
                    type: 'warning',
                    action: {
                      label: 'Enable',
                      onClick: () => addToast({
                        title: 'Notifications Enabled',
                        description: 'You will now receive push notifications.',
                        type: 'success'
                      })
                    }
                  })}
                >
                  <Target className="w-4 h-4 mr-2" />
                  With Action
                </Button>
              </div>
            </div>

            {/* Toast Positioning Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toast Positioning</h3>
              <div className="relative">
                <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Toast appears in the top-right corner</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All toasts are positioned consistently for optimal user experience
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button 
                        size="sm"
                        onClick={() => addToast({
                          title: 'File Uploaded',
                          description: 'Document.pdf has been uploaded successfully.',
                          type: 'success'
                        })}
                      >
                        Upload Success
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => addToast({
                          title: 'Download Started',
                          description: 'Your file download has begun.',
                          type: 'info'
                        })}
                      >
                        Download Info
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => addToast({
                          title: 'Storage Almost Full',
                          description: 'You are using 90% of your storage space.',
                          type: 'warning'
                        })}
                      >
                        Storage Warning
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Interactive Toast Playground */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Playground</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Custom Toast Builder</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Experiment with different toast configurations
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Toast Title</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter toast title..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Enter toast description..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Toast Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['success', 'error', 'warning', 'info'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setFormData(prev => ({ ...prev, email: type }))}
                              className={cn(
                                "px-3 py-2 text-sm rounded-lg border transition-colors capitalize",
                                formData.email === type
                                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[3, 5, 0].map((duration) => (
                            <button
                              key={duration}
                              onClick={() => setFormData(prev => ({ ...prev, message: duration.toString() }))}
                              className={cn(
                                "px-3 py-2 text-sm rounded-lg border transition-colors",
                                formData.message === duration.toString()
                                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                              )}
                            >
                              {duration === 0 ? 'Persistent' : `${duration}s`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={() => addToast({
                        title: formData.name || 'Custom Toast',
                        description: formData.message || 'This is a custom toast notification',
                        type: (formData.email as "success" | "info" | "warning" | "error") || 'info',
                        duration: formData.message === '0' ? 0 : parseInt(formData.message || '5') * 1000
                      })}
                      className="min-w-[120px]"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Show Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-world Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-world Scenarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">E-commerce</h4>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'Added to Cart',
                          description: 'iPhone 15 Pro has been added to your cart.',
                          type: 'success'
                        })}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'Order Confirmed',
                          description: 'Your order #12345 has been confirmed.',
                          type: 'success',
                          action: {
                            label: 'Track Order',
                            onClick: () => addToast({
                              title: 'Tracking Info',
                              description: 'Order is being prepared for shipment.',
                              type: 'info'
                            })
                          }
                        })}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Social Media</h4>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'Post Published',
                          description: 'Your post has been shared with your followers.',
                          type: 'success'
                        })}
                      >
                        Publish Post
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'New Follower',
                          description: 'John Doe started following you.',
                          type: 'info',
                          action: {
                            label: 'View Profile',
                            onClick: () => addToast({
                              title: 'Profile Viewed',
                              description: 'Viewing John Doe\'s profile.',
                              type: 'info'
                            })
                          }
                        })}
                      >
                        New Follower
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">File Management</h4>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'File Uploaded',
                          description: 'presentation.pptx uploaded successfully.',
                          type: 'success'
                        })}
                      >
                        Upload File
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => addToast({
                          title: 'Sync Complete',
                          description: 'All files have been synchronized.',
                          type: 'success',
                          duration: 8000
                        })}
                      >
                        Sync Files
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'richtexteditor':
      case 'editor':
        return (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Demo Introduction */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✨ <strong>Interactive Rich Text Editor:</strong> Create formatted content with our powerful editor. Type, format, and see the results below!
              </p>
            </div>

            {/* Rich Text Editor States */}
            <RichTextEditorDemo />
          </div>
        );

      case 'smartform':
        return (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Demo Introduction */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                📝 <strong>Smart Form:</strong> Experience advanced forms with dynamic validation and adaptive UI. Fill out the forms below to explore the features!
              </p>
            </div>

            {/* Basic Smart Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('component.smartForm')} - Basic Demo
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Contact Form</h4>
                  <SmartForm
                    config={{
                      id: 'contact-form',
                      title: 'Get in Touch',
                      description: 'Send us a message and we\'ll get back to you soon.',
                      fields: [
                        {
                          id: 'firstName',
                          type: 'text',
                          label: 'First Name',
                          placeholder: 'Enter your first name',
                          required: true,
                          validation: [
                            { type: 'required', message: 'First name is required' },
                            { type: 'minLength', value: 2, message: 'Must be at least 2 characters' }
                          ],
                          autoComplete: 'given-name'
                        },
                        {
                          id: 'lastName',
                          type: 'text',
                          label: 'Last Name',
                          placeholder: 'Enter your last name',
                          required: true,
                          validation: [
                            { type: 'required', message: 'Last name is required' },
                            { type: 'minLength', value: 2, message: 'Must be at least 2 characters' }
                          ],
                          autoComplete: 'family-name'
                        },
                        {
                          id: 'email',
                          type: 'email',
                          label: 'Email Address',
                          placeholder: 'your@email.com',
                          required: true,
                          validation: [
                            { type: 'required', message: 'Email is required' },
                            { type: 'email', message: 'Please enter a valid email address' }
                          ],
                          autoComplete: 'email'
                        },
                        {
                          id: 'phone',
                          type: 'tel',
                          label: 'Phone Number',
                          placeholder: '(555) 123-4567',
                          validation: [
                            { type: 'pattern', value: /^\(\d{3}\) \d{3}-\d{4}$/, message: 'Please enter a valid phone number' }
                          ],
                          autoComplete: 'tel'
                        },
                        {
                          id: 'subject',
                          type: 'select',
                          label: 'Subject',
                          placeholder: 'Select a topic',
                          required: true,
                          options: [
                            { value: 'general', label: 'General Inquiry' },
                            { value: 'support', label: 'Technical Support' },
                            { value: 'sales', label: 'Sales Question' },
                            { value: 'partnership', label: 'Partnership' },
                            { value: 'other', label: 'Other' }
                          ]
                        },
                        {
                          id: 'message',
                          type: 'textarea',
                          label: 'Message',
                          placeholder: 'Tell us about your project or question...',
                          required: true,
                          rows: 4,
                          validation: [
                            { type: 'required', message: 'Message is required' },
                            { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' }
                          ]
                        },
                        {
                          id: 'newsletter',
                          type: 'checkbox',
                          label: 'Subscribe to our newsletter for updates and tips'
                        }
                      ],
                      submitText: 'Send Message',
                      showProgress: true,
                      autoSave: true,
                      onSubmit: (data) => {
                        console.log('Form submitted:', data);
                        addToast({
                          title: 'Message Sent!',
                          description: 'Thank you for your message. We\'ll get back to you soon.',
                          type: 'success'
                        });
                      }
                    }}
                    variant="card"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Registration Form</h4>
                  <SmartForm
                    config={{
                      id: 'registration-form',
                      title: 'Create Account',
                      description: 'Join our platform and start building amazing apps.',
                      fields: [
                        {
                          id: 'username',
                          type: 'text',
                          label: 'Username',
                          placeholder: 'Choose a unique username',
                          required: true,
                          validation: [
                            { type: 'required', message: 'Username is required' },
                            { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
                            { type: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
                          ]
                        },
                        {
                          id: 'email',
                          type: 'email',
                          label: 'Email',
                          placeholder: 'your@email.com',
                          required: true,
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
                          validation: [
                            { type: 'required', message: 'Password is required' },
                            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
                            { type: 'pattern', value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Password must contain uppercase, lowercase, and number' }
                          ]
                        },
                        {
                          id: 'confirmPassword',
                          type: 'password',
                          label: 'Confirm Password',
                          placeholder: 'Confirm your password',
                          required: true,
                          dependencies: ['password'],
                          validation: [
                            { type: 'required', message: 'Please confirm your password' }
                          ]
                        },
                        {
                          id: 'accountType',
                          type: 'radio',
                          label: 'Account Type',
                          required: true,
                          options: [
                            { value: 'personal', label: 'Personal', description: 'For individual use' },
                            { value: 'business', label: 'Business', description: 'For teams and organizations' },
                            { value: 'enterprise', label: 'Enterprise', description: 'For large organizations' }
                          ]
                        },
                        {
                          id: 'interests',
                          type: 'multiselect',
                          label: 'Areas of Interest',
                          options: [
                            { value: 'webdev', label: 'Web Development' },
                            { value: 'mobile', label: 'Mobile Development' },
                            { value: 'ai', label: 'AI/Machine Learning' },
                            { value: 'design', label: 'UI/UX Design' },
                            { value: 'data', label: 'Data Science' },
                            { value: 'devops', label: 'DevOps' }
                          ]
                        },
                        {
                          id: 'terms',
                          type: 'checkbox',
                          label: 'I agree to the Terms of Service and Privacy Policy',
                          required: true,
                          validation: [
                            { type: 'required', message: 'You must agree to the terms' }
                          ]
                        }
                      ],
                      submitText: 'Create Account',
                      showProgress: true,
                      showValidationSummary: true,
                      onSubmit: (data) => {
                        console.log('Registration submitted:', data);
                        addToast({
                          title: 'Account Created!',
                          description: 'Welcome aboard! Check your email to verify your account.',
                          type: 'success'
                        });
                      }
                    }}
                    variant="gradient"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Smart Form Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Advanced Features Demo
              </h3>
              
              {/* Multi-step Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Multi-Step Form</h4>
                <SmartForm
                  config={{
                    id: 'multi-step-form',
                    title: 'Project Setup Wizard',
                    description: 'Let\'s set up your new project step by step.',
                    multiStep: true,
                    steps: [
                      {
                        id: 'basic',
                        title: 'Basic Info',
                        description: 'Project name and description',
                        fields: ['projectName', 'description', 'category']
                      },
                      {
                        id: 'technical',
                        title: 'Technical Setup',
                        description: 'Framework and deployment options',
                        fields: ['framework', 'database', 'deployment']
                      },
                      {
                        id: 'team',
                        title: 'Team & Settings',
                        description: 'Team members and project settings',
                        fields: ['teamMembers', 'visibility', 'notifications']
                      }
                    ],
                    fields: [
                      {
                        id: 'projectName',
                        type: 'text',
                        label: 'Project Name',
                        placeholder: 'My Awesome Project',
                        required: true,
                        validation: [
                          { type: 'required', message: 'Project name is required' },
                          { type: 'minLength', value: 3, message: 'Project name must be at least 3 characters' }
                        ]
                      },
                      {
                        id: 'description',
                        type: 'textarea',
                        label: 'Project Description',
                        placeholder: 'Describe what your project does...',
                        rows: 3
                      },
                      {
                        id: 'category',
                        type: 'select',
                        label: 'Project Category',
                        required: true,
                        options: [
                          { value: 'web', label: 'Web Application' },
                          { value: 'mobile', label: 'Mobile App' },
                          { value: 'desktop', label: 'Desktop Application' },
                          { value: 'api', label: 'API/Backend' },
                          { value: 'other', label: 'Other' }
                        ]
                      },
                      {
                        id: 'framework',
                        type: 'select',
                        label: 'Framework',
                        required: true,
                        conditionalLogic: [
                          {
                            field: 'category',
                            operator: 'equals',
                            value: 'web',
                            action: 'show'
                          }
                        ],
                        options: [
                          { value: 'react', label: 'React', icon: '⚛️' },
                          { value: 'vue', label: 'Vue.js', icon: '💚' },
                          { value: 'angular', label: 'Angular', icon: '🅰️' },
                          { value: 'svelte', label: 'Svelte', icon: '🔥' },
                          { value: 'nextjs', label: 'Next.js', icon: '▲' }
                        ]
                      },
                      {
                        id: 'database',
                        type: 'multiselect',
                        label: 'Database',
                        options: [
                          { value: 'postgresql', label: 'PostgreSQL' },
                          { value: 'mysql', label: 'MySQL' },
                          { value: 'mongodb', label: 'MongoDB' },
                          { value: 'redis', label: 'Redis' },
                          { value: 'sqlite', label: 'SQLite' }
                        ]
                      },
                      {
                        id: 'deployment',
                        type: 'radio',
                        label: 'Deployment Platform',
                        options: [
                          { value: 'vercel', label: 'Vercel', description: 'Optimized for frontend frameworks' },
                          { value: 'netlify', label: 'Netlify', description: 'JAMstack deployment platform' },
                          { value: 'aws', label: 'AWS', description: 'Amazon Web Services' },
                          { value: 'heroku', label: 'Heroku', description: 'Platform as a Service' },
                          { value: 'docker', label: 'Docker', description: 'Containerized deployment' }
                        ]
                      },
                      {
                        id: 'teamMembers',
                        type: 'textarea',
                        label: 'Team Members',
                        placeholder: 'Enter team member email addresses (one per line)',
                        rows: 3
                      },
                      {
                        id: 'visibility',
                        type: 'radio',
                        label: 'Project Visibility',
                        defaultValue: 'private',
                        options: [
                          { value: 'public', label: 'Public', description: 'Anyone can see this project' },
                          { value: 'private', label: 'Private', description: 'Only team members can access' },
                          { value: 'internal', label: 'Internal', description: 'Organization members only' }
                        ]
                      },
                      {
                        id: 'notifications',
                        type: 'multiselect',
                        label: 'Notification Preferences',
                        options: [
                          { value: 'email', label: 'Email notifications' },
                          { value: 'slack', label: 'Slack integration' },
                          { value: 'webhook', label: 'Webhook notifications' },
                          { value: 'sms', label: 'SMS alerts' }
                        ]
                      }
                    ],
                    submitText: 'Create Project',
                    showProgress: true,
                    adaptiveLayout: true,
                    onSubmit: (data) => {
                      console.log('Project created:', data);
                      addToast({
                        title: 'Project Created Successfully!',
                        description: 'Your project has been set up and is ready to use.',
                        type: 'success'
                      });
                    }
                  }}
                  variant="floating"
                  size="lg"
                />
              </div>

              {/* Rating and Review Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Rating & Review Form</h4>
                <SmartForm
                  config={{
                    id: 'review-form',
                    title: 'Rate Your Experience',
                    description: 'Help us improve by sharing your feedback.',
                    fields: [
                      {
                        id: 'overallRating',
                        type: 'rating',
                        label: 'Overall Rating',
                        required: true,
                        validation: [
                          { type: 'required', message: 'Please provide a rating' }
                        ]
                      },
                      {
                        id: 'categories',
                        type: 'multiselect',
                        label: 'What did you like most?',
                        options: [
                          { value: 'design', label: '🎨 Design & UI' },
                          { value: 'performance', label: '⚡ Performance' },
                          { value: 'features', label: '✨ Features' },
                          { value: 'ease', label: '👌 Ease of Use' },
                          { value: 'support', label: '🤝 Customer Support' },
                          { value: 'value', label: '💰 Value for Money' }
                        ]
                      },
                      {
                        id: 'reviewTitle',
                        type: 'text',
                        label: 'Review Title',
                        placeholder: 'Summarize your experience in one line'
                      },
                      {
                        id: 'reviewText',
                        type: 'textarea',
                        label: 'Detailed Review',
                        placeholder: 'Tell us more about your experience...',
                        rows: 4
                      },
                      {
                        id: 'recommend',
                        type: 'radio',
                        label: 'Would you recommend us to others?',
                        required: true,
                        options: [
                          { value: 'definitely', label: '😍 Definitely' },
                          { value: 'probably', label: '👍 Probably' },
                          { value: 'maybe', label: '🤔 Maybe' },
                          { value: 'probably-not', label: '👎 Probably Not' },
                          { value: 'definitely-not', label: '😞 Definitely Not' }
                        ]
                      },
                      {
                        id: 'improvements',
                        type: 'textarea',
                        label: 'Suggestions for Improvement',
                        placeholder: 'How can we make this even better?',
                        rows: 3
                      }
                    ],
                    submitText: 'Submit Review',
                    onSubmit: (data) => {
                      console.log('Review submitted:', data);
                      addToast({
                        title: 'Thank You!',
                        description: 'Your review has been submitted and helps us improve.',
                        type: 'success'
                      });
                    }
                  }}
                  variant="premium"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Demo Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Interactive demo for this component is being prepared
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Back to Components
            </Button>
            
            <div className="flex gap-2">
              {onPrevious && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              )}
              {onNext && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {component.icon && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                {React.isValidElement(component.icon) 
                  ? React.cloneElement(component.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })
                  : component.icon}
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{component.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(component.complexity)}`}>
                  {component.complexity}
                </span>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {component.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{component.dependencies.length} dependencies</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {component.new && <Badge variant="success">New</Badge>}
            {component.premium && <Badge variant="premium">Pro</Badge>}
            {component.featured && <Badge variant="warning">Featured</Badge>}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Overview
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              {t('code.examples')}
          </TabsTrigger>
          <TabsTrigger value="props" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('code.props')}
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t('code.usage')}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-8">
            {/* Interactive Demo */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Interactive Demo
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <Button
                        variant={viewport === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewport('desktop')}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewport === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewport('tablet')}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewport === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewport('mobile')}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`transition-all duration-300 ${getViewportClass()}`}>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
                    {renderDemo()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card variant="gradient">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">Performance</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-2">
                    Optimized for speed and efficiency
                  </p>
                  <div className="text-2xl font-bold text-white">
                    Optimized
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold">Dependencies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Minimal external dependencies
                  </p>
                  <div className="text-2xl font-bold">
                    {component.dependencies.length} packages
                  </div>
                </CardContent>
              </Card>

              <Card variant="neon">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold">Code Quality</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Lightweight and tree-shakeable
                  </p>
                  <div className="text-2xl font-bold">
                    High Quality
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dependencies */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {component.dependencies.map((dep) => (
                    <div
                      key={dep}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded">
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">{dep}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Required
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples">
          <div className="space-y-6">
            {codeExamples.map((example, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={
                            example.category === 'basic' ? 'success' :
                            example.category === 'advanced' ? 'warning' :
                            example.category === 'custom' ? 'premium' : 'default'
                          }
                          size="sm"
                        >
                          {example.category}
                        </Badge>
                      </div>
                      <CardTitle>{example.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(example.code, example.title)}
                      leftIcon={copied === example.title ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    >
                      {copied === example.title ? t('action.copied') : t('action.copy')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="props">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Component Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold">Property</th>
                      <th className="text-left py-3 px-4 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Required</th>
                      <th className="text-left py-3 px-4 font-semibold">Default</th>
                      <th className="text-left py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((prop, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                            {prop.name}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-blue-600 dark:text-blue-400 text-sm">
                            {prop.type}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          {prop.required ? (
                            <Badge variant="error" size="sm">Required</Badge>
                          ) : (
                            <Badge variant="outline" size="sm">Optional</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {prop.default ? (
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                              {prop.default}
                            </code>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {prop.description}
                          {prop.examples && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {prop.examples.map((example, i) => (
                                <code key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-xs">
                                  {example}
                                </code>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage">
          <div className="space-y-6">
            {usageExamples.map((example, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    {example.description}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" size="sm">
                      {example.scenario}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 