import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide the auth context
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);  // Save token in localStorage
    } else {
      localStorage.removeItem("token"); // Remove token if user logs out
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
