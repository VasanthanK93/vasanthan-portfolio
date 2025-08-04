'use client';

import React, { useState } from 'react';
import { RevealTransition, StaggeredTransition } from '@/components/animations/PageTransition';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import CounterAnimation from '@/components/animations/CounterAnimation';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedExperience, setSelectedExperience] = useState<number | null>(0);

  const tabs = [
    { id: 'experience', label: 'Work Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' }
  ];

  const experiences = [
    {
      id: 0,
      title: 'Senior Software Engineer',
      company: 'Tata Consultancy Services.',
      location: 'Chennai, Tamil Nadu',
      period: 'Aug 2019 - Present',
      duration: '6+ years',
      type: 'Full-time',
      description: 'Leading development of enterprise-scale web applications using modern technologies. Mentoring junior developers and architecting scalable solutions.',
      responsibilities: [
        'Led a team of 7, developing Humana Member Portal app with Vue.js frontend and GraphQL backend.',
        'Developed app that tracked 7.2 billion user steps participated in 2021 Go365 Wellness National Step Challenge.',
        'Achieved 90% unit test coverage through rigorous testing protocols.',
        'Ensured SonarQube quality checks compliance for robust code standards.',
        'Enhanced app performance and security by upgrading Node.js and MongoDB versions.',
        'Successfully integrated cutting-edge technologies for seamless healthcare application development.',
        'Optimised backend processes for improved data handling and user experience.',
        'Collaborate with product teams to deliver high-quality user experiences',
        'Worked on Estimating, Architecting new features and enhancements',
        'Participate in code reviews and provide constructive feedback',
        'Mentor junior developers and conduct code reviews',
      ],
      technologies: ['ReactJs', 'VueJs', 'Node.js', 'ExpressJs', 'GraphQL', 'AngularJs', 'TypeScript', 'Azure', 'MongoDB', 'Docker', 'Kubernetes', 'Adobe Experience Manager', 'Redis', 'RabbitMQ'],
      achievements: [
        'Reduced application load time by 40%',
        'Led migration of legacy systems to modern stack',
        'Implemented automated testing resulting in 95% code coverage',
        'Serve as a Subject Matter Expert (SME) in VueJs, ReactJs and Node.js',
        'Conduct training sessions for new hires and provide technical solutions to challenges across multiple projects',
        'Recognised and awarded "Technical Excellence Award" and "Beyond Excellence Award" for outstanding contributions to the team and projects'
      ],
      companyLogo: '🏢',
      companyColor: 'from-blue-500 to-blue-600'
    },
    {
      id: 1,
      title: 'Back-end Developer',
      company: 'Cholamandalam Investment and Finance Company Limited',
      location: 'Chennai, Tamil Nadu',
      period: 'Jul 2016 - Jul 2019',
      duration: '3 years',
      type: 'Full-time',
      description: 'Developed and maintained multiple products for the collection part of the company. Focused on backend development using Node.js and MongoDB, ensuring high performance and reliability.',
      responsibilities: [
        'Directed a team enhancing finance modules including legal, repo, sale, and shortfall for vehicle and home financing',
        'Streamlined backend processes improving efficiency in managing finance operations for vehicle and home sectors',
        'Implemented robust backend solutions ensuring compliance with financial regulations in vehicle and home finance',
        'Optimised data handling capabilities within finance modules leading to improved decision-making processes',
        'Collaborated with finance teams to ensure seamless integration and operation of backend modules'
      ],
      technologies: ['Node.js', 'AngularJs', 'Angular', 'MongoDB', 'MySQL', 'ExpressJs'],
      achievements: [
        'Successfully upgraded Legacy Nodejs and MongoDB versions, enhancing application performance and security',
        'Integrated Third-party APIs for payment processing and data validation, improving transaction efficiency',
        'optimised database queries, resulting in a 30% reduction in response time',
        'Implemented data visualisation tool using Angular for better financial reporting and analysis',
      ],
      companyLogo: '💡',
      companyColor: 'from-purple-500 to-purple-600'
    },
  ];

  const education = [
    {
      id: 0,
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'Anna University',
      location: 'Chennai, Tamil Nadu',
      period: '2015 - 2019',
      grade: '8.2 CGPA',
      description: 'Focused on software engineering, algorithms, and web technologies. Completed various projects in full-stack development.',
      coursework: [
        'Data Structures and Algorithms',
        'Database Management Systems',
        'Software Engineering',
        'Web Technologies',
        'Computer Networks',
        'Operating Systems'
      ],
      projects: [
        'E-commerce Web Application using MEAN Stack',
        'Student Management System with PHP and MySQL',
        'Real-time Chat Application using Socket.io'
      ],
      activities: [
        'Technical Lead - College Coding Club',
        'Organized programming workshops and hackathons',
        'Participated in inter-college coding competitions'
      ],
      logo: '🎓',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const certifications = [
    {
      id: 0,
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: 'March 2023',
      credentialId: 'AWS-DEV-2023-001',
      description: 'Demonstrates expertise in developing and maintaining applications on AWS platform.',
      skills: ['AWS Lambda', 'DynamoDB', 'S3', 'API Gateway', 'CloudFormation'],
      logo: '☁️',
      color: 'from-orange-500 to-orange-600',
      verifyUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 1,
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      date: 'January 2023',
      credentialId: 'MONGO-DEV-2023-001',
      description: 'Certified in MongoDB database design, development, and administration.',
      skills: ['MongoDB', 'Aggregation', 'Indexing', 'Replication', 'Sharding'],
      logo: '🍃',
      color: 'from-green-500 to-green-600',
      verifyUrl: 'https://university.mongodb.com/certification'
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuer: 'Meta (Facebook)',
      date: 'October 2022',
      credentialId: 'META-REACT-2022-001',
      description: 'Advanced certification in React development and modern frontend practices.',
      skills: ['React', 'Redux', 'Hooks', 'Context API', 'Testing'],
      logo: '⚛️',
      color: 'from-blue-500 to-blue-600',
      verifyUrl: 'https://developers.facebook.com/certification'
    },
    {
      id: 3,
      name: 'Google Cloud Platform Fundamentals',
      issuer: 'Google Cloud',
      date: 'August 2022',
      credentialId: 'GCP-FUND-2022-001',
      description: 'Foundational knowledge of Google Cloud Platform services and solutions.',
      skills: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Kubernetes Engine'],
      logo: '🌩️',
      color: 'from-blue-400 to-blue-500',
      verifyUrl: 'https://cloud.google.com/certification'
    }
  ];

  const stats = [
    { label: 'Years of Experience', value: 5, suffix: '+', icon: '💼' },
    { label: 'Domains Worked', value: 3, suffix: '+', icon: '🚀' },
    { label: 'Technologies Mastered', value: 20, suffix: '+', icon: '⚡' },
    { label: 'Certifications Earned', value: 5, suffix: '', icon: '🏆' }
  ];

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 5) return 'bg-green-500';
    if (proficiency >= 4) return 'bg-blue-500';
    if (proficiency >= 3) return 'bg-yellow-500';
    if (proficiency >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 5) return 'Expert';
    if (proficiency >= 4) return 'Advanced';
    if (proficiency >= 3) return 'Intermediate';
    if (proficiency >= 2) return 'Beginner';
    return 'Learning';
  };

  return (
    <section id="experience" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealTransition direction="up" className="text-center mb-16">
          <div className="space-y-4">
            <Badge variant="outline" size="lg" className="mb-4">
              <span className="mr-2">🎯</span>
              My Journey
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Experience & Skills
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {`Here's a comprehensive overview of my professional journey, education, 
              technical skills, and certifications that shape my expertise as a developer.`}
            </p>
          </div>
        </RevealTransition>

        {/* Stats Section */}
        <RevealTransition direction="up" threshold={0.2} className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                variant="glass"
                hover
                className="p-6 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <CounterAnimation
                    to={stat.value}
                    duration={2}
                    delay={0.5 + index * 0.2}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </RevealTransition>

        {/* Tab Navigation */}
        <RevealTransition direction="up" threshold={0.3} className="flex justify-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedExperience(null);
                  }}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300',
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
          
          {/* Work Experience Tab */}
          {activeTab === 'experience' && (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Experience List */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Career Timeline
                </h3>
                {experiences.map((exp, index) => (
                  <ScrollAnimation
                    key={exp.id}
                    animation="slideRight"
                    delay={index * 0.1}
                    threshold={0.1}
                  >
                    <Card
                      variant={selectedExperience === exp.id ? "elevated" : "outlined"}
                      hover
                      interactive
                      className={cn(
                        'p-4 cursor-pointer transition-all duration-300',
                        selectedExperience === exp.id && 'ring-2 ring-blue-500 border-blue-500'
                      )}
                      onClick={() => setSelectedExperience(exp.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0',
                          `bg-gradient-to-br ${exp.companyColor}`
                        )}>
                          {exp.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                            {exp.title}
                          </h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {exp.company}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {exp.period} • {exp.duration}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>

              {/* Experience Details */}
              <div className="lg:col-span-2">
                {selectedExperience !== null && (
                  <ScrollAnimation animation="fadeIn" threshold={0.1}>
                    <Card variant="elevated" className="p-8">
                      {(() => {
                        const exp = experiences[selectedExperience];
                        return (
                          <div className="space-y-6">
                            
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={cn(
                                  'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl',
                                  `bg-gradient-to-br ${exp.companyColor}`
                                )}>
                                  {exp.companyLogo}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {exp.title}
                                  </h3>
                                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                                    {exp.company}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    <span>📍 {exp.location}</span>
                                    <span>📅 {exp.period}</span>
                                    <Badge variant="outline" size="xs">
                                      {exp.type}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {exp.description}
                            </p>

                            {/* Responsibilities */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Key Responsibilities
                              </h4>
                              <div className="grid gap-2">
                                {exp.responsibilities.map((responsibility, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-400">{responsibility}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, idx) => (
                                  <Badge key={idx} variant="secondary" size="sm">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Achievements */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Key Achievements
                              </h4>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {exp.achievements.map((achievement, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </Card>
                  </ScrollAnimation>
                )}

                {selectedExperience === null && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">👈</div>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Select an experience to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <ScrollAnimation
                  key={edu.id}
                  animation="slideUp"
                  delay={index * 0.2}
                  threshold={0.1}
                >
                  <Card variant="elevated" hover className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0',
                        `bg-gradient-to-br ${edu.color}`
                      )}>
                        {edu.logo}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                            {edu.institution}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span>📍 {edu.location}</span>
                            <span>📅 {edu.period}</span>
                            {edu.grade && (
                              <Badge variant="success" size="sm">
                                {edu.grade}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {edu.description}
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {edu.coursework && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Key Coursework
                              </h4>
                              <div className="space-y-1">
                                {edu.coursework.map((course, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                    • {course}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {edu.projects && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Major Projects
                              </h4>
                              <div className="space-y-1">
                                {edu.projects.map((project, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                    • {project}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {edu.activities && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Activities
                              </h4>
                              <div className="space-y-1">
                                {edu.activities.map((activity, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                    • {activity}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <ScrollAnimation
                  key={cert.id}
                  animation="slideUp"
                  delay={index * 0.1}
                  threshold={0.1}
                >
                  <Card variant="elevated" hover className="p-6 h-full flex flex-col">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0',
                        `bg-gradient-to-br ${cert.color}`
                      )}>
                        {cert.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <span>📅 {cert.date}</span>
                          <Badge variant="outline" size="xs">
                            ID: {cert.credentialId}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                      {cert.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                          Skills Covered
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" size="xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        className="group"
                        onClick={() => window.open(cert.verifyUrl, '_blank')}
                        rightIcon={
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        }
                      >
                        Verify Certificate
                      </Button>
                    </div>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <RevealTransition direction="up" threshold={0.1} className="text-center mt-20">
          <Card variant="glass" className="p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready to Work Together?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {`With my diverse experience and proven track record, I'm ready to take on your next project. 
                Let's discuss how I can help bring your ideas to life.`}
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
                  Get in Touch
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => {
                    const resumeUrl = 'https://drive.google.com/uc?export=download&id=18p-b24F1C47cFvyrtIVodmvq1JblQGCI';
                    const link = document.createElement('a');
                    link.href = resumeUrl;
                    link.download = 'Vasanthan_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  rightIcon={
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </Card>
        </RevealTransition>
      </div>
    </section>
  );
};

export default Experience;