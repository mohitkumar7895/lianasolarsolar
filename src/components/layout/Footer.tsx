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

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90 pt-8 sm:pt-10 pb-6 sm:pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-200">
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-3">
            <Logo />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              {config.heroSubhead || 'Turnkey EPC solar solutions with Tier-1 technology and guaranteed net metering across India.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 pt-1">
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" /> UPNEDA Registered
              </span>
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-[#f97316]" /> Tier-1 Certified EPC
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Lianasolar
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-blue-600 transition-colors">
                  Solar Solutions
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-600 transition-colors">
                  Products & Tech
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-600 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#f97316] transition-colors font-bold text-[#f97316]">
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Solar Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/solutions#residential" className="hover:text-blue-600 transition-colors">
                  Residential Rooftop Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions#commercial" className="hover:text-blue-600 transition-colors">
                  Commercial Rooftop Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions#industrial" className="hover:text-blue-600 transition-colors">
                  Industrial Solar Plants
                </Link>
              </li>
              <li>
                <Link href="/solutions#agricultural" className="hover:text-blue-600 transition-colors">
                  Agricultural Solar & Pumps
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <a href={`tel:${config.phone}`} className="flex items-center gap-2 hover:text-[#f97316] transition-colors font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0" />
                <span>{config.phone || '+91 9160342240'}</span>
              </a>
              <a href={`mailto:${config.email}`} className="flex items-center gap-2 hover:text-[#f97316] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0" />
                <span>{config.email || 'contact@lianasolar.com'}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{config.address || 'Corporate Tower, Sector 62, Noida, NCR'}</span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:text-[#ea580c]"
              >
                Request Free Solar Quote <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Social */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {config.name || 'Lianasolar'}. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/admin" className="text-slate-500 hover:text-[#f97316] font-semibold transition-colors">
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
