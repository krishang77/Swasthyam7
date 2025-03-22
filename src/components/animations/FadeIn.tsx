
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  once?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  duration = 500,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translate3d(0, 20px, 0)';
        case 'down':
          return 'translate3d(0, -20px, 0)';
        case 'left':
          return 'translate3d(20px, 0, 0)';
        case 'right':
          return 'translate3d(-20px, 0, 0)';
        case 'none':
          return 'translate3d(0, 0, 0)';
        default:
          return 'translate3d(0, 20px, 0)';
      }
    }
    return 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getDirectionStyles(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
