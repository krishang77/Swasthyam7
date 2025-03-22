
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';

interface MealFormProps {
  isEditing: boolean;
  mealForm: {
    type: string;
    time: string;
    items: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  handleSubmit: () => void;
  onCancel: () => void;
}

const MealForm: React.FC<MealFormProps> = ({
  isEditing,
  mealForm,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
  onCancel
}) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="meal-type" className="text-right">
            Type
          </Label>
          <div className="col-span-3">
            <Select onValueChange={handleSelectChange} defaultValue={mealForm.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">
            Time
          </Label>
          <Input
            id="time"
            name="time"
            placeholder="e.g., 7:30 AM"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.time}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="items" className="text-right">
            Items
          </Label>
          <Input
            id="items"
            name="items"
            placeholder="e.g., Eggs, Toast, Avocado"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.items}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="calories" className="text-right">
            Calories
          </Label>
          <Input
            id="calories"
            name="calories"
            type="number"
            placeholder="e.g., 450"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.calories}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="protein" className="text-right">
            Protein (g)
          </Label>
          <Input
            id="protein"
            name="protein"
            type="number"
            placeholder="e.g., 25"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.protein}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="carbs" className="text-right">
            Carbs (g)
          </Label>
          <Input
            id="carbs"
            name="carbs"
            type="number"
            placeholder="e.g., 40"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.carbs}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fat" className="text-right">
            Fat (g)
          </Label>
          <Input
            id="fat"
            name="fat"
            type="number"
            placeholder="e.g., 15"
            className="col-span-3"
            onChange={handleInputChange}
            value={mealForm.fat}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isEditing ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Update Meal
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Add Meal
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );
};

export default MealForm;
