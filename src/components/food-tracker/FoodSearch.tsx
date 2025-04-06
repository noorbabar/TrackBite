// FoodSearch.tsx
import React, { useState, useEffect } from 'react';
import { Food } from './types';
import { searchFoods } from './mockApi';

interface FoodSearchProps {
  onFoodSelect: (food: Food) => void;
  onAddCustomClick: () => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onFoodSelect, onAddCustomClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Mock barcode scanning function
  const handleBarcodeScan = () => {
    alert("Scanning barcode... (This would activate camera in a real app)");
    // In a real implementation, this would activate the device camera
    // and process the barcode data to find the food item
  };

  return (
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
          onClick={onAddCustomClick}
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
              onClick={() => {
                onFoodSelect(food);
                setSearchQuery('');
                setSearchResults([]);
              }}
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
  );
};

export default FoodSearch;