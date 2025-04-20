
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  iconClassName
}) => {
  return (
    <div className={cn(
      "glass-effect p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 border border-white/10",
      className
    )}>
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        iconClassName || "bg-primary/10 text-primary"
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
