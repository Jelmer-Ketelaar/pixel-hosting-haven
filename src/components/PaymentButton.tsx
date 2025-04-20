
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface PaymentButtonProps {
  planName: string;
  planPrice: string;
  buttonText: string;
  className?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  planName, 
  planPrice, 
  buttonText,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [securityToken, setSecurityToken] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const lastClickTime = useRef<number>(0);
  const requestTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rate limiting for payment attempts
  const isRateLimited = paymentAttempts > 3;
  
  // Generate a new security token on component mount
  useEffect(() => {
    setSecurityToken(uuidv4());
    
    return () => {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
    };
  }, []);

  // Reset rate limiting after 5 minutes
  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => {
        setPaymentAttempts(0);
      }, 300000); // 5 minutes
      
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  const handlePayment = useCallback(async () => {
    // Enhanced timing attack prevention
    const now = Date.now();
    if (now - lastClickTime.current < 1000) {
      toast({
        title: "Please slow down",
        description: "Too many payment attempts in quick succession",
        variant: "destructive",
      });
      setPaymentAttempts(prev => prev + 1);
      return;
    }
    lastClickTime.current = now;
    
    if (isRateLimited) {
      toast({
        title: "Security Alert",
        description: "Too many attempts detected. Please wait 5 minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      // User needs to sign in first
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    setPaymentAttempts(prev => prev + 1);

    try {
      // Get the session for the logged-in user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required');
      }

      // Add enhanced security tokens to the request
      const requestId = uuidv4();
      const timestamp = new Date().toISOString();
      const signature = btoa(`${requestId}:${user.id}:${timestamp}:${securityToken}`);
      
      // Set timeout to abort long-running requests
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 10000);
      requestTimeoutRef.current = timeoutId;
      
      // Call the Supabase edge function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planName, 
          planPrice,
          securityToken,
          requestId,
          timestamp,
          signature
        },
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      requestTimeoutRef.current = null;

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Generate a new security token for next use
        setSecurityToken(uuidv4());
        
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      // Enhanced error messages based on error type
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.status === 401) {
        errorMessage = 'Your session has expired. Please sign in again.';
        // Force logout on auth errors
        setTimeout(() => supabase.auth.signOut(), 1000);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Payment Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, planName, planPrice, navigate, isRateLimited, securityToken]);

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading || isRateLimited}
      className={`${className} relative overflow-hidden group`}
      aria-busy={isLoading}
      data-testid="payment-button"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : isRateLimited ? (
        <>
          <AlertTriangle className="mr-2 h-4 w-4 text-yellow-400" />
          Security cooldown
        </>
      ) : (
        <>
          {buttonText}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 animate-pulse-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </>
      )}
      
      {!isLoading && !isRateLimited && (
        <ShieldCheck className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Button>
  );
};

export default PaymentButton;
