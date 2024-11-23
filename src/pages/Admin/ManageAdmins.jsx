import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, update, remove } from "firebase/database";
import { database } from "../../utils/firebase"; // Import your database instance
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // Import bcryptjs
import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const db = getDatabase();

  // Fetch all admin accounts
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, "admins"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAdmins(Object.entries(data).map(([id, admin]) => ({ id, ...admin })));
      } else {
        setAdmins([]);
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!editId && !formData.password.trim()) {
      newErrors.password = "Password is required for new admins.";
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (
      formData.password &&
      (!/[A-Z]/.test(formData.password) ||
        !/[a-z]/.test(formData.password) ||
        !/[0-9]/.test(formData.password) ||
        !/[!@#$%^&*]/.test(formData.password))
    ) {
      newErrors.password =
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let hashedPassword = formData.password;

      // Hash the password only if it's provided
      if (formData.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(formData.password, salt);
      }

      const adminData = {
        name: formData.name,
        email: formData.email,
        ...(hashedPassword ? { password: hashedPassword } : {}),
      };

      if (editId) {
        // Update existing admin
        await update(ref(db, `admins/${editId}`), adminData);
      } else {
        // Add new admin
        await push(ref(db, "admins"), adminData);
      }
      resetForm();
      fetchAdmins(); // Refresh admin list
    } catch (err) {
      console.error("Error saving admin:", err);
    }
  };

  // Handle delete admin
  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `admins/${id}`));
      fetchAdmins(); // Refresh admin list
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  // Handle edit mode
  const handleEdit = (admin) => {
    setEditId(admin.id);
    setFormData({ name: admin.name || "", email: admin.email, password: "" });
  };

  // Reset form and exit edit mode
  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setEditId(null);
    setErrors({});
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-6 bg-gray-100 min-h-screen overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Admins</h1>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Admin List */}
        {loading ? (
          <p>Loading...</p>
        ) : admins.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b">
                  <td className="p-4">{admin.name || "N/A"}</td>
                  <td className="p-4">{admin.email}</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
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
          <p>No admins found.</p>
        )}

        {/* Admin Form */}
        <form
          onSubmit={handleSubmit}
          className={`my-8 p-6 rounded-lg shadow-md space-y-4 ${
            editId ? "bg-yellow-100 border-yellow-500" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold">
            {editId ? "Editing Admin" : "Add Admin"}
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
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={editId ? "Leave blank to keep current password" : ""}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className={`flex-1 py-2 rounded-md transition ${
                editId
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {editId ? "Update Admin" : "Add Admin"}
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
