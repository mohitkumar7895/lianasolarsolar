'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { PROJECTS_DATA } from '@/data/projects';
import { SOLUTIONS_DATA } from '@/data/solutions';
import { PRODUCTS_DATA } from '@/data/products';
import { ProjectItem, SolutionItem, ProductItem } from '@/types';
import { setStorageItem, getStorageItem, removeStorageItem } from '@/lib/storage';

export interface PromoBannerConfig {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl?: string;
  theme?: string;
}

export interface SiteConfigType {
  name: string;
  tagline: string;
  slogan?: string;
  heroHeadline: string;
  heroSubhead: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  heroVideoUrl: string;
  trustBadge: string;
  ecosystemHeading: string;
  promoBanner?: PromoBannerConfig;
}

export interface BrandPartner {
  id: string;
  name: string;
  tagline?: string;
  color?: string;
  imageUrl?: string;
}

export interface TrustImageItem {
  id: string;
  title: string;
  tag?: string;
  image: string;
  category?: string;
}

export interface LeadType {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  bill?: string;
  capacity?: string;
  type: string;
  date: string;
  status: string;
}

const DEFAULT_PARTNERS: BrandPartner[] = [
  { id: 'bp-1', name: 'SERVOTEC', tagline: 'smart power solutions', color: '#1d4ed8' },
  { id: 'bp-2', name: 'Deye', tagline: 'inverters & storage', color: '#0284c7' },
  { id: 'bp-3', name: 'solis', tagline: 'solar inverters', color: '#f59e0b' },
  { id: 'bp-4', name: 'INA SOLAR', tagline: 'together we shine', color: '#0ea5e9' },
  { id: 'bp-5', name: 'Livguard', tagline: 'energy unlimited', color: '#dc2626' },
  { id: 'bp-6', name: 'LUMINOUS', tagline: 'solar solutions', color: '#1e40af' },
  { id: 'bp-7', name: 'TATA POWER SOLAR', tagline: 'tier-1 modules', color: '#0369a1' },
  { id: 'bp-8', name: 'WAAREE', tagline: 'one with the sun', color: '#16a34a' },
  { id: 'bp-9', name: 'GROWATT', tagline: 'hybrid inverters', color: '#059669' },
];

const DEFAULT_TRUST_IMAGES: TrustImageItem[] = [
  {
    id: 't-1',
    title: 'Solar Installed',
    tag: 'Rooftop EPC',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
  },
  {
    id: 't-2',
    title: 'Trust Delivered',
    tag: 'Quality Inspection',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
  },
  {
    id: 't-3',
    title: 'Solar EPC Engineering',
    tag: 'Tier-1 Hardware',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=95',
  },
  {
    id: 't-4',
    title: 'Commissioned Rooftop',
    tag: 'Net Metering Approved',
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1920&q=95',
  },
  {
    id: 't-5',
    title: 'Tier-1 Module Array',
    tag: '25-Yr Performance',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95',
  },
  {
    id: 't-6',
    title: 'Precision Net Metering',
    tag: 'Govt. Subsidy Done',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
  },
];

const DEFAULT_LEADS: LeadType[] = [
  { id: 'LD-101', name: 'Ramesh Sharma', phone: '+91 91603 42240', email: 'ramesh@example.com', city: 'Noida', bill: '650 units/mo', capacity: '5 kW', type: 'Residential', date: 'Today, 10:30 AM', status: 'New Lead' },
  { id: 'LD-102', name: 'Pooja Agarwal', phone: '+91 95500 01418', email: 'pooja@agri.com', city: 'Greater Noida', bill: '1,800 units/mo', capacity: '15 kW', type: 'Commercial', date: 'Today, 09:15 AM', status: 'Site Survey Scheduled' },
  { id: 'LD-103', name: 'Sunil Verma', phone: '+91 99887 66554', email: 'sunil@gmail.com', city: 'Gurugram', bill: '380 units/mo', capacity: '3 kW', type: 'Residential', date: 'Yesterday', status: 'Subsidy Form Filled' },
  { id: 'LD-104', name: 'Apex Polymers', phone: '+91 97766 55443', email: 'info@apexpoly.in', city: 'Faridabad', bill: '14,000 units/mo', capacity: '100 kW', type: 'Industrial', date: 'Yesterday', status: 'Proposal Sent' },
];

const DEFAULT_CONFIG: SiteConfigType = {
  name: 'Lianasolar',
  tagline: 'Solar Engineering',
  slogan: 'Solar Installed. Trust Delivered.',
  heroHeadline: 'Power Your Home\nWith The Sun',
  heroSubhead: 'Rooftop solar from ₹0 down — claim up to ₹78,000 subsidy',
  phone: '+91 9160342240',
  whatsappNumber: '919160342240',
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  heroVideoUrl: '/vedio.mp4',
  trustBadge: 'Tier-1 Solar Technology • Certified EPC',
  ecosystemHeading: 'TECHNOLOGY AND EQUIPMENT ECOSYSTEM',
  promoBanner: {
    enabled: true,
    badge: '🦚 Shubh Janmashtami Mahotsav Special',
    title: '✨ Janmashtami Festive Solar Offer — Zero Power Bills! ✨',
    subtitle: 'Celebrate the festival of light! Claim ₹78,000 Direct Govt Subsidy + Extra 10% Festive Perks on Turnkey Solar Rooftops.',
    buttonText: 'Claim Janmashtami Offer 🦚',
    imageUrl: '/banners/clean-solar-sunset.jpg',
    theme: 'festive',
  },
};

export interface PillarItem {
  num: string;
  title: string;
  desc: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface AboutContentType {
  badge: string;
  heading: string;
  subheading: string;
  storyPara1: string;
  storyPara2: string;
  image: string;
  stats: StatItem[];
  pillars: PillarItem[];
}

export const DEFAULT_ABOUT_CONTENT: AboutContentType = {
  badge: 'ABOUT LIANASOLAR',
  heading: 'Pioneering Clean Solar Energy with Engineering Precision',
  subheading: 'Turnkey Solar EPC & Clean Infrastructure Provider',
  storyPara1: 'Lianasolar is a premier solar EPC engineering and clean energy provider. We specialize in turnkey residential rooftop systems, commercial installations, and industrial captive solar arrays.',
  storyPara2: 'With certified UPNEDA vendor status and more than three decades of engineering and infrastructure experience, we ensure seamless execution from initial site survey to DISCOM net-metering synchronization.',
  image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
  stats: [
    { label: 'Projects Completed', value: '500+' },
    { label: 'MW Commissioned', value: '50 MW+' },
    { label: 'System Uptime', value: '99.8%' },
    { label: 'Engineering Experience', value: '15+ Yrs' },
  ],
  pillars: [
    {
      num: '01',
      title: 'Precision Sizing & 3D Shadow Analysis',
      desc: 'We analyze your 12-month electricity consumption and rooftop shadow angles to engineer the highest generation output without unnecessary costs.',
    },
    {
      num: '02',
      title: 'Tier-1 Certified Hardware Exclusively',
      desc: 'Zero compromise on quality. We only deploy N-Type TOPCon bifacial modules, intelligent hybrid inverters, and cyclone-rated mounting structures.',
    },
    {
      num: '03',
      title: '100% Hassle-Free Net-Metering & Subsidy',
      desc: 'From DISCOM sanction approvals and bi-directional meter testing to PM Surya Ghar DBT subsidy claiming, our team handles all paperwork.',
    },
  ],
};

interface SiteContentContextType {
  config: SiteConfigType;
  updateConfig: (newConfig: Partial<SiteConfigType>) => void;
  aboutContent: AboutContentType;
  updateAboutContent: (updated: Partial<AboutContentType>) => void;
  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  solutions: SolutionItem[];
  addSolution: (sol: SolutionItem) => void;
  updateSolution: (id: string, updated: Partial<SolutionItem>) => void;
  deleteSolution: (id: string) => void;
  productsTech: ProductItem[];
  addProductTech: (prod: ProductItem) => void;
  updateProductTech: (id: string, updated: Partial<ProductItem>) => void;
  deleteProductTech: (id: string) => void;
  partners: BrandPartner[];
  addPartner: (partner: BrandPartner) => void;
  updatePartner: (id: string, updated: Partial<BrandPartner>) => void;
  deletePartner: (id: string) => void;
  trustImages: TrustImageItem[];
  addTrustImage: (item: TrustImageItem) => void;
  updateTrustImage: (id: string, updated: Partial<TrustImageItem>) => void;
  deleteTrustImage: (id: string) => void;
  leads: LeadType[];
  addLead: (lead: Omit<LeadType, 'id' | 'date'>) => void;
  updateLeadStatus: (id: string, status: string) => void;
  updateLead: (id: string, updated: Partial<LeadType>) => void;
  deleteLead: (id: string) => void;
  resetToDefaults: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY_CONFIG = 'liana_site_config_v11';
const STORAGE_KEY_ABOUT = 'liana_about_v11';
const STORAGE_KEY_PROJECTS = 'liana_projects_v11';
const STORAGE_KEY_SOLUTIONS = 'liana_solutions_v11';
const STORAGE_KEY_PRODUCTS = 'liana_products_v11';
const STORAGE_KEY_PARTNERS = 'liana_partners_v11';
const STORAGE_KEY_TRUST = 'liana_trust_v11';
const STORAGE_KEY_LEADS = 'liana_leads_v11';

// Helper to save section to MySQL asynchronously (Raw SQL backend)
async function saveToMySQL(section_key: string, content_data: any) {
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_key, content_data }),
    });
    if (!res.ok) {
      const err = await res.json();
      console.warn(`[MySQL Save Warning] (${section_key}):`, err.error);
    } else {
      console.log(`[MySQL Synced] Section "${section_key}" saved directly into MySQL database.`);
    }
  } catch (e: any) {
    console.warn(`[MySQL Save Error] (${section_key}):`, e.message);
  }
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfigType>(DEFAULT_CONFIG);
  const [aboutContent, setAboutContent] = useState<AboutContentType>(DEFAULT_ABOUT_CONTENT);
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [solutions, setSolutions] = useState<SolutionItem[]>(SOLUTIONS_DATA);
  const [productsTech, setProductsTech] = useState<ProductItem[]>(PRODUCTS_DATA);
  const [partners, setPartners] = useState<BrandPartner[]>(DEFAULT_PARTNERS);
  const [trustImages, setTrustImages] = useState<TrustImageItem[]>(DEFAULT_TRUST_IMAGES);
  const [leads, setLeads] = useState<LeadType[]>(DEFAULT_LEADS);

  // Fast Hydration: Cache first (0ms), then sync from MySQL
  useEffect(() => {
    async function loadData() {
      try {
        const [savedConfig, savedAbout, savedProjects, savedSolutions, savedProducts, savedPartners, savedTrust, savedLeads] =
          await Promise.all([
            getStorageItem(STORAGE_KEY_CONFIG, DEFAULT_CONFIG),
            getStorageItem(STORAGE_KEY_ABOUT, DEFAULT_ABOUT_CONTENT),
            getStorageItem(STORAGE_KEY_PROJECTS, PROJECTS_DATA),
            getStorageItem(STORAGE_KEY_SOLUTIONS, SOLUTIONS_DATA),
            getStorageItem(STORAGE_KEY_PRODUCTS, PRODUCTS_DATA),
            getStorageItem(STORAGE_KEY_PARTNERS, DEFAULT_PARTNERS),
            getStorageItem(STORAGE_KEY_TRUST, DEFAULT_TRUST_IMAGES),
            getStorageItem(STORAGE_KEY_LEADS, DEFAULT_LEADS),
          ]);

        setConfig(savedConfig);
        setAboutContent(savedAbout);
        setProjects(savedProjects);
        setSolutions(savedSolutions);
        setProductsTech(savedProducts);
        setPartners(savedPartners);
        setTrustImages(savedTrust);
        setLeads(savedLeads);

        // Fetch latest data from MySQL in background
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const d = json.data;
            if (d.config) { setConfig(d.config); setStorageItem(STORAGE_KEY_CONFIG, d.config); }
            if (d.about) { setAboutContent(d.about); setStorageItem(STORAGE_KEY_ABOUT, d.about); }
            if (d.projects) { setProjects(d.projects); setStorageItem(STORAGE_KEY_PROJECTS, d.projects); }
            if (d.solutions) { setSolutions(d.solutions); setStorageItem(STORAGE_KEY_SOLUTIONS, d.solutions); }
            if (d.products) { setProductsTech(d.products); setStorageItem(STORAGE_KEY_PRODUCTS, d.products); }
            if (d.partners) { setPartners(d.partners); setStorageItem(STORAGE_KEY_PARTNERS, d.partners); }
            if (d.trust) { setTrustImages(d.trust); setStorageItem(STORAGE_KEY_TRUST, d.trust); }
            if (d.leads) { setLeads(d.leads); setStorageItem(STORAGE_KEY_LEADS, d.leads); }
          }
        }
      } catch (e) {
        console.error('Failed to load CMS data:', e);
      }
    }

    loadData();
  }, []);

  const updateConfig = useCallback((newConfig: Partial<SiteConfigType>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      setStorageItem(STORAGE_KEY_CONFIG, updated);
      saveToMySQL('config', updated);
      return updated;
    });
  }, []);

  const updateAboutContent = useCallback((updatedFields: Partial<AboutContentType>) => {
    setAboutContent((prev) => {
      const updated = { ...prev, ...updatedFields };
      setStorageItem(STORAGE_KEY_ABOUT, updated);
      saveToMySQL('about', updated);
      return updated;
    });
  }, []);

  const addProject = useCallback((project: ProjectItem) => {
    setProjects((prev) => {
      const updated = [project, ...prev];
      setStorageItem(STORAGE_KEY_PROJECTS, updated);
      saveToMySQL('projects', updated);
      return updated;
    });
  }, []);

  const updateProject = useCallback((id: string, updatedFields: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setStorageItem(STORAGE_KEY_PROJECTS, updated);
      saveToMySQL('projects', updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setStorageItem(STORAGE_KEY_PROJECTS, updated);
      saveToMySQL('projects', updated);
      return updated;
    });
  }, []);

  const addSolution = useCallback((sol: SolutionItem) => {
    setSolutions((prev) => {
      const updated = [...prev, sol];
      setStorageItem(STORAGE_KEY_SOLUTIONS, updated);
      saveToMySQL('solutions', updated);
      return updated;
    });
  }, []);

  const updateSolution = useCallback((id: string, updatedFields: Partial<SolutionItem>) => {
    setSolutions((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
      setStorageItem(STORAGE_KEY_SOLUTIONS, updated);
      saveToMySQL('solutions', updated);
      return updated;
    });
  }, []);

  const deleteSolution = useCallback((id: string) => {
    setSolutions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      setStorageItem(STORAGE_KEY_SOLUTIONS, updated);
      saveToMySQL('solutions', updated);
      return updated;
    });
  }, []);

  const addProductTech = useCallback((prod: ProductItem) => {
    setProductsTech((prev) => {
      const updated = [...prev, prod];
      setStorageItem(STORAGE_KEY_PRODUCTS, updated);
      saveToMySQL('products', updated);
      return updated;
    });
  }, []);

  const updateProductTech = useCallback((id: string, updatedFields: Partial<ProductItem>) => {
    setProductsTech((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setStorageItem(STORAGE_KEY_PRODUCTS, updated);
      saveToMySQL('products', updated);
      return updated;
    });
  }, []);

  const deleteProductTech = useCallback((id: string) => {
    setProductsTech((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setStorageItem(STORAGE_KEY_PRODUCTS, updated);
      saveToMySQL('products', updated);
      return updated;
    });
  }, []);

  const addPartner = useCallback((partner: BrandPartner) => {
    setPartners((prev) => {
      const updated = [...prev, partner];
      setStorageItem(STORAGE_KEY_PARTNERS, updated);
      saveToMySQL('partners', updated);
      return updated;
    });
  }, []);

  const updatePartner = useCallback((id: string, updatedFields: Partial<BrandPartner>) => {
    setPartners((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setStorageItem(STORAGE_KEY_PARTNERS, updated);
      saveToMySQL('partners', updated);
      return updated;
    });
  }, []);

  const deletePartner = useCallback((id: string) => {
    setPartners((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setStorageItem(STORAGE_KEY_PARTNERS, updated);
      saveToMySQL('partners', updated);
      return updated;
    });
  }, []);

  const addTrustImage = useCallback((item: TrustImageItem) => {
    setTrustImages((prev) => {
      const updated = [item, ...prev];
      setStorageItem(STORAGE_KEY_TRUST, updated);
      saveToMySQL('trust', updated);
      return updated;
    });
  }, []);

  const updateTrustImage = useCallback((id: string, updatedFields: Partial<TrustImageItem>) => {
    setTrustImages((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
      setStorageItem(STORAGE_KEY_TRUST, updated);
      saveToMySQL('trust', updated);
      return updated;
    });
  }, []);

  const deleteTrustImage = useCallback((id: string) => {
    setTrustImages((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      setStorageItem(STORAGE_KEY_TRUST, updated);
      saveToMySQL('trust', updated);
      return updated;
    });
  }, []);

  const addLead = useCallback((leadData: Omit<LeadType, 'id' | 'date'>) => {
    const newLead: LeadType = {
      ...leadData,
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
    };
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      setStorageItem(STORAGE_KEY_LEADS, updated);
      saveToMySQL('leads', updated);
      return updated;
    });
  }, []);

  const updateLeadStatus = useCallback((id: string, status: string) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status } : l));
      setStorageItem(STORAGE_KEY_LEADS, updated);
      saveToMySQL('leads', updated);
      return updated;
    });
  }, []);

  const updateLead = useCallback((id: string, updatedFields: Partial<LeadType>) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l));
      setStorageItem(STORAGE_KEY_LEADS, updated);
      saveToMySQL('leads', updated);
      return updated;
    });
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      setStorageItem(STORAGE_KEY_LEADS, updated);
      saveToMySQL('leads', updated);
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setProjects(PROJECTS_DATA);
    setSolutions(SOLUTIONS_DATA);
    setProductsTech(PRODUCTS_DATA);
    setPartners(DEFAULT_PARTNERS);
    setTrustImages(DEFAULT_TRUST_IMAGES);
    setLeads(DEFAULT_LEADS);

    removeStorageItem(STORAGE_KEY_CONFIG);
    removeStorageItem(STORAGE_KEY_PROJECTS);
    removeStorageItem(STORAGE_KEY_SOLUTIONS);
    removeStorageItem(STORAGE_KEY_PRODUCTS);
    removeStorageItem(STORAGE_KEY_PARTNERS);
    removeStorageItem(STORAGE_KEY_TRUST);
    removeStorageItem(STORAGE_KEY_LEADS);
    removeStorageItem(STORAGE_KEY_ABOUT);

    saveToMySQL('config', DEFAULT_CONFIG);
    saveToMySQL('about', DEFAULT_ABOUT_CONTENT);
    saveToMySQL('projects', PROJECTS_DATA);
    saveToMySQL('solutions', SOLUTIONS_DATA);
    saveToMySQL('products', PRODUCTS_DATA);
    saveToMySQL('partners', DEFAULT_PARTNERS);
    saveToMySQL('trust', DEFAULT_TRUST_IMAGES);
    saveToMySQL('leads', DEFAULT_LEADS);
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        config,
        updateConfig,
        aboutContent,
        updateAboutContent,
        projects,
        addProject,
        updateProject,
        deleteProject,
        solutions,
        addSolution,
        updateSolution,
        deleteSolution,
        productsTech,
        addProductTech,
        updateProductTech,
        deleteProductTech,
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        trustImages,
        addTrustImage,
        updateTrustImage,
        deleteTrustImage,
        leads,
        addLead,
        updateLeadStatus,
        updateLead,
        deleteLead,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
