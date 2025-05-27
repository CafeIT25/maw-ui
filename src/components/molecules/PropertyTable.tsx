import React from 'react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import type { ComponentProperty } from '../../utils/components/componentProperties';

export interface PropertyTableProps {
  properties: ComponentProperty[];
  className?: string;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  className
}) => {
  if (properties.length === 0) {
    return (
      <div className={cn(
        'p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg',
        className
      )}>
        No properties available for this component.
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden',
      className
    )}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Property
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Default
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {properties.map((property) => (
              <tr 
                key={property.name}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono">
                      {property.name}
                    </code>
                    {property.required && (
                      <Badge variant="error" size="sm">
                        Required
                      </Badge>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <code className="text-sm text-purple-600 dark:text-purple-400 break-all">
                    {property.type}
                  </code>
                </td>
                
                <td className="px-6 py-4">
                  {property.default ? (
                    <code className="px-2 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      {property.default}
                    </code>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                  )}
                </td>
                
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {property.description}
                    </p>
                    {property.examples && property.examples.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                          Examples:
                        </span>
                        {property.examples.map((example, exampleIndex) => (
                          <code
                            key={exampleIndex}
                            className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                          >
                            {example}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 