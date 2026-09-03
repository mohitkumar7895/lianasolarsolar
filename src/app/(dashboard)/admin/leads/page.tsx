'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Phone,
  Trash2,
  PhoneCall,
  MessageSquare,
  Zap,
  Mail,
  Eye,
  X,
  Plus,
  Users,
  Inbox,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSiteContent, LeadType } from '@/context/SiteContentContext';

export default function AdminLeadsPage() {
  const { leads, updateLeadStatus, deleteLead, addLead } = useSiteContent();
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'call' | 'contact' | 'quote'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadType | null>(null);

  const callCount = leads.filter(
    (l) => l.source === 'Call Query' || l.type === 'Call Query' || l.status?.toLowerCase().includes('call')
  ).length;

  const contactCount = leads.filter(
    (l) => l.source === 'Contact Form' || l.type === 'Contact Form' || l.type?.toLowerCase().includes('contact')
  ).length;

  const quoteCount = leads.filter(
    (l) => l.source === 'Solar Quote' || (!l.source && l.type !== 'Call Query' && l.type !== 'Contact Form')
  ).length;

  const filteredLeads = leads.filter((l) => {
    // 1. Channel Filter
    if (channelFilter === 'call') {
      const isCall = l.source === 'Call Query' || l.type === 'Call Query' || l.status?.toLowerCase().includes('call');
      if (!isCall) return false;
    } else if (channelFilter === 'contact') {
      const isContact = l.source === 'Contact Form' || l.type === 'Contact Form' || l.type?.toLowerCase().includes('contact');
      if (!isContact) return false;
    } else if (channelFilter === 'quote') {
      const isQuote = l.source === 'Solar Quote' || (!l.source && l.type !== 'Call Query' && l.type !== 'Contact Form');
      if (!isQuote) return false;
    }

    // 2. Status Filter
    if (statusFilter !== 'all' && l.status !== statusFilter) {
      return false;
    }

    // 3. Search Query
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.subject && l.subject.toLowerCase().includes(q)) ||
      (l.message && l.message.toLowerCase().includes(q)) ||
      l.status.toLowerCase().includes(q) ||
      l.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 px-4">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#161b22] border border-slate-800 shadow-xl text-white">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="p-2.5 rounded-xl bg-slate-800 border-slate-700 text-slate-200 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Customer Inquiries & Call Queries
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20 text-[10px] font-black uppercase tracking-wider">
                {leads.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live inquiries received from Contact forms, Callback modals, and Solar Quote requests.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search customer, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-xs bg-[#0d1117] border-slate-700 text-white rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* CHANNEL PILLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#161b22] border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setChannelFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channelFilter === 'all'
                ? 'bg-[#f97316] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Channels ({leads.length})
          </button>
          <button
            onClick={() => setChannelFilter('call')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channelFilter === 'call'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Call Queries ({callCount})
          </button>
          <button
            onClick={() => setChannelFilter('contact')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channelFilter === 'contact'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Contact Forms ({contactCount})
          </button>
          <button
            onClick={() => setChannelFilter('quote')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channelFilter === 'quote'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" /> Quotes ({quoteCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Stage:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-[#f97316] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="New Call Query">📞 New Call Query</option>
            <option value="New Contact Inquiry">📝 New Contact Inquiry</option>
            <option value="New Lead">⚡ New Lead</option>
            <option value="Site Survey Scheduled">📅 Site Survey Scheduled</option>
            <option value="Proposal Sent">💼 Proposal Sent</option>
            <option value="Subsidy Form Filled">📄 Subsidy Form Filled</option>
            <option value="Commissioned & Net Metered">🎉 Commissioned</option>
          </select>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#161b22] rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-orange-500/10 text-[#f97316]">
                  {selectedLead.source === 'Call Query' || selectedLead.type === 'Call Query' ? (
                    <PhoneCall className="w-5 h-5" />
                  ) : (
                    <MessageSquare className="w-5 h-5" />
                  )}
                </span>
                <div>
                  <h3 className="text-base font-black text-white">{selectedLead.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedLead.id} • {selectedLead.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${selectedLead.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> Call Customer
              </a>
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#22c55e] hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Phone</span>
                  <p className="font-bold text-white font-mono">{selectedLead.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Location</span>
                  <p className="font-bold text-slate-200">{selectedLead.city || 'Delhi NCR'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Channel</span>
                  <p className="font-bold text-orange-400">{selectedLead.source || selectedLead.type}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Capacity</span>
                  <p className="font-bold text-amber-400">{selectedLead.capacity || 'Not Specified'}</p>
                </div>
              </div>

              {selectedLead.subject && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Subject</span>
                  <p className="font-bold text-slate-200 mt-0.5">{selectedLead.subject}</p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Message / Notes</span>
                <p className="text-slate-300 font-medium leading-relaxed mt-1 bg-slate-900 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap">
                  {selectedLead.message || 'No additional note provided.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)} className="text-xs">
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="rounded-3xl bg-[#161b22] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d1117] text-slate-400 font-black uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Customer & Channel</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Requirement / Sizing</th>
                <th className="p-4">Customer Message</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-bold text-sm text-slate-400">No matching inquiries found.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isCall = lead.source === 'Call Query' || lead.type === 'Call Query' || lead.status?.includes('Call');
                  const isContact = lead.source === 'Contact Form' || lead.type === 'Contact Form';

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white text-sm">{lead.name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                              isCall
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : isContact
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}
                          >
                            {isCall ? '📞 Call Query' : isContact ? '📝 Contact Form' : '⚡ Solar Quote'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{lead.id}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200 font-mono text-xs">{lead.phone}</span>
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                            className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-colors"
                            title="WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">📍 {lead.city}</p>
                      </td>

                      <td className="p-4">
                        <p className="font-semibold text-white text-xs">{lead.capacity || lead.type || '5 kW'}</p>
                        {lead.subject && <p className="text-[11px] text-slate-400 truncate max-w-[180px]">{lead.subject}</p>}
                      </td>

                      <td className="p-4 max-w-[220px]">
                        {lead.message ? (
                          <div
                            onClick={() => setSelectedLead(lead)}
                            className="text-[11px] text-slate-300 line-clamp-2 cursor-pointer hover:text-orange-400 transition-colors bg-slate-900/60 p-2 rounded-xl border border-slate-800"
                            title="Click to view message"
                          >
                            {lead.message}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-600 italic">No message</span>
                        )}
                      </td>

                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-black border cursor-pointer ${
                            lead.status.includes('Commissioned') || lead.status.includes('Subsidy')
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                              : lead.status.includes('Survey') || lead.status.includes('Proposal')
                              ? 'bg-blue-950/60 text-blue-300 border-blue-800'
                              : lead.status.includes('Call')
                              ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                              : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="New Call Query">📞 New Call Query</option>
                          <option value="New Contact Inquiry">📝 New Contact Inquiry</option>
                          <option value="New Lead">⚡ New Lead</option>
                          <option value="Site Survey Scheduled">📅 Site Survey Scheduled</option>
                          <option value="Proposal Sent">💼 Proposal Sent</option>
                          <option value="Subsidy Form Filled">📄 Subsidy Form Filled</option>
                          <option value="Commissioned & Net Metered">🎉 Commissioned</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry for "${lead.name}"?`)) deleteLead(lead.id);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
