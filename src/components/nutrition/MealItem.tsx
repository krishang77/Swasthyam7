
import React from 'react';
import { Apple, MoreHorizontal, Sun, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface MealItemProps {
  meal: {
    id: number;
    type: string;
    time: string;
    items: string[];
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  onEdit: (meal: any) => void;
  onDelete: (id: number) => void;
}

const MealItem: React.FC<MealItemProps> = ({ meal, onEdit, onDelete }) => {
  return (
    <DashboardCard className="hover:shadow-md transition-all">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="mr-4">
            {meal.type === 'Breakfast' && (
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Sun className="h-6 w-6 text-yellow-600" />
              </div>
            )}
            {meal.type === 'Lunch' && (
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
            )}
            {meal.type === 'Snack' && (
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Apple className="h-6 w-6 text-orange-600" />
              </div>
            )}
            {meal.type === 'Dinner' && (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-blue-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">{meal.type}</h3>
              <span className="text-sm text-muted-foreground ml-3">{meal.time}</span>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(meal)}>
                      Edit Meal
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(meal.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm">
                {meal.items.join(', ')}
              </p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="text-sm">
                <span className="font-medium">{meal.calories}</span>
                <span className="text-muted-foreground ml-1">calories</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{meal.macros.protein}g</span>
                <span className="text-muted-foreground ml-1">protein</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{meal.macros.carbs}g</span>
                <span className="text-muted-foreground ml-1">carbs</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{meal.macros.fat}g</span>
                <span className="text-muted-foreground ml-1">fat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MealItem;
