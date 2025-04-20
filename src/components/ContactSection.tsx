
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    }, 1500);
  };
  
  return (
    <section id="contact" className="section-container relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background -z-10"></div>
      
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/10">
          Get In Touch
        </div>
        <h2 className="section-title">Need Help? <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Contact Us</span></h2>
        <p className="section-subtitle">
          Our support team is ready to assist you with any questions or issues you may have.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <div className="glass-effect p-6 rounded-xl mb-6 border border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat Support</h3>
                <p className="text-sm text-muted-foreground">Available 24/7 for immediate assistance</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500/90 hover:to-blue-600/90 text-white">Start Chat</Button>
          </div>
          
          <div className="glass-effect p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-4">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">Get a response within 24 hours</p>
              </div>
            </div>
            <a href="mailto:support@pixelhost.com" className="block text-primary font-medium hover:underline">
              support@pixelhost.com
            </a>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="glass-effect p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300">
                <h4 className="font-medium mb-2">How long does it take to set up a server?</h4>
                <p className="text-sm text-muted-foreground">Your server will be set up instantly, usually within 60 seconds after payment.</p>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300">
                <h4 className="font-medium mb-2">Can I install custom mods and plugins?</h4>
                <p className="text-sm text-muted-foreground">Yes, you have full access to install any mods or plugins compatible with your server version.</p>
              </div>
              <div className="glass-effect p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300">
                <h4 className="font-medium mb-2">How do I upgrade my server?</h4>
                <p className="text-sm text-muted-foreground">You can upgrade at any time through your control panel. The upgrade process takes only a few minutes.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-effect p-8 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Server Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Your message..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Send Message
                    <Send size={16} className="ml-2" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
