import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

const CTA = () => {
  return (
    <section className="pricing-cta">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-icon">
          <HiSparkles />
        </div>

        <h2>Ready to Create Something Amazing?</h2>

        <p>
          Join thousands of creators using AI to generate stunning images,
          videos, logos, artwork, and more. Start for free and upgrade anytime.
        </p>

        <div className="cta-buttons">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="cta-primary-btn"
          >
            Get Started Free
            <HiArrowRight />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="cta-secondary-btn"
          >
            Contact Sales
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;