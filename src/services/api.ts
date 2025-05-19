// src/services/api.ts

export interface ProfileData {
  userId: string;
  stats: UserStats;
  waterRecommendation?: string;
  sleepRecommendation?: string;
}

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

const API_URL = 'http://localhost:3001';  

/**
 * Fetch user profile from the backend
 */
export const fetchUserProfile = async (userId: string, token: string): Promise<ProfileData> => {
  try {
    const response = await fetch(`${API_URL}/users/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API returned profile data:", data);
    
    // If backend returns null or incomplete data, check localStorage
    if (!data || !data.stats) {
      const localData = getLocalProfile(userId);
      if (localData) {
        console.log("Using local profile data", localData);
        return localData;
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    
    // If API call fails, try to get data from localStorage
    const localData = getLocalProfile(userId);
    if (localData) {
      console.log("Using local profile data after API error", localData);
      return localData;
    }
    
    // If no local data exists, create and return a new empty profile
    const newProfile: ProfileData = {
      userId,
      stats: createEmptyStats()
    };
    
    // Save this empty profile to localStorage
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(newProfile));
    
    return newProfile;
  }
};

/**
 * Save user profile to both backend and localStorage
 */
export const saveUserProfile = async (userId: string, profileData: ProfileData, token: string): Promise<ProfileData> => {
  saveLocalProfile(userId, profileData);
  
  try {
    // Then try to update the backend
    const response = await fetch(`${API_URL}/users/profile/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error saving profile to backend:", error);
    return profileData;
  }
};

/**
 * Get profile from localStorage
 */
function getLocalProfile(userId: string): ProfileData | null {
  const storedData = localStorage.getItem(`userProfile_${userId}`);
  if (!storedData) return null;

  try {
    const profileData = JSON.parse(storedData);
    
    if (!profileData.stats) {
      profileData.stats = createEmptyStats();
    }

    if (profileData.stats.lastUpdated) {
      profileData.stats.lastUpdated = new Date(profileData.stats.lastUpdated);
    }
    
    return profileData;
  } catch (error) {
    console.error("Error parsing stored profile:", error);
    return null;
  }
}

/**
 * Save profile to localStorage
 */
function saveLocalProfile(userId: string, profileData: ProfileData): void {
  localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData));
}

/**
 * Create empty stats object with default values
 */
function createEmptyStats(): UserStats {
  return {
    weight: null,
    goalWeight: null,
    age: null,
    height: null,
    activityLevel: 'Sedentary',
    gender: 'male',
    recommendedCalories: null,
    estimatedDuration: null,
    goalCategory: 'maintenance',
    goalRate: 'moderate',
    lastUpdated: null
  };
}

// Define a proper type for calorie records
export interface CalorieRecord {
  _id: string;
  name: string;
  calories: number;
  date?: string;
  userId?: string;
}

/**
 * Fetches all calorie records from the API
 */
export const getCalories = async (): Promise<CalorieRecord[]> => {
  try {
    const response = await fetch(`${API_URL}/calories`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch calories:', error);
    return [];
  }
};

/**
 * Adds a new calorie record
 */
export const addCalorie = async (calorieData: Omit<CalorieRecord, '_id'>): Promise<CalorieRecord | null> => {
  try {
    const response = await fetch(`${API_URL}/calories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calorieData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to add calorie record:', error);
    return null;
  }
};

/**
 * Deletes a calorie record by ID
 */
export const deleteCalorie = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/calories/${id}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to delete calorie record:', error);
    return false;
  }
};

// Required additions to ../services/api.ts

// Add these type definitions and functions to your existing api.ts file

// For weight logging
export interface WeightLogEntry {
  userId: string;
  weight: number;
  date: Date;
}

// For food logging
export interface FoodLogEntry {
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  date: Date;
}

// Log a weight entry
export const logWeight = async (
  userId: string, 
  weight: number, 
  date: Date, 
  token: string
): Promise<WeightLogEntry> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/weight-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        weight,
        date: date.toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to log weight: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging weight:', error);
    throw error;
  }
};

// Log a food entry
export const logFood = async (
  userId: string, 
  foodEntry: { 
    name: string, 
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    mealType: string,
    date: Date 
  }, 
  token: string
): Promise<FoodLogEntry> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/food-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...foodEntry,
        date: foodEntry.date.toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to log food: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging food:', error);
    throw error;
  }
};

// Fetch food logs for a specific date
export const fetchFoodLogs = async (
  userId: string,
  date: string,
  token: string
): Promise<FoodLogEntry[]> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/food-logs?date=${date}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch food logs: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching food logs:', error);
    throw error;
  }
};

// Fetch weight logs
export const fetchWeightLogs = async (
  userId: string,
  token: string,
  startDate?: string,
  endDate?: string
): Promise<WeightLogEntry[]> => {
  try {
    let url = `${API_URL}/users/${userId}/weight-logs`;
    
    // Add date range parameters if provided
    if (startDate || endDate) {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weight logs: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weight logs:', error);
    throw error;
  }
};