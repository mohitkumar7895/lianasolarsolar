'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';
import { ensureArray } from '@/lib/safe-utils';

export default function SolutionsPage() {
  const { solutions } = useSiteContent();
  const { openQuoteModal } = useModal();

  return (
    <div className="bg-white py-10 sm:py-16 space-y-16">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <span className="w-5 h-0.5 bg-[#f97316]" />
            <span>TURNKEY EPC ENGINEERING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Solar Solutions for <span className="text-[#15803d]">Every Property</span>
          </h1>
        </div>

        {/* Solutions List with Minimal Points & Luxury Card Animations */}
        <div className="space-y-10 sm:space-y-12 max-w-6xl mx-auto">
          {solutions.map((sol, idx) => {
            const featureList = ensureArray(sol.features);

            return (
              <div
                key={sol.id}
                id={sol.id}
                className="p-6 sm:p-9 rounded-[32px] bg-slate-50/70 border-2 border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#15803d]/40 hover:-translate-y-1.5 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center group"
              >
                {/* Image Column */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative h-64 sm:h-76 md:h-84 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-900">
                    <Image
                      src={sol.image}
                      alt={sol.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      unoptimized={true}
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-black uppercase tracking-wider text-white bg-[#f97316] px-3.5 py-1.5 rounded-xl shadow-md">
                        {sol.capacityRange}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Column (Minimal, Crisp Points) */}
                <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-[#15803d]">
                      {sol.idealFor || 'Turnkey Solar Installation'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors">
                      {sol.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Minimal Feature Highlights (Max 2-3 points) */}
                  <div className="space-y-2 pt-1 border-t border-slate-200/80">
                    {featureList.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={openQuoteModal}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-[#f97316] text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Get Free Proposal for {sol.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
