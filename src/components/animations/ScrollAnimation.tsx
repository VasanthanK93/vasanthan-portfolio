import React, { useEffect, useRef, useState } from 'react';

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'rotateIn';
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, triggerOnce, hasTriggered]);

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      transitionDelay: `${delay}s`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return {
            ...baseStyles,
            opacity: 0,
          };
        case 'slideUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(50px)',
          };
        case 'slideDown':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(-50px)',
          };
        case 'slideLeft':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(50px)',
          };
        case 'slideRight':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-50px)',
          };
        case 'scaleUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale(0.8)',
          };
        case 'rotateIn':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'rotate(-10deg) scale(0.9)',
          };
        default:
          return {
            ...baseStyles,
            opacity: 0,
          };
      }
    }

    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1) rotate(0)',
    };
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;

// Utility hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, baseDelay: number = 0, staggerDelay: number = 0.1) => {
  return Array.from({ length: itemCount }, (_, index) => ({
    delay: baseDelay + (index * staggerDelay),
  }));
};

// Higher-order component for easier usage
export const withScrollAnimation = <P extends object>(
  Component: React.ComponentType<P>,
  animationProps: Partial<ScrollAnimationProps> = {}
) => {
  return React.forwardRef<HTMLDivElement, P & { scrollAnimationProps?: Partial<ScrollAnimationProps> }>((props, ref) => {
    const { scrollAnimationProps, ...componentProps } = props;
    
    return (
      <ScrollAnimation {...animationProps} {...scrollAnimationProps}>
        <Component {...(componentProps as P)} />
      </ScrollAnimation>
    );
  });
};

// Preset animation configurations
export const animationPresets = {
  fadeInUp: {
    animation: 'slideUp' as const,
    duration: 0.8,
    threshold: 0.1,
  },
  fadeInLeft: {
    animation: 'slideRight' as const,
    duration: 0.6,
    threshold: 0.15,
  },
  fadeInRight: {
    animation: 'slideLeft' as const,
    duration: 0.6,
    threshold: 0.15,
  },
  scaleIn: {
    animation: 'scaleUp' as const,
    duration: 0.7,
    threshold: 0.2,
  },
  rotateIn: {
    animation: 'rotateIn' as const,
    duration: 1,
    threshold: 0.1,
  },
};

// Component for animating lists with stagger effect
export const StaggeredList: React.FC<{
  children: React.ReactNode[];
  animation?: ScrollAnimationProps['animation'];
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
}> = ({
  children,
  animation = 'slideUp',
  staggerDelay = 0.1,
  baseDelay = 0,
  className = '',
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation
          key={index}
          animation={animation}
          delay={baseDelay + (index * staggerDelay)}
          triggerOnce={true}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
};