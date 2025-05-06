
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Heart, 
  Home, 
  Menu, 
  Moon,
  Sun, 
  Utensils, 
  Bed, 
  Dumbbell, 
  Target, 
  User, 
  X,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { currentUser, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };

  // Get user's first name or full name for welcome message
  const userDisplayName = () => {
    if (!currentUser) return '';
    return currentUser.name;
  };

  const userInitials = () => {
    if (!currentUser) return '';
    return currentUser.name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/activity', label: 'Activity', icon: <Activity className="h-5 w-5" /> },
    { path: '/nutrition', label: 'Nutrition', icon: <Utensils className="h-5 w-5" /> },
    { path: '/sleep', label: 'Sleep', icon: <Bed className="h-5 w-5" /> },
    { path: '/workouts', label: 'Workouts', icon: <Dumbbell className="h-5 w-5" /> },
    { path: '/goals', label: 'Goals', icon: <Target className="h-5 w-5" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary animate-pulse-ring" />
            <span className="text-xl font-semibold tracking-tight">Swasthyam</span>
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                cn("nav-link flex items-center gap-1.5", isActive && "nav-link-active")
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          {currentUser && (
            <span className="hidden md:inline-block font-medium">{userDisplayName()}</span>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <NavLink to="/profile">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </NavLink>
          
          {currentUser && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleSignOut}
              className="rounded-full bg-red-100 hover:bg-red-200 text-red-600 border-red-200"
              aria-label="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20 transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          {currentUser && (
            <div className="mb-4 flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarFallback className="text-xl text-primary bg-primary/10 font-medium">
                  {userInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium">{currentUser.name}</span>
            </div>
          )}
          
          {navLinks.map(link => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                cn(
                  "flex items-center justify-center space-x-2 text-lg w-full py-3 px-4 rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
                )
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
          <NavLink 
            to="/profile"
            className={({ isActive }) => 
              cn(
                "flex items-center justify-center space-x-2 text-lg w-full py-3 px-4 rounded-lg transition-colors",
                isActive ? "bg-primary/10 text-primary font-medium" : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
              )
            }
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
          
          {currentUser && (
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 w-full mt-4 border-red-200 hover:bg-red-100 text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
