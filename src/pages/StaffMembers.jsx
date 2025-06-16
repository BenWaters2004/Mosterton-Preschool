import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getDatabase, ref, onValue } from "firebase/database";
import { garden, Pencils } from "../assets";


export default function StaffMembers() {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const staffRef = ref(db, "staff");

    onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const staffArray = Object.entries(data).map(([id, member]) => ({ id, ...member }));
        setStaffMembers(staffArray);
      } else {
        setStaffMembers([]);
      }
    });
  }, []);

  return (
    <>
      <Nav />

      {/* Hero Section */}
      <section
        className="relative w-full h-[425px] bg-cover bg-center"
        style={{ backgroundImage: `url(${garden})` }}
      >
        <div className="absolute inset-0 bg-white opacity-60"></div>
        <div className="custom-shape-divider-bottom-1745775394 absolute w-full bottom-6 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill2"></path>
          </svg>
        </div>
        <div className="custom-shape-divider-bottom-1745775394 absolute w-full bottom-0 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Staff Members Section */}
      <section className="bg-[#481317] pt-12 pb-20 mt-[-30px] z-30 relative">
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Meet Our Staff</h1>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {staffMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              {member.photoURL ? (
                <img
                  src={member.photoURL}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mb-6 mt-4"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 rounded-full mb-6"></div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-center">{member.name}</h3>
              <p className="text-gray-600 text-center mb-4">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div
        className="bg-primary bg-repeat bg-contain w-full h-[200px] md:h-[370px] mt-[-100px]"
        style={{ backgroundImage: `url(${Pencils})` }}
      ></div>

      <Footer />
    </>
  );
}
