// DailySummary.tsx
import React from 'react';
import { DailyTotals, MacroPercentages } from './types';

interface DailySummaryProps {
  dailyTotals: DailyTotals;
  macroPercentages: MacroPercentages;
}

const DailySummary: React.FC<DailySummaryProps> = ({ dailyTotals, macroPercentages }) => {
  return (
    <div className="summary-card">
      <h2 className="summary-title">Daily Summary</h2>
      <div className="calories-display">
        <div className="calories-circle">
          <span className="calories-number">{dailyTotals.calories.toFixed(0)}</span>
          <span className="calories-label">calories</span>
        </div>
      </div>
      
      <div className="macros-breakdown">
        <div className="macro-bar">
          <div 
            className="macro-segment protein-segment" 
            style={{ width: `${macroPercentages.protein}%` }}
          ></div>
          <div 
            className="macro-segment carbs-segment" 
            style={{ width: `${macroPercentages.carbs}%` }}
          ></div>
          <div 
            className="macro-segment fat-segment" 
            style={{ width: `${macroPercentages.fat}%` }}
          ></div>
        </div>
        
        <div className="macro-details">
          <div className="macro-item">
            <div className="macro-color protein-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.protein.toFixed(1)}g</span>
              <span className="macro-name">Protein</span>
              <span className="macro-percent">{macroPercentages.protein}%</span>
            </div>
          </div>
          
          <div className="macro-item">
            <div className="macro-color carbs-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.carbs.toFixed(1)}g</span>
              <span className="macro-name">Carbs</span>
              <span className="macro-percent">{macroPercentages.carbs}%</span>
            </div>
          </div>
          
          <div className="macro-item">
            <div className="macro-color fat-color"></div>
            <div className="macro-info">
              <span className="macro-value">{dailyTotals.fat.toFixed(1)}g</span>
              <span className="macro-name">Fat</span>
              <span className="macro-percent">{macroPercentages.fat}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;