import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import "../App.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="intro-box">
        <h1>TrackBite</h1>
        <p>Track What You Eat, Transform How You Feel</p>
      </div>

      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Please sign in to continue.</p>

        {/* Show these buttons only when the user is not authenticated */}
        <SignInButton>
          <button className="auth-button">Sign In</button>
        </SignInButton>

        <div className="sign-up-container">
          <p>Don't have an account?</p>

          <SignUpButton>
            <button className="auth-button">Sign Up</button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default Landing;
