
import React from 'react';
import { format } from 'date-fns';
import { Calendar, BarChart, Activity } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

type CycleType = {
  id: number;
  startDate: Date;
  endDate: Date;
  symptoms: string[];
  flow: string;
  notes?: string;
};

interface CycleStatsCardProps {
  avgCycleLength: number;
  avgPeriodLength: number;
  cycles: CycleType[];
}

const CycleStatsCard: React.FC<CycleStatsCardProps> = ({
  avgCycleLength,
  avgPeriodLength,
  cycles
}) => {
  const lastThreeCycles = cycles.slice(0, 3);
  const mostCommonSymptoms = getMostCommonSymptoms(cycles);
  
  function getMostCommonSymptoms(cycles: CycleType[]): {name: string, count: number}[] {
    const symptomCounts: Record<string, number> = {};
    
    cycles.forEach(cycle => {
      cycle.symptoms.forEach(symptom => {
        if (!symptomCounts[symptom]) {
          symptomCounts[symptom] = 0;
        }
        symptomCounts[symptom]++;
      });
    });
    
    return Object.entries(symptomCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }
  
  return (
    <DashboardCard title="Cycle Statistics" subtitle="Analysis of your patterns">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-secondary/30 rounded-md">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium text-sm">Cycle Length</h3>
            </div>
            <p className="text-2xl font-bold">{avgCycleLength} days</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
          
          <div className="p-3 bg-secondary/30 rounded-md">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <h3 className="font-medium text-sm">Period Length</h3>
            </div>
            <p className="text-2xl font-bold">{avgPeriodLength} days</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-2">Recent Cycles</h3>
          <div className="space-y-2">
            {lastThreeCycles.length > 0 ? (
              lastThreeCycles.map(cycle => (
                <div key={cycle.id} className="flex justify-between items-center p-2 bg-secondary/20 rounded-md">
                  <div>
                    <p className="font-medium">{format(cycle.startDate, 'MMM d')}</p>
                    <p className="text-xs text-muted-foreground">{cycle.flow} flow</p>
                  </div>
                  <div className="text-sm">{format(cycle.startDate, 'MMM d')} - {format(cycle.endDate, 'MMM d')}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent cycles recorded</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-2">Common Symptoms</h3>
          <div className="space-y-2">
            {mostCommonSymptoms.length > 0 ? (
              mostCommonSymptoms.map((symptom, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{symptom.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      {symptom.count} {symptom.count === 1 ? 'time' : 'times'}
                    </span>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden w-16">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(symptom.count / cycles.length) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No symptoms recorded yet</p>
            )}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default CycleStatsCard;
