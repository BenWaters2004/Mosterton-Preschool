import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { useInView } from "react-intersection-observer";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navRef, navInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <nav className="w-full">
      {/* Top section with logo, name, phone number, and Facebook icon */}
      <div className="bg-white text-black py-4 px-8 flex justify-between items-center h-[83px]" ref={navRef}>
        <motion.div variants={textVariant(0.3)} initial="hidden" animate={navInView ? "show" : "hidden"} className="flex items-center space-x-4">
          <a href="/"><img src={logo} alt="Mosterton Preschool logo, two children holding hands" className="h-[70px]" /></a>
          <h3 className="text-[20px] md:text-[26px] font-bold">Mosterton Preschool</h3>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.div variants={textVariant(0.3)} initial="hidden" animate={navInView ? "show" : "hidden"}>
            <h3 className='text-[20px] hidden md:inline'>Tel: +44 (0) 1308 868578</h3>
            <a href="https://www.facebook.com/mostertonpreschooldorset" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon alt="Facebook" icon={faFacebook} className="text-primary text-[2rem] hover:text-black transition duration-300 ml-[15px]" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom section with nav links (Desktop) */}
      <div className="hidden md:flex bg-primary text-white px-8 justify-evenly text-[18px] font-medium text-center h-[58px]">
        <a href="/" className="flex items-center justify-center hover:bg-secondary w-full h-full transition">Home</a>

        {/* Dropdown section */}
        <div
          className="relative w-full h-full flex"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="hover:bg-secondary w-full h-full flex items-center justify-center transition">School Information</button>
          <div
            className={`absolute left-0 bg-primary shadow-lg w-full z-10 mt-[58px] overflow-hidden transition-all duration-300 ease-in-out ${
              isDropdownOpen ? 'max-h-50 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <a href="/termdates" className="block hover:bg-secondary h-[58px] flex items-center justify-center transition">Term Dates</a>
            <a href="/fundraisingevents" className="block hover:bg-secondary h-[58px] flex items-center justify-center transition">Fundraising Events</a>
            <a href="/staffmembers" className="block hover:bg-secondary h-[58px] flex items-center justify-center transition">Staff Members</a>
          </div>
        </div>

        <a href="/ForParents" className="flex items-center justify-center hover:bg-secondary w-full h-full transition">For Parents</a>
        <a href="/Safeguarding" className="flex items-center justify-center hover:bg-secondary w-full h-full transition">Safeguarding</a>
        <a href="/OurEnvironment" className="flex items-center justify-center hover:bg-secondary w-full h-full transition">Our Environment</a>
        <a href="/Committee" className="flex items-center justify-center hover:bg-secondary w-full h-full transition">Committee</a>
      </div>

      {/* Bottom section with menu icon (Mobile) */}
      <div className="flex md:hidden bg-primary text-white items-center justify-center h-[58px] transition">
        <button 
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
          className="flex items-center space-x-2 text-[1.5rem] focus:outline-none"
        >
          <span
            className={`transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : ''
            }`}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </span>
          <span className="text-[18px]">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`md:hidden bg-primary text-white flex flex-col items-center text-[18px] font-medium text-center transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <a href="/" className="py-2 w-full text-center hover:bg-secondary">Home</a>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="py-2 w-full text-center hover:bg-secondary flex justify-center items-center space-x-2"
        >
          <span>School Information</span>
          <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} />
        </button>
        {isDropdownOpen && (
          <div className="w-full bg-secondary">
            <a href="/termdates" className="block py-2 hover:bg-secondary text-center">Term Dates</a>
            <a href="/fundraisingevents" className="block py-2 hover:bg-secondary text-center">Fundraising Events</a>
            <a href="/staffmembers" className="block py-2 hover:bg-secondary text-center">Staff Members</a>
          </div>
        )}
        <a href="/ForParents" className="py-2 w-full text-center hover:bg-secondary">For Parents</a>
        <a href="/Safeguarding" className="py-2 w-full text-center hover:bg-secondary">Safeguarding</a>
        <a href="/OurEnvironment" className="py-2 w-full text-center hover:bg-secondary">Our Environment</a>
        <a href="/Committee" className="py-2 w-full text-center hover:bg-secondary">Committee</a>
      </div>
    </nav>
  );
};

export default Navbar;
