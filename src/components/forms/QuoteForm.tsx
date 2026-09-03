'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, User, Phone, MapPin, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { INDIAN_LOCATIONS } from '@/lib/constants';
import { useSiteContent } from '@/context/SiteContentContext';

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Residential', icon: '🏠', desc: 'Villas & Homes' },
  { id: 'commercial', label: 'Commercial', icon: '🏢', desc: 'Offices & Shops' },
  { id: 'industrial', label: 'Industrial', icon: '🏭', desc: 'Factories & Sheds' },
  { id: 'agricultural', label: 'Agricultural', icon: '🌾', desc: 'Farms & Pumps' },
];

export function QuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const { addLead } = useSiteContent();
  const [propertyType, setPropertyType] = useState('residential');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [capacity, setCapacity] = useState('3 kW (1-2 BHK Homes)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      addLead({
        name: name.trim(),
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        city,
        type: propertyType.charAt(0).toUpperCase() + propertyType.slice(1),
        capacity: capacity || '3 kW (1-2 BHK Homes)',
        status: 'New Lead',
      });

      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
          city,
          propertyType,
          capacity,
        }),
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center bg-gradient-to-b from-emerald-50 to-teal-50/50 border-2 border-emerald-300 rounded-3xl space-y-4 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Inquiry Confirmed
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Thank You, {name}!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your rooftop solar request for <strong className="text-slate-900">{city}</strong> ({capacity}) has been received. Our senior solar engineer will call you at <strong className="text-[#f97316] font-mono">{phone}</strong> within 15 minutes.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              setName('');
              setPhone('');
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#f97316] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Submit Another Solar Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* 1. Property Type Selection */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-800">
          <span>Property Type</span>
          <span className="text-[11px] font-normal text-slate-500 lowercase">select one</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROPERTY_TYPES.map((type) => {
            const isSelected = propertyType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setPropertyType(type.id)}
                className={`relative p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-1 group ${
                  isSelected
                    ? 'bg-gradient-to-b from-orange-500 to-[#ea580c] border-orange-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">
                  {type.icon}
                </span>
                <span className="text-xs font-black tracking-tight">{type.label}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-orange-100 font-medium' : 'text-slate-400'
                  }`}
                >
                  {type.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Name and Mobile Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Your Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <div className="flex items-center gap-1 text-slate-600 font-bold text-xs pr-1 border-r border-slate-300">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91</span>
              </div>
            </div>
            <input
              type="tel"
              required
              maxLength={12}
              placeholder="e.g. 9812345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 pl-20 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all font-mono tracking-wide"
            />
          </div>
        </div>
      </div>

      {/* 3. Location & System Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Location / State */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Location / State
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all cursor-pointer appearance-none"
            >
              {INDIAN_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Solar Capacity / Requirement */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
            Solar Capacity / Requirement
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-500">
              <Zap className="w-4 h-4 fill-amber-500" />
            </div>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10 focus:outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="3 kW (1-2 BHK Homes)">3 kW (1-2 BHK Homes)</option>
              <option value="5 kW (3-4 BHK Villas)">5 kW (3-4 BHK Villas)</option>
              <option value="10 kW (Large Kothis)">10 kW (Large Kothis)</option>
              <option value="15 kW+ (Commercial)">15 kW+ (Commercial)</option>
              <option value="50 kW - 1 MW (Industrial)">50 kW - 1 MW (Industrial)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* 4. High-Conversion Submit Button */}
      <div className="pt-2 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#f97316] via-amber-500 to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:scale-[1.01] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting Inquiry...
            </span>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-white text-white" />
              <span>⚡ Submit Solar Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Security & Subsidy Assurance Footer */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Rooftop Assessment • ₹78,000 Direct Subsidy Assistance • 100% Privacy</span>
        </div>
      </div>
    </form>
  );
}
