'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await login(email, password, 'admin');

      if (!res.success) {
        setErrorMessage(res.message || 'Invalid administrator credentials.');
        setLoading(false);
        return;
      }

      setSuccessMessage('Admin authorization granted. Launching CMS Control Center...');

      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Server connection error.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#f97316] selection:text-white">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#f97316]" /> Back to Lianasolar Website
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">MySQL Database</span>
          <span className="text-emerald-400 font-bold">Online</span>
        </div>
      </div>

      {/* Main Admin Login Card */}
      <div className="w-full max-w-md mx-auto my-auto z-10 pt-4 pb-8">
        <div className="bg-[#161b22]/90 backdrop-blur-xl p-7 sm:p-9 rounded-3xl border border-slate-800/80 shadow-2xl shadow-black/80 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-orange-500/30 text-[#f97316] shadow-inner">
              <ShieldCheck className="w-8 h-8 text-[#f97316]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 inline-block">
                LIANASOLAR ENTERPRISE
              </span>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Admin Control Center
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Sign in with your administrator credentials to manage CMS, Call Queries & Leads
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Admin Email Address
              </label>
              <input
                type="email"
                placeholder="admin@lianasolar.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0d1117] text-white text-sm placeholder:text-slate-500 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-[#0d1117] text-white text-sm placeholder:text-slate-500 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] focus:outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-[#0d1117] text-[#f97316] focus:ring-[#f97316]"
                />
                <span>Remember session</span>
              </label>
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-500" /> 256-bit Encrypted
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating Admin...
                </>
              ) : (
                <>
                  Sign In to Admin Control <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full max-w-5xl mx-auto text-center text-[11px] text-slate-500 z-10">
        © {new Date().getFullYear()} Lianasolar Power Systems. Secured Administrator Portal.
      </div>
    </div>
  );
}
