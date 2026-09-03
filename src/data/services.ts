import { ServiceItem } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'res-1',
    slug: 'residential-rooftop',
    title: 'Residential Rooftop Solar',
    shortDescription: 'Cut home electricity bills by up to 90% with government subsidy under PM Surya Ghar Yojana.',
    fullDescription:
      'Turn your home rooftop into an independent clean power plant. We handle everything from site feasibility, structural engineering, government net metering approvals, direct subsidy processing, and 25-year performance monitoring.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    features: [
      'Direct MNRE / PM Surya Ghar Subsidy Support',
      'High-Efficiency Bifacial Tier-1 Monocrystalline Panels',
      'Net Metering liaisoning with state Discoms',
      '25-Year Performance Output Guarantee',
    ],
    capacityRange: '1 kW – 15 kW',
    suitableFor: 'Villas, Independent Houses, Duplexes, Housing Societies',
    warranty: '25 Years Linear Performance Warranty',
  },
  {
    id: 'comm-2',
    slug: 'commercial-industrial',
    title: 'Commercial & Industrial Solar',
    shortDescription: 'Slash operational energy expenses, hedge against tariff hikes, and claim 40% Accelerated Depreciation tax benefits.',
    fullDescription:
      'High-capacity on-grid solar solutions engineered for factories, hospitals, educational institutions, IT parks, and warehouses. Maximize your return on capital with ROI achieved in 3 to 4 years.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    features: [
      '40% Accelerated Depreciation in Year 1',
      'Payback in 3.5 years with 25+ years of free power',
      'High Voltage HT/LT Grid Synchronization',
      'Remote IoT SCADA System Monitoring & Analytics',
    ],
    capacityRange: '20 kW – 2 MW+',
    suitableFor: 'Manufacturing Units, Malls, Hospitals, Cold Storages, Universities',
    warranty: '25 Years Performance + 5 Years Comprehensive O&M',
  },
  {
    id: 'hyb-3',
    slug: 'hybrid-storage',
    title: 'Hybrid & Off-Grid Storage Systems',
    shortDescription: 'Uninterrupted power supply with advanced Lithium-ion Battery Energy Storage Systems (BESS).',
    fullDescription:
      'Perfect for areas experiencing frequent grid outages or remote locations with zero grid connectivity. Intelligent hybrid inverters seamlessly manage solar generation, battery charging, and diesel generator integration.',
    icon: 'BatteryCharging',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Advanced LiFePO4 Lithium Battery with 6000+ Cycles',
      'Zero-switchover UPS grade backup (<10ms)',
      'Smart Peak Shaving and Time-of-Day Tariff optimization',
      'Zero Diesel generator noise & operational fuel costs',
    ],
    capacityRange: '3 kW – 100 kW',
    suitableFor: 'Remote Resorts, Farmhouses, Clinics, Fuel Stations, Critical Data Centers',
    warranty: '10 Years Battery Warranty + 25 Years Panel Warranty',
  },
  {
    id: 'agri-4',
    slug: 'agricultural-pumps',
    title: 'Solar Water Pump Solutions',
    shortDescription: 'Reliable irrigation for farmers without relying on grid power or expensive diesel generators.',
    fullDescription:
      'Solar-powered submersible and surface water pumping systems under the PM KUSUM Scheme. Empowering farmers with abundant daylight irrigation and water security.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=800&q=80',
    features: [
      'Up to 90% Subsidy under PM KUSUM scheme',
      'Submersible & Surface AC/DC Pump variants (3HP to 10HP)',
      'Automatic dry-run protection and MPPT controllers',
      'Zero ongoing operating expenses',
    ],
    capacityRange: '3 HP – 20 HP',
    suitableFor: 'Agricultural Farms, Horticulture, Dairy, Drip Irrigation',
    warranty: '5 Years Comprehensive Replacement Warranty',
  },
  {
    id: 'amc-5',
    slug: 'solar-amc',
    title: 'Solar AMC & Plant Health Check',
    shortDescription: 'Maximize system generation efficiency with robotic panel cleaning, thermography, and preventive maintenance.',
    fullDescription:
      'Dust, soiling, and micro-cracks can degrade solar plant output by up to 25%. Our preventive and corrective AMC programs ensure your plant operates at peak efficiency year-round.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    features: [
      'De-mineralized water and robotic brush panel washing',
      'Infrared Drone Thermal imaging for hotspot detection',
      'Inverter firmware tuning & electrical safety audits',
      'Guaranteed <24-hour turnaround on breakdown tickets',
    ],
    capacityRange: 'Any System Size (5 kW to Utility scale)',
    suitableFor: 'Existing Solar Plant Owners, RWA Societies, Factories',
    warranty: 'SLA backed generation availability guarantee',
  },
];
