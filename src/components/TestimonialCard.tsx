
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  rating,
  className,
}) => {
  return (
    <div className={cn(
      "glass-effect p-6 rounded-xl",
      className
    )}>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={cn(
              "mr-0.5",
              i < rating ? "text-minecraft-orange fill-minecraft-orange" : "text-muted-foreground"
            )}
          />
        ))}
      </div>
      <blockquote className="mb-4 text-md italic">"{quote}"</blockquote>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
