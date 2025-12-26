// SPYLT™ Site Health Checker
// Comprehensive monitoring and diagnostics for the website

export class SiteHealthChecker {
  constructor() {
    this.checks = [];
    this.results = {};
    this.isRunning = false;
  }

  // Add a health check
  addCheck(name, checkFunction, critical = false) {
    this.checks.push({
      name,
      check: checkFunction,
      critical,
      lastRun: null,
      lastResult: null
    });
  }

  // Run all health checks
  async runAllChecks() {
    if (this.isRunning) return this.results;
    
    this.isRunning = true;
    const startTime = performance.now();
    
    console.log('🏥 SPYLT Health Check: Starting comprehensive site diagnostics...');
    
    for (const check of this.checks) {
      try {
        const checkStart = performance.now();
        const result = await check.check();
        const checkTime = performance.now() - checkStart;
        
        check.lastRun = new Date();
        check.lastResult = {
          status: result.status,
          message: result.message,
          data: result.data,
          executionTime: checkTime
        };
        
        this.results[check.name] = check.lastResult;
        
        const statusIcon = result.status === 'pass' ? '✅' : 
                          result.status === 'warn' ? '⚠️' : '❌';
        
        console.log(`${statusIcon} ${check.name}: ${result.message} (${checkTime.toFixed(2)}ms)`);
        
      } catch (error) {
        check.lastResult = {
          status: 'fail',
          message: `Check failed: ${error.message}`,
          data: null,
          executionTime: 0
        };
        
        this.results[check.name] = check.lastResult;
        console.error(`❌ ${check.name}: Check failed -`, error);
      }
    }
    
    const totalTime = performance.now() - startTime;
    console.log(`🏥 SPYLT Health Check: Completed in ${totalTime.toFixed(2)}ms`);
    
    this.isRunning = false;
    return this.results;
  }

  // Get health summary
  getHealthSummary() {
    const total = this.checks.length;
    const passed = Object.values(this.results).filter(r => r.status === 'pass').length;
    const warnings = Object.values(this.results).filter(r => r.status === 'warn').length;
    const failed = Object.values(this.results).filter(r => r.status === 'fail').length;
    
    return {
      total,
      passed,
      warnings,
      failed,
      score: total > 0 ? Math.round((passed / total) * 100) : 0,
      status: failed > 0 ? 'critical' : warnings > 0 ? 'warning' : 'healthy'
    };
  }
}

// Create default health checker with SPYLT-specific checks
export const createSPYLTHealthChecker = () => {
  const checker = new SiteHealthChecker();
  
  // Performance Checks
  checker.addCheck('Core Web Vitals', async () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
    
    const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
    const lcpTime = lcp ? lcp.startTime : 0;
    
    if (loadTime > 3000 || lcpTime > 2500) {
      return {
        status: 'warn',
        message: 'Performance could be improved',
        data: { loadTime, lcpTime }
      };
    }
    
    return {
      status: 'pass',
      message: 'Performance metrics are good',
      data: { loadTime, lcpTime }
    };
  }, true);

  // Asset Loading Checks
  checker.addCheck('Critical Assets', async () => {
    const criticalAssets = [
      '/images/nav-logo.svg',
      '/fonts/ProximaNova-Regular.otf'
    ];
    
    const failedAssets = [];
    
    for (const asset of criticalAssets) {
      try {
        const response = await fetch(asset, { method: 'HEAD' });
        if (!response.ok) {
          failedAssets.push(asset);
        }
      } catch (error) {
        failedAssets.push(asset);
      }
    }
    
    if (failedAssets.length > 0) {
      return {
        status: 'fail',
        message: `Failed to load ${failedAssets.length} critical assets`,
        data: { failedAssets }
      };
    }
    
    return {
      status: 'pass',
      message: 'All critical assets loaded successfully',
      data: { assetsChecked: criticalAssets.length }
    };
  }, true);

  // JavaScript Errors Check
  checker.addCheck('JavaScript Errors', async () => {
    const errorCount = window.spyltErrorCount || 0;
    
    if (errorCount > 5) {
      return {
        status: 'fail',
        message: `High error count: ${errorCount} errors detected`,
        data: { errorCount }
      };
    } else if (errorCount > 0) {
      return {
        status: 'warn',
        message: `${errorCount} JavaScript errors detected`,
        data: { errorCount }
      };
    }
    
    return {
      status: 'pass',
      message: 'No JavaScript errors detected',
      data: { errorCount }
    };
  });

  // Memory Usage Check
  checker.addCheck('Memory Usage', async () => {
    if (!('memory' in performance)) {
      return {
        status: 'warn',
        message: 'Memory API not available',
        data: null
      };
    }
    
    const memory = performance.memory;
    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    
    if (usagePercent > 80) {
      return {
        status: 'warn',
        message: `High memory usage: ${usagePercent.toFixed(1)}%`,
        data: { usagePercent, memory }
      };
    }
    
    return {
      status: 'pass',
      message: `Memory usage normal: ${usagePercent.toFixed(1)}%`,
      data: { usagePercent, memory }
    };
  });

  // Local Storage Check
  checker.addCheck('Local Storage', async () => {
    try {
      const testKey = 'spylt-health-test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      
      return {
        status: 'pass',
        message: 'Local storage is working',
        data: null
      };
    } catch (error) {
      return {
        status: 'warn',
        message: 'Local storage not available',
        data: { error: error.message }
      };
    }
  });

  // Service Worker Check
  checker.addCheck('Service Worker', async () => {
    if (!('serviceWorker' in navigator)) {
      return {
        status: 'warn',
        message: 'Service Worker not supported',
        data: null
      };
    }
    
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (!registration) {
      return {
        status: 'warn',
        message: 'Service Worker not registered',
        data: null
      };
    }
    
    return {
      status: 'pass',
      message: 'Service Worker is active',
      data: { 
        state: registration.active?.state,
        scope: registration.scope
      }
    };
  });

  // Analytics Check
  checker.addCheck('Analytics', async () => {
    const hasGoogleAnalytics = typeof window.gtag !== 'undefined';
    const hasFacebookPixel = typeof window.fbq !== 'undefined';
    
    if (!hasGoogleAnalytics && !hasFacebookPixel) {
      return {
        status: 'warn',
        message: 'No analytics tracking detected',
        data: { hasGoogleAnalytics, hasFacebookPixel }
      };
    }
    
    return {
      status: 'pass',
      message: 'Analytics tracking is active',
      data: { hasGoogleAnalytics, hasFacebookPixel }
    };
  });

  // SEO Meta Tags Check
  checker.addCheck('SEO Meta Tags', async () => {
    const requiredMeta = [
      'description',
      'og:title',
      'og:description',
      'twitter:card'
    ];
    
    const missingMeta = [];
    
    requiredMeta.forEach(name => {
      const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!meta || !meta.content) {
        missingMeta.push(name);
      }
    });
    
    if (missingMeta.length > 0) {
      return {
        status: 'warn',
        message: `Missing ${missingMeta.length} SEO meta tags`,
        data: { missingMeta }
      };
    }
    
    return {
      status: 'pass',
      message: 'All required SEO meta tags present',
      data: { checkedTags: requiredMeta.length }
    };
  });

  // Accessibility Check
  checker.addCheck('Accessibility', async () => {
    const issues = [];
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
      issues.push('No heading elements found');
    }
    
    // Check for focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    if (focusableElements.length > 0) {
      // This is a basic check - in reality you'd test focus visibility
    }
    
    if (issues.length > 0) {
      return {
        status: 'warn',
        message: `${issues.length} accessibility issues found`,
        data: { issues }
      };
    }
    
    return {
      status: 'pass',
      message: 'Basic accessibility checks passed',
      data: { 
        imagesChecked: images.length,
        headingsFound: headings.length,
        focusableElements: focusableElements.length
      }
    };
  });

  return checker;
};

// Initialize error tracking
if (typeof window !== 'undefined') {
  window.spyltErrorCount = 0;
  
  window.addEventListener('error', () => {
    window.spyltErrorCount++;
  });
  
  window.addEventListener('unhandledrejection', () => {
    window.spyltErrorCount++;
  });
}

// Export for use in components
export default { SiteHealthChecker, createSPYLTHealthChecker };