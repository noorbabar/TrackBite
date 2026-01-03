import { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import ProfileSetup from './ProfileSetup';
import { ProfileData, UserStats, fetchUserProfile, saveUserProfile } from '../services/api';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoaded || !user) return;
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          setProfileData({ userId: user.id, stats: createEmptyStats() });
          setLoading(false);
          return;
        }
        const profile = await fetchUserProfile(user.id, token);
        setProfileData(profile);
      } catch (err) {
        if (user?.id) setProfileData({ userId: user.id, stats: createEmptyStats() });
      } finally {
        setLoading(false);
      }
    };
    loadUserProfile();
  }, [isUserLoaded, user, getToken]);

  const createEmptyStats = (): UserStats => ({
    weight: null, goalWeight: null, age: null, height: null,
    activityLevel: 'Sedentary' as const, gender: 'male' as const,
    recommendedCalories: null, estimatedDuration: null,
    goalCategory: 'maintenance' as const, goalRate: 'moderate' as const,
    lastUpdated: null
  });

  const saveUserStats = async (stats: UserStats) => {
    if (!user?.id) return;
    try {
      const token = await getToken();
      if (!token) return;
      const savedProfile = await saveUserProfile(user.id, { userId: user.id, stats: { ...stats, lastUpdated: new Date() } }, token);
      setProfileData(savedProfile);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>Loading...</div>;

  const hasProfile = profileData?.stats?.weight;

  if (!hasProfile) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Welcome to ProgressPlate</h1>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Set up your profile to get personalized macro targets and meal plans
          </p>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Set Up Profile</button>
        </div>
        {isModalOpen && <ProfileSetup closeModal={() => setIsModalOpen(false)} onSaveStats={saveUserStats} initialStats={profileData?.stats} />}
      </div>
    );
  }

  const cals = profileData.stats.recommendedCalories || 0;
  const weight = profileData.stats.weight || 70;
  const goal = profileData.stats.goalCategory || 'maintenance';
  
  // Calculate macros based on goal
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  
  if (goal === 'gain' || goal === 'loss') {
    // 2g protein per kg for muscle gain or fat loss
    protein = weight * 2;
    const proteinCals = protein * 4;
    
    // Minimum fat for hormones: 0.8g per kg (20-25% of remaining)
    fat = Math.max(weight * 0.8, ((cals - proteinCals) * 0.25) / 9);
    const fatCals = fat * 9;
    
    // Rest goes to carbs
    const carbCals = Math.max(0, cals - proteinCals - fatCals);
    carbs = carbCals / 4;
  } else {
    // Maintenance: balanced split
    protein = (cals * 0.30) / 4;
    carbs = (cals * 0.40) / 4;
    fat = (cals * 0.30) / 9;
  }
  
  const proteinFormatted = protein.toFixed(0);
  const carbsFormatted = carbs.toFixed(0);
  const fatFormatted = fat.toFixed(0);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', flex: 1 }}>
          <div><div style={{ fontSize: '0.75rem', color: '#666' }}>CALORIES</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{cals.toFixed(0)}</div></div>
          <div><div style={{ fontSize: '0.75rem', color: '#666' }}>PROTEIN</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{proteinFormatted}g</div></div>
          <div><div style={{ fontSize: '0.75rem', color: '#666' }}>CARBS</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{carbsFormatted}g</div></div>
          <div><div style={{ fontSize: '0.75rem', color: '#666' }}>FAT</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{fatFormatted}g</div></div>
        </div>
        <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }} onClick={() => setIsModalOpen(true)}>Edit</button>
      </div>

      <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>What to Do Next</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="card" onClick={() => navigate('/macro-plans')} style={{ cursor: 'pointer' }}>
          <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Build Your Meal Plan</h3>
          <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5', marginBottom: '0.75rem' }}>Answer questions and get a custom plan</p>
          <div style={{ fontSize: '0.8125rem', color: '#81c784', fontWeight: '500' }}>Start →</div>
        </div>

        <div className="card" onClick={() => navigate('/learn')} style={{ cursor: 'pointer' }}>
          <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Learn the Basics</h3>
          <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5', marginBottom: '0.75rem' }}>Understand macros and nutrition</p>
          <div style={{ fontSize: '0.8125rem', color: '#81c784', fontWeight: '500' }}>Learn →</div>
        </div>

        <div className="card" onClick={() => navigate('/cycle-sync')} style={{ cursor: 'pointer', borderStyle: 'dashed' }}>
          <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Cycle Sync <span style={{ fontSize: '0.75rem', color: '#666' }}>(Optional)</span></h3>
          <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: '1.5', marginBottom: '0.75rem' }}>Track cycle and get training tips</p>
          <div style={{ fontSize: '0.8125rem', color: '#666', fontWeight: '500' }}>Set Up →</div>
        </div>
      </div>

      {isModalOpen && <ProfileSetup closeModal={() => setIsModalOpen(false)} onSaveStats={saveUserStats} initialStats={profileData?.stats} />}
    </div>
  );
};

export default Dashboard;