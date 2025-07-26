'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RevealTransition, StaggeredTransition } from '@/components/animations/PageTransition';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', count: 6 },
    { id: 'fullstack', label: 'Full Stack', count: 3 },
    { id: 'frontend', label: 'Frontend', count: 2 },
    { id: 'mobile', label: 'Mobile', count: 1 },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with advanced features like real-time inventory management, payment processing, and analytics dashboard.',
      longDescription: 'Built a scalable e-commerce platform serving 10,000+ users with features including product catalog management, shopping cart, secure payment integration, order tracking, and an admin dashboard with real-time analytics.',
      image: '/images/projects/ecommerce.jpg',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis'],
      features: [
        'Real-time inventory management',
        'Secure payment processing with Stripe',
        'Advanced search and filtering',
        'Mobile-responsive design',
        'Admin analytics dashboard',
        'Order tracking system'
      ],
      liveUrl: 'https://ecommerce-demo.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/ecommerce-platform',
      status: 'completed',
      year: '2024',
      duration: '3 months',
      team: 'Solo Project',
      challenges: [
        'Implementing real-time inventory updates',
        'Optimizing database queries for large product catalogs',
        'Ensuring PCI compliance for payment processing'
      ],
      results: [
        '99.9% uptime achieved',
        '40% faster page load times',
        '25% increase in conversion rate'
      ]
    },
    {
      id: 2,
      title: 'Task Management Dashboard',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
      longDescription: 'Developed a comprehensive project management tool that helps teams organize tasks, track progress, and collaborate effectively with features like kanban boards, time tracking, and team communication.',
      image: '/images/projects/taskmanager.jpg',
      category: 'fullstack',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Tailwind CSS', 'Prisma'],
      features: [
        'Kanban board interface',
        'Real-time collaboration',
        'Time tracking and reporting',
        'Team chat integration',
        'File sharing capabilities',
        'Project analytics'
      ],
      liveUrl: 'https://taskmanager.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/task-manager',
      status: 'completed',
      year: '2024',
      duration: '2 months',
      team: '2 Developers',
      challenges: [
        'Implementing real-time updates across multiple users',
        'Designing intuitive drag-and-drop interfaces',
        'Handling complex permission systems'
      ],
      results: [
        '500+ active users',
        '30% improvement in team productivity',
        '95% user satisfaction rate'
      ]
    },
    {
      id: 3,
      title: 'Weather Analytics App',
      description: 'A modern weather application with detailed forecasts, historical data analysis, and beautiful data visualizations.',
      longDescription: 'Created a comprehensive weather application that provides accurate forecasts, historical weather data analysis, and interactive visualizations to help users make informed decisions.',
      image: '/images/projects/weather.jpg',
      category: 'frontend',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeatherMap API', 'SCSS', 'PWA'],
      features: [
        '7-day detailed forecast',
        'Historical weather data',
        'Interactive weather maps',
        'PWA capabilities',
        'Offline functionality',
        'Location-based services'
      ],
      liveUrl: 'https://weather.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/weather-app',
      status: 'completed',
      year: '2023',
      duration: '1 month',
      team: 'Solo Project',
      challenges: [
        'Handling multiple weather APIs',
        'Creating responsive data visualizations',
        'Implementing offline functionality'
      ],
      results: [
        '1000+ daily active users',
        '4.8/5 user rating',
        'Featured on Vue.js showcase'
      ]
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'A comprehensive social media analytics platform that tracks engagement, analyzes trends, and provides actionable insights.',
      longDescription: 'Built a powerful analytics platform that helps businesses understand their social media performance across multiple platforms with detailed reporting and trend analysis.',
      image: '/images/projects/social-analytics.jpg',
      category: 'fullstack',
      technologies: ['React', 'Django', 'PostgreSQL', 'D3.js', 'Celery', 'Docker'],
      features: [
        'Multi-platform integration',
        'Real-time engagement tracking',
        'Advanced data visualizations',
        'Automated report generation',
        'Sentiment analysis',
        'Competitor analysis'
      ],
      liveUrl: 'https://analytics.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/social-analytics',
      status: 'completed',
      year: '2023',
      duration: '4 months',
      team: '3 Developers',
      challenges: [
        'Integrating multiple social media APIs',
        'Processing large volumes of data',
        'Creating real-time dashboards'
      ],
      results: [
        '100+ business clients',
        '50% reduction in reporting time',
        '$500K+ revenue generated'
      ]
    },
    {
      id: 5,
      title: 'Portfolio Website Builder',
      description: 'A drag-and-drop website builder specifically designed for creating beautiful portfolio websites for developers and designers.',
      longDescription: 'Developed an intuitive website builder that allows users to create professional portfolio websites without coding knowledge, featuring customizable templates and modern design elements.',
      image: '/images/projects/portfolio-builder.jpg',
      category: 'frontend',
      technologies: ['React', 'CSS-in-JS', 'Firebase', 'Stripe', 'Cloudinary'],
      features: [
        'Drag-and-drop interface',
        'Professional templates',
        'Custom domain support',
        'SEO optimization tools',
        'Analytics integration',
        'Mobile optimization'
      ],
      liveUrl: 'https://portfolios.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/portfolio-builder',
      status: 'completed',
      year: '2023',
      duration: '3 months',
      team: 'Solo Project',
      challenges: [
        'Creating a flexible drag-and-drop system',
        'Generating SEO-friendly static sites',
        'Implementing real-time preview'
      ],
      results: [
        '2000+ portfolios created',
        '85% user retention rate',
        'Featured in design communities'
      ]
    },
    {
      id: 6,
      title: 'Fitness Tracking Mobile App',
      description: 'A comprehensive fitness tracking application with workout planning, progress monitoring, and social features.',
      longDescription: 'Created a mobile-first fitness application that helps users track workouts, monitor progress, and stay motivated through social features and personalized recommendations.',
      image: '/images/projects/fitness-app.jpg',
      category: 'mobile',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'HealthKit', 'Google Fit'],
      features: [
        'Workout tracking and planning',
        'Progress visualization',
        'Social challenges',
        'Nutrition tracking',
        'Wearable device integration',
        'Personal trainer chat'
      ],
      liveUrl: 'https://fitness.vasanthan.dev',
      githubUrl: 'https://github.com/vasanthkumar-n/fitness-app',
      status: 'in-progress',
      year: '2024',
      duration: '4 months',
      team: '2 Developers',
      challenges: [
        'Integrating with health APIs',
        'Creating intuitive workout interfaces',
        'Handling offline functionality'
      ],
      results: [
        '5000+ downloads',
        '4.6/5 app store rating',
        '70% monthly active users'
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { variant: 'success' as const, label: 'Completed', icon: '✓' },
      'in-progress': { variant: 'info' as const, label: 'In Progress', icon: '⚡' },
      'planned': { variant: 'warning' as const, label: 'Planned', icon: '📋' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;

    return (
      <Badge variant={config.variant} size="sm" className="mb-2">
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </Badge>
    );
  };

  return (
    <section id="projects" className="py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealTransition direction="up" className="text-center mb-16">
          <div className="space-y-4">
            <Badge variant="outline" size="lg" className="mb-4">
              <span className="mr-2">💼</span>
              My Work
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills in full-stack development, 
              modern frameworks, and creating user-centric solutions.
            </p>
          </div>
        </RevealTransition>

        {/* Filter Tabs */}
        <RevealTransition direction="up" threshold={0.2} className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-300 relative',
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                )}
              >
                {category.label}
                <Badge 
                  count={category.count}
                  className="ml-2"
                  variant={activeFilter === category.id ? "secondary" : "outline"}
                  size="xs"
                />
              </button>
            ))}
          </div>
        </RevealTransition>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation
              key={project.id}
              animation="slideUp"
              delay={index * 0.1}
              threshold={0.1}
            >
              <Card
                variant="elevated"
                hover
                interactive
                glow
                className="h-full flex flex-col cursor-pointer group"
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Project Image */}
                <div className="relative h-48 -mx-6 -mt-6 mb-6 rounded-t-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-4xl opacity-50">🚀</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Project Status */}
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(project.status)}
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" size="sm">
                      {project.year}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge variant="secondary" size="sm">
                        Click to view details
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardHeader className="flex-1">
                  <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        size="xs"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" size="xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Duration:</span>
                      <br />
                      {project.duration}
                    </div>
                    <div>
                      <span className="font-medium">Team:</span>
                      <br />
                      {project.team}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                      leftIcon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      }
                    >
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, '_blank');
                      }}
                      rightIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      }
                    >
                      Live Demo
                    </Button>
                  )}
                </CardFooter>

                {/* Expanded Details */}
                {selectedProject === project.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700 -mx-6 px-6 py-6 mt-auto bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-6">
                      
                      {/* Long Description */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Project Overview
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {project.longDescription}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* All Technologies */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              size="xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Results */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Challenges
                          </h4>
                          <div className="space-y-2">
                            {project.challenges.map((challenge, challengeIndex) => (
                              <div key={challengeIndex} className="flex items-start space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{challenge}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Results
                          </h4>
                          <div className="space-y-2">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-start space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* More Projects CTA */}
        <RevealTransition direction="up" threshold={0.1} className="text-center mt-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Want to See More?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These are just a few highlights from my portfolio. I have more projects 
              and experiments available on my GitHub profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                gradient
                glowing
                className="group"
                onClick={() => window.open('https://github.com/vasanthkumar-n', '_blank')}
                rightIcon={
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
              >
                View All Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                rightIcon={
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
              >
                Let's Discuss Your Project
              </Button>
            </div>
          </div>
        </RevealTransition>
      </div>
    </section>
  );
};

export default Projects;