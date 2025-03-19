
import React from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import AnimatedCard from '@/components/ui/AnimatedCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "ClubPulse has transformed how we manage our tennis club. The intuitive interface and comprehensive features have saved us countless hours on administration.",
      author: "Sarah Johnson",
      role: "Tennis Club President",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
    },
    {
      quote: "As a university student organization, we needed something flexible yet powerful. ClubPulse delivered exactly what we needed and more.",
      author: "Michael Chen",
      role: "Student Organization Treasurer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    },
    {
      quote: "The event management features alone are worth the investment. We've seen member participation increase by 40% since implementing ClubPulse.",
      author: "Jessica Martinez",
      role: "Book Club Coordinator",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 md:px-10 bg-muted/30 relative overflow-hidden">
      {/* Background gradient and elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background z-0"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <AnimatedCard>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Success Stories
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Club administrators across various sectors are experiencing the benefits of our platform.
            </p>
          </AnimatedCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={testimonial.author} delay={index * 150}>
              <TestimonialCard 
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
