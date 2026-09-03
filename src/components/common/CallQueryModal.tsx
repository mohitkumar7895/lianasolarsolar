'use client';

import React, { useState, useEffect } from 'react';
import { X, PhoneCall, CheckCircle2, Clock, Sparkles, User, MapPin } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { useSiteContent } from '@/context/SiteContentContext';

export function CallQueryModal() {
  const { isCallQueryOpen, closeCallQueryModal } = useModal();
  const { addLead } = useSiteContent();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Immediately (Within 15 Mins)');
  const [topic, setTopic] = useState('Residential Solar Rooftop (Home/Villa)');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Prevent background scrolling
  useEffect(() => {
    if (isCallQueryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCallQueryOpen]);

  if (!isCallQueryOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!name.trim() || cleanPhone.length < 10) return;

    setStatus('loading');
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${cleanPhone}`;
    const subject = `Call Query: ${topic} (${preferredTime})`;
    const fullMessage = `Customer requested callback [${preferredTime}] regarding ${topic}. ${note ? `Notes: ${note}` : ''}`;

    // 1. Instantly register in Admin Context
    addLead({
      name: name.trim(),
      phone: formattedPhone,
      city: city.trim() || 'Delhi NCR',
      type: 'Call Query',
      subject,
      message: fullMessage,
      source: 'Call Query',
      capacity: topic,
      bill: preferredTime,
      status: 'New Call Query',
    });

    try {
      // 2. Persist to MySQL
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: formattedPhone,
          subject,
          message: fullMessage,
          city: city.trim() || 'Delhi NCR',
          source: 'Call Query',
          capacity: topic,
        }),
      });
    } catch {
      // Fallback handled in context
    } finally {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeCallQueryModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={closeCallQueryModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Call Query Logged
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Callback Scheduled, {name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
                Our solar engineer will call you on <strong className="font-mono text-[#f97316]">{phone}</strong> during your preferred timing: <strong className="text-slate-900">{preferredTime}</strong>.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setStatus('idle');
                  setName('');
                  setPhone('');
                  setCity('');
                  setNote('');
                  closeCallQueryModal();
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#f97316] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div className="text-left space-y-1.5 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#f97316] border border-orange-200 text-xs font-black uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" /> Instant Callback Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Request an Expert Call
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Speak directly with an MNRE certified solar technical engineer. Zero sales spam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Your Name <span className="text-[#f97316]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#f97316] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Mobile Number <span className="text-[#f97316]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 font-mono focus:bg-white focus:border-[#f97316] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Requirement Topic */}
              <div className="space-y-1">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                  Solar Requirement
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#f97316] focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Residential Solar Rooftop (Home/Villa)">Residential Solar Rooftop (Home/Villa)</option>
                  <option value="Commercial Rooftop Solar (Offices/Schools)">Commercial Rooftop Solar (Offices/Schools)</option>
                  <option value="Industrial Solar Plant (Factory/Shed)">Industrial Solar Plant (Factory/Shed)</option>
                  <option value="PM Surya Ghar Govt Subsidy Guidance">PM Surya Ghar Govt Subsidy Guidance</option>
                  <option value="Agricultural Solar Pump (PM KUSUM)">Agricultural Solar Pump (PM KUSUM)</option>
                  <option value="Battery Storage & Hybrid Inverter">Battery Storage & Hybrid Inverter</option>
                </select>
              </div>

              {/* Preferred Timing & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Preferred Call Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#f97316] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Immediately (Within 15 Mins)">⚡ Immediately (Within 15 Mins)</option>
                    <option value="Morning (9 AM - 12 PM)">🌅 Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">☀️ Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">🌇 Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                    City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Noida / Gurugram / Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#f97316] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Short Note */}
              <div className="space-y-1">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                  Question / Specific Query (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monthly bill ₹4,000, terrace 500 sq ft"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#f97316] focus:outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f97316] to-amber-500 hover:from-[#ea580c] hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <PhoneCall className="w-4 h-4" />
                  {status === 'loading' ? 'Scheduling Callback...' : 'Request Callback Now'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
