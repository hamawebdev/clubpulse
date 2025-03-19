
import React from 'react';
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  className?: string;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  image,
  className 
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl glass-card shadow-sm flex flex-col",
      className
    )}>
      <div className="mb-4">
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-primary/40 fill-current">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <p className="text-lg mb-6 flex-grow">{quote}</p>
      
      <div className="flex items-center">
        {image ? (
          <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={image} 
              alt={author} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="mr-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
