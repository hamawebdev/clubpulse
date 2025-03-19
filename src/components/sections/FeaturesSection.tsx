
import React from 'react';
import FeatureCard from '@/components/ui/FeatureCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { 
  Users, 
  Calendar, 
  Shield, 
  BarChart3,
  CreditCard,
  MessageSquare,
  Bell,
  Settings
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Member Management",
      description: "Effortlessly manage member profiles, contact information, and engagement history in one centralized location.",
      icon: Users,
      iconColor: "text-primary"
    },
    {
      title: "Event Organization",
      description: "Create, schedule, and manage club events with intuitive calendar integration and automated notifications.",
      icon: Calendar,
      iconColor: "text-blue-500"
    },
    {
      title: "Admin Controls",
      description: "Control access levels and permissions for different roles within your club's administrative structure.",
      icon: Shield,
      iconColor: "text-indigo-500"
    },
    {
      title: "Reports & Insights",
      description: "Gain valuable insights into club activities, member engagement, and financial performance.",
      icon: BarChart3,
      iconColor: "text-purple-500"
    },
    {
      title: "Payment Processing",
      description: "Streamline membership dues, event registrations, and other financial transactions with secure payment options.",
      icon: CreditCard,
      iconColor: "text-green-500"
    },
    {
      title: "Communication Tools",
      description: "Keep members informed and engaged with integrated messaging, email campaigns, and announcements.",
      icon: MessageSquare,
      iconColor: "text-orange-500"
    },
    {
      title: "Notification System",
      description: "Automate reminders for events, dues, and important club updates through customizable notifications.",
      icon: Bell,
      iconColor: "text-rose-500"
    },
    {
      title: "Customization Options",
      description: "Tailor the platform to match your club's branding, workflows, and specific operational needs.",
      icon: Settings,
      iconColor: "text-slate-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 md:px-10 bg-muted/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <AnimatedCard>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Powerful Features
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Run Your Club
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of tools simplifies club administration, leaving you more time to focus on what matters - your community.
            </p>
          </AnimatedCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedCard key={feature.title} delay={index * 100}>
              <FeatureCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconColor={feature.iconColor}
              />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
