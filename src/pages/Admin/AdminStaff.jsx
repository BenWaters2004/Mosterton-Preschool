import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, remove, update, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [base64Image, setBase64Image] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    const staffRef = ref(db, "staff");
    onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const staffArray = Object.entries(data).map(([id, entry]) => ({
          id,
          ...entry,
        }));
        setStaff(staffArray);
      } else {
        setStaff([]);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setBase64Image(reader.result);
    reader.readAsDataURL(file);
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

    const staffData = {
      name: formData.name,
      role: formData.role,
      photoURL: base64Image,
      isSafeguardingOfficer: false,
    };

    try {
      await push(ref(db, "staff"), staffData);
      resetForm();
    } catch (err) {
      console.error("Error saving staff:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `staff/${id}`));
    } catch (err) {
      console.error("Error deleting staff:", err);
    }
  };

  const handleSetSafeguarding = async (selectedId) => {
    try {
      const staffRef = ref(db, "staff");
      const snapshot = await get(staffRef);
      if (!snapshot.exists()) return;

      const updates = {};
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        updates[`staff/${key}/isSafeguardingOfficer`] = key === selectedId;
      });
      await update(ref(db), updates);
    } catch (error) {
      console.error("Error setting safeguarding officer:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "" });
    setBase64Image("");
    setErrors({});
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Staff Members</h1>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Add Staff Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-6 rounded-lg space-y-4"
          >
            <h2 className="text-xl font-bold mb-2">Add Staff Member</h2>

            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {base64Image && (
                <img
                  src={base64Image}
                  alt="Preview"
                  className="w-20 h-20 mt-2 rounded-full object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary-dark"
            >
              Add Member
            </button>
          </form>

          {/* Staff List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Current Staff</h2>
            {staff.length === 0 ? (
              <p>No staff members found.</p>
            ) : (
              <div className="space-y-4">
                {staff.map((person) => (
                  <div key={person.id} className="bg-white shadow p-4 rounded-lg">
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={person.photoURL || "https://via.placeholder.com/80"}
                          alt={person.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold">{person.name}</h4>
                          <p className="text-sm text-gray-600">{person.role}</p>
                          {person.isSafeguardingOfficer && (
                            <p className="text-sm text-green-600 font-semibold">Safeguarding Officer</p>
                          )}
                        </div>
                      </div>
                      <div className="space-x-2">
                        {!person.isSafeguardingOfficer && (
                          <button
                            onClick={() => handleSetSafeguarding(person.id)}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Make Safeguarding Officer
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AdminFooter />
    </>
  );
}
