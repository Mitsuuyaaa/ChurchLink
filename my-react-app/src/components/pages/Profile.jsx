import React, { useState, useEffect } from "react";

export default function Profile({ profile, updateProfile, updateUsername }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Sync form with latest profile data
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

    // Update all profile fields at once
    updateProfile(formData);

    // Update the username in sidebar
    updateUsername(formData.username);

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-900">Profile</h2>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

          {/* Avatar */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-700">
                  {formData.name && formData.name.length > 0
                    ? formData.name[0].toUpperCase()
                    : "?"}
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

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* Buttons */}
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
