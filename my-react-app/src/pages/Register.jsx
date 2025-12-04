import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit() {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    if (!username.trim()) {
      alert("Username required");
      return;
    }

    // Simulate registration success
    login("dummy-token", username.trim());

    navigate("/dashboard");
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            ChurchLink
          </h1>
        </div>

        <div className="bg-white/80 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-green-800">Create Account</h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-xl"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit()
              }
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-xl"
            >
              Register
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-green-700 hover:underline"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
