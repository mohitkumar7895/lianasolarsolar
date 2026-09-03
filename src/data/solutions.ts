import { SolutionItem } from '@/types';

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'residential',
    slug: 'residential-solar',
    title: 'Residential Solar',
    subtitle: 'Cut home electricity bills by up to 90%',
    description:
      'Turn your roof into an independent clean energy generator. Custom-designed for villas, independent floors, and bungalows with seamless net-metering and direct PM Surya Ghar subsidy support.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
    capacityRange: '2 kW to 15 kW',
    idealFor: 'Villas, Independent Houses, Duplexes',
    features: [
      'Direct Govt. Subsidy Support under PM Surya Ghar',
      'Tier-1 Monocrystalline Bifacial Solar Modules',
      'Net Metering approval liaisoning with state Discom',
      '25-Year Linear Power Output Guarantee',
    ],
    specs: [
      { label: 'Typical Sizing', value: '3 kW – 10 kW' },
      { label: 'Space Needed', value: '80 sq.ft per kW' },
      { label: 'Avg. Payback', value: '3.2 – 3.8 Years' },
      { label: 'Warranty', value: '25 Years Performance' },
    ],
  },
  {
    id: 'commercial',
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    subtitle: 'Hedge operating costs & claim 40% depreciation',
    description:
      'High-yield rooftop solar solutions for offices, schools, hospitals, commercial complexes, and retail centers to dramatically lower tariff costs and enhance corporate sustainability.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
    capacityRange: '20 kW to 250 kW',
    idealFor: 'Schools, Hospitals, IT Parks, Malls, Hotels',
    features: [
      '40% Accelerated Depreciation tax benefit in Year 1',
      'Diesel Generator (DG) synchronization controller',
      'Zero downtime installation with rapid commissioning',
      'Real-time IoT cloud generation analytics',
    ],
    specs: [
      { label: 'Typical Sizing', value: '25 kW – 200 kW' },
      { label: 'Space Needed', value: '75 sq.ft per kW' },
      { label: 'Avg. Payback', value: '3.0 – 3.5 Years' },
      { label: 'Warranty', value: '25 Years Output' },
    ],
  },
  {
    id: 'industrial',
    slug: 'industrial-solar',
    title: 'Industrial Solar',
    subtitle: 'Megawatt-scale clean energy for factories & warehouses',
    description:
      'Heavy-duty solar installations on metal sheds, RCC roofs, and open ground space. Engineered for heavy industrial manufacturing units with high continuous power loads.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95',
    capacityRange: '100 kW to 2 MW+',
    idealFor: 'Manufacturing Plants, Warehouses, Cold Storages, Textile Mills',
    features: [
      'Engineered non-penetrating clamps for industrial metal sheets',
      'High-voltage HT/LT grid interconnection design',
      'Stringent industrial safety and earthing compliance',
      'SCADA integration for centralized plant monitoring',
    ],
    specs: [
      { label: 'Typical Sizing', value: '100 kW – 1.5 MW' },
      { label: 'Space Needed', value: '70 sq.ft per kW' },
      { label: 'Avg. Payback', value: '2.8 – 3.2 Years' },
      { label: 'Warranty', value: '25 Years Output' },
    ],
  },
  {
    id: 'agricultural',
    slug: 'agricultural-solar',
    title: 'Agricultural Solar',
    subtitle: 'Daylight irrigation with zero fuel expenses',
    description:
      'Reliable solar water pumping and off-grid microgrid systems for agricultural land, farms, and agro-industries under the PM KUSUM initiative.',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
    capacityRange: '3 HP to 25 HP Pumps / 10 kW+ Microgrids',
    idealFor: 'Farms, Drip Irrigation, Horticulture, Dairy',
    features: [
      'High-efficiency solar submersible & surface pumps',
      'Automatic MPPT frequency drive controllers',
      'Zero diesel generator fuel & maintenance expenses',
      'Substantial government subsidy support under PM KUSUM',
    ],
    specs: [
      { label: 'Typical Sizing', value: '3 HP – 15 HP' },
      { label: 'Space Needed', value: 'Modular Ground Mount' },
      { label: 'Avg. Payback', value: '2.0 – 3.0 Years' },
      { label: 'Warranty', value: '5-10 Years Pump & System' },
    ],
  },
];
