import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bottom-0 w-full overflow-hidden">
      {/* Footer content */}
      <div className="bg-secondary text-white py-12">
        <div
          ref={footerRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12"
        >
          {/* Left: Company Summary */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            initial="hidden"
            animate={footerInView ? "show" : "hidden"}
          >
            <h3 className="text-2xl font-bold mb-3">Mosterton Pre-school</h3>
            <div className="h-[4px] w-20 bg-white mb-4"></div>
            <p className="text-md leading-relaxed">
              We are a unique Preschool based in the Dorset village of Mosterton.
              <br />
              Please contact us with any enquiries.
            </p>
          </motion.div>

          {/* Middle: Legal Info */}
          <motion.div
            variants={slideIn("up", "tween", 0.2, 1)}
            initial="hidden"
            animate={footerInView ? "show" : "hidden"}
          >
            <h3 className="text-xl font-bold mb-3">Legal Information</h3>
            <div className="h-[4px] w-20 bg-white mb-4"></div>
            <p className="mb-2"><span className="font-semibold">Charity Number:</span> 1027102</p>
            <p><span className="font-semibold">URN:</span> 554763</p>
          </motion.div>

          {/* Right: Contact Details */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            initial="hidden"
            animate={footerInView ? "show" : "hidden"}
          >
            <h3 className="text-xl font-bold mb-3">Contact Us</h3>
            <div className="h-[4px] w-20 bg-white mb-4"></div>

            <div className="flex items-center mb-4">
              <div className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <p className="ml-4">+44 (0)1308 868578</p>
            </div>

            <div className="flex items-center mb-4">
              <div className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <p className="ml-4">
                <a href="mailto:mostertonpreschool@gmail.com">mostertonpreschool@gmail.com</a>
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full mt-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <p className="ml-4">
                Fairoak Way, Mosterton, Beaminster,<br />
                Dorset, DT8 3JQ
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-primary text-white text-center text-[18px] py-3">
        <a href="https://b-waters.com" className="hover:underline px-4">Website by Ben Waters</a>Copyright © 2025 Mosterton Preschool
      </div>
    </section>

  );
};

export default Footer;
