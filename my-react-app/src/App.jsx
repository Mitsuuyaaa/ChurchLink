import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import UserManagement from "./components/pages/MemberManagement";
import Profile from "./components/pages/Profile";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [sidebarToggle, setSidebarToggle] = useState(true); // controls collapse
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "admin_master",
    role: "Administrator",
    email: "admin@example.com",
  });

  const updateProfile = (updatedData) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const updateUsername = (newUsername) => {
    setProfile((prev) => ({
      ...prev,
      username: newUsername,
    }));
  };

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

  // LOGIN
  function handleLogin(username, password) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  }

  // REGISTER
  function handleRegister(username, password) {
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
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  }

  if (loading) return <LoadingScreen />;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {!showRegister ? (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setShowRegister(true)}
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

  // PAGE SWITCHING
  let pageContent;
  switch (currentPage) {
    case "dashboard":
      pageContent = <Dashboard />;
      break;
    case "home":
      pageContent = <Home />;
      break;
    case "users":
      pageContent = <UserManagement />;
      break;
    case "profile":
      pageContent = (
        <Profile
          profile={profile}
          updateProfile={updateProfile}
          updateUsername={updateUsername}
        />
      );
      break;
    default:
      pageContent = <Dashboard />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        status={sidebarToggle} // pass status for collapse
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        username={profile.username}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarToggle ? "ml-0" : "ml-0"
        }`}
      >
        <Header onSidebarToggle={toggleSidebar} />
        <main className="p-6 flex-1 overflow-auto">{pageContent}</main>
      </div>
    </div>
  );
}
