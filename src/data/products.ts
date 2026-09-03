import { ProductItem } from '@/types';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-panels',
    name: 'Solar Panels',
    category: 'panels',
    tagline: 'High-Efficiency Tier-1 Monocrystalline Modules',
    description:
      'Advanced N-Type TOPCon and Mono PERC bifacial modules offering greater than 22.5% efficiency and superior low-light power yield.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
    keyFeatures: [
      'Bifacial power boost (up to 25% rear generation)',
      'Ultra-low temperature coefficient for Indian climate',
      'ALMM and BIS certified Tier-1 quality',
      'PID and salt mist resistant glass',
    ],
    warranty: '25-Year Linear Output Guarantee',
  },
  {
    id: 'prod-inverters',
    name: 'Solar Inverters',
    category: 'inverters',
    tagline: 'High-Efficiency String & Hybrid Inverters',
    description:
      'Smart grid-tied and hybrid inverters with dual MPPT trackers, up to 98.8% conversion efficiency, and built-in surge protection.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=95',
    keyFeatures: [
      'Dual & Multi-MPPT for split-roof installations',
      'Integrated DC disconnect and Type-II SPDs',
      'IP65 / IP66 weatherproof enclosure rating',
      'Wi-Fi / 4G cloud IoT communication module',
    ],
    warranty: '5 to 10-Year Manufacturer Warranty',
  },
  {
    id: 'prod-batteries',
    name: 'Solar Batteries',
    category: 'batteries',
    tagline: 'Lithium-ion Energy Storage Systems (BESS)',
    description:
      'Safe, compact LiFePO4 (Lithium Iron Phosphate) battery banks for uninterrupted backup and evening peak load management.',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
    keyFeatures: [
      '6,000+ deep discharge cycles at 80% DoD',
      'Integrated Battery Management System (BMS)',
      'Modular rack design scalable up to 100+ kWh',
      'Zero maintenance & completely noiseless operation',
    ],
    warranty: '10-Year Battery Warranty',
  },
  {
    id: 'prod-structures',
    name: 'Mounting Structures',
    category: 'structures',
    tagline: 'Engineered High-Grade Mounting Hardware',
    description:
      'Pre-galvanized and anodized aluminum mounting frames engineered to withstand cyclone-grade 160 km/h wind loads without roof leaks.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
    keyFeatures: [
      'Hot-dip galvanized / HDG 80+ micron zinc coating',
      'Elevated high-rise structures for usable terrace space',
      'Custom ballast mounts for RCC roofs (zero penetration)',
      '160 km/h certified wind tunnel resistance',
    ],
    warranty: '15-Year Structural Integrity Warranty',
  },
  {
    id: 'prod-monitoring',
    name: 'IoT Remote Monitoring',
    category: 'monitoring',
    tagline: '24/7 Smart Telemetry & Generation Tracking',
    description:
      'Cloud-connected smart data loggers with live mobile app alerts, generation curve graphs, and automated fault diagnosis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=95',
    keyFeatures: [
      'Real-time kW output and cumulative generation tracking',
      'Proactive SMS and email alerts for underperformance',
      'Export vs Import net metering analytics',
      'Multi-inverter string-level diagnostic metrics',
    ],
    warranty: '5-Year Hardware & Cloud Warranty',
  },
];
