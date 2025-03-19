
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10", 
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-primary font-display text-2xl font-bold">
            ClubPulse
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/90 hover:text-primary transition-colors duration-200">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground/90 hover:text-primary transition-colors duration-200">
            How It Works
          </a>
          <a href="#testimonials" className="text-foreground/90 hover:text-primary transition-colors duration-200">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 transition-colors" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
