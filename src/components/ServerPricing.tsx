
import React, { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import Button from './Button';
import { Database, Globe, Server } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { pricingPlans } from '@/data/pricingPlans';
import { toast } from '@/components/ui/use-toast';

const ServerPricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if the URL includes success or canceled parameters
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast({
        title: 'Payment Successful!',
        description: 'Thank you for your purchase. Your server is being set up.',
      });
      // Redirect to dashboard after successful payment
      navigate('/dashboard');
    } else if (canceled === 'true') {
      toast({
        title: 'Payment Canceled',
        description: 'Your payment was canceled. Please try again if you want to purchase a server.',
        variant: 'destructive',
      });
    }
  }, [location, navigate]);
  
  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Transparent Pricing
        </div>
        <h2 className="section-title">Choose Your Perfect <span className="text-gradient">Server Plan</span></h2>
        <p className="section-subtitle">
          Select a plan that matches your needs. All plans include our premium infrastructure and support.
        </p>
        
        <div className="flex items-center justify-center mt-8 mb-4">
          <div className="glass-effect p-1 rounded-full inline-flex">
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all relative ${
                billingPeriod === 'yearly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
              {billingPeriod === 'yearly' ? null : (
                <span className="absolute -top-3 -right-2 bg-minecraft-green text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          name={pricingPlans[0].name}
          description={pricingPlans[0].description}
          price={billingPeriod === 'monthly' ? '€4.99' : '€47.90'}
          features={pricingPlans[0].features}
          icon={<Globe size={24} />}
          ram={pricingPlans[0].resources.ram}
          cpu={pricingPlans[0].resources.cpu}
          storage={pricingPlans[0].resources.storage}
          players={pricingPlans[0].resources.players}
          buttonText={user ? "Subscribe Now" : "Get Started"}
        />
        
        <PricingCard
          name={pricingPlans[1].name}
          description={pricingPlans[1].description}
          price={billingPeriod === 'monthly' ? '€9.99' : '€95.90'}
          features={pricingPlans[1].features}
          popular={true}
          icon={<Database size={24} />}
          ram={pricingPlans[1].resources.ram}
          cpu={pricingPlans[1].resources.cpu}
          storage={pricingPlans[1].resources.storage}
          players={pricingPlans[1].resources.players}
          buttonText={user ? "Subscribe Now" : "Get Started"}
        />
        
        <PricingCard
          name={pricingPlans[2].name}
          description={pricingPlans[2].description}
          price={billingPeriod === 'monthly' ? '€19.99' : '€191.90'}
          features={pricingPlans[2].features}
          icon={<Server size={24} />}
          ram={pricingPlans[2].resources.ram}
          cpu={pricingPlans[2].resources.cpu}
          storage={pricingPlans[2].resources.storage}
          players={pricingPlans[2].resources.players}
          buttonText={user ? "Subscribe Now" : "Get Started"}
        />
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Need a custom solution?</p>
        <h3 className="text-2xl font-bold mb-6">Contact us for a tailored server setup</h3>
        <Button onClick={() => navigate('/contact')}>Contact Sales</Button>
      </div>
    </section>
  );
};

export default ServerPricing;
