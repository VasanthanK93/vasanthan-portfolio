import { useRef, useState, useEffect } from "react";

// Hook for parallax scrolling effect with throttling
export const useParallaxScroll = (speed: number = 0.5, throttleMs: number = 16) => {
    const [offset, setOffset] = useState(0);
    const throttleRef = useRef<number | null>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (throttleRef.current !== null) return;
        
        throttleRef.current = window.setTimeout(() => {
          setOffset(window.pageYOffset * speed);
          throttleRef.current = null;
        }, throttleMs);
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (throttleRef.current !== null) {
          clearTimeout(throttleRef.current);
        }
      };
    }, [speed, throttleMs]);
  
    return offset;
  };
  