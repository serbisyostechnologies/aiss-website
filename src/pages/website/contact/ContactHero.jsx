import React from "react";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineChatAlt2,
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

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="contact-container">
        <motion.div
          className="contact-hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className="contact-hero-left" variants={fadeUp}>
            <div className="contact-badge">
              <HiOutlineChatAlt2 />
              <span>Let's Build Something Great</span>
            </div>

            <h1 className="contact-title">
              Get In
              <span> Touch</span>
            </h1>

            <p className="contact-subtitle">
              Whether you have a project idea, need expert AI solutions, or
              simply want to learn more about our services, our team is here to
              help. We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div className="contact-hero-right" variants={fadeUp}>
            <div className="hero-glow"></div>

            <div className="hero-contact-card">
              <div className="hero-card-header">
                <div className="hero-card-icon">
                  <HiOutlineMail />
                </div>

                <div>
                  <h3>We're Ready to Help</h3>
                  <p>Average response time: Under 24 hours</p>
                </div>
              </div>

              <div className="hero-info">
                <div className="hero-info-icon">
                  <HiOutlineMail />
                </div>

                <div>
                  <h4>Email Us</h4>
                  <p>info@aiserbisyosstudio.com</p>
                </div>
              </div>

              <div className="hero-info">
                <div className="hero-info-icon">
                  <HiOutlinePhone />
                </div>

                <div>
                  <h4>Call Us</h4>
                  <p>+91 63668 48488</p>
                </div>
              </div>

              <div className="hero-info">
                <div className="hero-info-icon">
                  <HiOutlineChatAlt2 />
                </div>

                <div>
                  <h4>Live Chat</h4>
                  <p>Available Monday - Saturday</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;