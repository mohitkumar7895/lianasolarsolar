'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  FileText,
  Users,
  Layers,
  Save,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Phone,
  Image as ImageIcon,
  Building2,
  Upload,
  Sparkles,
  Gift,
  Sun,
  Cpu,
  LogOut,
  Database,
  ShieldCheck,
  Lock,
  Search,
  X,
  ExternalLink,
  Activity,
  Zap,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSiteContent, BrandPartner, LeadType, TrustImageItem, DEFAULT_ABOUT_CONTENT, AboutContentType } from '@/context/SiteContentContext';
import { Button } from '@/components/ui/Button';
import { ProjectItem, SolutionItem, ProductItem } from '@/types';
import { compressImageFile } from '@/lib/image-compress';
import { ensureArray } from '@/lib/safe-utils';

export default function AdminPage() {
  const { user, loading: authLoading, logout, isAdmin } = useAuth();
  const [dbStatus, setDbStatus] = useState<{
    status: string;
    readyState: string;
    database: string;
    responseTimeMs?: number;
    pingMs?: number;
    version?: string;
  } | null>(null);

  const checkDb = async () => {
    try {
      const res = await fetch('/api/auth/db-check');
      const data = await res.json();
      setDbStatus(data);
    } catch {
      setDbStatus({ status: 'Error', readyState: 'Offline', database: 'lianasolar' });
    }
  };

  useEffect(() => {
    checkDb();
  }, []);

  const {
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
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<
    'solutions' | 'products' | 'about' | 'promo' | 'hero' | 'gallery' | 'trust' | 'partners' | 'contact' | 'leads'
  >('solutions');

  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ ...config });
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // About CMS State
  const [aboutForm, setAboutForm] = useState<AboutContentType>({
    ...DEFAULT_ABOUT_CONTENT,
    ...(aboutContent || {}),
  });

  useEffect(() => {
    if (aboutContent) {
      setAboutForm({ ...DEFAULT_ABOUT_CONTENT, ...aboutContent });
    }
  }, [aboutContent]);

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutContent(aboutForm);
    showToast('About page content saved live to MySQL database!');
  };

  // Direct file upload references
  const heroFileRef = useRef<HTMLInputElement>(null);
  const aboutFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const promoFileRef = useRef<HTMLInputElement>(null);
  const solutionFileRef = useRef<HTMLInputElement>(null);
  const productFileRef = useRef<HTMLInputElement>(null);
  const trustFileRef = useRef<HTMLInputElement>(null);

  // Trust Photos State
  const [editingTrust, setEditingTrust] = useState<TrustImageItem | null>(null);
  const [showAddTrust, setShowAddTrust] = useState(false);
  const [trustForm, setTrustForm] = useState({
    title: '',
    tag: 'Rooftop EPC',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
  });

  // Edit / Add Modal States
  const [editingSolution, setEditingSolution] = useState<SolutionItem | null>(null);
  const [showAddSolution, setShowAddSolution] = useState(false);
  const [solForm, setSolForm] = useState({
    title: '',
    capacityRange: '3 kW to 15 kW',
    idealFor: 'Villas & Independent Houses',
    description: 'Turnkey residential rooftop solar engineering.',
    features: 'Govt Subsidy Support\nTier-1 Modules\n25-Year Warranty',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
  });

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: '',
    tagline: 'High-Efficiency Tier-1 Hardware',
    warranty: '25-Year Output Warranty',
    description: 'Certified premium solar hardware.',
    features: 'Ultra-high efficiency\nALMM & BIS certified\nWeatherproof rating',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  });

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [projForm, setProjForm] = useState({
    title: '',
    category: 'residential' as 'residential' | 'commercial' | 'industrial' | 'agricultural',
    capacity: '10 kWp',
    annualSavings: '14,500 kWh/year',
    location: 'Noida, NCR',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
  });

  const [editingPartner, setEditingPartner] = useState<BrandPartner | null>(null);
  const [newPartner, setNewPartner] = useState({ name: '', tagline: '', color: '#f97316' });

  const [editingLead, setEditingLead] = useState<LeadType | null>(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Delhi NCR',
    capacity: '5 kW',
    type: 'Residential',
    bill: '600 units/mo',
    status: 'New Lead',
  });

  // Handle Photo File Uploads with Automatic HD WebP Compression
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedDataUrl = await compressImageFile(file);
        setter(compressedDataUrl);
      } catch {
        const reader = new FileReader();
        reader.onloadend = () => {
          setter(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Solution Handlers
  const openEditSolution = (sol: SolutionItem) => {
    setEditingSolution(sol);
    setSolForm({
      title: sol.title,
      capacityRange: sol.capacityRange,
      idealFor: sol.idealFor || '',
      description: sol.description,
      features: ensureArray(sol.features).join('\n'),
      image: sol.image,
    });
  };

  const handleSaveSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solForm.title.trim()) return;

    const feats = solForm.features.split('\n').filter((f) => f.trim().length > 0);

    if (editingSolution) {
      updateSolution(editingSolution.id, {
        title: solForm.title,
        capacityRange: solForm.capacityRange,
        idealFor: solForm.idealFor,
        description: solForm.description,
        features: feats,
        image: solForm.image,
      });
      showToast(`Updated "${solForm.title}" live!`);
      setEditingSolution(null);
    } else {
      const newSol: SolutionItem = {
        id: `sol-${Date.now()}`,
        slug: solForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: solForm.title,
        subtitle: solForm.idealFor || solForm.title,
        capacityRange: solForm.capacityRange,
        idealFor: solForm.idealFor,
        description: solForm.description,
        image: solForm.image,
        features: feats,
        specs: [
          { label: 'Typical Sizing', value: solForm.capacityRange },
          { label: 'Warranty', value: '25 Years Output' },
        ],
      };
      addSolution(newSol);
      showToast(`Added new solution "${solForm.title}"!`);
      setShowAddSolution(false);
    }
  };

  // Product Handlers
  const openEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      tagline: prod.tagline || '',
      warranty: prod.warranty || '25-Year Warranty',
      description: prod.description,
      features: ensureArray(prod.keyFeatures).join('\n'),
      image: prod.image,
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    const feats = prodForm.features.split('\n').filter((f) => f.trim().length > 0);

    if (editingProduct) {
      updateProductTech(editingProduct.id, {
        name: prodForm.name,
        tagline: prodForm.tagline,
        warranty: prodForm.warranty,
        description: prodForm.description,
        keyFeatures: feats,
        image: prodForm.image,
      });
      showToast(`Updated "${prodForm.name}" live!`);
      setEditingProduct(null);
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        name: prodForm.name,
        category: 'hardware' as any,
        tagline: prodForm.tagline,
        warranty: prodForm.warranty,
        description: prodForm.description,
        image: prodForm.image,
        keyFeatures: feats,
      };
      addProductTech(newProd);
      showToast(`Added new product "${prodForm.name}"!`);
      setShowAddProduct(false);
    }
  };

  // Gallery / Project Handlers
  const openEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjForm({
      title: proj.title,
      category: proj.category,
      capacity: proj.capacity,
      annualSavings: String(proj.annualSavings),
      location: proj.location,
      image: proj.image,
    });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title.trim()) return;

    if (editingProject) {
      updateProject(editingProject.id, {
        title: projForm.title,
        category: projForm.category,
        capacity: projForm.capacity,
        capacityKw: parseInt(projForm.capacity) || 10,
        annualSavings: projForm.annualSavings,
        location: projForm.location,
        image: projForm.image,
      });
      showToast(`Updated project "${projForm.title}" live!`);
      setEditingProject(null);
    } else {
      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        title: projForm.title,
        category: projForm.category,
        capacity: projForm.capacity,
        capacityKw: parseInt(projForm.capacity) || 10,
        annualSavings: projForm.annualSavings,
        location: projForm.location,
        image: projForm.image,
        description: 'Turnkey engineered solar installation with net metering synchronization.',
      };
      addProject(newProj);
      showToast(`Added new gallery project "${projForm.title}"!`);
      setShowAddProject(false);
    }
  };

  // Partner Handlers
  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;

    if (editingPartner) {
      updatePartner(editingPartner.id, {
        name: newPartner.name.trim(),
        tagline: newPartner.tagline.trim() || undefined,
        color: newPartner.color,
      });
      showToast(`Updated brand partner "${newPartner.name}"!`);
      setEditingPartner(null);
    } else {
      const p: BrandPartner = {
        id: `bp-${Date.now()}`,
        name: newPartner.name.trim(),
        tagline: newPartner.tagline.trim() || undefined,
        color: newPartner.color,
      };
      addPartner(p);
      showToast(`Added brand partner "${newPartner.name}"!`);
    }
    setNewPartner({ name: '', tagline: '', color: '#f97316' });
  };

  // Lead Handlers
  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.phone.trim()) return;

    if (editingLead) {
      updateLead(editingLead.id, {
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        city: leadForm.city,
        capacity: leadForm.capacity,
        type: leadForm.type,
        bill: leadForm.bill,
        status: leadForm.status,
      });
      showToast(`Updated lead for "${leadForm.name}"!`);
      setEditingLead(null);
    } else {
      addLead({
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        city: leadForm.city,
        capacity: leadForm.capacity,
        type: leadForm.type,
        bill: leadForm.bill,
        status: leadForm.status,
      });
      showToast(`Added new customer lead for "${leadForm.name}"!`);
      setShowAddLead(false);
    }
    setLeadForm({
      name: '',
      phone: '',
      email: '',
      city: 'Delhi NCR',
      capacity: '5 kW',
      type: 'Residential',
      bill: '600 units/mo',
      status: 'New Lead',
    });
  };

  // Trust Photos Handlers
  const openEditTrust = (item: TrustImageItem) => {
    setEditingTrust(item);
    setTrustForm({
      title: item.title,
      tag: item.tag || 'Rooftop EPC',
      image: item.image,
    });
  };

  const handleSaveTrust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trustForm.title.trim()) return;

    if (editingTrust) {
      updateTrustImage(editingTrust.id, {
        title: trustForm.title,
        tag: trustForm.tag,
        image: trustForm.image,
      });
      showToast(`Updated Trust Photo "${trustForm.title}" live!`);
      setEditingTrust(null);
    } else {
      const newTrust: TrustImageItem = {
        id: `trust-${Date.now()}`,
        title: trustForm.title,
        tag: trustForm.tag,
        image: trustForm.image,
      };
      addTrustImage(newTrust);
      showToast(`Added new Trust Photo "${trustForm.title}"!`);
      setShowAddTrust(false);
    }
  };

  const handleConfigSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    showToast('Saved website settings & headlines live!');
  };

  const currentPromo = formData.promoBanner || {
    enabled: true,
    badge: '🦚 Shubh Janmashtami Mahotsav Special Offer',
    title: '✨ Janmashtami Special: Zero Electricity Bills for 25 Years! ✨',
    subtitle: 'Celebrate prosperity this Janmashtami! Claim ₹78,000 direct subsidy + extra festive benefits on premier rooftop solar installations.',
    buttonText: 'Claim Janmashtami Offer 🦚',
    imageUrl: '/banners/clean-solar-sunset.jpg',
  };

  // Filter items by search query
  const filteredSolutions = solutions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.capacityRange.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = productsTech.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.warranty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrust = (trustImages || []).filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.tag && t.tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProjects = projects.filter(
    (pr) =>
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Unauthorized Barrier
  if (!authLoading && (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#161b22] border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-[#f97316] flex items-center justify-center mx-auto border border-orange-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Administrator Access Required</h2>
            <p className="text-xs text-slate-400">
              You must authenticate with an authorized Administrator account to access the Website Control CMS and Lead Manager.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/login?role=admin"
              className="w-full py-3.5 px-4 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Sign In as Admin
            </Link>
            <Link
              href="/register?role=admin"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
            >
              Register New Admin Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-[#f97316] selection:text-white pb-12">
      {/* Toast Notification */}
      {saveSuccess && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4" /> {saveSuccess}
        </div>
      )}

      {/* TOP EXECUTIVE BAR */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Liana Solar Master CMS
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20 text-[10px] font-black uppercase tracking-widest">
                  Live Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Full-stack control for Solar Solutions, Hardware Catalog, Festive Ads & Customer Leads
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Database Status */}
            <button
              onClick={checkDb}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                dbStatus?.readyState === 'Connected'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  : 'bg-amber-950/60 text-amber-300 border-amber-800'
              }`}
              title="Click to re-ping MySQL database"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              MySQL: {dbStatus?.readyState || 'Connected'}
              {dbStatus?.responseTimeMs !== undefined && (
                <span className="text-[10px] opacity-80">({dbStatus.responseTimeMs}ms)</span>
              )}
            </button>

            {/* Admin Profile Pill */}
            {user && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" /> {user.name}
              </div>
            )}

            {/* Link to public website in new tab */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-slate-800"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Site
            </Link>

            {/* Sign out */}
            {user && (
              <button
                onClick={() => {
                  if (confirm('Log out from Admin panel?')) logout();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#f97316]">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">{solutions.length}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Solar Solutions</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">{productsTech.length}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Tier-1 Hardware</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">{leads.length}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Customer Leads</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">{projects.length}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Gallery Projects</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-[#f97316]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white">
                {currentPromo.enabled ? '🟢 Active' : '🔴 Hidden'}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold">Festive Banner</div>
            </div>
          </div>
        </div>

        {/* TABS & SEARCH HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'solutions', name: `Solutions (${solutions.length})`, icon: Sun },
              { id: 'products', name: `Hardware (${productsTech.length})`, icon: Cpu },
              { id: 'about', name: 'About Page', icon: BookOpen },
              { id: 'promo', name: 'Festive Banner', icon: Gift },
              { id: 'hero', name: 'Hero & Text', icon: ImageIcon },
              { id: 'gallery', name: `Gallery (${projects.length})`, icon: Layers },
              { id: 'trust', name: `Trust Photos (${trustImages.length})`, icon: ShieldCheck },
              { id: 'partners', name: `Brands (${partners.length})`, icon: Building2 },
              { id: 'contact', name: 'Phones & Email', icon: FileText },
              { id: 'leads', name: `Leads (${leads.length})`, icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#f97316] text-white shadow-lg shadow-orange-950/80 scale-[1.02]'
                      : 'bg-[#161b22] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {tab.name}
                </button>
              );
            })}
          </div>

          {/* Search Input for Current Tab */}
          {['solutions', 'products', 'gallery', 'trust', 'leads'].includes(activeTab) && (
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-[#f97316] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SOLAR SOLUTIONS CMS (FULL EDIT + ADD + DELETE) */}
        {/* ========================================================================= */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Solar Solutions Catalog</h2>
                <p className="text-xs text-slate-400">Edit, customize or add new rooftop solar packages.</p>
              </div>
              <Button
                variant="solar"
                size="sm"
                onClick={() => {
                  setEditingSolution(null);
                  setSolForm({
                    title: '',
                    capacityRange: '3 kW to 15 kW',
                    idealFor: 'Villas & Homes',
                    description: 'Turnkey solar EPC installation.',
                    features: 'Govt Subsidy Support\nTier-1 Modules\n25-Year Warranty',
                    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
                  });
                  setShowAddSolution(!showAddSolution);
                }}
                className="gap-1.5 font-black text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {showAddSolution ? 'Cancel' : 'Add New Solution'}
              </Button>
            </div>

            {/* ADD OR EDIT MODAL / DRAWER */}
            {(showAddSolution || editingSolution) && (
              <div className="p-6 rounded-3xl bg-[#161b22] border-2 border-[#f97316]/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#f97316]" />
                    {editingSolution ? `Edit Solution: ${editingSolution.title}` : 'Add New Solar Solution'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddSolution(false);
                      setEditingSolution(null);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSolution} className="space-y-4">
                  {/* Photo picker with direct upload */}
                  <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Solution Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={solForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <input
                          type="file"
                          ref={solutionFileRef}
                          onChange={(e) => handleFileUpload(e, (url) => setSolForm((p) => ({ ...p, image: url })))}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => solutionFileRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" /> Upload Photo from Device
                        </button>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL"
                          value={solForm.image}
                          onChange={(e) => setSolForm((p) => ({ ...p, image: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Title</label>
                      <input
                        type="text"
                        required
                        value={solForm.title}
                        onChange={(e) => setSolForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Residential Rooftop Solar"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Capacity Range</label>
                      <input
                        type="text"
                        required
                        value={solForm.capacityRange}
                        onChange={(e) => setSolForm((p) => ({ ...p, capacityRange: e.target.value }))}
                        placeholder="e.g. 2 kW to 15 kW"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Ideal For Tag</label>
                      <input
                        type="text"
                        value={solForm.idealFor}
                        onChange={(e) => setSolForm((p) => ({ ...p, idealFor: e.target.value }))}
                        placeholder="e.g. Villas & Independent Houses"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-300 uppercase">Brief Description</label>
                    <input
                      type="text"
                      required
                      value={solForm.description}
                      onChange={(e) => setSolForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Short summary of this solution"
                      className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-300 uppercase">
                      Key Highlights / Bullet Points (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={solForm.features}
                      onChange={(e) => setSolForm((p) => ({ ...p, features: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white font-mono focus:border-[#f97316] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddSolution(false);
                        setEditingSolution(null);
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="solar" size="sm" className="font-black text-xs">
                      {editingSolution ? 'Save Changes' : 'Create Solution'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* SOLUTIONS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSolutions.map((sol) => (
                <div
                  key={sol.id}
                  className="p-5 rounded-3xl bg-[#161b22] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative w-28 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#f97316] block truncate">
                        {sol.capacityRange}
                      </span>
                      <h3 className="font-bold text-sm text-white truncate">{sol.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{sol.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {ensureArray(sol.features).length} Features Configured
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditSolution(sol)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white transition-colors cursor-pointer"
                        title="Edit Solution"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete solution "${sol.title}"?`)) deleteSolution(sol.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Delete Solution"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTS & TECH EQUIPMENT CMS (FULL EDIT + ADD + DELETE) */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Tier-1 Hardware & Products</h2>
                <p className="text-xs text-slate-400">Manage panels, inverters, and battery equipment items.</p>
              </div>
              <Button
                variant="solar"
                size="sm"
                onClick={() => {
                  setEditingProduct(null);
                  setProdForm({
                    name: '',
                    tagline: 'High-Efficiency Tier-1 Modules',
                    warranty: '25-Year Warranty',
                    description: 'Premium certified solar hardware.',
                    features: 'Ultra-high efficiency\nALMM & BIS certified\nWeatherproof rating',
                    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
                  });
                  setShowAddProduct(!showAddProduct);
                }}
                className="gap-1.5 font-black text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {showAddProduct ? 'Cancel' : 'Add New Product'}
              </Button>
            </div>

            {/* ADD OR EDIT PRODUCT MODAL */}
            {(showAddProduct || editingProduct) && (
              <div className="p-6 rounded-3xl bg-[#161b22] border-2 border-[#f97316]/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#f97316]" />
                    {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Solar Product'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddProduct(false);
                      setEditingProduct(null);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  {/* Photo picker */}
                  <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Product Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={prodForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <input
                          type="file"
                          ref={productFileRef}
                          onChange={(e) => handleFileUpload(e, (url) => setProdForm((p) => ({ ...p, image: url })))}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => productFileRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" /> Upload Product Image
                        </button>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL"
                          value={prodForm.image}
                          onChange={(e) => setProdForm((p) => ({ ...p, image: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Product Name</label>
                      <input
                        type="text"
                        required
                        value={prodForm.name}
                        onChange={(e) => setProdForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Monocrystalline Solar Panels"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Tagline / Badge</label>
                      <input
                        type="text"
                        value={prodForm.tagline}
                        onChange={(e) => setProdForm((p) => ({ ...p, tagline: e.target.value }))}
                        placeholder="e.g. Tier-1 BIS Certified"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Warranty Tag</label>
                      <input
                        type="text"
                        value={prodForm.warranty}
                        onChange={(e) => setProdForm((p) => ({ ...p, warranty: e.target.value }))}
                        placeholder="e.g. 25-Year Warranty"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-300 uppercase">Description</label>
                    <input
                      type="text"
                      required
                      value={prodForm.description}
                      onChange={(e) => setProdForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Short summary of this equipment"
                      className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-300 uppercase">
                      Features / Specifications (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={prodForm.features}
                      onChange={(e) => setProdForm((p) => ({ ...p, features: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white font-mono focus:border-[#f97316] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="solar" size="sm" className="font-black text-xs">
                      {editingProduct ? 'Save Product' : 'Add Product'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* PRODUCTS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-3xl bg-[#161b22] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative w-28 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block truncate">
                        {prod.warranty}
                      </span>
                      <h3 className="font-bold text-sm text-white truncate">{prod.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{prod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-[#f97316] font-bold">
                      {ensureArray(prod.keyFeatures).length} Key Highlights
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete product "${prod.name}"?`)) deleteProductTech(prod.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2.5: ABOUT US PAGE STORY & COMMITMENTS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#161b22] border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#f97316]" /> About Us Page Content Management
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Edit company story, headline, photo, key metrics, and core commitments displayed on /about.
                  </p>
                </div>

                <Button type="submit" variant="solar" size="sm" className="font-black text-xs gap-1.5 cursor-pointer">
                  <Save className="w-4 h-4" /> Save About Page
                </Button>
              </div>

              {/* 1. BADGE, HEADLINE & SUBHEAD */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-wider">Top Badge Text</label>
                  <input
                    type="text"
                    value={aboutForm.badge}
                    onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                    placeholder="e.g. ABOUT LIANASOLAR"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-wider">Main Page Heading</label>
                  <input
                    type="text"
                    value={aboutForm.heading}
                    onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                    placeholder="e.g. Pioneering Clean Solar Energy with Engineering Precision"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              {/* 2. STORY PARAGRAPHS */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-wider">Story Paragraph 1 (Lead Intro)</label>
                  <textarea
                    rows={3}
                    value={aboutForm.storyPara1}
                    onChange={(e) => setAboutForm({ ...aboutForm, storyPara1: e.target.value })}
                    placeholder="First paragraph describing the company..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase tracking-wider">Story Paragraph 2 (Experience & Certifications)</label>
                  <textarea
                    rows={3}
                    value={aboutForm.storyPara2}
                    onChange={(e) => setAboutForm({ ...aboutForm, storyPara2: e.target.value })}
                    placeholder="Second paragraph describing experience, UPNEDA registration..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* 3. ABOUT PHOTO PICKER */}
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-[#f97316]">
                  About Page Hero Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-48 h-32 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={aboutForm.image}
                      alt="About Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={aboutFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setAboutForm((prev) => ({ ...prev, image: url })))}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => aboutFileRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload from Device
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste HD Image URL (e.g. https://images.unsplash.com/...)"
                      value={aboutForm.image}
                      onChange={(e) => setAboutForm({ ...aboutForm, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. KEY METRICS & NUMBERS */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Key Impact Stats (4 Highlights)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(aboutForm.stats || DEFAULT_ABOUT_CONTENT.stats).map((stat, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-400">Stat #{sIdx + 1} Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...(aboutForm.stats || DEFAULT_ABOUT_CONTENT.stats)];
                          newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                          setAboutForm({ ...aboutForm, stats: newStats });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-[#f97316] font-bold"
                        placeholder="e.g. 500+"
                      />
                      <label className="text-[10px] font-black uppercase text-slate-400">Stat #{sIdx + 1} Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...(aboutForm.stats || DEFAULT_ABOUT_CONTENT.stats)];
                          newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                          setAboutForm({ ...aboutForm, stats: newStats });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-slate-200"
                        placeholder="e.g. Projects Completed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. 3 CORE PILLARS & COMMITMENTS */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Core Pillars & Commitments (3 Items)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(aboutForm.pillars || DEFAULT_ABOUT_CONTENT.pillars).map((pillar, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#f97316] font-mono">Pillar #{pIdx + 1}</span>
                        <input
                          type="text"
                          value={pillar.num}
                          onChange={(e) => {
                            const newPillars = [...(aboutForm.pillars || DEFAULT_ABOUT_CONTENT.pillars)];
                            newPillars[pIdx] = { ...newPillars[pIdx], num: e.target.value };
                            setAboutForm({ ...aboutForm, pillars: newPillars });
                          }}
                          className="w-12 px-2 py-1 rounded-lg bg-[#161b22] border border-slate-700 text-xs text-center text-white"
                          placeholder="01"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Pillar Title</label>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => {
                            const newPillars = [...(aboutForm.pillars || DEFAULT_ABOUT_CONTENT.pillars)];
                            newPillars[pIdx] = { ...newPillars[pIdx], title: e.target.value };
                            setAboutForm({ ...aboutForm, pillars: newPillars });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white font-bold"
                          placeholder="Pillar Title"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Description</label>
                        <textarea
                          rows={3}
                          value={pillar.desc}
                          onChange={(e) => {
                            const newPillars = [...(aboutForm.pillars || DEFAULT_ABOUT_CONTENT.pillars)];
                            newPillars[pIdx] = { ...newPillars[pIdx], desc: e.target.value };
                            setAboutForm({ ...aboutForm, pillars: newPillars });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-slate-300 leading-relaxed"
                          placeholder="Pillar Description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAVE BUTTON BOTTOM */}
              <div className="flex justify-end pt-3 border-t border-slate-800">
                <Button type="submit" variant="solar" className="font-black text-xs gap-1.5 cursor-pointer shadow-xl">
                  <Save className="w-4 h-4" /> Save All About Page Changes
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: FESTIVE PROMOTIONAL BANNER CMS */}
        {/* ========================================================================= */}
        {activeTab === 'promo' && (
          <div className="p-6 rounded-3xl bg-[#161b22] border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Homepage Festive Ad Banner Control
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customize the festive offer banner displayed directly on the homepage.
                </p>
              </div>

              {/* Banner Active Toggle */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    promoBanner: { ...currentPromo, enabled: !currentPromo.enabled },
                  })
                }
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                  currentPromo.enabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${currentPromo.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                {currentPromo.enabled ? '🟢 Ad Banner is LIVE on Homepage' : '🔴 Ad Banner is HIDDEN'}
              </button>
            </div>

            {/* Quick Presets */}
            <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Quick Festive Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      promoBanner: {
                        enabled: true,
                        badge: '🦚 Shubh Janmashtami Mahotsav Special Offer',
                        title: '✨ Janmashtami Special: Zero Electricity Bills for 25 Years! ✨',
                        subtitle: 'Celebrate prosperity this Janmashtami! Claim ₹78,000 direct subsidy + extra festive benefits on premier rooftop solar installations.',
                        buttonText: 'Claim Janmashtami Offer 🦚',
                        imageUrl: '/banners/clean-solar-sunset.jpg',
                      },
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                >
                  🦚 Janmashtami Special
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      promoBanner: {
                        enabled: true,
                        badge: '🪔 Shubh Deepawali Dhamaka Offer',
                        title: '✨ Diwali Solar Mahotsav — 100% Free Green Electricity ✨',
                        subtitle: 'Light up your home with the sun this Diwali! Save up to ₹78,000 subsidy + zero installation fees.',
                        buttonText: 'Claim Diwali Offer 🪔',
                        imageUrl: '/banners/clean-solar-sunset.jpg',
                      },
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                >
                  🪔 Diwali Special
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      promoBanner: {
                        enabled: true,
                        badge: '☀️ PM Surya Ghar Muft Bijli Yojana',
                        title: '⚡ Get ₹78,000 Direct Government Subsidy for Rooftops',
                        subtitle: 'Authorized UPNEDA Registered Turnkey Solar EPC installation with net metering synchronization.',
                        buttonText: 'Check Subsidy Eligibility ⚡',
                        imageUrl: '/banners/clean-solar-sunset.jpg',
                      },
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                >
                  ☀️ PM Surya Ghar Scheme
                </button>
              </div>
            </div>

            {/* Edit Banner Form */}
            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Banner Badge Tag</label>
                  <input
                    type="text"
                    value={currentPromo.badge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promoBanner: { ...currentPromo, badge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Button Text</label>
                  <input
                    type="text"
                    value={currentPromo.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        promoBanner: { ...currentPromo, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase">Main Festive Headline</label>
                <input
                  type="text"
                  value={currentPromo.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      promoBanner: { ...currentPromo, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase">Offer Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={currentPromo.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      promoBanner: { ...currentPromo, subtitle: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white font-medium focus:border-[#f97316] focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="solar" size="md" className="font-black text-xs gap-2">
                  <Save className="w-4 h-4" /> Save Banner Changes Live
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: HERO & HEADLINES CMS */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="p-6 rounded-3xl bg-[#161b22] border border-slate-800 space-y-6">
            <div>
              <h2 className="text-base font-black text-white">Homepage Hero & Headlines</h2>
              <p className="text-xs text-slate-400">Edit core website slogans, trust badges, and hero titles.</p>
            </div>

            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Company Slogan</label>
                  <input
                    type="text"
                    value={formData.slogan || ''}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Trust Badge Text</label>
                  <input
                    type="text"
                    value={formData.trustBadge || ''}
                    onChange={(e) => setFormData({ ...formData, trustBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase">Hero Headline</label>
                <textarea
                  rows={2}
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-300 uppercase">Hero Subheadline</label>
                <input
                  type="text"
                  value={formData.heroSubhead}
                  onChange={(e) => setFormData({ ...formData, heroSubhead: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                />
              </div>

              {/* Hero Video URL Control */}
              <div className="space-y-1 p-4 rounded-2xl bg-[#0d1117] border border-slate-800">
                <label className="block text-xs font-black text-amber-400 uppercase tracking-wider">
                  🎥 Hero Background Video (Muted Autoplay Stream)
                </label>
                <p className="text-[11px] text-slate-400">
                  Enter an MP4 video URL or upload a custom drone/solar video for the homepage background.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={formData.heroVideoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, heroVideoUrl: e.target.value })}
                    placeholder="https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-the-roof-of-a-house-41584-large.mp4"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        heroVideoUrl:
                          'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-the-roof-of-a-house-41584-large.mp4',
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    Reset HD Video
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="solar" size="md" className="font-black text-xs gap-2">
                  <Save className="w-4 h-4" /> Save Headlines Live
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: GALLERY & PROJECTS CMS (FULL EDIT + ADD + DELETE) */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Installed Solar Projects Gallery</h2>
                <p className="text-xs text-slate-400">Edit or upload newly commissioned rooftop solar installations.</p>
              </div>
              <Button
                variant="solar"
                size="sm"
                onClick={() => {
                  setEditingProject(null);
                  setProjForm({
                    title: '',
                    category: 'residential',
                    capacity: '10 kWp',
                    annualSavings: '14,500 kWh/year',
                    location: 'Noida, NCR',
                    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
                  });
                  setShowAddProject(!showAddProject);
                }}
                className="gap-1.5 font-black text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {showAddProject ? 'Cancel' : 'Add Project'}
              </Button>
            </div>

            {/* ADD OR EDIT PROJECT MODAL */}
            {(showAddProject || editingProject) && (
              <div className="p-6 rounded-3xl bg-[#161b22] border-2 border-[#f97316]/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#f97316]" />
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Gallery Installation'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddProject(false);
                      setEditingProject(null);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  {/* Photo picker */}
                  <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Installation Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={projForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <input
                          type="file"
                          ref={galleryFileRef}
                          onChange={(e) => handleFileUpload(e, (url) => setProjForm((p) => ({ ...p, image: url })))}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" /> Upload Project Photo
                        </button>
                        <input
                          type="text"
                          placeholder="Or paste direct image URL"
                          value={projForm.image}
                          onChange={(e) => setProjForm((p) => ({ ...p, image: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projForm.title}
                        onChange={(e) => setProjForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. 10 kWp Rooftop Villa"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Category</label>
                      <select
                        value={projForm.category}
                        onChange={(e) => setProjForm((p) => ({ ...p, category: e.target.value as any }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="agricultural">Agricultural</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Capacity</label>
                      <input
                        type="text"
                        required
                        value={projForm.capacity}
                        onChange={(e) => setProjForm((p) => ({ ...p, capacity: e.target.value }))}
                        placeholder="e.g. 10 kWp"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Location</label>
                      <input
                        type="text"
                        required
                        value={projForm.location}
                        onChange={(e) => setProjForm((p) => ({ ...p, location: e.target.value }))}
                        placeholder="e.g. Noida Sector 62"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Annual Yield / Savings</label>
                      <input
                        type="text"
                        required
                        value={projForm.annualSavings}
                        onChange={(e) => setProjForm((p) => ({ ...p, annualSavings: e.target.value }))}
                        placeholder="e.g. 14,500 kWh/yr"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddProject(false);
                        setEditingProject(null);
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="solar" size="sm" className="font-black text-xs">
                      {editingProject ? 'Save Project' : 'Add Project'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-[#161b22] border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#f97316] font-black text-[10px] uppercase border border-slate-800">
                      {proj.capacity} • {proj.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-white truncate">{proj.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>📍 {proj.location}</span>
                      <span className="text-emerald-400 font-bold">⚡ {proj.annualSavings}</span>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => openEditProject(proj)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) deleteProject(proj.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5.5: TRUST DELIVERED & CERTIFICATIONS PHOTOS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'trust' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Trust Delivered & Installation Photos</h2>
                <p className="text-xs text-slate-400">
                  Upload, manage, and edit verified site execution photos and trust badges displayed on the /trust page.
                </p>
              </div>
              <Button
                variant="solar"
                size="sm"
                onClick={() => {
                  setEditingTrust(null);
                  setTrustForm({
                    title: '',
                    tag: 'Rooftop EPC',
                    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
                  });
                  setShowAddTrust(!showAddTrust);
                }}
                className="gap-1.5 font-black text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {showAddTrust ? 'Cancel' : 'Upload Trust Photo'}
              </Button>
            </div>

            {/* ADD / EDIT TRUST PHOTO MODAL */}
            {(showAddTrust || editingTrust) && (
              <div className="p-6 rounded-3xl bg-[#161b22] border-2 border-[#f97316]/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#f97316]" />
                    {editingTrust ? `Edit Photo: ${editingTrust.title}` : 'Upload New Trust & Installation Photo'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddTrust(false);
                      setEditingTrust(null);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveTrust} className="space-y-4">
                  {/* Photo picker with direct upload */}
                  <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Installation Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-44 h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={trustForm.image}
                          alt="Trust Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <div className="flex gap-2">
                          <input
                            type="file"
                            ref={trustFileRef}
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (url) => setTrustForm((t) => ({ ...t, image: url })))}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => trustFileRef.current?.click()}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                          >
                            <Upload className="w-3.5 h-3.5" /> Upload from Device
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Or paste HD Image URL (e.g. https://images.unsplash.com/...)"
                          value={trustForm.image}
                          onChange={(e) => setTrustForm((t) => ({ ...t, image: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Photo Title / Caption</label>
                      <input
                        type="text"
                        required
                        value={trustForm.title}
                        onChange={(e) => setTrustForm((t) => ({ ...t, title: e.target.value }))}
                        placeholder="e.g. 50 kW Industrial Solar Array"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Tag / Badge Label</label>
                      <input
                        type="text"
                        value={trustForm.tag || ''}
                        onChange={(e) => setTrustForm((t) => ({ ...t, tag: e.target.value }))}
                        placeholder="e.g. Rooftop EPC, Net Metering Done, Tier-1"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddTrust(false);
                        setEditingTrust(null);
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="solar" size="sm" className="font-black text-xs">
                      {editingTrust ? 'Save Photo' : 'Add Trust Photo'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* TRUST PHOTOS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrust.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#161b22] border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {item.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#f97316] font-black text-[10px] uppercase border border-slate-800">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-white truncate">{item.title}</h3>

                    <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => openEditTrust(item)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-[#f97316] text-white transition-colors cursor-pointer"
                        title="Edit Photo"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete trust photo "${item.title}"?`)) deleteTrustImage(item.id);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: BRAND PARTNERS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'partners' && (
          <div className="p-6 rounded-3xl bg-[#161b22] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-black text-white">Brand Partners & OEM Ecosystem</h2>
                <p className="text-xs text-slate-400">Edit partner names, colors, and taglines displayed across the site.</p>
              </div>
            </div>

            {/* Add / Edit Form */}
            <form onSubmit={handleSavePartner} className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#f97316]">
                {editingPartner ? `Edit Partner: ${editingPartner.name}` : 'Add Brand Partner'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Partner Name (e.g. TATA POWER)"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner((p) => ({ ...p, name: e.target.value }))}
                  className="px-3 py-2 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Tagline (e.g. tier-1 modules)"
                  value={newPartner.tagline}
                  onChange={(e) => setNewPartner((p) => ({ ...p, tagline: e.target.value }))}
                  className="px-3 py-2 rounded-xl bg-[#161b22] border border-slate-700 text-xs text-white"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newPartner.color}
                    onChange={(e) => setNewPartner((p) => ({ ...p, color: e.target.value }))}
                    className="w-10 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <Button type="submit" variant="solar" size="sm" className="font-black text-xs flex-1">
                    {editingPartner ? 'Update Partner' : 'Add Partner'}
                  </Button>
                  {editingPartner && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPartner(null);
                        setNewPartner({ name: '', tagline: '', color: '#f97316' });
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Partners List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {partners.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3.5 rounded-2xl bg-[#0d1117] border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-black text-xs text-white block" style={{ color: pt.color }}>
                      {pt.name}
                    </span>
                    {pt.tagline && <span className="text-[10px] text-slate-500 block truncate">{pt.tagline}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPartner(pt);
                        setNewPartner({ name: pt.name, tagline: pt.tagline || '', color: pt.color || '#f97316' });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete partner "${pt.name}"?`)) deletePartner(pt.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CONTACTS & PHONES CMS */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="p-6 rounded-3xl bg-[#161b22] border border-slate-800 space-y-6">
            <div>
              <h2 className="text-base font-black text-white">Contact & Helpline Settings</h2>
              <p className="text-xs text-slate-400">Update customer care phone numbers, WhatsApp, and office address.</p>
            </div>

            <form onSubmit={handleConfigSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Primary Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">WhatsApp Number (Digits only)</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Official Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-300 uppercase">Office Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="solar" size="md" className="font-black text-xs gap-2">
                  <Save className="w-4 h-4" /> Save Contact Details Live
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: LEADS MANAGEMENT (EDIT STATUS + ADD + DELETE) */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">Solar Inquiries & Customer Leads ({leads.length})</h2>
                <p className="text-xs text-slate-400">Track and update status for solar quote requests.</p>
              </div>
              <Button
                variant="solar"
                size="sm"
                onClick={() => {
                  setEditingLead(null);
                  setLeadForm({
                    name: '',
                    phone: '',
                    email: '',
                    city: 'Delhi NCR',
                    capacity: '5 kW',
                    type: 'Residential',
                    bill: '600 units/mo',
                    status: 'New Lead',
                  });
                  setShowAddLead(!showAddLead);
                }}
                className="gap-1.5 font-black text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {showAddLead ? 'Cancel' : 'Add Manual Lead'}
              </Button>
            </div>

            {/* ADD OR EDIT LEAD MODAL */}
            {(showAddLead || editingLead) && (
              <div className="p-6 rounded-3xl bg-[#161b22] border-2 border-[#f97316]/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#f97316]" />
                    {editingLead ? `Edit Lead: ${editingLead.name}` : 'Add New Customer Lead'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddLead(false);
                      setEditingLead(null);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveLead} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Customer Name</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Ramesh Sharma"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">City / Location</label>
                      <input
                        type="text"
                        value={leadForm.city}
                        onChange={(e) => setLeadForm((p) => ({ ...p, city: e.target.value }))}
                        placeholder="Noida, UP"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Capacity Required</label>
                      <input
                        type="text"
                        value={leadForm.capacity}
                        onChange={(e) => setLeadForm((p) => ({ ...p, capacity: e.target.value }))}
                        placeholder="5 kW"
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Property Type</label>
                      <select
                        value={leadForm.type}
                        onChange={(e) => setLeadForm((p) => ({ ...p, type: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Agricultural">Agricultural</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-300 uppercase">Pipeline Status</label>
                      <select
                        value={leadForm.status}
                        onChange={(e) => setLeadForm((p) => ({ ...p, status: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0d1117] border border-slate-700 text-xs text-white"
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Site Survey Scheduled">Site Survey Scheduled</option>
                        <option value="Subsidy Form Filled">Subsidy Form Filled</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Installation In Progress">Installation In Progress</option>
                        <option value="Commissioned & Net Metered">Commissioned & Net Metered</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddLead(false);
                        setEditingLead(null);
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="solar" size="sm" className="font-black text-xs">
                      {editingLead ? 'Save Lead' : 'Add Lead'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* LEADS TABLE */}
            <div className="rounded-3xl bg-[#161b22] border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0d1117] text-slate-400 font-black uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone / City</th>
                      <th className="p-4">Plant Size</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{lead.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{lead.id} • {lead.type}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-300">{lead.phone}</div>
                          <div className="text-[11px] text-slate-500">📍 {lead.city}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-lg bg-orange-500/10 text-[#f97316] font-black text-[11px] border border-orange-500/20">
                            {lead.capacity || '5 kW'}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-black border cursor-pointer ${
                              lead.status.includes('Commissioned') || lead.status.includes('Subsidy')
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                                : lead.status.includes('Survey') || lead.status.includes('Proposal')
                                ? 'bg-blue-950/60 text-blue-300 border-blue-800'
                                : 'bg-amber-950/60 text-amber-300 border-amber-800'
                            }`}
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="Site Survey Scheduled">Site Survey Scheduled</option>
                            <option value="Subsidy Form Filled">Subsidy Form Filled</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Installation In Progress">Installation In Progress</option>
                            <option value="Commissioned & Net Metered">Commissioned & Net Metered</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingLead(lead);
                                setLeadForm({
                                  name: lead.name,
                                  phone: lead.phone,
                                  email: lead.email || '',
                                  city: lead.city,
                                  capacity: lead.capacity || '5 kW',
                                  type: lead.type,
                                  bill: lead.bill || '',
                                  status: lead.status,
                                });
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#f97316] text-white transition-colors cursor-pointer"
                              title="Edit Lead Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete lead for "${lead.name}"?`)) deleteLead(lead.id);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
