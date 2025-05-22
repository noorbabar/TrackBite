import React, { useState } from 'react';
import { DetailedNutrition, DetailedNutritionGoals } from './types';

interface DetailedNutritionViewProps {
  nutrition: DetailedNutrition;
  goals?: DetailedNutritionGoals;
}

const DetailedNutritionView: React.FC<DetailedNutritionViewProps> = ({ nutrition, goals }) => {
  const [activeTab, setActiveTab] = useState<'macros' | 'micros' | 'vitamins'>('macros');

  const getNutrientPercentage = (current: number, goal?: number) => {
    if (!goal) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const renderNutrientBar = (label: string, current: number, goal?: number, unit: string = 'g') => (
    <div className="nutrient-row">
      <div className="nutrient-label">
        <span>{label}</span>
        <span className="nutrient-values">
          {current.toFixed(1)}{unit}
          {goal && <span className="goal-text"> / {goal.toFixed(0)}{unit}</span>}
        </span>
      </div>
      {goal && (
        <div className="nutrient-bar">
          <div 
            className="nutrient-fill"
            style={{ width: `${getNutrientPercentage(current, goal)}%` }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="detailed-nutrition">
      <div className="nutrition-tabs">
        <button 
          className={`tab ${activeTab === 'macros' ? 'active' : ''}`}
          onClick={() => setActiveTab('macros')}
        >
          Macros
        </button>
        <button 
          className={`tab ${activeTab === 'micros' ? 'active' : ''}`}
          onClick={() => setActiveTab('micros')}
        >
          Nutrients
        </button>
        <button 
          className={`tab ${activeTab === 'vitamins' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitamins')}
        >
          Vitamins & Minerals
        </button>
      </div>

      <div className="nutrition-content">
        {activeTab === 'macros' && (
          <div className="macros-detailed">
            {renderNutrientBar('Protein', nutrition.protein, goals?.protein)}
            {renderNutrientBar('Carbohydrates', nutrition.carbs, goals?.carbs)}
            {renderNutrientBar('Dietary Fiber', nutrition.fiber, goals?.fiber)}
            {renderNutrientBar('Sugars', nutrition.sugar, goals?.sugar)}
            {renderNutrientBar('Total Fat', nutrition.fat, goals?.fat)}
            {renderNutrientBar('Saturated Fat', nutrition.saturatedFat, goals?.saturatedFat)}
          </div>
        )}

        {activeTab === 'micros' && (
          <div className="micros-detailed">
            {renderNutrientBar('Sodium', nutrition.sodium, goals?.sodium, 'mg')}
            {renderNutrientBar('Cholesterol', nutrition.cholesterol, goals?.cholesterol, 'mg')}
            {renderNutrientBar('Potassium', nutrition.potassium, goals?.potassium, 'mg')}
          </div>
        )}

        {activeTab === 'vitamins' && (
          <div className="vitamins-detailed">
            {renderNutrientBar('Vitamin C', nutrition.vitaminC, goals?.vitaminC, 'mg')}
            {renderNutrientBar('Calcium', nutrition.calcium, goals?.calcium, 'mg')}
            {renderNutrientBar('Iron', nutrition.iron, goals?.iron, 'mg')}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedNutritionView;