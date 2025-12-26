import React from 'react';
import { trackEvent } from './Analytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('SPYLT Error Boundary caught an error:', error, errorInfo);
    
    // Track error in analytics
    const eventId = Date.now().toString();
    trackEvent('application_error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      event_id: eventId,
      brand_interaction: 'error_tracking'
    });

    // Update state with error details
    this.setState({
      error,
      errorInfo,
      eventId
    });

    // Report to external error tracking service (if available)
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      });
    }
  }

  handleReload = () => {
    // Track reload attempt
    trackEvent('error_recovery_attempt', {
      recovery_method: 'page_reload',
      event_id: this.state.eventId
    });
    
    window.location.reload();
  };

  handleGoHome = () => {
    // Track navigation to home
    trackEvent('error_recovery_attempt', {
      recovery_method: 'navigate_home',
      event_id: this.state.eventId
    });
    
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-milk flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* SPYLT Logo */}
            <div className="mb-8">
              <img 
                src="/images/nav-logo.svg" 
                alt="SPYLT Logo" 
                className="w-24 h-24 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-dark-brown mb-2">
                Oops! Something went wrong
              </h1>
            </div>

            {/* Error Message */}
            <div className="bg-[#fdebd2] rounded-3xl p-8 border-[.3vw] border-milk mb-8">
              <h2 className="text-2xl font-bold text-dark-brown mb-4">
                We're sorry for the inconvenience
              </h2>
              <p className="font-paragraph text-dark-brown mb-6">
                Our team has been notified about this issue and we're working to fix it. 
                In the meantime, you can try refreshing the page or returning to our homepage.
              </p>
              
              {/* Error ID for support */}
              {this.state.eventId && (
                <div className="bg-light-brown bg-opacity-20 rounded-2xl p-4 mb-6">
                  <p className="font-paragraph text-dark-brown text-sm">
                    <strong>Error ID:</strong> {this.state.eventId}
                  </p>
                  <p className="font-paragraph text-dark-brown text-xs mt-2">
                    Please include this ID when contacting support
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="bg-mid-brown text-milk font-bold py-3 px-8 rounded-full hover:bg-dark-brown transition-colors duration-300"
                >
                  Refresh Page
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="bg-light-brown text-dark-brown font-bold py-3 px-8 rounded-full hover:bg-mid-brown hover:text-milk transition-colors duration-300"
                >
                  Go to Homepage
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center">
              <p className="font-paragraph text-dark-brown mb-4">
                Still having trouble? Contact our support team:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:support@spylt.com" 
                  className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                >
                  support@spylt.com
                </a>
                <span className="hidden sm:inline text-dark-brown">|</span>
                <a 
                  href="tel:+1-555-123-SPYLT" 
                  className="font-paragraph text-mid-brown font-bold hover:text-dark-brown transition-colors"
                >
                  +1 (555) 123-SPYLT
                </a>
              </div>
            </div>

            {/* Development Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-red-50 p-4 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-bold text-red-800 mb-2">
                  Development Error Details (Click to expand)
                </summary>
                <div className="text-sm text-red-700 font-mono">
                  <p className="mb-2"><strong>Error:</strong> {this.state.error.message}</p>
                  <p className="mb-2"><strong>Stack:</strong></p>
                  <pre className="whitespace-pre-wrap text-xs bg-red-100 p-2 rounded">
                    {this.state.error.stack}
                  </pre>
                  {this.state.errorInfo && (
                    <>
                      <p className="mb-2 mt-4"><strong>Component Stack:</strong></p>
                      <pre className="whitespace-pre-wrap text-xs bg-red-100 p-2 rounded">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (Component, fallback) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for error reporting in functional components
export const useErrorHandler = () => {
  const reportError = (error, errorInfo = {}) => {
    console.error('SPYLT Error Handler:', error);
    
    trackEvent('handled_error', {
      error_message: error.message || error.toString(),
      error_stack: error.stack,
      ...errorInfo,
      brand_interaction: 'error_tracking'
    });
  };

  return { reportError };
};

export default ErrorBoundary;