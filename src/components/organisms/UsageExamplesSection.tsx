import React from 'react';
import { CodeBlock } from '../molecules/CodeBlock';
import { Lightbulb, Bookmark } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { UsageExample } from '../../utils/components/componentUsageExamples';

export interface UsageExamplesSectionProps {
  examples: UsageExample[];
  componentName: string;
  className?: string;
}

export const UsageExamplesSection: React.FC<UsageExamplesSectionProps> = ({
  examples,
  componentName,
  className
}) => {
  if (examples.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8',
        className
      )}>
        <div className="text-center">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Usage Examples Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Usage examples for {componentName} are coming soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
          <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Usage Examples
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real-world scenarios and implementation patterns
          </p>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-8">
        {examples.map((example, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Example Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex-shrink-0">
                  <Bookmark className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {example.description}
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300 flex-shrink-0">
                        Scenario:
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-200">
                        {example.scenario}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Implementation */}
            <div className="p-0">
              <CodeBlock
                code={example.code}
                language="tsx"
                showCopy={true}
                className="border-0 rounded-none"
              />
            </div>

            {/* Preview Section (if available) */}
            {example.preview && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Preview
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  {example.preview}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Best Practices
        </h3>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
          <li>• Follow the examples above for common implementation patterns</li>
          <li>• Always handle loading and error states appropriately</li>
          <li>• Use TypeScript types for better development experience</li>
          <li>• Test your implementation with different data scenarios</li>
          <li>• Consider accessibility requirements in your implementation</li>
        </ul>
      </div>
    </div>
  );
}; 