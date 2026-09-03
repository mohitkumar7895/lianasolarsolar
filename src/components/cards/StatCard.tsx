import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({ label, value, subtext, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('relative overflow-hidden group hover:border-amber-500/50 transition-all duration-300', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
          {icon && (
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
          {trend && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>

        {subtext && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtext}</p>}
      </CardContent>
    </Card>
  );
}
