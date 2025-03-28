// src/components/AddCalorie.tsx
import React, { useState } from 'react';
import { addCalorie } from '../services/api';

const AddCalorie: React.FC = () => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCalorie = await addCalorie(name, calories);
    if (newCalorie) {
      setName('');
      setCalories(0);
      alert('Calorie added!');
    }
  };

  return (
    <div>
      <h2>Add Calorie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food Name"
          required
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          placeholder="Calories"
          required
        />
        <button type="submit">Add Calorie</button>
      </form>
    </div>
  );
};

export default AddCalorie;
