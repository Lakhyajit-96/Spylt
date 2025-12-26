import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SpyltFlavorsPage from './pages/SpyltFlavorsPage';
import ChugClubPage from './pages/ChugClubPage';
import StudentMarketingPage from './pages/StudentMarketingPage';
import DairyDealersPage from './pages/DairyDealersPage';
import CompanyPage from './pages/CompanyPage';
import ContactsPage from './pages/ContactsPage';
import TastyTalkPage from './pages/TastyTalkPage';

// Import enhancement components
import { initGA, useAnalytics, trackPerformance, trackCoreWebVitals } from './components/Analytics';
import { useSEO } from './components/SEO';
import { 
  preloadCriticalResources, 
  addResourceHints, 
  registerServiceWorker,
  inlineCriticalCSS,
  useLazyLoading,
  usePerformanceMonitoring
} from './components/Performance';
import ErrorBoundary from './components/ErrorBoundary';

// Component that uses router hooks - must be inside Router
const AppContent = () => {
  // These hooks now work because they're inside the Router context
  useAnalytics();
  useSEO();
  useLazyLoading();
  const performanceMetrics = usePerformanceMonitoring();

  useEffect(() => {
    // Log performance metrics for development
    if (process.env.NODE_ENV === 'development') {
      console.log('SPYLT Performance Metrics:', performanceMetrics);
    }
  }, [performanceMetrics]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/spylt-flavors" element={<SpyltFlavorsPage />} />
      <Route path="/chug-club" element={<ChugClubPage />} />
      <Route path="/student-marketing" element={<StudentMarketingPage />} />
      <Route path="/dairy-dealers" element={<DairyDealersPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/tasty-talk" element={<TastyTalkPage />} />
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize Google Analytics and Facebook Pixel
    initGA();
    
    // Performance optimizations
    preloadCriticalResources();
    addResourceHints();
    inlineCriticalCSS();
    
    // Register service worker for caching
    registerServiceWorker();
    
    // Start performance tracking
    trackPerformance();
    trackCoreWebVitals();

    // Add error boundary for production
    window.addEventListener('error', (event) => {
      console.error('SPYLT Application Error:', event.error);
      // Track errors in analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'exception', {
          description: event.error.message,
          fatal: false
        });
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('SPYLT Unhandled Promise Rejection:', event.reason);
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'exception', {
          description: event.reason.toString(),
          fatal: false
        });
      }
    });

  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
