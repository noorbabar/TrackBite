// src/components/CalorieList.tsx
import React, { useEffect, useState } from 'react';
import { getCalories, deleteCalorie, CalorieRecord } from '../services/api';

const CalorieList: React.FC = () => {
  const [calories, setCalories] = useState<CalorieRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        setLoading(true);
        const data = await getCalories();
        setCalories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load calorie data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCalories();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const success = await deleteCalorie(id);
      if (success) {
        setCalories(calories.filter(calorie => calorie._id !== id));
      } else {
        setError('Failed to delete the record');
      }
    }
  };

  if (loading) {
    return <div>Loading calorie data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="calorie-list">
      <h2>Calorie Tracker</h2>
      {calories.length === 0 ? (
        <p>No calorie records found. Add some to get started!</p>
      ) : (
        <ul>
          {calories.map((calorie) => (
            <li key={calorie._id} className="calorie-item">
              <div className="calorie-info">
                <span className="food-name">{calorie.name}</span>
                <span className="calorie-value">{calorie.calories} kcal</span>
                {calorie.date && <span className="date">{new Date(calorie.date).toLocaleDateString()}</span>}
              </div>
              <button 
                onClick={() => handleDelete(calorie._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalorieList;