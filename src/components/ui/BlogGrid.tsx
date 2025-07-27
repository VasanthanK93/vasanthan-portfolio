'use client';

import React from 'react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/ui/BlogCard';
import { cn } from '@/lib/cn';

interface BlogGridProps {
  posts: BlogPost[];
  featuredCount?: number;
  className?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({ 
  posts, 
  featuredCount = 1, 
  className 
}) => {
  const featuredPosts = posts.slice(0, featuredCount);
  const regularPosts = posts.slice(featuredCount);

  return (
    <div className={cn('space-y-8', className)}>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Featured Articles
          </h2>
          <div className="space-y-6">
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={true}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="space-y-6">
          {featuredCount > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Latest Articles
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index + featuredCount}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;