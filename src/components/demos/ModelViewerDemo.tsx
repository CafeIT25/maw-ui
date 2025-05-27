import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Box,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move3D,
  Camera,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Settings,
  Download,
  Share2,
  Eye,
  Layers,
  Palette,
  Sun,
  Monitor,
  Smartphone,
  Sparkles,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Upload,
  Grid3X3,
  Lightbulb,
  MousePointer,
  RotateCw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Gamepad2,
  Cpu,
  Globe,
  Star,
  Info,
  Sliders,
  Image,
  Film,
  Headphones
} from 'lucide-react';

// 高度な3D Model Viewerコンポーネント（デモ用）
interface ModelViewerProps {
  modelUrl?: string;
  width?: number | string;
  height?: number | string;
  autoRotate?: boolean;
  controls?: boolean;
  environment?: string;
  cameraPosition?: [number, number, number];
  lighting?: 'studio' | 'natural' | 'dramatic' | 'soft';
  variant?: 'default' | 'minimal' | 'professional' | 'showcase';
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  width = '100%',
  height = 400,
  autoRotate = false,
  controls = true,
  environment = 'studio',
  lighting = 'studio',
  variant = 'default',
  className = ''
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoRotate);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotation(prev => ({ ...prev, y: prev.y + 1 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const variantClasses = {
    default: 'border border-gray-200 dark:border-gray-700 rounded-lg',
    minimal: 'border-0 rounded-none',
    professional: 'border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg',
    showcase: 'border-0 rounded-2xl bg-gradient-to-br from-gray-900 to-black'
  };

  return (
    <div className={`relative overflow-hidden ${variantClasses[variant]} ${className}`}>
      <div 
        ref={viewerRef}
        style={{ width, height }}
        className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading 3D Model...</p>
          </div>
        ) : (
          <div 
            className="relative w-32 h-32 transition-transform duration-100"
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})` 
            }}
          >
            {/* Mock 3D Model */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-2xl transform rotate-12 animate-pulse">
                <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-70"></div>
                <div className="absolute bottom-4 right-4 w-6 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute inset-4 border-2 border-white/20 rounded"></div>
              </div>
            </div>
          </div>
        )}

        {/* Control Overlay */}
        {controls && !isLoading && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRotation({ x: 0, y: 0 })}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
                className="text-white hover:bg-white/20"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
                className="text-white hover:bg-white/20"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Environment Indicator */}
        <div className="absolute top-4 right-4">
          <Badge variant="glass" size="sm">
            {environment}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export const ModelViewerDemo: React.FC = () => {
  // State management
  const [selectedModel, setSelectedModel] = useState('cube');
  const [viewerSettings, setViewerSettings] = useState({
    autoRotate: true,
    environment: 'studio',
    lighting: 'natural',
    wireframe: false,
    shadows: true
  });
  const [animationState, setAnimationState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 100,
    speed: 1
  });

  const models = [
    { id: 'cube', name: 'Geometric Cube', size: '2.4 MB', complexity: 'Low' },
    { id: 'character', name: 'Animated Character', size: '15.2 MB', complexity: 'High' },
    { id: 'vehicle', name: 'Sports Car', size: '8.7 MB', complexity: 'Medium' },
    { id: 'building', name: 'Architecture Model', size: '22.1 MB', complexity: 'Very High' }
  ];

  const environments = [
    { id: 'studio', name: 'Studio', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'outdoor', name: 'Outdoor', icon: <Sun className="w-4 h-4" /> },
    { id: 'indoor', name: 'Indoor', icon: <Monitor className="w-4 h-4" /> },
    { id: 'abstract', name: 'Abstract', icon: <Sparkles className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Box className="w-8 h-8 text-white animate-spin" />
              <Badge variant="glass">Enterprise 3D Engine</Badge>
              <Move3D className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Next-Gen 3D Model Viewer
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionary 3D visualization platform with enterprise-grade performance, 
              intelligent rendering optimization, and immersive user experiences that redefine industry standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎯</div>
                <div className="text-white/80 text-sm">WebGL 2.0</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⚡</div>
                <div className="text-white/80 text-sm">60 FPS</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🚀</div>
                <div className="text-white/80 text-sm">GPU Optimized</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🔮</div>
                <div className="text-white/80 text-sm">AR/VR Ready</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic 3D Viewer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Interactive</Badge>
            Advanced 3D Model Viewer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Viewer */}
            <div className="lg:col-span-2 space-y-4">
              <ModelViewer
                height={400}
                autoRotate={viewerSettings.autoRotate}
                environment={viewerSettings.environment}
                lighting={viewerSettings.lighting as any}
                variant="professional"
              />
              
              {/* Quick Controls */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewerSettings(prev => ({ ...prev, autoRotate: !prev.autoRotate }))}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    {viewerSettings.autoRotate ? 'Stop' : 'Rotate'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  Viewer Settings
                </h3>
                
                <div className="space-y-4">
                  {/* Environment Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Environment</label>
                    <div className="grid grid-cols-2 gap-2">
                      {environments.map((env) => (
                        <Button
                          key={env.id}
                          variant={viewerSettings.environment === env.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewerSettings(prev => ({ ...prev, environment: env.id }))}
                          className="justify-start"
                        >
                          {env.icon}
                          <span className="ml-2 text-xs">{env.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Lighting */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lighting</label>
                    <select 
                      value={viewerSettings.lighting}
                      onChange={(e) => setViewerSettings(prev => ({ ...prev, lighting: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="natural">Natural</option>
                      <option value="studio">Studio</option>
                      <option value="dramatic">Dramatic</option>
                      <option value="soft">Soft</option>
                    </select>
                  </div>

                  {/* Toggle Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wireframe Mode</span>
                      <button
                        onClick={() => setViewerSettings(prev => ({ ...prev, wireframe: !prev.wireframe }))}
                        className={`
                          relative w-11 h-6 rounded-full transition-colors duration-200
                          ${viewerSettings.wireframe ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                        `}
                      >
                        <div className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                          ${viewerSettings.wireframe ? 'translate-x-5' : 'translate-x-0'}
                        `} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cast Shadows</span>
                      <button
                        onClick={() => setViewerSettings(prev => ({ ...prev, shadows: !prev.shadows }))}
                        className={`
                          relative w-11 h-6 rounded-full transition-colors duration-200
                          ${viewerSettings.shadows ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                        `}
                      >
                        <div className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                          ${viewerSettings.shadows ? 'translate-x-5' : 'translate-x-0'}
                        `} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Performance
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>FPS</span>
                    <span className="font-mono text-green-600">60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Triangles</span>
                    <span className="font-mono">1,247,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Draw Calls</span>
                    <span className="font-mono">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span className="font-mono">156 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Gallery</Badge>
            3D Model Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {models.map((model) => (
              <div 
                key={model.id}
                className={`
                  group cursor-pointer border-2 rounded-lg p-4 transition-all duration-200
                  ${selectedModel === model.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="aspect-square mb-3 relative">
                  <ModelViewer
                    height="100%"
                    autoRotate={true}
                    controls={false}
                    variant="minimal"
                    environment="studio"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-2">{model.name}</h3>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <span>{model.size}</span>
                  <Badge variant="outline" size="sm">{model.complexity}</Badge>
                </div>
                <Button 
                  variant={selectedModel === model.id ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                >
                  {selectedModel === model.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animation Studio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Animation</Badge>
            Timeline & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Animation Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAnimationState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                >
                  {animationState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <SkipForward className="w-4 h-4" />
                </Button>
                <div className="text-sm font-mono">
                  {Math.floor(animationState.currentTime / 60)}:
                  {(animationState.currentTime % 60).toString().padStart(2, '0')} / 
                  {Math.floor(animationState.duration / 60)}:
                  {(animationState.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm">Speed:</span>
                <select 
                  value={animationState.speed}
                  onChange={(e) => setAnimationState(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Animation Timeline</span>
                <span>Frame {animationState.currentTime} / {animationState.duration}</span>
              </div>
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-100"
                  style={{ width: `${(animationState.currentTime / animationState.duration) * 100}%` }}
                />
              </div>
            </div>

            {/* Animation Properties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Transform</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Position X</span>
                    <input type="range" min="-10" max="10" step="0.1" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Position Y</span>
                    <input type="range" min="-10" max="10" step="0.1" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Position Z</span>
                    <input type="range" min="-10" max="10" step="0.1" className="w-20" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Rotation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rotation X</span>
                    <input type="range" min="0" max="360" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Rotation Y</span>
                    <input type="range" min="0" max="360" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Rotation Z</span>
                    <input type="range" min="0" max="360" className="w-20" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Scale</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Scale X</span>
                    <input type="range" min="0.1" max="3" step="0.1" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Scale Y</span>
                    <input type="range" min="0.1" max="3" step="0.1" className="w-20" />
                  </div>
                  <div className="flex justify-between">
                    <span>Scale Z</span>
                    <input type="range" min="0.1" max="3" step="0.1" className="w-20" />
                  </div>
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
            <Badge variant="premium">Enterprise</Badge>
            Advanced Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">WebGL 2.0</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hardware-accelerated rendering with modern graphics pipeline
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enterprise-grade security with DRM protection and access controls
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg text-center">
              <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Cross-Platform</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seamless experience across desktop, mobile, and VR platforms
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg text-center">
              <Cpu className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Optimization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intelligent LOD system with real-time performance monitoring
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Developer API</Badge>
            Enterprise 3D Viewer Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Advanced Usage Examples</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`import { ModelViewer } from '@maw-ui/components';

// Basic 3D model viewer
<ModelViewer
  modelUrl="/models/character.glb"
  width="100%"
  height={600}
  autoRotate={true}
  environment="studio"
  lighting="natural"
/>

// Advanced viewer with animations
<ModelViewer
  modelUrl="/models/animated-scene.gltf"
  animations={['walk', 'run', 'jump']}
  cameraPosition={[0, 5, 10]}
  onAnimationEnd={handleAnimationEnd}
  postProcessing={{
    bloom: true,
    shadows: 'pcss',
    antialiasing: 'msaa'
  }}
/>

// Enterprise viewer with collaboration
<ModelViewer
  modelUrl="/models/cad-model.fbx"
  collaborative={true}
  annotations={annotationData}
  materialEditor={true}
  exportFormats={['glb', 'obj', 'usd']}
  onUserInteraction={handleUserAction}
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Core Props</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">modelUrl</code>
                    <span className="text-gray-600 dark:text-gray-400">string</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">autoRotate</code>
                    <span className="text-gray-600 dark:text-gray-400">boolean</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">environment</code>
                    <span className="text-gray-600 dark:text-gray-400">studio | outdoor | indoor</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">lighting</code>
                    <span className="text-gray-600 dark:text-gray-400">natural | studio | dramatic</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">animations</code>
                    <span className="text-gray-600 dark:text-gray-400">string[]</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Enterprise Features</h4>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>WebGL 2.0 & WebGPU support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Real-time collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Progressive mesh loading</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AR/VR compatibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multi-format support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Performance analytics</span>
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

export default ModelViewerDemo; 