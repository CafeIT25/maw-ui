import React, { useState } from 'react';
import { CodeBlock } from '../molecules/CodeBlock';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Code, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { CodeExample } from '../../utils/components/componentExamples';

export interface CodeExamplesSectionProps {
  examples: CodeExample[];
  componentName: string;
  className?: string;
}

export const CodeExamplesSection: React.FC<CodeExamplesSectionProps> = ({
  examples,
  componentName,
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCopyToast, setShowCopyToast] = useState(false);

  const categories = ['all', ...Array.from(new Set(examples.map(ex => ex.category)))];
  
  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  const handleCodeCopy = (code: string, title?: string) => {
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
    console.log(`Copied ${title || 'code'} to clipboard`);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      all: 'All Examples',
      basic: 'Basic',
      advanced: 'Advanced', 
      custom: 'Custom',
      integration: 'Integration'
    };
    return labels[category as keyof typeof labels] || category;
  };

  if (examples.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8',
        className
      )}>
        <div className="text-center">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Code Examples Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Code examples for {componentName} are coming soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Code Examples
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="h-8"
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Examples Grid */}
      <div className="space-y-6">
        {filteredExamples.map((example, index) => (
          <CodeBlock
            key={index}
            code={example.code}
            language={example.language}
            title={example.title}
            description={example.description}
            category={example.category}
            onCopy={handleCodeCopy}
            className="w-full"
          />
        ))}
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Badge variant="success" size="sm">
              ✓
            </Badge>
            Code copied to clipboard!
          </div>
        </div>
      )}

      {filteredExamples.length === 0 && selectedCategory !== 'all' && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No examples found for category "{getCategoryLabel(selectedCategory)}".
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="mt-2"
          >
            Show all examples
          </Button>
        </div>
      )}
    </div>
  );
}; 