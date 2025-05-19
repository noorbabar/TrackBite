import { useState, useEffect } from 'react';
import ProfileSetup from './ProfileSetup';
import '../App.css';
import { useUser, useAuth } from "@clerk/clerk-react";
import '../App.css';
import LogWeight from './LogWeight';
import { ProfileData, UserStats, fetchUserProfile, saveUserProfile, logWeight } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded: isUserLoaded } = useUser();
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const [currentDate] = useState(new Date());
  const navigate = useNavigate();

  const quotes = [
    "The only bad workout is the one that didn't happen.",
    "Push yourself because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "Don't limit your challenges, challenge your limits.",
    "Strive for progress, not perfection.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "The difference between try and triumph is just a little umph!",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "Take care of your body. It's the only place you have to live.",
    "The only way to define your limits is by going beyond them.",
  ];
  
  function getQuoteOfTheDay() {
    const day = new Date().getDate(); 
    return quotes[day % quotes.length]; 
  }

  useEffect(() => {
    if (!isUserLoaded || !user) return;

    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const clerkUserId = user?.id;
        const token = await getToken();

        if (!clerkUserId || !token) {
          console.warn("No user logged in or token available");
          const emptyProfile = {
            userId: clerkUserId || 'anonymous',
            stats: {
              weight: null,
              goalWeight: null,
              age: null,
              height: null,
              activityLevel: 'Sedentary' as "Sedentary",
              gender: 'male' as "male",
              recommendedCalories: null,
              estimatedDuration: null,
              goalCategory: 'maintenance' as "maintenance",
              goalRate: 'moderate' as "moderate",
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

        if (user?.id) {
          const emptyProfile = {
            userId: user.id,
            stats: {
              weight: null,
              goalWeight: null,
              age: null,
              height: null,
              activityLevel: 'Sedentary' as "Sedentary",
              gender: 'male' as "male",
              recommendedCalories: null,
              estimatedDuration: null,
              goalCategory: 'maintenance' as "maintenance",
              goalRate: 'moderate' as "moderate",
              lastUpdated: null
            }
          };
          setProfileData(emptyProfile);
          setError(null);
        } else {
          setError('Unable to load profile. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [isUserLoaded, user, getToken]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openWeightModal = () => setIsWeightModalOpen(true);
  const closeWeightModal = () => setIsWeightModalOpen(false);

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

      const token = await getToken();

      if (!token) {
        console.error('No token found');
        setError('Authentication error. Please sign in again.');
        return;
      }

      const savedProfile = await saveUserProfile(user.id, updatedProfileData, token);
      setProfileData(savedProfile);

      console.log("Profile saved successfully:", savedProfile);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Changes saved locally but server sync failed.');
    }
  };

  const handleWeightLog = async (newWeight: number, date: Date) => {
    if (!user?.id) {
      setError("No user logged in");
      return;
    }

    try {
      setError(null);
      const token = await getToken();

      if (!token) {
        console.error('No token found');
        setError('Authentication error. Please sign in again.');
        return;
      }

      // Log the weight entry
      await logWeight(user.id, newWeight, date, token);
      
      // Update the user's current weight in their profile
      if (profileData && profileData.stats) {
        const updatedStats = {
          ...profileData.stats,
          weight: newWeight,
          lastUpdated: new Date()
        };
        
        await saveUserStats(updatedStats);
      }
      
      closeWeightModal();
    } catch (err) {
      console.error('Error logging weight:', err);
      setError('Failed to log weight. Please try again.');
    }
  };
  
  const getGoalDisplayText = (profileData: ProfileData) => {
    const { stats } = profileData;

    if (!stats) return 'Not set';

    const rateText =
      stats.goalRate === 'mild' ? '0.25 kg/week' :
      stats.goalRate === 'moderate' ? '0.5 kg/week' :
      '1 kg/week';

    if (stats.goalCategory === 'maintenance') {
      return 'Maintenance';
    } else if (stats.goalCategory === 'loss') {
      return `Weight Loss (${rateText})`;
    } else {
      return `Weight Gain (${rateText})`;
    }
  };
  
  const calculateProgress = () => {
    if (!profileData?.stats?.weight || !profileData?.stats?.goalWeight) return 0;
    
    const startWeight = profileData.stats.weight;
    const goalWeight = profileData.stats.goalWeight;
    
    // If goal is to lose weight
    if (startWeight > goalWeight) {
      return Math.min(Math.max(0, ((startWeight - startWeight) / (goalWeight - startWeight)) * 100), 100);
    } 
    // If goal is to gain weight
    else if (startWeight < goalWeight) {
      return Math.min(Math.max(0, ((startWeight - startWeight) / (goalWeight - startWeight)) * 100), 100);
    }
    return 100;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };
  
  const progressPercentage = profileData?.stats ? calculateProgress() : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">TrackBite</h1>
      </div>

      <p className="dashboard-welcome">
        Welcome to TrackBite
        {user?.firstName
          ? `, ${user.firstName}`
          : user?.fullName
          ? `, ${user.fullName}`
          : user?.emailAddresses?.[0]?.emailAddress
          ? `, ${user.emailAddresses[0].emailAddress.split('@')[0]}`
          : ''}
        ! Your personal fitness journey starts here. Track your progress, set goals, and achieve the health you deserve.
      </p>

      <div className="quote-container">
        <p className="quote-of-the-day">{getQuoteOfTheDay()}</p>
      </div>

      {loading ? (
        <div>
          <div className="loading-pulse" style={{ width: '60%' }}></div>
          <div className="loading-pulse" style={{ width: '80%' }}></div>
          <div className="loading-pulse" style={{ width: '40%' }}></div>
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}

          <div className="dashboard-actions">
            <button onClick={openModal} className="dash-button">
              {profileData?.stats?.weight ? 'Update Profile' : 'Set Up Your Profile'}
            </button>
            
            {profileData?.stats?.weight && (
              <button className="dash-button-secondary">
                Log Today's Activity
              </button>
            )}
          </div>

          <div className="dashboard-content">
            {profileData && profileData.stats && profileData.stats.weight ? (
              <>
                <div className="card">
                  <h3>Your Stats</h3>
                  <div className="stats-grid">
                    {profileData.stats.weight && (
                      <p><strong>Current Weight:</strong> {profileData.stats.weight} kg</p>
                    )}
                    {profileData.stats.goalWeight && (
                      <p><strong>Goal Weight:</strong> {profileData.stats.goalWeight} kg</p>
                    )}
                    {profileData.stats.height && (
                      <p><strong>Height:</strong> {profileData.stats.height} cm</p>
                    )}
                    {profileData.stats.age && (
                      <p><strong>Age:</strong> {profileData.stats.age}</p>
                    )}
                    {profileData.stats.gender && (
                      <p><strong>Gender:</strong> {profileData.stats.gender}</p>
                    )}
                    {profileData.stats.activityLevel && (
                      <p><strong>Activity Level:</strong> {profileData.stats.activityLevel}</p>
                    )}
                  </div>
                  
                  {profileData.stats.recommendedCalories && (
                    <div className="stat-highlight">
                      <span className="stat-label">Daily Calorie Target</span>
                      <strong>{profileData.stats.recommendedCalories.toFixed(0)} kcal</strong>
                    </div>
                  )}
                  
                  {profileData.stats.lastUpdated && (
                    <p className="last-updated">Last updated: {new Date(profileData.stats.lastUpdated).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="card">
                  <h3>Your Goal Journey</h3>
                  <p><strong>Goal:</strong> {getGoalDisplayText(profileData)}</p>
                  
                  {(profileData.stats.goalCategory === 'loss' || profileData.stats.goalCategory === 'gain') && 
                    profileData.stats.goalWeight && profileData.stats.weight && (
                    <div className="progress-section">
                      <p><strong>Progress Towards Goal:</strong></p>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                      <div className="progress-labels">
                        <span>Start: {profileData.stats.weight} kg</span>
                        <span>Goal: {profileData.stats.goalWeight} kg</span>
                      </div>
                    </div>
                  )}
                  
                  {(profileData.stats.goalCategory === 'loss' || profileData.stats.goalCategory === 'gain') &&
                    profileData.stats.estimatedDuration && (
                    <div className="stat-highlight">
                      <span className="stat-label">Estimated Time to Goal</span>
                      <strong>{profileData.stats.estimatedDuration} weeks</strong>
                    </div>
                  )}
                  
                  <div className="quick-actions">
                  <button className="quick-action-button" onClick={openWeightModal}>Log Weight</button>
                  <button className="quick-action-button" onClick={() => navigate('/add-calories')}>Log Food</button>
                  <button className="quick-action-button">Track Workout</button>
                  </div>
                </div>
                
                <div className="card">
                  <h3>Health Recommendations</h3>
                  {profileData.stats.weight && profileData.stats.height && (
                    <p>
                      <strong>BMI:</strong> {(profileData.stats.weight / ((profileData.stats.height/100) * (profileData.stats.height/100))).toFixed(1)}
                    </p>
                  )}
                  <p><strong>Water:</strong> Aim for 8-10 glasses of water daily to stay hydrated and support your metabolism.</p>
                  <p><strong>Sleep:</strong> Try to get 7-9 hours of sleep each night for optimal recovery and health.</p>
                  <p><strong>Protein:</strong> For your goals, aim for 1.6-2.2g of protein per kg of body weight daily.</p>
                </div>
                
                <div className="card">
                  <h3>Today at a Glance</h3>
                  <p><strong>Date:</strong> {formatDate(currentDate)}</p>
                  
                  {profileData.stats.recommendedCalories && (
                    <>
                      <div className="progress-section">
                        <p><strong>Daily Calories:</strong></p>
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: '0%' }}></div>
                        </div>
                        <div className="progress-labels">
                          <span>0 kcal</span>
                          <span>{profileData.stats.recommendedCalories.toFixed(0)} kcal</span>
                        </div>
                      </div>
                      
                      <p className="last-updated">Track your first meal of the day to start logging</p>
                      
                      <button className="dash-button-secondary" onClick={() => navigate('/add-calories')}>Track Breakfast</button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="card" style={{ gridColumn: "span 2" }}>
                <h3>Welcome to TrackBite!</h3>
                <p>
                  Get started on your fitness journey by setting up your profile. We'll help you track your progress
                  and provide personalised recommendations to reach your health goals.
                </p>
                <p>
                  With TrackBite, you can:
                </p>
                <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                  <li>Track your daily nutrition and calories</li>
                  <li>Monitor your weight and body measurements</li>
                  <li>Log your workouts and physical activities</li>
                  <li>Set personalised goals and track your progress</li>
                  <li>Get customised recommendations based on your profile</li>
                </ul>
                <button onClick={openModal} className="dash-button" style={{ marginTop: "16px" }}>
                  Set Up Your Profile
                </button>
              </div>
            )}
          </div>

          {isModalOpen && (
            <ProfileSetup
              closeModal={closeModal}
              onSaveStats={saveUserStats}
              initialStats={profileData?.stats}
            />
          )}
          
          {isWeightModalOpen && (
            <LogWeight
              closeModal={closeWeightModal}
              onSaveWeight={handleWeightLog}
              currentWeight={profileData?.stats?.weight || 0}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;