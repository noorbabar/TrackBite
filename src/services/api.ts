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

// src/services/api.ts

const API_URL = 'http://localhost:5000/api'; 

export interface UserStats {
  weight: number | null;
  goalWeight: number | null;
  age: number | null;
  height: number | null;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  gender: 'male' | 'female';
  recommendedCalories: number | null;
  estimatedDuration: number | null;
  goalCategory: 'maintenance' | 'loss' | 'gain';
  goalRate: 'mild' | 'moderate' | 'extreme';
  lastUpdated: Date | null;
}

export interface ProfileData {
  weight: number;
  goalWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: string;
  stats: UserStats;
  waterRecommendation?: string;
  sleepRecommendation?: string;
}

// Get user profile from the backend
export const fetchUserProfile = async (
  userId: string,
  token: string
): Promise<ProfileData> => {
  const response = await fetch(`${API_URL}/users/${userId}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return await response.json();
};


export const saveUserProfile = async (
  userId: string,
  profileData: ProfileData,
  token: string
): Promise<ProfileData> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error('Failed to save user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const updateUserStats = async (
  userId: string,
  stats: UserStats,
  token: string
): Promise<UserStats> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/stats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(stats)
    });

    if (!response.ok) {
      throw new Error('Failed to update user stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
};
