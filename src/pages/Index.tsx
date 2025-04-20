
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServerPricing from '@/components/ServerPricing';
import Features from '@/components/Features';
import ServerControl from '@/components/ServerControl';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Index: React.FC = () => {
  // Handle hash navigation
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Wait for the page to fully load
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="pricing">
          <ServerPricing />
        </section>
        <section id="control">
          <ServerControl />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
