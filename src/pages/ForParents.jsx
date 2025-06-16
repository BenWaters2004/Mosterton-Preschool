import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { SchoolReadiness, HeroImage, SchoolReadinessPDF } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ForParents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Nav />

      {/* Hero */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center heroBorder"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 z-0"></div>
        <h2 className="text-center text-3xl font-bold text-primary z-10 sm:text-5xl">
          For Parents
        </h2>
      </div>

      {/* Top Section */}
      <section className="bg-[#481317] text-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">School Readiness</h3>
            <p className="text-lg leading-relaxed">
              We help each child and family to become <strong>'School Ready'</strong>.
              Through tailored support, encouragement, and early development skills,
              we ensure children transition confidently into school life.
            </p>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 cursor-pointer">
            <img
              src={SchoolReadiness}
              alt="School Readiness"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl shadow-lg object-cover w-full max-h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl z-10"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={SchoolReadiness}
              alt="School Readiness Full"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-xl p-8 flex flex-col sm:flex-row items-center gap-10 shadow-md">
          {/* PDF Icon Box */}
          <div className="bg-white rounded-xl shadow p-6 text-center border w-full max-w-sm">
            <FontAwesomeIcon icon={faFilePdf} className="text-6xl text-[#481317] mb-4" />
            <p className="text-[#481317] font-semibold text-lg mb-4">
              Download School Readiness Guide
            </p>
            <a
              href={SchoolReadinessPDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#481317] text-white px-6 py-2 rounded-full hover:bg-[#6a1d23] transition"
            >
              Download PDF
            </a>
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-semibold text-xl mb-2">Being School Ready information</h4>
            <p className="text-md text-gray-700">
              Learn what it means for a child to be “School Ready” and how you can help them feel prepared for their next big step.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
