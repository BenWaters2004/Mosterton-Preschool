import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, update, remove, get } from "firebase/database";
import { database } from "../../utils/firebase";
import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import { useNavigate } from "react-router-dom";

export default function AdminCommittee() {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [base64Image, setBase64Image] = useState("");
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const db = getDatabase();

  // Fetch committee members
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, "committeeMembers"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const membersArray = Object.entries(data).map(([id, member]) => ({
          id,
          ...member,
        }));
        setMembers(membersArray);
      } else {
        setMembers([]);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const memberData = {
        name: formData.name,
        role: formData.role,
        photoURL:
          base64Image || (editId ? members.find((m) => m.id === editId)?.photoURL || "" : ""),
      };

      if (editId) {
        await update(ref(db, `committeeMembers/${editId}`), memberData);
      } else {
        await push(ref(db, "committeeMembers"), memberData);
      }

      resetForm();
      fetchMembers();
    } catch (err) {
      console.error("Error saving member:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `committeeMembers/${id}`));
      fetchMembers();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleEdit = (member) => {
    setEditId(member.id);
    setFormData({ name: member.name || "", role: member.role || "" });
    setBase64Image(member.photoURL || "");
  };

  const resetForm = () => {
    setFormData({ name: "", role: "" });
    setBase64Image("");
    setEditId(null);
    setErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Committee Members</h1>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Members Table */}
        {loading ? (
          <p>Loading committee members...</p>
        ) : members.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Photo</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="p-4">
                    {member.photoURL ? (
                      <img
                        src={member.photoURL}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full" />
                    )}
                  </td>
                  <td className="p-4">{member.name}</td>
                  <td className="p-4">{member.role}</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No committee members found.</p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`my-8 p-6 rounded-lg shadow-md space-y-4 ${
            editId ? "bg-yellow-100 border-yellow-500" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold">
            {editId ? "Edit Committee Member" : "Add Committee Member"}
          </h2>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {base64Image && (
              <img
                src={base64Image}
                alt="Preview"
                className="w-20 h-20 mt-2 rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className={`flex-1 py-2 rounded-md transition ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-secondary text-white hover:bg-secondary-dark"
              }`}
            >
              {editId ? "Update Member" : "Add Member"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
      <AdminFooter />
    </>
  );
}
