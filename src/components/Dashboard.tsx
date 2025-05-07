import { useState, useEffect } from 'react';
import ProfileSetup from './ProfileSetup';
import { ProfileData, UserStats, fetchUserProfile, saveUserProfile } from '../services/api';
import '../App.css';
import { useUser, useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded: isUserLoaded } = useUser();
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isUserLoaded || !user) return;
    
    const loadUserProfile = async () => {
      console.log("Loading profile for:", user?.id);
      try {
        setLoading(true);
        setError(null);
        
        const clerkUserId = user?.id;
        const token = await getToken();
        
        if (!clerkUserId || !token) {
          console.warn("No user logged in or token available");
          // Don't set error here, just create an empty profile
          const emptyProfile = {
            userId: clerkUserId || 'anonymous',
            stats: {
              weight: null,
              goalWeight: null,
              age: null,
              height: null,
              activityLevel: 'Sedentary' as const,
              gender: 'male' as const,
              recommendedCalories: null,
              estimatedDuration: null,
              goalCategory: 'maintenance' as const,
              goalRate: 'moderate' as const,
              lastUpdated: null
            }
          };
          setProfileData(emptyProfile);
          setLoading(false);
          return;
        }
        
        const profile = await fetchUserProfile(clerkUserId, token);
        console.log("Fetched profile:", profile);

        setProfileData(profile);
      } catch (err) {
        console.error('Error loading profile:', err);
        
        // Create an empty profile with the user ID rather than showing an error
        if (user?.id) {
          const emptyProfile = {
            userId: user.id,
            stats: {
              weight: null,
              goalWeight: null,
              age: null,
              height: null,
              activityLevel: 'Sedentary' as const,
              gender: 'male' as const,
              recommendedCalories: null,
              estimatedDuration: null,
              goalCategory: 'maintenance' as const,
              goalRate: 'moderate' as const,
              lastUpdated: null
            }
          };
          setProfileData(emptyProfile);
          // Don't show error for new users
          setError(null);
        } else {
          setError('Unable to load profile. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (isUserLoaded && user) {
      loadUserProfile();
    }
  }, [isUserLoaded, user, getToken]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Updated function to save user stats
  const saveUserStats = async (stats: UserStats) => {
    if (!user?.id) {
      setError("No user logged in");
      return;
    }
    
    try {
      setError(null);
      
      const updatedProfileData = {
        userId: user.id,
        stats: {
          ...stats,
          lastUpdated: new Date() 
        }
      };
      
      // Try to get a token for authentication
      const token = await getToken();
      
      if (!token) {
        console.error('No token found');
        setError('Authentication error. Please sign in again.');
        return;
      }
      
      // Save to backend and localStorage via our API service
      const savedProfile = await saveUserProfile(user.id, updatedProfileData, token);
      setProfileData(savedProfile);
      
      console.log("Profile saved successfully:", savedProfile);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Changes saved locally but server sync failed.');
    }
  };

  const getGoalDisplayText = (profileData: ProfileData) => {
    const { stats } = profileData;
    
    if (!stats) return 'Not set';
    
    if (stats.goalCategory === 'maintenance') {
      return 'Maintenance';
    } else if (stats.goalCategory === 'loss') {
      const rateText = stats.goalRate === 'mild' ? '0.25 kg/week' : 
                        stats.goalRate === 'moderate' ? '0.5 kg/week' : '1 kg/week';
      return `Weight Loss (${rateText})`;
    } else {
      const rateText = stats.goalRate === 'mild' ? '0.25 kg/week' : 
                        stats.goalRate === 'moderate' ? '0.5 kg/week' : '1 kg/week';
      return `Weight Gain (${rateText})`;
    }
  };

  return (
    <div className="card">
      <h2>Welcome to your Dashboard</h2>

      {loading ? (
        <p>Loading your profile data...</p>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          
          <button onClick={openModal} className="dash-button">
            {profileData?.stats?.weight ? 'Edit Profile' : 'Set Up Your Profile'}
          </button>

          {profileData && profileData.stats && (
            <div className="card">
              <h3>Your Stats</h3>

              {profileData.stats.weight && (
                <p><strong>Weight:</strong> {profileData.stats.weight} kg</p>
              )}

              {profileData.stats.goalWeight && (
                <p><strong>Goal Weight:</strong> {profileData.stats.goalWeight} kg</p>
              )}

              {profileData.stats.height && (
                <p><strong>Height:</strong> {profileData.stats.height} cm</p>
              )}

              {profileData.stats.age && (
                <p><strong>Age:</strong> {profileData.stats.age} </p>
              )}

              {profileData.stats.gender && (
                <p><strong>Gender:</strong> {profileData.stats.gender} </p>
              )}

              {profileData.stats.activityLevel && (
                <p><strong>Activity Level:</strong> {profileData.stats.activityLevel} </p>
              )}
              
              <p><strong>Goal:</strong> {getGoalDisplayText(profileData)}</p>

              {profileData.stats.recommendedCalories && (
                <p><strong>Daily Calorie Target:</strong> {profileData.stats.recommendedCalories.toFixed(0)} kcal</p>
              )}
              
              {(profileData.stats.goalCategory === 'loss' || profileData.stats.goalCategory === 'gain') && 
              profileData.stats.estimatedDuration && (
                <p><strong>Estimated Duration:</strong> {profileData.stats.estimatedDuration} weeks</p>
              )}
              
              {profileData.waterRecommendation && <p>{profileData.waterRecommendation}</p>}
              {profileData.sleepRecommendation && <p>{profileData.sleepRecommendation}</p>}
              
              {profileData.stats.lastUpdated && (
                <p><strong>Last Updated:</strong> {new Date(profileData.stats.lastUpdated).toLocaleDateString()}</p>
              )}
            </div>
          )}

          {isModalOpen && (
            <ProfileSetup 
              closeModal={closeModal}
              onSaveStats={saveUserStats}
              initialStats={profileData?.stats}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;