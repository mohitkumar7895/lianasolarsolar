'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Cpu, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';
import { ensureArray } from '@/lib/safe-utils';

export default function ProductsPage() {
  const { productsTech } = useSiteContent();
  const { openQuoteModal } = useModal();

  return (
    <div className="bg-white py-10 sm:py-16 space-y-16">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <Cpu className="w-4 h-4 text-[#f97316]" />
            <span>TIER-1 EQUIPMENT & HARDWARE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Certified Solar <span className="text-[#15803d]">Products & Technology</span>
          </h1>
        </div>

        {/* Products Cards Grid with Minimal Points & Luxury Micro-Animations */}
        <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto">
          {productsTech.map((product) => {
            const featureList = ensureArray(product.keyFeatures);

            return (
              <div
                key={product.id}
                className="p-6 sm:p-8 rounded-[32px] bg-slate-50/70 border-2 border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#15803d]/40 hover:-translate-y-1.5 transition-all duration-500 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Product Image */}
                  <div className="lg:col-span-5">
                    <div className="relative h-60 sm:h-72 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        unoptimized={true}
                      />
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-xs font-black text-white bg-[#15803d] px-3.5 py-1.5 rounded-xl shadow-md">
                          {product.warranty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details (Minimal Crisp Points) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-[#f97316]">
                        {product.tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors">
                        {product.name}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {product.description}
                    </p>

                    {/* Feature Checkmarks (Max 2-3 points) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/80">
                      {featureList.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={openQuoteModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-[#f97316] text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Inquire Specs & Pricing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
