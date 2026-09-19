import "./PricingPlans.css";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function PricingPlans({ t }) {
  const userPlan = useSelector((state) => state.user.plan);
  const planName = userPlan ? userPlan.planId.code : "";

  const plans = [
    {
      name: t("home.plan.cards.one.name"),
      subtitle: t("home.plan.cards.one.subtitle"),
      price: t("home.plan.cards.one.price"),
      period: t("home.plan.cards.one.period"),
      features: t("home.plan.cards.one.features", { returnObjects: true }),
      button: t("home.plan.cards.one.button"),
      popular: false,
      code: "free",
    },
    {
      name: t("home.plan.cards.two.name"),
      subtitle: t("home.plan.cards.two.subtitle"),
      price: t("home.plan.cards.two.price"),
      period: t("home.plan.cards.two.period"),
      features: t("home.plan.cards.two.features", { returnObjects: true }),
      button: t("home.plan.cards.two.button"),
      popular: false,
    },
    {
      name: t("home.plan.cards.three.name"),
      subtitle: t("home.plan.cards.three.subtitle"),
      price: t("home.plan.cards.three.price"),
      period: t("home.plan.cards.three.period"),
      features: t("home.plan.cards.three.features", { returnObjects: true }),
      button: t("home.plan.cards.three.button"),
      popular: true,
    },
    {
      name: t("home.plan.cards.four.name"),
      subtitle: t("home.plan.cards.four.subtitle"),
      price: t("home.plan.cards.four.price"),
      period: t("home.plan.cards.four.period"),
      features: t("home.plan.cards.four.features", { returnObjects: true }),
      button: t("home.plan.cards.four.button"),
      popular: false,
    },
  ];

  const checkUserPlan = (btnName) => {
    if (btnName === "Start Free Trial" && planName === "free") {
      return true;
    }
    return false;
  };

  return (
    <section className="pricing-section">
      <span className="section-tag">{t("home.plan.title")}</span>

      <h2 className="pricing-title">{t("home.plan.heading")}</h2>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card
          ${plan.popular ? "popular-card" : ""}
          ${plan.code === planName ? "active-plan-card" : ""}`}
          >
            {plan.popular && (
              <div className="popular-badge">{t("home.plan.popular")}</div>
            )}

            {plan.code === planName && (
              <div className="current-plan-badge">
                {t("home.plan.currentPlan")}
              </div>
            )}

            <h3>{plan.name}</h3>

            <p className="plan-subtitle">{plan.subtitle}</p>

            <div className="plan-price">
              {plan.price}
              <span>{plan.period}</span>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <IoCheckmarkOutline />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              disabled={checkUserPlan(plan.button)}
              className={`plan-button ${plan.popular ? "popular-button" : ""}`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}