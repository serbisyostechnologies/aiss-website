import { useEffect, useRef, useState } from "react";
import "./SupportChatBot.css";
import { FaComments, FaTimes } from "react-icons/fa";

export default function SupportChatBot() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 How can I help you today?",
    },
  ]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
    }
  }, [isChatOpen]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isChatOpen]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Temporary bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Thank you for contacting us! Our support assistant will help you shortly. 😊",
        },
      ]);
    }, 800);

    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Window */}
      {isChatOpen && (
        <div className="support-chat-window">
          {/* Header */}
          <div className="support-chat-header">
            <div className="support-chat-header-info">
              <span className="support-chat-status"></span>
              <div>
                <h3>Support Assistant</h3>
                <p>We're here to help you!</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="support-chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.text}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form className="support-chat-footer" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
            />

            <button type="submit" disabled={!message.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        type="button"
        className={`chat-bot-btn show ${
          isScrolled ? "scrolled" : "original"
        } ${isChatOpen ? "chat-active" : ""}`}
        onClick={toggleChat}
        aria-label={isChatOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isChatOpen}
      >
        {isChatOpen ? <FaTimes size={25} /> : <FaComments size={25} />}
      </button>
    </>
  );
}