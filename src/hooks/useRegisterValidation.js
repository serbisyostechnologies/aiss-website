import { useState } from "react";

export default function useFormValidation(initialState, validate, t) {
  const [registerData, setRegisterData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
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

    const validationErrors = runValidation(registerData);

    if (Object.keys(validationErrors).length === 0) {
      callback(registerData);
    }
  };

  const clearRegisterForm = () => {
    setRegisterData(initialState);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return {
    registerData,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearRegisterForm,
    setRegisterData,
  };
}