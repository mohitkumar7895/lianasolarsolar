'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent, DEFAULT_ABOUT_CONTENT } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';

export default function AboutPage() {
  const { config, aboutContent } = useSiteContent();
  const { openQuoteModal } = useModal();

  const currentAbout = aboutContent || DEFAULT_ABOUT_CONTENT;
  const pillars = currentAbout.pillars || DEFAULT_ABOUT_CONTENT.pillars;
  const stats = currentAbout.stats || DEFAULT_ABOUT_CONTENT.stats;

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 space-y-16">
      <Container>
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
              <span className="w-5 h-0.5 bg-[#f97316]" />
              <span>{currentAbout.badge || `ABOUT ${config.name?.toUpperCase() || 'LIANASOLAR'}`}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {currentAbout.heading || 'Pioneering Clean Solar Energy with Engineering Precision'}
            </h1>

            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              {currentAbout.storyPara1 || `${config.name || 'Lianasolar'} is a premier solar EPC engineering and clean energy provider.`}
            </p>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {currentAbout.storyPara2 || 'With certified UPNEDA vendor status and more than three decades of engineering and infrastructure experience.'}
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={openQuoteModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-black transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                Request Site Survey <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-bold transition-all"
              >
                View Project Gallery
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900">
              <Image
                src={currentAbout.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95'}
                alt="Lianasolar Engineering Excellence"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                unoptimized={true}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Key Stats Strip */}
        {stats && stats.length > 0 && (
          <div className="max-w-6xl mx-auto pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <div className="text-2xl sm:text-4xl font-black text-[#f97316] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Core Commitments */}
        <div className="max-w-6xl mx-auto space-y-6 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
              OUR COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              How We Deliver Superior Solar Plants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.num || idx}
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <span className="text-xs font-black text-[#f97316] font-mono">
                  {pillar.num || `0${idx + 1}`}
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
