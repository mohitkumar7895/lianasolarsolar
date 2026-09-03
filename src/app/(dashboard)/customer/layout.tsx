import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar role="customer" />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</div>
    </div>
  );
}
