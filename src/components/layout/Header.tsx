'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import logo from '../../../public/Images/vbk_logo.png'; // Adjust the path as necessary
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isClient, setIsClient] = useState(false);
  
  const pathname = usePathname();
  const { isDark, toggleTheme } = useDarkMode();
  const scrollProgress = useScrollProgress();

  // Set client flag after mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/home', section: 'home' },
    { name: 'About', href: '/about', section: 'about' },
    { name: 'Skills', href: '/skills', section: 'skills' },
    { name: 'Experience', href: '/experience', section: 'experience' },
    { name: 'Blog', href: '/blog', section: 'blog' },
    { name: 'Contact', href: '/contact', section: 'contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Track active section for homepage
  useEffect(() => {
    if (!isClient || pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'blog', 'contact'];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section);
            console.log(`Active section: ${activeSection}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isClient]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Determine if nav item is active
  const isNavItemActive = (item: typeof navItems[0]) => {
    // Exact path match
    if (pathname === item.href) return true;
    
    // Homepage section matching
    if (pathname === '/' && item.section === activeSection) return true;
    
    return false;
  };

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent, href: string, section: string) => {
    // If on homepage and clicking a section that exists on homepage
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
    
    // Let Next.js handle route navigation for different pages
  };

  const handleDownloadResume = () => {
    // Replace with your actual resume URL
    const resumeUrl = 'https://drive.google.com/uc?export=download&id=18p-b24F1C47cFvyrtIVodmvq1JblQGCI';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Vasanthan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-transparent">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="hidden lg:flex space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg">
                  <Image src={logo} alt="Logo"/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vasanthan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item);
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.section)}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  'relative w-12 h-12 rounded-xl transition-all duration-300',
                  'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
                  'flex items-center justify-center group'
                )}
                aria-label="Toggle theme"
              >
                <div className="relative w-6 h-6">
                  {/* Sun Icon */}
                  <svg
                    className={cn(
                      'absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500',
                      isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  
                  {/* Moon Icon */}
                  <svg
                    className={cn(
                      'absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500',
                      isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 blur-xl" />
              </button>

              {/* Resume Download Button */}
              <Button
                onClick={handleDownloadResume}
                variant="primary"
                size="sm"
                gradient
                glowing
                className="group"
                rightIcon={
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-[-2px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
              >
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 bg-current transition-all duration-300',
                    isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                  )}
                />
                <span
                  className={cn(
                    'absolute top-3 block h-0.5 w-6 bg-current transition-all duration-300',
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 bg-current transition-all duration-300',
                    isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out',
            isMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-4'
          )}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => {
                  const isActive = isNavItemActive(item);
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href, item.section);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        'px-4 py-3 rounded-lg text-base font-medium transition-all duration-300',
                        'transform hover:scale-105 hover:translate-x-2',
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {isDark ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                    <span>
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>

                  <Button
                    onClick={handleDownloadResume}
                    variant="primary"
                    size="sm"
                    className="ml-4"
                  >
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;