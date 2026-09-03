import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Zap } from 'lucide-react';
import { ProjectItem } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatKw } from '@/lib/utils';

export function ProjectCard({ project }: { project: ProjectItem }) {
  const savingsDisplay =
    typeof project.annualSavings === 'number'
      ? `${formatCurrency(project.annualSavings)}/yr`
      : project.annualSavings;

  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b132b] hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="blue" className="capitalize text-white bg-blue-600/90 border-none font-bold">
            {project.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{project.capacity || formatKw(project.capacityKw)}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-3">
        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {project.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Annual Clean Yield:</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono-tech">{savingsDisplay}</span>
        </div>
      </CardContent>
    </Card>
  );
}
