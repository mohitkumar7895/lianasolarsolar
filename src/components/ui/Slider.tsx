import React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | React.ReactNode;
}

export function Slider({ className, label, valueDisplay, min = 500, max = 50000, step = 500, value, onChange, ...props }: SliderProps) {
  return (
    <div className="w-full space-y-2">
      {(label || valueDisplay) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>}
          {valueDisplay && <span className="font-bold text-amber-600 dark:text-amber-400">{valueDisplay}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30',
          className
        )}
        {...props}
      />
    </div>
  );
}
