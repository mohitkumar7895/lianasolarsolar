'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { Container } from './Container';
import { Logo } from '@/components/common/Logo';
import { useSiteContent } from '@/context/SiteContentContext';

export function Footer() {
  const pathname = usePathname();
  const { config } = useSiteContent();

  // Hide footer on Admin Portal pages as requested
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = config.phone || '+91 8533888883';
  const secondaryPhone = '+91 8533888883';

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90 pt-8 sm:pt-10 pb-6 sm:pb-8">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-200">
          {/* Brand & Description (Full width on mobile, 4-col on desktop) */}
          <div className="col-span-2 md:col-span-4 space-y-3">
            <Logo />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              {config.heroSubhead || 'Turnkey EPC solar solutions with Tier-1 technology and guaranteed net metering across India.'}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 pt-1">
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" /> UPNEDA Registered
              </span>
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs font-semibold text-[11px]">
                <Award className="w-3.5 h-3.5 text-[#f97316]" /> Tier-1 Certified EPC
              </span>
            </div>
          </div>

          {/* Quick Links (1 col on mobile, 2 col on desktop) */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-blue-600 transition-colors block py-0.5">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-600 transition-colors block py-0.5">
                  Hardware
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-600 transition-colors block py-0.5">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#f97316] transition-colors font-bold text-[#f97316] block py-0.5">
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions (1 col on mobile, 3 col on desktop) */}
          <div className="col-span-1 md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Solar Solutions</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/solutions#residential" className="hover:text-blue-600 transition-colors block py-0.5">
                  Residential Rooftop
                </Link>
              </li>
              <li>
                <Link href="/solutions#commercial" className="hover:text-blue-600 transition-colors block py-0.5">
                  Commercial Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions#industrial" className="hover:text-blue-600 transition-colors block py-0.5">
                  Industrial Plants
                </Link>
              </li>
              <li>
                <Link href="/solutions#agricultural" className="hover:text-blue-600 transition-colors block py-0.5">
                  Solar Pumps (KUSUM)
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-blue-600 transition-colors block py-0.5">
                  Trust Delivered
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f97316] transition-colors font-bold text-[#f97316] block py-0.5">
                  Direct Contact Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information (Full width on mobile, 3 col on desktop) */}
          <div className="col-span-2 md:col-span-3 space-y-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Helplines & Office</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="space-y-1">
                <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-[#f97316] transition-colors font-bold text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0" />
                  <span>{primaryPhone}</span>
                </a>
                <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-[#f97316] transition-colors font-bold text-slate-900 pl-5">
                  <span>{secondaryPhone}</span>
                </a>
              </div>
              <a href={`mailto:${config.email || 'contact@lianasolar.com'}`} className="flex items-center gap-2 hover:text-[#f97316] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0" />
                <span>{config.email || 'contact@lianasolar.com'}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{config.address || 'Corporate Tower, Sector 62, Noida, NCR 201309'}</span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/quote"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#f97316] hover:text-[#ea580c]"
              >
                Request Free Solar Quote <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {config.name || 'Lianasolar'}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs">
            <Link href="/admin" className="text-slate-600 hover:text-[#f97316] font-semibold transition-colors">
              Admin Portal
            </Link>
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
