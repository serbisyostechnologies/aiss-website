import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineEyeOff
} from "react-icons/hi";
import InputField from "../../../components/common/input/InputField";
import { register } from "../../../services/userService";
import { toast } from "react-toastify";

const RegistrationCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const clearClicked = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
    setErrors({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
  };

  const registerClicked = async () => {
    const validations = validateRegisterForm();
    setErrors(validations);

    if (Object.keys(validations).length === 0) {
      try {
        setLoading(true);

        const response = await register(formData);
        setLoading(false);
        clearClicked();
        if (response.success) {
          toast.success("Registered successfully");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to register");
      }
    }
  };

  const validateRegisterForm = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (formData.name?.trim() === "") {
      errors.name = "Please enter full name";
    }

    if (formData.mobile?.trim() === "") {
      errors.mobile = "Please enter mobile number";
    } else if (!mobileRegex.test(formData.mobile?.trim())) {
      errors.mobile =
        "Please enter 10 digit mobile number starting with 6/7/8/9";
    }

    if (formData.email?.trim() === "") {
      errors.email = "Please enter email address";
    } else if (!emailRegex.test(formData.email?.trim())) {
      errors.email = "Please enter valid email address";
    }

    if (formData.password?.trim() === "") {
      errors.password = "Please enter password";
    }
    return errors;
  };

  const getPasswordStrength = () => {
    if (formData.password.length === 0) {
      return "";
    }

    if (formData.password.length < 6) {
      return "Weak password";
    }

    if (
      formData.password.length >= 6 &&
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      return "Strong password";
    }

    return "Medium password";
  };

  const getStrengthColor = () => {
    if (formData.password.length < 6) {
      return "#ef4444";
    }

    if (
      formData.password.length >= 6 &&
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      return "#22c55e";
    }

    return "#f59e0b";
  };

  return (
    <>
      <div className="login-card__header">
        <div className="login-card__logo">AISerbisyosStudio</div>
        <h2>Create Account</h2>
        <p>
          Create your account to start generating stunning AI-powered images &
          videos.
        </p>
      </div>

      <div className="login-form">
        <InputField
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={loading}
        />

        <InputField
          type="text"
          name="mobile"
          placeholder="Mobile number"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          disabled={loading}
        />

        <InputField
          type="text"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={loading}
        />

        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          rightIcon={showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          onRightIconClick={() => setShowPassword(!showPassword)}
          error={errors.password}
          disabled={loading}
        />
        {!!formData.password && (
          <small
            className="register-error-text"
            style={{ color: getStrengthColor() }}
          >
            {getPasswordStrength()}
          </small>
        )}

        <div className="buttons-row" style={{ marginTop: "2rem" }}>
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="login-button"
            disabled={loading}
            onClick={registerClicked}
          >
            {loading ? (
              <>
                <span className="button-loader"></span>
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="login-button clear-button"
            disabled={loading}
            onClick={clearClicked}
          >
            Reset
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default RegistrationCard;