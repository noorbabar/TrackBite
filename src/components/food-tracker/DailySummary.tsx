import React from 'react';
import { DailyTotals, MacroPercentages, NutritionGoals } from './types';

interface DailySummaryProps {
  dailyTotals: DailyTotals;
  macroPercentages: MacroPercentages;
  nutritionGoals?: NutritionGoals; 
}

const DailySummary: React.FC<DailySummaryProps> = ({ 
  dailyTotals, 
  macroPercentages,
  nutritionGoals 
}) => {
  // Calculate percentage of goals reached
  const caloriePercentage = nutritionGoals 
    ? Math.min(Math.round((dailyTotals.calories / nutritionGoals.calories) * 100), 100)
    : 0;
    
  // Calculate remaining calories if goals exist
  const remainingCalories = nutritionGoals 
    ? nutritionGoals.calories - dailyTotals.calories 
    : null;

  return (
    <div className="summary-card">
      <h2 className="summary-title">Daily Summary</h2>
      
      <div className="calories-display">
        <div className="calories-circle">
          <span className="calories-number">{dailyTotals.calories.toFixed(0)}</span>
          <span className="calories-label">calories</span>
          
          {nutritionGoals && (
            <div className="calories-goal">
              <div className="goal-progress-bar">
                <div 
                  className="goal-progress-fill" 
                  style={{ width: `${caloriePercentage}%` }}
                ></div>
              </div>
              <span className="remaining-calories">
                {remainingCalories && remainingCalories > 0 
                  ? `${remainingCalories.toFixed(0)} cal remaining` 
                  : "Goal reached"}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="macros-breakdown">
        <div className="macro-bar">
          <div
            className="macro-segment protein-segment"
            style={{ width: `${macroPercentages.protein}%` }}
            title={`Protein: ${macroPercentages.protein}%`}
          ></div>
          <div
            className="macro-segment carbs-segment"
            style={{ width: `${macroPercentages.carbs}%` }}
            title={`Carbs: ${macroPercentages.carbs}%`}
          ></div>
          <div
            className="macro-segment fat-segment"
            style={{ width: `${macroPercentages.fat}%` }}
            title={`Fat: ${macroPercentages.fat}%`}
          ></div>
        </div>
        
        <div className="macro-details">
          <div className="macro-item">
            <div className="macro-color protein-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.protein.toFixed(1)}g</span>
              <span className="macro-name">Protein</span>
              <span className="macro-percent">{macroPercentages.protein}%</span>
              {nutritionGoals && (
                <span className="macro-goal">
                  of {nutritionGoals.protein}g goal
                </span>
              )}
            </div>
          </div>
          
          <div className="macro-item">
            <div className="macro-color carbs-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.carbs.toFixed(1)}g</span>
              <span className="macro-name">Carbs</span>
              <span className="macro-percent">{macroPercentages.carbs}%</span>
              {nutritionGoals && (
                <span className="macro-goal">
                  of {nutritionGoals.carbs}g goal
                </span>
              )}
            </div>
          </div>
          
          <div className="macro-item">
            <div className="macro-color fat-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.fat.toFixed(1)}g</span>
              <span className="macro-name">Fat</span>
              <span className="macro-percent">{macroPercentages.fat}%</span>
              {nutritionGoals && (
                <span className="macro-goal">
                  of {nutritionGoals.fat}g goal
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {dailyTotals.calories > 0 && (
        <div className="weekly-trends-teaser">
          <button className="view-trends-button">
            View Weekly Trends
          </button>
        </div>
      )}
    </div>
  );
};

export default DailySummary;