'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, ArrowLeft, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const adminNav = [
    { name: 'CMS & Website Control', href: '/admin', icon: LayoutDashboard },
    { name: 'Customer Inquiries & Leads', href: '/admin/leads', icon: Users },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 min-h-screen shrink-0 shadow-lg">
      <div className="space-y-6">
        <div className="px-2 py-1 space-y-2">
          <Logo />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[#f97316] text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Center
          </div>
          {user && (
            <div className="text-[11px] text-slate-500 font-medium truncate px-1">
              Admin: <strong className="text-slate-900 dark:text-white font-bold">{user.name}</strong>
            </div>
          )}
        </div>

        <nav className="space-y-1.5">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#f97316] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
