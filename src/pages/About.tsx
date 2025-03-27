
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Server, Shield, Clock, Award, Users, MessageCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PixelHost</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're passionate about Minecraft and dedicated to providing top-tier hosting solutions for players and communities worldwide.
            </p>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2023, PixelHost began with a simple mission: to make Minecraft server hosting accessible, reliable, and hassle-free for everyone. 
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our team of passionate Minecraft enthusiasts and server experts came together to create a hosting solution that we ourselves would want to use.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we host thousands of Minecraft servers worldwide, from small friend groups to large communities, providing them with the performance and support they need to thrive.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                    <div className="text-muted-foreground">Servers Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">20K+</div>
                    <div className="text-muted-foreground">Happy Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose PixelHost</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl border border-border">
                <Server className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">High-Performance Servers</h3>
                <p className="text-muted-foreground">
                  Our servers are equipped with the latest hardware and optimized specifically for Minecraft, ensuring smooth gameplay even with many players online.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">DDoS Protection</h3>
                <p className="text-muted-foreground">
                  We provide enterprise-grade DDoS protection for all our servers, keeping your Minecraft world safe from attacks and ensuring consistent uptime.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
                <p className="text-muted-foreground">
                  Get your Minecraft server up and running in minutes with our automated setup process. No technical knowledge required.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Premium Support</h3>
                <p className="text-muted-foreground">
                  Our experienced support team is available 24/7 to help you with any questions or issues. We're committed to providing fast and helpful assistance.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Focused</h3>
                <p className="text-muted-foreground">
                  We actively listen to our users and continuously improve our services based on community feedback and requests.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <MessageCircle className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Free Consultation</h3>
                <p className="text-muted-foreground">
                  Not sure what you need? Our team can help you choose the right plan for your specific requirements and budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              We're a dedicated team of Minecraft enthusiasts, developers, and customer support specialists working together to provide the best hosting experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">JS</span>
                </div>
                <h3 className="text-xl font-bold">John Smith</h3>
                <p className="text-primary mb-2">Founder & CEO</p>
                <p className="text-muted-foreground text-sm">
                  Minecraft player since alpha, with over 10 years of server hosting experience.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">AJ</span>
                </div>
                <h3 className="text-xl font-bold">Alice Johnson</h3>
                <p className="text-primary mb-2">CTO</p>
                <p className="text-muted-foreground text-sm">
                  Systems architect with expertise in optimizing Minecraft server performance.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">MB</span>
                </div>
                <h3 className="text-xl font-bold">Mike Brown</h3>
                <p className="text-primary mb-2">Head of Support</p>
                <p className="text-muted-foreground text-sm">
                  Dedicated to solving problems and ensuring our customers have the best experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
