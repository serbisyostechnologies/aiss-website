import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
} from "react-icons/hi";
import "./Contact.css";
import InputField from "../../../components/common/input/InputField";
import { createNewContact } from "../../../services/contactService.js";
import { toast } from "react-toastify";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
  agree: false
};

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

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const submitContactForm = async () => {
    const validations = validateLoginForm();
    setErrors(validations);

    if (Object.keys(validations).length === 0) {
      try {
        setLoading(true);
        const response = await createNewContact(formData);
        setLoading(false);
        if (response.success) {
          resetButtonClicked();
          toast.success(
            "Message sent successfully. Our team will get back to you soon!",
          );
        } else {
          toast.error("Failed to send message!");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to send message!");
      }
    }
  };

  const validateLoginForm = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (formData.name?.trim() === "") {
      errors.name = "Please enter full name";
    }

    if (formData.email?.trim() === "") {
      errors.email = "Please enter email address";
    } else if (!emailRegex.test(formData.email?.trim())) {
      errors.email = "Please enter valid email address";
    }

    if (
      formData.mobile?.trim() !== "" &&
      !mobileRegex.test(formData.mobile?.trim())
    ) {
      errors.mobile =
        "Please enter 10 digit mobile number starting with 6/7/8/9";
    }

    if (formData.subject?.trim() === "") {
      errors.subject = "Please enter message subject";
    }

    if (formData.message?.trim() === "") {
      errors.message = "Please enter your message";
    }

    if (!formData.agree) {
      errors.agree = "Please check privacy & policy consent";
    }
    return errors;
  };

  const resetButtonClicked = () => {
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <motion.div
      className="contact-form-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="contact-form-header">
        <span className="section-badge">Send Message</span>

        <h2>Let's Talk</h2>

        <p>
          Tell us about your project and we'll get back to you as soon as
          possible.
        </p>
      </div>

      <div className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              <HiOutlineUser />
              Full Name *
            </label>

            <InputField
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <HiOutlineMail />
              Email *
            </label>

            <InputField
              type="text"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <HiOutlinePhone />
              Phone
            </label>

            <InputField
              type="text"
              name="mobile"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            <HiOutlineDocumentText />
            Subject *
          </label>

          <InputField
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            error={errors.subject}
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <HiOutlineDocumentText />
            Message *
          </label>

          <textarea
            className={errors.message ? "error" : ""}
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us about your query..."
            value={formData.message}
            onChange={handleChange}
            maxLength={500}
            autoComplete="new-password"
          />
          {errors.message && (
            <span className="input-error">{errors.message}</span>
          )}
          <span className="character-count">{formData.message.length}/500</span>
        </div>

        <div style={{ display: 'flex', gap: '.5rem', flexDirection: 'column' }}>
          <div className="checkbox-group">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />

          <label htmlFor="agree">
            I accept Privacy Policy and consent to being contacted
            regarding my inquiry.
          </label>
          </div>
          {errors.agree && (
            <span className="input-error">{errors.agree}</span>
          )}
        </div>

        <div className="form-footer">
          <div className="form-note">We'll respond within 24 hours.</div>

          <div className="button-row">
            <motion.button
              type="submit"
              className={`contact-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={submitContactForm}
            >
              {loading ? (
                <>
                  <div className="contact-loader"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </motion.button>
            <motion.button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={resetButtonClicked}
            >
              Reset
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;