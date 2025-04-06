import React, { useState, useEffect } from 'react';

interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

interface FoodLogEntry {
  id: string;
  foodId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  servings: number;
  mealType: string;
  date: string;
}

// Mock food database
const foodDatabase: Food[] = [
  { id: '1', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium' },
  { id: '2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
  { id: '3', name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8, servingSize: '1 cup cooked' },
  { id: '4', name: 'Egg', calories: 70, protein: 6, carbs: 0.6, fat: 5, servingSize: '1 large' },
  { id: '5', name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, servingSize: '1 cup' },
];

// Mock API functions
const searchFoods = (query: string): Promise<Food[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

const addFoodToLog = (entry: Omit<FoodLogEntry, 'id'>): Promise<FoodLogEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry = {
        ...entry,
        id: Math.random().toString(36).substring(2, 9)
      };
      resolve(newEntry);
    }, 200);
  });
};

const AddCalories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [servings, setServings] = useState(1);
  const [mealType, setMealType] = useState('Breakfast');
  const [isSearching, setIsSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [customFood, setCustomFood] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: '100g'
  });

  // Daily nutritional totals
  const dailyTotals = foodLog
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

// Calculate macro percentages for the pie chart
const totalMacroGrams = dailyTotals.protein + dailyTotals.carbs + dailyTotals.fat;
const macroPercentages = {
  protein: totalMacroGrams ? Math.round((dailyTotals.protein / totalMacroGrams) * 100) : 0,
  carbs: totalMacroGrams ? Math.round((dailyTotals.carbs / totalMacroGrams) * 100) : 0,
  fat: totalMacroGrams ? Math.round((dailyTotals.fat / totalMacroGrams) * 100) : 0,
};

  // Search for foods as the user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        searchFoods(searchQuery)
          .then(results => {
            setSearchResults(results);
            setIsSearching(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleFoodSelection = (food: Food) => {
    setSelectedFood(food);
    setSearchQuery('');
    setSearchResults([]);
    setShowAddModal(true);
  };

  const handleAddFoodToLog = async () => {
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
    setServings(1);
    setShowAddModal(false);
  };

  const handleAddCustomFood = async () => {
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
    setCustomFood({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: '100g'
    });
    setServings(1);
    setShowAddModal(false);
  };

  const handleRemoveEntry = (id: string) => {
    setFoodLog(foodLog.filter(entry => entry.id !== id));
  };

  // Mock barcode scanning function
  const handleBarcodeScan = () => {
    alert("Scanning barcode... (This would activate camera in a real app)");
    // In a real implementation, this would activate the device camera
    // and process the barcode data to find the food item
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

      {/* Daily Summary */}
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

      {/* Search */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={handleBarcodeScan}
            className="scan-button"
          >
            Scan
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="add-custom-button"
          >
            Add Custom
          </button>
        </div>
        
        {/* Search Results */}
        {isSearching && <p className="text-gray-500 mt-2">Searching...</p>}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(food => (
              <div 
                key={food.id}
                className="search-result-item"
                onClick={() => handleFoodSelection(food)}
              >
                <div className="flex justify-between">
                  <span className="food-name">{food.name}</span>
                  <span className="food-calories">{food.calories} cal</span>
                </div>
                <div className="food-serving">{food.servingSize}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food Log */}
      <div className="food-log-section">
        <h2>Today's Log</h2>
        
        {/* Group food entries by meal type */}
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => {
          const mealEntries = foodLog.filter(
            entry => entry.mealType === meal && entry.date === currentDate
          );
          
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
                        onClick={() => handleRemoveEntry(entry.id)}
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
        
        {foodLog.filter(entry => entry.date === currentDate).length === 0 && (
          <p className="no-foods-message">No foods logged today</p>
        )}
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
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
                onClick={() => setShowAddModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={selectedFood ? handleAddFoodToLog : handleAddCustomFood}
                className="add-button"
              >
                Add to Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddCalories;