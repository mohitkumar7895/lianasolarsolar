import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SERVICES_DATA } from '@/data/services';
import { Container } from '@/components/layout/Container';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ensureArray } from '@/lib/safe-utils';

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const featureList = ensureArray(service.features);

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#070d1e] min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <Badge variant="blue">{service.capacityRange}</Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {service.title}
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Key Features & Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureList.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 uppercase font-semibold">Suitable For</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{service.suitableFor}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 uppercase font-semibold">Warranty Standard</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{service.warranty}</p>
              </div>
            </div>
          </div>

          {/* Quote / Inquiry Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 sticky top-28">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Fast Consultation</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Get Instant Feasibility & Quote</h3>
              <p className="text-xs text-slate-500">Calculate system size & lock in government subsidy eligibility.</p>
            </div>

            <QuoteForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
