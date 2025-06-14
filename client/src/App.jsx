import {
  SignUp,
  useUser,
} from "@clerk/clerk-react";

import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/DashboardLayout";
import API from "./api";
import { useEffect, useState } from "react";

// Role-based redirect component
const RoleRedirect = () => {
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (
      isSignedIn &&
      user?.id &&
      user?.fullName &&
      user?.primaryEmailAddress?.emailAddress
    ) {
      console.log("Syncing user to backend...");
      API
        .post("/auth/sync-user", {
          clerkId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        })
        .then((res) => {
          // console.log("Synced user role:", res.data.role);
          setRole(res.data.role);
        })
        .catch((err) => {
          console.error("Error syncing user:", err.message);
        });
    }
  }, [isSignedIn, user]);

  if (!isSignedIn || !role) return <div> Loading...</div>;

  return role === "admin" ? (
    <Navigate to="/admin-dashboard" />
  ) : (
    <Navigate to="/student-dashboard" />
  );
};

// Protect routes component
const RequireAuth = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    console.warn("Not signed in. Redirecting to /");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

// Main App
function App() {
  return (
    <Routes>
      {/* Clerk Auth */}
      <Route path="/sign-up/*" element={<SignUp redirectUrl="/dashboard" />} />

      {/* Public Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />

      {/* Redirect to dashboard after login */}
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Protected Routes with Layout */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
