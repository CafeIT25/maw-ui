import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { Home } from './pages/Home';
import Components from './pages/Components';
import { Documentation } from './pages/Documentation';
import { Examples } from './pages/Examples';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ComponentDetailPage } from './pages/ComponentDetailPage';

import './lib/i18n';
import './App.css';

// Component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/:componentId" element={<ComponentDetailPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
