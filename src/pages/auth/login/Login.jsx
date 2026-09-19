import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Login.css";
import BackgroundGlow from "./BackgroundGlow";
import FloatingParticles from "./FloatingParticles";
import LoginCard from "./LoginCard";
import RegistrationCard from "./RegistrationCard";
import usePageTitle from "../../../hooks/usePageTitle";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { state } = useLocation();
  const card = state?.open ?? "LOGIN";
  const [showCard, setShowCard] = useState(card);

  const pageTitle = card === "LOGIN" ? "Login" : "Register";
  usePageTitle(`${pageTitle} | AISerbisyosStudio`);
  useEffect(() => {
    setShowCard(card);

  }, [card]);

  return (
    <div className="login-page">
      <BackgroundGlow />
      <FloatingParticles />

      <div className="login-container">
        <motion.div
          className="login-left motion-left"
        >
          <h1 className="hero-title">
            Create,
            <span>Edit & Analyze</span>
            Images & Videos
            <span className="gradient">with Artificial Intelligence</span>
          </h1>

          <p className="hero-description">
            Generate stunning AI images, transform videos, upscale, remove
            backgrounds, edit with prompts, and unlock powerful creative
            workflows in one intelligent studio.
          </p>

          <div className="feature-list">
            <div className="feature">
              <div className="feature-dot"></div>
              AI Image Generation
            </div>

            <div className="feature">
              <div className="feature-dot"></div>
              AI Image Editing
            </div>

            <div className="feature">
              <div className="feature-dot"></div>
              Collage Creation
            </div>

            <div className="feature">
              <div className="feature-dot"></div>
              AI Video Generation
            </div>

            <div className="feature">
              <div className="feature-dot"></div>
              AI Video Editing
            </div>
          </div>
        </motion.div>

        <motion.div
          className="login-right align-center motion-right"
        >
          <motion.div
            className="login-card"
          >
            {showCard == "LOGIN" ? <LoginCard /> : <RegistrationCard />}

            {showCard == "LOGIN" && (
              <p
                className="signup-text"
                onClick={() => setShowCard("REGISTER")}
              >
                Don't have an account?
                <button type="button">Create Account</button>
              </p>
            )}

            {showCard == "REGISTER" && (
              <p className="signup-text" onClick={() => setShowCard("LOGIN")}>
                Already have an account?
                <button type="button">Login</button>
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;