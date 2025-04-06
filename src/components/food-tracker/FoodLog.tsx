// FoodLog.tsx
import React from 'react';
import { FoodLogEntry } from './types';

interface FoodLogProps {
  foodLog: FoodLogEntry[];
  currentDate: string;
  onRemoveEntry: (id: string) => void;
}

const FoodLog: React.FC<FoodLogProps> = ({ foodLog, currentDate, onRemoveEntry }) => {
  const todaysLog = foodLog.filter(entry => entry.date === currentDate);
  
  return (
    <div className="food-log-section">
      <h2>Today's Log</h2>
      
      {/* Group food entries by meal type */}
      {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => {
        const mealEntries = todaysLog.filter(entry => entry.mealType === meal);
        
        if (mealEntries.length === 0) return null;
        
        return (
          <div key={meal} className="meal-section">
            <h3 className="meal-title">{meal}</h3>
            <div className="meal-items">
              {mealEntries.map(entry => (
                <div key={entry.id} className="meal-item">
                  <div className="meal-item-details">
                    <div className="meal-item-name">{entry.name} ({entry.servings} × {entry.servingSize})</div>
                    <div className="meal-item-macros">
                      P: {(entry.protein * entry.servings).toFixed(1)}g | 
                      C: {(entry.carbs * entry.servings).toFixed(1)}g | 
                      F: {(entry.fat * entry.servings).toFixed(1)}g
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="meal-item-calories">{(entry.calories * entry.servings).toFixed(0)} cal</span>
                    <button 
                      onClick={() => onRemoveEntry(entry.id)}
                      className="delete-button"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {todaysLog.length === 0 && (
        <p className="no-foods-message">No foods logged today</p>
      )}
    </div>
  );
};

export default FoodLog;