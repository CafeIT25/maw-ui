import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  category?: 'basic' | 'advanced' | 'custom' | 'integration';
  className?: string;
  showCopy?: boolean;
  showExternalLink?: boolean;
  onCopy?: (code: string, title?: string) => void;
  onExternalLink?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  title,
  description,
  category = 'basic',
  className,
  showCopy = true,
  showExternalLink = false,
  onCopy,
  onExternalLink
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code, title);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      basic: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
      advanced: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20',
      custom: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20',
      integration: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
    };
    return colors[category as keyof typeof colors] || colors.basic;
  };

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden',
      className
    )}>
      {/* Header */}
      {(title || description || category) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {title && (
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <span className={cn(
                    'px-2 py-0.5 text-xs font-medium rounded-full',
                    getCategoryColor(category)
                  )}>
                    {category}
                  </span>
                </div>
              )}
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {showExternalLink && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExternalLink}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              {showCopy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre className="p-6 overflow-x-auto text-sm">
          <code className={cn(
            'block text-gray-800 dark:text-gray-200',
            language && `language-${language}`
          )}>
            {code}
          </code>
        </pre>
        
        {/* Language badge */}
        {language && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
              {language.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}; 