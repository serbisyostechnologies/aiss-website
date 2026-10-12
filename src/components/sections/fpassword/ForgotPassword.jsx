import "./ForgotPassword.css";
import { createPortal } from "react-dom";
import {
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { validateEmailMobileService } from "../../../services/authService";
import FullScreenLoader from "../../common/floader/FullScreenLoader";
import Button from "../../common/button/Button";

const ForgotPassword = ({ open, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [mobileOtp, setMobileOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [form, setForm] = useState({
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    mobile: "",
    email: "",
  });
  const [otpErrors, setOtpErrors] = useState({
    mobile: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRefs = useRef([]);
  const mobileRefs = useRef([]);

  useEffect(() => {
    setOtpSent(false);
    setOtpVerified(false);
    setEmailOtp(["", "", "", "", "", ""]);
    setMobileOtp(["", "", "", "", "", ""]);
    setForm({
      mobile: "",
      email: "",
    });
    setErrors({
      mobile: "",
      email: "",
    });
  }, [open]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(60);
  };

  if (!open) return null;

  const handleOtpChange = (value, index, otp, setOtp, refs) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index, otp, refs) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const sendEmailMobileOtp = async (e) => {
    e.preventDefault();

    const validations = validateLoginForm();
    setErrors(validations);
    setError("");

    if (Object.keys(validations).length === 0) {
      try {
        setLoading(true);
        const response = await validateEmailMobileService(form);
        setLoading(false);
        if (response.success) {
          setOtpSent(true);
          startResendTimer();
        } else {
          setError(response.message);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error.response?.data?.message ||
            "Something went wrong. Please try again later.",
        );
      }
    }
  };

  const verifyOtps = () => {
    const isEmailOtpComplete = emailOtp.every((digit) => digit.trim() !== "");
    const isMobileOtpComplete = mobileOtp.every((digit) => digit.trim() !== "");
  };

  const validateLoginForm = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (form.mobile?.trim() === "") {
      errors.mobile = "Please enter mobile number";
    } else if (!mobileRegex.test(form.mobile?.trim())) {
      errors.mobile =
        "Please enter 10 digit mobile number starting with 6/7/8/9";
    }

    if (form.email?.trim() === "") {
      errors.email = "Please enter email address";
    } else if (!emailRegex.test(form.email?.trim())) {
      errors.email = "Please enter valid email address";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const renderOtpInputs = (otp, setOtp, refs) => {
    return (
      <div className="forgot-otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className={`otp-input ${index === 0 ? "otp-input--active" : ""}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) =>
              handleOtpChange(event.target.value, index, otp, setOtp, refs)
            }
            onKeyDown={(event) => handleKeyDown(event, index, otp, refs)}
            autoComplete="one-time-code"
          />
        ))}
      </div>
    );
  };

  const modal = (
    <>
      <div className="forgot-password-modal-overlay">
        <div
          className="forgot-password-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="forgot-password-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <HiOutlineX />
          </button>

          <div className="forgot-password-modal__decoration forgot-password-modal__decoration--top" />
          <div className="forgot-password-modal__decoration forgot-password-modal__decoration--bottom" />

          <div className="forgot-password-modal__content">
            {!otpSent && (
              <div className="forgot-password-modal__lock">
                <div className="forgot-password-modal__lock-glow" />

                <span className="forgot-password-modal__spark spark-one">
                  ✦
                </span>

                <span className="forgot-password-modal__spark spark-two">
                  ✦
                </span>

                <span className="forgot-password-modal__spark spark-three">
                  ✦
                </span>

                <div className="forgot-password-modal__lock-body">
                  <div className="forgot-password-modal__lock-shackle" />
                  <HiOutlineLockClosed />
                </div>
              </div>
            )}

            <div className="forgot-password-modal__heading">
              {otpSent ? (
                <>
                  <h1>Verify Your Identity</h1>
                  <p>
                    We have sent 6-digit OTPs to your email and mobile number
                  </p>
                </>
              ) : (
                <>
                  <h1>Forgot Password?</h1>
                  <p>
                    Enter your email and mobile number to verify
                    <br />
                    your identity and reset your password.
                  </p>
                </>
              )}
            </div>

            <form className="forgot-password-modal__form">
              {otpSent ? (
                <>
                  <div className="otp-verification">
                    {/* Email OTP */}
                    <div className="otp-card">
                      <div className="otp-card__header">
                        <div className="otp-card__title">
                          <HiOutlineEnvelope className="otp-card__icon" />
                          <span>Email OTP</span>
                        </div>

                        <button
                          type="button"
                          className={`otp-resend ${resendTimer > 0 ? "danger" : "info"}`}
                          disabled={resendTimer > 0}
                        >
                          {resendTimer > 0
                            ? `Resend OTP in ${resendTimer} seconds`
                            : `Resend OTP`}
                        </button>
                      </div>

                      <p className="otp-card__description">
                        Enter the 6-digit code sent to your email address.
                      </p>

                      {renderOtpInputs(emailOtp, setEmailOtp, emailRefs)}
                    </div>

                    {/* Mobile OTP */}
                    <div className="otp-card">
                      <div className="otp-card__header">
                        <div className="otp-card__title">
                          <HiOutlineDevicePhoneMobile className="otp-card__icon" />
                          <span>Mobile OTP</span>
                        </div>

                        <button
                          type="button"
                          className={`otp-resend ${resendTimer > 0 ? "danger" : "info"}`}
                          disabled={resendTimer > 0}
                        >
                          {resendTimer > 0
                            ? `Resend OTP in ${resendTimer} seconds`
                            : `Resend OTP`}
                        </button>
                      </div>

                      <p className="otp-card__description">
                        Enter the 6-digit code sent to your mobile number.
                      </p>

                      {renderOtpInputs(mobileOtp, setMobileOtp, mobileRefs)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="forgot-password-modal__input-group">
                    <div className="forgot-password-modal__input">
                      <HiOutlineEnvelope />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <span
                        className="input-error"
                        style={{ textAlign: "start", marginBottom: "1rem" }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="forgot-password-modal__input-group">
                    <div className="forgot-password-modal__input">
                      <HiOutlineDevicePhoneMobile />
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        autoComplete="off"
                        value={form.mobile}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.mobile && (
                      <span
                        className="input-error"
                        style={{ textAlign: "start", marginBottom: "1rem" }}
                      >
                        {errors.mobile}
                      </span>
                    )}
                    {error && (
                      <span
                        className="input-error"
                        style={{ textAlign: "start", marginBottom: "1rem" }}
                      >
                        {error}
                      </span>
                    )}
                  </div>
                </>
              )}

              {otpSent ? (
                <button
                  type="button"
                  className="forgot-password-modal__submit"
                  onClick={verifyOtps}
                >
                  Verify OTP
                </button>
              ) : (
                <Button
                  disabled={loading}
                  className="forgot-password-modal__submit"
                  onClick={sendEmailMobileOtp}
                  loading={loading}
                >
                  Send OTP
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
      {loading && <FullScreenLoader />}
    </>
  );

  return createPortal(modal, document.body);
};

export default ForgotPassword;
