import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes. Our Free plan lets you explore the platform with limited credits and core AI tools. You can upgrade whenever you need more features.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and other supported payment methods through our secure payment partners.",
  },
  {
    question: "Can I switch between plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your subscription at any time. Changes are applied automatically based on your billing cycle.",
  },
  {
    question: "Do unused AI credits roll over?",
    answer:
      "Unused monthly credits do not roll over to the next billing cycle unless your plan specifically includes rollover benefits.",
  },
  {
    question: "Is my generated content private?",
    answer:
      "Yes. Your generated images, videos, and other AI creations remain private unless you choose to share or publish them.",
  },
];

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div layout className="faq-item" transition={{ duration: 0.3 }}>
      <button className="faq-question" onClick={onClick}>
        <span>{item.question}</span>
        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="faq-answer">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="pricing-faq">
      <div className="faq-header">
        <span className="pricing-badge">FAQ</span>
        <h2>Frequently Asked Questions</h2>
        <p>
          Everything you need to know about our pricing, subscriptions, and AI
          services.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={activeIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
