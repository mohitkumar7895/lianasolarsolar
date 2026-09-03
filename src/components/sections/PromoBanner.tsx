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
    <section className="py-4 sm:py-6 bg-slate-50 relative overflow-hidden">
      <Container>
        {/* Luxury Clean Photo Banner Card with Dynamic Text Overlay */}
        <div
          onClick={openQuoteModal}
          className="relative w-full rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group hover:scale-[1.008] transition-all duration-500 bg-slate-950"
        >
          {/* Clean High-Res Solar Photo Background (Strictly without baked-in text) */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px]">
            <Image
              src={imageSrc}
              alt="Solar Promotion"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Subtle Gradient Overlays for High-Contrast Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/50" />

            {/* Top Floating Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider border border-amber-400/50 shadow-lg">
                <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                {banner.badge || '🦚 Shubh Janmashtami Mahotsav Special Offer'}
              </span>

              <span className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-400/40 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                UPNEDA Certified EPC
              </span>
            </div>

            {/* Bottom Clean Text Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 max-w-5xl">
                {/* Left Headings */}
                <div className="space-y-2.5 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/30 border border-orange-400/50 text-orange-300 text-xs font-black uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5 fill-current" /> PM SURYA GHAR DBT SUBSIDY APPLICABLE
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                    {banner.title || '✨ Janmashtami Special: Zero Electricity Bills for 25 Years! ✨'}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                    {banner.subtitle ||
                      'Celebrate prosperity this Janmashtami! Claim ₹78,000 direct subsidy + extra festive benefits on premier rooftop solar installations.'}
                  </p>
                </div>

                {/* Right Action Button */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={openQuoteModal}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <Sparkles className="w-5 h-5 fill-white text-white" />
                    <span>{banner.buttonText || 'Claim Janmashtami Offer 🦚'}</span>
                    <ArrowRight className="w-5 h-5" />
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
