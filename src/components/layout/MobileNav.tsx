'use client';

import React from 'react';
import Link from 'next/link';
import { X, Phone, Mail } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#070d1e] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <Logo />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <Link href="/quote" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full font-bold text-slate-950">
              Get Free Quote
            </Button>
          </Link>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
