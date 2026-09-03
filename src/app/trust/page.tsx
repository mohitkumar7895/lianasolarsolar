'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function TrustPage() {
  const { trustImages, projects } = useSiteContent();
  const { openQuoteModal } = useModal();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Combine dynamic trust images with gallery projects
  const allImages = [
    ...(trustImages || []),
    ...projects.map((p, i) => ({
      id: `proj-${i}`,
      title: p.title,
      tag: p.capacity || 'Solar EPC',
      image: p.image,
    })),
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 space-y-16">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#15803d] border border-emerald-200 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Certified EPC Engineering & Verified Installations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Trust Delivered & Field Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Explore our real-world rooftop solar installations, precision structure engineering, and Tier-1 hardware execution across India.
          </p>
        </div>

        {/* Dynamic Trust Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {allImages.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900 cursor-pointer border border-slate-100 group"
              onClick={() => setSelectedImage(item.image)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized={item.image.startsWith('data:')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                {item.tag && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f97316] text-[10px] font-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
                <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Full screen lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full h-[80vh] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image
                src={selectedImage}
                alt="Installation View"
                fill
                className="object-contain"
                unoptimized={selectedImage.startsWith('data:')}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow-xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors"
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
