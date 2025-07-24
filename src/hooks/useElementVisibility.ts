import { useRef, useState, useEffect } from "react";
import safeIntersectionObserver from '@/lib/safeIntersectionObserver ';

// Hook for element visibility detection
export const useElementVisibility = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
  const element = ref.current;
  if (!element) return;

  console.log('useElementVisibility options:', options);

  const observer = safeIntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.1,
      rootMargin: '0px',
      ...options
    }
  );

  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
}, [options]);

  
    return { ref, isVisible };
  };