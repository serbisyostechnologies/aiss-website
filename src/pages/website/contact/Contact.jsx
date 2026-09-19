import React from "react";
import { motion } from "framer-motion";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactCards from "./ContactCards";
import FAQPreview from "./FAQPreview";
import MapSection from "./MapSection";
import Newsletter from "./Newsletter";
import ContactCTA from "./ContactCTA";
import "./Contact.css";
import usePageTitle from "../../../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact | AISerbisyosStudio");
  return (
    <div className="contact-page">
      <ContactHero />

      <section id="contact-form">
        <div className="contact-container">
          <motion.div
            className="contact-grid"
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
      <FAQPreview />
      <MapSection />
      <Newsletter />
    </div>
  );
};

export default Contact;