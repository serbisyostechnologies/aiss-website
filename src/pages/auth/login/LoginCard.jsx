import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import InputField from "../../../components/common/input/InputField";
import { login } from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login as reduxLogin } from "../../../redux/slices/authSlice";
import { setUser, setUserPlan, setUserUsage } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailMobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailMobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearClicked = () => {
    setFormData({
      emailMobile: "",
      password: "",
    });
    setErrors({
      emailMobile: "",
      password: "",
    });
  };

  const loginClicked = async () => {
    const validations = validateLoginForm();
    setErrors(validations);

    if (Object.keys(validations).length === 0) {
      try {
        setLoading(true);

        const response = await login(formData);
        setLoading(false);
        clearClicked();
        if (response.success) {
          toast.success("Logged in successfully");
          dispatch(reduxLogin());
          dispatch(setUser(response.user));
          dispatch(setUserPlan(response.plan));
          dispatch(setUserUsage(response.usage));
          navigate("/", { replace: true });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to login");
      }
    }
  };

  const validateLoginForm = () => {
    const errors = {};

    const validateEmailOrMobile = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9][0-9]{9}$/;
      return emailRegex.test(value) || mobileRegex.test(value);
    };

    if (formData.emailMobile?.trim() === "") {
      errors.emailMobile = "Please enter mobile number/email address";
    } else if (!validateEmailOrMobile(formData.emailMobile)) {
      errors.emailMobile =
        "Please enter valid email address or 10 digit mobile number starting with 6/7/8/9";
    }

    if (formData.password?.trim() === "") {
      errors.password = "Please enter password";
    }
    return errors;
  };

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

  return (
    <>
      <div className="login-card__header">
        <div className="login-card__logo">AISerbisyosStudio</div>
        <h2>Welcome Back</h2>
        <p>Sign in to continue creating amazing AI-powered images & videos.</p>
      </div>

      <div className="login-form">
        <InputField
          type="text"
          name="emailMobile"
          placeholder="Mobile number/email address"
          value={formData.emailMobile}
          onChange={handleChange}
          error={errors.emailMobile}
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

        <div className="login-options">
          <button type="button" className="forgot-password">
            Forgot Password?
          </button>
        </div>

        <div className="buttons-row">
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
            onClick={loginClicked}
          >
            {loading ? (
              <>
                <span className="button-loader"></span>
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
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

export default LoginCard;