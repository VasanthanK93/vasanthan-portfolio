import React from 'react';
import { Metadata } from 'next';
import Experience from '@/components/sections/Experience';

export const metadata: Metadata = {
  title: 'Experience - Vasanthan B K',
  description: 'Learn Experience my journey, experience, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['Experience', 'biography', 'web developer', 'full stack', 'experience', 'journey'],
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pt-20">
      <Experience />
    </main>
  );
}