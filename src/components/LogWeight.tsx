import { useState } from 'react';
import '../App.css';
import React from 'react';

interface LogWeightProps {
  closeModal: () => void;
  onSaveWeight: (weight: number, date: Date) => void;
  currentWeight: number;
}

const LogWeight = ({ closeModal, onSaveWeight, currentWeight }: LogWeightProps) => {
  const [weight, setWeight] = useState<number>(currentWeight || 0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || weight <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    
    onSaveWeight(weight, new Date(date));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Log Weight</h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight || ''}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              step="0.1"
              min="20"
              max="300"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Save Weight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogWeight;