export type PropertyType = 'residential' | 'commercial' | 'industrial' | 'agricultural';

export interface SolarCalculationInput {
  monthlyBill: number;
  monthlyUnits?: number;
  sanctionedLoad?: number;
  rooftopArea?: number;
  roofAreaSqFt?: number;
  roofType?: string;
  propertyType?: PropertyType;
  connectionType?: PropertyType | 'residential' | 'commercial' | 'industrial' | 'agricultural';
  location?: string;
  state?: string;
}

export interface SolarCalculationResult {
  recommendedCapacityKw: number;
  rooftopAreaRequiredSqFt: number;
  dailyGenerationKwh: number;
  monthlyGenerationKwh: number;
  monthlyUnitsEstimate: number;
  annualGenerationKwh: number;
  estimatedSystemCost: number;
  estimatedSubsidy: number;
  netInvestmentCost: number;
  monthlySavings: number;
  annualSavings: number;
  estimatedAnnualSavings: number;
  lifetimeSavings25Yrs: number;
  paybackPeriodYears: number;
  estimatedPaybackYears: number;
  co2ReductionTonnesPerYear: number;
  co2OffsetTonnesPerYear: number;
  treesPlantedEquivalent: number;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  capacityRange: string;
  idealFor: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  capacityRange: string;
  suitableFor: string;
  warranty: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'panels' | 'inverters' | 'batteries' | 'structures' | 'monitoring';
  tagline: string;
  description: string;
  image: string;
  keyFeatures: string[];
  warranty: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  capacity: string;
  capacityKw: number;
  location: string;
  image: string;
  annualSavings: string | number;
  co2SavedTonnes?: number;
  description: string;
  highlights?: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  capacity?: string;
  systemSize?: string;
  annualSavings?: string;
  avatar?: string;
  quote: string;
  rating: number;
  isSample?: boolean;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  city: string;
  propertyType?: PropertyType;
  connectionType?: PropertyType;
  monthlyBill?: number;
  message?: string;
  source?: string;
}
