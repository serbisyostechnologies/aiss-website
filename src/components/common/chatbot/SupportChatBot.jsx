import { useEffect, useRef, useState } from "react";
import "./SupportChatBot.css";
import { FaComments, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function SupportChatBot() {
  //const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL = "http://192.168.1.4:8000/api/v1";
  const user = useSelector((state) => state.user.profile);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userName = user?.name ?? "Guest";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const abortControllerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const getHeaders = () => ({
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning " + userName + "!☀️";
    }

    if (hour >= 12 && hour < 17) {
      return "Good afternoon " + userName + "!🌤️";
    }

    return "Good evening" + userName + "!🌙";
  };

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          text: `${getWelcomeMessage()}\nWelcome to AISerbisyosStudio!👋\nHow can I help you today?`,
        },
      ]);
    }
  }, [isChatOpen]);

  const createChatSession = async () => {
    if (sessionId) return sessionId;

    const response = await fetch(`${API_URL}/chatbot/sessions`, {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    const newSessionId = result.sessionId;

    if (!newSessionId) {
      throw new Error("Chat session ID not returned");
    }

    setSessionId(newSessionId);

    return newSessionId;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const activeSessionId = await createChatSession();
    const response = await fetch(
      `${API_URL}/chatbot/sessions/${activeSessionId}/messages/stream`,
      {
        method: "POST",
        headers: {
          ...getHeaders(),
          Accept: "text/event-stream",
        },
        credentials: "include",
        body: JSON.stringify({
          message: message,
        }),
      },
    );
    console.log("Response: ", response);
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