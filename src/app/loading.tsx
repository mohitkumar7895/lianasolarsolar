import React from 'react';
import { SunMedium } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500">
        <SunMedium className="w-10 h-10 animate-spin-slow" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 animate-pulse">
        Loading Liana Solar...
      </p>
    </div>
  );
}
