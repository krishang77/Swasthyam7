
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  className,
  children,
  fullWidth = false,
  hoverable = true,
  onClick,
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden",
        hoverable && "card-hover",
        fullWidth ? "w-full" : "w-full md:w-auto",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="p-5 border-b border-border/40">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

export default DashboardCard;
