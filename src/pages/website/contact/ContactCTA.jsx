import React from "react";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineSupport,
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

const ContactCTA = () => {
  return (
    <section className="contact-cta-section">
      <div className="contact-container">
        <motion.div
          className="contact-cta-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="contact-cta-glow"></div>

          <motion.div
            className="contact-cta-floating floating-one"
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlineSparkles />
          </motion.div>

          <motion.div
            className="contact-cta-floating floating-two"
            animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlineMail />
          </motion.div>

          <motion.div
            className="contact-cta-floating floating-three"
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlineChatAlt2 />
          </motion.div>

          <motion.div
            className="contact-cta-floating floating-four"
            animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlinePhone />
          </motion.div>

          <motion.div className="contact-cta-content" variants={fadeUp}>
            <div className="contact-cta-badge">
              <HiOutlineSupport />
              <span>We're Here to Help</span>
            </div>

            <h2 className="contact-cta-title">
              Ready to Build Something
              <span> Amazing Together?</span>
            </h2>

            <p className="contact-cta-description">
              Whether you have a project in mind, need expert guidance, or
              simply want to learn more about our AI solutions, our team is
              ready to help you every step of the way. Reach out today and let's
              turn your ideas into reality.
            </p>

            <motion.div className="contact-cta-buttons" variants={fadeUp}>
              <motion.a
                href="#contact-form"
                className="contact-cta-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
                <HiArrowRight />
              </motion.a>

              <motion.a
                href="mailto:hello@example.com"
                className="contact-cta-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiOutlineMail />
                Email Us
              </motion.a>
            </motion.div>

            <motion.div className="contact-cta-stats" variants={fadeUp}>
              <div className="contact-cta-stat">
                <h3>500+</h3>
                <p>Projects Delivered</p>
              </div>

              <div className="contact-cta-divider"></div>

              <div className="contact-cta-stat">
                <h3>98%</h3>
                <p>Client Satisfaction</p>
              </div>

              <div className="contact-cta-divider"></div>

              <div className="contact-cta-stat">
                <h3>24/7</h3>
                <p>Dedicated Support</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;