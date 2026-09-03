'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function WhatsAppButton() {
  const message = encodeURIComponent('Hi Liana Solar! I would like to get a free solar rooftop assessment for my property.');
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <MessageCircle className="w-7 h-7 fill-white/20" />
      <span className="sr-only">Chat with us on WhatsApp</span>
      <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Quick Solar Chat
      </span>
    </a>
  );
}
