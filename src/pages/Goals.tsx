
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, CheckSquare, ChevronRight, Clock, Dumbbell, Flag, MoreHorizontal, PieChart, Plus, Target, Timer, TrendingUp, Weight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ProgressRing from '@/components/ui/ProgressRing';
import FadeIn from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';

// Sample goals data
const currentGoals = [
  {
    id: 1,
    title: 'Run 5K in Under 25 Minutes',
    category: 'Cardio',
    progress: 85,
    dueDate: 'Aug 15, 2023',
    status: 'On Track',
    description: 'Improve 5K run time from current 27:30 to under 25 minutes.',
    milestones: [
      { title: 'Run 5K in under 27 minutes', completed: true },
      { title: 'Run 5K in under 26 minutes', completed: true },
      { title: 'Run 5K in under 25:30', completed: false },
      { title: 'Run 5K in under 25 minutes', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Bench Press 225 lbs for 5 Reps',
    category: 'Strength',
    progress: 70,
    dueDate: 'Sep 30, 2023',
    status: 'On Track',
    description: 'Increase bench press strength from current 205 lbs to 225 lbs for 5 reps.',
    milestones: [
      { title: 'Bench 205 lbs for 5 reps', completed: true },
      { title: 'Bench 215 lbs for 3 reps', completed: true },
      { title: 'Bench 215 lbs for 5 reps', completed: false },
      { title: 'Bench 225 lbs for 3 reps', completed: false },
      { title: 'Bench 225 lbs for 5 reps', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Reduce Body Fat to 15%',
    category: 'Body Composition',
    progress: 60,
    dueDate: 'Oct 15, 2023',
    status: 'Needs Attention',
    description: 'Reduce body fat percentage from current 18% to 15% while maintaining muscle mass.',
    milestones: [
      { title: 'Reach 17.5% body fat', completed: true },
      { title: 'Reach 17% body fat', completed: true },
      { title: 'Reach 16% body fat', completed: false },
      { title: 'Reach 15% body fat', completed: false },
    ]
  },
  {
    id: 4,
    title: 'Complete 30-Day Yoga Challenge',
    category: 'Flexibility',
    progress: 40,
    dueDate: 'Aug 10, 2023',
    status: 'On Track',
    description: 'Complete a 30-day yoga program to improve flexibility and mindfulness.',
    milestones: [
      { title: 'Complete first week', completed: true },
      { title: 'Complete second week', completed: true },
      { title: 'Complete third week', completed: false },
      { title: 'Complete fourth week', completed: false },
    ]
  },
];

const completedGoals = [
  {
    id: 5,
    title: 'Run 10,000 Steps Daily for a Month',
    category: 'Activity',
    completedDate: 'Jul 15, 2023',
    result: 'Success',
    description: 'Consistently reached 10,000+ steps every day for 30 days.'
  },
  {
    id: 6,
    title: 'Learn Proper Olympic Lifting Form',
    category: 'Skill',
    completedDate: 'Jun 20, 2023',
    result: 'Success',
    description: 'Completed coaching sessions and mastered proper form for clean & jerk and snatch.'
  },
  {
    id: 7,
    title: 'Complete Half Marathon',
    category: 'Endurance',
    completedDate: 'May 8, 2023',
    result: 'Success',
    description: 'Finished half marathon in 1:55:32.'
  },
];

const Goals = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedGoal, setSelectedGoal] = useState<any | null>(null);
  
  const selectGoal = (goal: any) => {
    setSelectedGoal(goal);
  };
  
  const clearSelectedGoal = () => {
    setSelectedGoal(null);
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Fitness Goals</h1>
              <p className="text-muted-foreground mt-1">
                Track your progress and achieve your fitness targets
              </p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add New Goal
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="current">Current Goals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <div className="grid grid-cols-1 gap-6">
                {!selectedGoal ? (
                  <>
                    {currentGoals.map((goal, index) => (
                      <FadeIn key={goal.id} delay={200 + (index * 50)} direction="up">
                        <DashboardCard
                          className="hover:shadow-md transition-all cursor-pointer"
                          onClick={() => selectGoal(goal)}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center">
                            <div className="flex items-start lg:w-1/2">
                              <div className="mr-4">
                                <ProgressRing progress={goal.progress} size={80} strokeWidth={6}>
                                  <span className="text-base font-medium">{goal.progress}%</span>
                                </ProgressRing>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-semibold">{goal.title}</h3>
                                <Badge variant="outline" className="mt-1 font-normal">
                                  {goal.category}
                                </Badge>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {goal.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-4 lg:mt-0 lg:w-1/2 grid grid-cols-2 gap-6">
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                                <div>
                                  <div className="text-sm">Due Date</div>
                                  <div className="text-sm font-medium">{goal.dueDate}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <Flag className={`h-5 w-5 mr-2 ${
                                  goal.status === 'On Track' ? 'text-green-600' : 
                                  goal.status === 'Needs Attention' ? 'text-yellow-600' : 
                                  'text-red-600'
                                }`} />
                                <div>
                                  <div className="text-sm">Status</div>
                                  <div className="text-sm font-medium">{goal.status}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center col-span-2 justify-end">
                                <Button variant="ghost" size="sm">
                                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DashboardCard>
                      </FadeIn>
                    ))}
                  </>
                ) : (
                  <FadeIn delay={200} className="animate-fade-in">
                    <DashboardCard className="hover:shadow-md transition-all">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-semibold">{selectedGoal.title}</h3>
                          <Badge variant="outline" className="mt-1 font-normal">
                            {selectedGoal.category}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={clearSelectedGoal}>
                          Back to List
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex flex-col items-center justify-center">
                          <ProgressRing progress={selectedGoal.progress} size={120} strokeWidth={8}>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{selectedGoal.progress}%</div>
                              <div className="text-xs text-muted-foreground">Complete</div>
                            </div>
                          </ProgressRing>
                        </div>
                        
                        <div className="md:col-span-2 space-y-6">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                            <p>{selectedGoal.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-2">Due Date</h4>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                                <span>{selectedGoal.dueDate}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                              <div className="flex items-center">
                                <Flag className={`h-5 w-5 mr-2 ${
                                  selectedGoal.status === 'On Track' ? 'text-green-600' : 
                                  selectedGoal.status === 'Needs Attention' ? 'text-yellow-600' : 
                                  'text-red-600'
                                }`} />
                                <span>{selectedGoal.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="font-medium mb-4">Milestones</h4>
                        <div className="space-y-3">
                          {selectedGoal.milestones.map((milestone: any, index: number) => (
                            <div 
                              key={index}
                              className={`p-4 border rounded-lg flex items-center justify-between ${
                                milestone.completed ? 
                                'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30' : 
                                'border-border'
                              }`}
                            >
                              <div className="flex items-center">
                                {milestone.completed ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mr-3" />
                                )}
                                <span className={milestone.completed ? 'font-medium' : ''}>
                                  {milestone.title}
                                </span>
                              </div>
                              
                              {!milestone.completed && (
                                <Button variant="outline" size="sm">
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline">
                          Edit Goal
                        </Button>
                        <Button>
                          Update Progress
                        </Button>
                      </div>
                    </DashboardCard>
                  </FadeIn>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 gap-6">
                {completedGoals.map((goal, index) => (
                  <FadeIn key={goal.id} delay={200 + (index * 50)} direction="up">
                    <DashboardCard className="hover:shadow-md transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="flex items-start lg:w-1/2">
                          <div className="mr-4 p-3 rounded-full bg-green-100 text-green-600">
                            <CheckSquare className="h-6 w-6" />
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            <Badge variant="outline" className="mt-1 font-normal">
                              {goal.category}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-2">
                              {goal.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 lg:w-1/2 grid grid-cols-2 gap-6">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm">Completed On</div>
                              <div className="text-sm font-medium">{goal.completedDate}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Flag className="h-5 w-5 text-green-600 mr-2" />
                            <div>
                              <div className="text-sm">Result</div>
                              <div className="text-sm font-medium">{goal.result}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center col-span-2 justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4 mr-2" /> Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Create Similar Goal</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </DashboardCard>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Goal Completion Rate" subtitle="Last 6 months">
                    <div className="flex flex-col items-center py-6">
                      <ProgressRing progress={78} size={180}>
                        <div className="text-center">
                          <div className="text-3xl font-bold">78%</div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                        </div>
                      </ProgressRing>
                      
                      <div className="grid grid-cols-2 gap-8 mt-8 w-full">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-green-600">11</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-yellow-600">3</div>
                          <div className="text-sm text-muted-foreground">In Progress</div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Goal Categories" subtitle="Distribution">
                    <div className="grid grid-cols-2 gap-4 py-6">
                      <div className="flex flex-col items-center">
                        <ProgressRing progress={40} size={100} color="#4f46e5">
                          <span className="text-lg font-medium">40%</span>
                        </ProgressRing>
                        <span className="mt-2 text-sm">Strength</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <ProgressRing progress={25} size={100} color="#10b981">
                          <span className="text-lg font-medium">25%</span>
                        </ProgressRing>
                        <span className="mt-2 text-sm">Cardio</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <ProgressRing progress={20} size={100} color="#f59e0b">
                          <span className="text-lg font-medium">20%</span>
                        </ProgressRing>
                        <span className="mt-2 text-sm">Weight</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <ProgressRing progress={15} size={100} color="#8b5cf6">
                          <span className="text-lg font-medium">15%</span>
                        </ProgressRing>
                        <span className="mt-2 text-sm">Other</span>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-2">
                  <DashboardCard title="Goal Achievement Timeline" subtitle="Past 12 months">
                    <div className="py-8 px-4 overflow-x-auto">
                      <div className="min-w-[800px]">
                        <div className="relative">
                          {/* Timeline line */}
                          <div className="absolute left-0 right-0 h-0.5 bg-muted top-10"></div>
                          
                          {/* Timeline nodes */}
                          <div className="flex justify-between relative">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Feb 2023</div>
                              <div className="w-5 h-5 rounded-full bg-green-600 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-green-600">Strength</Badge>
                                  <div className="text-sm mt-2">Bench Press Goal</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 2 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Apr 2023</div>
                              <div className="w-5 h-5 rounded-full bg-red-500 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-red-500">Failed</Badge>
                                  <div className="text-sm mt-2">Weight Loss</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 3 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">May 2023</div>
                              <div className="w-5 h-5 rounded-full bg-green-600 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-green-600">Cardio</Badge>
                                  <div className="text-sm mt-2">Half Marathon</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 4 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Jun 2023</div>
                              <div className="w-5 h-5 rounded-full bg-green-600 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-green-600">Skill</Badge>
                                  <div className="text-sm mt-2">Olympic Lifting</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 5 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Jul 2023</div>
                              <div className="w-5 h-5 rounded-full bg-green-600 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-green-600">Activity</Badge>
                                  <div className="text-sm mt-2">10K Steps</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 6 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Aug 2023</div>
                              <div className="w-5 h-5 rounded-full bg-yellow-500 z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge className="bg-yellow-500">In Progress</Badge>
                                  <div className="text-sm mt-2">5K Run Time</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Node 7 */}
                            <div className="flex flex-col items-center w-24">
                              <div className="mb-2 text-sm text-muted-foreground">Oct 2023</div>
                              <div className="w-5 h-5 rounded-full bg-secondary z-10"></div>
                              <div className="mt-4">
                                <div className="text-center">
                                  <Badge variant="outline">Planned</Badge>
                                  <div className="text-sm mt-2">Body Fat %</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={350} className="md:col-span-2">
                  <DashboardCard title="Goal Setting Tips" subtitle="Improve your success rate">
                    <div className="space-y-6 py-4">
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Set SMART Goals</h4>
                          <p className="text-muted-foreground mt-1">
                            Your most successful goals follow the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound. Continue using this approach for new goals.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-blue-100 text-blue-600">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Progressive Overload</h4>
                          <p className="text-muted-foreground mt-1">
                            Your strength goals show better success when using progressive milestones. Break down larger goals into smaller steps with gradual increases.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-green-100 text-green-600">
                          <PieChart className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Balance Your Goals</h4>
                          <p className="text-muted-foreground mt-1">
                            Your data shows you're more successful when balancing different goal types. Try maintaining a mix of strength, cardio, and lifestyle goals simultaneously.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-purple-100 text-purple-600">
                          <Timer className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Realistic Timeframes</h4>
                          <p className="text-muted-foreground mt-1">
                            Goals with 8-12 week timeframes have your highest completion rate. Consider this timeline when setting new challenging goals.
                          </p>
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
    </div>
  );
};

export default Goals;
