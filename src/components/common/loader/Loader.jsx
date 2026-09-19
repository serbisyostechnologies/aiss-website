import "./Loader.css";

export default function Loader({ fullScreen = false, show = true }) {
  return (
    show && (
      <div className={`loader-wrapper ${fullScreen ? "fullscreen" : ""}`}>
        <div className="loader medium"></div>
      </div>
    )
  );
}