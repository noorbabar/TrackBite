import React, { useState, useEffect } from 'react';
import { Food, CustomFood } from './types';

interface AddFoodModalProps {
  selectedFood: Food | null;
  onClose: () => void;
  onAddFood: (servings: number, mealType: string) => void;
  onAddCustomFood: (customFood: CustomFood, servings: number, mealType: string) => void;
  editMode?: boolean;
  existingEntry?: {
    servings: number;
    mealType: string;
  };
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ 
  selectedFood, 
  onClose, 
  onAddFood, 
  onAddCustomFood,
  editMode = false,
  existingEntry
}) => {
  const [servings, setServings] = useState(existingEntry?.servings || 1);
  const [mealType, setMealType] = useState(existingEntry?.mealType || 'Breakfast');
  const [customFood, setCustomFood] = useState<CustomFood>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    calcium: 0,
    iron: 0,
    servingSize: '100g'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isQuickAdd, setIsQuickAdd] = useState(false);

  // Populate form if in edit mode
  useEffect(() => {
    if (editMode && existingEntry) {
      setServings(existingEntry.servings);
      setMealType(existingEntry.mealType);
    }
  }, [editMode, existingEntry]);

  const validateCustomFood = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!customFood.name.trim()) {
      newErrors.name = 'Food name is required';
    }
    
    if (customFood.calories < 0) {
      newErrors.calories = 'Calories cannot be negative';
    }
    
    if (customFood.protein < 0) {
      newErrors.protein = 'Protein cannot be negative';
    }
    
    if (customFood.carbs < 0) {
      newErrors.carbs = 'Carbs cannot be negative';
    }
    
    if (customFood.fat < 0) {
      newErrors.fat = 'Fat cannot be negative';
    }
    if (customFood.fiber < 0) newErrors.fiber = 'Fiber cannot be negative';
    if (customFood.sugar < 0) newErrors.sugar = 'Sugar cannot be negative';
    if (customFood.sodium < 0) newErrors.sodium = 'Sodium cannot be negative';
    if (customFood.calcium < 0) newErrors.calcium = 'Calcium cannot be negative';
    if (customFood.iron < 0) newErrors.iron = 'Iron cannot be negative';

    if (!customFood.servingSize.trim()) {
      newErrors.servingSize = 'Serving size is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (selectedFood) {
      onAddFood(servings, mealType);
    } else if (isQuickAdd) {
      // For quick add, we only need calories
      if (customFood.calories <= 0) {
        setErrors({ calories: 'Please enter valid calories' });
        return;
      }
      
      const quickAddFood: CustomFood = {
        name: customFood.name || 'Quick Add',
        calories: customFood.calories,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        calcium: 0,
        iron: 0,
        servingSize: 'serving'
      };
      
      onAddCustomFood(quickAddFood, servings, mealType);
    } else {
      // Full custom food add
      if (validateCustomFood()) {
        onAddCustomFood(customFood, servings, mealType);
      }
    }
  };

  const handleServingChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setServings(numValue);
    }
  };

  const modalTitle = () => {
    if (editMode) return selectedFood ? `Edit ${selectedFood.name}` : 'Edit Custom Food';
    if (selectedFood) return `Add ${selectedFood.name}`;
    if (isQuickAdd) return 'Quick Add Calories';
    return 'Add Custom Food';
  };

  // Calculate total nutrition based on servings
  const getTotalNutrition = () => {
    if (!selectedFood) return null;
    
    return {
      calories: selectedFood.calories * servings,
      protein: selectedFood.protein * servings,
      carbs: selectedFood.carbs * servings,
      fat: selectedFood.fat * servings,
      fiber: selectedFood.fiber * servings,
      sugar: selectedFood.sugar * servings,
      sodium: selectedFood.sodium * servings,
      calcium: selectedFood.calcium * servings,
      iron: selectedFood.iron * servings,
    };
  };

  const totalNutrition = getTotalNutrition();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{modalTitle()}</h2>
          <button onClick={onClose} className="close-button" aria-label="Close modal">×</button>
        </div>
        
        {selectedFood ? (
          <div className="food-info">
            <div className="food-details">
              <p><span className="label">Serving Size:</span> {selectedFood.servingSize}</p>
              <p><span className="label">Calories:</span> {selectedFood.calories}</p>
              <div className="macro-details">
                <p><span className="label">Protein:</span> {selectedFood.protein}g</p>
                <p><span className="label">Carbs:</span> {selectedFood.carbs}g</p>
                <p><span className="label">Fat:</span> {selectedFood.fat}g</p>
              </div>
            </div>
            
            {totalNutrition && (
              <div className="total-nutrition">
                <h3>Total for {servings} {servings === 1 ? 'serving' : 'servings'}</h3>
                <p className="total-calories">{totalNutrition.calories.toFixed(0)} calories</p>
                <div className="total-macros">
                  <p>Protein: {totalNutrition.protein.toFixed(1)}g</p>
                  <p>Carbs: {totalNutrition.carbs.toFixed(1)}g</p>
                  <p>Fat: {totalNutrition.fat.toFixed(1)}g</p>
                  <p>Fiber: {totalNutrition.fiber.toFixed(1)}g</p>
                  <p>Sugar: {totalNutrition.sugar.toFixed(1)}g</p>
                  <p>Sodium: {totalNutrition.sodium.toFixed(0)}mg</p>
                  <p>Calcium: {totalNutrition.calcium.toFixed(0)}mg</p>
                  <p>Iron: {totalNutrition.iron.toFixed(1)}mg</p>
                  </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {!selectedFood && !isQuickAdd && (
              <div className="toggle-custom-mode">
                <button 
                  className={`toggle-button ${!isQuickAdd ? 'active' : ''}`}
                  onClick={() => setIsQuickAdd(false)}
                >
                  Full Details
                </button>
                <button 
                  className={`toggle-button ${isQuickAdd ? 'active' : ''}`}
                  onClick={() => setIsQuickAdd(true)}
                >
                  Quick Add
                </button>
              </div>
            )}
          
            <div className="form-group">
              <div className="form-group">
                <label>Food Name {isQuickAdd && '(optional)'}</label>
                <input
                  type="text"
                  value={customFood.name}
                  onChange={(e) => setCustomFood({...customFood, name: e.target.value})}
                  placeholder={isQuickAdd ? "Quick calories" : "e.g. Homemade Sandwich"}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              {isQuickAdd ? (
                <div className="form-group">
                  <label>Calories</label>
                  <input
                    type="number"
                    value={customFood.calories || ''}
                    onChange={(e) => setCustomFood({...customFood, calories: Number(e.target.value)})}
                    min="0"
                    placeholder="Enter calories"
                    className={errors.calories ? 'error' : ''}
                  />
                  {errors.calories && <span className="error-message">{errors.calories}</span>}
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label>Serving Size</label>
                    <input
                      type="text"
                      value={customFood.servingSize}
                      onChange={(e) => setCustomFood({...customFood, servingSize: e.target.value})}
                      placeholder="e.g. 1 sandwich, 100g"
                      className={errors.servingSize ? 'error' : ''}
                    />
                    {errors.servingSize && <span className="error-message">{errors.servingSize}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Calories</label>
                    <input
                      type="number"
                      value={customFood.calories || ''}
                      onChange={(e) => setCustomFood({...customFood, calories: Number(e.target.value)})}
                      min="0"
                      placeholder="Enter calories"
                      className={errors.calories ? 'error' : ''}
                    />
                    {errors.calories && <span className="error-message">{errors.calories}</span>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Protein (g)</label>
                      <input
                        type="number"
                        value={customFood.protein || ''}
                        onChange={(e) => setCustomFood({...customFood, protein: Number(e.target.value)})}
                        min="0"
                        step="0.1"
                        className={errors.protein ? 'error' : ''}
                      />
                      {errors.protein && <span className="error-message">{errors.protein}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Carbs (g)</label>
                      <input
                        type="number"
                        value={customFood.carbs || ''}
                        onChange={(e) => setCustomFood({...customFood, carbs: Number(e.target.value)})}
                        min="0"
                        step="0.1"
                        className={errors.carbs ? 'error' : ''}
                      />
                      {errors.carbs && <span className="error-message">{errors.carbs}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label>Fat (g)</label>
                      <input
                        type="number"
                        value={customFood.fat || ''}
                        onChange={(e) => setCustomFood({...customFood, fat: Number(e.target.value)})}
                        min="0"
                        step="0.1"
                        className={errors.fat ? 'error' : ''}
                      />
                      {errors.fat && <span className="error-message">{errors.fat}</span>}
                    </div>
                    <div className="form-row">
  <div className="form-group">
    <label>Fiber (g)</label>
    <input
      type="number"
      value={customFood.fiber || ''}
      onChange={(e) => setCustomFood({...customFood, fiber: Number(e.target.value)})}
      min="0"
      step="0.1"
      className={errors.fiber ? 'error' : ''}
    />
    {errors.fiber && <span className="error-message">{errors.fiber}</span>}
  </div>

  <div className="form-group">
    <label>Sugar (g)</label>
    <input
      type="number"
      value={customFood.sugar || ''}
      onChange={(e) => setCustomFood({...customFood, sugar: Number(e.target.value)})}
      min="0"
      step="0.1"
      className={errors.sugar ? 'error' : ''}
    />
    {errors.sugar && <span className="error-message">{errors.sugar}</span>}
  </div>

  <div className="form-group">
    <label>Sodium (mg)</label>
    <input
      type="number"
      value={customFood.sodium || ''}
      onChange={(e) => setCustomFood({...customFood, sodium: Number(e.target.value)})}
      min="0"
      step="1"
      className={errors.sodium ? 'error' : ''}
    />
    {errors.sodium && <span className="error-message">{errors.sodium}</span>}
  </div>
</div>

<div className="form-row">
  <div className="form-group">
    <label>Calcium (mg)</label>
    <input
      type="number"
      value={customFood.calcium || ''}
      onChange={(e) => setCustomFood({...customFood, calcium: Number(e.target.value)})}
      min="0"
      step="1"
      className={errors.calcium ? 'error' : ''}
    />
    {errors.calcium && <span className="error-message">{errors.calcium}</span>}
  </div>

  <div className="form-group">
    <label>Iron (mg)</label>
    <input
      type="number"
      value={customFood.iron || ''}
      onChange={(e) => setCustomFood({...customFood, iron: Number(e.target.value)})}
      min="0"
      step="0.1"
      className={errors.iron ? 'error' : ''}
    />
    {errors.iron && <span className="error-message">{errors.iron}</span>}
  </div>
</div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        
        <div className="form-row-2">
          <div className="form-group">
            <label>Number of Servings</label>
            <div className="servings-input">
              <button
                onClick={() => setServings(prev => Math.max(0.25, prev - 0.25))}
                className="servings-button"
              >
                −
              </button>
              <input
                type="number"
                value={servings}
                onChange={(e) => handleServingChange(e.target.value)}
                min="0.25"
                step="0.25"
              />
              <button
                onClick={() => setServings(prev => prev + 0.25)}
                className="servings-button"
              >
                +
              </button>
            </div>
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
            {editMode ? 'Save Changes' : 'Add to Log'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodModal;