import React from 'react';
import { Metadata } from 'next';
import Skills from '@/components/sections/Skills';

export const metadata: Metadata = {
  title: 'Skills - Vasanthan B K',
  description: 'Learn Skills my journey, Skills, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['Skills', 'biography', 'web developer', 'full stack', 'Skills', 'journey'],
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Skills />
    </main>
  );
}