
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GoalFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Weight',
    targetValue: '',
    targetDate: '',
    priority: 'Medium',
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
    console.log('Submitting goal:', formData);
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Goal Name
          </Label>
          <Input
            id="name"
            placeholder="e.g., Run 5K"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Details about your goal"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('category', value)} defaultValue={formData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weight">Weight</SelectItem>
                <SelectItem value="Steps">Steps</SelectItem>
                <SelectItem value="Distance">Distance</SelectItem>
                <SelectItem value="Strength">Strength</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Sleep">Sleep</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="targetValue" className="text-right">
            Target Value
          </Label>
          <Input
            id="targetValue"
            placeholder="e.g., 70kg, 10,000 steps"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.targetValue}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="targetDate" className="text-right">
            Target Date
          </Label>
          <Input
            id="targetDate"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.targetDate}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="priority" className="text-right">
            Priority
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('priority', value)} defaultValue={formData.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </DialogFooter>
    </>
  );
};

export default GoalForm;
