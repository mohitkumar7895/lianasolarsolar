'use client';

import React, { useEffect } from 'react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { QuoteForm } from '@/components/forms/QuoteForm';

export function QuoteModal() {
  const { isQuoteModalOpen, closeQuoteModal } = useModal();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isQuoteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isQuoteModalOpen]);

  if (!isQuoteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeQuoteModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={closeQuoteModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-left space-y-1.5 pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#f97316] border border-orange-200 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Direct Govt. Subsidy ₹78,000
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Request Free Solar Quote
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Get an instant custom rooftop solar estimation and subsidy assessment.
          </p>
        </div>

        {/* Form */}
        <QuoteForm />
      </div>
    </div>
  );
}
