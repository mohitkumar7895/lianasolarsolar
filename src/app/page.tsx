import { Hero } from '@/components/sections/Hero';
import { BrandEcosystem } from '@/components/sections/BrandEcosystem';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { SolarSolutions } from '@/components/sections/SolarSolutions';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { GovtVendorSection } from '@/components/sections/GovtVendorSection';
import { TrustAndSupport } from '@/components/sections/TrustAndSupport';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandEcosystem />
      <PromoBanner />
      <SolarSolutions />
      <HowWeWork />
      <GovtVendorSection />
      <TrustAndSupport />
    </>
  );
}
