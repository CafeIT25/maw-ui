import React, { lazy, Suspense } from 'react';
import { 
  ComponentHeader, 
  DemoSection, 
  CodeExamplesSection, 
  PropertiesSection, 
  UsageExamplesSection
} from '../organisms';
import { 
  getComponentExamples, 
  getComponentProperties, 
  getUsageExamples 
} from '../../utils/components';
import type { ComponentItem } from '../ComponentNavigation';

// Dynamic imports for demo components - each component has its own dedicated demo
const componentDemos = {
  button: lazy(() => import('../demos/ButtonDemo').then(module => ({ default: module.default }))),
  card: lazy(() => import('../demos/CardDemo').then(module => ({ default: module.default }))),

  select: lazy(() => import('../demos/SelectDemo').then(module => ({ default: module.default }))),
  tabs: lazy(() => import('../demos/TabsDemo').then(module => ({ default: module.default }))),
  accordion: lazy(() => import('../demos/AccordionDemo').then(module => ({ default: module.default }))),
  modal: lazy(() => import('../demos/ModalDemo').then(module => ({ default: module.default }))),
  alert: lazy(() => import('../demos/AlertDemo').then(module => ({ default: module.default }))),
  badge: lazy(() => import('../demos/BadgeDemo').then(module => ({ default: module.default }))),
  tooltip: lazy(() => import('../demos/TooltipDemo').then(module => ({ default: module.default }))),

  carousel: lazy(() => import('../demos/CarouselDemo').then(module => ({ default: module.default }))),

  progress: lazy(() => import('../demos/ProgressDemo').then(module => ({ default: module.default }))),
  slider: lazy(() => import('../demos/SliderDemo').then(module => ({ default: module.default }))),
  modelviewer: lazy(() => import('../demos/ModelViewerDemo').then(module => ({ default: module.default }))),
};

export interface ComponentDetailPageProps {
  component: ComponentItem;
  onBack: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({
  component,
  onBack,
  onNext,
  onPrevious
}) => {
  // Get component data
  const examples = getComponentExamples(component.id);
  const properties = getComponentProperties(component.id);
  const usageExamples = getUsageExamples(component.id);

  // Get demo component
  const DemoComponent = componentDemos[component.id as keyof typeof componentDemos];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Component Header */}
      <ComponentHeader
        component={component}
        onBack={onBack}
        onNext={onNext}
        onPrevious={onPrevious}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Interactive Demo Section */}
        <DemoSection
          componentId={component.id}
          componentName={component.name}
          error={!DemoComponent ? `Demo not available for ${component.name}` : undefined}
        >
          {DemoComponent && (
            <Suspense fallback={
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Loading {component.name} demo...
                </p>
              </div>
            }>
              <DemoComponent />
            </Suspense>
          )}
        </DemoSection>

        {/* Code Examples Section */}
        {examples.length > 0 && (
          <CodeExamplesSection
            examples={examples}
            componentName={component.name}
          />
        )}

        {/* API Reference Section */}
        <PropertiesSection
          properties={properties}
          componentName={component.name}
        />

        {/* Usage Examples Section */}
        {usageExamples.length > 0 && (
          <UsageExamplesSection
            examples={usageExamples}
            componentName={component.name}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Documentation for {component.name} component
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Part of MAW Design System
              </p>
            </div>
            <div className="flex items-center gap-4">
              {onPrevious && (
                <button
                  onClick={onPrevious}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Previous Component
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                Next Component →
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 