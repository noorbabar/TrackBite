// types.ts
export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  brand?: string;
  category?: string;
  verified?: boolean;
}

export interface NutritionGoals {
  calories: number;
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
  brand?: string;
  category?: string;
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
  time?: string;
  notes?: string;
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

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface MealSummary {
  mealType: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  entryCount: number;
}

export interface UserProfile {
  id?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Not Specified';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';
  goalType?: 'Lose Weight' | 'Maintain Weight' | 'Gain Weight';
  weightGoal?: number; 
  weeklyGoal?: number; 
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface DailyWaterIntake {
  date: string;
  amount: number; // in ml
}

export interface MealPlan {
  id: string;
  name: string;
  date: string;
  meals: MealPlanItem[];
}

export interface MealPlanItem {
  foodId: string;
  mealType: string;
  servings: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DetailedNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  saturatedFat: number;
  cholesterol: number;
  potassium: number;
  vitaminC: number;
  calcium: number;
  iron: number;
}

export interface MacroRatio {
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroPreset {
  name: string;
  description: string;
  ratios: MacroRatio;
}

export interface DetailedNutritionGoals extends DetailedNutrition {
}

export type MacroPresetType = 'balanced' | 'low-carb' | 'keto' | 'high-protein' | 'mediterranean' | 'custom';