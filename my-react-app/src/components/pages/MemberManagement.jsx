import React, { useState } from "react";

export default function UserManagement() {
  const [members, setMembers] = useState([
    {
      id: 1,
      fullName: "John Doe",
      age: 30,
      gender: "Male",
      address: "123 Main St",
      ministry: "Choir",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      age: 25,
      gender: "Female",
      address: "456 Elm St",
      ministry: "Youth",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    fullName: "",
    age: "",
    gender: "Male",
    address: "",
    ministry: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Delete member
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  // Add/Edit submit
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
    setFormData({
      id: null,
      fullName: "",
      age: "",
      gender: "Male",
      address: "",
      ministry: "",
    });
    setIsEditing(false);
  };

  // Edit button
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
          setFormData({
            id: null,
            fullName: "",
            age: "",
            gender: "Male",
            address: "",
            ministry: "",
          });
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
              <th className="px-4 py-2 text-green-700">Full Name</th>
              <th className="px-4 py-2 text-green-700">Age</th>
              <th className="px-4 py-2 text-green-700">Gender</th>
              <th className="px-4 py-2 text-green-700">Address</th>
              <th className="px-4 py-2 text-green-700">Ministry</th>
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
                <td className="px-4 py-2">{member.fullName}</td>
                <td className="px-4 py-2">{member.age}</td>
                <td className="px-4 py-2">{member.gender}</td>
                <td className="px-4 py-2">{member.address}</td>
                <td className="px-4 py-2">{member.ministry}</td>
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
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
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
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700">Ministry</label>
                <input
                  type="text"
                  value={formData.ministry}
                  onChange={(e) =>
                    setFormData({ ...formData, ministry: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-1"
                />
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
