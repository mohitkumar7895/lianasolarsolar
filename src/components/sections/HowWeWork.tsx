'use client';

import React from 'react';
import { MapPin, Ruler, FileCheck, Wrench, Headphones, ArrowRight, ArrowDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function HowWeWork() {
  const steps = [
    {
      num: '01',
      title: 'Site Survey',
      desc: 'We assess rooftop shadow angles, power load and feasibility.',
      icon: <MapPin className="w-4 h-4 text-white" />,
    },
    {
      num: '02',
      title: 'System Design',
      desc: 'Precision 3D sizing, optimal panel array and generation output.',
      icon: <Ruler className="w-4 h-4 text-white" />,
    },
    {
      num: '03',
      title: 'Documentation',
      desc: 'DISCOM sanction approvals, PM Surya Ghar subsidy filing.',
      icon: <FileCheck className="w-4 h-4 text-white" />,
    },
    {
      num: '04',
      title: 'Installation',
      desc: 'Tier-1 hardware mounting, electrical safety and net metering.',
      icon: <Wrench className="w-4 h-4 text-white" />,
    },
    {
      num: '05',
      title: 'Ongoing Support',
      desc: 'Continuous cloud monitoring, warranty service and maintenance.',
      icon: <Headphones className="w-4 h-4 text-white" />,
    },
  ];

  return (
    <section className="py-6 sm:py-10 bg-white border-t border-slate-100 relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <span className="w-5 h-0.5 bg-[#f97316]" />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            A Clear Path from{' '}
            <span className="text-[#15803d]">Survey to Solar</span>
          </h2>
        </div>

        {/* 5-Step Process Cards with Connecting Arrows (Desktop + Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 max-w-7xl mx-auto items-stretch">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`relative flex flex-col group ${
                idx === steps.length - 1 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* Step Card with sleek compact styling */}
              <div className="h-full p-3.5 sm:p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-[#15803d]/40 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-2.5">
                <div className="space-y-2">
                  {/* Top Bar: Icon, Step Number & Mobile/Desktop Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#005274] group-hover:bg-[#15803d] flex items-center justify-center shadow-xs transition-colors duration-300">
                      {step.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-black text-[#f97316] font-mono">
                        {step.num}
                      </span>
                      {/* Mobile Step Arrow Indicator */}
                      {idx < steps.length - 1 && (
                        <span className="lg:hidden w-4 h-4 rounded-full bg-emerald-50 text-[#15803d] flex items-center justify-center">
                          <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-base font-black text-slate-900 tracking-tight group-hover:text-[#15803d] transition-colors leading-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10.5px] sm:text-xs text-slate-600 leading-snug font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Desktop Connecting Arrow Indicator */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center shadow-xs group-hover:text-[#15803d] group-hover:border-emerald-300 transition-colors">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
