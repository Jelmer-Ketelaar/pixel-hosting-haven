
import React, { useEffect, useRef } from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!testimonialsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
                card.classList.remove('opacity-0');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(testimonialsRef.current);
    
    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);
  
  return (
    <section id="testimonials" ref={testimonialsRef} className="section-container bg-background">
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4 text-foreground">
          Testimonials
        </div>
        <h2 className="section-title text-foreground">What Our Customers <span className="text-gradient">Say</span></h2>
        <p className="section-subtitle text-foreground">
          Join thousands of satisfied server owners who trust PixelHost for their Minecraft communities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="Setting up our server was incredibly easy. The performance is amazing, and we've had zero downtime since switching to PixelHost."
          author="Alex Johnson"
          role="Server Owner, CraftWorld"
          rating={5}
        />
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="Their customer support is unmatched. They helped me set up complex mods and were available whenever I needed assistance."
          author="Sarah Chen"
          role="Administrator, PixelCraft"
          rating={5}
        />
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="The server performance is incredible. Even with 50+ players and numerous plugins, we experience no lag or issues."
          author="Michael Rodriguez"
          role="Owner, SurvivalMC"
          rating={4}
        />
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="I switched from a different provider and immediately noticed the improvement. PixelHost offers much better value for the price."
          author="Emma Wilson"
          role="Developer, CreativeMC"
          rating={5}
        />
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="The automatic backups have saved us multiple times. The control panel is intuitive and makes managing our server effortless."
          author="David Thompson"
          role="Community Manager, BuildCraft"
          rating={5}
        />
        <TestimonialCard
          className="testimonial-card opacity-0"
          quote="I was hesitant to switch hosts, but PixelHost made the transition smooth. Their migration support was excellent."
          author="Olivia Parker"
          role="Owner, AdventureMC"
          rating={4}
        />
      </div>
    </section>
  );
};

export default Testimonials;
