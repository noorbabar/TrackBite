import { useState, useEffect } from 'react';
import ProfileSetupModal from './ProfileSetup';
import '../App.css'; 

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileSet, setProfileSet] = useState<boolean>(false); 

  useEffect(() => {
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
      setProfileSet(true);  
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProfileSet(true); 
  };

  return (
      <div className="card">
      <h2>Welcome to your Dashboard</h2>

      <p>
        We’re thrilled to have you on TrackBite! By setting up your profile, you're taking the first step toward a healthier, more empowered you. This personalized setup will help you stay on track with research-backed recommendations that support your wellness goals. If you have any questions along the way, TrackLearn is here to guide you. Let's get started and make your wellness journey a success!
      </p>

      <button onClick={openModal} className="dash-button">Set Up Your Profile</button>

      {profileSet && (
        <div className="card">
          <h3>Wellness Tips</h3>
          <ul>
            <li>Drink plenty of water throughout the day!</li>
            <li>Try to get at least 7-8 hours of sleep each night.</li>
            <li>Incorporate more vegetables into your meals for better health.</li>
          </ul>
        </div>
      )}

      <div className="card">
        <h3>Explore More</h3>
        <button onClick={() => window.location.href = '/add-calories'} className="dash-button">Log Your Meals</button>
        <button onClick={() => window.location.href = '/progress'} className="dash-button">Track Your Progress</button>
        <button onClick={() => window.location.href = '/learn'} className="dash-button">Visit TrackLearn</button>
      </div>

      <p>Remember: Small changes lead to big results over time!</p>

      {isModalOpen && <ProfileSetupModal closeModal={closeModal} />}
    </div>
  );
};

export default Dashboard;
