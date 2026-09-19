import "./Popup.css";
import Button from "@/components/common/button/Button";

const Popup = ({
  open,
  children,
  primaryButton,
  secondaryButton,
  onPrimaryClick,
  onSecondaryClick,
  closeOnOverlay = true,
}) => {
  if (!open) return null;

  return (
    <div
      className="popup-overlay"
      onClick={closeOnOverlay ? onSecondaryClick : undefined}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content">{children}</div>

        <div className="popup-actions">
          <Button customClass="popup-btn" onClick={onPrimaryClick}>
            {primaryButton}
          </Button>
          <Button customClass="popup-btn" onClick={onSecondaryClick}>
            {secondaryButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;