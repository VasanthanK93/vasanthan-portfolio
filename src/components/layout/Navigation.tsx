'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface NavigationProps {
  className?: string;
  variant?: 'header' | 'sidebar' | 'floating';
  showProgress?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  className,
  variant = 'header',
  showProgress = false
}) => {
  const pathname = usePathname();
  const scrollProgress = useScrollProgress();
  const [activeSection, setActiveSection] = useState('home');
  const [isClient, setIsClient] = useState(false);

  // Set client flag after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Navigation items with proper section handling
  const navItems = [
    {
      name: 'Home',
      href: '/home',
      section: 'home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      ),
      description: 'Welcome & Overview'
    },
    {
      name: 'About',
      href: '/about',
      section: 'about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      ),
      description: 'Personal Story & Background'
    },
    {
      name: 'Skills',
      href: '/skills',
      section: 'skills',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      description: 'Technical Expertise'
    },
    {
      name: 'Experience',
      href: '/experience',
      section: 'experience',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
        </svg>
      ),
      description: 'Career Journey'
    },
    {
      name: 'Blog',
      href: '/blog',
      section: 'blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
        </svg>
      ),
      description: 'Articles & Insights'
    },
    {
      name: 'Contact',
      href: '/contact',
      section: 'contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      description: 'Get In Touch'
    }
  ];

  // Track active section based on scroll position (for homepage)
  useEffect(() => {
    if (!isClient || pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isClient]);

  // Determine active item with improved logic
  const getActiveItem = (item: typeof navItems[0]) => {
    // Exact path match
    if (pathname === item.href) return true;
    
    // Homepage section matching
    if (pathname === '/' && item.section === activeSection) return true;
    
    // Handle sub-pages (e.g., /about when on homepage about section)
    if (pathname === '/' && item.href.startsWith(`/${item.section}`)) return false;
    
    return false;
  };

  // Handle navigation click with improved logic
  const handleNavClick = (e: React.MouseEvent, href: string, section: string) => {
    // If clicking on a route that matches current pathname, scroll to section instead
    if (pathname === '/' && href !== '/') {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(section);
      }
      return;
    }
    
    // If on homepage and clicking home, scroll to top
    if (pathname === '/' && href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }
    
    // For hash links or same page navigation
    if (href.includes('#')) {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(section);
      }
    }
    
    // Let Next.js handle route navigation for different pages
  };

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  // Render based on variant
  if (variant === 'floating') {
    return (
      <nav className={cn(
        'fixed right-6 top-1/2 transform -translate-y-1/2 z-40',
        'hidden xl:block',
        className
      )}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-2">
          {showProgress && (
            <div className="mb-4 px-4 py-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                {Math.round(scrollProgress)}%
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = getActiveItem(item);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.section)}
                  className={cn(
                    'group relative flex items-center w-12 h-12 rounded-xl transition-all duration-300',
                    'hover:w-48 overflow-hidden',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                    {item.icon}
                  </div>
                  
                  <div className="pl-2 pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>

                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  if (variant === 'sidebar') {
    return (
      <nav className={cn(
        'fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30',
        'transform transition-transform duration-300',
        className
      )}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Navigation</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Explore my portfolio</p>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = getActiveItem(item);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.section)}
                  className={cn(
                    'group flex items-center px-4 py-3 rounded-xl transition-all duration-300',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <div className="flex-shrink-0 mr-3">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75 mt-0.5">{item.description}</div>
                  </div>
                  
                  {isActive && (
                    <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  // Default header variant
  return (
    <nav className={cn('flex items-center space-x-1', className)}>
      {navItems.map((item) => {
        const isActive = getActiveItem(item);
        
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href, item.section)}
            className={cn(
              'group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            )}
          >
            <span className="flex items-center space-x-2">
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </span>
            
            {isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            )}

            {/* Hover tooltip */}
            <div className={cn(
              'absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 text-xs font-medium text-white rounded-lg shadow-lg transition-all duration-200',
              'bg-gray-900 dark:bg-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible',
              'pointer-events-none whitespace-nowrap z-50'
            )}>
              {item.description}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-700" />
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

// Rest of the components remain the same...
export const Breadcrumb: React.FC<{
  items: Array<{ name: string; href?: string; current?: boolean }>;
  className?: string;
}> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={item.name} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 text-gray-400 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          
          {item.href && !item.current ? (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ) : (
            <span className={cn(
              item.current
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-900 dark:text-white'
            )}>
              {item.name}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export const QuickActions: React.FC<{
  actions: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
    variant?: 'primary' | 'secondary';
  }>;
  className?: string;
}> = ({ actions, className }) => {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {actions.map((action) => (
        <Link
          key={action.name}
          href={action.href}
          className={cn(
            'group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105',
            action.variant === 'primary'
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          )}
        >
          <span className="transition-transform duration-200 group-hover:scale-110">
            {action.icon}
          </span>
          <span>{action.name}</span>
        </Link>
      ))}
    </div>
  );
};

export const SectionNavigation: React.FC<{
  sections: Array<{ id: string; name: string; icon?: React.ReactNode }>;
  className?: string;
}> = ({ sections, className }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, isClient]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isClient) return null;

  return (
    <nav className={cn(
      'sticky top-20 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-2 shadow-lg',
      className
    )}>
      <div className="flex items-center space-x-1 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap',
              activeSection === section.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
            )}
          >
            {section.icon && (
              <span className="transition-transform duration-200 hover:scale-110">
                {section.icon}
              </span>
            )}
            <span>{section.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;