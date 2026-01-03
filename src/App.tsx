import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { useAuth, useUser } from '@clerk/clerk-react';  
import UserProfile from './components/UserProfile';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import Learn from './components/Learn';
import MacroPlans from './components/MacroPlans';
import CycleSync from './components/CycleSync';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth(); 
  const { user } = useUser();
  const isAuthenticated = auth.isSignedIn; 

  if (!isAuthenticated && location.pathname === '/') {
    return null;
  }

  if (location.pathname === '/landing' || location.pathname === '/sign-up' || location.pathname === '/sign-in') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/TrackBiteLogo.png" alt="ProgressPlate" className="header-logo" />
        <span className="welcome-text">
          Welcome, {user?.firstName || 'User'}!
        </span>
      </div>
      
      <nav className="header-nav">
        <button 
          onClick={() => navigate('/')} 
          className={isActive('/') ? 'nav-btn active' : 'nav-btn'}
        >
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/macro-plans')} 
          className={isActive('/macro-plans') ? 'nav-btn active' : 'nav-btn'}
        >
          Macro Plans
        </button>
        <button 
          onClick={() => navigate('/cycle-sync')} 
          className={isActive('/cycle-sync') ? 'nav-btn active' : 'nav-btn'}
        >
          Cycle Sync
        </button>
        <button 
          onClick={() => navigate('/learn')} 
          className={isActive('/learn') ? 'nav-btn active' : 'nav-btn'}
        >
          Learn
        </button>
      </nav>

      <div className="header-right">
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}

function App() {
  const auth = useAuth();  
  const isAuthenticated = auth.isSignedIn; 

  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="app-main">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Landing />} />
            <Route path="/macro-plans" element={isAuthenticated ? <MacroPlans /> : <Landing />} />
            <Route path="/cycle-sync" element={isAuthenticated ? <CycleSync /> : <Landing />} />
            <Route path="/user-profile" element={isAuthenticated ? <UserProfile /> : <Landing />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;