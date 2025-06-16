import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

export default function AdminTerms() {
  const [terms, setTerms] = useState([]);
  const [newTerm, setNewTerm] = useState({ name: "", startDate: "", endDate: "", color: "#FECF00" });
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const termsRef = ref(db, "terms");

    onValue(termsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const termList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        setTerms(termList);
      } else {
        setTerms([]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleAddTerm = () => {
    if (!newTerm.name || !newTerm.startDate || !newTerm.endDate || !newTerm.color) {
      alert("Please fill in all fields!");
      return;
    }

    const db = getDatabase();
    const termsRef = ref(db, "terms");
    push(termsRef, newTerm);

    setNewTerm({ name: "", startDate: "", endDate: "", color: "#FECF00" });
  };


  const handleDeleteTerm = (id) => {
    const db = getDatabase();
    const termRef = ref(db, `terms/${id}`);
    remove(termRef);
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Term Dates</h1>
            <button
              onClick={() => navigate("/AdminDashboard")}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Existing Terms */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Term Name</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term) => (
                <tr key={term.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{term.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{term.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{term.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteTerm(term.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Term */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Add New Term</h2>
            <div className="grid grid-cols-4 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Term Name"
                value={newTerm.name}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="startDate"
                value={newTerm.startDate}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="endDate"
                value={newTerm.endDate}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="color"
                name="color"
                value={newTerm.color}
                onChange={handleInputChange}
                className="w-full h-full rounded border border-gray-300"
              />
            </div>
            <button
              onClick={handleAddTerm}
              className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Add Term
            </button>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}
