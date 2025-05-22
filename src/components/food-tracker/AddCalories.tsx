// AddCalories.tsx
import React, { useState, useEffect } from 'react';
import { Food, FoodLogEntry, CustomFood, DailyTotals, MacroPercentages, MacroPresetType } from './types';
import { addFoodToLog } from './mockApi';
import DailySummary from './DailySummary';
import FoodSearch from './FoodSearch';
import FoodLog from './FoodLog';
import AddFoodModal from './AddFoodModal';
import MacroPresetSelector from './MacroPresetSelector';
import DetailedNutritionView from './DetailedNutritionView';
import { useUser, useAuth } from "@clerk/clerk-react";
import { fetchUserProfile } from '../../services/api';
import { MACRO_PRESETS } from './MacroPresets';

const AddCalories: React.FC = () => {
  const [nutritionGoals, setNutritionGoals] = useState<{ calories: number; protein: number; carbs: number; fat: number } | null>(null);
  const [, setLoading] = useState(true);
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken } = useAuth();

  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const [showMacroSettings, setShowMacroSettings] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedMacroPreset, setSelectedMacroPreset] = useState<MacroPresetType>('balanced');
  const [customMacroRatios, setCustomMacroRatios] = useState({ protein: 25, carbs: 45, fat: 30 });

  useEffect(() => {
    if (!isUserLoaded || !user) return;
  
    const loadUserGoals = async () => {
      try {
        setLoading(true);
        const clerkUserId = user?.id;
        const token = await getToken();
  
        if (!clerkUserId || !token) return;
  
        const profile = await fetchUserProfile(clerkUserId, token);
        
        if (profile?.stats?.recommendedCalories) {
          const activeRatios = selectedMacroPreset === 'custom' 
            ? customMacroRatios 
            : MACRO_PRESETS[selectedMacroPreset].ratios;

          const totalCalories = profile.stats.recommendedCalories;
          const proteinCalories = totalCalories * (activeRatios.protein / 100);
          const carbCalories = totalCalories * (activeRatios.carbs / 100);
          const fatCalories = totalCalories * (activeRatios.fat / 100);
          
          setNutritionGoals({
            calories: totalCalories,
            protein: proteinCalories / 4,
            carbs: carbCalories / 4, 
            fat: fatCalories / 9 
          });
        }
      } catch (error) {
        console.error('Error loading nutrition goals:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUserGoals();
  }, [isUserLoaded, user, getToken, selectedMacroPreset, customMacroRatios]);

  // Calculate daily totals
  const dailyTotals: DailyTotals = foodLog
    .filter(entry => entry.date === currentDate)
    .reduce(
      (acc, entry) => {
        return {
          calories: acc.calories + entry.calories * entry.servings,
          protein: acc.protein + entry.protein * entry.servings,
          carbs: acc.carbs + entry.carbs * entry.servings,
          fat: acc.fat + entry.fat * entry.servings,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

  const totalMacroGrams = dailyTotals.protein + dailyTotals.carbs + dailyTotals.fat;
  const macroPercentages: MacroPercentages = {
    protein: totalMacroGrams ? Math.round((dailyTotals.protein / totalMacroGrams) * 100) : 0,
    carbs: totalMacroGrams ? Math.round((dailyTotals.carbs / totalMacroGrams) * 100) : 0,
    fat: totalMacroGrams ? Math.round((dailyTotals.fat / totalMacroGrams) * 100) : 0,
  };

  const handleFoodSelection = (food: Food) => {
    setSelectedFood(food);
    setShowAddModal(true);
  };

  const handleAddFoodToLog = async (servings: number, mealType: string) => {
    if (!selectedFood) return;
    
    const entry = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      calories: selectedFood.calories,
      protein: selectedFood.protein,
      carbs: selectedFood.carbs,
      fat: selectedFood.fat,
      servingSize: selectedFood.servingSize,
      servings,
      mealType,
      date: currentDate
    };
    
    const newEntry = await addFoodToLog(entry);
    setFoodLog([...foodLog, newEntry]);
    setSelectedFood(null);
    setShowAddModal(false);
  };

  const handleAddCustomFood = async (customFood: CustomFood, servings: number, mealType: string) => {
    if (!customFood.name || customFood.calories < 0) return;
    
    const newFood: Food = {
      id: Math.random().toString(36).substring(2, 9),
      ...customFood
    };
    
    const entry = {
      foodId: newFood.id,
      name: newFood.name,
      calories: newFood.calories,
      protein: newFood.protein,
      carbs: newFood.carbs,
      fat: newFood.fat,
      servingSize: newFood.servingSize,
      servings,
      mealType,
      date: currentDate
    };
    
    const newEntry = await addFoodToLog(entry);
    setFoodLog([...foodLog, newEntry]);
    setShowAddModal(false);
  };

  const handleRemoveEntry = (id: string) => {
    setFoodLog(foodLog.filter(entry => entry.id !== id));
  };

  const handleMacroPresetChange = (preset: MacroPresetType) => {
    setSelectedMacroPreset(preset);
  };

  const handleCustomRatiosChange = (ratios: { protein: number; carbs: number; fat: number }) => {
    // Ensure ratios add up to 100%
    const total = ratios.protein + ratios.carbs + ratios.fat;
    if (total <= 100) {
      setCustomMacroRatios(ratios);
    }
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h1>Nutrition Log</h1>
      </div>
      
      <div className="date-selector">
        <label>Date:</label>
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </div>

      <div className="nutrition-controls">
        <button 
          className="control-button"
          onClick={() => setShowMacroSettings(true)}
        >
          Macro Settings
        </button>
        <button 
          className="control-button"
          onClick={() => setShowDetailedView(true)}
        >
          Detailed View
        </button>
      </div>

      <DailySummary 
        dailyTotals={dailyTotals} 
        macroPercentages={macroPercentages}
        nutritionGoals={nutritionGoals || undefined}
      />

      <FoodSearch 
        onFoodSelect={handleFoodSelection}
        onAddCustomClick={() => setShowAddModal(true)}
      />

      <FoodLog 
        foodLog={foodLog}
        currentDate={currentDate}
        onRemoveEntry={handleRemoveEntry}
      />

      {/* Add Food Modal Component */}
      {showAddModal && (
        <AddFoodModal
          selectedFood={selectedFood}
          onClose={() => {
            setShowAddModal(false);
            setSelectedFood(null);
          }}
          onAddFood={(servings, mealType) => handleAddFoodToLog(servings, mealType)}
          onAddCustomFood={(customFood, servings, mealType) => 
            handleAddCustomFood(customFood, servings, mealType)
          }
        />
      )}

      {/* Macro Settings Modal */}
      {showMacroSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Macro Distribution Settings</h3>
              <button onClick={() => setShowMacroSettings(false)}>×</button>
            </div>
            <MacroPresetSelector
              selectedPreset={selectedMacroPreset}
              onPresetChange={handleMacroPresetChange}
              customRatios={customMacroRatios}
              onCustomRatiosChange={handleCustomRatiosChange}
            />
            <div className="modal-actions">
              <button 
                className="save-button"
                onClick={() => setShowMacroSettings(false)}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Nutrition Modal */}
      {showDetailedView && (
        <div className="modal-overlay">
          <div className="modal-content detailed-modal">
            <div className="modal-header">
              <h3>Detailed Nutrition</h3>
              <button onClick={() => setShowDetailedView(false)}>×</button>
            </div>
            <DetailedNutritionView
              nutrition={{
                ...dailyTotals,
                fiber: 0,
                sugar: 0,
                sodium: 0,
                saturatedFat: 0,
                cholesterol: 0,
                potassium: 0,
                vitaminC: 0,
                calcium: 0,
                iron: 0
              }}
              goals={nutritionGoals ? {
                ...nutritionGoals,
                fiber: 25,
                sugar: 50,
                sodium: 2300,
                saturatedFat: 20,
                cholesterol: 300,
                potassium: 3500,
                vitaminC: 90,
                calcium: 1000,
                iron: 18
              } : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCalories;