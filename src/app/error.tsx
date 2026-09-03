'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center">
        <AlertTriangle className="w-9 h-9" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
      <p className="text-sm text-slate-500 max-w-md">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <Button variant="primary" onClick={() => reset()} className="gap-2">
        <RefreshCw className="w-4 h-4" /> Try Again
      </Button>
    </div>
  );
}
