
import React from 'react';
import { Check } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface PricingFeature {
  title: string;
  available: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  icon?: React.ReactNode;
  buttonText?: string;
  ram: string;
  cpu: string;
  storage: string;
  players: string;
  onButtonClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  popular = false,
  icon,
  buttonText = "Get Started",
  ram,
  cpu,
  storage,
  players,
  onButtonClick
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px]",
        popular ? "border-2 border-primary shadow-lg" : "border border-border"
      )}
    >
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-primary py-1.5">
          <p className="text-center text-primary-foreground text-sm font-medium">Most Popular</p>
        </div>
      )}
      
      <div className={cn("p-6 pt-8", popular && "pt-12")}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-secondary/50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">RAM</p>
            <p className="font-bold">{ram}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">CPU</p>
            <p className="font-bold">{cpu}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Storage</p>
            <p className="font-bold">{storage}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Players</p>
            <p className="font-bold">{players}</p>
          </div>
        </div>
        
        <Button 
          className={cn("w-full mb-6", popular ? "bg-primary" : "")}
          variant={popular ? "primary" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 mt-0.5 ${feature.available ? 'text-minecraft-green' : 'text-muted-foreground'}`}>
                <Check size={16} className={feature.available ? 'opacity-100' : 'opacity-50'} />
              </span>
              <span className={`text-sm ${feature.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                {feature.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
