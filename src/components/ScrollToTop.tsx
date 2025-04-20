
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);

  // Enhanced toggle visibility with debounce and direction detection
  const toggleVisibility = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    
    // Only update state when necessary (>100px change or crossing threshold)
    const threshold = 400;
    const significantChange = Math.abs(currentScrollY - lastScrollY.current) > 100;
    const crossingThreshold = (currentScrollY > threshold && lastScrollY.current <= threshold) || 
                              (currentScrollY <= threshold && lastScrollY.current > threshold);
    
    if (significantChange || crossingThreshold) {
      setIsVisible(currentScrollY > threshold);
      lastScrollY.current = currentScrollY;
    }
    
    // Handle scroll animation detection
    if (isScrolling) {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 100);
    }
  }, [isScrolling]);

  // Set the scroll event listener with throttling for performance
  useEffect(() => {
    let scrollTimer: number;
    
    const handleScroll = () => {
      if (scrollTimer) window.cancelAnimationFrame(scrollTimer);
      scrollTimer = window.requestAnimationFrame(() => {
        toggleVisibility();
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (scrollTimer) window.cancelAnimationFrame(scrollTimer);
    };
  }, [toggleVisibility]);

  // Enhanced scroll to top function with smooth behavior and handling
  const scrollToTop = () => {
    setIsScrolling(true);
    
    // Check if native smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Fallback for browsers without smooth scrolling
      const scrollStep = -window.scrollY / 20;
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
          setIsScrolling(false);
        }
      }, 15);
    }
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
      data-testid="scroll-to-top"
    >
      <Button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        size="icon"
        disabled={isScrolling}
        className={`h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white transition-all ${
          isScrolling ? 'animate-pulse' : 'hover:shadow-xl hover:scale-105'
        }`}
      >
        <ChevronUp className={`h-6 w-6 ${isScrolling ? 'animate-bounce' : ''}`} />
      </Button>
    </div>
  );
};

export default ScrollToTop;
