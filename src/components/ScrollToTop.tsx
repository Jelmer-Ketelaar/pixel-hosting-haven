
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down with debouncing for performance
  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Set the scroll event listener with passive option for performance
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  // Scroll to top function with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <Button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
