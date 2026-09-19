import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineChatAlt2,
  HiOutlineLocationMarker,
  HiArrowRight,
} from "react-icons/hi";
import "./Contact.css";

const contactCards = [
  {
    icon: <HiOutlineMail />,
    title: "Email Us",
    description:
      "Send us your questions anytime and our team will get back to you within 24 hours.",
    features: ["Quick responses", "Project discussions", "Technical support"],
    action: "Send Email",
    href: "mailto:hello@serbisyos.com",
    badge: "24 Hours",
  },
  {
    icon: <HiOutlinePhone />,
    title: "Call Our Team",
    description:
      "Speak directly with our specialists for project consultations and business inquiries.",
    features: ["Free consultation", "Business inquiries", "Expert guidance"],
    action: "Call Now",
    href: "tel:+919876543210",
    badge: "Mon - Fri",
  },
  {
    icon: <HiOutlineChatAlt2 />,
    title: "Live Chat",
    description:
      "Connect instantly with our support team for quick answers and technical assistance.",
    features: ["Instant replies", "Live assistance", "Product support"],
    action: "Start Chat",
    href: "#contact-form",
    badge: "Online",
  },
  {
    icon: <HiOutlineLocationMarker />,
    title: "Visit Our Office",
    description:
      "Meet our team in person to discuss your ideas and explore collaboration opportunities.",
    features: ["Face-to-face meetings", "Product demos", "Workshops"],
    action: "Get Directions",
    href: "https://maps.google.com/?q=Bengaluru,India",
    badge: "Bengaluru",
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

const ContactCards = () => {
  return (
    <section className="contact-cards-section">
      <div className="contact-container">
        <motion.div
          className="contact-cards-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.span className="section-badge" variants={fadeUp}>
            Contact Options
          </motion.span>

          <motion.h2 variants={fadeUp}>
            Choose How You'd Like to Connect
          </motion.h2>

          <motion.p variants={fadeUp}>
            Whether you prefer email, phone, live chat, or visiting our office,
            we're here to make connecting with us easy.
          </motion.p>
        </motion.div>

        <motion.div
          className="contact-cards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              className="contact-card-item"
              variants={fadeUp}
              whileHover={{
                y: -8,
              }}
            >
              <span className="contact-card-badge">{card.badge}</span>

              <div className="contact-card-icon">{card.icon}</div>

              <h3 className="contact-card-title">{card.title}</h3>

              <p className="contact-card-description">{card.description}</p>

              <div className="contact-card-features">
                {card.features.map((feature, i) => (
                  <div key={i} className="contact-card-feature">
                    <span>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              <motion.a
                href={card.href}
                className="contact-card-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                {...(card.href.startsWith("http")
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
              >
                <span>{card.action}</span>
                <HiArrowRight />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="contact-card-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            Not sure which option is right for you? Fill out our contact form
            and we'll connect you with the right team member.
          </p>

          <motion.a
            href="#contact-form"
            className="gradient-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
            <HiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCards;