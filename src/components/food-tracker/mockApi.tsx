// mockApi.ts
import { Food, FoodLogEntry } from './types';

// Mock food database
export const foodDatabase: Food[] = [
  { id: '1', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium' },
  { id: '2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
  { id: '3', name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8, servingSize: '1 cup cooked' },
  { id: '4', name: 'Egg', calories: 70, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 large' },
  { id: '5', name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, servingSize: '1 cup' },
];

// Mock API functions
export const searchFoods = (query: string): Promise<Food[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

export const addFoodToLog = (entry: Omit<FoodLogEntry, 'id'>): Promise<FoodLogEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry = {
        ...entry,
        id: Math.random().toString(36).substring(2, 9)
      };
      resolve(newEntry);
    }, 200);
  });
};