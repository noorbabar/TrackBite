import React, { useState, useEffect, useRef } from 'react';
import { Food } from './types';
import { searchFoods } from './mockApi';

interface FoodSearchProps {
  onFoodSelect: (food: Food) => void;
  onAddCustomClick: () => void;
  recentFoods?: Food[];
}

const FoodSearch: React.FC<FoodSearchProps> = ({ 
  onFoodSelect, 
  onAddCustomClick,
  recentFoods = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search for foods as the user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        setShowDropdown(true);
        searchFoods(searchQuery)
          .then(results => {
            setSearchResults(results);
            setIsSearching(false);
          });
      } else if (searchQuery.length === 0) {
        setSearchResults([]);
        setShowDropdown(false);
      } else {
        setSearchResults([]);
      }
    }, 400);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock barcode scanning function
  const handleBarcodeScan = () => {
    alert("Scanning barcode... (this feature isnt implemented yet sorryy)");
  };

  const handleFoodSelect = (food: Food) => {
    onFoodSelect(food);
    setSearchQuery('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 2 || recentFoods.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="search-section">
        <div className="search-wrapper">
      <h2 className="section-title">Add Food</h2>
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for a food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            className="search-input"
            ref={searchInputRef}
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
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
      
      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="search-results-dropdown" ref={dropdownRef}>
          {isSearching && (
            <div className="search-status">Searching...</div>
          )}
          
          {!isSearching && searchQuery.length > 0 && searchResults.length === 0 && (
            <div className="search-status">
              <p>No foods found. Try a different search or add a custom food.</p>
              <button 
                onClick={onAddCustomClick}
                className="add-custom-inline"
              >
                Add Custom Food
              </button>
            </div>
          )}
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <div className="result-category">Search Results</div>
              {searchResults.map(food => (
                <div
                  key={food.id}
                  className="search-result-item"
                  onClick={() => handleFoodSelect(food)}
                >
                  <div className="flex justify-between w-full">
                    <div className="food-info">
                      <span className="food-name">{food.name}</span>
                      <span className="food-serving">{food.servingSize}</span>
                    </div>
                    <div className="food-nutrients">
                      <span className="food-calories">{food.calories} cal</span>
                      <span className="food-macros">
                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isSearching && searchQuery.length === 0 && recentFoods.length > 0 && (
            <div className="recent-foods">
              <div className="result-category">Recent Foods</div>
              {recentFoods.slice(0, 5).map(food => (
                <div
                  key={food.id}
                  className="search-result-item"
                  onClick={() => handleFoodSelect(food)}
                >
                  <div className="flex justify-between w-full">
                    <div className="food-info">
                      <span className="food-name">{food.name}</span>
                      <span className="food-serving">{food.servingSize}</span>
                    </div>
                    <span className="food-calories">{food.calories} cal</span>
                  </div>
                </div>
                
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default FoodSearch;