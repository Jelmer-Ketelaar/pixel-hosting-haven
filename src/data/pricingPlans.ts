
export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: {
    title: string;
    available: boolean;
  }[];
  popular?: boolean;
  resources: {
    ram: string;
    cpu: string;
    storage: string;
    players: string;
  };
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small communities",
    price: "€4.99",
    resources: {
      ram: "2GB",
      cpu: "1 vCore",
      storage: "10GB SSD",
      players: "Up to 10"
    },
    features: [
      { title: 'Instant Setup', available: true },
      { title: 'DDoS Protection', available: true },
      { title: '24/7 Support', available: true },
      { title: 'Automated Backups', available: true },
      { title: 'Custom Domain', available: false },
      { title: 'Plugin Support', available: true },
      { title: 'Mod Support', available: true },
    ]
  },
  {
    name: "Premium",
    description: "Ideal for growing servers",
    price: "€9.99",
    popular: true,
    resources: {
      ram: "6GB",
      cpu: "2 vCores",
      storage: "25GB SSD",
      players: "Up to 40"
    },
    features: [
      { title: 'Instant Setup', available: true },
      { title: 'DDoS Protection', available: true },
      { title: '24/7 Support', available: true },
      { title: 'Automated Backups', available: true },
      { title: 'Custom Domain', available: true },
      { title: 'Plugin Support', available: true },
      { title: 'Mod Support', available: true },
      { title: 'Priority Support', available: true },
    ]
  },
  {
    name: "Enterprise",
    description: "For large communities",
    price: "€19.99",
    resources: {
      ram: "12GB",
      cpu: "4 vCores",
      storage: "50GB SSD",
      players: "Up to 100"
    },
    features: [
      { title: 'Instant Setup', available: true },
      { title: 'DDoS Protection', available: true },
      { title: '24/7 Support', available: true },
      { title: 'Automated Backups', available: true },
      { title: 'Custom Domain', available: true },
      { title: 'Plugin Support', available: true },
      { title: 'Mod Support', available: true },
      { title: 'Priority Support', available: true },
      { title: 'Dedicated IP', available: true },
      { title: 'Enterprise SLA', available: true },
    ]
  }
];
