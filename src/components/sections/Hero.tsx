'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition, { RevealTransition } from '@/components/animations/PageTransition';
import CounterAnimation from '@/components/animations/CounterAnimation';
import { useDarkMode } from '@/hooks/useDarkMode';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const { isDark } = useDarkMode();

  // Dynamic roles that will be typed out
  const roles = [
    'Full Stack Developer',
    'Full Stack Web Developer',
    'Full Stack NodeJs Developer',
    'MongoDB Developer',
    'AI enthusiast'
  ];

  const currentRole = roles[currentRoleIndex];

  // Typing animation effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (typedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 50);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isTyping, currentRole]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const stats = [
    { label: 'Years Experience', value: 9, suffix: '+' },
    { label: 'Domains Worked', value: 3, suffix: '+' },
    { label: 'Happy Clients', value: 6, suffix: '+' },
  ];

  const techStack = [
    { name: 'ReactJs', color: 'bg-blue-500' },
    { name: 'NodeJs', color: 'bg-green-500' },
    { name: 'NextJs', color: 'bg-gray-900' },
    { name: 'VueJs', color: 'bg-cyan-500' },
    { name: 'MongoDB', color: 'bg-green-600' },
    { name: 'JavaScript', color: 'bg-yellow-500' },
    { name: 'TypeScript', color: 'bg-blue-700' },
    { name: 'AEM', color: 'bg-blue-900' },
  ];

  const handleDownloadResume = () => {
    const resumeUrl = 'https://drive.google.com/uc?export=download&id=18p-b24F1C47cFvyrtIVodmvq1JblQGCI';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Vasanthan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heroGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heroGrid)" />
          </svg>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Column */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* Greeting */}
            <PageTransition direction="up" delay={200}>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 dark:text-green-400 font-medium text-sm uppercase tracking-wide">
                  Available for work
                </span>
              </div>
            </PageTransition>

            {/* Main Heading */}
            <PageTransition direction="up" delay={400}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                    Hi, I'm{' '}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Vasanthan
                  </span>
                </h1>
                
                {/* Dynamic Role with Typing Effect */}
                <div className="h-16 flex items-center justify-center lg:justify-start">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                    {typedText}
                    <span className={cn(
                      'inline-block w-0.5 h-8 bg-blue-600 ml-1 transition-opacity duration-100',
                      showCursor ? 'opacity-100' : 'opacity-0'
                    )} />
                  </h2>
                </div>
              </div>
            </PageTransition>

            {/* Description */}
            <PageTransition direction="up" delay={600}>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Passionate about creating exceptional web experiences with modern technologies. 
                I build scalable applications that solve real-world problems and deliver 
                outstanding user experiences.
              </p>
            </PageTransition>

            {/* Tech Stack Badges */}
            <PageTransition direction="up" delay={800}>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {techStack.map((tech, index) => (
                  <Badge
                    key={tech.name}
                    variant="secondary"
                    className={cn(
                      'px-4 py-2 font-medium transition-all duration-300 hover:scale-110',
                      'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
                      'border border-gray-200 dark:border-gray-700',
                      'hover:shadow-lg hover:shadow-blue-500/25'
                    )}
                    style={{
                      animationDelay: `${800 + index * 100}ms`
                    }}
                  >
                    <div className={cn('w-2 h-2 rounded-full mr-2', tech.color)} />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </PageTransition>

            {/* CTA Buttons */}
            <PageTransition direction="up" delay={1000}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={scrollToContact}
                  variant="primary"
                  size="lg"
                  gradient
                  glowing
                  className="group min-w-[200px]"
                  rightIcon={
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                >
                  Let's Talk
                </Button>

                <Button
                  onClick={handleDownloadResume}
                  variant="outline"
                  size="lg"
                  className="group min-w-[200px] border-2"
                  rightIcon={
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Download Resume
                </Button>
              </div>
            </PageTransition>

            {/* Quick Stats */}
            <PageTransition direction="up" delay={1200}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      <CounterAnimation
                        to={stat.value}
                        duration={2}
                        delay={1.4 + index * 0.2}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </PageTransition>
          </div>

          {/* Image Column */}
          <div className="relative">
            <PageTransition direction="left" delay={600}>
              <div className="relative">
                {/* Main Profile Image */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-1 animate-spin" style={{ animationDuration: '8s' }}>
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
                  </div>

                  {/* Profile Image */}
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <Image
                      src="/images/profile.jpeg" // Add your profile image
                      alt="Vasanthan -Senior Full Stack Developer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                    />
                  </div>

                  {/* Floating Elements Around Image */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-bounce">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>

                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  <div className="absolute top-8 -left-8 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg animate-ping">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
              </div>
            </PageTransition>

            {/* Social Proof Badges */}
            <RevealTransition threshold={1400} className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Verified</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Developer</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Fast</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealTransition>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <PageTransition direction="up" delay={1600}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            aria-label="Scroll to about section"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce" />
            </div>
          </button>
        </div>
      </PageTransition>
    </section>
  );
};

export default Hero;