import Link from 'next/link';
import { SunMedium, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
        <SunMedium className="w-9 h-9" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md">
        The solar page or resource you are looking for might have been moved or does not exist.
      </p>
      <Link href="/">
        <Button variant="solar" size="lg" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Button>
      </Link>
    </div>
  );
}
