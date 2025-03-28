import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div>
      <h2>Welcome to TrackBite</h2>
      <p>Please sign in to continue.</p>
            <SignIn />
            <div>
        <p>Don't have an account? <a href="/sign-in">Sign Up</a></p>
      </div>
    </div>
  );
}
