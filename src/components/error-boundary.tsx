'use client';

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';

/**
 * ErrorBoundary component to capture rendering errors inside the content
 * area while keeping outer layouts (e.g. sidebar) intact.
 *
 * Usage:
 *
 * ```tsx
 * <ErrorBoundary>
 *   <YourContent />
 * </ErrorBoundary>
 * ```
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Content rendering error:', {
      message: error.message,
      stack: error.stack,
      componentStack: (errorInfo as { componentStack?: string })?.componentStack,
    });
  }

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return <ErrorBoundaryFallback onReset={this.reset} />;
    }

    return children;
  }
}

function ErrorBoundaryFallback({ onReset }: { onReset: () => void }) {

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-6 text-center dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="mt-8 text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Oops.. something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We&apos;ve logged the error and our team is working on it.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 rounded-md px-4 py-2 shadow focus:ring-2 focus:outline-none"
          >
            Try again
          </button>

          <Link
            href="/"
            onClick={onReset}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border px-4 py-2 text-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
