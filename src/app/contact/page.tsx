import React from 'react';
import { Metadata } from 'next';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact - Vasanthan B K',
  description: 'Learn Contact my journey, experience, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['Contact', 'biography', 'web developer', 'full stack', 'experience', 'journey'],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <Contact />
    </main>
  );
}