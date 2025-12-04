import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { username, token, login } = useAuth();

  // Simulate stored profile
  const [profile, setProfile] = useState({
    name: username || "Admin",
    username: username || "",
    role: "Administrator",
    email: "admin@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Sync form when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update local profile data
    setProfile(formData);

    // Update AuthContext username
    login(token, formData.username);

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-green-900">Profile</h2>
        <p className="text-gray-600 mt-1">Manage your account details</p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">

          {/* Avatar */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-700">
                  {formData.name?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {formData.name}
                </h3>
                <p className="text-sm text-gray-500">{formData.role}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Name</label>
                <input
                  type="text"
                  name="name"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* USERNAME */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Username</label>
                <input
                  type="text"
                  name="username"
                  disabled={!isEditing}
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* ROLE */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Role</label>
                <input
                  type="text"
                  name="role"
                  disabled={!isEditing}
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                {isEditing ? (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
