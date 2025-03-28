import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch user data from your newly created API
    const fetchUserData = async () => {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Assuming the user data is returned in the 'user' field
      } else {
        console.error('Unauthorized');
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
