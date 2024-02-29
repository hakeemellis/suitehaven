import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) { // standard principle to start state handling
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) { // error, though not read; is needed
    return { hasError: true };      // to make the code work because the code expects an error at some point
  }
  // The state above is standard with assisting with handling react errors alongside above

  componentDidCatch(error, errorInfo) {
    // Assists with further logging the error to a error reporting service.
    console.error('Error caught by error boundary:', error, errorInfo);
  }
    // With console.log, it shows me the error reported in the DOM

  render() {
    if (this.state.hasError) { // calls the initial state, reports false if no error
      // Renders the fallback UI if true
      // Have to render with inline CSS due to app crashing. i.e. no framework to load styles
      return (
        <div style={{ backgroundColor: '#fff', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <p>Sorry, the app has crashed. <b><a href="/">Click here to return to home</a>.</b></p>
          </div>
        </div>
      );
    }
    // Render children if there's no error
    return this.props.children;
  } // What this is means is if no errors, <ErrorBoundary> Content </ErrorBoundary> will render whatever is wrapped inside it
  // In my case, I wrapped it in my index.js, so if my app.js crashes, it falls back to this.
}

export default ErrorBoundary;
