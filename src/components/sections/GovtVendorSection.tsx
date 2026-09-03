'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
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
    <section className="py-8 sm:py-12 bg-[#072438] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left: Government Portal / UPNEDA Approval Badge with subtle float */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white p-5 shadow-2xl flex flex-col items-center justify-center text-center space-y-2 border-2 border-emerald-500/30 animate-float hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-wider block font-heading">
                  UPNEDA
                </span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5">
                  Registered Vendor
                </span>
              </div>
            </div>
          </div>

          {/* Right: Copy & Features */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top orange dash + badge */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#4ade80]">
              <span className="w-5 h-0.5 bg-[#f97316]" />
              <span>REGISTRATION & SCHEME SUPPORT</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              UPNEDA Registered Rooftop Solar Vendor
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-200/90 max-w-3xl leading-relaxed">
              {config.name || 'Lianasolar'} supports customers with rooftop solar planning, documentation, installation, net metering assistance and guidance for eligible government rooftop solar programmes, including PM Surya Ghar.
            </p>

            {/* Box: Why Choose a UPNEDA Registered Vendor? */}
            <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3.5 shadow-lg">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Why Choose a UPNEDA Registered Vendor?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-100 font-medium hover:text-[#4ade80] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80] flex-shrink-0 animate-pulse" />
                    <span>{benefit}</span>
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
