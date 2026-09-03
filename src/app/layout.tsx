import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { ModalProvider } from '@/context/ModalContext';
import { AppShell } from '@/components/layout/AppShell';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Solar panel installation',
    'Rooftop solar',
    'Solar EPC India',
    'Industrial solar plant',
    'Commercial solar power',
    'Net metering solar',
  ],
  authors: [{ name: 'Liana Solar Engineering Team' }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${outfit.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased font-sans">
        <ThemeProvider>
          <AuthProvider>
            <SiteContentProvider>
              <ModalProvider>
                <AppShell>{children}</AppShell>
              </ModalProvider>
            </SiteContentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
