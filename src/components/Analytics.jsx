import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

// Initialize Google Analytics
export const initGA = () => {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
    // Enhanced ecommerce settings
    custom_map: {
      custom_parameter_1: 'brand_interaction',
      custom_parameter_2: 'flavor_preference'
    }
  });

  // Facebook Pixel initialization
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', 'YOUR_PIXEL_ID'); // Replace with actual Pixel ID
  window.fbq('track', 'PageView');
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'SPYLT_Interaction',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      custom_parameter_1: parameters.brand_interaction || '',
      custom_parameter_2: parameters.flavor_preference || '',
      ...parameters
    });
  }

  // Facebook Pixel event tracking
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, parameters);
  }
};

// Track flavor interactions
export const trackFlavorInteraction = (flavorName, interactionType) => {
  trackEvent('flavor_interaction', {
    flavor_name: flavorName,
    interaction_type: interactionType,
    brand_interaction: 'product_engagement',
    flavor_preference: flavorName.toLowerCase().replace(/\s+/g, '_')
  });
};

// Track contact form submissions
export const trackContactSubmission = (formType, email) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    user_email: email,
    brand_interaction: 'lead_generation'
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (email, source) => {
  trackEvent('newsletter_signup', {
    email: email,
    source: source,
    brand_interaction: 'email_capture'
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
    brand_interaction: 'content_engagement'
  });
};

// Track video interactions
export const trackVideoInteraction = (videoName, action) => {
  trackEvent('video_interaction', {
    video_name: videoName,
    action: action, // play, pause, complete
    brand_interaction: 'media_engagement'
  });
};

// Analytics Hook for automatic page tracking
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search, document.title);
    
    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      try {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent;
          trackScrollDepth(scrollPercent);
        }
      } catch (error) {
        console.warn('SPYLT Analytics: Scroll tracking error:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);
};

// Performance monitoring
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        trackEvent('page_performance', {
          load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          first_paint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0),
          brand_interaction: 'performance_metrics'
        });
      }, 0);
    });
  }
};

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  try {
    // Track Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      new PerformanceObserver((entryList) => {
        try {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          trackEvent('core_web_vitals', {
            metric_name: 'LCP',
            metric_value: Math.round(lastEntry.startTime),
            brand_interaction: 'performance_metrics'
          });
        } catch (error) {
          console.warn('SPYLT Analytics: LCP tracking error:', error);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        try {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            trackEvent('core_web_vitals', {
              metric_name: 'FID',
              metric_value: Math.round(entry.processingStart - entry.startTime),
              brand_interaction: 'performance_metrics'
            });
          });
        } catch (error) {
          console.warn('SPYLT Analytics: FID tracking error:', error);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        try {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          trackEvent('core_web_vitals', {
            metric_name: 'CLS',
            metric_value: Math.round(clsValue * 1000) / 1000,
            brand_interaction: 'performance_metrics'
          });
        } catch (error) {
          console.warn('SPYLT Analytics: CLS tracking error:', error);
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  } catch (error) {
    console.warn('SPYLT Analytics: Core Web Vitals not supported:', error);
  }
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackFlavorInteraction,
  trackContactSubmission,
  trackNewsletterSignup,
  trackScrollDepth,
  trackVideoInteraction,
  useAnalytics,
  trackPerformance,
  trackCoreWebVitals
};