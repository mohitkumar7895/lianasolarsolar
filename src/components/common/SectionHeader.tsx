import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'gold' | 'blue' | 'navy' | 'slate' | 'outline' | 'amber' | 'emerald';
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = 'blue',
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-6 sm:mb-8', alignments[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-2.5 px-3 py-1 font-bold uppercase tracking-wider text-[11px]">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
