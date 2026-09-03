'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { QuoteModal } from '@/components/common/QuoteModal';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Check if current route is an auth or dashboard/admin portal route
  const isPortalOrAuth =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/customer');

  if (isPortalOrAuth) {
    // Pure standalone portal view - ZERO website navbar, footer, whatsapp, or quote modal
    return <div className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased">{children}</div>;
  }

  // Regular public website layout
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <QuoteModal />
    </div>
  );
}
