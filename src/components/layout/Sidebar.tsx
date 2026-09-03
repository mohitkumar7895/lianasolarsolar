'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Zap, FileText, Settings, LogOut, ArrowLeft, Sun, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  role?: 'customer' | 'admin';
}

export function Sidebar({ role = 'customer' }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const customerNav = [
    { name: 'Dashboard Overview', href: '/customer', icon: LayoutDashboard },
    { name: 'Solar Generation', href: '/customer#generation', icon: Zap },
    { name: 'Electricity Bills', href: '/customer#bills', icon: FileText },
    { name: 'Support Tickets', href: '/customer#support', icon: Settings },
  ];

  const adminNav = [
    { name: 'CMS & Catalog Control', href: '/admin', icon: LayoutDashboard },
    { name: 'Customer Leads', href: '/admin/leads', icon: Users },
  ];

  const navItems = role === 'admin' ? adminNav : customerNav;

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 min-h-screen shrink-0 shadow-lg">
      <div className="space-y-6">
        <div className="px-2 py-1 space-y-2">
          <Logo />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[#f97316] text-[11px] font-black uppercase tracking-wider">
            {role === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Center
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5" /> Customer Portal
              </>
            )}
          </div>
          {user && (
            <div className="text-[11px] text-slate-500 font-medium truncate px-1">
              Signed in as: <strong className="text-slate-900 dark:text-white font-bold">{user.name}</strong>
            </div>
          )}
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#f97316] text-white shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Visit Public Website
        </Link>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              logout();
            }
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
