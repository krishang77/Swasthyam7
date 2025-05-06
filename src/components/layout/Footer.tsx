
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 mt-auto border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Heart className="h-5 w-5 text-primary mr-2" />
          <span className="font-medium">Swasthyam</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
          <a 
            href="#" 
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Contact Us
          </a>
        </div>
        
        <div className="mt-4 md:mt-0 text-sm text-foreground/50">
          &copy; {currentYear} Swasthyam. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
