'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0 py-3">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left font-semibold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
      >
        <span className="text-base sm:text-lg">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ml-4',
            isOpen && 'rotate-180 text-amber-500'
          )}
        />
      </button>
      {isOpen && (
        <div className="pt-2 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionProps {
  items: { id: string; title: string; content: React.ReactNode }[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('w-full divide-y divide-slate-200 dark:divide-slate-800', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
