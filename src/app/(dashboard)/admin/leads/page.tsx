'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Phone, Trash2, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSiteContent } from '@/context/SiteContentContext';

export default function AdminLeadsPage() {
  const { leads, updateLeadStatus, deleteLead } = useSiteContent();
  const [search, setSearch] = useState('');

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Customer Leads & Inquiries
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live quote requests submitted on the website.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 text-xs"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-3">Lead ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Consumption</th>
                  <th className="py-3 px-3">Capacity</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-3 font-mono text-slate-400 font-bold">{lead.id}</td>
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900 dark:text-white">{lead.name}</p>
                      <p className="text-slate-500 font-mono text-[11px]">{lead.phone}</p>
                    </td>
                    <td className="py-3.5 px-3">{lead.city}</td>
                    <td className="py-3.5 px-3 font-semibold">{lead.bill || '500 units/mo'}</td>
                    <td className="py-3.5 px-3 font-bold text-amber-500">{lead.capacity || '5 kW'}</td>
                    <td className="py-3.5 px-3">{lead.type}</td>
                    <td className="py-3.5 px-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="text-xs py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold"
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Site Survey Scheduled">Site Survey Scheduled</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Subsidy Form Filled">Subsidy Form Filled</option>
                        <option value="Commissioned">Commissioned</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
