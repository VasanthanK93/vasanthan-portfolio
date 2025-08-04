'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RevealTransition } from '@/components/animations/PageTransition';
import { cn } from '@/lib/cn';
import { formatDate, formatReadTime } from '@/lib/blogApi';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  featured = false, 
  className,
  index = 0 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const CardContent = () => (
    <div
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl',
        'border border-gray-200 dark:border-gray-800',
        'hover:border-blue-300 dark:hover:border-blue-700',
        'transform hover:scale-[1.02] hover:-translate-y-1',
        featured ? 'lg:flex lg:items-center lg:space-x-6' : 'flex flex-col',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        featured 
          ? 'lg:w-1/2 lg:flex-shrink-0 h-64 lg:h-80 rounded-l-xl' 
          : 'w-full h-48 rounded-t-xl'
      )}>
        {!imageError && post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 1l4 4v9a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h4l-4-4v4z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400">Article</span>
            </div>
          </div>
        )}

        {/* Overlay with read time */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-900">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatReadTime(post.readTime)}
            </span>
          </div>
        </div>

        {/* External link indicator */}
        {post.isExternal && (
          <div className="absolute top-4 right-4">
            <div className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg">
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn(
        'p-6 flex flex-col',
        featured ? 'lg:w-1/2 lg:justify-center' : 'flex-1'
      )}>
        {/* Meta information */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(post.publishedAt)}
          </span>
          <span>•</span>
          <span>{formatReadTime(post.readTime)}</span>
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2',
          'group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200',
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        )}>
          {post.title}
        </h3>

        {/* Description */}
        <p className={cn(
          'text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed',
          featured ? 'text-base' : 'text-sm'
        )}>
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read more link */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
            Read on Medium
          </span>
          <svg 
            className={cn(
              'w-5 h-5 text-blue-600 dark:text-blue-400 transition-all duration-200',
              'group-hover:text-blue-700 dark:group-hover:text-blue-300',
              isHovered ? 'translate-x-1' : 'translate-x-0'
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Animated border */}
      <div className={cn(
        'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
        'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-[1px]',
        'before:absolute before:inset-[1px] before:rounded-[calc(0.75rem-1px)]',
        'before:bg-white dark:before:bg-gray-900'
      )} />

      {/* Shine effect */}
      <div 
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-1000",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "skew-x-12 pointer-events-none rounded-xl",
          isHovered && "translate-x-full"
        )}
      />
    </div>
  );

  if (post.isExternal) {
    return (
      <RevealTransition 
        direction="up" 
        className="h-full"
      >
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <CardContent />
        </a>
      </RevealTransition>
    );
  }

  return (
    <RevealTransition 
      direction="up" 
      className="h-full"
    >
      <Link href={`/blog/${post.id}`} className="block h-full">
        <CardContent />
      </Link>
    </RevealTransition>
  );
};

export default BlogCard;