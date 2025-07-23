// Hook for manual counter control
import { useState, useRef, useEffect } from "react";

// Define the props interface here to avoid circular imports
interface CounterHookProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  easingFunction?: (t: number) => number;
  onComplete?: () => void;
  onUpdate?: (value: number) => void;
}

// Easing functions (duplicated here to avoid circular imports)
const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

export const useCounter = (
  to: number,
  options: Partial<CounterHookProps> = {}
) => {
  const [currentValue, setCurrentValue] = useState(options.from || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startCounter = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = 0;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / ((options.duration || 2) * 1000), 1);
      const easingFn = options.easingFunction || easingFunctions.easeOutCubic;
      const easedProgress = easingFn(progress);
      
      const currentVal = (options.from || 0) + (to - (options.from || 0)) * easedProgress;
      setCurrentValue(currentVal);

      if (options.onUpdate) {
        options.onUpdate(currentVal);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(to);
        setIsAnimating(false);
        if (options.onComplete) options.onComplete();
      }
    };

    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, (options.delay || 0) * 1000);
  };

  const resetCounter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentValue(options.from || 0);
    setIsAnimating(false);
  };

  const pauseCounter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsAnimating(false);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    currentValue,
    isAnimating,
    startCounter,
    resetCounter,
    pauseCounter,
  };
};