
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { ArrowRight, Check } from 'lucide-react';

const CtaSection = () => {
  const benefits = [
    "Free 14-day trial",
    "No credit card required",
    "Easy setup process",
    "Priority support"
  ];

  return (
    <section className="py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedCard>
          <div className="rounded-3xl overflow-hidden shadow-xl relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0"></div>
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
            
            <div className="glass-card relative z-10 p-10 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Elevate Your Club Management?
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                    Join thousands of club administrators who are saving time and improving member experiences with ClubPulse.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center">
                        <div className="rounded-full bg-primary/10 p-1 mr-3">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button size="lg" className="cta-button bg-primary hover:bg-primary/90 transition-all text-white px-8 shadow-lg shadow-primary/20">
                    Get Started Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="relative z-20 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                      alt="ClubPulse Dashboard"
                      className="w-full h-auto rounded-lg object-cover"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Floating stat cards */}
                  <div className="absolute -top-6 -left-6 p-4 rounded-xl glass-card shadow-lg z-30 max-w-[180px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <p className="text-xs font-medium">Time Saved</p>
                    </div>
                    <p className="text-2xl font-bold">15+ hrs</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 p-4 rounded-xl glass-card shadow-lg z-30 max-w-[180px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <p className="text-xs font-medium">Member Satisfaction</p>
                    </div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-muted-foreground">approval rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default CtaSection;
