'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Residential Rooftop Solar',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 text-center bg-emerald-50 border-2 border-emerald-300 rounded-3xl space-y-3 shadow-sm">
        <div className="w-14 h-14 bg-[#15803d] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-black text-slate-900">Inquiry Received Successfully!</h4>
        <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
          A Lianasolar technical engineer will review your project details and call you within 2 business hours.
        </p>
        <div className="pt-3">
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#f97316] transition-colors cursor-pointer"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Full Name <span className="text-[#f97316]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-xs"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Mobile Number <span className="text-[#f97316]">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 9812345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all font-mono shadow-xs"
          />
        </div>
      </div>

      {/* Email and System Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Email Address
          </label>
          <input
            type="email"
            placeholder="ramesh@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-xs"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            System / Requirement
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-900 focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all cursor-pointer shadow-xs"
          >
            <option value="Residential Rooftop Solar">Residential Rooftop Solar</option>
            <option value="Commercial Rooftop Solar">Commercial Rooftop Solar</option>
            <option value="Industrial Solar Plant">Industrial Solar Plant</option>
            <option value="Agricultural Solar Pumps">Agricultural Solar Pumps</option>
            <option value="Hybrid Solar with Battery">Hybrid Solar with Battery</option>
          </select>
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5 text-left">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
          Message & Rooftop Details
        </label>
        <textarea
          rows={3}
          placeholder="Describe your monthly power bill units, terrace area (sq ft), or location..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-4 rounded-xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all resize-none shadow-xs"
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-600 font-black">
          Failed to send inquiry. Please call us directly at +91 9160342240.
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full h-12 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending Details...' : 'Submit Solar Inquiry'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
