'use client';

import React from 'react';
import { MapPin, Ruler, FileCheck, Wrench, Headphones, ArrowRight, ArrowDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function HowWeWork() {
  const steps = [
    {
      num: '01',
      title: 'Site Survey',
      desc: 'We assess the roof, electricity requirement and project feasibility.',
      icon: <MapPin className="w-5 h-5 text-white" />,
    },
    {
      num: '02',
      title: 'System Design',
      desc: 'Our team plans system capacity, layout, equipment and expected output.',
      icon: <Ruler className="w-5 h-5 text-white" />,
    },
    {
      num: '03',
      title: 'Documentation',
      desc: 'We assist with applicable approvals, subsidy and net metering documents.',
      icon: <FileCheck className="w-5 h-5 text-white" />,
    },
    {
      num: '04',
      title: 'Installation',
      desc: 'Professional installation, electrical integration, testing and commissioning.',
      icon: <Wrench className="w-5 h-5 text-white" />,
    },
    {
      num: '05',
      title: 'Ongoing Support',
      desc: 'After sales assistance to support system performance and long term value.',
      icon: <Headphones className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white border-t border-slate-100 relative overflow-hidden">
      <Container>
        {/* Header matching reference screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <span className="w-6 h-0.5 bg-[#f97316]" />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            A Clear Path from{' '}
            <span className="text-[#15803d]">Survey to Solar</span>
          </h2>
        </div>

        {/* 5-Step Process Cards with Animated Connecting Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative max-w-7xl mx-auto items-stretch">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col group">
              {/* Step Card with Lift Animation */}
              <div className="h-full p-6 sm:p-7 rounded-[28px] bg-white border-2 border-slate-100/90 shadow-md group-hover:shadow-2xl group-hover:border-[#15803d]/40 group-hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Step Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#f97316] font-mono tracking-wider group-hover:scale-110 transition-transform">
                      {step.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
                  </div>

                  {/* Squircle Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#005274] group-hover:bg-[#15803d] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Animated Connecting Arrow (Desktop Horizontal) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border-2 border-emerald-400 text-[#15803d] items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3] animate-pulse" />
                </div>
              )}

              {/* Animated Connecting Arrow (Mobile Vertical) */}
              {idx < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-2 text-[#15803d]">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
