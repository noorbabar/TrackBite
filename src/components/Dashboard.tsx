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
    if (!isUserLoaded) return;
    
    const loadUserProfile = async () => {
      console.log("Loading profile for:", user?.id);
      try {
        setLoading(true);
        setError(null);
        
        const clerkUserId = user?.id;
        const token = await getToken();
        console.log("Token:", token);

        
        if (!clerkUserId || !token) {
          setError("No user logged in");
          setLoading(false);
          return;
        }
        
        const profile = await fetchUserProfile(clerkUserId, token);
        console.log("Fetched profile:", profile);

        setProfileData(profile);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
        
        const storedProfile = localStorage.getItem('profileData');
        if (storedProfile) {
          try {
            const parsedData = JSON.parse(storedProfile);
            if (!parsedData.stats) {
              parsedData.stats = {
                recommendedCalories: null,
                estimatedDuration: null,
                goalCategory: 'maintenance',
                goalRate: 'moderate',
                lastUpdated: null
              };
            }
            setProfileData(parsedData);
          } catch (parseErr) {
            console.error('Error parsing profile data:', parseErr);
          }
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (isUserLoaded) {
      loadUserProfile();
    }
  }, [isUserLoaded, user, getToken]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  // Updated function to save user stats to both backend and localStorage
  const saveUserStats = async (stats: UserStats) => {
    if (!user?.id) {
      setError("No user logged in");
      return;
    }
    
    if (profileData) {
      const updatedProfileData = {
        ...profileData,
        stats: {
          ...stats,
          lastUpdated: new Date() 
        }
      };
      
      try {
        // Save to backend - need to fix so it uses clerk
        const token = await getToken(); 
        
        if (!token) {
          console.error('No token found');
          return;
        }
        
        await saveUserProfile(user.id, updatedProfileData, token);
        setProfileData(updatedProfileData);
        
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
      } catch (err) {
        console.error('Error saving to backend:', err);
        setProfileData(updatedProfileData);
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
        setError('Changes saved locally but failed to sync with server');
      }
    }
  };

  const getGoalDisplayText = (profileData: ProfileData) => {
    const { stats } = profileData;
    
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
            {profileData ? 'Edit Profile' : 'Set Up Your Profile'}
          </button>

          {profileData && (
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