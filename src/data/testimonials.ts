import { TestimonialItem } from '@/types';

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'R. K. Malhotra',
    role: 'Villa Owner',
    location: 'Gurugram, NCR',
    capacity: '6 kW Rooftop Solar',
    quote:
      'Our monthly power bills during peak summer dropped by over 90% to negligible fixed meter charges. The installation team completed structural mounting cleanly without any terrace drilling leaks.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'test-2',
    name: 'Suresh Singhania',
    role: 'Managing Director, Horizon Packaging',
    location: 'Greater Noida Industrial Zone',
    capacity: '200 kW Industrial Rooftop',
    quote:
      'Liana Solar delivered our turnkey factory solar project with flawless DISCOM net metering liaisoning. The 40% accelerated depreciation delivered substantial corporate tax savings in the very first fiscal year.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'test-3',
    name: 'Dr. Neha Saxena',
    role: 'Administrator, LifeCare Clinic',
    location: 'Jaipur, Rajasthan',
    capacity: '25 kW Commercial Hybrid',
    quote:
      'The hybrid battery backup system ensures continuous clinic operations without relying on diesel generators. Real-time generation visibility on the mobile app is intuitive and accurate.',
    rating: 5,
    isSample: true,
  },
];
