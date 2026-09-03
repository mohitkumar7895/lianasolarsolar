import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-black uppercase tracking-wider text-slate-800">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-xs',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500 font-medium">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
