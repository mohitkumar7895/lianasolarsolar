import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SERVICES_DATA } from '@/data/services';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'Solar Solutions & Services',
  description: 'Comprehensive EPC solar solutions including residential rooftops, commercial plants, off-grid battery storage, and solar AMC.',
};

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container>
        <SectionHeader
          badge="Solar Services Catalog"
          title="Turnkey Clean Energy Solutions"
          description="Engineered to eliminate electricity bills, safeguard against tariff hikes, and deliver maximum return on investment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>

      <FinalCTA />
    </div>
  );
}
