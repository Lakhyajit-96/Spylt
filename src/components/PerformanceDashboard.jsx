import { useState, useEffect } from 'react';
import { usePerformanceMonitoring, useMemoryMonitoring } from './Performance';
import { createSPYLTHealthChecker } from '../utils/siteHealth';

// Performance Dashboard Component (for development/admin use)
const PerformanceDashboard = ({ isVisible = false }) => {
  const performanceMetrics = usePerformanceMonitoring();
  const memoryInfo = useMemoryMonitoring();
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [healthResults, setHealthResults] = useState(null);
  const [isRunningHealthCheck, setIsRunningHealthCheck] = useState(false);

  useEffect(() => {
    // Get network information
    if ('connection' in navigator) {
      setNetworkInfo({
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      });
    }
  }, []);

  // Run health check
  const runHealthCheck = async () => {
    setIsRunningHealthCheck(true);
    const healthChecker = createSPYLTHealthChecker();
    const results = await healthChecker.runAllChecks();
    const summary = healthChecker.getHealthSummary();
    setHealthResults({ results, summary });
    setIsRunningHealthCheck(false);
  };

  // Format bytes to human readable
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format milliseconds
  const formatMs = (ms) => {
    return ms ? `${Math.round(ms)}ms` : 'N/A';
  };

  // Get performance grade
  const getPerformanceGrade = (metric, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };

    if (!value || !thresholds[metric]) return 'unknown';
    
    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isVisible && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-dark-brown text-milk p-3 rounded-full shadow-lg hover:bg-mid-brown transition-colors mb-2"
        title="Performance Dashboard"
      >
        📊
      </button>

      {/* Dashboard Panel */}
      {isExpanded && (
        <div className="bg-milk border-2 border-mid-brown rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-dark-brown">Performance Dashboard</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-dark-brown hover:text-mid-brown"
            >
              ✕
            </button>
          </div>

          {/* Health Check Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-dark-brown">Site Health</h4>
              <button
                onClick={runHealthCheck}
                disabled={isRunningHealthCheck}
                className="text-xs bg-mid-brown text-milk px-2 py-1 rounded hover:bg-dark-brown transition-colors disabled:opacity-50"
              >
                {isRunningHealthCheck ? '🔄' : '🏥'} Check
              </button>
            </div>
            
            {healthResults && (
              <div className="text-sm">
                <div className={`p-2 rounded mb-2 ${
                  healthResults.summary.status === 'healthy' ? 'bg-green-100 text-green-800' :
                  healthResults.summary.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {healthResults.summary.score}% 
                  ({healthResults.summary.passed}/{healthResults.summary.total} passed)
                </div>
                
                <div className="max-h-20 overflow-y-auto text-xs">
                  {Object.entries(healthResults.results).map(([name, result]) => (
                    <div key={name} className="flex justify-between items-center py-1">
                      <span className="truncate">{name}:</span>
                      <span className={`ml-2 ${
                        result.status === 'pass' ? 'text-green-600' :
                        result.status === 'warn' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="font-semibold text-dark-brown mb-2">Core Web Vitals</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>LCP:</span>
                <span className={`px-2 py-1 rounded text-xs ${getGradeColor(getPerformanceGrade('lcp', performanceMetrics.lcp))}`}>
                  {formatMs(performanceMetrics.lcp)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>FID:</span>
                <span className={`px-2 py-1 rounded text-xs ${getGradeColor(getPerformanceGrade('fid', performanceMetrics.fid))}`}>
                  {formatMs(performanceMetrics.fid)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>CLS:</span>
                <span className={`px-2 py-1 rounded text-xs ${getGradeColor(getPerformanceGrade('cls', performanceMetrics.cls))}`}>
                  {performanceMetrics.cls?.toFixed(3) || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>TTFB:</span>
                <span className={`px-2 py-1 rounded text-xs ${getGradeColor(getPerformanceGrade('ttfb', performanceMetrics.ttfb))}`}>
                  {formatMs(performanceMetrics.ttfb)}
                </span>
              </div>
            </div>
          </div>

          {/* Memory Usage */}
          {memoryInfo && (
            <div className="mb-4">
              <h4 className="font-semibold text-dark-brown mb-2">Memory Usage</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span>{formatBytes(memoryInfo.usedJSHeapSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{formatBytes(memoryInfo.totalJSHeapSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Limit:</span>
                  <span>{formatBytes(memoryInfo.jsHeapSizeLimit)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-mid-brown h-2 rounded-full" 
                    style={{ 
                      width: `${(memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Network Information */}
          {networkInfo && (
            <div className="mb-4">
              <h4 className="font-semibold text-dark-brown mb-2">Network</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="capitalize">{networkInfo.effectiveType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downlink:</span>
                  <span>{networkInfo.downlink} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span>RTT:</span>
                  <span>{networkInfo.rtt}ms</span>
                </div>
                {networkInfo.saveData && (
                  <div className="text-yellow-600 text-xs">
                    📱 Data Saver Mode Active
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Page Info */}
          <div className="mb-4">
            <h4 className="font-semibold text-dark-brown mb-2">Page Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>URL:</span>
                <span className="truncate ml-2">{window.location.pathname}</span>
              </div>
              <div className="flex justify-between">
                <span>Referrer:</span>
                <span className="truncate ml-2">{document.referrer || 'Direct'}</span>
              </div>
              <div className="flex justify-between">
                <span>User Agent:</span>
                <span className="truncate ml-2">
                  {navigator.userAgent.includes('Chrome') ? 'Chrome' :
                   navigator.userAgent.includes('Firefox') ? 'Firefox' :
                   navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-mid-brown text-milk py-2 px-3 rounded text-sm hover:bg-dark-brown transition-colors"
            >
              Reload
            </button>
            <button
              onClick={() => {
                if ('caches' in window) {
                  caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                  });
                }
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="flex-1 bg-light-brown text-dark-brown py-2 px-3 rounded text-sm hover:bg-mid-brown hover:text-milk transition-colors"
            >
              Clear Cache
            </button>
          </div>

          {/* Development Mode Indicator */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-3 text-xs text-center text-gray-500">
              🔧 Development Mode
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;