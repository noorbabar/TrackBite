// AddCalories.tsx
import React, { useState } from 'react';
import { Food, FoodLogEntry, CustomFood, DailyTotals, MacroPercentages } from './types';
import { addFoodToLog } from './mockApi';
import DailySummary from './ DailySummary';
import FoodSearch from './FoodSearch';
import FoodLog from './FoodLog';
import AddFoodModal from './AddFoodModal';

const AddCalories: React.FC = () => {
  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
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

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h1>Food & Nutrition Tracker</h1>
      </div>
      
      {/* Date selection */}
      <div className="date-selector">
        <label>Date:</label>
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </div>

      {/* Daily Summary Component */}
      <DailySummary 
        dailyTotals={dailyTotals} 
        macroPercentages={macroPercentages} 
      />

      {/* Food Search Component */}
      <FoodSearch 
        onFoodSelect={handleFoodSelection}
        onAddCustomClick={() => setShowAddModal(true)}
      />

      {/* Food Log Component */}
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
    </div>
  );
};

export default AddCalories;