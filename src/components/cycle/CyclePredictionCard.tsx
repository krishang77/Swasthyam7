
import React from 'react';
import { format } from 'date-fns';
import { CalendarHeart, CircleDot, Circle } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface CyclePredictionCardProps {
  nextPeriodDate: Date | null;
  ovulationDate: Date | null;
  fertileWindowStart: Date | null;
  fertileWindowEnd: Date | null;
}

const CyclePredictionCard: React.FC<CyclePredictionCardProps> = ({
  nextPeriodDate,
  ovulationDate,
  fertileWindowStart,
  fertileWindowEnd
}) => {
  return (
    <DashboardCard title="Predictions" subtitle="Based on your cycle history">
      <div className="space-y-4 py-2">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-red-100 text-red-500 mr-3">
            <CalendarHeart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Next Period</h3>
            <p className="text-sm text-muted-foreground">
              {nextPeriodDate 
                ? format(nextPeriodDate, 'MMMM d, yyyy')
                : 'Not enough data'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-100 text-purple-500 mr-3">
            <CircleDot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Ovulation</h3>
            <p className="text-sm text-muted-foreground">
              {ovulationDate 
                ? format(ovulationDate, 'MMMM d, yyyy')
                : 'Not enough data'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-50 text-purple-300 mr-3">
            <Circle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Fertile Window</h3>
            <p className="text-sm text-muted-foreground">
              {fertileWindowStart && fertileWindowEnd 
                ? `${format(fertileWindowStart, 'MMM d')} - ${format(fertileWindowEnd, 'MMM d')}`
                : 'Not enough data'
              }
            </p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3 mt-4">
          <h4 className="font-medium text-purple-800">Today's Tip</h4>
          <p className="text-sm text-purple-700 mt-1">
            Tracking your basal body temperature can help predict ovulation more accurately. Try measuring it first thing each morning.
          </p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default CyclePredictionCard;
