'use client';

import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { logger } from '@/lib/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error caught by boundary', error);
  }

  render() {
    if (this.state.hasError) {
      const isMissingEnv = 
        this.state.error?.message?.includes('NEXT_PUBLIC_SUPABASE_URL') ||
        this.state.error?.message?.includes('undefined')
      
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-black px-4">
          <div className="max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              {isMissingEnv ? 'Configuration Error' : 'Something went wrong'}
            </h1>
            <p className="text-gray-300 mb-4">
              {isMissingEnv 
                ? 'Environment variables are not configured on Vercel. Please check the QUICK_FIX_CHECKLIST.md for setup instructions.'
                : this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {!isMissingEnv && (
              <p className="text-sm text-gray-400 mb-4 font-mono break-words">
                {this.state.error?.stack?.split('\n')[0]}
              </p>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/dashboard';
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
