import "./Input.css";
import { useState } from "react";
import { motion } from "framer-motion";

const InputField = ({
  icon,
  rightIcon,
  onRightIconClick,
  label,
  error,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="input-group" style={{ marginBottom: props.placeholder === "Password" ? "0rem" : "1rem" }}>
      {label && <label className="input-label">{label}</label>}

      <motion.div
        className={`input-wrapper ${
          focused ? "focused" : ""
        } ${error ? "error" : ""}`}
        animate={{
          scale: focused ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="input-icon">{icon}</div>

        <input
          {...props}
          className="input-field"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {rightIcon && (
          <button
            type="button"
            className="input-right-icon"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </button>
        )}
      </motion.div>

      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default InputField;