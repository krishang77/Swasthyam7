
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { BedIcon, Calendar, Clock, Moon, Plus, Sun } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActionModal } from '@/components/ui/action-modal';
import SleepLogForm from '@/components/sleep/SleepLogForm';
import { useToast } from '@/components/ui/use-toast';

// Sample data
const sleepData = [
  { date: 'Mon', hours: 7.5, quality: 85 },
  { date: 'Tue', hours: 6.8, quality: 75 },
  { date: 'Wed', hours: 8.2, quality: 90 },
  { date: 'Thu', hours: 7.0, quality: 80 },
  { date: 'Fri', hours: 6.5, quality: 70 },
  { date: 'Sat', hours: 8.5, quality: 95 },
  { date: 'Sun', hours: 7.8, quality: 88 },
];

const sleepLogs = [
  { id: 1, date: 'Today', sleepTime: '10:30 PM', wakeTime: '6:00 AM', duration: '7h 30m', quality: 'Good', notes: 'Slept well, minimal disturbances' },
  { id: 2, date: 'Yesterday', sleepTime: '11:15 PM', wakeTime: '6:45 AM', duration: '7h 30m', quality: 'Fair', notes: 'Woke up once during night' },
  { id: 3, date: 'Jul 22, 2023', sleepTime: '10:00 PM', wakeTime: '5:45 AM', duration: '7h 45m', quality: 'Excellent', notes: 'Deep sleep throughout' },
  { id: 4, date: 'Jul 21, 2023', sleepTime: '11:30 PM', wakeTime: '7:00 AM', duration: '7h 30m', quality: 'Good', notes: 'Normal sleep pattern' },
];

const Sleep = () => {
  const { toast } = useToast();
  const [logSleepOpen, setLogSleepOpen] = useState(false);

  const handleLogSleepSubmit = () => {
    toast({
      title: "Sleep logged",
      description: "Your sleep data has been logged successfully.",
    });
    setLogSleepOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sleep Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Monitor your sleep patterns and quality
              </p>
            </div>
            <Button 
              className="mt-4 md:mt-0" 
              size="sm"
              onClick={() => setLogSleepOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Log Sleep
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FadeIn delay={150}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <span className="text-2xl font-bold">7.6 hrs</span>
                <span className="text-sm text-muted-foreground">Avg. Duration</span>
              </div>
            </DashboardCard>
          </FadeIn>
          
          <FadeIn delay={200}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Moon className="h-7 w-7 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">83%</span>
                <span className="text-sm text-muted-foreground">Avg. Quality</span>
              </div>
            </DashboardCard>
          </FadeIn>
          
          <FadeIn delay={250}>
            <DashboardCard>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Sun className="h-7 w-7 text-orange-600" />
                </div>
                <span className="text-2xl font-bold">6:15 AM</span>
                <span className="text-sm text-muted-foreground">Avg. Wake Time</span>
              </div>
            </DashboardCard>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FadeIn delay={300} className="lg:col-span-2">
            <DashboardCard title="Sleep Trends" subtitle="Last 7 days">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sleepData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left"
                      domain={[0, 10]}
                      tickCount={6}
                      tickFormatter={(value) => `${value}h`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sleep Duration"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="quality" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      name="Sleep Quality"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </FadeIn>
          
          <FadeIn delay={350}>
            <DashboardCard title="Sleep Insights" subtitle="Based on your data">
              <div className="space-y-6 py-2">
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <BedIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Consistent Sleep Schedule</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your sleep times have been consistent, which helps maintain your circadian rhythm.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-orange-100 text-orange-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sleep Duration</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're averaging 7.6 hours of sleep, which is within the recommended 7-9 hours for adults.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-blue-100 text-blue-600">
                    <Moon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sleep Quality</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your sleep quality has improved by 5% compared to last week. Keep up the good work!
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </FadeIn>
        </div>
        
        <FadeIn delay={400} className="mt-6">
          <DashboardCard title="Sleep Log" subtitle="Recent entries">
            <div className="space-y-4">
              {sleepLogs.map((log) => (
                <div 
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="mr-4 flex-shrink-0 p-2 rounded-full bg-blue-100 text-blue-600">
                    <BedIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">{log.date}</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-3">
                        {log.quality}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-1">
                      <div className="flex items-center mr-4">
                        <Moon className="h-3 w-3 mr-1" />
                        <span>{log.sleepTime}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Sun className="h-3 w-3 mr-1" />
                        <span>{log.wakeTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{log.duration}</span>
                      </div>
                    </div>
                    {log.notes && (
                      <p className="text-sm mt-2">{log.notes}</p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 sm:mt-0 sm:self-start"
                    onClick={() => toast({
                      title: "View sleep details",
                      description: `Viewing details for sleep log from ${log.date}`,
                    })}
                  >
                    Details
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toast({
                  title: "View all sleep logs",
                  description: "This would show a complete history of all sleep logs.",
                })}
              >
                View All Sleep Logs
              </Button>
            </div>
          </DashboardCard>
        </FadeIn>
      </div>

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

export default Sleep;
