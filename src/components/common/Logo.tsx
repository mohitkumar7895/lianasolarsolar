'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSiteContent } from '@/context/SiteContentContext';

export function Logo({
  className,
  textClassName,
  iconSize = 'md',
}: {
  className?: string;
  textClassName?: string;
  iconSize?: 'sm' | 'md' | 'lg';
}) {
  const { config } = useSiteContent();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[iconSize];

  return (
    <Link
      href="/"
      className={cn('flex items-center gap-3 group cursor-pointer select-none', className)}
    >
      {/* Iconic "L" + Rising Sun + Clean Energy Emblem */}
      <div
        className={cn(
          'relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300',
          sizeClasses
        )}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoLianaSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <linearGradient id="logoLianaGreen" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <radialGradient id="logoSunCore" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fde047" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>

          {/* 1. Radiant Rising Sun Core */}
          <circle cx="62" cy="38" r="18" fill="url(#logoSunCore)" />

          {/* Sun Ray Accents */}
          <path d="M62,12 C67,12 71,14 75,17 C73,20 70,22 66,22 C63,20 62,16 62,12 Z" fill="url(#logoLianaSun)" opacity="0.9" />
          <path d="M81,24 C85,28 87,33 88,38 C84,38 81,36 79,32 C79,28 80,26 81,24 Z" fill="url(#logoLianaSun)" opacity="0.85" />
          <path d="M86,45 C87,50 86,55 83,60 C81,57 81,53 82,49 C83,46 85,45 86,45 Z" fill="url(#logoLianaSun)" opacity="0.8" />

          {/* 2. Iconic Sweeping 'L' Solar Arm */}
          <path
            d="M24,16 C30,16 38,21 38,30 L38,64 C38,77 49,83 65,83 C75,83 83,79 87,75 C83,86 71,92 55,92 C34,92 24,78 24,59 L24,16 Z"
            fill="url(#logoLianaSun)"
          />

          {/* 3. Liana Eco-Green Vine Energy Wave (Nature + Life) */}
          <path
            d="M24,59 C24,77 35,90 57,90 C74,90 84,81 89,71 C82,77 72,81 58,81 C42,81 34,71 34,57 C34,45 41,35 50,29 C42,34 35,42 31,52 L24,59 Z"
            fill="url(#logoLianaGreen)"
            opacity="0.95"
          />

          {/* 4. Solar Grid Etchings */}
          <line x1="44" y1="74" x2="50" y2="88" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
          <line x1="56" y1="74" x2="62" y2="88" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
          <line x1="68" y1="74" x2="74" y2="86" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

          {/* 5. Central Solar Diamond Spark */}
          <polygon points="63,38 65,33 67,38 72,40 67,42 65,47 63,42 58,40" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight leading-none font-black text-2xl sm:text-3xl font-heading">
          <span className={cn('text-slate-900 group-hover:text-slate-800 transition-colors', textClassName)}>
            LIANA
          </span>
          <span className="bg-gradient-to-r from-[#f97316] via-amber-500 to-[#ea580c] bg-clip-text text-transparent ml-0.5">
            SOLAR
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-black tracking-[0.28em] text-slate-500 uppercase mt-1">
          SOLAR ENGINEERING & EPC
        </span>
      </div>
    </Link>
  );
}
