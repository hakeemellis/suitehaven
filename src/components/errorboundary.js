import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return (
        <div style={{ backgroundColor: '#fff', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Sorry, the app has crashed. Return to <a href="/">home</a>.</p>
        </div>
      );
    }
    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
