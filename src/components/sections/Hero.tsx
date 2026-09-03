'use client';

import React, { useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useSiteContent } from '@/context/SiteContentContext';
import { useModal } from '@/context/ModalContext';

export function Hero() {
  const { config } = useSiteContent();
  const { openQuoteModal } = useModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Direct video file path
  const videoSrc = config.heroVideoUrl && config.heroVideoUrl.trim().length > 0 && !config.heroVideoUrl.includes('unsplash')
    ? config.heroVideoUrl
    : '/vedio.mp4';

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.playsInline = true;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy handled
          });
        }
      }
    };

    playVideo();

    // Auto-resume on visibility/focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', playVideo);
    window.addEventListener('click', playVideo, { once: true });
    window.addEventListener('touchstart', playVideo, { once: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', playVideo);
      window.removeEventListener('click', playVideo);
      window.removeEventListener('touchstart', playVideo);
    };
  }, [videoSrc]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[520px] sm:min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-center justify-center">
      {/* Background Video Layer: Smooth Full HD Framing with No Top Crop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Blur Layer behind video to prevent pixelation on ultra-wide viewports */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl scale-110 pointer-events-none" />

        {/* Primary Clean HD Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          className="w-full h-full object-cover object-top sm:object-[center_top] transform-gpu will-change-transform"
          style={{
            imageRendering: 'auto',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src="/vedio.mp4" type="video/mp4" />
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Smooth Glass & Vignette Overlay (Protects Text Readability while keeping video crisp) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/35 to-slate-950/85 pointer-events-none" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20 md:py-28">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/25 text-[#f97316] border border-orange-500/40 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg shadow-orange-950/40">
            ☀️ {config.slogan || 'Solar Installed. Trust Delivered.'}
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            Power Your Home <br />
            With The Sun
          </h1>

          {/* Subheading in Italics */}
          <p className="text-base sm:text-xl md:text-2xl italic font-light text-slate-100 max-w-3xl leading-relaxed drop-shadow">
            {config.heroSubhead || 'Rooftop solar from ₹0 down — claim up to ₹78,000 subsidy'}
          </p>

          {/* Orange Explore Solar Button opening Modal with Luxury Shimmer */}
          <div className="pt-2">
            <button
              onClick={openQuoteModal}
              className="animate-shimmer px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-orange-950/80"
            >
              <Zap className="w-4 h-4 fill-white text-white" /> Explore Solar Quote
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
