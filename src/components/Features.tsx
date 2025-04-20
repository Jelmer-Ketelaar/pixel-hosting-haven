
import React, { useEffect, useRef } from 'react';
import FeatureCard from './FeatureCard';
import { Shield, Zap, Server, Clock, Cpu, Globe, Settings, LifeBuoy } from 'lucide-react';

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = featuresRef.current?.querySelectorAll('.feature-card');
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
                card.classList.remove('opacity-0');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(featuresRef.current);
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);
  
  return (
    <section id="features" ref={featuresRef} className="section-container relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background -z-10"></div>
      
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/10">
          Powerful Features
        </div>
        <h2 className="section-title">Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">PixelHost</span></h2>
        <p className="section-subtitle">
          Our Minecraft server hosting is designed to provide you with the best performance, reliability, and user experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          className="feature-card opacity-0"
          title="Instant Setup"
          description="Your server is ready to use in less than 60 seconds. No waiting, just start playing."
          icon={<Zap size={24} />}
          iconClassName="bg-gradient-to-br from-amber-400 to-amber-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="DDoS Protection"
          description="Enterprise-grade protection keeps your server safe from attacks and ensures uptime."
          icon={<Shield size={24} />}
          iconClassName="bg-gradient-to-br from-purple-400 to-purple-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="Premium Hardware"
          description="High-frequency CPUs and NVMe SSDs for lightning-fast performance."
          icon={<Cpu size={24} />}
          iconClassName="bg-gradient-to-br from-blue-400 to-blue-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="99.9% Uptime"
          description="Our infrastructure is designed for reliability with redundant systems."
          icon={<Clock size={24} />}
          iconClassName="bg-gradient-to-br from-green-400 to-green-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="Global Network"
          description="Servers in multiple locations around the world for low-latency gaming."
          icon={<Globe size={24} />}
          iconClassName="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="Full Control"
          description="Access to server files, mods, plugins, and configuration settings."
          icon={<Settings size={24} />}
          iconClassName="bg-gradient-to-br from-purple-400 to-purple-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="Easy Scaling"
          description="Upgrade your plan as your community grows without any downtime."
          icon={<Server size={24} />}
          iconClassName="bg-gradient-to-br from-amber-400 to-amber-600 text-white"
        />
        <FeatureCard
          className="feature-card opacity-0"
          title="24/7 Support"
          description="Our team is always available to help you with any questions or issues."
          icon={<LifeBuoy size={24} />}
          iconClassName="bg-gradient-to-br from-blue-400 to-blue-600 text-white"
        />
      </div>
    </section>
  );
};

export default Features;
