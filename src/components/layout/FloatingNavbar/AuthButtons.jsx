import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-buttons">
      <motion.button
        className="login-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/auth", {state: {open: "LOGIN"}})}
      >
        Login
      </motion.button>

      <motion.button
        className="register-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/auth", {state: {open: "REGISTER"}})}
      >
        Register
      </motion.button>
    </div>
  );
};

export default AuthButtons;