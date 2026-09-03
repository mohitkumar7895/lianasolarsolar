'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export function LeadForm() {
  const { addLead } = useSiteContent();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10 || !name.trim()) return;

    setLoading(true);
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${cleanPhone}`;

    // 1. Instantly register in Admin context
    addLead({
      name: name.trim(),
      phone: formattedPhone,
      city: 'Delhi NCR / Online Booking',
      type: 'Call Query',
      subject: 'Free Rooftop Survey Callback',
      message: 'Customer requested a direct engineer callback for free rooftop survey.',
      source: 'Call Query',
      capacity: 'Rooftop Survey',
      bill: 'General Survey',
      status: 'New Call Query',
    });

    try {
      // 2. Persist to MySQL database
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: formattedPhone,
          subject: 'Free Rooftop Survey Callback',
          message: 'Requested direct engineer callback for free rooftop survey.',
          city: 'Delhi NCR / Online Booking',
          source: 'Call Query',
          capacity: 'Rooftop Survey',
        }),
      });
    } catch {
      // Handled via local context
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 animate-in zoom-in-95 duration-200">
        <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div className="text-xs">
          <p className="font-bold">Callback Scheduled for {name}!</p>
          <p>Our senior solar engineer will call you on <span className="font-mono font-bold">{phone}</span> shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
      <Input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white/90 dark:bg-slate-900/90 h-12"
      />
      <Input
        type="tel"
        placeholder="Enter 10-Digit Mobile"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="bg-white/90 dark:bg-slate-900/90 h-12 font-mono"
      />
      <Button
        type="submit"
        variant="solar"
        size="lg"
        disabled={loading}
        className="h-12 whitespace-nowrap font-black shadow-md cursor-pointer gap-2"
      >
        <PhoneCall className="w-4 h-4" />
        {loading ? 'Scheduling...' : 'Book Free Survey'} <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
