
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
          <div className="relative group">
          
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link 
                  to="/dashboard/club" 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Club Dashboard
                </Link>
                <Link 
                  to="/dashboard/admin" 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 transition-colors" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a href="#features" className="text-foreground/90 py-2 hover:text-primary transition-colors duration-200">
                  Features
                </a>
                <a href="#how-it-works" className="text-foreground/90 py-2 hover:text-primary transition-colors duration-200">
                  How It Works
                </a>
                <a href="#testimonials" className="text-foreground/90 py-2 hover:text-primary transition-colors duration-200">
                  Testimonials
                </a>
                
                <div className="py-2">
                  <span className="font-medium mb-2 block">Dashboards</span>
                  <div className="ml-2 flex flex-col gap-2 mt-2">
                    <Link to="/dashboard/club" className="text-foreground/90 py-1 hover:text-primary transition-colors duration-200">
                      Club Dashboard
                    </Link>
                    <Link to="/dashboard/admin" className="text-foreground/90 py-1 hover:text-primary transition-colors duration-200">
                      Admin Dashboard
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button className="bg-primary" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
