import { Food, FoodLogEntry, NutritionGoals } from './types';

// just added mock data bc dont have a food api yet
export const foodDatabase: Food[] = [
  { id: '1', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium (182g)' },
  { id: '2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g, cooked' },
  { id: '3', name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8, servingSize: '1 cup cooked (195g)' },
  { id: '4', name: 'Egg', calories: 70, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 large (50g)' },
  { id: '5', name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, servingSize: '1 cup (91g)' },
  { id: '6', name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13, servingSize: '100g, cooked' },
  { id: '7', name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.4, servingSize: '170g container' },
  { id: '8', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: '1 medium (118g)' },
  { id: '9', name: 'Whole Wheat Bread', calories: 69, protein: 3.6, carbs: 12, fat: 1.1, servingSize: '1 slice (28g)' },
  { id: '10', name: 'Avocado', calories: 234, protein: 2.9, carbs: 12.5, fat: 21, servingSize: '1 medium (150g)' },
  { id: '11', name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: '1 cup cooked (234g)' },
  { id: '12', name: 'Peanut Butter', calories: 188, protein: 8, carbs: 6, fat: 16, servingSize: '2 tbsp (32g)' },
  { id: '13', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g, raw' },
  { id: '14', name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6, servingSize: '1 cup cooked (185g)' },
  { id: '15', name: 'Almond Milk', calories: 30, protein: 1.1, carbs: 2.5, fat: 2.5, servingSize: '1 cup (240ml)' },
  { id: '16', name: 'Protein Shake', calories: 120, protein: 24, carbs: 3, fat: 1.5, servingSize: '1 scoop in water' },
  { id: '17', name: 'Sweet Potato', calories: 112, protein: 2, carbs: 26, fat: 0.1, servingSize: '1 medium (130g), baked' },
  { id: '18', name: 'Black Beans', calories: 114, protein: 7.6, carbs: 20, fat: 0.5, servingSize: '1/2 cup (86g), cooked' },
  { id: '19', name: 'Ground Turkey', calories: 170, protein: 26, carbs: 0, fat: 8, servingSize: '100g, cooked' },
  { id: '20', name: 'Hummus', calories: 166, protein: 7.9, carbs: 14, fat: 9.6, servingSize: '100g' },
];

// User information
let userProfile = {
  name: 'User',
  age: 30,
  height: 175, // in cm
  weight: 70, // in kg
  gender: 'Not Specified',
  activityLevel: 'Moderate',
};

let nutritionGoals: NutritionGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65
};

let storedFoodLog: FoodLogEntry[] = [];

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
      storedFoodLog.push(newEntry);
      resolve(newEntry);
    }, 200);
  });
};

export const removeFoodFromLog = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = storedFoodLog.length;
      storedFoodLog = storedFoodLog.filter(entry => entry.id !== id);
      const success = initialLength > storedFoodLog.length;
      resolve(success);
    }, 200);
  });
};

export const getFoodLogByDate = (date: string): Promise<FoodLogEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entries = storedFoodLog.filter(entry => entry.date === date);
      resolve(entries);
    }, 200);
  });
};

export const updateFoodLogEntry = (
  id: string, 
  updates: Partial<Omit<FoodLogEntry, 'id' | 'foodId'>>
): Promise<FoodLogEntry | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entryIndex = storedFoodLog.findIndex(entry => entry.id === id);
      
      if (entryIndex === -1) {
        resolve(null);
        return;
      }
      
      const updatedEntry = {
        ...storedFoodLog[entryIndex],
        ...updates
      };
      
      storedFoodLog[entryIndex] = updatedEntry;
      resolve(updatedEntry);
    }, 200);
  });
};

export const getNutritionGoals = (): Promise<NutritionGoals> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nutritionGoals);
    }, 200);
  });
};

export const updateNutritionGoals = (goals: NutritionGoals): Promise<NutritionGoals> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nutritionGoals = { ...goals };
      resolve(nutritionGoals);
    }, 200);
  });
};

export const getUserProfile = (): Promise<typeof userProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfile);
    }, 200);
  });
};

export const updateUserProfile = (
  updates: Partial<typeof userProfile>
): Promise<typeof userProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      userProfile = { ...userProfile, ...updates };
      resolve(userProfile);
    }, 200);
  });
};

export const calculateSuggestedGoals = (): Promise<NutritionGoals> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { age, height, weight, gender, activityLevel } = userProfile;
      
      let bmr = 10 * weight + 6.25 * height - 5 * age;
      
      if (gender === 'Male') {
        bmr += 5;
      } else if (gender === 'Female') {
        bmr -= 161;
      }
      
      let activityMultiplier = 1.2; 
      switch (activityLevel) {
        case 'Light':
          activityMultiplier = 1.375;
          break;
        case 'Moderate':
          activityMultiplier = 1.55;
          break;
        case 'Active':
          activityMultiplier = 1.725;
          break;
        case 'Very Active':
          activityMultiplier = 1.9;
          break;
      }
      
      const dailyCalories = Math.round(bmr * activityMultiplier);
      
      const suggestedGoals: NutritionGoals = {
        calories: dailyCalories,
        protein: Math.round((dailyCalories * 0.3) / 4), // 30% protein, 4 calories per gram
        carbs: Math.round((dailyCalories * 0.4) / 4),   // 40% carbs, 4 calories per gram
        fat: Math.round((dailyCalories * 0.3) / 9)     // 30% fat, 9 calories per gram
      };
      
      resolve(suggestedGoals);
    }, 300);
  });
};

export const getFavoriteFoods = (): Promise<Food[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shuffled = [...foodDatabase].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 5));
    }, 200);
  });
};