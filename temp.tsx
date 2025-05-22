import React from 'react';
import { MacroPresetType } from './types';
import { MACRO_PRESETS } from './MacroPresets';

interface MacroPresetSelectorProps {
  selectedPreset: MacroPresetType;
  onPresetChange: (preset: MacroPresetType) => void;
  customRatios?: { protein: number; carbs: number; fat: number };
  onCustomRatiosChange?: (ratios: { protein: number; carbs: number; fat: number }) => void;
}

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
        {Object.entries(MACRO_PRESETS).map(([key, preset]) => (
          <div 
            key={key}
            className={`preset-card ${selectedPreset === key ? 'selected' : ''}`}
            onClick={() => onPresetChange(key as MacroPresetType)}
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
                  min="0"
                  max="100"
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
                  min="0"
                  max="100"
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
                  min="0"
                  max="100"
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