
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock food database
const foodDatabase = [
  { id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 2, name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 3, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 4, name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
  { id: 5, name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13 },
  { id: 6, name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { id: 7, name: 'Egg', calories: 68, protein: 5.5, carbs: 0.6, fat: 4.8 },
  { id: 8, name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.4 },
  { id: 9, name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21 },
  { id: 10, name: 'Sweet Potato', calories: 180, protein: 4, carbs: 41, fat: 0.1 },
];

interface FoodSearchProps {
  onSelect: (food: any) => void; // Changed from onFoodSelect to onSelect to match usage
  onCancel: () => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onSelect, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof foodDatabase>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "No foods found",
          description: `No foods matching "${searchTerm}" were found.`,
        });
      }
    }, 500);
  };

  const handleAddFood = (food: any) => {
    onSelect(food);
    toast({
      title: "Food Added",
      description: `${food.name} has been added to your meal.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search for a food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          <Search className="h-4 w-4 mr-2" />
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="rounded-md border">
          <div className="grid grid-cols-6 font-medium text-sm border-b p-3">
            <div className="col-span-2">Food</div>
            <div className="text-center">Calories</div>
            <div className="text-center">Protein</div>
            <div className="text-center">Carbs</div>
            <div className="text-center">Fat</div>
          </div>
          {searchResults.map((food) => (
            <div key={food.id} className="grid grid-cols-6 text-sm border-b last:border-b-0 p-3 items-center hover:bg-muted/50">
              <div className="col-span-2">{food.name}</div>
              <div className="text-center">{food.calories}</div>
              <div className="text-center">{food.protein}g</div>
              <div className="text-center">{food.carbs}g</div>
              <div className="text-center">{food.fat}g</div>
              <div className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleAddFood(food)}
                  title="Add this food"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="ghost" onClick={() => setSearchTerm('')}>Clear</Button>
      </div>
    </div>
  );
};

export default FoodSearch;
