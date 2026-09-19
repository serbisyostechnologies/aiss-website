import { motion } from "framer-motion";
import "./CTASection.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../common/confirm/ConfirmPopup";
import { useState } from "react";

export default function CTASection() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.profile);
  const userPlan = user.memberShipStatus;
  const [showConfirm, setShowConfirm] = useState(false);

  const startButtonClicked = () => {
    if (isLoggedIn && userPlan === "new") {
      setShowConfirm(true);
    } else if (isLoggedIn) {
      navigate("/features/image/create", { replace: true });
    } else {
      navigate("/auth", { state: { open: "LOGIN" } }, { replace: true });
    }
  };

  const routeToPricing = () => {
    setShowConfirm(false);
    navigate("/pricing");
  };

  return (
    <>
      <section className="cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-blob cta-blob-left"></div>
          <div className="cta-blob cta-blob-right"></div>
          <h2>
            Ready to Create Something <span>Amazing?</span>
          </h2>

          <p>Join millions of creators and bring your ideas to life with AI</p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="cta-button"
            onClick={startButtonClicked}
          >
            Start Creating for Free ✨
          </motion.button>
        </motion.div>
      </section>
      <ConfirmPopup
        isOpen={showConfirm}
        message="You don’t have an active plan. Subscribe to a plan to continue accessing all app features."
        confirmText="Yes"
        cancelText="No"
        onConfirm={routeToPricing}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}