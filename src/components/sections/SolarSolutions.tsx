'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Factory, Wheat, Sparkles, Zap } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useModal } from '@/context/ModalContext';
import { useSiteContent } from '@/context/SiteContentContext';

const ICONS_MAP: Record<string, React.ReactNode> = {
  residential: <Home className="w-4 h-4 text-[#f97316]" />,
  commercial: <Building2 className="w-4 h-4 text-[#f97316]" />,
  industrial: <Factory className="w-4 h-4 text-[#f97316]" />,
  agricultural: <Wheat className="w-4 h-4 text-[#f97316]" />,
};

const DEFAULT_IMAGES: Record<string, string> = {
  residential: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
  commercial: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
  industrial: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95',
  agricultural: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
};

export function SolarSolutions() {
  const { openQuoteModal } = useModal();
  const { solutions } = useSiteContent();

  const allSolutions = solutions && solutions.length > 0 ? solutions : [
    {
      id: 'residential',
      slug: 'residential-solar',
      title: 'Residential Rooftop Solar',
      subtitle: 'Cut home electricity bills by up to 90%',
      description: 'Turn your roof into an independent clean energy generator with direct PM Surya Ghar subsidy.',
      image: DEFAULT_IMAGES.residential,
      capacityRange: '2 kW to 15 kW',
      idealFor: 'Villas & Homes',
      features: [],
      specs: [],
    },
    {
      id: 'commercial',
      slug: 'commercial-solar',
      title: 'Commercial Rooftop Solar',
      subtitle: 'Hedge operating costs & claim 40% depreciation',
      description: 'Slash operational grid tariffs with 40% accelerated tax depreciation benefits.',
      image: DEFAULT_IMAGES.commercial,
      capacityRange: '20 kW to 250 kW',
      idealFor: 'Offices & Schools',
      features: [],
      specs: [],
    },
    {
      id: 'industrial',
      slug: 'industrial-solar',
      title: 'Industrial Solar Plants',
      subtitle: 'Megawatt-scale clean energy for factories & warehouses',
      description: 'Heavy-duty solar installations on metal sheds, engineered for continuous manufacturing loads.',
      image: DEFAULT_IMAGES.industrial,
      capacityRange: '100 kW to 2 MW+',
      idealFor: 'Factories & Sheds',
      features: [],
      specs: [],
    },
  ];

  // Set exactly 3 cards for the homepage as requested by user
  const displaySolutions = allSolutions.slice(0, 3);

  return (
    <section id="solutions" className="py-8 sm:py-12 bg-white border-t border-slate-100 relative">
      <Container>
        {/* Section Header with compact padding */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <span className="w-5 h-0.5 bg-[#f97316]" />
            <span>OUR SOLAR SOLUTIONS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Solar Designed for{' '}
            <span className="text-[#15803d]">Every Type of Property</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Custom engineered turnkey rooftop solutions tailored for maximum ROI, government subsidies, and 25-year performance.
          </p>
        </div>

        {/* 3 Premium Solution Cards in 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displaySolutions.map((item, idx) => {
            const icon = ICONS_MAP[item.id] || <Home className="w-4 h-4 text-[#f97316]" />;
            const imgSrc = item.image || DEFAULT_IMAGES[item.id] || DEFAULT_IMAGES.residential;
            const itemNum = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                className="group relative h-[380px] sm:h-[410px] rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 select-none border border-slate-100 hover:border-[#15803d]/50 bg-slate-900"
              >
                {/* Background Image with Smooth Zoom */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    unoptimized={true}
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30 group-hover:via-slate-950/50 transition-colors duration-500" />
                </div>

                {/* Top Bar: Number + Category Chip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-8 h-7 rounded-lg bg-[#f97316] text-white font-black text-xs shadow-md group-hover:scale-105 transition-transform">
                    {itemNum}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                    {icon}
                    <span>{item.idealFor || item.title.split(' ')[0]}</span>
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-orange-500/20 text-[#f97316] text-[10px] font-black uppercase tracking-wider border border-orange-500/30 backdrop-blur-xs">
                    <Zap className="w-3 h-3 fill-[#f97316]" /> {item.capacityRange}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-200/90 leading-relaxed font-normal line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                    <Link
                      href={`/solutions#${item.id}`}
                      className="flex items-center gap-1 text-xs font-bold text-[#4ade80] hover:text-[#22c55e] transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        openQuoteModal();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Get Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Solutions Link */}
        <div className="mt-6 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-wider transition-all shadow-xs hover:scale-105"
          >
            <span>View All Solar Packages</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f97316]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
