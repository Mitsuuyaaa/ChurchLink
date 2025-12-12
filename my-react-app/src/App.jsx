import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoadingScreen from "./pages/LoadingScreen";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import Activities from "./pages/Activities";
import Ministry from "./pages/Ministry";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function AppInner() {
  const { token, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");

  // If user is logged in and tries to access login/register, redirect to dashboard
  const AuthRedirect = ({ children }) => {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="flex min-h-screen">
      {/* Only show sidebar when logged in */}
      {token && (
        <Sidebar
          status={!!token}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={logout}
        />
      )}

      <main className={`flex-1 ${token ? 'bg-gray-100 p-6' : ''}`}>
        <Routes>
          {/* Public Routes - redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRedirect>
                <Register />
              </AuthRedirect>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ministries"
            element={
              <ProtectedRoute>
                <Ministry />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}