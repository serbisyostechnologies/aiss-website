import "./SupportChatBot.css";
import { FaComments } from "react-icons/fa";

export default function SupportChatBot() {
  return (
    <button
      type="button"
      className="chat-bot-btn show"
      aria-label="Support Chat Bot"
    >
      <FaComments size={25}/>
    </button>
  );
}