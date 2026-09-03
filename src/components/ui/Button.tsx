import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'solar' | 'secondary' | 'navy' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer select-none';

    const variants = {
      primary:
        'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 focus:ring-amber-400',
      solar:
        'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 focus:ring-amber-400',
      secondary:
        'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 focus:ring-blue-500',
      navy:
        'bg-[#0b132b] hover:bg-[#152244] text-white font-semibold border border-slate-700 shadow-md focus:ring-blue-400',
      outline:
        'border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-transparent focus:ring-blue-400',
      ghost:
        'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:ring-slate-400',
    };

    const sizes = {
      sm: 'px-3.5 py-2 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
