import React from 'react';
import { Metadata } from 'next';
import Projects from '@/components/sections/Projects';

export const metadata: Metadata = {
  title: 'Projects - Vasanthan B K',
  description: 'Learn Projects my journey, Projects, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['Projects', 'biography', 'web developer', 'full stack', 'Projects', 'journey'],
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Projects />
    </main>
  );
}