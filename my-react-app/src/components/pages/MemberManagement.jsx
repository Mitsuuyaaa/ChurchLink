import React, { useState } from "react";

export default function UserManagement() {
  const [members, setMembers] = useState([
    { id: 1, username: "john_doe", role: "Admin" },
    { id: 2, username: "jane_smith", role: "Member" },
    { id: 3, username: "mike_jones", role: "Member" },
  ]);

  const [formData, setFormData] = useState({ id: null, username: "", role: "Member" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  // Handle Add + Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setMembers(
        members.map((m) => (m.id === formData.id ? formData : m))
      );
    } else {
      setMembers([...members, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
    setFormData({ id: null, username: "", role: "Member" });
    setIsEditing(false);
  };

  // Handle Edit Button
  const handleEdit = (member) => {
    setFormData(member);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-green-900">Member Management</h2>
      <p className="text-gray-700 mb-4">View, add, edit, or delete members below.</p>

      {/* Add Member Button */}
      <button
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setFormData({ id: null, username: "", role: "Member" });
        }}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        + Add Member
      </button>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-green-200">
              <th className="px-4 py-2 text-green-700">ID</th>
              <th className="px-4 py-2 text-green-700">Username</th>
              <th className="px-4 py-2 text-green-700">Role</th>
              <th className="px-4 py-2 text-green-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-green-100 hover:bg-green-50 transition-colors"
              >
                <td className="px-4 py-2">{member.id}</td>
                <td className="px-4 py-2">{member.username}</td>
                <td className="px-4 py-2">{member.role}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-800">
              {isEditing ? "Edit Member" : "Add Member"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
