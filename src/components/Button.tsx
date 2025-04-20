
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  protected?: boolean;
  clickThreshold?: number; // Number of clicks before rate limiting
  cooldownTime?: number; // Cooldown time in ms
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  protected: isProtected = false,
  clickThreshold = 10,
  cooldownTime = 2000,
  ...props
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [rippleArray, setRippleArray] = useState<Array<{ x: number; y: number; size: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleTimeout = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastCoords = useRef<{x: number, y: number} | null>(null);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (rippleTimeout.current) clearTimeout(rippleTimeout.current);
      if (cooldownTimeout.current) clearTimeout(cooldownTimeout.current);
    };
  }, []);
  
  // Reset cooldown after specified time
  useEffect(() => {
    if (cooldown) {
      cooldownTimeout.current = setTimeout(() => {
        setCooldown(false);
        setClickCount(0);
      }, cooldownTime);
      
      return () => {
        if (cooldownTimeout.current) clearTimeout(cooldownTimeout.current);
      };
    }
  }, [cooldown, cooldownTime]);
  
  // Add ripple effect
  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Prevent fake clicks by checking if coordinates are exactly the same
    if (lastCoords.current && 
        lastCoords.current.x === x && 
        lastCoords.current.y === y) {
      return;
    }
    
    lastCoords.current = {x, y};
    
    // Size should be at least the button's diagonal length for full coverage
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now();
    
    setRippleArray([...rippleArray, { x, y, size, id }]);
    
    // Remove ripple after animation
    rippleTimeout.current = setTimeout(() => {
      setRippleArray(prevState => prevState.filter(ripple => ripple.id !== id));
    }, 800);
  };
  
  // Enhanced click handler with rate limiting and security checks
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add visual ripple effect
    addRipple(e);
    
    const now = Date.now();
    
    // Prevent extremely rapid clicks (potential attack)
    if (now - lastClickTime < 100) {
      e.preventDefault();
      setClickCount(prev => prev + 1);
      
      if (clickCount > 2) {
        setCooldown(true);
      }
      return;
    }
    
    setLastClickTime(now);
    setClickCount(prev => prev + 1);
    
    // Reset click count after cooldown time if not in rapid succession
    if (now - lastClickTime > 500) {
      setTimeout(() => {
        if (Date.now() - now > 500) {
          setClickCount(0);
        }
      }, cooldownTime);
    }
    
    // Allow normal click if not rate limited
    if (clickCount < clickThreshold && !cooldown && props.onClick && !isLoading && !props.disabled) {
      props.onClick(e);
    } else if (clickCount >= clickThreshold && !cooldown) {
      e.preventDefault();
      setCooldown(true);
      console.warn('Button action rate limited');
    } else if (cooldown) {
      e.preventDefault();
    }
  };
  
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 button-animation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
  };
  
  return (
    <button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isProtected ? 'after:content-[""] after:absolute after:inset-0 after:bg-transparent after:pointer-events-none hover:after:bg-white/5' : '',
        cooldown ? 'cursor-not-allowed bg-gray-400 text-gray-700' : '',
        className
      )}
      disabled={isLoading || cooldown || clickCount >= clickThreshold || props.disabled}
      onClick={handleClick}
      aria-busy={isLoading}
      data-testid="enhanced-button"
      data-rate-limited={cooldown ? "true" : "false"}
      {...props}
    >
      {/* Ripple elements */}
      {rippleArray.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/20 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    
      {isLoading ? (
        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" />
      ) : (
        !cooldown && leftIcon && <span className="mr-2">{leftIcon}</span>
      )}
      
      <span className="relative z-10">
        {cooldown ? 'Please wait...' : children}
      </span>
      
      {!isLoading && !cooldown && rightIcon && <span className="ml-2">{rightIcon}</span>}
      
      {/* Enhanced hover effect */}
      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
    </button>
  );
};

export default Button;
