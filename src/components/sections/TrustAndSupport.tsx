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
      desc: 'Registered vendor support for eligible rooftop solar projects and applicable processes in Uttar Pradesh and Delhi NCR.',
      icon: <BadgeCheck className="w-5 h-5 text-white" />,
    },
    {
      title: 'Engineering Background',
      desc: 'Backed by more than three decades of business, infrastructure and engineering experience.',
      icon: <Building2 className="w-5 h-5 text-white" />,
    },
    {
      title: 'End-to-End Execution',
      desc: 'One coordinated team for design, supply, installation, commissioning and support.',
      icon: <Wrench className="w-5 h-5 text-white" />,
    },
    {
      title: 'Quality-Focused Work',
      desc: 'Structured project planning, installation checks, testing and responsible site execution.',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
    },
    {
      title: 'Documentation Assistance',
      desc: 'Support with project documents, net metering and eligible scheme processes.',
      icon: <FileCheck className="w-5 h-5 text-white" />,
    },
    {
      title: 'After-Sales Support',
      desc: 'Responsive assistance to help maintain system performance and customer confidence.',
      icon: <Headphones className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white border-t border-slate-100 relative">
      <Container>
        {/* Outer framed container */}
        <div className="max-w-6xl mx-auto p-5 sm:p-8 lg:p-10 rounded-[28px] bg-slate-50/70 border-2 border-slate-100 shadow-sm space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
              <span className="w-5 h-0.5 bg-[#f97316]" />
              <span>WHY {config.name?.toUpperCase() || 'LIANASOLAR'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Built Around{' '}
              <span className="text-[#15803d]">Trust, Quality and Support</span>
            </h2>
          </div>

          {/* 6 Cards Grid with Smooth Lift Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {trustPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[28px] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-[#15803d]/30 hover:-translate-y-1.5 transition-all duration-300 space-y-3.5 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Teal/Navy squircle icon shifting to Emerald on Hover */}
                  <div className="w-12 h-12 rounded-2xl bg-[#005274] group-hover:bg-[#15803d] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {pillar.icon}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
