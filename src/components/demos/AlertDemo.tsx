import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  AlertCircle,
  Zap,
  Shield,
  Bell,
  Settings,
  Star,
  Download,
  FileText,
  Layers,
  Sparkles
} from 'lucide-react';

export const AlertDemo: React.FC = () => {
  const [alerts, setAlerts] = useState<Array<{id: string, type: string, message: string, visible: boolean}>>([]);

  const addAlert = (type: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [...prev, { id, type, message, visible: true }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissAlert(id);
    }, 5000);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Bell className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Smart Alert System</Badge>
              <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Advanced Alert Components
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Powerful notification system with toast alerts, banners, 
              and contextual messaging for enhanced user experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🚨</div>
                <div className="text-white/80 text-sm">Multiple Types</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⏰</div>
                <div className="text-white/80 text-sm">Auto Dismiss</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎯</div>
                <div className="text-white/80 text-sm">Contextual</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">♿</div>
                <div className="text-white/80 text-sm">Accessible</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Alert Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Success Alert */}
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 dark:text-green-300">Success</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Your changes have been saved successfully. All data is now synchronized.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Warning Alert */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Warning</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Your session will expire in 5 minutes. Please save your work to avoid data loss.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Error Alert */}
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 dark:text-red-300">Error</h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  Failed to connect to the server. Please check your internet connection and try again.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Info Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">Information</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  New features are now available! Check out our latest updates in the changelog.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Toast Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Interactive</Badge>
            Toast Notification Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Click the buttons below to trigger different types of toast notifications:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                onClick={() => addAlert('success', 'Operation completed successfully!')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Success
              </Button>
              
              <Button 
                onClick={() => addAlert('warning', 'Please review your settings.')}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Warning
              </Button>
              
              <Button 
                onClick={() => addAlert('error', 'An error occurred while processing.')}
                variant="destructive"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Error
              </Button>
              
              <Button 
                onClick={() => addAlert('info', 'Here is some useful information.')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Features</Badge>
            Alert Component Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Core Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Multiple Variants</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Success, warning, error, info</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Zap className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Auto Dismiss</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Configurable timeout duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Accessibility</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ARIA live regions support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Customization</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Settings className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-sm">Position Control</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Top, bottom, left, right</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="font-medium text-sm">Custom Styling</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Themes and color variants</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <Layers className="w-5 h-5 text-teal-500" />
                  <div>
                    <p className="font-medium text-sm">Stacking</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Multiple alerts management</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Enterprise</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <Bell className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="font-medium text-sm">Queue Management</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Priority-based ordering</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Logging</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Alert history tracking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Analytics</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">User interaction tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complex Alert Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Advanced</Badge>
            Complex Alert Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Banner Alert */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">System Maintenance</h3>
                    <p className="text-sm opacity-90">
                      Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM UTC.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Learn More
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Alert */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Action Required</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                  Your password will expire in 3 days. Update it now to maintain secure access.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    Update Password
                  </Button>
                  <Button variant="outline" size="sm">
                    Remind Later
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Download in Progress</h3>
                  <span className="text-sm text-blue-600 dark:text-blue-400">65%</span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mb-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Downloading update package... (2.3 MB of 3.5 MB)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toast Container */}
      {alerts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`
                flex items-start gap-3 p-4 rounded-lg shadow-lg transform transition-all duration-300 
                ${alert.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                ${alert.type === 'success' ? 'bg-green-600 text-white' : ''}
                ${alert.type === 'warning' ? 'bg-yellow-600 text-white' : ''}
                ${alert.type === 'error' ? 'bg-red-600 text-white' : ''}
                ${alert.type === 'info' ? 'bg-blue-600 text-white' : ''}
              `}
            >
              {alert.type === 'success' && <CheckCircle className="w-5 h-5 mt-0.5" />}
              {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 mt-0.5" />}
              {alert.type === 'error' && <AlertCircle className="w-5 h-5 mt-0.5" />}
              {alert.type === 'info' && <Info className="w-5 h-5 mt-0.5" />}
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => dismissAlert(alert.id)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertDemo; 