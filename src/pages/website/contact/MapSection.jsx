import React from "react";
import { motion } from "framer-motion";
import {
  HiLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import "./Contact.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="contact-container">
        <motion.div
          className="map-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.span className="section-badge" variants={fadeUp}>
            Find Us
          </motion.span>

          <motion.h2 variants={fadeUp}>Visit Our Office</motion.h2>

          <motion.p variants={fadeUp}>
            Drop by our office, schedule a meeting, or connect with us online.
            We'd love to discuss your next AI project.
          </motion.p>
        </motion.div>

        <motion.div
          className="map-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            className="map-frame"
            title="Office Location"
            src="https://www.google.com/maps?q=Kaggod,India&z=15&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="map-overlay">
            <h3>AISerbisyosStudio</h3>

            <p>
              Let's build the future together. Visit us during business hours or
              schedule an appointment with our team.
            </p>

            <div className="location-item">
              <div className="location-icon">
                <HiLocationMarker />
              </div>
              <div className="location-content">
                <h4>Address</h4>
                <p>Kaggod, Vijayapura, Karnataka, India</p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <HiOutlineClock />
              </div>
              <div className="location-content">
                <h4>Working Hours</h4>
                <p>Monday - Friday • 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <HiOutlinePhone />
              </div>
              <div className="location-content">
                <h4>Phone</h4>
                <p>+91 63668 48488</p>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <HiOutlineMail />
              </div>
              <div className="location-content">
                <h4>Email</h4>
                <p>info@aiserbisyosstudio.com</p>
              </div>
            </div>
            <div className="map-actions">
              <motion.a
                href="https://maps.google.com/?q=Bengaluru,India"
                target="_blank"
                rel="noopener noreferrer"
                className="map-button primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiLocationMarker />
                Get Directions
              </motion.a>

              <motion.a
                href="#contact-form"
                className="map-button secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiOutlineMail />
                Contact Us
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="office-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="office-card" variants={fadeUp}>
            <div className="office-card-icon">
              <HiOutlineOfficeBuilding />
            </div>
            <h3>Head Office</h3>
            <p>Kaggod, Vijayapura, Karnataka</p>
          </motion.div>

          <motion.div className="office-card" variants={fadeUp}>
            <div className="office-card-icon">
              <HiOutlineClock />
            </div>
            <h3>Business Hours</h3>
            <p>
              Mon - Sat
              <br />
              9:00 AM - 6:00 PM
            </p>
          </motion.div>

          <motion.div className="office-card" variants={fadeUp}>
            <div className="office-card-icon">
              <HiOutlinePhone />
            </div>
            <h3>Call Us</h3>
            <p>+91 63668 48488</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;