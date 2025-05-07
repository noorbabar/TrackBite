// backend/controllers/userController.ts
import { Request, Response } from 'express';
import UserModel from '../models/user';

interface UserRequest extends Request {
  userId?: string;
}

export const getProfile = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId || req.params.userId;
    
    if (!userId) {
      res.status(401).json({ message: 'User ID not found' });
      return;
    }

    // Find user by ID or Clerk ID
    const user = await UserModel.findOne({ 
      $or: [
        { _id: userId },
        { clerkId: userId }
      ]
    });

    if (!user) {
      res.status(404).json({ 
        message: 'User not found',
        userId
      });
      return;
    }

    // Return user profile data
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      stats: user.stats || {},
      waterRecommendation: user.waterRecommendation,
      sleepRecommendation: user.sleepRecommendation
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveProfile = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId || req.params.userId;
    const profileData = req.body;
    
    if (!userId) {
      res.status(401).json({ message: 'User ID not found' });
      return;
    }

    // Find user by ID or Clerk ID
    let user = await UserModel.findOne({
      $or: [
        { _id: userId },
        { clerkId: userId }
      ]
    });

    if (!user) {
      // Create new user if not found
      user = new UserModel({
        clerkId: userId,
        name: profileData.name || 'User',
        email: profileData.email || '',
        stats: profileData.stats || {},
        waterRecommendation: profileData.waterRecommendation,
        sleepRecommendation: profileData.sleepRecommendation
      });
    } else {
      // Update existing user
      user.stats = profileData.stats || user.stats;
      user.waterRecommendation = profileData.waterRecommendation;
      user.sleepRecommendation = profileData.sleepRecommendation;
      if (profileData.name) user.name = profileData.name;
      if (profileData.email) user.email = profileData.email;
    }

    await user.save();

    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      stats: user.stats,
      waterRecommendation: user.waterRecommendation,
      sleepRecommendation: user.sleepRecommendation
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}