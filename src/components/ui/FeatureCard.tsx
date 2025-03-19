
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-primary", 
  className 
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl glass-card feature-hover shadow-sm h-full flex flex-col",
      className
    )}>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
        "bg-primary/10"
      )}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;
