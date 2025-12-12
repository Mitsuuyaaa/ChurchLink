import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (tokenValue, userObj) => {
    console.log("Login called with:", { tokenValue, userObj });
    setToken(tokenValue);
    setUser(userObj);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  const register = async (username, password) => {
    try {
      console.log("Registering user:", username);
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const text = await res.text();
      console.log("Register response:", text);
      
      if (!res.ok) {
        throw new Error(text || "Registration failed");
      }
      
      return JSON.parse(text);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const loginRequest = async (username, password) => {
    try {
      console.log("Login request for:", username);
      console.log("API URL:", `${API_URL}/auth/login`);
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const text = await res.text();
      console.log("Login response status:", res.status);
      console.log("Login response text:", text);
      
      if (!res.ok) {
        throw new Error(text || "Login failed");
      }
      
      const data = JSON.parse(text);
      console.log("Parsed login data:", data);
      
      // Make sure we have a token
      if (!data.token) {
        throw new Error("No token received from server");
      }
      
      // Call login with the token and user data
      const userObj = data.user || { username: data.username || username };
      login(data.token, userObj);
      
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register, loginRequest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};