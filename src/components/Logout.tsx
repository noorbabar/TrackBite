import { useAuth } from '@clerk/clerk-react';

export const Logout = () => {
  const { signOut } = useAuth();  // Get the signOut function from Clerk's useAuth hook

  const handleSignOut = () => {
    signOut();  // Trigger sign-out action
  };

  return <button onClick={handleSignOut}>Log Out</button>;
};
