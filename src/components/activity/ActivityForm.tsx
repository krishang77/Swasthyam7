
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ActivityFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'Running',
    duration: '',
    distance: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    intensityLevel: 'Medium',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting activity:', formData);
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Activity Type
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('type', value)} defaultValue={formData.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Cycling">Cycling</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Walking">Walking</SelectItem>
                <SelectItem value="HIIT">HIIT Workout</SelectItem>
                <SelectItem value="Strength">Strength Training</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration" className="text-right">
            Duration
          </Label>
          <Input
            id="duration"
            placeholder="e.g., 45 min"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.duration}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="distance" className="text-right">
            Distance
          </Label>
          <Input
            id="distance"
            placeholder="e.g., 5.2 km"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.distance}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="calories" className="text-right">
            Calories
          </Label>
          <Input
            id="calories"
            placeholder="e.g., 320"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.calories}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="intensityLevel" className="text-right">
            Intensity
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('intensityLevel', value)} defaultValue={formData.intensityLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional information"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.notes}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Plus className="mr-2 h-4 w-4" /> Add Activity
        </Button>
      </DialogFooter>
    </>
  );
};

export default ActivityForm;
