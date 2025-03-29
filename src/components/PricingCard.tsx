
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PaymentButton from './PaymentButton';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
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
    <Card className={`flex flex-col h-full border ${popular ? 'border-primary' : 'border-border'}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge variant="default" className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      
      <CardHeader className={`pb-8 pt-6 ${popular ? 'bg-primary/5' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {icon && (
              <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center mr-4">
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-sm">
          <div>
            <p className="text-muted-foreground">RAM</p>
            <p className="font-medium">{ram}</p>
          </div>
          <div>
            <p className="text-muted-foreground">CPU</p>
            <p className="font-medium">{cpu}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Storage</p>
            <p className="font-medium">{storage}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Players</p>
            <p className="font-medium">{players}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <div className="mr-2 mt-0.5 text-primary">
                <Check size={16} />
              </div>
              <span className="text-sm">{feature}</span>
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
