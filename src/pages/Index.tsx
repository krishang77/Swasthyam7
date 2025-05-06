import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Flame, 
  Clock, 
  TrendingUp, 
  BarChart, 
  Calendar,
  Zap,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricCard from '@/components/dashboard/MetricCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import ProgressRing from '@/components/ui/ProgressRing';
import FadeIn from '@/components/animations/FadeIn';
import { ActionModal } from '@/components/ui/action-modal';
import ActivityForm from '@/components/activity/ActivityForm';
import SleepLogForm from '@/components/sleep/SleepLogForm';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CyclePromoCard from '@/components/cycle/CyclePromoCard';

// Sample data
const activityData = [
  { name: 'Mon', steps: 8456, calories: 420, distance: 5.2 },
  { name: 'Tue', steps: 7823, calories: 380, distance: 4.7 },
  { name: 'Wed', steps: 12300, calories: 560, distance: 7.8 },
  { name: 'Thu', steps: 9860, calories: 490, distance: 6.1 },
  { name: 'Fri', steps: 6840, calories: 320, distance: 3.9 },
  { name: 'Sat', steps: 14290, calories: 720, distance: 9.4 },
  { name: 'Sun', steps: 11200, calories: 610, distance: 8.2 },
];

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const [logSleepOpen, setLogSleepOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'Morning Run',
      details: '5.7 km • 35 min • 6:32 AM',
      icon: <Activity className="h-5 w-5" />,
      iconClass: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'Strength Training',
      details: '45 min • 320 cal • 9:15 AM',
      icon: <BarChart className="h-5 w-5" />,
      iconClass: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'Stretching',
      details: '15 min • 60 cal • 5:40 PM',
      icon: <TrendingUp className="h-5 w-5" />,
      iconClass: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      type: 'Weight Check',
      details: '75.2 kg • -0.3 kg • 8:10 PM',
      icon: <Calendar className="h-5 w-5" />,
      iconClass: 'bg-yellow-100 text-yellow-600'
    }
  ]);
  const [workoutSessions, setWorkoutSessions] = useState([
    { id: 1, day: 'Monday', type: 'Cardio', duration: '45 min', intensity: 'High' },
    { id: 2, day: 'Tuesday', type: 'Strength', duration: '60 min', intensity: 'Medium' },
    { id: 3, day: 'Thursday', type: 'Yoga', duration: '30 min', intensity: 'Low' },
    { id: 4, day: 'Friday', type: 'HIIT', duration: '25 min', intensity: 'High' },
    { id: 5, day: 'Sunday', type: 'Running', duration: '40 min', intensity: 'Medium' },
  ]);

  // Modified function to be compatible with the ActivityForm onSubmit prop
  const handleAddActivitySubmit = () => {
    // We can access the form data through other means if needed
    // For now, create a mock activity
    const newActivity = {
      id: Date.now(),
      type: 'Walking',
      details: `3.5 km • 30 min • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      icon: <Activity className="h-5 w-5" />,
      iconClass: 'bg-blue-100 text-blue-600'
    };
    
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    
    toast({
      title: "Activity added",
      description: "Your activity has been logged successfully.",
    });
    setAddActivityOpen(false);
  };

  // Modified function to be compatible with the SleepLogForm onSubmit prop
  const handleLogSleepSubmit = () => {
    // Create a mock sleep entry
    const newSleepActivity = {
      id: Date.now(),
      type: 'Sleep',
      details: `8h 0m • Sleep Score: Good`,
      icon: <Clock className="h-5 w-5" />,
      iconClass: 'bg-indigo-100 text-indigo-600'
    };
    
    setRecentActivities(prev => [newSleepActivity, ...prev.slice(0, 3)]);
    
    toast({
      title: "Sleep logged",
      description: "Your sleep data has been logged successfully.",
    });
    setLogSleepOpen(false);
  };

  const handleAddWorkout = (workoutData: any) => {
    const newWorkout = {
      id: Date.now(),
      day: workoutData.day || 'Monday',
      type: workoutData.type || 'Cardio',
      duration: `${workoutData.duration || 30} min`,
      intensity: workoutData.intensity || 'Medium'
    };
    
    setWorkoutSessions(prev => [...prev, newWorkout]);
    
    toast({
      title: "Workout added",
      description: "Your workout has been scheduled successfully.",
    });
  };

  const navigateToSchedule = () => {
    navigate('/workouts');
    toast({
      description: "Navigated to workout schedule",
    });
  };

  const navigateToTrackMeal = () => {
    navigate('/nutrition');
    toast({
      description: "Navigated to nutrition tracking",
    });
  };

  const navigateToAllActivities = () => {
    navigate('/activity');
    toast({
      description: "Navigated to activity tracking",
    });
  };

  const getUserName = () => {
    return currentUser?.name || "User";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up" delay={100}>
            <h1 className="text-4xl font-bold tracking-tight">Good morning, {getUserName()}</h1>
            <p className="mt-2 text-muted-foreground">
              Here's your health summary for today
            </p>
          </FadeIn>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            <FadeIn direction="up" delay={150}>
              <MetricCard
                title="Steps"
                value="8,546"
                subtitle="Daily Goal: 10,000"
                icon={Activity}
                trend="up"
                trendValue="12% from yesterday"
              />
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <MetricCard
                title="Calories"
                value="432"
                subtitle="Daily Goal: 650"
                icon={Flame}
                trend="down"
                trendValue="8% from yesterday"
                iconClassName="bg-orange-100 text-orange-600"
              />
            </FadeIn>
            
            <FadeIn direction="up" delay={250}>
              <MetricCard
                title="Heart Rate"
                value="72 bpm"
                subtitle="Resting"
                icon={Heart}
                trend="neutral"
                trendValue="Average"
                iconClassName="bg-red-100 text-red-600"
              />
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <MetricCard
                title="Sleep"
                value="7h 24m"
                subtitle="Sleep Score: 85"
                icon={Clock}
                trend="up"
                trendValue="12% from yesterday"
                iconClassName="bg-blue-100 text-blue-600"
              />
            </FadeIn>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <FadeIn className="lg:col-span-2" delay={350}>
            <ActivityChart data={activityData} />
          </FadeIn>
          
          {/* Weekly Goal Progress */}
          <FadeIn delay={400}>
            <DashboardCard title="Weekly Goals" subtitle="Your progress so far">
              <div className="flex flex-col items-center justify-center py-4">
                <ProgressRing progress={72} size={160} strokeWidth={12}>
                  <div className="text-center">
                    <div className="text-3xl font-bold">72%</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </ProgressRing>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={85} size={80} strokeWidth={6} color="hsl(var(--primary))">
                      <div className="text-center">
                        <div className="text-xl font-bold">85%</div>
                      </div>
                    </ProgressRing>
                    <span className="text-sm mt-2">Steps</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={65} size={80} strokeWidth={6} color="#ff7c43">
                      <div className="text-center">
                        <div className="text-xl font-bold">65%</div>
                      </div>
                    </ProgressRing>
                    <span className="text-sm mt-2">Calories</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={92} size={80} strokeWidth={6} color="#00b8d9">
                      <div className="text-center">
                        <div className="text-xl font-bold">92%</div>
                      </div>
                    </ProgressRing>
                    <span className="text-sm mt-2">Sleep</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={45} size={80} strokeWidth={6} color="#f66d9b">
                      <div className="text-center">
                        <div className="text-xl font-bold">45%</div>
                      </div>
                    </ProgressRing>
                    <span className="text-sm mt-2">Workouts</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </FadeIn>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Workout Schedule */}
          <FadeIn delay={450}>
            <DashboardCard title="Workout Schedule" subtitle="This week">
              <div className="flex flex-col space-y-4">
                {workoutSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary">
                      {session.type === 'Cardio' && <Activity className="h-5 w-5" />}
                      {session.type === 'Strength' && <BarChart className="h-5 w-5" />}
                      {session.type === 'Yoga' && <TrendingUp className="h-5 w-5" />}
                      {session.type === 'HIIT' && <Zap className="h-5 w-5" />}
                      {session.type === 'Running' && <Activity className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{session.type}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{session.day}</span>
                        <span className="mx-2">•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      session.intensity === 'High' 
                        ? 'bg-red-100 text-red-600' 
                        : session.intensity === 'Medium'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {session.intensity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  className="w-full"
                  onClick={navigateToSchedule}
                >
                  View Full Schedule
                </Button>
              </div>
            </DashboardCard>
          </FadeIn>
          
          {/* Nutrition Summary */}
          <FadeIn delay={500}>
            <DashboardCard title="Nutrition" subtitle="Today's summary">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Calories</h4>
                    <p className="text-sm text-muted-foreground">
                      1,850 / 2,100 kcal
                    </p>
                  </div>
                  <ProgressRing progress={88} size={60} strokeWidth={4}>
                    <span className="text-sm font-medium">88%</span>
                  </ProgressRing>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Proteins</span>
                      <span>75 / 120g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: '62.5%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbs</span>
                      <span>185 / 230g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: '80.4%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fats</span>
                      <span>45 / 65g</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full" 
                        style={{ width: '69.2%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  className="w-full"
                  onClick={navigateToTrackMeal}
                >
                  Track Meal
                </Button>
              </div>
            </DashboardCard>
          </FadeIn>
          
          {/* Recent Activities */}
          <FadeIn delay={550} className="space-y-6">
            <DashboardCard title="Recent Activities" subtitle="Today">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className={`mr-4 p-2 rounded-full ${activity.iconClass}`}>
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={navigateToAllActivities}
                >
                  View All Activities
                </Button>
              </div>
            </DashboardCard>
            
            {/* Add Cycle Tracker Promo */}
            <CyclePromoCard />
          </FadeIn>
        </div>
      </div>

      {/* Add Activity Modal */}
      <ActionModal
        title="Add Activity"
        description="Log a new activity to track your progress"
        isOpen={addActivityOpen}
        onOpenChange={setAddActivityOpen}
      >
        <ActivityForm 
          onSubmit={handleAddActivitySubmit} 
          onCancel={() => setAddActivityOpen(false)} 
        />
      </ActionModal>

      {/* Log Sleep Modal */}
      <ActionModal
        title="Log Sleep"
        description="Record your sleep data"
        isOpen={logSleepOpen}
        onOpenChange={setLogSleepOpen}
      >
        <SleepLogForm 
          onSubmit={handleLogSleepSubmit} 
          onCancel={() => setLogSleepOpen(false)} 
        />
      </ActionModal>
    </div>
  );
};

export default Index;
