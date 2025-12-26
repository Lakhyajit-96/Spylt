import { useEffect, useState, useCallback } from 'react';

// Lazy loading for images with intersection observer
export const useLazyLoading = () => {
  useEffect(() => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
            img.classList.add('loaded');
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    return () => {
      lazyImages.forEach(img => imageObserver.unobserve(img));
    };
  }, []);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/images/nav-logo.svg', as: 'image' },
    { href: '/fonts/ProximaNova-Regular.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' }
  ];

  // Only preload resources that don't already have preload links
  criticalResources.forEach(resource => {
    const existingLink = document.querySelector(`link[rel="preload"][href="${resource.href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      
      document.head.appendChild(link);
    }
  });
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: '//connect.facebook.net' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
    document.head.appendChild(link);
  });
};

// Image optimization with WebP support
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  lazy = true, 
  webpSrc = null,
  sizes = '',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setError(true);

  // Generate WebP source if not provided
  const webpSource = webpSrc || src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  if (lazy) {
    return (
      <picture className={className}>
        <source 
          data-srcset={webpSource} 
          type="image/webp" 
          sizes={sizes}
        />
        <img
          data-src={src}
          alt={alt}
          className={`lazy ${loaded ? 'loaded' : ''} ${error ? 'error' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      </picture>
    );
  }

  return (
    <picture className={className}>
      <source srcSet={webpSource} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        className={`${loaded ? 'loaded' : ''} ${error ? 'error' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

// Debounced scroll handler for performance
export const useDebounce = (callback, delay) => {
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(newTimer);
  }, [callback, delay, debounceTimer]);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
};

// Throttled event handler
export const useThrottle = (callback, delay) => {
  const [lastRun, setLastRun] = useState(Date.now());

  const throttledCallback = useCallback((...args) => {
    if (Date.now() - lastRun >= delay) {
      callback(...args);
      setLastRun(Date.now());
    }
  }, [callback, delay, lastRun]);

  return throttledCallback;
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  useEffect(() => {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid }));
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
      setMetrics(prev => ({ ...prev, ttfb }));
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if ('performance' in window) {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(resource => 
      resource.name.includes('.js') && !resource.name.includes('node_modules')
    );
    
    const totalJSSize = jsResources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);

    console.log('Bundle Analysis:', {
      totalJSFiles: jsResources.length,
      totalJSSize: `${(totalJSSize / 1024).toFixed(2)} KB`,
      largestJS: jsResources.sort((a, b) => b.transferSize - a.transferSize)[0]
    });
  }
};

// Memory usage monitoring
export const useMemoryMonitoring = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        });
      }
    };

    checkMemory();
    const interval = setInterval(checkMemory, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero-container { background-color: #faeade; }
    .general-title { font-family: "Antonio", sans-serif; font-weight: bold; }
    .magnetic { cursor: none; }
    .loader-circle { border: 4px solid #e3a458; border-top: 4px solid #a26833; }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Intersection Observer for animations
export const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);

  const observer = new IntersectionObserver((observedEntries) => {
    setEntries(observedEntries);
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  });

  const observe = (element) => {
    if (element) observer.observe(element);
  };

  const unobserve = (element) => {
    if (element) observer.unobserve(element);
  };

  return { entries, observe, unobserve };
};

export default {
  useLazyLoading,
  preloadCriticalResources,
  addResourceHints,
  OptimizedImage,
  useDebounce,
  useThrottle,
  usePerformanceMonitoring,
  analyzeBundleSize,
  useMemoryMonitoring,
  registerServiceWorker,
  inlineCriticalCSS,
  useIntersectionObserver
};