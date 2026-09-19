import "./ConfirmPopup.css";

export default function ConfirmPopup({
  isOpen,
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-popup">
        <p>{message}</p>
        <div className="confirm-actions">
          <button
            className="confirm-btn confirm-btn-primary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="confirm-btn cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}