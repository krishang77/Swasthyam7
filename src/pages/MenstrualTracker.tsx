
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Circle, CircleDot, Droplet } from 'lucide-react';
import { format, addDays, isSameDay, isWithinInterval, differenceInDays } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar } from '@/components/ui/calendar';
import { ActionModal } from '@/components/ui/action-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CycleSymptomLog from '@/components/cycle/CycleSymptomLog';
import CycleStatsCard from '@/components/cycle/CycleStatsCard';
import CyclePredictionCard from '@/components/cycle/CyclePredictionCard';

const MenstrualTracker = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startCycleModalOpen, setStartCycleModalOpen] = useState(false);
  const [cycles, setCycles] = useState([
    {
      id: 1,
      startDate: new Date(new Date().setDate(new Date().getDate() - 25)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 19)),
      symptoms: ['cramps', 'headache', 'fatigue'],
      flow: 'medium'
    }
  ]);
  
  // Calculate cycle stats
  const avgCycleLength = 28; // Default value
  const lastPeriodStart = cycles.length > 0 ? cycles[0].startDate : null;
  const lastPeriodEnd = cycles.length > 0 ? cycles[0].endDate : null;
  const nextPeriodStart = lastPeriodStart 
    ? addDays(lastPeriodStart, avgCycleLength)
    : null;
  const daysSinceLastPeriod = lastPeriodStart 
    ? differenceInDays(new Date(), lastPeriodStart)
    : null;
  const daysUntilNextPeriod = nextPeriodStart 
    ? differenceInDays(nextPeriodStart, new Date())
    : null;
  
  // Define form schema for logging period
  const formSchema = z.object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    flow: z.string({
      required_error: "Flow intensity is required",
    }),
    symptoms: z.array(z.string()).optional(),
    notes: z.string().optional(),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      flow: "medium",
      symptoms: [],
      notes: "",
    },
  });
  
  // Custom day render function for calendar
  const renderDay = (day: Date) => {
    // Check if the day is a period day
    const isPeriodDay = cycles.some(cycle => 
      isWithinInterval(day, { start: cycle.startDate, end: cycle.endDate })
    );
    
    // Check if the day is a predicted period day
    const isPredictedPeriodDay = nextPeriodStart && 
      isWithinInterval(day, { 
        start: nextPeriodStart, 
        end: addDays(nextPeriodStart, 5) 
      });
    
    // Check if the day is a fertile window 
    const isFertileDay = nextPeriodStart && 
      isWithinInterval(day, { 
        start: addDays(nextPeriodStart, -19), 
        end: addDays(nextPeriodStart, -13) 
      });
    
    // Check if the day is an ovulation day
    const isOvulationDay = nextPeriodStart && 
      isSameDay(day, addDays(nextPeriodStart, -14));
    
    if (isPeriodDay) {
      return <div className="relative flex h-9 w-9 items-center justify-center">
        <Droplet className="h-4 w-4 text-red-500" />
      </div>;
    } else if (isOvulationDay) {
      return <div className="relative flex h-9 w-9 items-center justify-center">
        <CircleDot className="h-4 w-4 text-purple-500" />
      </div>;
    } else if (isFertileDay) {
      return <div className="relative flex h-9 w-9 items-center justify-center">
        <Circle className="h-4 w-4 text-purple-300" />
      </div>;
    } else if (isPredictedPeriodDay) {
      return <div className="relative flex h-9 w-9 items-center justify-center">
        <Droplet className="h-4 w-4 text-red-300" />
      </div>;
    }
    
    return day.getDate();
  };
  
  const handleNewCycleSubmit = (values: z.infer<typeof formSchema>) => {
    const estimatedEndDate = addDays(values.startDate, 5); // Default 5-day period
    
    const newCycle = {
      id: Date.now(),
      startDate: values.startDate,
      endDate: estimatedEndDate,
      symptoms: values.symptoms || [],
      flow: values.flow,
      notes: values.notes
    };
    
    setCycles(prev => [newCycle, ...prev]);
    
    toast({
      title: "Period logged",
      description: "Your menstrual cycle data has been updated.",
    });
    
    setStartCycleModalOpen(false);
  };

  const getMoodEmoji = (currentDayOfCycle: number) => {
    if (currentDayOfCycle <= 5) {
      return "😟"; // Period phase
    } else if (currentDayOfCycle <= 13) {
      return "😊"; // Follicular phase
    } else if (currentDayOfCycle === 14) {
      return "🥰"; // Ovulation
    } else {
      return "😌"; // Luteal phase
    }
  };
  
  // Calculate current cycle day and phase
  const currentCycleDay = daysSinceLastPeriod ? daysSinceLastPeriod + 1 : 0;
  const currentCyclePhase = currentCycleDay <= 5 
    ? "Menstrual" 
    : currentCycleDay <= 13 
      ? "Follicular" 
      : currentCycleDay === 14 
        ? "Ovulation" 
        : "Luteal";
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <FadeIn direction="up" delay={100}>
          <h1 className="text-3xl font-bold tracking-tight">Cycle Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track, predict and understand your menstrual cycle
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Calendar */}
          <FadeIn delay={150} className="lg:col-span-2">
            <DashboardCard title="Cycle Calendar" subtitle="Track your cycle and predictions">
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline" 
                  onClick={() => setStartCycleModalOpen(true)}
                  className="my-4"
                >
                  <Droplet className="mr-2 h-4 w-4 text-red-500" />
                  Log Period
                </Button>
              </div>
              
              <div className="flex justify-center">
                <Calendar 
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  components={{
                    Day: ({ date, ...props }) => (
                      <div {...props}>
                        {renderDay(date)}
                      </div>
                    ),
                  }}
                />
              </div>
              
              <div className="flex justify-center flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Period</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-red-300 mr-2" />
                  <span className="text-sm">Predicted Period</span>
                </div>
                <div className="flex items-center">
                  <CircleDot className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm">Ovulation</span>
                </div>
                <div className="flex items-center">
                  <Circle className="h-4 w-4 text-purple-300 mr-2" />
                  <span className="text-sm">Fertile Window</span>
                </div>
              </div>
            </DashboardCard>
          </FadeIn>
          
          {/* Right Column - Current Cycle Info */}
          <FadeIn delay={200}>
            <div className="space-y-6">
              <DashboardCard title="Current Cycle">
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">
                    {getMoodEmoji(currentCycleDay)}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Day {currentCycleDay}</h3>
                  <p className="text-lg mb-4">{currentCyclePhase} Phase</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last period</p>
                      <p className="font-medium">
                        {lastPeriodStart ? format(lastPeriodStart, 'MMM d') : 'Not recorded'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next period</p>
                      <p className="font-medium">
                        {nextPeriodStart 
                          ? `${format(nextPeriodStart, 'MMM d')} (in ${daysUntilNextPeriod} days)` 
                          : 'Not predicted'}
                      </p>
                    </div>
                  </div>
                </div>
              </DashboardCard>
              
              <CyclePredictionCard 
                nextPeriodDate={nextPeriodStart} 
                ovulationDate={nextPeriodStart ? addDays(nextPeriodStart, -14) : null}
                fertileWindowStart={nextPeriodStart ? addDays(nextPeriodStart, -19) : null}
                fertileWindowEnd={nextPeriodStart ? addDays(nextPeriodStart, -13) : null}
              />
            </div>
          </FadeIn>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <FadeIn delay={250}>
            <CycleStatsCard 
              avgCycleLength={avgCycleLength}
              avgPeriodLength={5} 
              cycles={cycles}
            />
          </FadeIn>
          
          <FadeIn delay={300}>
            <CycleSymptomLog
              selectedDate={selectedDate || new Date()} 
              cycles={cycles}
              onUpdateCycle={(updatedCycles) => setCycles(updatedCycles)}
            />
          </FadeIn>
        </div>
      </div>
      
      {/* Log Period Modal */}
      <ActionModal
        title="Log Period"
        description="Record when your period started"
        isOpen={startCycleModalOpen}
        onOpenChange={setStartCycleModalOpen}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNewCycleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="flow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flow Intensity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select flow intensity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Any additional notes"
                onChange={(e) => form.setValue('notes', e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setStartCycleModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </ActionModal>
    </div>
  );
};

export default MenstrualTracker;
