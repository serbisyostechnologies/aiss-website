import { useState } from "react";
import "./TermsConditions.css";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../../hooks/usePageTitle";

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children.type === "refund" ? (
          <>
            <p>{children.intro}</p>

            <h4>{children.eligibleTitle}</h4>
            <ul>
              {children.eligible.map((_, i) => (
                <li key={i}>{_}</li>
              ))}
            </ul>

            <h4>{children.notEligibleTitle}</h4>
            <ul>
              {children.notEligible.map((_, i) => (
                <li key={i}>{_}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{children.content}</p>
        )}
      </div>
    </div>
  );
}

export default function TermsConditions() {
  const { t } = useTranslation();
  usePageTitle(t("terms.pageTitle"));
  const sections = [
    {
      title: "1. Eligibility",
      content:
        "You must be at least 18 years old or have parental consent to use our services.",
    },
    {
      title: "2. User Account",
      content:
        "You are responsible for maintaining your account credentials and all activities under your account.",
    },
    {
      title: "3. Services",
      content:
        "We provide AI image generation, video generation, editing, collage creation, and analysis services.",
    },
    {
      title: "4. Credits & Subscription",
      content:
        "Credits are non-transferable, may expire according to your plan, and are deducted when processing begins.",
    },
    {
      title: "5. Payments",
      content:
        "Payments are processed through secure payment providers. Applicable taxes including GST may apply.",
    },
    {
      title: "6. Refund Policy",
      type: "refund",
      intro:
        "Digital purchases are generally non-refundable because services are delivered immediately.",
      eligibleTitle: "Refunds may be considered in the following cases:",
      eligible: [
        "Payment deducted but credits not received.",
        "Duplicate payment.",
        "Technical failure preventing service delivery.",
        "Refund required under applicable Indian law.",
      ],
      notEligibleTitle: "No refunds for:",
      notEligible: [
        "Consumed credits.",
        "Incorrect prompts.",
        "Change of mind.",
        "Dissatisfaction with AI results.",
      ],
    },
    {
      title: "7. User Content",
      content:
        "You retain ownership of uploaded content while granting us permission to process it for providing the requested service.",
    },
    {
      title: "8. AI Generated Content",
      content:
        "AI-generated outputs may contain inaccuracies and should be reviewed before professional or commercial use.",
    },
    {
      title: "9. Prohibited Activities",
      content:
        "Users must not upload illegal, infringing, malicious, or abusive content.",
    },
    {
      title: "10. Intellectual Property",
      content:
        "Our software, branding, and platform remain our intellectual property.",
    },
    {
      title: "11. Privacy",
      content:
        "Your use of our platform is also governed by our Privacy Policy.",
    },
    {
      title: "12. Limitation of Liability",
      content:
        "Our liability is limited to the maximum extent permitted by Indian law.",
    },
    {
      title: "13. Governing Law",
      content: "These Terms are governed by the laws of India.",
    },
    {
      title: "14. Contact Us",
      content:
        "For questions regarding these Terms, please contact our support team.",
    },
  ];
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
        <h1>Terms & Conditions</h1>

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