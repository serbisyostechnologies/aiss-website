import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChevronDown,
  HiOutlineQuestionMarkCircle,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import "./Contact.css";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We build AI-powered web applications, SaaS platforms, automation solutions, cloud-based software, custom websites, mobile applications, UI/UX design, and enterprise digital products tailored to your business.",
    tag: "Services",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on complexity. Small websites usually take 2–4 weeks, while larger AI platforms and enterprise applications can take several months with iterative releases.",
    tag: "Timeline",
  },
  {
    question: "Do you develop custom AI solutions?",
    answer:
      "Yes. We create custom AI solutions including chatbots, intelligent assistants, recommendation systems, document processing, automation workflows, and integrations with leading AI models.",
    tag: "AI",
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Absolutely. We modernize existing websites with improved UI, better performance, responsive layouts, accessibility improvements, and SEO best practices.",
    tag: "Design",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. We offer maintenance, monitoring, bug fixes, security updates, feature enhancements, and ongoing technical support after launch.",
    tag: "Support",
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
      staggerChildren: 0.12,
    },
  },
};

const FAQPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section">
      <div className="contact-container">
        <motion.div
          className="faq-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.span className="section-badge" variants={fadeUp}>
            FAQs
          </motion.span>

          <motion.h2 variants={fadeUp}>Frequently Asked Questions</motion.h2>

          <motion.p variants={fadeUp}>
            Find answers to the most common questions about our services,
            process, pricing, and support.
          </motion.p>
        </motion.div>

        <motion.div
          className="faq-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              variants={fadeUp}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <div>
                  <h3>{faq.question}</h3>

                  <span className="faq-tag">{faq.tag}</span>
                </div>

                <motion.div
                  className="faq-icon"
                  animate={{
                    rotate: activeIndex === index ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <HiChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                      <div className="faq-tags">
                        <span className="faq-tag">{faq.tag}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPreview;