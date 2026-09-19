import { useState } from "react";

export default function useContactValidation(initialState, validate, t) {
  const [contact, setContact] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toTitleCase = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: name == "name" ? toTitleCase(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const runValidation = (currentValues) => {
    const validationErrors = validate(currentValues, t);
    setErrors(validationErrors || {});
    return validationErrors || {};
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = runValidation(contact);

    if (Object.keys(validationErrors).length === 0) {
      callback(contact);
    }
  };

  const clearContactForm = () => {
    setContact(initialState);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return {
    contact,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearContactForm,
    setContact,
  };
}