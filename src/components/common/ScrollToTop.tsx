'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScroll } from '@/hooks/use-scroll';

export function ScrollToTop() {
  const scrolled = useScroll(400);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!scrolled) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-11 h-11 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 hover:border-transparent transition-all duration-300 active:scale-95"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
