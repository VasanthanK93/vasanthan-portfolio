'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RevealTransition, StaggeredTransition } from '@/components/animations/PageTransition';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';
import Card, { CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import profilePic from '../../../public/Images/profile.png'; // Adjust the path as necessary

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('story');
  const { ref: timelineRef, isItemVisible } = useStaggeredAnimation(6);

  // Personal story highlights
  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Problem Solver',
      description: 'I love turning complex problems into elegant, simple solutions.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Learner',
      description: 'Always adapting to new technologies and staying ahead of trends.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Team Player',
      description: 'Collaborating effectively with cross-functional teams to deliver results.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'User-Focused',
      description: 'Creating experiences that users love and find intuitive to use.'
    }
  ];

  // Professional journey timeline
  const timeline = [
    {
      year: '2016',
      title: 'Started My Journey at cholamandalam Investment and Finance Pvt Ltd',
      description: 'Began My career as a Test Engineer, testing web and mobile applications.and later transitioned to Backend Development in NodeJs and MongoDB.',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600'
    },
    {
      year: '2019',
      title: 'Got Placed at TCS',
      description: 'Joined Tata Consultancy Services as a Software Engineer, Where I started my journey as a backend developer and later transitioned to full-stack development.',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      year: '2019',
      title: 'First Full Stack Project',
      description: 'Started working as a full-stack developer in a US based Retail project, building my first complete web application using ReactJs, ExpressJs, NodeJs and MongoDB.',
      icon: '💼',
      color: 'from-purple-500 to-pink-600'
    },
    {
      year: '2020',
      title: 'Advanced Skills',
      description: 'Joined a US based Healthcare project, where I enhanced my skills in AngularJS, Angular and Docker',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      year: '2022',
      title: 'Volunteering for Chennai Cyclist',
      description: 'Started a Volunteering to a Chennai based Cycling Community "Chennai Cyclists" helping them to build and maintain their Main Site, Rider Site and Admin Site using Svelte and ReactJS',
      icon: '👑',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      year: '2022',
      title: 'Started Technical Lead Role',
      description: 'Joined a new team for a US based Healthcare project as a Technical Lead, where I led a team of developers to build scalable and maintainable applications using VueJS, NodeJs, GraphQL and .Net.',
      icon: '🎯',
      color: 'from-red-500 to-pink-600'
    },
    {
      year: '2025',
      title: 'Migration from Svelte to Nextjs',
      description: 'As part of the Chennai Cyclist project, I started combining and migrating the main site and Rider site  from Svelte to Next.js, enhancing performance and SEO.',
      icon: '🔄',
      color: 'from-red-500 to-pink-600'
    }
  ];

  // Core values
  const values = [
    {
      title: 'Quality First',
      description: 'I believe in writing clean, maintainable code that stands the test of time.',
      icon: '✨'
    },
    {
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and I stay current with the latest trends and best practices.',
      icon: '📚'
    },
    {
      title: 'User Experience',
      description: 'Every line of code I write considers the end user and their experience.',
      icon: '❤️'
    },
    {
      title: 'Collaboration',
      description: 'Great software is built by great teams working together towards common goals.',
      icon: '🤝'
    }
  ];

  // Interests and hobbies
  const interests = [
    { name: 'Cooking', icon: '👨‍🍳' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Music', icon: '🎵' },
    { name: 'Photography', icon: '📸' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Reading', icon: '📖' },
    { name: 'Hiking', icon: '🥾' },
    { name: 'Cycling', icon: '🚴‍♂️' },
    { name: 'Volunteering', icon: '🤲' },
    { name: 'Tech Blogging', icon: '📝' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Meditation', icon: '🧘‍♂️' }
  ];

  const tabs = [
    { id: 'story', label: 'My Story', icon: '📖' },
    { id: 'journey', label: 'Journey', icon: '🛤️' },
    { id: 'values', label: 'Values', icon: '💎' },
    { id: 'personal', label: 'Personal', icon: '🎨' }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealTransition direction="up" className="text-center mb-16">
          <div className="space-y-4">
            <Badge variant="outline" size="lg" className="mb-4">
              <span className="mr-2">👋</span>
              About Me
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Get to Know Me
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {`I'm a passionate full-stack developer who loves creating digital experiences 
              that make a difference. Here's my story.`}
            </p>
          </div>
        </RevealTransition>

        {/* Tab Navigation */}
        <RevealTransition direction="up" threshold={200} className="flex justify-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                  )}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </RevealTransition>

        {/* Content Based on Active Tab */}
        <div className="relative min-h-[600px]">
          
          {/* My Story Tab */}
          {activeTab === 'story' && (
            <div className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* Story Content */}
                <div className="space-y-8">
                  <RevealTransition direction="right" threshold={300}>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        From Curiosity to Expertise
                      </h3>
                      <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p>
                          My journey into web development started with curiosity. I was fascinated by how 
                          websites worked and wanted to create my own digital experiences. What began as 
                          a hobby quickly turned into a passion.
                        </p>
                        <p>
                          {`Over the years, I've had the privilege of working with amazing teams, 
                          building products that impact thousands of users, and continuously learning 
                          new technologies. Each project has taught me something valuable.`}
                        </p>
                        <p>
                          Today, I specialize in full-stack development with a focus on UI frameworks 
                          like ReactJs, VueJS, Angular, svelte, BackEnd technologies like NodeJs, 
                          ExpressJs, Graphql and databases like MongoDB and MySQL, content management 
                          system like AEM. I love the challenge of turning complex requirements 
                          into elegant, user-friendly solutions.
                        </p>
                      </div>
                    </div>
                  </RevealTransition>

                  {/* Key Highlights */}
                  <RevealTransition direction="right" threshold={500}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {highlights.map((highlight, index) => (
                        <Card
                          key={highlight.title}
                          variant="outlined"
                          hover
                          className="p-4 group"
                          style={{ animationDelay: `${500 + index * 100}ms` }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                              {highlight.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {highlight.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {highlight.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </RevealTransition>
                </div>

                {/* Profile Image with Stats */}
                <div className="relative">
                  <RevealTransition direction="left" threshold={400}>
                    <div className="relative">
                      {/* Main Image */}
                      <div className="relative w-full max-w-md mx-auto">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 p-1">
                          <Image
                            src={profilePic}// Add your about image
                            alt="Vasanthan working"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-3xl transition-transform duration-700 hover:scale-105"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                          />
                        </div>

                        {/* Floating Stats Cards */}
                        <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">9+</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Years Exp</div>
                          </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">6+</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealTransition>
                </div>
              </div>
            </div>
          )}

          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <div ref={timelineRef} className="space-y-8">
              <RevealTransition direction="up" threshold={300}>
                <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  My Professional Journey
                </h3>
              </RevealTransition>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />

                {/* Timeline Items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                      <div
                        key={item.year}
                        className={cn(
                          'relative flex items-center transition-all duration-700',
                          index % 2 === 0 ? 'justify-start' : 'justify-end'
                        )}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                          <div
                            className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-500',
                              `bg-gradient-to-br ${item.color}`,
                              isItemVisible(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                            )}
                          >
                            {item.icon}
                          </div>
                        </div>

                        {/* Timeline Content */}
                        <div
                          className={cn(
                            'w-5/12 transition-all duration-700',
                            index % 2 === 0 ? 'pr-8' : 'pl-8',
                            isItemVisible(index) 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-8'
                          )}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <Card variant="elevated" hover className="p-6 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" size="sm">
                                  {item.year}
                                </Badge>
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {item.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="space-y-12">
              <RevealTransition direction="up" threshold={300}>
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    What Drives Me
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    These core values guide every decision I make and every line of code I write.
                  </p>
                </div>
              </RevealTransition>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <RevealTransition
                    key={value.title}
                    direction="up"
                    threshold={400 + index * 100}
                  >
                    <Card variant="elevated" hover className="p-8 h-full group">
                      <div className="text-center space-y-4">
                        <div className="text-4xl mb-4">{value.icon}</div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {value.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </Card>
                  </RevealTransition>
                ))}
              </div>
            </div>
          )}

          {/* Personal Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-12">
              <RevealTransition direction="up" threshold={300}>
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Beyond Code
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {`When I'm not coding, you'll find me exploring these interests and hobbies.`}
                  </p>
                </div>
              </RevealTransition>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((interest, index) => (
                  <RevealTransition
                    key={interest.name}
                    direction="up"
                    threshold={400 + index * 50}
                  >
                    <Card 
                      variant="outlined" 
                      hover 
                      interactive
                      className="p-6 text-center group cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                          {interest.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {interest.name}
                        </h4>
                      </div>
                    </Card>
                  </RevealTransition>
                ))}
              </div>

              {/* Fun Facts */}
              <RevealTransition direction="up" threshold={800}>
                <Card variant="filled" className="p-8 text-center">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Fun Facts About Me
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl mb-2">☕</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Coffee cups per day: <span className="font-bold">4+</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">🌍</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          places visited: <span className="font-bold">5</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">📚</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Books read this year: <span className="font-bold">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </RevealTransition>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <RevealTransition direction="up" threshold={600} className="text-center mt-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {`Let's Work Together`}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {`I'm always excited to take on new challenges and collaborate on interesting projects.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                gradient
                glowing
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
                Start a Conversation
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                rightIcon={
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              >
                View My Work
              </Button>
            </div>
          </div>
        </RevealTransition>
      </div>
    </section>
  );
};

export default About;