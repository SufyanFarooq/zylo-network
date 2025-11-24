'use client';

import { useEffect } from 'react';

/**
 * Filters out preload warnings from console to reduce noise
 * These warnings are browser-level performance hints, not actual errors
 */
export default function ConsoleFilter() {
  useEffect(() => {
    // Only filter in development
    if (process.env.NODE_ENV !== 'development') return;

    // Store original console methods
    const originalWarn = console.warn;
    const originalError = console.error;

    // Filter function for preload warnings
    const shouldFilter = (message: unknown): boolean => {
      if (typeof message === 'string') {
        return message.includes('preload') && 
               message.includes('was preloaded using link preload but not used');
      }
      return false;
    };

    // Override console.warn
    console.warn = function(...args: unknown[]) {
      // Filter out preload warnings
      if (args.length > 0 && shouldFilter(args[0])) {
        return; // Suppress this warning
      }
      originalWarn.apply(console, args);
    };

    // Override console.error (some browsers show preload warnings as errors)
    console.error = function(...args: unknown[]) {
      // Filter out preload warnings shown as errors
      if (args.length > 0 && shouldFilter(args[0])) {
        return; // Suppress this warning
      }
      originalError.apply(console, args);
    };

    // Cleanup on unmount
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}

