// AddFoodModal.tsx
import React, { useState } from 'react';
import { Food, CustomFood } from './types';

interface AddFoodModalProps {
  selectedFood: Food | null;
  onClose: () => void;
  onAddFood: (servings: number, mealType: string) => void;
  onAddCustomFood: (customFood: CustomFood, servings: number, mealType: string) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ 
  selectedFood, 
  onClose, 
  onAddFood, 
  onAddCustomFood 
}) => {
  const [servings, setServings] = useState(1);
  const [mealType, setMealType] = useState('Breakfast');
  const [customFood, setCustomFood] = useState<CustomFood>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: '100g'
  });

  const handleSubmit = () => {
    if (selectedFood) {
      onAddFood(servings, mealType);
    } else {
      onAddCustomFood(customFood, servings, mealType);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">
          {selectedFood ? `Add ${selectedFood.name}` : 'Add Custom Food'}
        </h2>
        
        {selectedFood ? (
          <div className="food-info">
            <p><span className="label">Serving Size:</span> {selectedFood.servingSize}</p>
            <p><span className="label">Calories:</span> {selectedFood.calories}</p>
            <p><span className="label">Protein:</span> {selectedFood.protein}g</p>
            <p><span className="label">Carbs:</span> {selectedFood.carbs}g</p>
            <p><span className="label">Fat:</span> {selectedFood.fat}g</p>
          </div>
        ) : (
          <div className="form-group">
            <div className="form-group">
              <label>Food Name</label>
              <input
                type="text"
                value={customFood.name}
                onChange={(e) => setCustomFood({...customFood, name: e.target.value})}
                placeholder="e.g. Homemade Sandwich"
              />
            </div>
            <div className="form-group">
              <label>Serving Size</label>
              <input
                type="text"
                value={customFood.servingSize}
                onChange={(e) => setCustomFood({...customFood, servingSize: e.target.value})}
                placeholder="e.g. 1 sandwich, 100g"
              />
            </div>
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                value={customFood.calories}
                onChange={(e) => setCustomFood({...customFood, calories: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Protein (g)</label>
                <input
                  type="number"
                  value={customFood.protein}
                  onChange={(e) => setCustomFood({...customFood, protein: Number(e.target.value)})}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Carbs (g)</label>
                <input
                  type="number"
                  value={customFood.carbs}
                  onChange={(e) => setCustomFood({...customFood, carbs: Number(e.target.value)})}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Fat (g)</label>
                <input
                  type="number"
                  value={customFood.fat}
                  onChange={(e) => setCustomFood({...customFood, fat: Number(e.target.value)})}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="form-row-2">
          <div className="form-group">
            <label>Number of Servings</label>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              min="0.25"
              step="0.25"
            />
          </div>
          <div className="form-group">
            <label>Meal</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="add-button"
          >
            Add to Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodModal;