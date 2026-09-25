import "./VerifyEmailOtp.css";
import { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { verifyEmailOtp, verifyMobileOtp } from "../../../services/otpService";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

export default function VerifyEmailOtp({
  otpFrom,
  open,
  user,
  onResend,
  onCancel,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const email = user.email;
  const mobile = `+91${user.mobile}`;
  const userId = user._id;
  const dispatch = useDispatch();

  useEffect(() => {
    setOtp(["", "", "", "", "", ""]);
    if (!open) return;

    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  const inputs = useRef([]);

  if (!open) return null;

  const resetOtpFields = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    inputs.current[Math.min(pasted.length, 5)].focus();
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      let response;
      if (otpFrom == "EMAIL") {
        response = await verifyEmailOtp({ email, userId, otp: otp.join("") });
      } else {
        response = await verifyMobileOtp({ mobile, userId, otp: otp.join("") });
      }
      setLoading(false);
      if (response.success) {
        if (otpFrom === "MOBILE") {
          dispatch(updateUser({ isMobileVerified: true }));
          toast.success("Mobile number verified successfully");
        } else {
          dispatch(updateUser({ isEmailVerified: true }));
          toast.success("Email address verified successfully");
        }
        onCancel();
      } else {
        toast.success("Failed to verify email");
      }
    } catch (error) {
      setLoading(false);
      toast.success("Failed to verify email");
    }
  };

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>{otpFrom === "EMAIL" ? "Verify Email" : "Verify Mobile"}</h2>

        <p>
          Enter the 6-digit OTP sent to
          <br />
          <strong>{otpFrom === "EMAIL" ? email : mobile}</strong>
        </p>

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              placeholder="0"
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="one-time-code"
              disabled={loading}
            />
          ))}
        </div>

        <div className="otp-buttons">
          <Button onClick={verifyOTP} disabled={loading}>
            Verify
          </Button>

          <Button
            onClick={() => {
              resetOtpFields();
              onResend();
            }}
            disabled={timer > 0 || loading}
          >
            {timer > 0 ? `Resend (${formatTime(timer)})` : "Resend"}
          </Button>

          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
