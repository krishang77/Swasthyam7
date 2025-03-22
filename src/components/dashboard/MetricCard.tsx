
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  iconClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconClassName,
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-yellow-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '↔';
  };

  return (
    <div className={cn(
      "glass-card rounded-xl p-5 flex flex-col card-hover",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className={cn(
            "rounded-full p-2 bg-primary/10 text-primary",
            iconClassName
          )}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {getTrendIcon()} {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
