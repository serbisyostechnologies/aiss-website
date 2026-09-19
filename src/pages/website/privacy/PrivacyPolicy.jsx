import { useState, useTransition } from "react";
import "./PrivacyPolicy.css";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../../hooks/usePageTitle";
import { privacyPolicySections } from "./Sections";

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children.type === "paragraph" && <p>{children.text}</p>}

        {children.type === "list" && (
          <ul>
            {children.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  usePageTitle("Privacy Policy | AISerbisyosStudio");
  const sections = privacyPolicySections;
  const [openIndex, setOpenIndex] = useState(0);
  const location = useLocation();
  const from = location?.state?.from;

  return (
    <section className="privacy">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p className="last-updated">Last Updated: June 27, 2026</p>

        <p className="intro">
          Your privacy is important to us. This policy explains how we collect,
          use, store, and protect your information while using our AI-powered
          image and video generation, editing, collage, and analysis services.
        </p>

        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            {section}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}