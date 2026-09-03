import { FaqItem } from '@/types';

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-cost',
    category: 'Solar Cost',
    question: 'How is rooftop solar sizing and feasibility determined in India?',
    answer:
      'The system sizing and engineering depend on your sanctioned load and roof area. Residential and commercial systems are tailored based on your 12-month power bills. With PM Surya Ghar government subsidies and net metering, systems typically achieve full financial payback within 3 to 4 years.',
  },
  {
    id: 'faq-capacity',
    category: 'Solar Capacity',
    question: 'How do I determine the right solar capacity for my property?',
    answer:
      'As a rule of thumb, every 1 kW of solar requires approximately 80 to 100 sq. ft. of shadow-free rooftop space and generates about 4 to 4.5 units (kWh) of electricity per day (120–135 units/month). If your monthly consumption is around 400 units, a 3 kW system is ideal.',
  },
  {
    id: 'faq-installation',
    category: 'Installation',
    question: 'How long does the physical rooftop installation take?',
    answer:
      'Residential rooftop installations (3 kW to 10 kW) are typically completed in 2 to 4 working days with minimal disruption to your household. Larger commercial and industrial plants take between 2 to 4 weeks depending on structural layout and HT grid synchronization requirements.',
  },
  {
    id: 'faq-maintenance',
    category: 'Maintenance',
    question: 'What maintenance is required for solar panels?',
    answer:
      'Solar panels have no moving parts and require minimal maintenance. Rinsing panels with clean water every 2 to 4 weeks to remove atmospheric dust ensures optimum output. Liana Solar provides periodic health inspections and electrical checkups as part of our after-sales service.',
  },
  {
    id: 'faq-net-metering',
    category: 'Net Metering',
    question: 'How does Net Metering work with the electricity grid?',
    answer:
      'A bi-directional net meter records both the energy imported from the DISCOM grid and surplus solar energy exported back. At month-end, your electricity bill is calculated only on the net consumed units. If you export more than you consume, credits carry forward to subsequent billing cycles.',
  },
  {
    id: 'faq-subsidy',
    category: 'Subsidy',
    question: 'What government subsidies are currently available?',
    answer:
      'Under the PM Surya Ghar: Muft Bijli Yojana, residential consumers can claim direct bank transfer (DBT) central government subsidies for 1 kW, 2 kW, and 3 kW+ systems. Liana Solar assists you end-to-end with National Portal registration, DISCOM net-meter inspection, and subsidy credit processing.',
  },
  {
    id: 'faq-lifespan',
    category: 'Solar Lifespan',
    question: 'What is the operational lifespan and warranty of solar panels?',
    answer:
      'Quality Tier-1 solar panels have a design operational lifespan of 25 to 30 years. They come with a 25-Year Linear Output Performance Warranty guaranteeing at least 84.8% generation capacity retention at Year 25.',
  },
  {
    id: 'faq-ongrid-hybrid',
    category: 'On-Grid vs Hybrid',
    question: 'What is the difference between On-Grid and Hybrid solar systems?',
    answer:
      'On-Grid systems connect directly to the power grid without batteries, maximizing financial ROI and net-metering savings. Hybrid systems combine grid connection with Lithium battery storage, ensuring zero-switchover power backup during grid power cuts.',
  },
];
