'use client';

import React from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { Zap, Sun, Shield, BatteryCharging, Cpu } from 'lucide-react';

const BRAND_ICONS: Record<string, React.ReactNode> = {
  SERVOTEC: <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />,
  Deye: <div className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-xs" />,
  solis: <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />,
  'INA SOLAR': <Shield className="w-4 h-4 text-cyan-600" />,
  Livguard: <BatteryCharging className="w-5 h-5 text-red-600" />,
  LUMINOUS: <Cpu className="w-5 h-5 text-blue-700" />,
  'TATA POWER SOLAR': <Zap className="w-5 h-5 text-blue-600" />,
  WAAREE: <Sun className="w-5 h-5 text-emerald-600" />,
  GROWATT: <Zap className="w-5 h-5 text-emerald-500" />,
};

export function BrandEcosystem() {
  const { config, partners } = useSiteContent();

  // Duplicate the list for a seamless continuous infinite marquee loop
  const marqueeList = [...partners, ...partners, ...partners];

  return (
    <section className="py-4 sm:py-5 bg-white border-b border-slate-100 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-3">
        {/* Uppercase ecosystem title */}
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-500 block">
          {config.ecosystemHeading || 'TECHNOLOGY AND EQUIPMENT ECOSYSTEM'}
        </span>
      </div>

      {/* Infinite Horizontal Sliding Marquee */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left & Right subtle gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
          {marqueeList.map((partner, index) => {
            const icon = BRAND_ICONS[partner.name] || (
              <Zap className="w-4 h-4 text-amber-500" />
            );

            return (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center justify-center min-w-[150px] sm:min-w-[190px] h-16 sm:h-20 px-5 sm:px-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400/60 transition-all duration-300 flex-shrink-0 group cursor-default"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      className="text-base sm:text-lg font-black tracking-tight leading-tight uppercase font-heading"
                      style={{ color: partner.color || '#0f172a' }}
                    >
                      {partner.name}
                    </span>
                    {partner.tagline && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-none mt-0.5">
                        {partner.tagline}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
