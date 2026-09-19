import { useEffect, useState } from "react";
import "./LoadingStatus.css";

export default function LoadingStatus({ loadingMessages, headingText }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) =>
        prev === loadingMessages.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-status">
      <div className="loading-spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h3 className="loading-title">{headingText}</h3>

      <p className="loading-message">
        {loadingMessages[messageIndex]}
      </p>

      <div className="loading-progress">
        <div className="loading-progress-bar"></div>
      </div>
    </div>
  );
}