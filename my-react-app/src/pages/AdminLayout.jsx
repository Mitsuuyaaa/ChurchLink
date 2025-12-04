import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ sidebarToggle, toggleSidebar }) {
  const { username, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarToggle}
        username={username}
        onLogout={logout}
      />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">

        <Header onSidebarToggle={toggleSidebar} />

        <main className="p-6 flex-1 overflow-auto">
          <Outlet />  {/* Child routes will load here */}
        </main>

      </div>
    </div>
  );
}
