import React from 'react';
import { PropertyTable } from '../molecules/PropertyTable';
import { Settings, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ComponentProperty } from '../../utils/components/componentProperties';

export interface PropertiesSectionProps {
  properties: ComponentProperty[];
  componentName: string;
  className?: string;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  componentName,
  className
}) => {
  const requiredCount = properties.filter(prop => prop.required).length;
  const optionalCount = properties.length - requiredCount;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
          <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            API Reference
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {properties.length > 0 ? (
              <>
                {properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} available
                {requiredCount > 0 && (
                  <> ({requiredCount} required{optionalCount > 0 && `, ${optionalCount} optional`})</>
                )}
              </>
            ) : (
              `Properties for ${componentName}`
            )}
          </p>
        </div>
      </div>

      {/* Properties Table */}
      {properties.length > 0 ? (
        <PropertyTable properties={properties} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Properties Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {componentName} doesn't expose any configurable properties, or documentation is coming soon.
            </p>
          </div>
        </div>
      )}

      {/* Usage Notes */}
      {properties.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Usage Notes
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• All properties are optional unless marked as required</li>
            <li>• Default values are applied when properties are not specified</li>
            <li>• Type definitions are provided for TypeScript projects</li>
            {requiredCount > 0 && (
              <li>• Required properties must be provided for the component to function properly</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}; 