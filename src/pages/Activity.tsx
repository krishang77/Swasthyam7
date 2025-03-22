
import React, { useState } from 'react';
import { Calendar, Clock, Flame, HeartPulse, MapPin, MoreHorizontal, Plus, Ruler, Timer, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { PieChart, Pie, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import FadeIn from '@/components/animations/FadeIn';

// Sample data
const recentActivities = [
  { 
    id: 1, 
    type: 'Running', 
    date: 'Today, 10:30 AM', 
    duration: '35 min', 
    distance: '5.2 km', 
    calories: 320, 
    avgHeartRate: 142 
  },
  { 
    id: 2, 
    type: 'Cycling', 
    date: 'Yesterday, 5:15 PM', 
    duration: '1h 15min', 
    distance: '22.8 km', 
    calories: 580, 
    avgHeartRate: 135 
  },
  { 
    id: 3, 
    type: 'Swimming', 
    date: 'Jul 22, 2023, 8:00 AM', 
    duration: '45 min', 
    distance: '1.5 km', 
    calories: 410, 
    avgHeartRate: 128 
  },
  { 
    id: 4, 
    type: 'Walking', 
    date: 'Jul 21, 2023, 12:30 PM', 
    duration: '50 min', 
    distance: '4.1 km', 
    calories: 210, 
    avgHeartRate: 105 
  },
  { 
    id: 5, 
    type: 'HIIT Workout', 
    date: 'Jul 20, 2023, 6:45 PM', 
    duration: '25 min', 
    distance: '0 km', 
    calories: 350, 
    avgHeartRate: 155 
  },
];

const weeklyStats = [
  { name: 'Mon', minutes: 45, calories: 320 },
  { name: 'Tue', minutes: 60, calories: 450 },
  { name: 'Wed', minutes: 30, calories: 280 },
  { name: 'Thu', minutes: 75, calories: 520 },
  { name: 'Fri', minutes: 55, calories: 380 },
  { name: 'Sat', minutes: 85, calories: 620 },
  { name: 'Sun', minutes: 40, calories: 310 },
];

const activityDistribution = [
  { name: 'Running', value: 35, color: '#4f46e5' },
  { name: 'Cycling', value: 25, color: '#06b6d4' },
  { name: 'Walking', value: 15, color: '#10b981' },
  { name: 'Swimming', value: 10, color: '#f59e0b' },
  { name: 'Other', value: 15, color: '#6b7280' },
];

const Activity = () => {
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Activity Tracker</h1>
              <p className="text-muted-foreground mt-1">
                Monitor your activities and track your progress
              </p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Activity
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Tabs defaultValue="activity" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="activity">Recent Activities</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-6">
              {recentActivities.map((activity, index) => (
                <FadeIn key={activity.id} delay={200 + (index * 50)} direction="up">
                  <DashboardCard className="hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold">{activity.type}</h3>
                          <span className="text-xs text-muted-foreground ml-4">{activity.date}</span>
                          <div className="ml-auto">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Activity</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{activity.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Ruler className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{activity.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <Flame className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{activity.calories} calories</span>
                          </div>
                          <div className="flex items-center">
                            <HeartPulse className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{activity.avgHeartRate} bpm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                Load More Activities
              </Button>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Weekly Activity Duration">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyStats} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                          <YAxis 
                            tickLine={false} 
                            axisLine={false} 
                            unit="min" 
                            width={40}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                            formatter={(value: number) => [`${value} min`, 'Duration']}
                          />
                          <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Activity Distribution">
                    <div className="h-[300px] w-full flex flex-col items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={activityDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {activityDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                            formatter={(value: number) => [`${value}%`, 'Percentage']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {activityDistribution.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm">{item.name} ({item.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-2">
                  <DashboardCard title="Activity Summary" subtitle="Last 30 days">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Clock className="h-7 w-7 text-primary" />
                        </div>
                        <span className="text-2xl font-bold">42h</span>
                        <span className="text-sm text-muted-foreground">Total Duration</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <MapPin className="h-7 w-7 text-blue-600" />
                        </div>
                        <span className="text-2xl font-bold">185 km</span>
                        <span className="text-sm text-muted-foreground">Total Distance</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                          <Flame className="h-7 w-7 text-orange-600" />
                        </div>
                        <span className="text-2xl font-bold">15,240</span>
                        <span className="text-sm text-muted-foreground">Calories Burned</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <Calendar className="h-7 w-7 text-green-600" />
                        </div>
                        <span className="text-2xl font-bold">24</span>
                        <span className="text-sm text-muted-foreground">Total Activities</span>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="grid grid-cols-1 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Activity Progress" subtitle="Last 3 months">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { month: 'May', duration: 1850, target: 2000 },
                            { month: 'Jun', duration: 2200, target: 2000 },
                            { month: 'Jul', duration: 1950, target: 2000 },
                          ]}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" />
                          <YAxis 
                            yAxisId="left" 
                            orientation="left" 
                            tickFormatter={(value) => `${value / 60}h`} 
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                            formatter={(value: number) => [`${Math.round(value / 60 * 10) / 10}h`, 'Duration']}
                          />
                          <Bar yAxisId="left" dataKey="duration" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Performance Insights" className="mb-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Consistency Improvement</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You've been more consistent with your workouts over the past 30 days, with a 15% increase in regular activity sessions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-2 rounded-full bg-orange-100 text-orange-600">
                          <Timer className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Workout Duration</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your average workout duration has increased from 35 minutes to 48 minutes compared to last month.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-2 rounded-full bg-blue-100 text-blue-600">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cardiovascular Improvement</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your resting heart rate has decreased by 4 bpm over the past two months, indicating improved cardiovascular fitness.
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

export default Activity;
