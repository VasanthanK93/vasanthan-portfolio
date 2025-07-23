import { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollAnimationOptions } from '@/types';

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    amount = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px'
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsInView(false);
        }
      },
      {
        threshold: typeof amount === 'number' ? amount : 0.1,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [amount, triggerOnce, rootMargin, hasTriggered]);

  return { ref, isInView, hasTriggered };
};

// Hook for counter animation with better performance
// export const useCounterAnimation = (
//   endValue: number,
//   options: ScrollAnimationOptions & { 
//     duration?: number; 
//     startValue?: number;
//     easingFunction?: (t: number) => number;
//   } = {}
// ) => {
//   const { duration = 2000, startValue = 0, easingFunction } = options;
//   const { ref, isInView } = useScrollAnimation(options);
//   const [count, setCount] = useState(startValue);
//   const animationRef = useRef<number>();

//   // Default easing function
//   const defaultEasing = useCallback((t: number) => {
//     return 1 - Math.pow(1 - t, 4); // easeOutQuart
//   }, []);

//   useEffect(() => {
//     if (isInView && count === startValue) {
//       let startTime: number;
//       const easing = easingFunction || defaultEasing;

//       const animate = (currentTime: number) => {
//         if (!startTime) startTime = currentTime;
//         const progress = Math.min((currentTime - startTime) / duration, 1);
        
//         const easedProgress = easing(progress);
//         const currentValue = startValue + (endValue - startValue) * easedProgress;
        
//         setCount(Math.floor(currentValue));

//         if (progress < 1) {
//           animationRef.current = requestAnimationFrame(animate);
//         } else {
//           setCount(endValue);
//         }
//       };

//       animationRef.current = requestAnimationFrame(animate);
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isInView, endValue, duration, startValue, count, easingFunction, defaultEasing]);

//   return { ref, count, isInView, progress: count / endValue };
// };