import { useSelector } from "react-redux";
import "./PremiumCard.css";
import { IoTrophy, IoChevronForward, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import UpgradeButton from "../../common/ubutton/UpgradeButton";

function PremiumCard() {
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);
  const currentPlan = plan.hasOwnProperty("planId") ? plan.planId.code : plan.planName;
  const { t } = useTranslation();
  const [showCard, setShowCard] = useState(true);
  const credits = user.availableCredits;

  const membershipStatus = user?.memberShipStatus;
  const title = t(`home.card.${membershipStatus}.title`);
  const subTitle = t(`home.card.${membershipStatus}.subtitle`, {
    credits,
  });
  const button = t(`home.card.${membershipStatus}.button`);

  const freeTrialPlan = {
    features: t("home.plan.cards.one.features", { returnObjects: true }),
    price: t("home.plan.cards.one.price"),
    period: t("home.plan.cards.one.period"),
  };

  return (
    <>
      {showCard && (
        <div className="premium-card">
        <button
          className="premium-card__close"
          onClick={() => setShowCard(false)}
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>
        <div className="premium-card__icon">
          <IoTrophy size={24} />
        </div>

        <div className="premium-card__content">
          <h3 className="premium-card__title">{title}</h3>

          <p className="premium-card__subtitle">{subTitle}</p>
        </div>

        <UpgradeButton
          currentPlan={currentPlan || ""}
          className="premium-card__button" user={user}>
          {button}
          <IoChevronForward size={18} />
        </UpgradeButton>
      </div>
      )}
    </>
  );
}

export default PremiumCard;