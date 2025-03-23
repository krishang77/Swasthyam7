
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Award, BarChart, Calendar, Check, CheckCircle, ChevronRight, Clock, Edit, Flag, MoreHorizontal, Plus, Trash } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ActionModal } from '@/components/ui/action-modal';
import GoalForm from '@/components/goals/GoalForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Sample data
const activeGoals = [
  { id: 1, name: 'Run 5K', category: 'Distance', target: '5 kilometers', progress: 75, dueDate: 'Aug 15, 2023', priority: 'High' },
  { id: 2, name: 'Lose Weight', category: 'Weight', target: '5 kg', progress: 60, dueDate: 'Sep 30, 2023', priority: 'Medium' },
  { id: 3, name: 'Sleep 8 Hours Daily', category: 'Sleep', target: '8 hours avg', progress: 90, dueDate: 'Ongoing', priority: 'Medium' },
  { id: 4, name: 'Drink More Water', category: 'Nutrition', target: '2.5 liters daily', progress: 40, dueDate: 'Ongoing', priority: 'Low' },
  { id: 5, name: 'Bench Press 100kg', category: 'Strength', target: '100 kg × 5 reps', progress: 85, dueDate: 'Aug 20, 2023', priority: 'Medium' },
];

const completedGoals = [
  { id: 6, name: 'Walk 10K Steps Daily', category: 'Steps', target: '10K steps', completedDate: 'Jul 10, 2023' },
  { id: 7, name: 'Complete 30-Day Yoga Challenge', category: 'Other', target: '30 sessions', completedDate: 'Jun 25, 2023' },
  { id: 8, name: 'Reduce Body Fat', category: 'Weight', target: '20% to 15%', completedDate: 'May 15, 2023' },
];

const goalCategories = {
  'All': '#6b7280',
  'Weight': '#f59e0b',
  'Steps': '#10b981',
  'Distance': '#3b82f6',
  'Strength': '#8b5cf6',
  'Nutrition': '#ef4444',
  'Sleep': '#06b6d4',
  'Other': '#6b7280',
};

const Goals = () => {
  const { toast } = useToast();
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleAddGoalSubmit = () => {
    toast({
      title: "Goal added",
      description: "Your new goal has been created successfully.",
    });
    setAddGoalOpen(false);
  };

  const handleEditGoal = (goalId: number) => {
    toast({
      title: "Edit goal",
      description: `Editing goal #${goalId}`,
    });
  };

  const handleDeleteGoal = (goalId: number) => {
    toast({
      title: "Goal deleted",
      description: `Goal #${goalId} has been deleted`,
    });
  };

  const handleCompleteGoal = (goalId: number) => {
    toast({
      title: "Goal completed",
      description: `Goal #${goalId} has been marked as complete`,
    });
  };

  const filteredActiveGoals = filterCategory === 'All' 
    ? activeGoals 
    : activeGoals.filter(goal => goal.category === filterCategory);

  const filteredCompletedGoals = filterCategory === 'All' 
    ? completedGoals 
    : completedGoals.filter(goal => goal.category === filterCategory);

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Goals Tracker</h1>
              <p className="text-muted-foreground mt-1">
                Set and track your fitness and health goals
              </p>
            </div>
            <Button 
              className="mt-4 md:mt-0" 
              size="sm"
              onClick={() => setAddGoalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add New Goal
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <FadeIn delay={150}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Flag className="h-7 w-7 text-primary" />
                </div>
                <span className="text-2xl font-bold">{activeGoals.length}</span>
                <span className="text-sm text-muted-foreground">Active Goals</span>
              </div>
            </DashboardCard>
          </FadeIn>

          <FadeIn delay={200}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <span className="text-2xl font-bold">{completedGoals.length}</span>
                <span className="text-sm text-muted-foreground">Completed Goals</span>
              </div>
            </DashboardCard>
          </FadeIn>

          <FadeIn delay={250}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <BarChart className="h-7 w-7 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">70%</span>
                <span className="text-sm text-muted-foreground">Avg. Completion</span>
              </div>
            </DashboardCard>
          </FadeIn>

          <FadeIn delay={300}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <Award className="h-7 w-7 text-purple-600" />
                </div>
                <span className="text-2xl font-bold">15</span>
                <span className="text-sm text-muted-foreground">Total Achieved</span>
              </div>
            </DashboardCard>
          </FadeIn>
        </div>

        <FadeIn delay={350}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex overflow-x-auto pb-2 mb-2 scrollbar-hide">
              {Object.entries(goalCategories).map(([category, color]) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  className="mr-2 whitespace-nowrap"
                  onClick={() => setFilterCategory(category)}
                >
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: color as string }}
                  />
                  {category}
                </Button>
              ))}
            </div>

            <Tabs defaultValue="active">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="active">Active Goals</TabsTrigger>
                <TabsTrigger value="completed">Completed Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <DashboardCard>
                  <div className="space-y-6">
                    {filteredActiveGoals.length === 0 ? (
                      <div className="p-4 text-center">
                        <p>No active goals in this category.</p>
                      </div>
                    ) : (
                      filteredActiveGoals.map((goal) => (
                        <div 
                          key={goal.id}
                          className="flex flex-col sm:flex-row items-start border-b border-border last:border-0 pb-6 last:pb-0"
                        >
                          <div className="flex-1">
                            <div className="flex items-center flex-wrap">
                              <h3 className="font-semibold">{goal.name}</h3>
                              <span 
                                className="text-xs px-2 py-0.5 rounded-full ml-3"
                                style={{ 
                                  backgroundColor: `${goalCategories[goal.category as keyof typeof goalCategories]}20`,
                                  color: goalCategories[goal.category as keyof typeof goalCategories]
                                }}
                              >
                                {goal.category}
                              </span>
                              <span 
                                className={`text-xs px-2 py-0.5 rounded-full ml-3 ${
                                  goal.priority === 'High' 
                                    ? 'bg-red-100 text-red-600' 
                                    : goal.priority === 'Medium'
                                    ? 'bg-orange-100 text-orange-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                              >
                                {goal.priority}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Due: {goal.dueDate}</span>
                            </div>

                            <div className="mt-3">
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Target: {goal.target}</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2" />
                            </div>
                          </div>

                          <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 mt-4 sm:mt-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600"
                              onClick={() => handleCompleteGoal(goal.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditGoal(goal.id)}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleDeleteGoal(goal.id)}
                                >
                                  <Trash className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </DashboardCard>
              </TabsContent>

              <TabsContent value="completed">
                <DashboardCard>
                  <div className="space-y-4">
                    {filteredCompletedGoals.length === 0 ? (
                      <div className="p-4 text-center">
                        <p>No completed goals in this category.</p>
                      </div>
                    ) : (
                      filteredCompletedGoals.map((goal) => (
                        <div 
                          key={goal.id}
                          className="flex items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="mr-4 p-2 rounded-full bg-green-100 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium">{goal.name}</h4>
                              <span 
                                className="text-xs px-2 py-0.5 rounded-full ml-3"
                                style={{ 
                                  backgroundColor: `${goalCategories[goal.category as keyof typeof goalCategories]}20`,
                                  color: goalCategories[goal.category as keyof typeof goalCategories]
                                }}
                              >
                                {goal.category}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <span>Target: {goal.target}</span>
                              <span className="mx-2">•</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Completed: {goal.completedDate}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toast({
                              title: "View goal details",
                              description: `Viewing details for goal "${goal.name}"`,
                            })}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </DashboardCard>
              </TabsContent>
            </Tabs>
          </div>
        </FadeIn>
      </div>

      {/* Add Goal Modal */}
      <ActionModal
        title="Add New Goal"
        description="Set a new goal to track your progress"
        isOpen={addGoalOpen}
        onOpenChange={setAddGoalOpen}
      >
        <GoalForm 
          onSubmit={handleAddGoalSubmit} 
          onCancel={() => setAddGoalOpen(false)} 
        />
      </ActionModal>
    </div>
  );
};

export default Goals;
