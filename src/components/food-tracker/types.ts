// types.ts
export interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
  }
  
  export interface FoodLogEntry {
    id: string;
    foodId: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    servings: number;
    mealType: string;
    date: string;
  }
  
  export interface DailyTotals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
  
  export interface MacroPercentages {
    protein: number;
    carbs: number;
    fat: number;
  }
  
  export interface CustomFood {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
  }