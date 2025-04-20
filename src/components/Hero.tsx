
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Server, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const xOffset = x * speed * 20;
        const yOffset = y * speed * 20;
        
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add fade-in animation for elements
    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach((el, index) => {
      setTimeout(() => {
        (el as HTMLElement).classList.add('animate-fade-in');
        (el as HTMLElement).classList.remove('opacity-0');
      }, 100 * index);
    });
    
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-24 overflow-hidden flex items-center"
    >
      {/* Background elements with improved visual effects */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl parallax" data-speed="0.03"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl parallax" data-speed="0.05"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl parallax" data-speed="0.07"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl parallax" data-speed="0.04"></div>
      </div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <div className="glass-effect mb-8 px-4 py-2 rounded-full flex items-center space-x-2 parallax animate-on-load opacity-0" data-speed="0.15">
          <span className="bg-gradient-to-r from-primary to-purple-600 px-2 py-0.5 rounded-full text-sm font-medium text-white">New</span>
          <span className="text-sm text-muted-foreground">High performance Minecraft servers with 99.9% uptime</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 tracking-tight parallax animate-on-load opacity-0" data-speed="0.1">
          Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Minecraft</span><br /> Server Hosting
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mb-10 parallax animate-on-load opacity-0" data-speed="0.08">
          Lightning-fast servers with instant setup, premium hardware, DDoS protection, and 24/7 support. Start your adventure in just a few clicks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 parallax animate-on-load opacity-0" data-speed="0.12">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
            onClick={() => scrollToSection('pricing')}
          >
            Get Your Server
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => scrollToSection('features')}
            className="border-2 hover:bg-accent/30"
          >
            Explore Features
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full parallax animate-on-load opacity-0" data-speed="0.06">
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">Instant Setup</h3>
            <p className="text-muted-foreground text-sm">Your server is ready in less than 60 seconds.</p>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">Premium Hardware</h3>
            <p className="text-muted-foreground text-sm">NVMe SSD storage and high-frequency processors.</p>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">DDoS Protection</h3>
            <p className="text-muted-foreground text-sm">Enterprise-grade protection against attacks.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
