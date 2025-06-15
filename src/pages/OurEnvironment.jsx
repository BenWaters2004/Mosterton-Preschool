import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { room, Pencils, hut, Caterpillar, Bee } from "../assets";
import ImageCarousel from '../components/ImageCarousel'

export default function OurEnvironment() {
  return (
    <>
      <Nav />

      {/* Top Background Image */}
      <section className="relative w-full h-[425px] bg-cover bg-center" style={{ backgroundImage: `url(${room})` }}>
        <div className="absolute inset-0 bg-white opacity-60"></div>

        {/* SVG Divider */}
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

      {/* Committee Members Section */}
      <section className="bg-[#481317] pt-16 pb-24 relative z-30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Our Rooms</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Caterpillars */}
            <div
              className="relative bg-cover bg-center rounded-xl shadow-lg text-center overflow-hidden"
              style={{ backgroundImage: `url(${hut})` }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center p-8 md:p-12">
                <img src={Caterpillar} alt="Caterpillar" className="h-[100px] md:h-[120px] my-6" />
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Caterpillars</h3>
                <p className="text-xl md:text-2xl font-semibold text-white mb-10">2 - 3 Years Old</p>
                <a
                  href="/Caterpillars"
                  className="bg-[#98C617] text-black px-10 py-3 rounded-full text-lg font-bold hover:bg-[#3FA635] hover:text-white transition duration-300"
                >
                  More
                </a>
              </div>
            </div>

            {/* Busy Bees */}
            <div
              className="relative bg-cover bg-center rounded-xl shadow-lg text-center overflow-hidden"
              style={{ backgroundImage: `url(${room})` }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center p-8 md:p-12">
                <img src={Bee} alt="Bee" className="h-[100px] md:h-[120px] my-6" />
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Busy Bees</h3>
                <p className="text-xl md:text-2xl font-semibold text-white mb-10">3 - 4 Years Old</p>
                <a
                  href="/busyBees"
                  className="bg-[#FECF00] text-black px-10 py-3 rounded-full text-lg font-bold hover:bg-black hover:text-[#FECF00] transition duration-300"
                >
                  More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pencils Divider */}
      <div className="bg-primary bg-repeat bg-contain w-full h-[200px] md:h-[370px] mt-[-100px]" style={{ backgroundImage: `url(${Pencils})` }}></div>

      {/* Image Carousel Section */}
      <section>
        <ImageCarousel />
      </section>

      <Footer />
    </>
  );
}
