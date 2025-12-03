import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

export default function AdminLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="flex-1 p-6">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "members" && <UserManagement />}
        {currentPage === "settings" && <Settings />}
        {currentPage === "profile" && <Profile />}
      </div>
    </div>
  );
}
