
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServerPricing from '@/components/ServerPricing';
import Features from '@/components/Features';
import ServerControl from '@/components/ServerControl';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          // Cleanup
        });
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <ServerPricing />
        <ServerControl />
        <Features />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
