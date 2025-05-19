import React, { useState } from 'react';
import { FoodLogEntry } from './types';

interface FoodLogProps {
  foodLog: FoodLogEntry[];
  currentDate: string;
  onRemoveEntry: (id: string) => void;
  onEditEntry?: (id: string) => void;
}

const FoodLog: React.FC<FoodLogProps> = ({ 
  foodLog, 
  currentDate, 
  onRemoveEntry,
  onEditEntry 
}) => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({
    Breakfast: true,
    Lunch: true,
    Dinner: true,
    Snacks: true
  });

  const todaysLog = foodLog.filter(entry => entry.date === currentDate);
  
  // Calculate meal totals for each meal type
  const mealTotals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'].reduce((acc, meal) => {
    const mealEntries = todaysLog.filter(entry => entry.mealType === meal);
    const totalCalories = mealEntries.reduce((sum, entry) => 
      sum + (entry.calories * entry.servings), 0);
    
    acc[meal] = {
      calories: totalCalories,
      entryCount: mealEntries.length
    };
    return acc;
  }, {} as Record<string, { calories: number, entryCount: number }>);

  const toggleMeal = (meal: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  return (
    <div className="food-log-section">
      <div className="food-log-header">
        <h2>Today's Log</h2>
        {todaysLog.length > 0 && (
          <div className="total-logged">
            {todaysLog.length} items logged
          </div>
        )}
      </div>
      
      {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => {
        const mealEntries = todaysLog.filter(entry => entry.mealType === meal);
        
        if (mealEntries.length === 0) return null;
        
        const mealTotal = mealTotals[meal];
        
        return (
          <div key={meal} className="meal-section">
            <div 
              className="meal-header"
              onClick={() => toggleMeal(meal)}
            >
              <div className="meal-title-container">
                <h3 className="meal-title">{meal}</h3>
                <span className="meal-entry-count">
                  {mealTotal.entryCount} {mealTotal.entryCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="meal-calories">
                {mealTotal.calories.toFixed(0)} cal
                <span className={`expand-icon ${expandedMeals[meal] ? 'expanded' : ''}`}>
                  {expandedMeals[meal] ? '▼' : '►'}
                </span>
              </div>
            </div>
            
            {expandedMeals[meal] && (
              <div className="meal-items">
                {mealEntries.map(entry => (
                  <div key={entry.id} className="meal-item">
                    <div className="meal-item-details">
                      <div className="meal-item-name">
                        {entry.name} 
                        <span className="meal-item-serving">
                          ({entry.servings} × {entry.servingSize})
                        </span>
                      </div>
                      <div className="meal-item-macros">
                        <span className="macro protein">
                          P: {(entry.protein * entry.servings).toFixed(1)}g
                        </span>
                        <span className="macro carbs">
                          C: {(entry.carbs * entry.servings).toFixed(1)}g
                        </span>
                        <span className="macro fat">
                          F: {(entry.fat * entry.servings).toFixed(1)}g
                        </span>
                      </div>
                    </div>
                    <div className="meal-item-actions">
                      <span className="meal-item-calories">
                        {(entry.calories * entry.servings).toFixed(0)} cal
                      </span>
                      <div className="action-buttons">
                        {onEditEntry && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditEntry(entry.id);
                            }}
                            className="edit-button"
                            aria-label="Edit food entry"
                          >
                            ✎
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveEntry(entry.id);
                          }}
                          className="delete-button"
                          aria-label="Remove food entry"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      
      {todaysLog.length === 0 && (
        <div className="empty-log">
          <p className="no-foods-message">No foods logged today</p>
          <p className="empty-log-suggestion">
            Use the search box above to find and add foods
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodLog;