import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, update, remove, get } from "firebase/database";
import { database } from "../../utils/firebase"; // Replace with your Firebase configuration
import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import dayjs from "dayjs"; // For date manipulation
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat); // Add plugin for custom date format parsing

export default function AdminHelp() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const db = getDatabase();

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, "events"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const eventsArray = Object.entries(data).map(([id, event]) => ({
          id,
          ...event,
        }));

        // Auto-delete events older than a week past their date
        const now = dayjs();
        const filteredEvents = eventsArray.filter((event) => {
          const eventDate = dayjs(event.date, "DD/MM/YYYY");
          const isOld = now.diff(eventDate, "day") > 7;
          if (isOld) remove(ref(db, `events/${event.id}`)); // Delete from Firebase
          return !isOld;
        });

        // Reformat dates for display
        filteredEvents.forEach((event) => {
          event.date = dayjs(event.date, "DD/MM/YYYY").format("DD/MM/YYYY");
        });

        setEvents(filteredEvents);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce 250-character limit on description
    if (name === "description" && value.length > 250) return;

    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.date.trim()) {
      newErrors.date = "Date is required.";
    } else if (!dayjs(formData.date, "DD/MM/YYYY", true).isValid()) {
      newErrors.date = "Date must be in DD/MM/YYYY format.";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add or update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const eventData = {
        title: formData.title,
        date: dayjs(formData.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
        description: formData.description,
      };

      if (editId) {
        // Update existing event
        await update(ref(db, `events/${editId}`), eventData);
      } else {
        // Add new event
        await push(ref(db, "events"), eventData);
      }
      resetForm();
      fetchEvents();
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `events/${id}`));
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Handle edit mode
  const handleEdit = (event) => {
    setEditId(event.id);
    setFormData({
      title: event.title || "",
      date: event.date || "",
      description: event.description || "",
    });
  };

  // Reset form and exit edit mode
  const resetForm = () => {
    setFormData({ title: "", date: "", description: "" });
    setEditId(null);
    setErrors({});
  };

  return (
    <>
      <AdminNavbar />
      <section className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Fundraising Events</h1>
          <button
            onClick={() => navigate("/AdminDashboard")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Event List */}
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4">{event.description}</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
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
          <p>No events found.</p>
        )}

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          className={`my-8 p-6 rounded-lg shadow-md space-y-4 ${
            editId ? "bg-yellow-100 border-yellow-500" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold">
            {editId ? "Edit Event" : "Add Event"}
          </h2>

          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Date (DD/MM/YYYY)</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Description (Max 250 characters)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-secondary"
            ></textarea>
            <p className="text-sm text-gray-500">
              {formData.description.length}/250 characters
            </p>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
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
              {editId ? "Update Event" : "Add Event"}
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
