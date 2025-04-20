
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

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
  const { user } = useAuth();
  const navigate = useNavigate();

  // Rate limiting for payment attempts
  const isRateLimited = paymentAttempts > 5;

  const handlePayment = useCallback(async () => {
    if (isRateLimited) {
      toast({
        title: "Too many attempts",
        description: "Please wait a few minutes before trying again.",
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

      // Add security token to the request
      const securityToken = btoa(new Date().getTime().toString());
      
      // Call the Supabase edge function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planName, 
          planPrice,
          securityToken
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, planName, planPrice, navigate, isRateLimited]);

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading || isRateLimited}
      className={`${className} relative overflow-hidden`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : isRateLimited ? (
        <>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Try again later
        </>
      ) : (
        <>
          {buttonText}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 animate-pulse-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
