import "./FAQSection.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function FAQSection({ t }) {
  const [active, setActive] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
  const faqList = t("contact.faqs.list", { returnObjects: true });

  const totalPages = Math.ceil(faqList.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFaqs = faqList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span>{t("contact.faqs.title")}</span>
        <h2>{t("contact.faqs.heading")}</h2>
        <p>{t("contact.faqs.description")}</p>
      </div>

      <div className="faq-list">
        {currentFaqs.map((item, index) => {
          const originalIndex = startIndex + index;

          return (
            <motion.div
              layout
              className={`faq-card ${active === originalIndex ? "active" : ""}`}
              key={originalIndex}
            >
              <button
                className="faq-question"
                onClick={() => toggle(originalIndex)}
              >
                <span>{item.question}</span>

                {active === originalIndex ? <FiMinus /> : <FiPlus />}
              </button>

              <AnimatePresence>
                {active === originalIndex && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="faq-pagination">
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            setActive(null);
          }}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <IoChevronBack />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => {
              setCurrentPage(index + 1);
              setActive(null);
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            setActive(null);
          }}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <IoChevronForward />
        </button>
      </div>
    </section>
  );
}