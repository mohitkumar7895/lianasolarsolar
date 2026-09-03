'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/forms/ContactForm';
import { useSiteContent } from '@/context/SiteContentContext';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function ContactPage() {
  const { config } = useSiteContent();

  const primaryPhone = config.phone || '+91 8533888883';
  const secondaryPhone = '+91 8533888883';
  const whatsappNumber = config.whatsappNumber || '918533888883';

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 space-y-16">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <span className="w-5 h-0.5 bg-[#f97316]" />
            <span>DIRECT ENGINEERING DESK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Get in Touch with <span className="text-[#15803d]">Our Solar Engineers</span>
          </h1>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left: Contact Info Card */}
          <div className="lg:col-span-5 bg-[#1e2433] text-white p-7 sm:p-9 rounded-[32px] space-y-7 shadow-2xl border border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#f97316]">
                Headquarters & Support Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {config.name || 'Lianasolar'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Reach out directly to our project delivery and government subsidy liaisoning desk.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm">
              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-[#f97316] text-white flex-shrink-0 shadow-md">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Direct Helplines</h3>
                  <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="text-base font-black text-white hover:text-[#f97316] block transition-colors">
                    {primaryPhone}
                  </a>
                  <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`} className="text-base font-black text-white hover:text-[#f97316] block transition-colors">
                    {secondaryPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-[#22c55e] text-white flex-shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">WhatsApp Support</h3>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-400 hover:text-emerald-300 block transition-colors"
                  >
                    Click to Chat Instantly on WhatsApp →
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-white/10 text-white flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#f97316]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Office Address</h3>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {config.address || 'Corporate Tower, Sector 62, Noida, NCR 201309'}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-white/10 text-white flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Working Hours</h3>
                  <p className="text-slate-300 text-xs">Mon – Sat: 9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>UPNEDA Registered Vendor</span>
            </div>
          </div>

          {/* Right: Clean Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[32px] border border-slate-200/90 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Send Us An Inquiry
              </h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </Container>

      <FinalCTA />
    </div>
  );
}
