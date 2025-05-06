
import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type Symptom = 'cramps' | 'headache' | 'bloating' | 'backPain' | 'fatigue' | 'moodSwings' | 'breastTenderness' | 'acne';

type CycleType = {
  id: number;
  startDate: Date;
  endDate: Date;
  symptoms: string[];
  flow: string;
  notes?: string;
};

interface CycleSymptomLogProps {
  selectedDate: Date;
  cycles: CycleType[];
  onUpdateCycle: (updatedCycles: CycleType[]) => void;
}

const symptoms = [
  { value: 'cramps', label: 'Cramps', color: 'bg-red-100 text-red-800' },
  { value: 'headache', label: 'Headache', color: 'bg-orange-100 text-orange-800' },
  { value: 'bloating', label: 'Bloating', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'backPain', label: 'Back Pain', color: 'bg-amber-100 text-amber-800' },
  { value: 'fatigue', label: 'Fatigue', color: 'bg-green-100 text-green-800' },
  { value: 'moodSwings', label: 'Mood Swings', color: 'bg-blue-100 text-blue-800' },
  { value: 'breastTenderness', label: 'Breast Tenderness', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'acne', label: 'Acne', color: 'bg-violet-100 text-violet-800' },
];

const CycleSymptomLog: React.FC<CycleSymptomLogProps> = ({ selectedDate, cycles, onUpdateCycle }) => {
  const { toast } = useToast();
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // Find if the selected date is within a cycle
  const activeCycle = cycles.find(cycle => 
    isSameDay(cycle.startDate, selectedDate) || 
    isSameDay(cycle.endDate, selectedDate) || 
    (selectedDate >= cycle.startDate && selectedDate <= cycle.endDate)
  );
  
  const handleAddSymptom = () => {
    if (!selectedSymptom) return;
    
    if (activeCycle) {
      // Update existing cycle
      const updatedCycles = cycles.map(cycle => {
        if (cycle.id === activeCycle.id) {
          return {
            ...cycle,
            symptoms: [...cycle.symptoms, selectedSymptom]
          };
        }
        return cycle;
      });
      
      onUpdateCycle(updatedCycles);
      setSelectedSymptom("");
      
      toast({
        title: "Symptom added",
        description: "Your symptom has been recorded."
      });
    } else {
      toast({
        title: "No active cycle",
        description: "Please log a period first to add symptoms.",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveSymptom = (symptomToRemove: string) => {
    if (activeCycle) {
      const updatedCycles = cycles.map(cycle => {
        if (cycle.id === activeCycle.id) {
          return {
            ...cycle,
            symptoms: cycle.symptoms.filter(s => s !== symptomToRemove)
          };
        }
        return cycle;
      });
      
      onUpdateCycle(updatedCycles);
    }
  };
  
  const handleSaveNotes = () => {
    if (activeCycle && notes) {
      const updatedCycles = cycles.map(cycle => {
        if (cycle.id === activeCycle.id) {
          return {
            ...cycle,
            notes
          };
        }
        return cycle;
      });
      
      onUpdateCycle(updatedCycles);
      
      toast({
        title: "Notes saved",
        description: "Your notes have been saved."
      });
    }
  };
  
  return (
    <DashboardCard title="Symptoms & Notes" subtitle={`For ${format(selectedDate, 'MMMM d, yyyy')}`}>
      <div className="space-y-4">
        {activeCycle ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeCycle.symptoms.map((symptom) => {
                const symptomObj = symptoms.find(s => s.value === symptom);
                return (
                  <Badge 
                    key={symptom}
                    className={`${symptomObj?.color || ''} cursor-pointer`}
                    onClick={() => handleRemoveSymptom(symptom)}
                  >
                    {symptomObj?.label || symptom}
                    <span className="ml-1 text-xs">✕</span>
                  </Badge>
                );
              })}
              {activeCycle.symptoms.length === 0 && (
                <p className="text-sm text-muted-foreground">No symptoms logged for this day</p>
              )}
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1">
                <Select value={selectedSymptom} onValueChange={setSelectedSymptom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a symptom" />
                  </SelectTrigger>
                  <SelectContent>
                    {symptoms.map((symptom) => (
                      <SelectItem key={symptom.value} value={symptom.value}>
                        {symptom.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddSymptom} disabled={!selectedSymptom}>
                Add
              </Button>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How are you feeling today?"
                value={activeCycle.notes || notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveNotes} size="sm" variant="outline">
                  Save Notes
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Select a day during your period to log symptoms</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default CycleSymptomLog;
