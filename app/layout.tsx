import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CycleZen - Your Menstrual Wellness Guide',
  description: 'Track your menstrual cycle, symptoms, and mood with personalized insights.',
  keywords: ['menstrual health', 'period tracker', 'wellness', 'health insights'],
  openGraph: {
    title: 'CycleZen - Your Menstrual Wellness Guide',
    description: 'Track your menstrual cycle, symptoms, and mood with personalized insights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
