import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import "../App.css";
import React from 'react';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="intro-box">
          <h1>TrackBite</h1>
          <p className="tagline">Track What You Eat, Transform How You Feel</p>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Easy meal tracking & calorie counting</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>Personalised nutrition insights</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Track progress & achieve goals</span>
            </div>
          </div>
        </div>
      
        <div className="login-box">
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Please sign in to continue your journey</p>
          </div>
          
          <div className="auth-buttons">
        {/* Show these buttons only when the user is not authenticated */}
        <SignInButton>
          <button className="sign-in-button">Sign In</button>
        </SignInButton>
            
            <div className="divider">
              <span>or</span>
            </div>
          
            <div className="auth-buttons">
          <SignUpButton>
            <button className="sign-up-button">Sign Up</button>
          </SignUpButton>     
              </div>
              </div>    

          <div className="terms">
            By signing up, you agree to our 
            <a href="#" className="link">Terms of Service</a> 
            <span>&</span>
            <a href="#" className="link">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} TrackBite. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Landing;