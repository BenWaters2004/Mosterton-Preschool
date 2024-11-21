import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom"; // to handle navigation

const AdminNavbar = () => {
  const [navRef, navInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [adminName, setAdminName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // state to manage dropdown visibility
  const dropdownRef = useRef(null); // reference for the dropdown menu
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve adminName from sessionStorage on page load
    const storedAdminName = sessionStorage.getItem("adminName");
    if (storedAdminName) {
      setAdminName(storedAdminName);
    } else {
      console.log("No admin found in sessionStorage, redirecting to login.");
      window.location.replace("/admin"); // Redirect to login if no admin is logged in
    }
  }, []);

  // Handle click outside the dropdown to close it
  useEffect(() => {
    // Function to detect click outside
    const handleOutsideClick = (e) => {
      // Only close dropdown if it's open and clicked outside the dropdown
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    // We use a delay to ensure dropdown is rendered first before attaching the click event
    const timeoutId = setTimeout(() => {
      if (dropdownVisible) {
        document.addEventListener('click', handleOutsideClick);
      }
    }, 50); // small delay to allow rendering

    // Cleanup event listener when dropdown is hidden or on unmount
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownVisible]); // Depend on dropdown visibility

  const handleLogout = () => {
    console.log("Logging out...");
    // Clear sessionStorage and redirect to login
    sessionStorage.removeItem("adminName");
    sessionStorage.removeItem("adminEmail");
    navigate("/admin"); // Redirect to login page
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <nav className="w-full">
      {/* Top section with logo, name, phone number, and Facebook icon */}
      <div className="bg-primary text-white py-4 px-8 flex justify-between items-center h-[83px]" ref={navRef}>
        <motion.div variants={textVariant(0.3)} initial="hidden" animate={navInView ? "show" : "hidden"} className="flex items-center space-x-4">
          <a href="/"><img src={logo} alt="Mosterton Preschool logo, two children holding hands" className="h-[70px]" /></a>
          <h3 className="text-[20px] md:text-[26px] font-bold hidden md:inline">Mosterton Preschool</h3>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.div variants={textVariant(0.3)} initial="hidden" animate={navInView ? "show" : "hidden"}>
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <FontAwesomeIcon alt="User Icon" icon={faUser} className="text-[1rem] mr-[7px]" />
                <span>{adminName}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownVisible && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-black border border-gray-200 rounded-lg shadow-md w-[200px] z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-4 hover:bg-gray-100 text-md text-center font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
