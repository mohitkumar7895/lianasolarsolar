'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Gift, ShieldCheck, Zap } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';

export function PromoBanner() {
  const { config } = useSiteContent();
  const { openQuoteModal } = useModal();

  const banner = config.promoBanner;
  // If admin toggled off the banner or disabled it, do NOT render anything!
  if (!banner || banner.enabled === false) return null;

  const imageSrc = banner.imageUrl || '/banners/clean-solar-sunset.jpg';

  return (
    <section className="py-3 sm:py-6 bg-slate-50 relative overflow-hidden">
      <Container>
        {/* Luxury Clean Photo Banner Card with Responsive Dynamic Text Overlay */}
        <div
          onClick={openQuoteModal}
          className="relative w-full rounded-2xl sm:rounded-[32px] overflow-hidden shadow-xl sm:shadow-2xl cursor-pointer group hover:scale-[1.006] transition-all duration-500 bg-slate-950"
        >
          {/* Responsive Container: Dynamic height on mobile, fixed ratio on desktop */}
          <div className="relative w-full min-h-[380px] sm:min-h-[440px] md:h-[480px] lg:h-[500px] flex flex-col justify-between p-4 sm:p-8 md:p-10">
            {/* Background Image */}
            <Image
              src={imageSrc}
              alt="Solar Promotion"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Contrast Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/98 via-slate-950/60 to-slate-950/40 pointer-events-none" />

            {/* Top Floating Badges */}
            <div className="relative z-10 flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-300 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider border border-amber-400/50 shadow-md">
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-bounce" />
                {banner.badge || '🦚 Shubh Janmashtami Mahotsav Special Offer'}
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/85 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-400/40 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                UPNEDA Certified EPC
              </span>
            </div>

            {/* Bottom Content & CTA */}
            <div className="relative z-10 pt-6 sm:pt-0">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-6 max-w-5xl">
                {/* Left Headings */}
                <div className="space-y-2 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-orange-500/30 border border-orange-400/50 text-orange-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                    <Zap className="w-3 h-3 fill-current" /> PM SURYA GHAR DBT SUBSIDY APPLICABLE
                  </div>

                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                    {banner.title || '✨ Janmashtami Special: Zero Electricity Bills for 25 Years! ✨'}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl font-medium leading-relaxed line-clamp-3 sm:line-clamp-none drop-shadow-sm">
                    {banner.subtitle ||
                      'Celebrate prosperity this Janmashtami! Claim ₹78,000 direct subsidy + extra festive benefits on premier rooftop solar installations.'}
                  </p>
                </div>

                {/* Right Action Button */}
                <div className="w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                  <button
                    onClick={openQuoteModal}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-white text-white" />
                    <span>{banner.buttonText || 'Claim Offer 🦚'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
