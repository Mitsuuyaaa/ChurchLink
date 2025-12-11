import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Ministries from "./pages/Ministries";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import LoadingScreen from "./pages/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";  // Assuming your ProtectedRoute component
import { useAuth } from "./context/AuthContext";  // Assuming your useAuth hook provides auth context

export default function App() {
  const { token, setToken } = useAuth();  // Accessing token from context
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);

  // Handle login functionality
  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      alert("Invalid username or password");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToken("sample-token");  // Save the token (e.g., in context or localStorage)
      localStorage.setItem("token", "sample-token");  // Optionally use localStorage
    }, 1500);
  };

  // Handle registration functionality
  const handleRegister = (username, password) => {
    const exists = users.some((u) => u.username === username);
    if (exists) {
      alert("Username already exists");
      return false;
    }

    const newUser = { username, password };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert("Registration successful! You can now log in.");
    setShowRegister(false);
    return true;
  };

  // Handle logout functionality
  const handleLogout = () => {
    setToken(null);  // Remove the token from the context or localStorage
    localStorage.removeItem("token");
  };

  // If loading, show loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // If not logged in, show login or register screen
  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {!showRegister ? (
          <Login
            onLogin={handleLogin}  // Pass login function
            onSwitchToRegister={() => setShowRegister(true)}  // Switch to register
          />
        ) : (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        )}
      </div>
    );
  }

  // Logged in → display the app with the sidebar and header
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar status={sidebarToggle} onLogout={handleLogout} />
        <div className="flex flex-col flex-1">
          <Header onSidebarToggle={() => setSidebarToggle(!sidebarToggle)} />
          <main className="p-6 flex-1 overflow-auto">
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute token={token}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activities"
                element={
                  <ProtectedRoute token={token}>
                    <Activities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ministries"
                element={
                  <ProtectedRoute token={token}>
                    <Ministries />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <ProtectedRoute token={token}>
                    <Members />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute token={token}>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
