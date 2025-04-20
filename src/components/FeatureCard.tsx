
import React from 'react';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';

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
  // Enhanced sanitization using DOMPurify
  const sanitizeText = (text: string) => {
    return DOMPurify.sanitize(text, { USE_PROFILES: { html: false } });
  };

  const sanitizedTitle = sanitizeText(title);
  const sanitizedDescription = sanitizeText(description);

  return (
    <div 
      className={cn(
        "glass-effect p-6 rounded-xl transition-all duration-300 border border-white/10 hover:shadow-lg hover:translate-y-[-4px]",
        className
      )}
      data-testid="feature-card"
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110",
          iconClassName || "bg-primary/10 text-primary"
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </div>
  );
};

export default FeatureCard;
