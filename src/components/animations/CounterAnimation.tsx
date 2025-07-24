import React, { useEffect, useRef, useState } from 'react';
import safeIntersectionObserver from '@/lib/safeIntersectionObserver ';
import { CounterAnimationProps } from '@/types';

// Easing functions
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
};

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  decimals = 0,
  separator = ',',
  prefix = '',
  suffix = '',
  easingFunction = easingFunctions.easeOutCubic,
  onStart,
  onComplete,
  onUpdate,
  triggerOnScroll = true,
  scrollThreshold = 0.3,
  className = '',
  style = {},
}) => {
  const [currentValue, setCurrentValue] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Format number with separators and decimals
  const formatNumber = (value: number): string => {
    const fixedValue = value.toFixed(decimals);
    const parts = fixedValue.split('.');
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return parts.join('.');
  };

  // Animation function
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      if (onStart) onStart();
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const easedProgress = easingFunction(progress);
    
    const currentVal = from + (to - from) * easedProgress;
    setCurrentValue(currentVal);
    
    if (onUpdate) onUpdate(currentVal);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCurrentValue(to);
      if (onComplete) onComplete();
    }
  };

  // Start animation
  const startAnimation = () => {
    if (hasStarted) return;
    
    setHasStarted(true);
    startTimeRef.current = 0;
    
    // Apply delay
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, delay * 1000);
  };

  // Intersection Observer for scroll trigger
  useEffect(() => {
  if (!triggerOnScroll) {
    startAnimation();
    return;
  }

  console.log('CounterAnimation scrollThreshold:', scrollThreshold, typeof scrollThreshold);

  const observer = safeIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setIsInView(true);
        startAnimation();
      }
    },
    {
      threshold: scrollThreshold,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  if (counterRef.current) {
    observer.observe(counterRef.current);
  }

  return () => {
    if (counterRef.current) {
      observer.unobserve(counterRef.current);
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, [triggerOnScroll, scrollThreshold, hasStarted]);

  return (
    <span
      ref={counterRef}
      className={className}
      style={style}
    >
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  );
};

export default CounterAnimation;

// Utility component for multiple counters with stagger effect
export const StaggeredCounters: React.FC<{
  counters: Array<{
    to: number;
    label?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }>;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  counterClassName?: string;
  labelClassName?: string;
}> = ({
  counters,
  staggerDelay = 0.2,
  duration = 2,
  className = '',
  counterClassName = '',
  labelClassName = '',
}) => {
  return (
    <div className={className}>
      {counters.map((counter, index) => (
        <div key={index} className="counter-item">
          <CounterAnimation
            to={counter.to}
            duration={duration}
            delay={index * staggerDelay}
            decimals={counter.decimals}
            prefix={counter.prefix}
            suffix={counter.suffix}
            className={counterClassName}
          />
          {counter.label && (
            <div className={labelClassName}>{counter.label}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// Preset counter configurations
export const counterPresets = {
  currency: {
    prefix: '$',
    separator: ',',
    decimals: 2,
    duration: 2.5,
    easingFunction: easingFunctions.easeOutCubic,
  },
  percentage: {
    suffix: '%',
    decimals: 1,
    duration: 1.5,
    easingFunction: easingFunctions.easeOutQuad,
  },
  whole: {
    separator: ',',
    decimals: 0,
    duration: 2,
    easingFunction: easingFunctions.easeOutCubic,
  },
  decimal: {
    separator: ',',
    decimals: 2,
    duration: 2,
    easingFunction: easingFunctions.easeOutCubic,
  },
  fast: {
    duration: 1,
    easingFunction: easingFunctions.easeOutQuad,
  },
  slow: {
    duration: 4,
    easingFunction: easingFunctions.easeInOutCubic,
  },
};