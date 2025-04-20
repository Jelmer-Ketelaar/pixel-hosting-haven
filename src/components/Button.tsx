
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  protected?: boolean;
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
  ...props
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  // Rate limiting for rapid clicks
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    
    // Prevent extremely rapid clicks (potential attack)
    if (now - lastClickTime < 100) {
      e.preventDefault();
      return;
    }
    
    setLastClickTime(now);
    setClickCount(prev => prev + 1);
    
    // Reset click count after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
    
    // Allow normal click if not rate limited
    if (clickCount < 10 && props.onClick) {
      props.onClick(e);
    } else if (clickCount >= 10) {
      e.preventDefault();
      // Rate limited, prevent action
      console.warn('Button action rate limited');
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
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isProtected ? 'after:content-[""] after:absolute after:inset-0 after:bg-transparent after:pointer-events-none hover:after:bg-white/5' : '',
        className
      )}
      disabled={isLoading || clickCount >= 10 || props.disabled}
      onClick={handleClick}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      
      {/* Add ripple effect */}
      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
    </button>
  );
};

export default Button;
