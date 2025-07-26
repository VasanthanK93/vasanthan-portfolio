import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollAnimationOptions } from "@/types";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Hook for staggered animations with better performance
export const useStaggeredAnimation = (itemCount: number, options: ScrollAnimationOptions = {}) => {
    const { ref, isInView } = useScrollAnimation(options);
    const [visibleItems, setVisibleItems] = useState<number[]>([0,1,2,3,4,5,6,7,8,9,10]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
    const clearTimeouts = useCallback(() => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    }, []);
  
    useEffect(() => {
      if (isInView && visibleItems.length === 0) {
        clearTimeouts(); // Clear any existing timeouts
        
        for (let i = 0; i < itemCount; i++) {
          const timeout = setTimeout(() => {
            setVisibleItems(prev => [...prev, i]);
          }, i * 100); // 100ms delay between each item
          
          timeoutsRef.current.push(timeout);
        }
      }
  
      return clearTimeouts;
    }, [isInView, itemCount, visibleItems.length, clearTimeouts]);
  
    const isItemVisible = useCallback((index: number) => visibleItems.includes(index), [visibleItems]);
  
    return { ref, isInView, isItemVisible, visibleCount: visibleItems.length };
  };