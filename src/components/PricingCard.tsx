
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PaymentButton from './PaymentButton';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: Array<{ title: string; available: boolean }>;
  popular?: boolean;
  icon?: React.ReactNode;
  ram: string;
  cpu: string;
  storage: string;
  players: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  features,
  popular = false,
  icon,
  ram,
  cpu,
  storage,
  players,
  buttonText,
}) => {
  return (
    <Card className={`flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${popular ? 'border-primary shadow-md' : 'border-border'}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge variant="default" className="bg-primary text-primary-foreground font-medium px-3 py-1">Most Popular</Badge>
        </div>
      )}
      
      <CardHeader className={`pb-8 pt-6 ${popular ? 'bg-primary/5' : ''} rounded-t-lg`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {icon && (
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mr-4">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">/month</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-sm p-3 bg-secondary/30 rounded-lg">
          <div className="p-2">
            <p className="text-muted-foreground">RAM</p>
            <p className="font-medium">{ram}</p>
          </div>
          <div className="p-2">
            <p className="text-muted-foreground">CPU</p>
            <p className="font-medium">{cpu}</p>
          </div>
          <div className="p-2">
            <p className="text-muted-foreground">Storage</p>
            <p className="font-medium">{storage}</p>
          </div>
          <div className="p-2">
            <p className="text-muted-foreground">Players</p>
            <p className="font-medium">{players}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <div className={`mr-2 mt-0.5 ${feature.available ? 'text-primary' : 'text-muted-foreground'}`}>
                <Check size={16} className={feature.available ? 'opacity-100' : 'opacity-30'} />
              </div>
              <span className={`text-sm ${!feature.available ? 'text-muted-foreground' : ''}`}>
                {feature.title}
              </span>
            </div>
          ))}
        </div>
        
        <PaymentButton 
          planName={name} 
          planPrice={price} 
          buttonText={buttonText}
          className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}
        />
      </CardContent>
    </Card>
  );
};

export default PricingCard;
