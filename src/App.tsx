import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useAuth } from '@clerk/clerk-react';  
import UserProfile from './components/UserProfile';
import AddCalories from './components/AddCalories';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import Progress from './components/Progress';
import Learn from './components/Learn';
import { Logout } from './components/Logout'; 


function Header() {
  const navigate = useNavigate();
  const auth = useAuth(); 
  const isAuthenticated = auth.isSignedIn; 

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
       <header className="flex items-center p-4 bg-white shadow-md">
       <img src="/public/TrackBiteLogo.png" alt="TrackBite Logo" className="w-16 h-16 object-contain mr-3" />      
      <nav>
        <button onClick={() => handleNavigate('/')}>Dashboard</button>
        <button onClick={() => handleNavigate('/add-calories')}>Meal Log</button>
        <button onClick={() => handleNavigate('/progress')}>Progress</button>
        <button onClick={() => handleNavigate('/learn')}>TrackLearn</button>
      </nav>
      {isAuthenticated && <Logout />}  {/* Show LogOut button only if authenticated */}
    </header>
  );
}

function App() {
  const auth = useAuth();  
  const isAuthenticated = auth.isSignedIn; 

  return (
    <Router>
      <div>
        <Header />
        {/* Display Welcome Message if user is authenticated */}
        {isAuthenticated ? (
          <h3></h3>
        ) : (
          <h3>Please Sign In</h3>
        )}

        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Landing />} />
          <Route path="/add-calories" element={isAuthenticated ? <AddCalories /> : <Landing />} />
          <Route path="/progress" element={isAuthenticated ? <Progress /> : <Landing />} />
          <Route path="/user-profile" element={isAuthenticated ? <UserProfile /> : <Landing />} />
          <Route path="/learn" element={isAuthenticated ? <Learn /> : <Learn />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
