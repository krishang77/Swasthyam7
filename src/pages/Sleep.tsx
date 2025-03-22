
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Bed, Clock, HeartPulse, Moon, Sun, ThermometerSun } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import FadeIn from '@/components/animations/FadeIn';

// Sample sleep data
const sleepData = [
  { date: 'Jul 17', hours: 5.8, deep: 1.4, rem: 1.6, light: 2.8 },
  { date: 'Jul 18', hours: 6.5, deep: 1.7, rem: 1.8, light: 3.0 },
  { date: 'Jul 19', hours: 7.2, deep: 2.1, rem: 2.2, light: 2.9 },
  { date: 'Jul 20', hours: 8.1, deep: 2.5, rem: 2.6, light: 3.0 },
  { date: 'Jul 21', hours: 7.8, deep: 2.2, rem: 2.4, light: 3.2 },
  { date: 'Jul 22', hours: 7.5, deep: 2.0, rem: 2.3, light: 3.2 },
  { date: 'Jul 23', hours: 7.7, deep: 2.1, rem: 2.4, light: 3.2 },
];

// Last night's sleep metrics
const lastNightSleep = {
  date: 'July 23, 2023',
  total: 7.7,
  deep: 2.1,
  rem: 2.4,
  light: 3.2,
  awake: 0.2,
  sleepScore: 85,
  bedtime: '10:45 PM',
  wakeup: '6:28 AM',
  restlessness: 'Low',
  heartRate: {
    avg: 58,
    min: 52,
    max: 68
  },
  temperature: {
    value: 36.5,
    variance: -0.2
  }
};

const Sleep = () => {
  const [activeTab, setActiveTab] = useState('lastNight');

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sleep Insights</h1>
              <p className="text-muted-foreground mt-1">
                Track and analyze your sleep patterns
              </p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm">
              <Bed className="h-4 w-4 mr-2" /> Log Sleep
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Tabs defaultValue="lastNight" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="lastNight">Last Night</TabsTrigger>
              <TabsTrigger value="trends">Sleep Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lastNight">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FadeIn delay={200} className="lg:col-span-2">
                  <DashboardCard title="Sleep Stages" subtitle={lastNightSleep.date}>
                    <div className="flex flex-col lg:flex-row items-center justify-between my-4">
                      <div className="flex flex-col items-center mb-4 lg:mb-0">
                        <div className="text-4xl font-bold">{lastNightSleep.total}h</div>
                        <span className="text-sm text-muted-foreground">Total Sleep</span>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-500" />
                          <div className="flex flex-col">
                            <span className="font-medium">{lastNightSleep.deep}h</span>
                            <span className="text-xs text-muted-foreground">Deep</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <div className="flex flex-col">
                            <span className="font-medium">{lastNightSleep.rem}h</span>
                            <span className="text-xs text-muted-foreground">REM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-blue-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">{lastNightSleep.light}h</span>
                            <span className="text-xs text-muted-foreground">Light</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">{lastNightSleep.awake}h</span>
                            <span className="text-xs text-muted-foreground">Awake</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-48 mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { time: '11PM', stage: 1 },
                          { time: '12AM', stage: 2 },
                          { time: '1AM', stage: 3 },
                          { time: '2AM', stage: 4 },
                          { time: '3AM', stage: 3 },
                          { time: '4AM', stage: 2 },
                          { time: '5AM', stage: 3 },
                          { time: '6AM', stage: 2 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="time" />
                          <YAxis 
                            domain={[0, 4]} 
                            ticks={[0, 1, 2, 3, 4]} 
                            tickFormatter={(value) => {
                              switch(value) {
                                case 0: return 'Awake';
                                case 1: return 'Light';
                                case 2: return 'REM';
                                case 3: return 'Deep';
                                case 4: return '';
                                default: return '';
                              }
                            }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                            formatter={(value: number) => {
                              switch(value) {
                                case 0: return ['Awake', 'Sleep Stage'];
                                case 1: return ['Light Sleep', 'Sleep Stage'];
                                case 2: return ['REM Sleep', 'Sleep Stage'];
                                case 3: return ['Deep Sleep', 'Sleep Stage'];
                                default: return ['', ''];
                              }
                            }}
                          />
                          <defs>
                            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="stepAfter" 
                            dataKey="stage" 
                            stroke="hsl(var(--primary))" 
                            fill="url(#sleepGradient)" 
                            isAnimationActive={true}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600">
                          <Moon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{lastNightSleep.bedtime}</div>
                          <div className="text-xs text-muted-foreground">Bedtime</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-yellow-100 text-yellow-600">
                          <Sun className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{lastNightSleep.wakeup}</div>
                          <div className="text-xs text-muted-foreground">Wake Up</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-red-100 text-red-600">
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{lastNightSleep.heartRate.avg} bpm</div>
                          <div className="text-xs text-muted-foreground">Avg Heart Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-orange-100 text-orange-600">
                          <ThermometerSun className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{lastNightSleep.temperature.value}°C</div>
                          <div className="text-xs text-muted-foreground">Body Temperature</div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Sleep Quality Score">
                    <div className="flex flex-col items-center py-6">
                      <div className="relative">
                        <svg width="160" height="160" viewBox="0 0 160 160">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="hsl(var(--muted))"
                            strokeWidth="12"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="12"
                            strokeDasharray="439.6"
                            strokeDashoffset={439.6 - (lastNightSleep.sleepScore / 100) * 439.6}
                            strokeLinecap="round"
                            transform="rotate(-90 80 80)"
                            className="animate-circle-progress"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-4xl font-bold">{lastNightSleep.sleepScore}</span>
                          <span className="text-sm text-muted-foreground">out of 100</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 w-full space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Duration</span>
                            <span className="font-medium">Very Good</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '90%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Deep Sleep</span>
                            <span className="font-medium">Good</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>REM Sleep</span>
                            <span className="font-medium">Excellent</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '95%' }} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Restlessness</span>
                            <span className="font-medium">Low</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
              
              <FadeIn delay={300} className="mt-6">
                <DashboardCard title="Detailed Metrics">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    <div>
                      <h3 className="text-base font-medium mb-3">Heart Rate</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Average</span>
                          <span className="font-medium">{lastNightSleep.heartRate.avg} bpm</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Minimum</span>
                          <span className="font-medium">{lastNightSleep.heartRate.min} bpm</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maximum</span>
                          <span className="font-medium">{lastNightSleep.heartRate.max} bpm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-3">Sleep Efficiency</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Time in Bed</span>
                          <span className="font-medium">7.9 hours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Actual Sleep</span>
                          <span className="font-medium">7.7 hours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="font-medium">97.5%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-3">Environmental Factors</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Room Temperature</span>
                          <span className="font-medium">20.5°C</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Noise Level</span>
                          <span className="font-medium">Low</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Light Exposure</span>
                          <span className="font-medium">Minimal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </FadeIn>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="grid grid-cols-1 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Weekly Sleep Duration" subtitle="Last 7 days">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sleepData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" />
                          <YAxis 
                            domain={[0, 10]} 
                            ticks={[0, 2, 4, 6, 8, 10]} 
                            tickFormatter={(value) => `${value}h`}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: 'var(--radius)'
                            }}
                            formatter={(value: number) => [`${value} hours`, 'Duration']}
                          />
                          <defs>
                            <linearGradient id="deepSleep" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="remSleep" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="lightSleep" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="deep" 
                            stackId="1" 
                            stroke="#4f46e5" 
                            fill="url(#deepSleep)" 
                            name="Deep Sleep"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="rem" 
                            stackId="1" 
                            stroke="#8b5cf6" 
                            fill="url(#remSleep)" 
                            name="REM Sleep"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="light" 
                            stackId="1" 
                            stroke="#60a5fa" 
                            fill="url(#lightSleep)" 
                            name="Light Sleep"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardCard title="Sleep Consistency">
                      <div className="space-y-6 py-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Bedtime Consistency</span>
                            <span className="text-sm">Good</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                              <div key={i} className="flex flex-col items-center">
                                <div className="text-xs mb-1">{day}</div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                  i === 0 ? 'bg-red-100 text-red-600' : 
                                  'bg-green-100 text-green-600'
                                }`}>
                                  {i === 0 ? '11:30' : '10:45'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Wake-up Consistency</span>
                            <span className="text-sm">Excellent</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                              <div key={i} className="flex flex-col items-center">
                                <div className="text-xs mb-1">{day}</div>
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                                  {i === 5 || i === 6 ? '6:45' : '6:30'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DashboardCard>
                    
                    <DashboardCard title="Sleep Score Trend">
                      <div className="h-[200px] w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { day: 'Mon', score: 68 },
                            { day: 'Tue', score: 75 },
                            { day: 'Wed', score: 82 },
                            { day: 'Thu', score: 90 },
                            { day: 'Fri', score: 88 },
                            { day: 'Sat', score: 85 },
                            { day: 'Sun', score: 85 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                              }}
                              formatter={(value: number) => [`${value}/100`, 'Sleep Score']}
                            />
                            <defs>
                              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                              </linearGradient>
                            </defs>
                            <Area 
                              type="monotone" 
                              dataKey="score" 
                              stroke="hsl(var(--primary))" 
                              fill="url(#scoreGradient)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-between text-sm px-4 pt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                          <span>Poor (0-60)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                          <span>Good (61-80)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                          <span>Excellent (81-100)</span>
                        </div>
                      </div>
                    </DashboardCard>
                  </div>
                </FadeIn>
                
                <FadeIn delay={300}>
                  <DashboardCard title="Monthly Overview" subtitle="July 2023">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl font-bold text-primary mb-1">7.4h</div>
                        <span className="text-sm">Avg. Sleep Duration</span>
                        <span className="text-xs text-green-600 mt-1">+0.6h from last month</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl font-bold text-primary mb-1">84</div>
                        <span className="text-sm">Avg. Sleep Score</span>
                        <span className="text-xs text-green-600 mt-1">+6 from last month</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl font-bold text-primary mb-1">92%</div>
                        <span className="text-sm">Sleep Consistency</span>
                        <span className="text-xs text-green-600 mt-1">+8% from last month</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl font-bold text-primary mb-1">27%</div>
                        <span className="text-sm">Deep Sleep Ratio</span>
                        <span className="text-xs text-green-600 mt-1">+3% from last month</span>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Sleep Recommendations">
                    <div className="space-y-4 py-2">
                      <div className="flex items-start p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-300">Consistent Sleep Schedule</h4>
                          <p className="text-sm text-blue-800/70 dark:text-blue-400/70 mt-1">
                            Your sleep patterns show improved consistency. Continue going to bed and waking up at the same time to further enhance sleep quality.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                        <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-indigo-900 dark:text-indigo-300">Bedtime Routine</h4>
                          <p className="text-sm text-indigo-800/70 dark:text-indigo-400/70 mt-1">
                            Consider incorporating a 30-minute wind-down routine before bed to improve sleep onset latency.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <Sun className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-green-900 dark:text-green-300">Morning Light Exposure</h4>
                          <p className="text-sm text-green-800/70 dark:text-green-400/70 mt-1">
                            Your early wake-up time allows for morning light exposure, which helps regulate your circadian rhythm. Keep it up!
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <Activity className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-yellow-900 dark:text-yellow-300">Exercise Timing</h4>
                          <p className="text-sm text-yellow-800/70 dark:text-yellow-400/70 mt-1">
                            Consider moving intense workouts earlier in the day. Your sleep data shows lighter sleep on days with evening exercise.
                          </p>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Correlation Analysis">
                    <div className="space-y-6 py-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Exercise vs. Sleep Quality</h4>
                          <span className="text-sm text-green-600">Strong +</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Days with moderate exercise (30-60 minutes) show 22% higher sleep scores compared to days with no exercise.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Screen Time vs. Sleep Onset</h4>
                          <span className="text-sm text-red-600">Strong -</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Nights with screen usage within 1 hour of bedtime show 18 minutes longer time to fall asleep.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Caffeine vs. Sleep Duration</h4>
                          <span className="text-sm text-yellow-600">Moderate -</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Caffeine consumption after 2 PM correlates with 45 minutes less total sleep time.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Room Temperature vs. Deep Sleep</h4>
                          <span className="text-sm text-green-600">Moderate +</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sleeping in a room between 18-20°C shows 15% more deep sleep compared to warmer environments.
                        </p>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-2">
                  <DashboardCard title="Sleep Improvement Plan" subtitle="Personalized recommendations">
                    <div className="space-y-6 py-4">
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">Optimize Sleep Environment</h4>
                          <p className="text-muted-foreground mt-1">
                            Your data shows improved sleep quality with cooler temperatures. Maintain your bedroom temperature between 18-20°C and keep the room dark and quiet.
                          </p>
                          <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read More</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">Digital Sunset</h4>
                          <p className="text-muted-foreground mt-1">
                            Reduce blue light exposure by avoiding screens 1-2 hours before bed. Consider using apps that filter blue light or wear blue light blocking glasses in the evening.
                          </p>
                          <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read More</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">Establish a Sleep Ritual</h4>
                          <p className="text-muted-foreground mt-1">
                            Create a consistent 30-minute wind-down routine before bed. This could include reading, gentle stretching, meditation, or a warm bath.
                          </p>
                          <div className="flex mt-3">
                            <Button variant="outline" size="sm">Read More</Button>
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
    </div>
  );
};

export default Sleep;
