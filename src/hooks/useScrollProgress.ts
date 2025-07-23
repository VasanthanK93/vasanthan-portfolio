import { useRef, useState, useEffect } from "react";

// Hook for scroll progress with better performance
export const useScrollProgress = (throttleMs: number = 16) => {
    const [progress, setProgress] = useState(0);
    const throttleRef = useRef<number | null>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (throttleRef.current !== null) return;
        
        throttleRef.current = window.setTimeout(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
          setProgress(Math.min(Math.max(currentProgress, 0), 100));
          throttleRef.current = null;
        }, throttleMs);
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (throttleRef.current !== null) {
          clearTimeout(throttleRef.current);
        }
      };
    }, [throttleMs]);
  
    return progress;
  };
  