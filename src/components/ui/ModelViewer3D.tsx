import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  Download, 
  Maximize2, 
  Minimize2,
  Layers,
  Sun,
  Moon,
  Play,
  Pause,
  Camera,
  Smartphone,
  Zap,
  Info,
  Brain,
  Users,
  Share2,
  MessageSquare,
  Ruler,
  Target,
  Cpu,
  Database,
  Network,
  Lock,
  Award,
  Lightbulb
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { Slider } from './Slider';
import { Badge } from './Badge';

export interface ModelViewer3DProps {
  modelUrl?: string;
  modelType?: 'gltf' | 'obj' | 'fbx' | 'dae' | '3ds';
  autoRotate?: boolean;
  showControls?: boolean;
  showStats?: boolean;
  showGrid?: boolean;
  showAxes?: boolean;
  enableAR?: boolean;
  enableCollaboration?: boolean;
  enableAI?: boolean;
  background?: 'transparent' | 'gradient' | 'environment' | 'color';
  backgroundColor?: string;
  animations?: string[];
  materials?: string[];
  quality?: 'low' | 'medium' | 'high' | 'ultra';
  enterpriseMode?: boolean;
  securityLevel?: 'basic' | 'enterprise' | 'government';
  onLoad?: (model: Record<string, unknown>) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  onAnimationChange?: (animation: string) => void;
  onAIAnalysis?: (analysis: Record<string, unknown>) => void;
  className?: string;
  width?: number | string;
  height?: number | string;
  annotations?: Array<{
    id: string;
    position: [number, number, number];
    content: string;
    type: 'info' | 'warning' | 'error';
  }>;
  materialOverrides?: Record<string, unknown>;
  postProcessing?: Record<string, unknown>;
}

interface ViewerStats {
  vertices: number;
  faces: number;
  meshes: number;
  materials: number;
  textures: number;
  animations: number;
  fileSize: string;
  loadTime: number;
  renderTime?: number;
  memoryUsage?: string;
  qualityScore?: number;
}

interface AIAnalysis {
  qualityScore: number;
  optimizations: string[];
  printability: number;
  materialEfficiency: number;
  structuralIntegrity: number;
  recommendations: string[];
}

interface CollaborationEvent {
  id: string;
  type: 'annotation' | 'comment' | 'measurement';
  position: { x: number; y: number; z: number };
  content: string;
  user: string;
  timestamp: Date;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  modelUrl = '/models/default.gltf',
  modelType = 'gltf',
  autoRotate = true,
  showControls = true,
  showStats = false,
  showGrid = false,
  showAxes = false,
  enableAR = false,
  enableCollaboration = false,
  enableAI = false,
  background = 'gradient',
  backgroundColor = '#f0f0f0',
  animations = [],
  materials = [],
  quality = 'high',
  enterpriseMode = false,
  securityLevel = 'basic',
  onLoad,
  onError,
  onProgress,
  onAnimationChange,
  onAIAnalysis,
  className,
  width = '100%',
  height = 400
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [stats, setStats] = useState<ViewerStats | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [collaborationEvents] = useState<CollaborationEvent[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  // Enhanced initialization with enterprise features
  useEffect(() => {
    if (!viewerRef.current) return;

    const initViewer = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate enhanced loading with security checks
        const loadingSteps = [
          { step: 'Security validation', progress: 10 },
          { step: 'Model analysis', progress: 25 },
          { step: 'Texture loading', progress: 45 },
          { step: 'Optimization', progress: 70 },
          { step: 'Rendering setup', progress: 90 },
          { step: 'Ready', progress: 100 }
        ];

        for (const { progress: stepProgress } of loadingSteps) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setProgress(stepProgress);
          onProgress?.(stepProgress);
        }

        // Enhanced mock stats with enterprise metrics
        const mockStats: ViewerStats = {
          vertices: 15847 + Math.floor(Math.random() * 5000),
          faces: 12134 + Math.floor(Math.random() * 3000),
          meshes: 18 + Math.floor(Math.random() * 10),
          materials: 9 + Math.floor(Math.random() * 5),
          textures: 16 + Math.floor(Math.random() * 8),
          animations: animations.length,
          fileSize: `${(2.1 + Math.random() * 3).toFixed(1)} MB`,
          loadTime: Date.now(),
          renderTime: 16.7 + Math.random() * 5,
          memoryUsage: `${(156 + Math.random() * 100).toFixed(0)} MB`,
          qualityScore: 87 + Math.random() * 10
        };

        setStats(mockStats);
        setIsLoading(false);
        
        // Mock enhanced model object
        const mockModel = {
          scene: {},
          animations: animations,
          materials: materials,
          metadata: {
            creator: 'Professional Designer',
            software: 'Blender 4.0',
            createdDate: new Date(),
            optimized: true,
            encrypted: securityLevel !== 'basic'
          }
        };
        
        onLoad?.(mockModel);

        // Auto-start animation and AI analysis
        if (animations.length > 0) {
          setCurrentAnimation(animations[0]);
          setIsAnimationPlaying(autoRotate);
        }

        if (enableAI) {
          triggerAIAnalysis();
        }

      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setIsLoading(false);
        onError?.(error);
      }
    };

    initViewer();
  }, [modelUrl, modelType, autoRotate, animations, materials, onLoad, onError, onProgress, enableAI, securityLevel]);

  // AI Analysis function
  const triggerAIAnalysis = useCallback(async () => {
    if (!enableAI) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: AIAnalysis = {
      qualityScore: 87 + Math.random() * 10,
      optimizations: [
        'Reduce polygon count by 15% for better performance',
        'Optimize texture compression for web delivery',
        'Merge duplicate materials to reduce draw calls'
      ],
      printability: 92 + Math.random() * 5,
      materialEfficiency: 85 + Math.random() * 10,
      structuralIntegrity: 94 + Math.random() * 4,
      recommendations: [
        'Consider using PLA+ material for better durability',
        'Add support structures for overhanging parts',
        'Optimize infill pattern for weight reduction'
      ]
    };
    
    setAiAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    onAIAnalysis?.(mockAnalysis as unknown as Record<string, unknown>);
  }, [enableAI, onAIAnalysis]);

  const handleAnimationChange = useCallback((animationName: string) => {
    setCurrentAnimation(animationName);
    onAnimationChange?.(animationName);
  }, [onAnimationChange]);

  const toggleAnimation = useCallback(() => {
    setIsAnimationPlaying(!isAnimationPlaying);
  }, [isAnimationPlaying]);

  const resetCamera = useCallback(() => {
    // Reset camera logic
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const exportModel = useCallback(() => {
    const link = document.createElement('a');
    link.href = modelUrl;
    link.download = `model.${modelType}`;
    link.click();
  }, [modelUrl, modelType]);

  const takeScreenshot = useCallback(() => {
    // Mock screenshot with enterprise features
    document.createElement('canvas');
    // In real implementation, capture WebGL canvas
    console.log('High-resolution screenshot captured');
  }, []);

  const shareModel = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: '3D Model',
        url: window.location.href
      });
    }
  }, []);

  if (error) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-dashed border-red-300 dark:border-red-600',
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Model Loading Failed
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            {enterpriseMode && (
              <Button 
                variant="outline"
                size="sm"
              >
                <Database className="w-4 h-4 mr-2" />
                Check Cache
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
      style={{ width: isFullscreen ? '100vw' : width, height: isFullscreen ? '100vh' : height }}
    >
      {/* Enhanced Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {enterpriseMode ? 'Enterprise Model Loading' : 'Loading 3D Model'}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {progress}% Complete
              </p>
              {securityLevel !== 'basic' && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <Lock className="w-3 h-3" />
                  Secure loading enabled
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced 3D Viewer Canvas */}
      <div 
        ref={viewerRef}
        className="w-full h-full relative overflow-hidden"
        style={{
          background: background === 'gradient' 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : background === 'color'
            ? backgroundColor
            : 'transparent'
        }}
      >
        {/* Enhanced Mock 3D Scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotateY: autoRotate && isAnimationPlaying ? 360 : 0,
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-2xl shadow-2xl transform-gpu" 
                 style={{ transform: 'rotateX(15deg) rotateY(15deg)' }}>
              {/* Reflection effect */}
              <div className="absolute inset-2 bg-white/20 rounded-xl"></div>
              {/* Quality indicator */}
              {stats && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Grid */}
        {showGrid && (
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full">
              <defs>
                <pattern id="enhanced-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#enhanced-grid)" />
            </svg>
          </div>
        )}

        {/* Enhanced Axes */}
        {showAxes && (
          <div className="absolute top-4 left-4">
            <div className="flex space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
                <span className="text-xs text-red-500 font-mono font-bold">X</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-6 bg-gradient-to-t from-green-500 to-green-600 rounded"></div>
                <span className="text-xs text-green-500 font-mono font-bold">Y</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                <span className="text-xs text-blue-500 font-mono font-bold">Z</span>
              </div>
            </div>
          </div>
        )}

        {/* Collaboration Overlay */}
        {enableCollaboration && showCollaboration && (
          <div className="absolute inset-0 pointer-events-none">
            {collaborationEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute w-6 h-6 rounded-full pointer-events-auto cursor-pointer"
                style={{
                  left: `${event.position.x * 100}%`,
                  top: `${event.position.y * 100}%`,
                  backgroundColor: event.type === 'annotation' ? '#3b82f6' : event.type === 'comment' ? '#10b981' : '#f59e0b'
                }}
              >
                <div className="w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  {event.type === 'annotation' && <Target className="w-3 h-3 text-white" />}
                  {event.type === 'comment' && <MessageSquare className="w-3 h-3 text-white" />}
                  {event.type === 'measurement' && <Ruler className="w-3 h-3 text-white" />}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Controls Overlay */}
      {showControls && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex space-x-2 pointer-events-auto">
            {enableAI && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIPanel(!showAIPanel)}
                className={cn(
                  "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                  showAIPanel && "bg-purple-100 dark:bg-purple-900/50"
                )}
              >
                <Brain className="w-4 h-4" />
              </Button>
            )}

            {enableCollaboration && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCollaboration(!showCollaboration)}
                className={cn(
                  "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                  showCollaboration && "bg-blue-100 dark:bg-blue-900/50"
                )}
              >
                <Users className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={shareModel}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            {enableAR && (
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={takeScreenshot}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <Camera className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={exportModel}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Enhanced Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-2xl border border-white/20">
              {/* Animation Controls */}
              {animations.length > 0 && (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAnimation}
                  >
                    {isAnimationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <select
                    value={currentAnimation || ''}
                    onChange={(e) => handleAnimationChange(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                  >
                    {animations.map((anim) => (
                      <option key={anim} value={anim}>
                        {anim}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Speed:</span>
                    <Slider
                      value={animationSpeed}
                      onChange={(value) => setAnimationSpeed(value as number)}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="w-24"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{animationSpeed.toFixed(1)}x</span>
                  </div>
                </div>
              )}

              {/* Enhanced View Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetCamera}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWireframeMode(!wireframeMode)}
                    className={wireframeMode ? 'bg-blue-100 dark:bg-blue-900' : ''}
                  >
                    <Layers className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShadowEnabled(!shadowEnabled)}
                    className={shadowEnabled ? 'bg-yellow-100 dark:bg-yellow-900' : ''}
                  >
                    {shadowEnabled ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>

                  {enterpriseMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-purple-100 dark:bg-purple-900"
                    >
                      <Network className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Lighting:</span>
                    <Slider
                      value={lightIntensity}
                      onChange={(value) => setLightIntensity(value as number)}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-24"
                    />
                  </div>

                  {stats && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      FPS: {stats.renderTime?.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Stats Panel */}
      {showStats && stats && (
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-4 text-xs space-y-2 pointer-events-auto shadow-2xl border border-white/20 max-w-xs">
          <div className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Model Analytics
          </div>
          <div className="grid grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
            <div>
              <div className="font-medium">Geometry</div>
              <div>Vertices: {stats.vertices.toLocaleString()}</div>
              <div>Faces: {stats.faces.toLocaleString()}</div>
              <div>Meshes: {stats.meshes}</div>
            </div>
            <div>
              <div className="font-medium">Assets</div>
              <div>Materials: {stats.materials}</div>
              <div>Textures: {stats.textures}</div>
              <div>Animations: {stats.animations}</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">Performance</div>
              <div>Size: {stats.fileSize}</div>
              {stats.renderTime && <div>Render: {stats.renderTime.toFixed(1)}ms</div>}
              {stats.memoryUsage && <div>Memory: {stats.memoryUsage}</div>}
              {stats.qualityScore && (
                <div className="flex items-center gap-2">
                  Quality: 
                  <Badge variant={stats.qualityScore > 90 ? 'success' : stats.qualityScore > 75 ? 'warning' : 'error'} size="sm">
                    {stats.qualityScore.toFixed(0)}%
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Panel */}
      <AnimatePresence>
        {showAIPanel && aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20 pointer-events-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold">AI Analysis</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={triggerAIAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Cpu className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Lightbulb className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Quality</span>
                  <Badge variant="success">{aiAnalysis.qualityScore.toFixed(0)}%</Badge>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${aiAnalysis.qualityScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Printability</span>
                  <div className="font-semibold">{aiAnalysis.printability.toFixed(0)}%</div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Efficiency</span>
                  <div className="font-semibold">{aiAnalysis.materialEfficiency.toFixed(0)}%</div>
                </div>
              </div>

              <div>
                <div className="font-medium text-sm mb-2">Optimizations</div>
                <div className="space-y-1">
                  {aiAnalysis.optimizations.slice(0, 2).map((opt, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security & Quality Badges */}
      <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none">
        <Badge 
          variant={quality === 'ultra' ? 'default' : 'outline'}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm pointer-events-auto"
        >
          {quality.toUpperCase()}
        </Badge>
        {securityLevel !== 'basic' && (
          <Badge 
            variant="premium"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm pointer-events-auto"
          >
            <Lock className="w-3 h-3 mr-1" />
            {securityLevel.toUpperCase()}
          </Badge>
        )}
        {enterpriseMode && (
          <Badge 
            variant="default"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white pointer-events-auto"
          >
            <Award className="w-3 h-3 mr-1" />
            ENTERPRISE
          </Badge>
        )}
      </div>
    </motion.div>
  );
}; 