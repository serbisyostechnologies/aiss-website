import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./MoveToTop.css";

export default function MoveToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollContainer = event.target;

      if (scrollContainer.id === "website-scroll-container") {
        setVisible(scrollContainer.scrollTop > 300);
      }
    };

    const scrollContainer = document.getElementById(
      "website-scroll-container"
    );

    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById(
      "website-scroll-container"
    );

    if (!scrollContainer) return;

    scrollContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Move to top"
    >
      <FaArrowUp />
    </button>
  );
}