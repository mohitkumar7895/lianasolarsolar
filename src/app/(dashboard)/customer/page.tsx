'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Zap, TrendingDown, Leaf, AlertCircle, FileText, Download, CheckCircle2, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/cards/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CustomerDashboardPage() {
  const { user, logout, loading } = useAuth();

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Welcome Back, {user?.name || 'Solar Explorer'}!
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {user?.email && <span className="font-semibold text-slate-700 dark:text-slate-300">{user.email} • </span>}
            Plant ID: <strong className="text-amber-500 font-mono">LS-NOIDA-5KW-2025</strong> • 5.0 kWp On-Grid System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="emerald" className="px-3 py-1.5 text-xs">
            ● Grid Synchronized
          </Badge>
          {user ? (
            <button
              onClick={() => {
                if (confirm('Do you want to log out of your customer account?')) {
                  logout();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all cursor-pointer border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          ) : (
            <Link href="/login" className="px-3 py-2 rounded-xl bg-[#f97316] text-white text-xs font-bold shadow-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Real-time stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Today's Generation"
          value="22.4 kWh"
          trend="+12% vs yesterday"
          icon={<Sun className="w-5 h-5" />}
          subtext="Peak Output: 4.8 kW at 1:15 PM"
        />
        <StatCard
          label="This Month's Solar Units"
          value="580 kWh"
          trend="+94% Solar Share"
          icon={<Zap className="w-5 h-5" />}
          subtext="Net Export to Grid: 210 kWh"
        />
        <StatCard
          label="Grid Energy Dependence"
          value="8% Load"
          trend="92% Bill Reduced"
          icon={<TrendingDown className="w-5 h-5" />}
          subtext="92% Clean Self-Sufficiency"
        />
        <StatCard
          label="Lifetime CO2 Saved"
          value="4.2 Tonnes"
          trend="~189 Trees"
          icon={<Leaf className="w-5 h-5" />}
          subtext="Total Clean Units: 5,120 kWh"
        />
      </div>

      {/* Generation Graph & Discom Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daily Power Generation Curve</CardTitle>
              <Badge variant="slate">Live IoT Feed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-56 bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-end justify-between p-4 gap-2">
              {[
                { time: '6 AM', val: 5 },
                { time: '8 AM', val: 25 },
                { time: '10 AM', val: 70 },
                { time: '12 PM', val: 95 },
                { time: '2 PM', val: 88 },
                { time: '4 PM', val: 45 },
                { time: '6 PM', val: 10 },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    style={{ height: `${item.val}%` }}
                    className="w-full max-w-[36px] bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t-lg transition-all duration-500 hover:brightness-110"
                  />
                  <span className="text-[10px] text-slate-500 font-semibold">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Solar Generation (kWh)
              </span>
              <span>Inverter Efficiency: 98.4%</span>
            </div>
          </CardContent>
        </Card>

        {/* System & Warranty Status */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Plant Health & Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-slate-400 font-semibold block">Inverter Status</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Normal (Growatt 5kW 3-Phase)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-slate-400 font-semibold block">DISCOM Net-Meter</span>
              <span className="font-bold text-slate-900 dark:text-white">UPPCL Account # 89472910</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-slate-400 font-semibold block">AMC Plan</span>
              <span className="font-bold text-amber-500">Gold Care (Valid till Jan 2030)</span>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download Subsidy & Warranty Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
