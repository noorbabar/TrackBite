import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import UserProfile from './components/UserProfile';
import AddCalories from './components/AddCalories';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Header() {
  const navigate = useNavigate(); 

  const handleNavigate = (path: string) => {
    navigate(path); 
  };

  return (
    <header>
      <nav>
        <button onClick={() => handleNavigate('/')}>Dashboard</button>
        <button onClick={() => handleNavigate('/add-calories')}>Meal Log</button>
        <button onClick={() => handleNavigate('/progress')}>Progress</button>
        <button onClick={() => handleNavigate('/settings')}>Settings</button>
      </nav>
    </header>
  );
}

const GOOGLE_CLIENT_ID = '893157872726-juue9tu2sa5jau375j3b5sgukggk96sp.apps.googleusercontent.com'; 

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); 

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
      <div>
        {/* Header with Buttons */}
        <Header />

        {/* Display welcome message if authenticated */}
        {isAuthenticated ? (
          <h3>Welcome Back</h3>
        ) : (
          <h3>Log in to your TrackBite Account</h3>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Landing />} /> {/* Route for Dashboard */}
          <Route path="/add-calories" element={isAuthenticated ? <AddCalories /> : <Landing />} />
          <Route path="/user-profile" element={isAuthenticated ? <UserProfile /> : <Landing />} />
          <Route path="/landing" element={<Landing />} /> {/* Route for login/landing page */}
        </Routes>
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
