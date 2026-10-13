import { useEffect, useState } from "react";
import "./SupportChatBot.css";
import { FaComments } from "react-icons/fa";

export default function SupportChatBot() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollContainer = event.target;

      if (scrollContainer.id === "website-scroll-container") {
        setIsScrolled(scrollContainer.scrollTop > 300);
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
  return (
    <button
      type="button"
      className={`chat-bot-btn show ${isScrolled ? "scrolled" : "original"}`}
      aria-label="Support Chat Bot"
    >
      <FaComments size={25} />
    </button>
  );
}
