'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('CycleZen Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading CycleZen. This might be a temporary issue.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            Go to Home
          </button>
        </div>
        {error.digest && (
          <p className="text-xs text-gray-500 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
