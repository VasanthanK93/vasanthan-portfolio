import React from 'react';
import { Metadata } from 'next';
import About from '@/components/sections/About';

export const metadata: Metadata = {
  title: 'About - Vasanthan B K',
  description: 'Learn about my journey, experience, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['about', 'biography', 'web developer', 'full stack', 'experience', 'journey'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <About />
    </main>
  );
}