// backend/models/User.ts

import mongoose from 'mongoose';

// Define user stats schema
const userStatsSchema = new mongoose.Schema({
  weight: { type: Number, default: null },
  goalWeight: { type: Number, default: null },
  age: { type: Number, default: null },
  height: { type: Number, default: null },
  activityLevel: { 
    type: String, 
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'],
    default: 'Sedentary'
  },
  gender: { 
    type: String, 
    enum: ['male', 'female'],
    default: 'male'
  },
  recommendedCalories: { type: Number, default: null },
  estimatedDuration: { type: Number, default: null },
  goalCategory: { 
    type: String, 
    enum: ['maintenance', 'loss', 'gain'],
    default: 'maintenance'
  },
  goalRate: { 
    type: String, 
    enum: ['mild', 'moderate', 'extreme'],
    default: 'moderate'
  },
  lastUpdated: { type: Date, default: null }
});

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

export interface User {
  _id: string;
  clerkId?: string;
  name: string;
  email: string;
  password?: string;
  stats: UserStats;
  waterRecommendation?: string;
  sleepRecommendation?: string;
}

const userSchema = new mongoose.Schema<User>({
  clerkId: { type: String, index: true },
  name: String,
  email: String,
  password: String,
  stats: { type: userStatsSchema, default: () => ({}) },
  waterRecommendation: String,
  sleepRecommendation: String
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;