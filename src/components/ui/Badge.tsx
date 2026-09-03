import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'gold' | 'blue' | 'navy' | 'slate' | 'outline' | 'amber' | 'emerald';
}

export function Badge({ className, variant = 'blue', ...props }: BadgeProps) {
  const variants = {
    gold: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30',
    emerald: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30',
    navy: 'bg-[#0b132b] text-white border border-slate-700',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-transparent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
