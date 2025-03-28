import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import "../App.css"

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleGoogleLogin = async (response: any) => {
    const token = response.credential;
    const res = await fetch('http://localhost:5000/api/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } else {
      alert('Google login failed');
    }
  };

  return (
    <div className="landing-container">
      <div className="login-box">
        <h2>Welcome to TrackBite</h2>
        <p>Please sign in to continue.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="google-login-container">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert('Google Login Failed')} />
        </div>

        <div>
          <p>Don't have an account? <a href="/sign-in">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
