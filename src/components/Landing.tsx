import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import "../LandingPage.css";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <nav className="top-nav">
        <div className="logo-section">
          <img src="/TrackBiteLogo.png" alt="ProgressPlate Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#macro">Macro Plans</a>
          <a href="#cycle">Cycle Sync</a>
          <a href="#learn">Learn</a>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className="landing-page">
        <div className="hero-icon">
          <div className="hero-icon-container">
            <img src="/TrackBiteLogo.png" alt="ProgressPlate" className="hero-logo-image" />
          </div>
        </div>

        <h1 className="tagline">Wellness Companion</h1>

        <div className="auth-card">
          <h2>Get Started!</h2>
          <p className="terms">
            By signing up, you agree to our Terms of Service & Privacy Policy
          </p>

          <SignUpButton mode="modal">
            <button className="signup-btn">Sign Up</button>
          </SignUpButton>

          <div className="divider-container">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          <p className="login-prompt">Already Have an account?</p>

          <SignInButton mode="modal">
            <button className="login-btn">Log In</button>
          </SignInButton>
        </div>

        <div className="left-illustration">
          <div className="illustration-cards">
            <div className="card-icon">
              <img src="/logo1.png" alt="Icon 1" className="illustration-icon-image" />
            </div>
            <div className="card-icon">
              <img src="/logo2.png" alt="Icon 2" className="illustration-icon-image" />
            </div>
          </div>
        </div>
      </div>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} TrackBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;