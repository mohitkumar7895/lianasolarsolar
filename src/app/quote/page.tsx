import React from 'react';
import { Container } from '@/components/layout/Container';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Sparkles, ShieldCheck, Award, Zap } from 'lucide-react';

export const metadata = {
  title: 'Request Free Solar Quote | Lianasolar',
  description: 'Get an instant rooftop solar estimation, subsidy assessment up to ₹78,000, and zero-obligation site visit.',
};

export default function QuotePage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white min-h-screen flex items-center justify-center">
      <Container className="max-w-2xl">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-[#f97316] border border-orange-500/30 text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> PM Surya Ghar Subsidy ₹78,000
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Request Free Solar Quote
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Fill in your basic property details below. Our certified solar engineer will prepare a customized 3D design & generation report.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-[36px] border border-slate-100 shadow-2xl space-y-6">
          <QuoteForm />
        </div>

        {/* Trust Badges under Form */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-center text-xs text-slate-400">
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-slate-200">Zero Obligation</span>
            <span className="text-[11px]">100% Free Site Visit</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-slate-200">Govt. Certified</span>
            <span className="text-[11px]">ALMM & BIS Approved</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Zap className="w-5 h-5 text-[#f97316]" />
            <span className="font-bold text-slate-200">25-Yr Warranty</span>
            <span className="text-[11px]">Tier-1 Equipment</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
