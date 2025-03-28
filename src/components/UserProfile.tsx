import { UserProfile } from "@clerk/clerk-react";

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <UserProfile />
    </div>
  );
}
