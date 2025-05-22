import React from 'react';
import { MacroPresetType, MacroPreset } from './types';

interface MacroPresetSelectorProps {
  selectedPreset: MacroPresetType;
  onPresetChange: (preset: MacroPresetType) => void;
  customRatios?: { protein: number; carbs: number; fat: number };
  onCustomRatiosChange?: (ratios: { protein: number; carbs: number; fat: number }) => void;
}

export const MACRO_PRESETS: Record<string, MacroPreset> = {
  balanced: {
    name: 'Balanced',
    description: 'Balanced macronutrient distribution for general health',
    ratios: { protein: 25, carbs: 45, fat: 30 }
  },
  lowCarb: {
    name: 'Low Carb',
    description: 'Reduced carbohydrates for weight management',
    ratios: { protein: 30, carbs: 20, fat: 50 }
  },
  keto: {
    name: 'Ketogenic',
    description: 'Very low carb, high fat for ketosis',
    ratios: { protein: 20, carbs: 5, fat: 75 }
  },
  highProtein: {
    name: 'High Protein',
    description: 'Increased protein for muscle building',
    ratios: { protein: 40, carbs: 35, fat: 25 }
  },
  mediterranean: {
    name: 'Mediterranean',
    description: 'Heart-healthy Mediterranean style',
    ratios: { protein: 20, carbs: 50, fat: 30 }
  }, 
  custom: {
    name: 'Custom',
    description: 'Set your own macro ratios',
    ratios: { protein: 0, carbs: 0, fat: 0 }
  }
};
const MacroPresetSelector: React.FC<MacroPresetSelectorProps> = ({
  selectedPreset,
  onPresetChange,
  customRatios,
  onCustomRatiosChange
}) => {
  return (
    <div className="macro-preset-selector">
      <h3>Macro Distribution</h3>
      
      <div className="preset-grid">
        {(Object.entries(MACRO_PRESETS) as [MacroPresetType, MacroPreset][]).map(([key, preset]) => (
          <div 
            key={key}
            className={`preset-card ${selectedPreset === key ? 'selected' : ''}`}
            onClick={() => onPresetChange(key)}
          >
            <h4>{preset.name}</h4>
            <p className="preset-description">{preset.description}</p>
            <div className="preset-ratios">
              <span>P: {preset.ratios.protein}%</span>
              <span>C: {preset.ratios.carbs}%</span>
              <span>F: {preset.ratios.fat}%</span>
            </div>
          </div>
        ))}

        {/* Custom Preset card */}
        <div 
          className={`preset-card ${selectedPreset === 'custom' ? 'selected' : ''}`}
          onClick={() => onPresetChange('custom')}
        >
          <h4>Custom</h4>
          <p className="preset-description">Set your own macro ratios</p>
          {selectedPreset === 'custom' && customRatios && onCustomRatiosChange && (
            <div className="custom-inputs">
              <div className="input-group">
                <label>Protein %</label>
                <input
                  type="number"
                  value={customRatios.protein}
                  onChange={(e) => onCustomRatiosChange({
                    ...customRatios,
                    protein: parseInt(e.target.value) || 0
                  })}
                  min={0}
                  max={100}
                />
              </div>
              <div className="input-group">
                <label>Carbs %</label>
                <input
                  type="number"
                  value={customRatios.carbs}
                  onChange={(e) => onCustomRatiosChange({
                    ...customRatios,
                    carbs: parseInt(e.target.value) || 0
                  })}
                  min={0}
                  max={100}
                />
              </div>
              <div className="input-group">
                <label>Fat %</label>
                <input
                  type="number"
                  value={customRatios.fat}
                  onChange={(e) => onCustomRatiosChange({
                    ...customRatios,
                    fat: parseInt(e.target.value) || 0
                  })}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MacroPresetSelector;
