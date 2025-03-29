
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

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
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      // User needs to sign in first
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    try {
      // Get the session for the logged-in user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Authentication required');
      }

      // Call the Supabase edge function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planName, planPrice },
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
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default PaymentButton;
