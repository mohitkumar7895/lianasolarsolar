import React from 'react';
import Link from 'next/link';
import { Home, Building2, BatteryCharging, Droplets, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ensureArray } from '@/lib/safe-utils';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  Building2: <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  BatteryCharging: <BatteryCharging className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  Droplets: <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  Wrench: <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  const featureList = ensureArray(service.features);

  return (
    <Card className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b132b] hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            {iconMap[service.icon] || <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          </div>
          <Badge variant="blue">{service.capacityRange}</Badge>
        </div>
        <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1 text-xs">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          {featureList.slice(0, 3).map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Explore Solution <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
