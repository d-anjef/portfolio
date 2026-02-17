import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL/Spline Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', background: '#111', height: '100vh' }}>
          <h2>Something went wrong with the 3D graphics.</h2>
          <button onClick={() => window.location.reload()} style={{ padding: '10px', cursor: 'pointer' }}>
            Reload Portfolio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;