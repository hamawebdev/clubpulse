
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 md:pr-10">
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Club Management Simplified
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Streamline Your <span className="gradient-text">Club Management</span> Effortlessly
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              An intuitive platform designed to help club administrators manage members, events, and operations with ease and elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cta-button bg-primary hover:bg-primary/90 transition-all text-white px-8 shadow-lg shadow-primary/20">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="lg" className="bg-white/50 hover:bg-white/80 transition-all">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Join 2,000+ clubs already using ClubPulse</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1638132704795-6bb223151bf7?q=80&w=2070&auto=format&fit=crop" 
                alt="Club Management Dashboard"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-5 -left-5 p-4 rounded-xl glass-card shadow-lg animate-slide-up animation-delay-300 z-20 max-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-xs font-medium">Members Activity</p>
              </div>
              <p className="text-2xl font-bold">+27%</p>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
            
            <div className="absolute -bottom-5 -right-5 p-4 rounded-xl glass-card shadow-lg animate-slide-up animation-delay-500 z-20 max-w-[220px]">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-xs font-medium">Upcoming Events</p>
              </div>
              <p className="text-xl font-bold">12 Events</p>
              <p className="text-xs text-muted-foreground">next 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
