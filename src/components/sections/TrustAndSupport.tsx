'use client';

import React from 'react';
import {
  BadgeCheck,
  Building2,
  Wrench,
  ShieldCheck,
  FileCheck,
  Headphones,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';

export function TrustAndSupport() {
  const { config } = useSiteContent();

  const trustPillars = [
    {
      title: 'UPNEDA Registered',
      desc: 'Registered vendor support for eligible rooftop solar projects across UP & Delhi NCR.',
      icon: <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
    {
      title: 'Engineering Background',
      desc: 'Backed by more than three decades of business, infrastructure and engineering leadership.',
      icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
    {
      title: 'End-to-End Execution',
      desc: 'One coordinated team for 3D design, hardware supply, installation and DISCOM synchronization.',
      icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
    {
      title: 'Quality-Focused Work',
      desc: 'Tier-1 bifacial panels, cyclone-rated mounting and zero-shutdown project execution.',
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
    {
      title: 'Documentation & Subsidy',
      desc: 'Complete assistance with DISCOM approvals, net metering and ₹78,000 PM Surya Ghar subsidy.',
      icon: <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
    {
      title: '25-Year Long Support',
      desc: 'Responsive engineering assistance, IoT cloud monitoring and guaranteed manufacturer warranty.',
      icon: <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
    },
  ];

  return (
    <section className="py-6 sm:py-10 bg-white border-t border-slate-100 relative">
      <Container>
        {/* Outer framed container */}
        <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[28px] bg-slate-50/70 border-2 border-slate-100 shadow-xs space-y-5 sm:space-y-7">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
              <span className="w-5 h-0.5 bg-[#f97316]" />
              <span>WHY {config.name?.toUpperCase() || 'LIANASOLAR'}</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Built Around{' '}
              <span className="text-[#15803d]">Trust, Quality and Support</span>
            </h2>
          </div>

          {/* 6 Cards in a clean 2-Column Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {trustPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl sm:rounded-[24px] bg-white border-2 border-slate-100/90 shadow-xs hover:shadow-lg hover:border-[#15803d]/30 hover:-translate-y-1 transition-all duration-300 space-y-2.5 sm:space-y-3.5 flex flex-col justify-between group"
              >
                <div className="space-y-2 sm:space-y-3">
                  {/* Icon */}
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#005274] group-hover:bg-[#15803d] flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300">
                    {pillar.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-base md:text-lg font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors leading-tight">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
