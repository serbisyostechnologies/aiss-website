import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineGlobe,
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

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="newsletter-section">
      <div className="contact-container">
        <motion.div
          className="newsletter-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="newsletter-glow"></div>

          <motion.div
            className="newsletter-floating floating-one"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiOutlineSparkles />
          </motion.div>

          <motion.div
            className="newsletter-floating floating-two"
            animate={{
              y: [0, 12, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiOutlineMail />
          </motion.div>

          <motion.div className="newsletter-content" variants={fadeUp}>
            <div className="newsletter-badge">
              <HiOutlineSparkles />
              <span>Stay Updated</span>
            </div>

            <h2 className="newsletter-title">Join Our Newsletter</h2>

            <p className="newsletter-description">
              Get the latest AI insights, product updates, tutorials and
              exclusive resources delivered directly to your inbox. No spam,
              unsubscribe anytime.
            </p>
            {success ? (
              <motion.div
                className="newsletter-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <HiOutlineCheckCircle />
                <div>
                  <h3>You're subscribed!</h3>
                  <p>Thanks for joining our newsletter.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                className="newsletter-form"
                onSubmit={handleSubmit}
                variants={fadeUp}
              >
                <div className="newsletter-input-wrapper">
                  <HiOutlineMail className="newsletter-input-icon" />
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="button-spinner"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}

            <motion.div className="newsletter-features" variants={fadeUp}>
              <div className="newsletter-feature">
                <HiOutlineLightningBolt />
                <span>Weekly AI Tips</span>
              </div>

              <div className="newsletter-feature">
                <HiOutlineShieldCheck />
                <span>Privacy First</span>
              </div>

              <div className="newsletter-feature">
                <HiOutlineGlobe />
                <span>Global Community</span>
              </div>
            </motion.div>

            <p className="newsletter-note">
              By subscribing you agree to receive occasional emails about new
              features, articles and product updates. You can unsubscribe at any
              time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;