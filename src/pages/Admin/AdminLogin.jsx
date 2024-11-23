import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";
import bcrypt from "bcryptjs"; // Import bcryptjs

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const db = getDatabase();

    try {
      // Reference the 'admins' table in the database
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "admins"));

      if (snapshot.exists()) {
        const admins = snapshot.val();
        const admin = Object.values(admins).find((u) => u.email === email);

        if (admin) {
          // Verify the hashed password
          const isPasswordValid = bcrypt.compareSync(password, admin.password);
          if (isPasswordValid) {
            sessionStorage.setItem("adminName", admin.name);
            sessionStorage.setItem("adminEmail", admin.email);

            // Successful login
            navigate("/AdminDashboard");
          } else {
            setError("Invalid email or password. Please try again.");
          }
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else {
        setError("No admins found in the database.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-primary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <a href="/" className="text-sm hover:underline">
            Not meant to be here? Return home
          </a>
        </div>
      </section>
    </div>
  );
}
