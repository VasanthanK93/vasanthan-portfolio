'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import BlogGrid from '@/components/ui/BlogGrid';
import Button from '@/components/ui/Button';
import { RevealTransition } from '@/components/animations/PageTransition';
import { cn } from '@/lib/cn';
import { fetchMediumArticles, BlogApiError } from '@/lib/blogApi';

interface BlogSectionProps {
  showAll?: boolean;
  maxPosts?: number;
  className?: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  showAll = false,
  maxPosts = 6,
  className 
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchMediumArticles();
        setPosts(fetchedPosts);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setError(error instanceof BlogApiError ? error.message : 'Failed to load blog posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const displayPosts = showAll ? posts : posts.slice(0, maxPosts);

  if (loading) {
    return (
      <section className={cn('py-20 relative overflow-hidden', className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-20 relative overflow-hidden', className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealTransition direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Latest Blog Posts
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Thoughts & Insights
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Sharing my experiences, learnings, and thoughts on web development, 
              technology trends, and software engineering best practices.
            </p>
          </div>
        </RevealTransition>

        {/* Blog Posts */}
        {displayPosts.length > 0 ? (
          <BlogGrid posts={displayPosts} featuredCount={showAll ? 2 : 1} />
        ) : (
          <RevealTransition direction="up">
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 1l4 4v9a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                No articles yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                I'm working on some great content. Check back soon!
              </p>
              <Button
                as="a"
                href="https://medium.com/@vasanthancomrads"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                }
              >
                Visit Medium Profile
              </Button>
            </div>
          </RevealTransition>
        )}

        {/* Call to Action */}
        {!showAll && posts.length > maxPosts && (
          <RevealTransition direction="up">
            <div className="text-center mt-16">
              <Link href="/blog">
                <Button
                  variant="primary"
                  size="lg"
                  gradient
                  glowing
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </RevealTransition>
        )}

        {/* Medium Profile Link */}
        <RevealTransition direction="up">
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to read more? Check out my profile on Medium
            </p>
            <a
              href="https://medium.com/@vasanthancomrads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              @vasanthancomrads on Medium
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </RevealTransition>
      </div>
    </section>
  );
};

export default BlogSection;