import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserManagement from "./pages/MemberManagement";
import Profile from "./pages/Profile";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

  // Simple auth simulation
  const handleLogin = (username, password) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="flex min-h-screen">
                <Sidebar toggle={toggleSidebar} />
                <div className="flex-1 flex flex-col">
                  <Header onLogout={handleLogout} />
                  <div className="p-6 flex-1 overflow-auto">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="home" element={<Home />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="profile" element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
