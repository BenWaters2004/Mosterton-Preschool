import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import { useState } from "react";

export default function AdminTerms() {
  const [terms, setTerms] = useState([
    // Example data; replace with fetched data from the backend
    { id: 1, startDate: "2024-01-05", endDate: "2024-04-01", name: "Spring Term" },
    { id: 2, startDate: "2024-04-15", endDate: "2024-07-20", name: "Summer Term" },
  ]);

  const [newTerm, setNewTerm] = useState({ name: "", startDate: "", endDate: "" });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleAddTerm = () => {
    if (!newTerm.name || !newTerm.startDate || !newTerm.endDate) {
      alert("Please fill in all fields!");
      return;
    }

    const newId = terms.length > 0 ? terms[terms.length - 1].id + 1 : 1;
    setTerms([...terms, { id: newId, ...newTerm }]);
    setNewTerm({ name: "", startDate: "", endDate: "" });
  };

  const handleDeleteTerm = (id) => {
    setTerms(terms.filter((term) => term.id !== id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Manage Term Dates</h1>

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
            <div className="grid grid-cols-3 gap-4">
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
