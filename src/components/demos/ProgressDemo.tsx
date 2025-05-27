import React, { useState } from 'react';
import { Progress } from '../ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Play, 
  RotateCcw, 
  Activity, 
  TrendingUp, 
  Users, 
  BarChart3,
  Database,
  Wifi,
  HardDrive
} from 'lucide-react';

export const ProgressDemo: React.FC = () => {
  const [animatedProgress, setAnimatedProgress] = useState({
    serverLoad: 0,
    databaseSync: 0,
    overallScore: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const animateProgress = () => {
    setIsAnimating(true);
    
    const animateBar = (
      setter: React.Dispatch<React.SetStateAction<{ serverLoad: number; databaseSync: number; overallScore: number }>>, 
      targetValue: number, 
      key: keyof typeof animatedProgress,
      delay: number = 0
    ) => {
      setTimeout(() => {
        let current = 0;
        const increment = targetValue / 60; // 60 frames for 1 second
        
        const animate = () => {
          current += increment;
          if (current >= targetValue) {
            setter(prev => ({ ...prev, [key]: targetValue }));
            if (key === 'overallScore') {
              setIsAnimating(false);
            }
            return;
          }
          
          // Ease out cubic function for smooth animation
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
          const progress = easeOutCubic(current / targetValue) * targetValue;
          
          setter(prev => ({ ...prev, [key]: Math.round(progress) }));
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      }, delay);
    };

    // Reset all values first
    setAnimatedProgress({ serverLoad: 0, databaseSync: 0, overallScore: 0 });
    
    // Animate each bar with staggered delays
    animateBar(setAnimatedProgress, 100, 'serverLoad', 0);
    animateBar(setAnimatedProgress, 100, 'databaseSync', 500);
    animateBar(setAnimatedProgress, 100, 'overallScore', 1000);
  };

  const resetProgress = () => {
    setAnimatedProgress({ serverLoad: 0, databaseSync: 0, overallScore: 0 });
    setIsAnimating(false);
  };

  return (
    <div className="space-y-8">
      {/* Basic Progress Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Progress Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Default Progress</span>
                  <span>45%</span>
                </div>
                <Progress variant="default" value={45} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Success Progress</span>
                  <span>75%</span>
                </div>
                <Progress variant="success" value={75} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Warning Progress</span>
                  <span>35%</span>
                </div>
                <Progress variant="warning" value={35} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Error Progress</span>
                  <span>15%</span>
                </div>
                <Progress variant="error" value={15} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Sizes</Badge>
            Progress Sizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Small Progress</span>
                <span>60%</span>
              </div>
              <Progress variant="default" value={60} size="sm" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Default Progress</span>
                <span>75%</span>
              </div>
              <Progress variant="neon" value={75} size="default" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Large Progress</span>
                <span>85%</span>
              </div>
              <Progress variant="premium" value={85} size="lg" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Extra Large Progress</span>
                <span>95%</span>
              </div>
              <Progress variant="info" value={95} size="xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animated Progress Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Interactive</Badge>
            Animated Progress Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Button 
                onClick={animateProgress}
                disabled={isAnimating}
                leftIcon={<Play />}
                variant="premium"
              >
                {isAnimating ? 'Animating...' : 'Simulate Progress'}
              </Button>
              <Button 
                onClick={resetProgress}
                disabled={isAnimating}
                leftIcon={<RotateCcw />}
                variant="outline"
              >
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Server Load
                  </span>
                  <span>{animatedProgress.serverLoad}%</span>
                </div>
                <Progress 
                  variant="info" 
                  value={animatedProgress.serverLoad} 
                  size="lg"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Database Sync
                  </span>
                  <span>{animatedProgress.databaseSync}%</span>
                </div>
                <Progress 
                  variant="neon" 
                  value={animatedProgress.databaseSync} 
                  size="lg"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Overall Performance Score
                  </span>
                  <span>{animatedProgress.overallScore}%</span>
                </div>
                <Progress 
                  variant="premium" 
                  value={animatedProgress.overallScore} 
                  size="lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Dashboard</Badge>
            System Status Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-green-500" />
                    Network Usage
                  </span>
                  <span>67%</span>
                </div>
                <Progress variant="success" value={67} size="default" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-blue-500" />
                    Disk Usage
                  </span>
                  <span>34%</span>
                </div>
                <Progress variant="info" value={34} size="default" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    Active Users
                  </span>
                  <span>892/1000</span>
                </div>
                <Progress variant="premium" value={89} size="default" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                    Resource Usage
                  </span>
                  <span>23%</span>
                </div>
                <Progress variant="warning" value={23} size="default" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Progress Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Special</Badge>
            Specialized Progress Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Glass Effect Progress</span>
                <span>92%</span>
              </div>
              <Progress variant="glass" value={92} size="lg" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Neon Glow Progress</span>
                <span>78%</span>
              </div>
              <Progress variant="neon" value={78} size="lg" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Premium Gradient Progress</span>
                <span>95%</span>
              </div>
              <Progress variant="premium" value={95} size="lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDemo; 