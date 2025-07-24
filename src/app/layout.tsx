import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vasanthan - Senior Full Stack Developer",
    template: "%s | Vasanthan"
  },
  description: "Experienced Full Stack Developer specializing in modern web technologies, ReactJs, VueJs, NodeJs, and cloud solutions. Building scalable applications with exceptional user experiences.",
  keywords: [
    "Full Stack Developer",
    "ReactJs Developer",
    "VueJs Developer",
    "NodeJs Developer",
    "JavaScript",
    "TypeScript",
    "NextJs",
    "MongoDB"
  ],
  authors: [{ name: "Vasanthan" }],
  creator: "Vasanthan",
  publisher: "Vasanthan",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vasanthkumar.dev", // Update with your actual domain
    siteName: "Vasanthan - Portfolio",
    title: "Vasanthan -Senior Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in modern web technologies, ReactJs, NodeJs, and cloud solutions.",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Vasanthan -Senior Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasanthan -Senior Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in modern web technologies, ReactJs, NodeJs, and cloud solutions.",
    creator: "@vasanthank", // Update with your Twitter handle
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification
  },
  alternates: {
    canonical: "https://vasanthkumar.dev", // Update with your actual domain
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional meta tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema markup for person/developer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vasanthan",
              "jobTitle": "Full Stack Developer",
              "description": "Experienced Full Stack Developer specializing in modern web technologies",
              "url": "https://vasanthan.dev", // Update with your actual domain
              "sameAs": [
                "https://www.linkedin.com/in/vasanthank/",
                "https://github.com/vasanthank", // Update with your GitHub
                "https://twitter.com/vasanthank", // Update with your Twitter
                "https://medium.com/@vasanthank" // Update with your Medium
              ],
              "knowsAbout": [
                "JavaScript",
                "TypeScript",
                "ReactJs",
                "NodeJs",
                "NextJs",
                "Full Stack Development",
                "Web Development",
                "Software Engineering"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Your University" // Update with your education
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "TamilNadu",
                "addressCountry": "India"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50 rounded-br-lg transition-all duration-300"
          >
            Skip to main content
          </a>

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main 
            id="main-content" 
            className="flex-1 pt-16 lg:pt-20"
            role="main"
          >
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Loading screen */}
        <div
          id="loading-screen"
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-500"
          style={{ display: 'none' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4 animate-pulse">
              VK
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Loading...
            </div>
            <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Hide loading screen once page is loaded
              window.addEventListener('load', function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                  loadingScreen.style.opacity = '0';
                  setTimeout(() => {
                    loadingScreen.style.display = 'none';
                  }, 500);
                }
              });

              // Add smooth scrolling for anchor links
              document.addEventListener('DOMContentLoaded', function() {
                const links = document.querySelectorAll('a[href^="#"]');
                links.forEach(link => {
                  link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                      target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  });
                });
              });

              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && perfData.loadEventEnd - perfData.fetchStart > 3000) {
                      console.log('Page took longer than 3 seconds to load');
                    }
                  }, 0);
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}