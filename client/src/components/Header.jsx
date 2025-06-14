import { SignOutButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-semibold">
        Welcome, {user?.firstName || "User"} 
      </h1>
      <SignOutButton signOutCallback={() => window.location.href = "/"} />
    </div>
  );
}
