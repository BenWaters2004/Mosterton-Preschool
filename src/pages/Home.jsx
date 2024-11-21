import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Caterpillar, Bee, HeroImage, hut, room, garden, Pencils } from "../assets";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../utils/motion";
import { useInView } from "react-intersection-observer";


export default function Home() {
  const images = [HeroImage, hut, room];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Intersection observers for sections
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [headingRef, headingInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ofstedRef, ofstedInView] = useInView({ triggerOnce: true, threshold: 0.2 });


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="overflow-hidden">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-[850px]">
        {/* Carousel images with smooth transitions */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full gradient-overlay">
            <div
              ref={headingRef}
              className="z-10 w-full px-10 text-center py-32 md:py-40 md:text-left md:px-32"
            >
              <motion.div
                variants={textVariant(0.3)}
                initial="hidden"
                animate={headingInView ? "show" : "hidden"}
              >
                <h1 className="text-[40px] md:text-[48px] text-primary" id="itim">
                  Mosterton Preschool
                </h1>
                <p className="text-[24px] pb-8">
                  Promoting awe and wonder, spark curiosity
                  <br /> and let children be children.
                </p>
                <a
                  href="/Application"
                  className="font-bold text-[18px] rounded-full bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
                >
                  Application
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel navigation circles */}
        <div className="absolute bottom-56 w-full flex justify-center space-x-2 z-50">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'} transition`}
              onClick={() => goToImage(index)}
            ></button>
          ))}
        </div>

        {/* First SVG - Top Shape */}
        <div className="custom-shape-divider-bottom-1731520006 absolute w-full bottom-6 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill2"></path>
          </svg>
        </div>

        {/* Second SVG - Offset Shape */}
        <div className="custom-shape-divider-bottom-1731520006 absolute w-full bottom-0 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="flex flex-col md:flex-row items-center md:items-center px-8 pb-14 bg-primary z-30 text-white relative mt-[-70px]"
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="hidden"
          animate={aboutInView ? "show" : "hidden"}
          className="md:w-1/2 md:pr-8"
        >
          <h3 className="text-2xl font-bold mb-4 md:pl-24">About Us</h3>
          <p className="mb-4 md:pl-24">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula lectus eget
            interdum cursus. Aenean et ligula ut augue placerat finibus.
          </p>
          <p className="mb-12 md:pl-24">
            Maecenas imperdiet sit amet libero eu iaculis. Sed condimentum vestibulum purus, vitae
            varius diam elementum non. Nam pulvinar malesuada odio, sed faucibus enim fringilla
            vitae. Pellentesque molestie orci eget felis dictum viverra. Sed nulla arcu, pharetra
            at volutpat nec, consectetur nec augue.
          </p>
          <a
            href="/OurEnvironment"
            className="font-bold text-[18px] rounded-full bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 transition duration-300 md:ml-24"
          >
            Our Environment
          </a>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          initial="hidden"
          animate={aboutInView ? "show" : "hidden"}
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img
            src={garden}
            alt="About Us"
            className="md:w-1/2 rounded-[45px] md:mx-28 mt-12 md:mt-0"
            style={{
              boxShadow: "10px 10px 15px rgba(249, 115, 22, 0.8)",
            }}
          />
        </motion.div>
      </section>
      
      <div className="bg-primary bg-repeat bg-contain w-full h-[200px] md:h-[370px] mt-[-100px]" style={{ backgroundImage: `url(${Pencils})` }}></div>

      <section className="flex flex-col md:flex-row justify-between mx-[5%] my-[52px] gap-[5%]">
        
        {/* Caterpillars Section */}
        <div className="flex-1 relative bg-cover bg-center rounded-lg shadow-md text-center mb-6 md:mb-0 pb-12" 
             style={{ backgroundImage: `url(${hut})` }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img src={Caterpillar} alt="Caterpillar" className="w-auto h-[120px] my-8" />
            <h3 className="text-5xl font-bold mb-12 text-white">Caterpillars</h3>
            <p className="mb-20 text-2xl font-semibold text-white">2 - 3 Years Old</p>
            <a href="/Caterpillars" className="bg-[#98C617] text-black px-12 py-3.5 rounded-full text-lg font-bold hover:bg-[#3FA635] hover:text-white transition duration-300">More</a>
          </div>
        </div>

        {/* Events Section */}
        <div className="flex-1 bg-white pb-12 rounded-lg shadow-md text-center mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold bg-primary text-white w-full p-6 rounded-t-lg mb-96">Latest Events</h3>
          <a href="/fundraisingEvents" className="bg-primary text-white px-12 py-3.5 rounded-full text-lg font-bold hover:bg-[#2E0B0E] transition">More</a>
        </div>

        {/* Bees Section */}
        <div className="flex-1 relative bg-cover bg-center rounded-lg shadow-md text-center pb-12" 
             style={{ backgroundImage: `url(${room})` }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img src={Bee} alt="Bee" className="w-auto h-[120px] my-8" />
            <h3 className="text-5xl font-bold mb-12 text-white">Busy Bees</h3>
            <p className="mb-20 text-2xl font-semibold text-white">3 - 4 Years Old</p>
            <a href="/busyBees" className="bg-[#FECF00] text-black px-12 py-3.5 rounded-full text-lg font-bold hover:bg-black hover:text-[#FECF00] transition duration-300">More</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-primary text-white text-center rounded-xl ml-[5%] mr-[5%] mb-[52px] mt-[52px]" ref={ofstedRef}>
        <motion.div
          variants={textVariant(0.3)}
          initial="hidden"
          animate={ofstedInView ? "show" : "hidden"}
        >
          <h3 className="text-[24px] font-semibold mb-4"><span className="text-blue-500">Ofsted</span> - Good rating</h3>
          <p className="text-[22px] px-4">“Children benefit from the setting's approach, which promotes curiosity, awe, and wonder in their everyday experiences.”</p>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}
