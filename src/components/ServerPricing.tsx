
import React, { useState } from 'react';
import PricingCard from './PricingCard';
import Button from './Button';
import { Database, Globe, Server } from 'lucide-react';

const ServerPricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const features = [
    { title: 'Instant Setup', available: true },
    { title: 'DDoS Protection', available: true },
    { title: '24/7 Support', available: true },
    { title: 'Automated Backups', available: true },
    { title: 'Custom Domain', available: false },
    { title: 'Plugin Support', available: true },
    { title: 'Mod Support', available: true },
  ];
  
  const premiumFeatures = [
    { title: 'Instant Setup', available: true },
    { title: 'DDoS Protection', available: true },
    { title: '24/7 Support', available: true },
    { title: 'Automated Backups', available: true },
    { title: 'Custom Domain', available: true },
    { title: 'Plugin Support', available: true },
    { title: 'Mod Support', available: true },
    { title: 'Priority Support', available: true },
  ];
  
  const enterpriseFeatures = [
    { title: 'Instant Setup', available: true },
    { title: 'DDoS Protection', available: true },
    { title: '24/7 Support', available: true },
    { title: 'Automated Backups', available: true },
    { title: 'Custom Domain', available: true },
    { title: 'Plugin Support', available: true },
    { title: 'Mod Support', available: true },
    { title: 'Priority Support', available: true },
    { title: 'Dedicated IP', available: true },
    { title: 'Enterprise SLA', available: true },
  ];
  
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
          name="Starter"
          description="Perfect for small communities"
          price={billingPeriod === 'monthly' ? '€4.99' : '€47.90'}
          features={features}
          icon={<Globe size={24} />}
          ram="2GB"
          cpu="1 vCore"
          storage="10GB SSD"
          players="Up to 10"
        />
        
        <PricingCard
          name="Premium"
          description="Ideal for growing servers"
          price={billingPeriod === 'monthly' ? '€9.99' : '€95.90'}
          features={premiumFeatures}
          popular={true}
          icon={<Database size={24} />}
          ram="6GB"
          cpu="2 vCores"
          storage="25GB SSD"
          players="Up to 40"
        />
        
        <PricingCard
          name="Enterprise"
          description="For large communities"
          price={billingPeriod === 'monthly' ? '€19.99' : '€191.90'}
          features={enterpriseFeatures}
          icon={<Server size={24} />}
          ram="12GB"
          cpu="4 vCores"
          storage="50GB SSD"
          players="Up to 100"
        />
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Need a custom solution?</p>
        <h3 className="text-2xl font-bold mb-6">Contact us for a tailored server setup</h3>
        <Button>Contact Sales</Button>
      </div>
    </section>
  );
};

export default ServerPricing;
