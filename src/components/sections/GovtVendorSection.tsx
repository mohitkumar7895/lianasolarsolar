'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';

export function GovtVendorSection() {
  const { config } = useSiteContent();

  const benefits = [
    'Government-approved vendor',
    'Proper documentation',
    'Net metering support',
    'Quality installation',
    'Subsidy guidance',
    'After-sales service',
  ];

  return (
    <section className="py-6 sm:py-10 bg-[#072438] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center max-w-6xl mx-auto">
          {/* Left: Government Portal / UPNEDA Approval Badge */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="w-full sm:w-44 rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-5 shadow-xl flex flex-row sm:flex-col items-center justify-center text-center gap-3 sm:gap-2 border-2 border-emerald-500/30 hover:scale-105 transition-transform duration-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <div className="text-left sm:text-center">
                <span className="text-lg sm:text-2xl font-black text-emerald-700 tracking-wider block font-heading leading-tight">
                  UPNEDA
                </span>
                <span className="text-[10px] sm:text-[9px] font-bold text-slate-600 sm:text-slate-500 uppercase tracking-widest block">
                  Registered Vendor
                </span>
              </div>
            </div>
          </div>

          {/* Right: Copy & Features */}
          <div className="lg:col-span-9 space-y-3 sm:space-y-4">
            {/* Top orange dash + badge */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#4ade80]">
              <span className="w-4 sm:w-5 h-0.5 bg-[#f97316]" />
              <span>REGISTRATION & SCHEME SUPPORT</span>
            </div>

            {/* Main Title */}
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              UPNEDA Registered Rooftop Solar Vendor
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-200/90 max-w-3xl leading-relaxed">
              {config.name || 'Lianasolar'} supports customers with rooftop solar planning, documentation, installation, net metering assistance and guidance for eligible government rooftop solar programmes, including PM Surya Ghar.
            </p>

            {/* Box: Why Choose a UPNEDA Registered Vendor? (2-column layout on mobile) */}
            <div className="mt-3 p-3.5 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5 sm:space-y-3.5 shadow-md">
              <h3 className="text-xs sm:text-base font-bold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#4ade80]" /> Why Choose a UPNEDA Registered Vendor?
              </h3>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-6 sm:gap-y-2.5">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-slate-100 font-medium hover:text-[#4ade80] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ade80] shrink-0" />
                    <span className="leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
