import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { textVariant, slideIn } from "../utils/motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.2 });


  return (
    <section className='bottom-0 w-full'>
      {/* Contact & Newsletter section */}
      <div className="bg-secondary text-white py-8 px-8 md:flex md:justify-evenly overflow-hidden" ref={footerRef}>
        {/* Contact Us */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="hidden"
          animate={footerInView ? "show" : "hidden"}
          className="mb-8 md:w-1/3 md:mb-0"
        >
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <div className="h-[4px] md:w-3/4 bg-white mb-4"></div>
          <div className="flex items-center mb-2">
            <div className="bg-white text-black rounded-full p-2">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p className="ml-3">Tel: +44 (0) 1308 868578</p>
          </div>
          <div className="flex items-center mb-2">
            <div className="bg-white text-black rounded-full p-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <p className="ml-3">
              Email: <a href="mailto:mostertonpreschool@gmail.com">mostertonpreschool@gmail.com</a>
            </p>
          </div>
          <div className="flex items-center">
            <div className="bg-white text-black rounded-full p-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <p className="ml-3">
              Address: Fairoak Way, Mosterton
              <br />
              Beaminster,<br /> Dorset, <br />DT8 3JQ
            </p>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          initial="hidden"
          animate={footerInView ? "show" : "hidden"}
          className="md:w-1/3"
        >
          <h3 className="text-xl font-bold mb-2">Sign-up for our Newsletter</h3>
          <div className="h-[4px] md:w-3/4 bg-white mb-4"></div><br />
          <div className='text-center w-full md:w-3/4'>
            <input 
              type="text" 
              name="Email" 
              placeholder="Email" 
              className="p-4 w-full text-black rounded"
            /><br /><br />
            <button className="bg-orange-500 text-white px-10 py-2 rounded-full font-bold">
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>

      {/* Copyright section */}
      <div className="copyright w-full bg-primary text-white text-center text-[18px] py-[9px]">
        <p>
          <a href="https://b-waters.com" className="hover:underline px-4">Website by Ben Waters</a>Copyright © 2024 Mosterton Preschool
        </p>
      </div>
    </section>
  );
};

export default Footer;
