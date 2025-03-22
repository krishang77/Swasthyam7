
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface MealPlanFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    // In a real app, you'd validate the form data here
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="plan-name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="e.g., Cutting Plan"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            placeholder="Brief description of your plan"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="calories" className="text-right">
            Daily Calories
          </Label>
          <Input
            id="calories"
            type="number"
            placeholder="e.g., 2200"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.calories}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="protein" className="text-right">
            Protein (%)
          </Label>
          <Input
            id="protein"
            type="number"
            placeholder="e.g., 30"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.protein}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="carbs" className="text-right">
            Carbs (%)
          </Label>
          <Input
            id="carbs"
            type="number"
            placeholder="e.g., 40"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.carbs}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fat" className="text-right">
            Fat (%)
          </Label>
          <Input
            id="fat"
            type="number"
            placeholder="e.g., 30"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.fat}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Plus className="mr-2 h-4 w-4" /> Create Plan
        </Button>
      </DialogFooter>
    </>
  );
};

export default MealPlanForm;
