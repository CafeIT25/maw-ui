import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

// Import the existing ComponentItem interface instead of redefining it
import type { ComponentItem } from '../ComponentNavigation';

export interface ComponentHeaderProps {
  component: ComponentItem;
  onBack: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  component,
  onBack,
  onNext,
  onPrevious,
  className
}) => {
  const getComplexityColor = (complexity: string) => {
    const colors = {
      basic: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
      intermediate: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20',
      advanced: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20',
      expert: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
    };
    return colors[complexity as keyof typeof colors] || colors.basic;
  };

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Components
          </Button>
          
          <div className="flex items-center gap-2">
            {onPrevious && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
            {onNext && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Component Info */}
        <div className="flex items-start gap-6">
          {/* Icon */}
          {component.icon && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex-shrink-0">
              <div className="w-8 h-8 text-blue-600 dark:text-blue-400">
                {component.icon}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {component.name}
                  </h1>
                  {component.new && (
                    <Badge variant="success" size="sm">
                      New
                    </Badge>
                  )}
                  {component.premium && (
                    <Badge variant="premium" size="sm" className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {component.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Documentation
                </Button>
                <Button
                  variant="premium"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Add to Favorites
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Category:
                </span>
                <Badge variant="outline">
                  {component.category}
                </Badge>
              </div>

              {/* Complexity */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Complexity:
                </span>
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getComplexityColor(component.complexity)
                )}>
                  {component.complexity.charAt(0).toUpperCase() + component.complexity.slice(1)}
                </span>
              </div>

              {/* Tags */}
              {component.tags && component.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {component.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 