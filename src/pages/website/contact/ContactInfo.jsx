import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiChevronRight,
} from "react-icons/hi";
import "./Contact.css";

const contactInfo = [
  {
    icon: <HiOutlineMail />,
    title: "Email",
    value: "hello@serbisyos.com",
    subtitle: "We'll reply within 24 hours",
  },
  {
    icon: <HiOutlinePhone />,
    title: "Phone",
    value: "+91 98765 43210",
    subtitle: "Mon - Fri • 9:00 AM - 6:00 PM",
  },
  {
    icon: <HiOutlineLocationMarker />,
    title: "Office",
    value: "Bengaluru, Karnataka",
    subtitle: "India",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const ContactInfo = () => {
  return (
    <motion.aside
      className="contact-info-panel"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.div className="contact-info-card" variants={fadeUp}>
        <div className="contact-info-header">
          <span className="section-badge">Contact Information</span>

          <h2>Let's Start a Conversation</h2>

          <p>
            Have a project idea or a question? Reach out through any of the
            channels below and we'll be happy to help.
          </p>
        </div>

        <div className="contact-info-list">
          {contactInfo.map((item) => (
            <motion.div
              key={item.title}
              className="contact-info-item"
              variants={fadeUp}
              whileHover={{ x: 6 }}
            >
              <div className="contact-info-icon">{item.icon}</div>

              <div className="contact-info-content">
                <h4>{item.title}</h4>
                <p>{item.value}</p>
                <span>{item.subtitle}</span>
              </div>

              <div className="contact-arrow">
                <HiChevronRight />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="office-hours" variants={fadeUp}>
          <h3>
            <HiOutlineClock />
            Office Hours
          </h3>

          <ul>
            <li>
              <span>Monday - Friday</span>
              <strong>9:00 AM - 6:00 PM</strong>
            </li>

            <li>
              <span>Saturday</span>
              <strong>10:00 AM - 2:00 PM</strong>
            </li>

            <li>
              <span>Sunday</span>
              <strong>Closed</strong>
            </li>
          </ul>

          <div className="office-status">
            <span className="status-dot"></span>
            Currently Available
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="social-card" variants={fadeUp}>
        <h3>Follow Us</h3>

        <p>
          Stay connected for the latest updates, product launches, AI insights,
          and development tips.
        </p>

        <div className="social-links">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GitHub
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            X
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Instagram
          </a>
        </div>
      </motion.div>

      <motion.div className="quick-help-card" variants={fadeUp}>
        <h3>Need Immediate Help?</h3>

        <p>
          Our team is ready to answer your questions, discuss your project, and
          help you find the best solution.
        </p>

        <motion.a
          href="#contact-form"
          className="quick-help-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiOutlineMail />
          Contact Us
        </motion.a>
      </motion.div>
    </motion.aside>
  );
};

export default ContactInfo;