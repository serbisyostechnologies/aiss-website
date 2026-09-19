import { useState } from "react";

export default function useLoginValidation(initialState, validate, t) {
  const [loginData, setLoginData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
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

    const validationErrors = runValidation(loginData);

    if (Object.keys(validationErrors).length === 0) {
      callback(loginData);
    }
  };

  const clearLoginForm = () => {
    setLoginData(initialState);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return {
    loginData,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearLoginForm,
    setLoginData,
  };
}
