import React from "react";
import { motion } from "framer-motion";

const PricingHero = ({ yearly, setYearly }) => {
  return (
    <section className="pricing-hero">
      <motion.span
        className="pricing-badge"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        SIMPLE PRICING
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
      >
        Choose the Perfect Plan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        Unlock powerful AI tools to generate images, videos, artwork, and
        content. Start free and upgrade whenever you're ready.
      </motion.p>

      <motion.div
        className="billing-toggle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
      >
        <span>Monthly</span>

        <div
          className={`toggle-switch ${yearly ? "active" : ""}`}
          onClick={() => setYearly(!yearly)}
        >
          <div className="toggle-circle" />
        </div>

        <span>Yearly</span>

        <span className="save-text">Save 20%</span>
      </motion.div>
    </section>
  );
};

export default PricingHero;