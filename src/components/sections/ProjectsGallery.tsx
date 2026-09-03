'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Zap, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSiteContent } from '@/context/SiteContentContext';

export function ProjectsGallery({ limit = 3 }: { limit?: number }) {
  const { projects } = useSiteContent();
  const displayProjects = projects.slice(0, limit);

  return (
    <section id="projects" className="py-8 sm:py-12 bg-white border-t border-slate-100">
      <Container>
        <SectionHeader
          badge="Featured Projects"
          title="Installed Solar Portfolio"
          description="High-yield rooftop and ground-mount installations across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border border-slate-200/90 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-md px-2 py-0.5 rounded">
                  {project.category}
                </span>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-bold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {project.capacity}
                  </span>
                  <span className="flex items-center gap-1 text-slate-200 text-[11px]">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    {project.location.split(',')[0]}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Clean Yield:</span>
                  <span className="font-bold text-slate-900 font-mono-tech">{project.annualSavings}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-2 bg-white text-slate-800 border-slate-300 hover:border-blue-600 hover:text-blue-600 shadow-xs">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
