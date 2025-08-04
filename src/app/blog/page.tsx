import React from 'react';
import { Metadata } from 'next';
import Blogs from '@/components/sections/Blogs';

export const metadata: Metadata = {
  title: 'Blogs - Vasanthan B K',
  description: 'Learn about my journey, experience, and passion for web development. From curiosity to expertise in full-stack development.',
  keywords: ['Blogs', 'web developer', 'full stack', 'experience', 'journey'],
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Blogs />
    </main>
  );
}