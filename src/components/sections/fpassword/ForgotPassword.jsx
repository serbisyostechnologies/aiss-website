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

const ForgotPassword = ({ open, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [mobileOtp, setMobileOtp] = useState(["", "", "", "", "", ""]);

  const emailRefs = useRef([]);
  const mobileRefs = useRef([]);

  useEffect(() => {
    setOtpSent(false);
  }, [open]);

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

              <span className="forgot-password-modal__spark spark-one">✦</span>

              <span className="forgot-password-modal__spark spark-two">✦</span>

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
              <p>We have sent 6-digit OTPs to your email and mobile number</p>
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

                      <button className="otp-resend">Resend OTP</button>
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

                      <button className="otp-resend">Resend OTP</button>
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
                <div className="forgot-password-modal__input">
                  <HiOutlineEnvelope />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                  />
                </div>

                <div className="forgot-password-modal__input">
                  <HiOutlineDevicePhoneMobile />
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    autoComplete="off"
                  />
                </div>
              </>
            )}

            {otpSent ? (
              <button
                type="button"
                className="forgot-password-modal__submit"
                onClick={() => setOtpSent(true)}
              >
                Verify OTP
              </button>
            ) : (
              <button
                type="button"
                className="forgot-password-modal__submit"
                onClick={() => setOtpSent(true)}
              >
                Send OTP
                <HiOutlineArrowRight />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ForgotPassword;