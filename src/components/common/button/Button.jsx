import "./Button.css";

export default function Button({customClass = "", theme = "spinner", loading = false, disabled = false, children, ...props }) {
  return (
    <button className={`btn ${customClass}`} disabled={disabled} {...props}>
      {loading ? <span className={theme}></span> : children}
    </button>
  );
}