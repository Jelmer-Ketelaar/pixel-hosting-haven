
import React, { useState } from 'react';
import Button from './Button';
import { Mail, MessageSquare, Send } from 'lucide-react';

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
      alert('Thank you for your message! We will get back to you soon.');
    }, 1500);
  };
  
  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Get In Touch
        </div>
        <h2 className="section-title">Need Help? <span className="text-gradient">Contact Us</span></h2>
        <p className="section-subtitle">
          Our support team is ready to assist you with any questions or issues you may have.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <div className="glass-effect p-6 rounded-xl mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <MessageSquare size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat Support</h3>
                <p className="text-sm text-muted-foreground">Available 24/7 for immediate assistance</p>
              </div>
            </div>
            <Button className="w-full">Start Chat</Button>
          </div>
          
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-minecraft-green/10 flex items-center justify-center mr-4">
                <Mail size={20} className="text-minecraft-green" />
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
              <div className="glass-effect p-4 rounded-lg">
                <h4 className="font-medium mb-2">How long does it take to set up a server?</h4>
                <p className="text-sm text-muted-foreground">Your server will be set up instantly, usually within 60 seconds after payment.</p>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <h4 className="font-medium mb-2">Can I install custom mods and plugins?</h4>
                <p className="text-sm text-muted-foreground">Yes, you have full access to install any mods or plugins compatible with your server version.</p>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <h4 className="font-medium mb-2">How do I upgrade my server?</h4>
                <p className="text-sm text-muted-foreground">You can upgrade at any time through your control panel. The upgrade process takes only a few minutes.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-effect p-8 rounded-xl">
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
                className="w-full"
                isLoading={isSubmitting}
                rightIcon={<Send size={16} />}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
