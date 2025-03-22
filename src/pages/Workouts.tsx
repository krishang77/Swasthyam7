import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, ChevronDown, ChevronUp, Clock, Dumbbell, MoreHorizontal, Plus, Timer, Weight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import DashboardCard from '@/components/dashboard/DashboardCard';
import ProgressRing from '@/components/ui/ProgressRing';
import FadeIn from '@/components/animations/FadeIn';
import WorkoutPlanForm from '@/components/workouts/WorkoutPlanForm';

// Sample workout plans
const workoutPlans = [
  {
    id: 1,
    name: 'Full Body Strength',
    description: 'A comprehensive full-body workout program focusing on building strength and muscle.',
    duration: '8 weeks',
    frequency: '4 days/week',
    level: 'Intermediate',
    category: 'Strength',
    workouts: [
      {
        day: 'Monday',
        name: 'Upper Body Focus',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'Bent-Over Rows', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'Overhead Press', sets: 3, reps: '10-12', rest: '60 sec' },
          { name: 'Pull-Ups', sets: 3, reps: '8-10', rest: '60 sec' },
          { name: 'Tricep Extensions', sets: 3, reps: '12-15', rest: '45 sec' },
          { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: '45 sec' },
        ]
      },
      {
        day: 'Tuesday',
        name: 'Lower Body Focus',
        exercises: [
          { name: 'Squats', sets: 5, reps: '6-8', rest: '120 sec' },
          { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90 sec' },
          { name: 'Walking Lunges', sets: 3, reps: '12 per leg', rest: '60 sec' },
          { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45 sec' },
        ]
      },
      {
        day: 'Thursday',
        name: 'Push Day',
        exercises: [
          { name: 'Incline Bench Press', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'Dumbbell Shoulder Press', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'Chest Flyes', sets: 3, reps: '10-12', rest: '60 sec' },
          { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45 sec' },
          { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '45 sec' },
          { name: 'Overhead Tricep Extensions', sets: 3, reps: '12-15', rest: '45 sec' },
        ]
      },
      {
        day: 'Friday',
        name: 'Pull Day',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120 sec' },
          { name: 'Pull-Ups/Lat Pulldowns', sets: 4, reps: '8-10', rest: '90 sec' },
          { name: 'One-Arm Dumbbell Rows', sets: 3, reps: '10-12 per arm', rest: '60 sec' },
          { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '45 sec' },
          { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '45 sec' },
          { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '45 sec' },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'HIIT Cardio',
    description: 'High-intensity interval training to burn fat and improve cardiovascular health.',
    duration: '4 weeks',
    frequency: '3 days/week',
    level: 'All Levels',
    category: 'Cardio',
    workouts: [
      {
        day: 'Monday',
        name: 'Tabata Intervals',
        exercises: [
          { name: 'Jumping Jacks', sets: 8, reps: '20 sec on, 10 sec off', rest: 'Minimal' },
          { name: 'Mountain Climbers', sets: 8, reps: '20 sec on, 10 sec off', rest: 'Minimal' },
          { name: 'Burpees', sets: 8, reps: '20 sec on, 10 sec off', rest: 'Minimal' },
          { name: 'High Knees', sets: 8, reps: '20 sec on, 10 sec off', rest: 'Minimal' },
        ]
      },
      {
        day: 'Wednesday',
        name: 'Circuit Training',
        exercises: [
          { name: 'Jump Squats', sets: 3, reps: '45 sec', rest: '15 sec' },
          { name: 'Push-Ups', sets: 3, reps: '45 sec', rest: '15 sec' },
          { name: 'Box Jumps', sets: 3, reps: '45 sec', rest: '15 sec' },
          { name: 'Plank', sets: 3, reps: '45 sec', rest: '15 sec' },
          { name: 'Kettlebell Swings', sets: 3, reps: '45 sec', rest: '15 sec' },
        ]
      },
      {
        day: 'Friday',
        name: 'Sprint Intervals',
        exercises: [
          { name: 'Warm-Up Jog', sets: 1, reps: '5 min', rest: 'None' },
          { name: 'Sprint', sets: 10, reps: '30 sec', rest: '90 sec' },
          { name: 'Cool Down Walk', sets: 1, reps: '5 min', rest: 'None' },
        ]
      }
    ]
  }
];

// Recent workouts
const recentWorkouts = [
  {
    id: 1,
    name: 'Upper Body Focus',
    date: 'Today, 9:30 AM',
    duration: '58 min',
    calories: 420,
    exercises: 6,
    volume: '12,450 lbs',
    maxHR: 145
  },
  {
    id: 2,
    name: 'HIIT Cardio',
    date: '2 days ago, 7:15 AM',
    duration: '32 min',
    calories: 380,
    exercises: 4,
    volume: 'N/A',
    maxHR: 172
  },
  {
    id: 3,
    name: 'Leg Day',
    date: '4 days ago, 6:00 PM',
    duration: '65 min',
    calories: 520,
    exercises: 5,
    volume: '18,750 lbs',
    maxHR: 158
  }
];

const WorkoutDetail = ({ workout, onClose }: { workout: any, onClose: () => void }) => {
  return (
    <FadeIn duration={300}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">{workout.name}</h3>
          <p className="text-muted-foreground text-sm">{workout.day}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Back to List
        </Button>
      </div>
      
      <div className="space-y-6">
        {workout.exercises.map((exercise: any, index: number) => (
          <div key={index} className="border border-border/50 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium">{exercise.name}</h4>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Sets:</span>
                    <span>{exercise.sets}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Reps:</span>
                    <span>{exercise.reps}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Rest:</span>
                    <span>{exercise.rest}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                View Exercise
              </Button>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

const Workouts = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const { toast } = useToast();
  
  const togglePlan = (planId: number) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planId);
    }
  };
  
  const selectWorkout = (workout: any) => {
    setSelectedWorkout(workout);
  };
  
  const clearSelectedWorkout = () => {
    setSelectedWorkout(null);
  };

  const handleCreatePlan = () => {
    setCreatePlanOpen(false);
    toast({
      title: "Workout Plan Created",
      description: "Your new workout plan has been created successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Workout Plans</h1>
              <p className="text-muted-foreground mt-1">
                Manage your training programs and exercise routines
              </p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm" onClick={() => setCreatePlanOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Create Plan
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Tabs defaultValue="plans" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="plans">My Plans</TabsTrigger>
              <TabsTrigger value="history">Workout History</TabsTrigger>
              <TabsTrigger value="stats">Progress Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans">
              {workoutPlans.map((plan) => (
                <FadeIn key={plan.id} delay={200 + (plan.id * 50)} direction="up" className="mb-6">
                  <DashboardCard className="hover:shadow-md transition-all overflow-visible">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                            <Dumbbell className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => togglePlan(plan.id)}
                            aria-label={expandedPlan === plan.id ? "Collapse plan" : "Expand plan"}
                          >
                            {expandedPlan === plan.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate Plan</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">{plan.duration}</div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">{plan.frequency}</div>
                            <div className="text-xs text-muted-foreground">Frequency</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Timer className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">{plan.level}</div>
                            <div className="text-xs text-muted-foreground">Difficulty</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Weight className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">{plan.category}</div>
                            <div className="text-xs text-muted-foreground">Category</div>
                          </div>
                        </div>
                      </div>
                      
                      {expandedPlan === plan.id && !selectedWorkout && (
                        <div className="mt-6 space-y-4 animate-fade-in">
                          <div className="border-t pt-6 border-border/50">
                            <h4 className="font-medium mb-4">Workout Schedule</h4>
                            <div className="space-y-3">
                              {plan.workouts.map((workout, index) => (
                                <div
                                  key={index}
                                  className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                                  onClick={() => selectWorkout(workout)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">{workout.day}</div>
                                      <div className="text-sm text-muted-foreground">{workout.name}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {workout.exercises.length} exercises
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-center mt-6">
                            <Button>Start Next Workout</Button>
                          </div>
                        </div>
                      )}
                      
                      {expandedPlan === plan.id && selectedWorkout && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                          <WorkoutDetail workout={selectedWorkout} onClose={clearSelectedWorkout} />
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                </FadeIn>
              ))}
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Recent Workouts">
                    <div className="space-y-6 py-4">
                      {recentWorkouts.map((workout, index) => (
                        <div key={workout.id} className="border border-border/50 rounded-lg p-5 hover:shadow-sm transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center md:w-1/3">
                              <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary">
                                <Dumbbell className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{workout.name}</h4>
                                <p className="text-sm text-muted-foreground">{workout.date}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0 md:flex-1">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Duration</div>
                                <div className="text-sm font-medium">{workout.duration}</div>
                              </div>
                              
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Calories</div>
                                <div className="text-sm font-medium">{workout.calories}</div>
                              </div>
                              
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Exercises</div>
                                <div className="text-sm font-medium">{workout.exercises}</div>
                              </div>
                              
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Max HR</div>
                                <div className="text-sm font-medium">{workout.maxHR} bpm</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0">
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Monthly Summary" subtitle="July 2023">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-muted-foreground">Workouts Completed</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold">9.5h</div>
                        <div className="text-sm text-muted-foreground">Total Duration</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                          <Weight className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold">142,850</div>
                        <div className="text-sm text-muted-foreground">Volume (lbs)</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                          <Dumbbell className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold">85%</div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Workout Consistency" subtitle="Last 4 weeks">
                    <div className="pt-4 pb-2">
                      <div className="flex items-center justify-center">
                        <ProgressRing progress={85} size={180}>
                          <div className="text-center">
                            <div className="text-3xl font-bold">85%</div>
                            <div className="text-sm text-muted-foreground">Adherence</div>
                          </div>
                        </ProgressRing>
                      </div>
                      
                      <div className="mt-8 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Week 1</span>
                            <span className="font-medium">4/4 sessions</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Week 2</span>
                            <span className="font-medium">3/4 sessions</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Week 3</span>
                            <span className="font-medium">3/4 sessions</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Week 4</span>
                            <span className="font-medium">4/5 sessions</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Workout Distribution" subtitle="By type">
                    <div className="py-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex flex-col items-center">
                            <ProgressRing progress={45} size={100} color="#4f46e5">
                              <span className="text-lg font-medium">45%</span>
                            </ProgressRing>
                            <span className="mt-2 text-sm">Strength</span>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <ProgressRing progress={20} size={100} color="#10b981">
                              <span className="text-lg font-medium">20%</span>
                            </ProgressRing>
                            <span className="mt-2 text-sm">Cardio</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex flex-col items-center">
                            <ProgressRing progress={25} size={100} color="#f59e0b">
                              <span className="text-lg font-medium">25%</span>
                            </ProgressRing>
                            <span className="mt-2 text-sm">HIIT</span>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <ProgressRing progress={10} size={100} color="#8b5cf6">
                              <span className="text-lg font-medium">10%</span>
                            </ProgressRing>
                            <span className="mt-2 text-sm">Flexibility</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-2">
                  <DashboardCard title="Strength Progress" subtitle="Key exercises">
                    <div className="py-6 space-y-8">
                      <div>
                        <h4 className="font-medium mb-4">Bench Press (5 rep max)</h4>
                        <div className="h-16 bg-secondary/50 rounded-lg relative">
                          <div className="absolute inset-0 flex items-center px-4">
                            <div className="w-full relative">
                              <div className="h-0.5 bg-muted-foreground/30 w-full absolute top-1/2 -translate-y-1/2"></div>
                              
                              {/* Data points */}
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '0%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 1</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">185 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 8</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">190 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '50%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 15</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">195 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 22</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">195 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '100%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 29</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">205 lbs</div>
                              </div>
                              
                              {/* Connecting line */}
                              <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-primary" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-4">Squat (5 rep max)</h4>
                        <div className="h-16 bg-secondary/50 rounded-lg relative">
                          <div className="absolute inset-0 flex items-center px-4">
                            <div className="w-full relative">
                              <div className="h-0.5 bg-muted-foreground/30 w-full absolute top-1/2 -translate-y-1/2"></div>
                              
                              {/* Data points */}
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '0%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 2</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">225 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 9</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">235 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '50%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 16</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">245 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 23</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">250 lbs</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '100%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 30</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">265 lbs</div>
                              </div>
                              
                              {/* Connecting line */}
                              <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-primary" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-4">Pull-Ups (Max Reps)</h4>
                        <div className="h-16 bg-secondary/50 rounded-lg relative">
                          <div className="absolute inset-0 flex items-center px-4">
                            <div className="w-full relative">
                              <div className="h-0.5 bg-muted-foreground/30 w-full absolute top-1/2 -translate-y-1/2"></div>
                              
                              {/* Data points */}
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '0%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 3</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">8 reps</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 10</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">9 reps</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '50%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 17</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">10 reps</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jun 24</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">11 reps</div>
                              </div>
                              
                              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '100%' }}>
                                <div className="w-3 h-3 rounded-full bg-primary -mt-1.5"></div>
                                <div className="absolute -bottom-6 -left-3 text-xs whitespace-nowrap">Jul 1</div>
                                <div className="absolute -top-6 -left-3 text-xs whitespace-nowrap">12 reps</div>
                              </div>
                              
                              {/* Connecting line */}
                              <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-primary" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>

      <Dialog open={createPlanOpen} onOpenChange={setCreatePlanOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Workout Plan</DialogTitle>
          </DialogHeader>
          <WorkoutPlanForm 
            onSubmit={handleCreatePlan}
            onCancel={() => setCreatePlanOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
