import "./Input.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../button/Button";

const Input = ({
  label,
  error,
  setShowPassword,
  showPassword,
  rightIcon = false,
  type = "text",
  textarea = false,
  rows = 5,
  className = "",
  sideButton = false,
  sideButtonText = "",
  onSideButtonClick,
  sideButtonLoading = false,
  sideButtonDisabled = false,
  ...props
}) => {
  return (
    <div className="contact__field">
      {textarea ? (
        <>
          <textarea
            rows={rows}
            className={`${className} ${error ? "error-input shake" : ""}`}
            {...props}
          />
          <label htmlFor={props.id}>{label}</label>
        </>
      ) : (
        <>
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type={type}
                className={`${className} ${error ? "error-input shake" : ""}`}
                {...props}
              />
              <label htmlFor={props.id}>{label}</label>
              {rightIcon && (
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {sideButton && (
              <Button
                className="input-side-button"
                onClick={onSideButtonClick}
                disabled={sideButtonDisabled}
                loading={sideButtonLoading}
              >
                {sideButtonText}
              </Button>
            )}
          </div>
        </>
      )}
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default Input;