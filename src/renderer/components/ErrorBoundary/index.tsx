/* eslint-disable react/require-default-props */
import { Component, PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<
  PropsWithChildren<{
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  }>,
  { hasError: boolean }
> {
  private onError: (error: Error, errorInfo: React.ErrorInfo) => void =
    console.error;

  constructor(props: {
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  }) {
    super(props);
    this.state = { hasError: false };
    this.onError = props.onError || this.onError;
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    this.onError(error, errorInfo);
  }

  render() {
    const {
      props: { children },
      state: { hasError },
    } = this;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
