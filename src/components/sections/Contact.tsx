'use client';

import React, { useState } from 'react';
import { RevealTransition, StaggeredTransition } from '@/components/animations/PageTransition';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import Card, { CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'vasanthank29@gmail.com',
      href: 'mailto:vasanthank29@gmail.com',
      description: 'Send me an email',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 9884252651',
      href: 'tel:+91 9884252651',
      description: 'Give me a call',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Chennai, Tamil Nadu, India',
      href: 'https://maps.google.com/?q=Chennai,Tamil+Nadu,India',
      description: 'Available for work',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Vasanthank',
      href: 'https://www.linkedin.com/in/vasanthank/',
      description: 'Connect with me',
      color: 'from-blue-600 to-blue-700'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      href: 'https://github.com/VasanthanK93',
      bgColor: 'hover:bg-gray-900 dark:hover:bg-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: 'https://www.linkedin.com/in/vasanthank/',
      bgColor: 'hover:bg-blue-600'
    },
    {
      name: 'Medium',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      ),
      href: 'https://medium.com/@vasanthancomrads',
      bgColor: 'hover:bg-green-600'
    },
    // {
    //   name: 'Twitter',
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    //     </svg>
    //   ),
    //   href: 'https://twitter.com/vasanthkumar_n',
    //   bgColor: 'hover:bg-blue-500'
    // }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealTransition direction="up" className="text-center mb-16">
          <div className="space-y-4">
            <Badge variant="outline" size="lg" className="mb-4">
              <span className="mr-2">📧</span>
              Get In Touch
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I'm always excited to discuss new opportunities, interesting projects, 
              or just have a friendly conversation about technology and development.
            </p>
          </div>
        </RevealTransition>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <RevealTransition direction="right" threshold={0.3}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Feel free to reach out through any of these channels. I typically respond 
                  within 24 hours and I'm always happy to help with any questions you might have.
                </p>
              </div>
            </RevealTransition>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <ScrollAnimation
                  key={contact.label}
                  animation="slideRight"
                  delay={index * 0.1}
                  threshold={0.1}
                >
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block group"
                  >
                    <Card variant="outlined" hover interactive className="p-6 transition-all duration-300 group-hover:shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110',
                          `bg-gradient-to-br ${contact.color}`
                        )}>
                          {contact.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {contact.label}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {contact.value}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {contact.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </a>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <div className="space-y-8">
               {/* Social Links */}
            <RevealTransition direction="right" threshold={0.6}>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Follow Me
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-gray-600 dark:text-gray-400 hover:text-white',
                        social.bgColor
                      )}
                      aria-label={`Follow me on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </RevealTransition>

            {/* Availability Status */}
            <RevealTransition direction="right" threshold={0.8}>
              <Card variant="glass" className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Available for Projects
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I'm currently open to new opportunities and collaborations
                    </p>
                  </div>
                </div>
              </Card>
            </RevealTransition>
            </div>

          {/* Contact Form */}
          {/* <div className="space-y-8">
            <RevealTransition direction="left" threshold={0.3}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Have a project in mind? Let's discuss how we can work together 
                  to bring your ideas to life.
                </p>
              </div>
            </RevealTransition>

            <RevealTransition direction="left" threshold={0.4}>
              <Card variant="elevated" className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      fullWidth
                      gradient
                      glowing
                      className="group"
                      rightIcon={
                        !isSubmitting && (
                          <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )
                      }
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-green-800 dark:text-green-200 font-medium">
                            Message sent successfully! I'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-red-800 dark:text-red-200 font-medium">
                            Something went wrong. Please try again or contact me directly.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </Card>
            </RevealTransition>

            <RevealTransition direction="left" threshold={0.6}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => window.open('mailto:vasanthkumar.n01@gmail.com?subject=Project%20Inquiry&body=Hi%20Vasanthan,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.', '_blank')}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Quick Email
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => window.open('https://calendly.com/vasanthkumar-n01/30min', '_blank')}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Schedule Call
                </Button>
              </div>
            </RevealTransition>
          </div>
        </div> */}

        {/* FAQ Section */}
        {/* <RevealTransition direction="up" threshold={0.1} className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some common questions I get asked about my work and process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your typical response time?",
                answer: "I usually respond to emails and messages within 24 hours, often much sooner during business hours."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! I work with clients from around the world and am comfortable with different time zones."
              },
              {
                question: "What's your development process like?",
                answer: "I follow an agile approach with regular communication, milestone reviews, and iterative development to ensure quality results."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, I offer various support packages including maintenance, updates, and technical assistance after project completion."
              }
            ].map((faq, index) => (
              <ScrollAnimation
                key={index}
                animation="fadeIn"
                delay={index * 0.1}
                threshold={0.1}
              >
                <Card variant="outlined" hover className="p-6 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </RevealTransition> */}
      </div>
      </div>
    </section>
  );
};

export default Contact;