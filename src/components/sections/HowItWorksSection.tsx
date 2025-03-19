
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { 
  ClipboardList, 
  Users, 
  Calendar, 
  BarChart3 
} from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Set Up Your Club Profile",
      description: "Create your club profile with customized branding, member roles, and access permissions.",
      icon: ClipboardList,
      color: "bg-blue-500"
    },
    {
      number: "02",
      title: "Invite and Manage Members",
      description: "Add members, assign roles, and manage contact information through the intuitive dashboard.",
      icon: Users,
      color: "bg-indigo-500"
    },
    {
      number: "03",
      title: "Organize Events & Activities",
      description: "Schedule events, track RSVPs, and manage logistics all in one centralized platform.",
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      number: "04",
      title: "Track Performance & Growth",
      description: "Access detailed analytics on membership, events, and finances to drive informed decisions.",
      icon: BarChart3,
      color: "bg-primary"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <AnimatedCard>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Simple Process
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How ClubPulse Works
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Getting started with ClubPulse is simple. Follow these steps to transform how you manage your club.
            </p>
          </AnimatedCard>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/10"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <AnimatedCard 
                key={step.number} 
                delay={index * 150}
                className="relative"
              >
                <div className={`lg:grid lg:grid-cols-2 lg:gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`p-6 ${index % 2 === 1 ? 'lg:text-right lg:flex lg:flex-col lg:items-end' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step.color} text-white font-bold text-lg`}>
                        {step.number}
                      </div>
                      <div className="w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent ml-4 hidden lg:block"></div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground max-w-md">{step.description}</p>
                  </div>
                  
                  <div className={`mt-6 lg:mt-0 ${index % 2 === 1 ? 'lg:order-first' : ''}`}>
                    <div className="p-6 rounded-2xl glass-card shadow-lg h-full flex flex-col justify-center items-center">
                      <div className={`w-16 h-16 ${step.color} bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                        <step.icon className={`w-8 h-8 ${step.color.replace('bg-', 'text-')}`} />
                      </div>
                      
                      <img 
                        src={`https://images.unsplash.com/photo-${1550000000 + index * 1000}?q=80&w=800&auto=format&fit=crop`} 
                        alt={step.title}
                        className="w-full h-auto rounded-lg object-cover mt-4 shadow-md"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
