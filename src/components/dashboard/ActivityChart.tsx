
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ActivityData {
  name: string;
  steps: number;
  calories: number;
  distance: number;
}

interface ActivityChartProps {
  data: ActivityData[];
  className?: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, className }) => {
  const [activeMetric, setActiveMetric] = useState<'steps' | 'calories' | 'distance'>('steps');
  
  const metrics = [
    { id: 'steps', label: 'Steps', color: 'hsl(var(--primary))' },
    { id: 'calories', label: 'Calories', color: '#ff7c43' },
    { id: 'distance', label: 'Distance', color: '#00b8d9' },
  ];
  
  const formatYAxis = (value: number) => {
    if (activeMetric === 'steps') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
    } else if (activeMetric === 'calories') {
      return `${value} cal`;
    } else {
      return `${value} km`;
    }
  };
  
  const formatTooltip = (value: number) => {
    if (activeMetric === 'steps') {
      return `${value.toLocaleString()} steps`;
    } else if (activeMetric === 'calories') {
      return `${value.toLocaleString()} calories`;
    } else {
      return `${value} km`;
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-lg font-medium mb-3 sm:mb-0">Activity Overview</h3>
        <div className="flex space-x-2">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                activeMetric === metric.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              onClick={() => setActiveMetric(metric.id as any)}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7c43" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff7c43" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b8d9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00b8d9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              formatter={(value: number) => formatTooltip(value)}
            />
            {activeMetric === 'steps' && (
              <Area 
                type="monotone" 
                dataKey="steps" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1}
                fill="url(#colorSteps)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
            {activeMetric === 'calories' && (
              <Area 
                type="monotone" 
                dataKey="calories" 
                stroke="#ff7c43" 
                fillOpacity={1}
                fill="url(#colorCalories)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
            {activeMetric === 'distance' && (
              <Area 
                type="monotone" 
                dataKey="distance" 
                stroke="#00b8d9" 
                fillOpacity={1}
                fill="url(#colorDistance)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
