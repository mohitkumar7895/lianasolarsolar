'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Zap } from 'lucide-react';
import { Container } from './Container';
import { Logo } from '@/components/common/Logo';
import { useSiteContent } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { config } = useSiteContent();
  const { openQuoteModal } = useModal();

  const NAV_ITEMS = [
    { name: 'HOME', href: '/' },
    { name: 'SOLAR SOLUTIONS', href: '/solutions' },
    { name: 'PRODUCTS & TECH', href: '/products' },
    { name: 'GALLERY', href: '/projects' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'TRUST DELIVERED', href: '/trust' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const primaryPhone = config.phone || '+91 9160342240';
  const secondaryPhone = '+91 9550001418';

  return (
    <header className="w-full bg-white z-40 relative shadow-sm">
      {/* TIER 1: TOP WHITE BRAND & CONTACT BAR */}
      <div className="py-3.5 bg-white border-b border-slate-100">
        <Container className="flex items-center justify-between">
          {/* Left: Social Icons */}
          <div className="hidden md:flex items-center gap-3 w-1/4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href={`https://wa.me/${config.whatsappNumber || '919160342240'}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </a>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex justify-center items-center flex-1 md:w-2/4">
            <Logo />
          </div>

          {/* Right: Dual Phone Numbers with Orange Icons */}
          <div className="hidden md:flex flex-col items-end justify-center w-1/4">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#ea580c] fill-[#ea580c]" />
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                className="text-base lg:text-[18px] font-black text-slate-900 font-heading tracking-tight hover:text-[#ea580c] transition-colors"
              >
                {primaryPhone}
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#ea580c] fill-[#ea580c]" />
              <a
                href={`tel:${secondaryPhone.replace(/\s+/g, '')}`}
                className="text-base lg:text-[18px] font-black text-slate-900 font-heading tracking-tight hover:text-[#ea580c] transition-colors"
              >
                {secondaryPhone}
              </a>
            </div>

            <p className="text-[10px] italic font-medium text-slate-500">
              Solar Installed. Trust Delivered.
            </p>
          </div>

          {/* Mobile Phone & Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
              className="p-2 rounded-xl bg-orange-50 text-[#f97316] border border-orange-200"
              aria-label="Call"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-slate-200 text-slate-800"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </div>

      {/* TIER 2: PRIMARY NAVIGATION BAR */}
      <div className="bg-[#1e2533] text-white shadow-md overflow-hidden">
        <Container className="flex items-center justify-between">
          <nav className="hidden md:flex items-center justify-start flex-1 py-0">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 lg:px-4 py-3 text-xs lg:text-[13px] font-black tracking-wider uppercase transition-colors whitespace-nowrap',
                    isActive
                      ? 'text-white bg-[#141a24] shadow-inner border-b-2 border-[#f97316]'
                      : 'text-slate-200 hover:text-white hover:bg-[#283144]'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* GET FREE QUOTE BUTTON ONLY */}
          <div className="hidden md:flex items-center gap-2 pl-2 py-1.5">
            <button
              onClick={openQuoteModal}
              className="px-4 lg:px-5 py-2 rounded-xl bg-gradient-to-r from-[#f97316] to-amber-500 hover:from-[#ea580c] hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" /> GET FREE QUOTE
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#1e2533] text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <Logo textClassName="text-white" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors',
                        isActive
                          ? 'bg-[#f97316] text-white font-black'
                          : 'text-slate-200 hover:bg-[#141a24]'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-700 space-y-3.5">
              <div className="text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#f97316]" /> {primaryPhone}
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#f97316]" /> {secondaryPhone}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="block w-full py-3.5 text-center text-xs font-black bg-gradient-to-r from-[#f97316] to-amber-500 text-white rounded-xl shadow-lg cursor-pointer"
              >
                ⚡ GET FREE SOLAR QUOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
