
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
  // Sanitize inputs to prevent XSS attacks
  const sanitizeText = (text: string) => {
    return text.replace(/[&<>"']/g, function(match) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[match] || match;
    });
  };

  const sanitizedTitle = sanitizeText(title);
  const sanitizedDescription = sanitizeText(description);

  return (
    <div 
      className={cn(
        "glass-effect p-6 rounded-xl transition-all duration-300 border border-white/10 hover:shadow-lg hover:translate-y-[-4px]",
        className
      )}
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110",
          iconClassName || "bg-primary/10 text-primary"
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{sanitizedTitle}</h3>
      <p className="text-muted-foreground">{sanitizedDescription}</p>
    </div>
  );
};

export default FeatureCard;
