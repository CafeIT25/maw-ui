import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ComponentDetailView } from '../components/ComponentDetailView';
import { componentCategories, type ComponentItem } from '../components/ComponentNavigation';

export const ComponentDetailPage: React.FC = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top when component changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [componentId]);

  // Get all components from all categories
  const getAllComponents = (): ComponentItem[] => {
    return componentCategories(t).flatMap(category => category.components);
  };

  // Find the component in all categories
  const findComponent = (id: string): ComponentItem | null => {
    for (const category of componentCategories(t)) {
      const component = category.components.find((comp: ComponentItem) => comp.id === id);
      if (component) {
        return component;
      }
    }
    return null;
  };

  // Get component index in the full list
  const getComponentIndex = (id: string): number => {
    const allComponents = getAllComponents();
    return allComponents.findIndex(comp => comp.id === id);
  };

  // Navigate to next component
  const handleNext = () => {
    if (!componentId) return;
    
    const allComponents = getAllComponents();
    const currentIndex = getComponentIndex(componentId);
    
    if (currentIndex >= 0 && currentIndex < allComponents.length - 1) {
      const nextComponent = allComponents[currentIndex + 1];
      navigate(`/components/${nextComponent.id}`);
    }
  };

  // Navigate to previous component
  const handlePrevious = () => {
    if (!componentId) return;
    
    const allComponents = getAllComponents();
    const currentIndex = getComponentIndex(componentId);
    
    if (currentIndex > 0) {
      const prevComponent = allComponents[currentIndex - 1];
      navigate(`/components/${prevComponent.id}`);
    }
  };

  // Check if navigation is available
  const canNavigateNext = () => {
    if (!componentId) return false;
    const allComponents = getAllComponents();
    const currentIndex = getComponentIndex(componentId);
    return currentIndex >= 0 && currentIndex < allComponents.length - 1;
  };

  const canNavigatePrevious = () => {
    if (!componentId) return false;
    const currentIndex = getComponentIndex(componentId);
    return currentIndex > 0;
  };

  const component = componentId ? findComponent(componentId) : null;

  if (!component) {
    return <Navigate to="/components" replace />;
  }

  return (
    <div className="min-h-screen">
      <ComponentDetailView
        component={component}
        onBack={() => navigate('/components')}
        onNext={canNavigateNext() ? handleNext : undefined}
        onPrevious={canNavigatePrevious() ? handlePrevious : undefined}
      />
    </div>
  );
}; 