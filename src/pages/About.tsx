
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Server, Shield, Clock, Award, Users, MessageCircle, BarChart, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const BENEFITS = [
  {
    title: "High-Performance Servers",
    icon: <Server className="h-8 w-8 text-primary" />,
    description: (
      <>
        <span className="font-semibold">Up to 2x faster load times</span> vs. leading competitors thanks to latest-gen CPUs and NVMe SSDs. <br />
        No lag even with <span className="font-semibold">50+ players online</span>; ideal for both small and large communities.
      </>
    ),
    stat: "2x faster",
  },
  {
    title: "Industry-Leading Uptime",
    icon: <Clock className="h-8 w-8 text-primary" />,
    description: (
      <>
        Our infrastructure is architected for reliability, delivering an average <span className="font-semibold">99.98% uptime</span> verified by third-party monitoring.<br />
        <span className="italic">Enjoy hassle-free gaming—no unexpected disconnects.</span>
      </>
    ),
    stat: "99.98% uptime",
  },
  {
    title: "Enterprise-Grade DDoS Protection",
    icon: <Shield className="h-8 w-8 text-primary" />,
    description: (
      <>
        Multi-layered defense blocks attacks of up to <span className="font-semibold">1.2 Tbps</span>.<br />
        Instant detection & mitigation, keeping your servers online while others go down.
      </>
    ),
    stat: "1.2 Tbps+",
  },
  {
    title: "Instant Server Setup",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    description: (
      <>
        <span className="font-semibold">Go live in 60 seconds or less.</span><br />
        Fully automated deployment with guided setup—<span className="italic">no technical skills required</span>.
      </>
    ),
    stat: "&lt;60s",
  },
  {
    title: "24/7 True Human Support",
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    description: (
      <>
        Rapid response times &mdash; our average reply is <span className="font-semibold">&lt;7 minutes</span>.<br />
        Expert agents available <span className="font-semibold">24/7</span>, not chatbots. <br />
        <span className="italic">We solve your issues fast!</span>
      </>
    ),
    stat: "&lt;7 min",
  },
  {
    title: "Loved by the Community",
    icon: <Star className="h-8 w-8 text-primary" />,
    description: (
      <>
        <span className="font-semibold">98% satisfaction rate</span> from thousands of happy customers.<br />
        Over <span className="font-semibold">5,000+ servers hosted</span> and <span className="font-semibold">20,000+ players served</span> globally.
      </>
    ),
    stat: "98%+",
  }
];

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

        {/* Enhanced Why Choose PixelHost Section */}
        <section className="py-20 bg-card border-t border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-gradient">PixelHost</span>?
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">
                Discover the PixelHost difference: cutting-edge technology, unparalleled reliability, and a customer-first approach—see how we outperform ordinary hosts and help your Minecraft community thrive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {BENEFITS.map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className={cn(
                    "p-6 glass-effect rounded-xl shadow-md transition-all border border-border hover:scale-[1.03] hover:shadow-xl flex flex-col items-start"
                  )}
                >
                  <div className="mb-4 flex items-center gap-4 w-full">
                    <div className="rounded-lg bg-primary/10 p-2 flex items-center justify-center">{benefit.icon}</div>
                    <div className="ml-2 flex-1">
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    </div>
                    <span className="text-xs bg-primary/80 text-primary-foreground px-3 py-1 rounded-full font-medium">
                      {benefit.stat}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm mb-2">
                    {benefit.description}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <a href="#testimonials" className="inline-block">
                <button className="bg-primary text-primary-foreground px-7 py-3 rounded-full font-semibold shadow-glass transition-all hover:bg-primary/90 active:scale-95 button-animation">
                  See what our customers say
                  <span className="ml-2 align-middle"><Star size={18} className="inline" /></span>
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-center">
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

        {/* Section: Customer Testimonials */}
        <section className="py-20 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
            <p className="mb-10 max-w-xl mx-auto text-center text-muted-foreground">Real stories from server owners who trust PixelHost for their Minecraft communities.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-8 border border-border shadow-xl">
                <div className="flex items-center mb-4 gap-2">
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                </div>
                <blockquote className="italic mb-4">“Switching to PixelHost doubled our TPS and eliminated lag even at peak times—no host comes close to their performance and support.”</blockquote>
                <div className="text-sm font-semibold">Sarah C.</div>
                <div className="text-xs text-muted-foreground">Owner, EnderRealms</div>
              </div>
              <div className="bg-card rounded-xl p-8 border border-border shadow-xl">
                <div className="flex items-center mb-4 gap-2">
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                  <Star size={18} className="text-minecraft-orange fill-minecraft-orange" />
                </div>
                <blockquote className="italic mb-4">“PixelHost’s migration team moved our entire playerbase with zero downtime. Fast, transparent, and genuinely helpful—best host we’ve used.”</blockquote>
                <div className="text-sm font-semibold">Martin R.</div>
                <div className="text-xs text-muted-foreground">Admin, SkyNetMC</div>
              </div>
            </div>
            <div className="text-center mt-10">
              <a href="#contact" className="inline-block">
                <button className="bg-secondary text-secondary-foreground px-7 py-3 rounded-full font-semibold shadow-glass transition-all hover:bg-secondary/80 active:scale-95 button-animation">
                  Start your journey &rarr;
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

