// src/services/api.ts

// Define the types for profile data
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

const API_URL = 'track-bite.vercel.app' || 'http://localhost:5173/';

/**
 * Fetch user profile from the backend, with fallback to localStorage
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
  // Always update local storage first for immediate feedback
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
    // Return the locally saved data since that was successful
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
    
    // Ensure stats object exists and has all required fields
    if (!profileData.stats) {
      profileData.stats = createEmptyStats();
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