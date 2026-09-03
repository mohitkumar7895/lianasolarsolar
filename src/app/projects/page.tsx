'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Zap, Eye, ArrowRight, Camera } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function GalleryPage() {
  const { projects } = useSiteContent();
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'industrial' | 'agricultural'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'residential', label: 'Residential Rooftops' },
    { id: 'commercial', label: 'Commercial Buildings' },
    { id: 'industrial', label: 'Industrial Plants' },
    { id: 'agricultural', label: 'Agricultural & Solar Pumps' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 space-y-16">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#15803d]">
            <Camera className="w-4 h-4 text-[#f97316]" />
            <span>REAL INSTALLATIONS & SITES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Solar Project <span className="text-[#15803d]">Photo Gallery</span>
          </h1>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* High-Resolution Visual Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900 cursor-pointer border border-slate-100"
              onClick={() => setSelectedImage(project.image)}
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized={true}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/60 transition-colors" />

              {/* Category Pill Top Left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {project.category}
                </span>
              </div>

              {/* Zoom Action Icon Top Right */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow-md flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2">
                <div className="flex items-center justify-between text-white text-xs font-mono">
                  <span className="flex items-center gap-1 font-bold text-[#f97316]">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    {project.capacity}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#4ade80]" />
                    {project.location}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight line-clamp-1">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Popup */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full h-[80vh] rounded-3xl overflow-hidden bg-slate-950">
              <Image
                src={selectedImage}
                alt="Solar Project Full View"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow-xl cursor-pointer"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}
      </Container>

      <FinalCTA />
    </div>
  );
}
