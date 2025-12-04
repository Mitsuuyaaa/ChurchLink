import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, username, onLogout }) {

  const menuItems = [
    { icon: "🏡", text: "Home", to: "/home" },
    { icon: "👥", text: "Members", to: "/users" },
    { icon: "📊", text: "Dashboard", to: "/dashboard" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden bg-gradient-to-b from-green-900 via-emerald-800 to-green-800 text-white min-h-screen p-6 flex flex-col shadow-2xl transition-all duration-300`}
    >

      {/* BRAND */}
      <div className={`${isOpen ? "opacity-100" : "opacity-0"} mb-10`}>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
          ChurchLink
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-3"></div>
      </div>

      {/* NAVIGATION */}
      <nav className={`${isOpen ? "opacity-100" : "opacity-0"} flex-1`}>
        <ul className="space-y-3">
          {menuItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg scale-105"
                      : "hover:bg-green-700/70"
                  }`
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* PROFILE + LOGOUT */}
      <div className={`mt-auto pt-6 border-t border-green-700/50`}>
        <button className="flex items-center gap-3 p-3 rounded-lg bg-green-800/40 w-full">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">
            {username ? username[0].toUpperCase() : "A"}
          </div>
          <div>
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-green-400">Profile</p>
          </div>
        </button>

        <button
          onClick={onLogout}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
