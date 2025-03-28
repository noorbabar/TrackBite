// src/components/CalorieList.tsx
import React, { useEffect, useState } from 'react';
import { getCalories } from '../services/api';

const CalorieList: React.FC = () => {
  const [calories, setCalories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCalories = async () => {
      const data = await getCalories();
      setCalories(data);
    };
    fetchCalories();
  }, []);

  return (
    <div>
      <h2>Calorie List</h2>
      <ul>
        {calories.map((calorie) => (
          <li key={calorie._id}>{calorie.name}: {calorie.calories} kcal</li>
        ))}
      </ul>
    </div>
  );
};

export default CalorieList;
