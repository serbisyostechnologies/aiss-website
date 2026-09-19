import React from "react";
import { motion } from "framer-motion";
import "./FloatingNavbar.css";
import logo from "../../../assets/images/logos/tab-logo.png";

const Logo = () => {
  return (
    <motion.a
      href="/"
      className="logo"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="logo-icon"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={logo}
          alt="AISerbisyosStudio Logo"
          className="logo-image"
        />
      </motion.div>

      <div className="logo-text">
        <span className="logo-title">
          AISerbisyosStudio
        </span>
        <span className="logo-subtitle">
          One Studio. Infinite Possibilities.
        </span>
      </div>
    </motion.a>
  );
};

export default Logo;