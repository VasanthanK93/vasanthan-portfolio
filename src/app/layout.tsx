import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vasanthan B K - Full Stack Developer',
  description: 'Passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: ['full stack developer', 'web developer', 'React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Vasanthan B K' }],
  creator: 'Vasanthan B K',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vasanthanbk.dev',
    title: 'Vasanthan B K - Full Stack Developer',
    description: 'Passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.',
    siteName: 'Vasanthan B K Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasanthan B K - Full Stack Developer',
    description: 'Passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="relative">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}