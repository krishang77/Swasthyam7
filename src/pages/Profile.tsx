
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Camera, Edit, Globe, Heart, Lock, LogOut, Mail, MessageSquare, Settings, User } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Badge } from '@/components/ui/badge';
import FadeIn from '@/components/animations/FadeIn';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample user data
  const user = {
    name: 'Alex Johnson',
    username: 'alexj',
    bio: 'Fitness enthusiast and tech professional. Working on improving my strength and endurance while maintaining a healthy lifestyle.',
    location: 'San Francisco, CA',
    email: 'alex.johnson@example.com',
    memberSince: 'January 2023',
    stats: {
      workouts: 87,
      following: 142,
      followers: 263
    },
    achievements: [
      { id: 1, title: '30-Day Streak', icon: '🔥', date: 'Jul 15, 2023' },
      { id: 2, title: '100K Steps Week', icon: '👟', date: 'Jun 10, 2023' },
      { id: 3, title: 'Early Bird', icon: '🌅', date: 'May 22, 2023' },
      { id: 4, title: 'Marathon Finisher', icon: '🏃', date: 'Apr 8, 2023' },
    ],
    fitnessLevel: 'Intermediate',
    preferences: {
      weightUnit: 'lbs',
      distanceUnit: 'miles',
      theme: 'System',
      notifications: {
        workoutReminders: true,
        achievementAlerts: true,
        friendActivity: true,
        appUpdates: false
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile picture" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
            <div className="text-muted-foreground">@{user.username}</div>
            
            <div className="flex items-center space-x-8 mt-6">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{user.stats.workouts}</span>
                <span className="text-sm text-muted-foreground">Workouts</span>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{user.stats.following}</span>
                <span className="text-sm text-muted-foreground">Following</span>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{user.stats.followers}</span>
                <span className="text-sm text-muted-foreground">Followers</span>
              </div>
            </div>
            
            <div className="flex mt-6 space-x-3">
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn delay={200} className="md:col-span-2">
                  <DashboardCard title="About Me">
                    <div className="space-y-6 py-4">
                      <p className="text-foreground">{user.bio}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>Living in {user.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>Member since {user.memberSince}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium mb-3">Fitness Level</h4>
                        <Badge>{user.fitnessLevel}</Badge>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium mb-3">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Weight Training</Badge>
                          <Badge variant="outline">Running</Badge>
                          <Badge variant="outline">HIIT</Badge>
                          <Badge variant="outline">Nutrition</Badge>
                          <Badge variant="outline">Yoga</Badge>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Fitness Stats">
                    <div className="space-y-6 py-4">
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-2">Current Weight</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">172 lbs</span>
                          <Badge variant="outline" className="text-green-600">
                            -3.5 lbs this month
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-2">Body Fat</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">16.8%</span>
                          <Badge variant="outline" className="text-green-600">
                            -0.7% this month
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-2">Resting Heart Rate</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">62 bpm</span>
                          <Badge variant="outline" className="text-green-600">
                            -3 bpm this month
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-medium mb-3">Personal Records</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Bench Press</span>
                            <span className="font-medium">225 lbs</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Squat</span>
                            <span className="font-medium">315 lbs</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Deadlift</span>
                            <span className="font-medium">365 lbs</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>5K Run</span>
                            <span className="font-medium">23:45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-3">
                  <DashboardCard title="Activity Feed">
                    <div className="space-y-6 py-4">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile picture" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">You</span>
                            <span className="text-muted-foreground text-sm ml-2">completed a workout</span>
                            <span className="text-muted-foreground text-xs ml-auto">1 hour ago</span>
                          </div>
                          <p className="text-sm">Completed an upper body workout with personal bests in bench press and shoulder press! 💪</p>
                          <div className="flex items-center pt-2">
                            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>24 likes</span>
                            </button>
                            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors ml-4">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>4 comments</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile picture" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">You</span>
                            <span className="text-muted-foreground text-sm ml-2">reached a goal</span>
                            <span className="text-muted-foreground text-xs ml-auto">2 days ago</span>
                          </div>
                          <p className="text-sm">Finally reached my goal of running a 5K in under 25 minutes! Next goal: under 23 minutes 🏃‍♂️</p>
                          <div className="bg-muted/40 rounded-lg p-3 mt-2">
                            <div className="font-medium text-sm mb-1">5K Run Time Goal</div>
                            <div className="text-sm text-muted-foreground">Goal: Under 25 minutes</div>
                            <div className="text-sm text-muted-foreground">Actual: 24:37</div>
                          </div>
                          <div className="flex items-center pt-2">
                            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>36 likes</span>
                            </button>
                            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors ml-4">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>8 comments</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-center">
                        <Button variant="outline">View More Activity</Button>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Achievements & Badges">
                    <div className="py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {user.achievements.map((achievement) => (
                          <div 
                            key={achievement.id}
                            className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center text-center card-hover"
                          >
                            <div className="text-4xl mb-3">{achievement.icon}</div>
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                          </div>
                        ))}
                        
                        {/* Locked achievements */}
                        <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center text-center opacity-70">
                          <div className="text-4xl mb-3 grayscale">🏋️</div>
                          <h4 className="font-medium text-sm">Powerlifter</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Lock className="h-3 w-3 mr-1" />
                            <span>Locked</span>
                          </div>
                        </div>
                        
                        <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center text-center opacity-70">
                          <div className="text-4xl mb-3 grayscale">🧘</div>
                          <h4 className="font-medium text-sm">Zen Master</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Lock className="h-3 w-3 mr-1" />
                            <span>Locked</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 border-t border-border pt-6">
                        <h3 className="font-medium mb-4">Upcoming Achievements</h3>
                        
                        <div className="space-y-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-2xl mr-3 opacity-70">🏃</div>
                                <div>
                                  <h4 className="font-medium">100 Miles Club</h4>
                                  <p className="text-sm text-muted-foreground">Run a total of 100 miles</p>
                                </div>
                              </div>
                              <div className="text-sm">82 / 100 miles</div>
                            </div>
                            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '82%' }}></div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-2xl mr-3 opacity-70">💪</div>
                                <div>
                                  <h4 className="font-medium">Gym Enthusiast</h4>
                                  <p className="text-sm text-muted-foreground">Complete 100 workouts</p>
                                </div>
                              </div>
                              <div className="text-sm">87 / 100 workouts</div>
                            </div>
                            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '87%' }}></div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-2xl mr-3 opacity-70">🥗</div>
                                <div>
                                  <h4 className="font-medium">Nutrition Pro</h4>
                                  <p className="text-sm text-muted-foreground">Log 30 days of meals</p>
                                </div>
                              </div>
                              <div className="text-sm">23 / 30 days</div>
                            </div>
                            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '77%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Monthly Challenges" subtitle="July 2023">
                    <div className="space-y-6 py-4">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                        <h3 className="text-xl font-bold">Summer Fitness Challenge</h3>
                        <p className="mt-2 text-blue-100">Complete 20 workouts this month and earn the Summer Warrior badge!</p>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>15/20 workouts</span>
                          </div>
                          <div className="h-2 bg-blue-800/50 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button className="bg-white text-blue-600 hover:bg-blue-50">
                            View Challenge
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-5 text-white">
                          <h4 className="font-semibold">10K Steps Daily</h4>
                          <p className="text-sm text-green-100 mt-1">Maintain 10K steps for 25 days</p>
                          <div className="mt-3">
                            <div className="text-xs flex justify-between mb-1">
                              <span>18/25 days</span>
                              <span>72%</span>
                            </div>
                            <div className="h-1.5 bg-green-800/50 rounded-full overflow-hidden">
                              <div className="h-full bg-white rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg p-5 text-white">
                          <h4 className="font-semibold">Meditation Minutes</h4>
                          <p className="text-sm text-purple-100 mt-1">Log 200 minutes of meditation</p>
                          <div className="mt-3">
                            <div className="text-xs flex justify-between mb-1">
                              <span>135/200 minutes</span>
                              <span>68%</span>
                            </div>
                            <div className="h-1.5 bg-purple-800/50 rounded-full overflow-hidden">
                              <div className="h-full bg-white rounded-full" style={{ width: '68%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <DashboardCard title="Account Settings">
                    <div className="space-y-6 py-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Personal Information</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm">Full Name</label>
                            <input
                              type="text"
                              value={user.name}
                              className="w-full px-3 py-2 border border-input rounded-md mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm">Email</label>
                            <input
                              type="email"
                              value={user.email}
                              className="w-full px-3 py-2 border border-input rounded-md mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm">Location</label>
                            <input
                              type="text"
                              value={user.location}
                              className="w-full px-3 py-2 border border-input rounded-md mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Password</h4>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Linked Accounts</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-500 font-bold">G</span>
                              </div>
                              <div>
                                <div className="font-medium">Google</div>
                                <div className="text-xs text-muted-foreground">Connected</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Disconnect</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span className="text-green-500 font-bold">S</span>
                              </div>
                              <div>
                                <div className="font-medium">Strava</div>
                                <div className="text-xs text-muted-foreground">Not connected</div>
                              </div>
                            </div>
                            <Button size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <Button variant="destructive" className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={250}>
                  <DashboardCard title="Preferences">
                    <div className="space-y-6 py-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Units</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm">Weight</label>
                            <select className="w-full px-3 py-2 border border-input rounded-md mt-1 bg-background">
                              <option value="lbs" selected={user.preferences.weightUnit === 'lbs'}>Pounds (lbs)</option>
                              <option value="kg" selected={user.preferences.weightUnit === 'kg'}>Kilograms (kg)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="text-sm">Distance</label>
                            <select className="w-full px-3 py-2 border border-input rounded-md mt-1 bg-background">
                              <option value="miles" selected={user.preferences.distanceUnit === 'miles'}>Miles</option>
                              <option value="km" selected={user.preferences.distanceUnit === 'km'}>Kilometers</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Workout Reminders</div>
                              <div className="text-xs text-muted-foreground">Remind you of scheduled workouts</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={user.preferences.notifications.workoutReminders} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Achievement Alerts</div>
                              <div className="text-xs text-muted-foreground">Notify when you earn achievements</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={user.preferences.notifications.achievementAlerts} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Friend Activity</div>
                              <div className="text-xs text-muted-foreground">Updates about friends' activities</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={user.preferences.notifications.friendActivity} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">App Updates</div>
                              <div className="text-xs text-muted-foreground">News and feature announcements</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={user.preferences.notifications.appUpdates} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Appearance</h4>
                        <div>
                          <label className="text-sm">Theme</label>
                          <select className="w-full px-3 py-2 border border-input rounded-md mt-1 bg-background">
                            <option value="system" selected={user.preferences.theme === 'System'}>System</option>
                            <option value="light" selected={user.preferences.theme === 'Light'}>Light</option>
                            <option value="dark" selected={user.preferences.theme === 'Dark'}>Dark</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </DashboardCard>
                </FadeIn>
                
                <FadeIn delay={300} className="md:col-span-2">
                  <DashboardCard title="Privacy & Data">
                    <div className="space-y-6 py-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Privacy Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Profile Visibility</div>
                              <div className="text-xs text-muted-foreground">Who can see your profile</div>
                            </div>
                            <select className="px-3 py-1.5 border border-input rounded-md bg-background">
                              <option value="public">Everyone</option>
                              <option value="friends">Friends Only</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Activity Sharing</div>
                              <div className="text-xs text-muted-foreground">Who can see your workouts</div>
                            </div>
                            <select className="px-3 py-1.5 border border-input rounded-md bg-background">
                              <option value="public">Everyone</option>
                              <option value="friends" selected>Friends Only</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Statistics Visibility</div>
                              <div className="text-xs text-muted-foreground">Who can see your fitness stats</div>
                            </div>
                            <select className="px-3 py-1.5 border border-input rounded-md bg-background">
                              <option value="public">Everyone</option>
                              <option value="friends" selected>Friends Only</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Data Management</h4>
                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start">
                            <Bell className="h-4 w-4 mr-2" />
                            Download Your Data
                          </Button>
                          
                          <Button variant="outline" className="w-full justify-start text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700">
                            <Bell className="h-4 w-4 mr-2" />
                            Delete All Activity History
                          </Button>
                          
                          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                            <Bell className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
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

export default Profile;
