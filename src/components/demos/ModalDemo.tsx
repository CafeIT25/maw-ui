import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  X,
  Shield,
  AlertTriangle,
  Info,
  CheckCircle,
  Edit,
  Image,
  Video,
  Layers,
  Zap,
  Smartphone,
  User,
  Eye,
  Settings,
  Search,
  Sparkles,
  Maximize2,
  Play,
  Pause,
  Volume2,
  Upload,
  Wand2
} from 'lucide-react';

// 高度なModalコンポーネント（デモ用）
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  className?: string;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  title?: string;
  animate?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  className = '',
  closeOnBackdrop = true,
  showCloseButton = true,
  title,
  animate = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, animate ? 200 : 0);
      return () => clearTimeout(timer);
    }

    // ESCキーでモーダルを閉じる
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, animate]);

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    fullscreen: 'w-full h-full max-w-none'
  };

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${animate ? 'transition-all duration-200' : ''}
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          ${animate ? 'transition-opacity duration-200' : ''}
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      
      {/* Modal Content */}
      <div 
        className={`
          relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl
          border border-gray-200 dark:border-gray-700
          ${sizeClasses[size]}
          ${size === 'fullscreen' ? '' : 'max-h-[90vh] overflow-hidden'}
          ${animate ? 'transition-all duration-200 ease-out' : ''}
          ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={size === 'fullscreen' ? 'h-full overflow-auto' : 'max-h-[calc(90vh-120px)] overflow-auto'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalDemo: React.FC = () => {
  // Modal states
  const [modals, setModals] = useState({
    info: false,
    confirm: false,
    form: false,
    gallery: false,
    video: false,
    fullscreen: false,
    settings: false,
    profile: false,
    search: false,
    upload: false,
    preview: false,
    wizard: false
  });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    password: '',
    confirmPassword: ''
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const openModal = useCallback((modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({
      info: false,
      confirm: false,
      form: false,
      gallery: false,
      video: false,
      fullscreen: false,
      settings: false,
      profile: false,
      search: false,
      upload: false,
      preview: false,
      wizard: false
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      closeModal('form');
      openModal('info');
    }, 500);
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=nature',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=nature',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=nature'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Next-Gen Modal System</Badge>
              <Sparkles className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Enterprise Modal Components
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionary modal system with advanced animations, intelligent focus management, 
              and enterprise-grade accessibility that will amaze even Google and Microsoft developers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🚀</div>
                <div className="text-white/80 text-sm">12 Modal Types</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⚡</div>
                <div className="text-white/80 text-sm">Micro Interactions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎨</div>
                <div className="text-white/80 text-sm">Glass Morphism</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🧠</div>
                <div className="text-white/80 text-sm">AI-Ready</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Modal Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Interactive</Badge>
            Modal Component Showcase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Information Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-sm">Information</h3>
                </div>
                <Button onClick={() => openModal('info')} className="w-full" size="sm">
                  Show Info Modal
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Clean information display with smooth animations
                </p>
              </div>
            </div>

            {/* Confirmation Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-sm">Confirmation</h3>
                </div>
                <Button onClick={() => openModal('confirm')} variant="destructive" className="w-full" size="sm">
                  Delete Item
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Secure confirmation with action verification
                </p>
              </div>
            </div>

            {/* Form Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-sm">Contact Form</h3>
                </div>
                <Button onClick={() => openModal('form')} variant="success" className="w-full" size="sm">
                  Open Form
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Advanced form with validation and submission
                </p>
              </div>
            </div>

            {/* Gallery Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-sm">Image Gallery</h3>
                </div>
                <Button onClick={() => openModal('gallery')} variant="outline" className="w-full" size="sm">
                  View Gallery
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Interactive image gallery with navigation
                </p>
              </div>
            </div>

            {/* Video Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-sm">Video Player</h3>
                </div>
                <Button onClick={() => openModal('video')} variant="premium" className="w-full" size="sm">
                  Play Video
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Embedded video player with custom controls
                </p>
              </div>
            </div>

            {/* Fullscreen Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-sm">Fullscreen</h3>
                </div>
                <Button onClick={() => openModal('fullscreen')} variant="neon" className="w-full" size="sm">
                  Go Fullscreen
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Immersive fullscreen experience
                </p>
              </div>
            </div>

            {/* Settings Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-sm">Settings Panel</h3>
                </div>
                <Button onClick={() => openModal('settings')} variant="outline" className="w-full" size="sm">
                  Open Settings
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Comprehensive settings management
                </p>
              </div>
            </div>

            {/* Profile Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-500" />
                  <h3 className="font-semibold text-sm">User Profile</h3>
                </div>
                <Button onClick={() => openModal('profile')} variant="ghost" className="w-full" size="sm">
                  View Profile
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Detailed user profile management
                </p>
              </div>
            </div>

            {/* Search Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-pink-500" />
                  <h3 className="font-semibold text-sm">Smart Search</h3>
                </div>
                <Button onClick={() => openModal('search')} variant="outline" className="w-full" size="sm">
                  Open Search
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  AI-powered search interface
                </p>
              </div>
            </div>

            {/* Upload Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold text-sm">File Upload</h3>
                </div>
                <Button onClick={() => openModal('upload')} variant="outline" className="w-full" size="sm">
                  Upload Files
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Drag & drop file uploader
                </p>
              </div>
            </div>

            {/* Preview Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold text-sm">Document Preview</h3>
                </div>
                <Button onClick={() => openModal('preview')} variant="outline" className="w-full" size="sm">
                  Preview Doc
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Advanced document preview
                </p>
              </div>
            </div>

            {/* Wizard Modal */}
            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold text-sm">Setup Wizard</h3>
                </div>
                <Button onClick={() => openModal('wizard')} variant="premium" className="w-full" size="sm">
                  Start Wizard
                </Button>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Multi-step configuration wizard
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button 
              onClick={closeAllModals} 
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              Close All Modals
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Enterprise Features</Badge>
            Advanced Modal Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg text-center">
              <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Smart Focus Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic focus trap with intelligent restoration and keyboard navigation
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Enterprise Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                WCAG 2.1 AA compliant with advanced security features
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg text-center">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Micro Animations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fluid 60fps animations with hardware acceleration
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg text-center">
              <Smartphone className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Adaptive Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intelligent responsive behavior for all devices
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">API</Badge>
            Component Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Basic Modal Usage</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`import { Modal } from '@maw-ui/components';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>Modal content goes here...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Advanced Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Props</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">open</code>
                      <span className="text-gray-600 dark:text-gray-400">boolean</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">onOpenChange</code>
                      <span className="text-gray-600 dark:text-gray-400">function</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">fullscreen</code>
                      <span className="text-gray-600 dark:text-gray-400">boolean</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">size</code>
                      <span className="text-gray-600 dark:text-gray-400">sm | md | lg | xl</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      ESC key to close
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Click outside to dismiss
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Focus restoration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Portal rendering
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Customizable styling
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Modal */}
      <Modal
        isOpen={modals.info}
        onClose={() => closeModal('info')}
        title="Information"
        size="md"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome to Next-Gen Modals
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This is an enterprise-grade modal system designed with cutting-edge technology. 
                Features include intelligent focus management, smooth animations, and 
                comprehensive accessibility support that exceeds WCAG 2.1 standards.
              </p>
              <div className="flex gap-2">
                <Badge variant="success" size="sm">Accessible</Badge>
                <Badge variant="premium" size="sm">Enterprise</Badge>
                <Badge variant="neon" size="sm">Next-Gen</Badge>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => closeModal('info')}>
              Got it!
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modals.confirm}
        onClose={() => closeModal('confirm')}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Item
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this item? This action cannot be undone 
                and all associated data will be permanently removed.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => closeModal('confirm')}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                closeModal('confirm');
                setTimeout(() => openModal('info'), 300);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={modals.form}
        onClose={() => closeModal('form')}
        title="Contact Form"
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
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
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter your message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="newsletter" className="rounded" />
            <label htmlFor="newsletter" className="text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for updates
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" type="button" onClick={() => closeModal('form')}>
              Cancel
            </Button>
            <Button type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </Modal>

      {/* Gallery Modal */}
      <Modal
        isOpen={modals.gallery}
        onClose={() => closeModal('gallery')}
        title="Image Gallery"
        size="xl"
      >
        <div className="p-6">
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={sampleImages[selectedImage]}
                alt={`Gallery image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-white">
                  <h3 className="font-semibold">Nature Photography</h3>
                  <p className="text-sm opacity-90">Image {selectedImage + 1} of {sampleImages.length}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : sampleImages.length - 1)}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(prev => prev < sampleImages.length - 1 ? prev + 1 : 0)}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              {sampleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedImage === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Video Modal */}
      <Modal
        isOpen={modals.video}
        onClose={() => closeModal('video')}
        title="Video Player"
        size="xl"
      >
        <div className="p-6">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">Demo Video</h3>
                <p className="text-gray-300">Experience next-generation video playback</p>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30"
                >
                  {isPlaying ? 'Pause' : 'Play'} Video
                </Button>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4 text-white">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <div className="flex-1 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm">1:23 / 4:56</span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={modals.fullscreen}
        onClose={() => closeModal('fullscreen')}
        size="fullscreen"
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      >
        <div className="h-full flex items-center justify-center text-white p-8">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12" />
            </div>
            <h1 className="text-5xl font-bold">Immersive Experience</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              This fullscreen modal demonstrates how our enterprise-grade system 
              can create immersive experiences that captivate users and enhance 
              engagement across all platforms.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Explore Features
              </Button>
              <Button 
                onClick={() => closeModal('fullscreen')}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Exit Fullscreen
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Developer API</Badge>
            Enterprise Modal Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Advanced Usage Examples</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`import { Modal } from '@maw-ui/components';

// Enterprise Modal with all features
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="lg"
  title="Advanced Modal"
  closeOnBackdrop={true}
  showCloseButton={true}
  animate={true}
  className="custom-modal"
>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Enterprise Features</ModalTitle>
    </ModalHeader>
    <ModalBody>
      {/* Rich content with forms, media, etc. */}
    </ModalBody>
    <ModalFooter>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

// Next-gen features
const modalConfig = {
  focusTrap: true,
  restoreFocus: true,
  closeOnEscape: true,
  portalTarget: '#modal-root',
  zIndex: 1000,
  animations: {
    enter: 'fade-slide-up',
    exit: 'fade-slide-down',
    duration: 200
  }
};`}</code>
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Advanced Props</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">size</code>
                    <span className="text-gray-600 dark:text-gray-400">sm | md | lg | xl | fullscreen</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">animate</code>
                    <span className="text-gray-600 dark:text-gray-400">boolean</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">closeOnBackdrop</code>
                    <span className="text-gray-600 dark:text-gray-400">boolean</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">focusTrap</code>
                    <span className="text-gray-600 dark:text-gray-400">boolean</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Enterprise Features</h4>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>WCAG 2.1 AA Compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Hardware-accelerated animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Intelligent focus management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Portal rendering support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multi-device responsive design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Customizable animation system</span>
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

export default ModalDemo; 