
import React from 'react';
import { CalendarHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';

const CyclePromoCard = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardCard className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100">
      <div className="flex flex-col items-center text-center py-3">
        <div className="p-3 rounded-full bg-pink-100 text-pink-500 mb-3">
          <CalendarHeart className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-lg mb-1">Track Your Cycle</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Monitor your menstrual cycle, symptoms, and get personalized predictions
        </p>
        <Button 
          onClick={() => navigate('/cycle')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          Try Cycle Tracker
        </Button>
      </div>
    </DashboardCard>
  );
};

export default CyclePromoCard;
