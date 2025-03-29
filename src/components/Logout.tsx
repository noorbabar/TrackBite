import { useAuth } from '@clerk/clerk-react';

export const Logout = () => {
  const { signOut } = useAuth();  

  const handleSignOut = () => {
    signOut();  
  };

  return <button className="logout-button" onClick={handleSignOut}>Log Out</button>;
};
