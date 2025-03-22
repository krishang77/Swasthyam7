
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  animate?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  children,
  color = 'hsl(var(--primary))',
  animate = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;
  
  useEffect(() => {
    if (animate) {
      // Animate progress
      const timer = setTimeout(() => {
        if (currentProgress < progress) {
          setCurrentProgress(prev => Math.min(prev + 1, progress));
        }
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(progress);
    }
  }, [currentProgress, progress, animate]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="progress-ring__circle"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children ? children : (
          <div className="text-center">
            <span className="text-2xl font-bold">{currentProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
