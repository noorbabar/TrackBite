import { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";
import { fetchUserProfile } from '../services/api';

interface Food {
  id: string;
  name: string;
  brand: string;
  store: string[];
  serving: number;
  unit: string;
  p: number;
  c: number;
  f: number;
  fiber: number;
  sugar: number;
  notes?: string;
}

interface SelectedFood {
  food: Food;
  amount: number;
  macros: { p: number; c: number; f: number; fiber: number; sugar: number };
}

interface SavedMeal {
  name: string;
  items: SelectedFood[];
  total: { p: number; c: number; f: number; fiber: number; sugar: number; cals: number };
}

const MacroPlans = () => {
  const [step, setStep] = useState<'loading' | 'questions' | 'builder'>('loading');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userMacros, setUserMacros] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<SelectedFood[]>([]);
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [mealName, setMealName] = useState('');
  const [activeTab, setActiveTab] = useState('protein');
  const [editingForm, setEditingForm] = useState(false);
  const [matchedRecipes, setMatchedRecipes] = useState<any[]>([]);
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);
  
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const storedMeals = localStorage.getItem('savedMeals');
    if (storedMeals) setSavedMeals(JSON.parse(storedMeals));

    const storedAnswers = localStorage.getItem('macroFormAnswers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const loadUserMacros = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setStep('questions');
          return;
        }

        const profile = await fetchUserProfile(user.id, token);
        
        if (profile?.stats?.recommendedCalories) {
          const totalCals = profile.stats.recommendedCalories;
          const userWeight = profile.stats.weight || 70;
          
          const storedAnswers = localStorage.getItem('macroFormAnswers');
          if (storedAnswers) {
            const parsed = JSON.parse(storedAnswers);
            const goal = parsed.goal || 'maintain';
            const adjusted = adjustMacrosForGoal({ calories: totalCals, protein: 0, carbs: 0, fat: 0 }, goal, userWeight);
            const mealsPerDay = parsed.meals || 3;
            setUserMacros({
              ...adjusted,
              weight: userWeight,
              perMeal: {
                protein: Math.round(adjusted.protein / mealsPerDay),
                carbs: Math.round(adjusted.carbs / mealsPerDay),
                fat: Math.round(adjusted.fat / mealsPerDay),
                cals: Math.round(adjusted.calories / mealsPerDay)
              }
            });
            setStep('builder');
          } else {
            setUserMacros({ calories: totalCals, protein: 0, carbs: 0, fat: 0, weight: userWeight });
            setStep('questions');
          }
        } else {
          setStep('questions');
        }
      } catch (error) {
        setStep('questions');
      }
    };

    loadUserMacros();
  }, [isLoaded, user, getToken]);

  const foodDatabase: { [key: string]: Food[] } = {
    protein: [
      { id: 'chicken-breast', name: 'Chicken Breast (skinless)', brand: 'RSPCA Approved', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 31, c: 0, f: 3.6, fiber: 0, sugar: 0 },
      { id: 'chicken-halal', name: 'Chicken Breast (halal)', brand: 'Lilydale Halal', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 31, c: 0, f: 3.6, fiber: 0, sugar: 0, notes: 'Halal certified' },
      { id: 'beef-mince', name: 'Beef Mince (5% fat)', brand: 'Al Amin Halal', store: ['Coles'], serving: 100, unit: 'g', p: 22, c: 0, f: 5, fiber: 0, sugar: 0, notes: 'Halal' },
      { id: 'beef-lean', name: 'Beef Mince (Premium 3 Star)', brand: 'Coles/Woolworths', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 24, c: 0, f: 7, fiber: 0, sugar: 0 },
      { id: 'barramundi', name: 'Barramundi Fillet', brand: 'Ocean Royale', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 20, c: 0, f: 2.5, fiber: 0, sugar: 0 },
      { id: 'salmon', name: 'Salmon Fillet (Atlantic)', brand: 'Tassal', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 20, c: 0, f: 13, fiber: 0, sugar: 0 },
      { id: 'prawns', name: 'Prawns (peeled)', brand: 'Australian', store: ['Coles', 'Woolworths', 'Costco'], serving: 100, unit: 'g', p: 24, c: 0, f: 0.3, fiber: 0, sugar: 0 },
      { id: 'tuna-can', name: 'Tuna in Springwater', brand: 'John West', store: ['Coles', 'Woolworths', 'ALDI'], serving: 95, unit: 'g (1 can)', p: 23, c: 0, f: 0.6, fiber: 0, sugar: 0 },
      { id: 'eggs', name: 'Eggs (whole, large)', brand: 'Any', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 50, unit: 'g (1 egg)', p: 6.3, c: 0.6, f: 5, fiber: 0, sugar: 0.6, notes: 'Max 3/day' },
      { id: 'egg-whites', name: 'Egg Whites (liquid)', brand: 'Pace Farm', store: ['Coles', 'Woolworths'], serving: 100, unit: 'ml', p: 11, c: 1, f: 0, fiber: 0, sugar: 1 },
      { id: 'tofu-firm', name: 'Tofu (firm)', brand: 'Unicurd', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 12, c: 1.5, f: 5, fiber: 1, sugar: 0 },
      { id: 'tempeh', name: 'Tempeh', brand: 'Loving Foods', store: ['Woolworths'], serving: 100, unit: 'g', p: 19, c: 9, f: 11, fiber: 6, sugar: 0 },
      { id: 'beans-black', name: 'Black Beans (canned)', brand: 'Edgell', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 8.9, c: 20, f: 0.5, fiber: 8, sugar: 0.5 },
      { id: 'chickpeas', name: 'Chickpeas (canned)', brand: 'Edgell', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 7, c: 17, f: 2.6, fiber: 6, sugar: 0.5 },
      { id: 'lentils', name: 'Lentils (cooked)', brand: 'Generic', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 9, c: 20, f: 0.4, fiber: 8, sugar: 1 },
      { id: 'greek-yogurt', name: 'Greek Yogurt (Natural)', brand: 'Chobani 0%', store: ['Coles', 'Woolworths'], serving: 170, unit: 'g', p: 17, c: 6, f: 0, fiber: 0, sugar: 6 },
      { id: 'yopro', name: 'YoPro High Protein', brand: 'YoPro Vanilla', store: ['Coles', 'Woolworths'], serving: 160, unit: 'g', p: 15, c: 12, f: 0.2, fiber: 0, sugar: 11 },
      { id: 'cottage-cheese', name: 'Cottage Cheese', brand: 'Bulla', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 12, c: 3, f: 4.5, fiber: 0, sugar: 3 },
      { id: 'protein-powder', name: 'Whey Protein Powder', brand: 'Aminoz WPI', store: ['Supplement Stores'], serving: 30, unit: 'g (1 scoop)', p: 27, c: 1, f: 0.5, fiber: 0, sugar: 0.5 },
      { id: 'protein-powder-plant', name: 'Plant Protein Powder', brand: 'Macro Mike', store: ['Woolworths'], serving: 30, unit: 'g (1 scoop)', p: 20, c: 4, f: 3, fiber: 3, sugar: 1 }
    ],
    carbs: [
      { id: 'rice-white', name: 'White Rice (cooked)', brand: 'SunRice', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 100, unit: 'g', p: 2.7, c: 28, f: 0.3, fiber: 0.4, sugar: 0 },
      { id: 'rice-brown', name: 'Brown Rice (cooked)', brand: 'SunRice', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 2.6, c: 23, f: 0.9, fiber: 1.8, sugar: 0.4 },
      { id: 'rice-basmati', name: 'Basmati Rice (cooked)', brand: 'SunRice', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 3, c: 25, f: 0.4, fiber: 0.7, sugar: 0 },
      { id: 'protein-pasta', name: 'High Protein Pasta', brand: 'Vetta', store: ['Coles', 'Woolworths'], serving: 75, unit: 'g (dry)', p: 13, c: 52, f: 2, fiber: 5, sugar: 2 },
      { id: 'pasta-regular', name: 'Pasta (regular)', brand: 'San Remo', store: ['Coles', 'Woolworths', 'ALDI'], serving: 75, unit: 'g (dry)', p: 10, c: 54, f: 1.1, fiber: 3, sugar: 2 },
      { id: 'protein-oats', name: 'Protein Oats', brand: 'Red Tractor', store: ['Woolworths'], serving: 50, unit: 'g', p: 7, c: 30, f: 3, fiber: 5, sugar: 1 },
      { id: 'oats-regular', name: 'Rolled Oats', brand: 'Uncle Tobys', store: ['Coles', 'Woolworths', 'ALDI'], serving: 40, unit: 'g', p: 4.4, c: 23, f: 2.8, fiber: 3.6, sugar: 0.4 },
      { id: 'bread-whole', name: 'Wholemeal Bread', brand: 'Tip Top The One', store: ['Coles', 'Woolworths'], serving: 44, unit: 'g (1 slice)', p: 4, c: 16, f: 1, fiber: 3, sugar: 1.5 },
      { id: 'bread-protein', name: 'High Protein Bread', brand: 'Herman Brot', store: ['Woolworths'], serving: 50, unit: 'g (1 slice)', p: 7, c: 8, f: 3, fiber: 6, sugar: 1 },
      { id: 'wrap-large', name: 'Wraps (large)', brand: 'Simson\'s Pantry', store: ['Coles'], serving: 62, unit: 'g (1 wrap)', p: 5, c: 32, f: 2.5, fiber: 2, sugar: 2 },
      { id: 'wrap-mini', name: 'Wraps (mini)', brand: 'Mission', store: ['Coles', 'Woolworths'], serving: 32, unit: 'g (1 wrap)', p: 2, c: 16, f: 1, fiber: 1, sugar: 1 },
      { id: 'sweet-potato', name: 'Sweet Potato', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1.6, c: 20, f: 0.1, fiber: 3, sugar: 4.2 },
      { id: 'potato-white', name: 'White Potato', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 100, unit: 'g', p: 2, c: 17, f: 0.1, fiber: 2.2, sugar: 0.8 },
      { id: 'quinoa', name: 'Quinoa (cooked)', brand: 'Generic', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 4.4, c: 21, f: 1.9, fiber: 2.8, sugar: 0 },
      { id: 'banana', name: 'Banana', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 118, unit: 'g (1 medium)', p: 1.3, c: 27, f: 0.4, fiber: 3.1, sugar: 14 },
      { id: 'apple', name: 'Apple', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 182, unit: 'g (1 medium)', p: 0.5, c: 25, f: 0.3, fiber: 4.4, sugar: 19 },
      { id: 'papaya', name: 'Papaya', brand: 'Fresh', store: ['Woolworths'], serving: 100, unit: 'g', p: 0.5, c: 11, f: 0.1, fiber: 1.7, sugar: 8 },
      { id: 'berries-mixed', name: 'Mixed Berries (frozen)', brand: 'Coles', store: ['Coles'], serving: 100, unit: 'g', p: 0.9, c: 12, f: 0.3, fiber: 3, sugar: 9 },
      { id: 'pumpkin', name: 'Pumpkin', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1, c: 6.5, f: 0.1, fiber: 0.5, sugar: 2.8 }
    ],
    fats: [
      { id: 'avocado', name: 'Avocado', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 100, unit: 'g', p: 2, c: 9, f: 15, fiber: 7, sugar: 0.7 },
      { id: 'almonds', name: 'Almonds (raw)', brand: 'Coles', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 28, unit: 'g (small handful)', p: 6, c: 6, f: 14, fiber: 3.5, sugar: 1 },
      { id: 'walnuts', name: 'Walnuts', brand: 'Woolworths', store: ['Woolworths', 'Costco'], serving: 28, unit: 'g', p: 4.3, c: 4, f: 18, fiber: 1.9, sugar: 0.7 },
      { id: 'cashews', name: 'Cashews (raw)', brand: 'ALDI', store: ['ALDI', 'Costco'], serving: 28, unit: 'g', p: 5, c: 9, f: 12, fiber: 1, sugar: 2 },
      { id: 'pb-mayvers', name: 'Protein Peanut Butter', brand: 'Mayvers', store: ['Coles', 'Woolworths'], serving: 15, unit: 'g (1 tbsp)', p: 5, c: 2.5, f: 7.5, fiber: 1.5, sugar: 1 },
      { id: 'pb-regular', name: 'Peanut Butter (natural)', brand: 'Sanitarium', store: ['Coles', 'Woolworths'], serving: 20, unit: 'g (1 tbsp)', p: 5, c: 3, f: 11, fiber: 2, sugar: 1.4 },
      { id: 'pb-powder', name: 'Powdered Peanut Butter', brand: 'PB2', store: ['Woolworths'], serving: 12, unit: 'g (2 tbsp)', p: 5, c: 4, f: 1.5, fiber: 2, sugar: 1 },
      { id: 'olive-oil', name: 'Extra Virgin Olive Oil', brand: 'Cobram Estate', store: ['Coles', 'Woolworths', 'ALDI'], serving: 14, unit: 'ml (1 tbsp)', p: 0, c: 0, f: 14, fiber: 0, sugar: 0 },
      { id: 'coconut-oil', name: 'Coconut Oil', brand: 'Coles Organic', store: ['Coles'], serving: 14, unit: 'ml (1 tbsp)', p: 0, c: 0, f: 14, fiber: 0, sugar: 0 },
      { id: 'cheese-light', name: 'Light Cheese Slices', brand: 'Bega', store: ['Coles', 'Woolworths'], serving: 20, unit: 'g (1 slice)', p: 5, c: 0.5, f: 3.5, fiber: 0, sugar: 0.5 },
      { id: 'cheese-cheddar', name: 'Cheddar Cheese', brand: 'Mainland', store: ['Coles', 'Woolworths'], serving: 30, unit: 'g', p: 7.5, c: 0.3, f: 10, fiber: 0, sugar: 0.3 },
      { id: 'feta', name: 'Feta Cheese', brand: 'Dodoni', store: ['Coles', 'Woolworths'], serving: 30, unit: 'g', p: 4, c: 1.2, f: 6, fiber: 0, sugar: 1.2 },
      { id: 'milk-skim', name: 'Skim Milk', brand: 'Any', store: ['Coles', 'Woolworths', 'ALDI'], serving: 250, unit: 'ml (1 cup)', p: 8.5, c: 12, f: 0.3, fiber: 0, sugar: 12 },
      { id: 'milk-almond', name: 'Almond Milk (unsweetened)', brand: 'Almond Breeze', store: ['Coles', 'Woolworths'], serving: 250, unit: 'ml', p: 1.3, c: 0.8, f: 2.8, fiber: 1.3, sugar: 0 },
      { id: 'tahini', name: 'Tahini', brand: 'Macro', store: ['Woolworths'], serving: 15, unit: 'g (1 tbsp)', p: 3, c: 1.5, f: 9, fiber: 1.4, sugar: 0.2 },
      { id: 'perinaise', name: 'Perinaise', brand: 'Nando\'s', store: ['Coles', 'Woolworths'], serving: 15, unit: 'g (1 tbsp)', p: 0.2, c: 1, f: 6, fiber: 0, sugar: 0.8 }
    ],
    vegetables: [
      { id: 'broccoli', name: 'Broccoli', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 2.8, c: 7, f: 0.4, fiber: 2.6, sugar: 1.7 },
      { id: 'spinach', name: 'Spinach (fresh)', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 2.9, c: 3.6, f: 0.4, fiber: 2.2, sugar: 0.4 },
      { id: 'capsicum', name: 'Capsicum', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1, c: 6, f: 0.3, fiber: 2.1, sugar: 4.2 },
      { id: 'carrots', name: 'Carrots', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI', 'Costco'], serving: 100, unit: 'g', p: 0.9, c: 10, f: 0.2, fiber: 2.8, sugar: 4.7 },
      { id: 'cucumber', name: 'Cucumber', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 0.7, c: 3.6, f: 0.1, fiber: 0.5, sugar: 1.7 },
      { id: 'lettuce', name: 'Lettuce (iceberg)', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 0.9, c: 3, f: 0.1, fiber: 1.2, sugar: 1.8 },
      { id: 'tomato', name: 'Tomato', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 0.9, c: 3.9, f: 0.2, fiber: 1.2, sugar: 2.6 },
      { id: 'zucchini', name: 'Zucchini', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1.2, c: 3.1, f: 0.3, fiber: 1, sugar: 2.5 },
      { id: 'mushrooms', name: 'Mushrooms', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 3.1, c: 3.3, f: 0.3, fiber: 1, sugar: 2 },
      { id: 'cauliflower', name: 'Cauliflower', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1.9, c: 5, f: 0.3, fiber: 2, sugar: 1.9 },
      { id: 'green-beans', name: 'Green Beans', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 100, unit: 'g', p: 1.8, c: 7, f: 0.2, fiber: 2.7, sugar: 3.3 },
      { id: 'asparagus', name: 'Asparagus', brand: 'Fresh', store: ['Coles', 'Woolworths'], serving: 100, unit: 'g', p: 2.2, c: 3.9, f: 0.1, fiber: 2.1, sugar: 1.9 }
    ],
    extras: [
      { id: 'tomato-paste', name: 'Tomato Paste (onion & garlic)', brand: 'Leggo\'s', store: ['Coles', 'Woolworths'], serving: 65, unit: 'g (1/4 cup)', p: 2, c: 10, f: 0.2, fiber: 2, sugar: 8 },
      { id: 'passata', name: 'Tomato Passata', brand: 'Mutti', store: ['Coles', 'Woolworths'], serving: 125, unit: 'g (1/2 cup)', p: 2, c: 7, f: 0.3, fiber: 1.6, sugar: 6 },
      { id: 'salsa', name: 'Salsa', brand: 'Old El Paso', store: ['Coles', 'Woolworths'], serving: 50, unit: 'g', p: 0.6, c: 4, f: 0.1, fiber: 1, sugar: 3 },
      { id: 'hummus', name: 'Hummus', brand: 'Obela Classic', store: ['Coles', 'Woolworths'], serving: 50, unit: 'g', p: 3, c: 5.5, f: 6, fiber: 2, sugar: 0.5 },
      { id: 'soy-sauce', name: 'Soy Sauce (reduced salt)', brand: 'Kikkoman', store: ['Coles', 'Woolworths', 'ALDI'], serving: 15, unit: 'ml (1 tbsp)', p: 1.2, c: 1.5, f: 0, fiber: 0.2, sugar: 1 },
      { id: 'sriracha', name: 'Sriracha Hot Sauce', brand: 'Flying Goose', store: ['Coles', 'Woolworths'], serving: 15, unit: 'g (1 tbsp)', p: 0.2, c: 3, f: 0.1, fiber: 0.3, sugar: 2.5 },
      { id: 'matcha', name: 'Matcha Powder (Organic)', brand: 'Coles Organic', store: ['Coles'], serving: 2, unit: 'g (1 tsp)', p: 0.6, c: 0.8, f: 0.1, fiber: 0.8, sugar: 0 },
      { id: 'garlic', name: 'Garlic (fresh)', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 3, unit: 'g (1 clove)', p: 0.2, c: 1, f: 0, fiber: 0.1, sugar: 0 },
      { id: 'lemon', name: 'Lemon (juice)', brand: 'Fresh', store: ['Coles', 'Woolworths', 'ALDI'], serving: 15, unit: 'ml (1 tbsp)', p: 0.1, c: 1.3, f: 0, fiber: 0.1, sugar: 0.5 }
    ]
  };

  const recipes = [
    {
      id: 'chicken-rice-bowl',
      name: 'Chicken & Rice Bowl',
      ingredients: ['chicken-breast', 'rice-white', 'broccoli', 'olive-oil'],
      instructions: '1. Grill 150g chicken breast\n2. Cook 100g rice\n3. Steam broccoli\n4. Drizzle 1 tbsp olive oil\n5. Season with garlic and lemon'
    },
    {
      id: 'protein-oats',
      name: 'High Protein Oats',
      ingredients: ['protein-oats', 'protein-powder', 'banana', 'pb-mayvers', 'milk-skim'],
      instructions: '1. Cook 50g oats with 125ml skim milk\n2. Stir in 1 scoop protein powder\n3. Top with sliced banana\n4. Add 1 tbsp peanut butter'
    },
    {
      id: 'beef-pasta',
      name: 'Beef Mince Pasta',
      ingredients: ['beef-mince', 'protein-pasta', 'tomato-paste', 'capsicum', 'cheese-light'],
      instructions: '1. Cook 75g pasta\n2. Brown 100g beef mince\n3. Add tomato paste and diced capsicum\n4. Mix with pasta\n5. Top with cheese slice'
    },
    {
      id: 'fish-sweet-potato',
      name: 'Barramundi with Sweet Potato',
      ingredients: ['barramundi', 'sweet-potato', 'broccoli', 'lemon', 'olive-oil'],
      instructions: '1. Bake 143g barramundi at 180°C for 20min\n2. Roast sweet potato cubes\n3. Steam broccoli\n4. Drizzle olive oil and lemon juice'
    },
    {
      id: 'greek-yogurt-bowl',
      name: 'Greek Yogurt Protein Bowl',
      ingredients: ['greek-yogurt', 'berries-mixed', 'almonds', 'pb-powder'],
      instructions: '1. Put 170g Greek yogurt in bowl\n2. Top with frozen berries\n3. Sprinkle almonds and PB powder\n4. Mix and enjoy'
    },
    {
      id: 'chicken-wrap',
      name: 'High Protein Chicken Wrap',
      ingredients: ['chicken-breast', 'wrap-large', 'lettuce', 'tomato', 'avocado', 'hummus'],
      instructions: '1. Grill 150g chicken\n2. Warm wrap\n3. Spread hummus\n4. Add chicken, lettuce, tomato, avocado\n5. Roll tightly'
    },
    {
      id: 'salmon-quinoa',
      name: 'Salmon Quinoa Bowl',
      ingredients: ['salmon', 'quinoa', 'spinach', 'avocado', 'lemon'],
      instructions: '1. Bake salmon at 180°C for 15min\n2. Cook quinoa\n3. Sauté spinach with garlic\n4. Assemble bowl\n5. Top with avocado and lemon'
    },
    {
      id: 'tofu-stirfry',
      name: 'Tofu Stir Fry',
      ingredients: ['tofu-firm', 'rice-white', 'broccoli', 'capsicum', 'carrots', 'soy-sauce'],
      instructions: '1. Press and cube tofu\n2. Stir-fry tofu until golden\n3. Add chopped vegetables\n4. Season with soy sauce\n5. Serve over rice'
    },
    {
      id: 'egg-sweet-potato',
      name: 'Eggs & Sweet Potato Hash',
      ingredients: ['eggs', 'sweet-potato', 'spinach', 'avocado', 'cheese-light'],
      instructions: '1. Dice and roast sweet potato\n2. Scramble 2-3 eggs\n3. Sauté spinach\n4. Mix together\n5. Top with avocado and cheese'
    },
    {
      id: 'prawn-rice',
      name: 'Garlic Prawns with Rice',
      ingredients: ['prawns', 'rice-basmati', 'garlic', 'lemon', 'olive-oil', 'asparagus'],
      instructions: '1. Cook basmati rice\n2. Sauté garlic in olive oil\n3. Add prawns, cook until pink\n4. Steam asparagus\n5. Squeeze lemon over prawns'
    }
  ];

  const questions = [
    {
      id: 'goal',
      q: 'What is your primary goal?',
      options: [
        { val: 'muscle', label: 'Build Muscle' },
        { val: 'fat-loss', label: 'Lose Fat' },
        { val: 'maintain', label: 'Maintain Weight' },
        { val: 'performance', label: 'Athletic Performance' }
      ]
    },
    {
      id: 'health',
      q: 'Any health conditions?',
      multi: true,
      options: [
        { val: 'none', label: 'No conditions' },
        { val: 'diabetes', label: 'Diabetes (low sugar)' },
        { val: 'high-bp', label: 'High Blood Pressure (low sodium)' },
        { val: 'cholesterol', label: 'High Cholesterol (low sat fat)' }
      ]
    },
    {
      id: 'meals',
      q: 'How many meals per day?',
      options: [
        { val: 2, label: '2 meals' },
        { val: 3, label: '3 meals' },
        { val: 4, label: '4 meals' }
      ]
    },
    {
      id: 'diet',
      q: 'Dietary restrictions?',
      multi: true,
      options: [
        { val: 'none', label: 'No restrictions' },
        { val: 'halal', label: 'Halal' },
        { val: 'kosher', label: 'Kosher' },
        { val: 'vegetarian', label: 'Vegetarian' },
        { val: 'vegan', label: 'Vegan' }
      ]
    },
    {
      id: 'store',
      q: 'Preferred grocery store?',
      multi: true,
      options: [
        { val: 'coles', label: 'Coles' },
        { val: 'woolworths', label: 'Woolworths' },
        { val: 'aldi', label: 'ALDI' },
        { val: 'costco', label: 'Costco' },
        { val: 'all', label: 'All stores' }
      ]
    }
  ];

  const adjustMacrosForGoal = (baseMacros: any, goal: string, userWeight: number = 70) => {
    const cals = baseMacros.calories;
    
    switch(goal) {
      case 'muscle':
      case 'fat-loss': {
        const proteinGrams = userWeight * 2;
        const proteinCals = proteinGrams * 4;
        const remainingCals = cals - proteinCals;
        
        const fatGrams = Math.max(userWeight * 0.8, (remainingCals * 0.25) / 9);
        const fatCals = fatGrams * 9;
        
        const carbCals = Math.max(0, cals - proteinCals - fatCals);
        const carbGrams = carbCals / 4;
        
        return { 
          calories: cals, 
          protein: proteinGrams, 
          carbs: carbGrams, 
          fat: fatGrams 
        };
      }
      case 'performance': {
        const proteinGrams = (cals * 0.25) / 4;
        const carbGrams = (cals * 0.55) / 4;
        const fatGrams = (cals * 0.20) / 9;
        return { calories: cals, protein: proteinGrams, carbs: carbGrams, fat: fatGrams };
      }
      default: {
        const proteinCals = cals * 0.4;
        const proteinGrams = proteinCals / 4;
        const remainingCals = cals - proteinCals;
        
        return { 
          calories: cals, 
          protein: proteinGrams, 
          carbs: (remainingCals * 0.50) / 4, 
          fat: (remainingCals * 0.50) / 9 
        };
      }
    }
  };

  const handleAnswer = (qId: string, val: any, multi: boolean) => {
    if (multi) {
      const current = answers[qId] || [];
      const updated = current.includes(val) ? current.filter((v: any) => v !== val) : [...current, val];
      setAnswers({ ...answers, [qId]: updated });
    } else {
      setAnswers({ ...answers, [qId]: val });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveFormAndProceed();
    }
  };

  const saveFormAndProceed = () => {
    localStorage.setItem('macroFormAnswers', JSON.stringify(answers));
    const goal = answers.goal || 'maintain';
    const userWeight = userMacros.weight || 70;
    const adjusted = adjustMacrosForGoal(userMacros, goal, userWeight);
    const mealsPerDay = answers.meals || 3;
    setUserMacros({
      ...adjusted,
      weight: userWeight,
      perMeal: {
        protein: Math.round(adjusted.protein / mealsPerDay),
        carbs: Math.round(adjusted.carbs / mealsPerDay),
        fat: Math.round(adjusted.fat / mealsPerDay),
        cals: Math.round(adjusted.calories / mealsPerDay)
      }
    });
    setEditingForm(false);
    setStep('builder');
  };

  const addFood = (food: Food, customAmount?: number) => {
    if (food.id === 'eggs') {
      const currentEggs = selectedItems.filter(item => item.food.id === 'eggs').reduce((sum, item) => sum + (item.amount / 50), 0);
      if (currentEggs >= 3) {
        alert('Maximum 3 eggs per day!');
        return;
      }
    }

    const amount = customAmount || food.serving;
    const macros = {
      p: (food.p * amount) / food.serving,
      c: (food.c * amount) / food.serving,
      f: (food.f * amount) / food.serving,
      fiber: (food.fiber * amount) / food.serving,
      sugar: (food.sugar * amount) / food.serving
    };

    const updatedItems = [...selectedItems, { food, amount, macros }];
    setSelectedItems(updatedItems);
    findMatchingRecipes(updatedItems);
  };

  const removeFood = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
    findMatchingRecipes(updatedItems);
  };

  const findMatchingRecipes = (items: SelectedFood[]) => {
    const selectedIds = items.map(item => item.food.id);
    const matched = recipes.filter(recipe => {
      const matchCount = recipe.ingredients.filter(ing => selectedIds.includes(ing)).length;
      return matchCount >= 3; // Need at least 3 matching ingredients
    });
    setMatchedRecipes(matched);
  };

  const getTotalMacros = () => {
    let total = { p: 0, c: 0, f: 0, fiber: 0, sugar: 0, cals: 0 };
    selectedItems.forEach(item => {
      total.p += item.macros.p;
      total.c += item.macros.c;
      total.f += item.macros.f;
      total.fiber += item.macros.fiber;
      total.sugar += item.macros.sugar;
    });
    total.cals = (total.p * 4) + (total.c * 4) + (total.f * 9);
    return total;
  };

  const saveMeal = () => {
    if (!mealName.trim()) {
      alert('Enter meal name');
      return;
    }
    const total = getTotalMacros();
    const meal: SavedMeal = { name: mealName, items: [...selectedItems], total };
    const updated = [...savedMeals, meal];
    setSavedMeals(updated);
    localStorage.setItem('savedMeals', JSON.stringify(updated));
    alert(`Saved "${mealName}"!`);
    setMealName('');
    setSelectedItems([]);
  };

  const loadMeal = (meal: SavedMeal) => {
    setSelectedItems([...meal.items]);
  };

  const deleteMeal = (index: number) => {
    const updated = savedMeals.filter((_, i) => i !== index);
    setSavedMeals(updated);
    localStorage.setItem('savedMeals', JSON.stringify(updated));
  };

  const getFilteredFoods = (category: string) => {
    const stores = answers.store || ['all'];
    const dietRestrictions = answers.diet || [];
    const isHalal = dietRestrictions.includes('halal');
    
    let filtered = foodDatabase[category];
    
    if (!stores.includes('all')) {
      filtered = filtered.filter(food => 
        food.store.some((s: string) => stores.map((st: string) => st.toLowerCase()).includes(s.toLowerCase()))
      );
    }
    
    if (isHalal) {
      filtered = filtered.filter(food => {
        if (['beef-mince', 'chicken-halal'].includes(food.id)) return true;
        
        if (['beef-lean', 'chicken-breast'].includes(food.id)) return false;
        
        if (['barramundi', 'salmon', 'prawns', 'tuna-can'].includes(food.id)) return true;
        
        if (['tofu-firm', 'tempeh', 'beans-black', 'chickpeas', 'lentils', 'eggs', 'egg-whites'].includes(food.id)) return true;
        
        if (category === 'carbs' || category === 'vegetables' || category === 'extras') return true;
        
        if (['greek-yogurt', 'yopro', 'cottage-cheese', 'protein-powder'].includes(food.id)) return true;
        
        return true;
      });
    }
    
    return filtered;
  };

  if (step === 'loading') {
    return <div style={{ padding: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>Loading...</div>;
  }

  if (!userMacros) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Set Up Profile First</h1>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>Go to Dashboard.</p>
        </div>
      </div>
    );
  }

  if (step === 'questions' || editingForm) {
    const q = questions[currentQuestion];
    const answer = answers[q.id];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="card">
          <div style={{ height: '4px', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#81c784', transition: 'width 0.3s' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>QUESTION {currentQuestion + 1} OF {questions.length}</div>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{q.q}</h2>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {q.options.map(opt => {
              const isSelected = q.multi ? Array.isArray(answer) && answer.includes(opt.val) : answer === opt.val;
              return (
                <button key={opt.val} onClick={() => handleAnswer(q.id, opt.val, q.multi || false)} style={{ background: isSelected ? '#81c784' : 'white', color: isSelected ? 'white' : '#2d3436', border: isSelected ? '1px solid #81c784' : '1px solid #e0e0e0', padding: '0.875rem', borderRadius: '6px', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
            {currentQuestion > 0 && <button className="btn-secondary" onClick={() => setCurrentQuestion(currentQuestion - 1)}>← Back</button>}
            <button className="btn-primary" onClick={handleNext} disabled={!answer || (q.multi && (!Array.isArray(answer) || answer.length === 0))} style={{ marginLeft: 'auto' }}>
              {currentQuestion === questions.length - 1 ? 'Save & Build' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'builder') {
    const total = getTotalMacros();
    const target = userMacros.perMeal;

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Build Your Meal</h1>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>Goal: {answers.goal || 'maintain'} • {answers.meals || 3} meals/day</p>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }} onClick={() => { setEditingForm(true); setStep('questions'); setCurrentQuestion(0); }}>Edit Preferences</button>
        </div>

        <div className="card" style={{ marginBottom: '1rem', background: '#f5f5f5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>PROTEIN</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: Math.abs(total.p - target.protein) < 5 ? '#81c784' : '#2d3436' }}>{total.p.toFixed(0)}/{target.protein}g</div></div>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>CARBS</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: Math.abs(total.c - target.carbs) < 10 ? '#81c784' : '#2d3436' }}>{total.c.toFixed(0)}/{target.carbs}g</div></div>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>FAT</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: Math.abs(total.f - target.fat) < 5 ? '#81c784' : '#2d3436' }}>{total.f.toFixed(0)}/{target.fat}g</div></div>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>FIBER</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{total.fiber.toFixed(0)}g</div></div>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>SUGAR</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{total.sugar.toFixed(0)}g</div></div>
            <div><div style={{ fontSize: '0.75rem', color: '#666' }}>CALORIES</div><div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{total.cals.toFixed(0)}/{target.cals}</div></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Selected ({selectedItems.length})</h3>
              {selectedItems.length === 0 && <p style={{ fontSize: '0.875rem', color: '#666' }}>Add items below...</p>}
              {selectedItems.map((item, i) => (
                <div key={i} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.8125rem' }}>
                    <div style={{ fontWeight: '500' }}>{item.amount}{item.food.unit} {item.food.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>P:{item.macros.p.toFixed(0)}g C:{item.macros.c.toFixed(0)}g F:{item.macros.f.toFixed(0)}g Fiber:{item.macros.fiber.toFixed(1)}g Sugar:{item.macros.sugar.toFixed(1)}g</div>
                  </div>
                  <button onClick={() => removeFood(i)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.125rem' }}>×</button>
                </div>
              ))}
              {selectedItems.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                  <input type="text" placeholder="Meal name" value={mealName} onChange={e => setMealName(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '0.5rem' }} />
                  <button className="btn-primary" onClick={saveMeal} style={{ width: '100%' }}>Save Meal</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
              {['protein', 'carbs', 'fats', 'vegetables', 'extras'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid #81c784' : '2px solid transparent', padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: activeTab === tab ? '600' : '400', color: activeTab === tab ? '#81c784' : '#2d3436', textTransform: 'capitalize' }}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="card">
              <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
                {getFilteredFoods(activeTab).map(food => (
                  <div key={food.id} onClick={() => addFood(food)} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#e8f5e9'} onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{food.serving}{food.unit} {food.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.25rem' }}>{food.brand} • {food.store.join(', ')}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>P:{food.p.toFixed(1)}g C:{food.c.toFixed(1)}g F:{food.f.toFixed(1)}g Fiber:{food.fiber.toFixed(1)}g</div>
                    {food.notes && <div style={{ fontSize: '0.75rem', color: '#81c784', marginTop: '0.25rem' }}>{food.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: '1rem', background: '#e8f5e9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '0.9375rem', margin: 0 }}>💡 About Tracking</h3>
                <button onClick={() => setShowTrackingInfo(!showTrackingInfo)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#81c784' }}>
                  {showTrackingInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showTrackingInfo && (
                <div style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#2d3436' }}>
                  <p style={{ marginBottom: '0.75rem' }}>These macros help you get started and find meal ideas. Use them as a rough guide.</p>
                  <p style={{ marginBottom: '0.75rem' }}><strong>You don't need to count every calorie.</strong> Focus on hitting protein targets and eating whole foods.</p>
                  <p style={{ marginBottom: '0.75rem' }}>If you want to track precisely, try <strong>MyFitnessPal</strong> - it's free and has a huge food database.</p>
                  <p style={{ marginBottom: 0 }}>Most people find success by: eating similar meals daily, hitting protein goals, and adjusting based on how they feel and perform.</p>
                </div>
              )}
            </div>

            {matchedRecipes.length > 0 && (
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>🍳 Recipe Ideas</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.75rem' }}>Based on your selected ingredients:</p>
                {matchedRecipes.map((recipe, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.8125rem', marginBottom: '0.5rem', color: '#81c784' }}>{recipe.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', whiteSpace: 'pre-line', lineHeight: '1.5' }}>{recipe.instructions}</div>
                  </div>
                ))}
              </div>
            )}

            {savedMeals.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Saved Meals</h3>
                {savedMeals.map((meal, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '6px', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <div style={{ fontWeight: '500', fontSize: '0.8125rem' }}>{meal.name}</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => loadMeal(meal)} style={{ background: 'none', border: 'none', color: '#81c784', cursor: 'pointer', fontSize: '0.75rem' }}>Load</button>
                        <button onClick={() => deleteMeal(i)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.75rem' }}>×</button>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>P:{meal.total.p.toFixed(0)}g C:{meal.total.c.toFixed(0)}g F:{meal.total.f.toFixed(0)}g</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{meal.total.cals.toFixed(0)}cal • {meal.items.length} items</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MacroPlans;