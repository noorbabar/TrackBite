// src/services/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/calories';  

export const getCalories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching calories:', error);
    return [];
  }
};

// Add a new calorie entry
export const addCalorie = async (name: string, calories: number) => {
  try {
    const response = await axios.post(BASE_URL + '/add', { name, calories });
    return response.data; 
  } catch (error) {
    console.error('Error adding calorie:', error);
    return null;  
  }
};
