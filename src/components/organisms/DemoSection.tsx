import React, { Suspense } from 'react';
import { Play, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DemoSectionProps {
  componentId: string;
  componentName: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string;
}

export const DemoSection: React.FC<DemoSectionProps> = ({
  componentId,
  componentName,
  children,
  className,
  loading = false,
  error
}) => {
  if (error) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8',
        className
      )}>
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Demo Unavailable
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300">
              Component ID: {componentId}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
          <Play className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interactive Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore {componentName} components with live examples
          </p>
        </div>
      </div>

      {/* Demo Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading {componentName} demo...
            </p>
          </div>
        ) : (
          <div className="p-6">
            <Suspense 
              fallback={
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loading demo...
                  </p>
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        )}
      </div>

      {/* Demo Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Demo Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Interact with the components to see them in action</li>
          <li>• Check different variants and states</li>
          <li>• Resize your browser to test responsiveness</li>
          <li>• Toggle dark mode to see theme variations</li>
        </ul>
      </div>
    </div>
  );
}; 