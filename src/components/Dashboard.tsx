import { useState, useEffect } from 'react';
import ProfileSetup from './ProfileSetup'; // Use the new component we created
import '../App.css';

// Define the UserStats type
type UserStats = {
  weight: number | null;
  goalWeight: number | null;
  age: number | null;
  height: number | null;
  activityLevel:'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  gender: 'male' | 'female';
  recommendedCalories: number | null;
  estimatedDuration: number | null;
  goalCategory: 'maintenance' | 'loss' | 'gain';
  goalRate: 'mild' | 'moderate' | 'extreme';
  lastUpdated: Date | null;
};

// Define a more comprehensive profile data type
type ProfileData = {
  weight: number;
  goalWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: string;
  stats: UserStats;
  waterRecommendation?: string;
  sleepRecommendation?: string;
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Retrieve the profile data from localStorage when the component mounts
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      try {
        const parsedData = JSON.parse(storedProfile);
        // Ensure the stats object exists in the parsed data
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
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
  }, []);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // New function to save user stats
  const saveUserStats = (stats: UserStats) => {
    // If we already have profile data, update it with the new stats
    if (profileData) {
      const updatedProfileData = {
        ...profileData,
        stats: stats
      };
      
      // Update duration in the main profile data for compatibility
      if (stats.goalCategory === 'loss' || stats.goalCategory === 'gain') {
        updatedProfileData.stats.estimatedDuration = stats.estimatedDuration;
      }

      // Save to state
      setProfileData(updatedProfileData);
      
      // Save to localStorage
      localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
    }
  };

  // Helper function to get goal display text
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

           {/* Display the new recommended calories */}
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

          {/* Display the new recommended calories */}
          {profileData.stats.recommendedCalories && (
            <p><strong>Daily Calorie Target:</strong> {profileData.stats.recommendedCalories.toFixed(0)} kcal</p>
          )}
          
          {/* Show duration for weight loss or gain goals */}
          {(profileData.stats.goalCategory === 'loss' || profileData.stats.goalCategory === 'gain') && 
           profileData.stats.estimatedDuration && (
            <p><strong>Estimated Duration:</strong> {profileData.stats.estimatedDuration} weeks</p>
          )}
          
          {/* Keep existing recommendations */}
          {profileData.waterRecommendation && <p>{profileData.waterRecommendation}</p>}
          {profileData.sleepRecommendation && <p>{profileData.sleepRecommendation}</p>}
          
          {/* Show last updated time if available */}
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
    </div>
  );
};

export default Dashboard;