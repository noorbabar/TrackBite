import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import UserProfile from './components/UserProfile';
import AddCalories from './components/AddCalories';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import Progress from './components/Progress';
import Learn from './components/Learn';

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
        <button onClick={() => handleNavigate('/learn')}>TrackLearn</button>
      </nav>
    </header>
  );
}


function App() {
  const isAuthenticated = Boolean(localStorage.getItem('authToken')); 

  return (
    <Router>
      <div>
        <Header />
        {isAuthenticated ? (
          <h3>Welcome Back</h3>
        ) : (
          <h3></h3>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Landing />} /> {/* Route for Dashboard */}
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
