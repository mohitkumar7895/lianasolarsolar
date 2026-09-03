'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function LeadForm() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
        <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
        <div className="text-xs">
          <p className="font-bold">Callback Scheduled!</p>
          <p>We will contact you shortly to plan your solar rooftop.</p>
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
        className="bg-white/90 dark:bg-slate-900/90 h-12"
      />
      <Button type="submit" variant="solar" size="lg" className="h-12 whitespace-nowrap">
        Book Survey <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </form>
  );
}
