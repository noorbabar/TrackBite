import { MacroPreset } from './types';

export const MACRO_PRESETS: Record<string, MacroPreset> = {
  balanced: {
    name: 'Balanced',
    description: 'Balanced macronutrient distribution for general health',
    ratios: { protein: 25, carbs: 45, fat: 30 }
  },
  lowCarb: {
    name: 'Low Carb',
    description: 'Reduced carbohydrates for weight management',
    ratios: { protein: 30, carbs: 20, fat: 50 }
  },
  keto: {
    name: 'Ketogenic',
    description: 'Very low carb, high fat for ketosis',
    ratios: { protein: 20, carbs: 5, fat: 75 }
  },
  highProtein: {
    name: 'High Protein',
    description: 'Increased protein for muscle building',
    ratios: { protein: 40, carbs: 35, fat: 25 }
  },
  mediterranean: {
    name: 'Mediterranean',
    description: 'Heart-healthy Mediterranean style',
    ratios: { protein: 20, carbs: 50, fat: 30 }
  }
};