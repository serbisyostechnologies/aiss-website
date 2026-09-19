import { motion } from "framer-motion";
import {
  HiSparkles,
  HiLightningBolt,
  HiCheck,
  HiStar,
  HiBadgeCheck,
} from "react-icons/hi";
import { updatePlan } from "../../../services/userService";
import { useSelector } from "react-redux";
import { useState } from "react";
import FullScreenLoader from "../../../components/common/floader/FullScreenLoader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserPlan, updateUser } from "../../../redux/slices/userSlice";

const plans = [
  {
    id: 1,
    title: "Free",
    icon: <HiSparkles />,
    description: "Perfect for exploring our AI tools.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    button: "Get Started",
    popular: false,
    features: [
      "500 AI Credits / Month",
      "AI Image Generation",
      "Basic AI Models",
      "Community Support",
    ],
  },
  {
    id: 2,
    title: "Silver",
    icon: <HiLightningBolt />,
    description: "Perfect for beginners.",
    monthlyPrice: 499,
    yearlyPrice: 489,
    button: "Start Silver",
    popular: false,
    features: [
      "1000 AI Credits / Month",
      "Image Creation",
      "Image Collage Creation",
      "Standard Quality",
    ],
  },
  {
    id: 3,
    title: "Gold",
    icon: <HiBadgeCheck />,
    description: "Most popular choice.",
    monthlyPrice: 999,
    yearlyPrice: 979,
    button: "Get Started",
    popular: true,
    features: [
      "1999 AI Credits",
      "Image & Video Creation",
      "Image Editing",
      "Image Collage Creation",
      "HD Quality",
    ],
  },
  {
    id: 4,
    title: "Platinum",
    icon: <HiStar />,
    description: "For professionals.",
    monthlyPrice: 1999,
    yearlyPrice: 1959,
    button: "Get Started",
    popular: false,
    features: [
      "3999 AI Credits",
      "Image & Video Creation",
      "Image & Video Editing",
      "Image Collage Creation",
      "HD Quality",
    ],
  },
];

const PricingCards = ({ yearly }) => {
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const buySubscriptionPlan = async (plan) => {
    try {
      setLoading(true);
      const response = await updatePlan({
        userId: user._id,
        code: plan.title?.toLowerCase(),
      });
      setLoading(false);
      console.log(response);
      if (response.success) {
        dispatch(setUserPlan(response.plan));
        dispatch(
          updateUser({
            memberShipStatus: "free",
            availableCredits: response.plan.remainingCredits,
          }),
        );
        toast.success("Free plan activated successfully");
      } else {
        toast.error("Failed to activate plan");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to activate plan");
    }
  };

  return (
    <>
      <section className="pricing-cards">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            whileHover={{
              y: -10,
              scale: plan.popular ? 1.03 : 1.02,
            }}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}

            <div className="plan-icon">{plan.icon}</div>

            <h3 className="plan-name">{plan.title}</h3>

            <p className="plan-description">{plan.description}</p>

            <div className="plan-price">
              <h2>₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}</h2>

              <span>/month</span>
            </div>

            <div className="plan-divider" />

            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <HiCheck />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="plan-button"
              onClick={() => buySubscriptionPlan(plan)}
            >
              {plan.button}
            </motion.button>
          </motion.div>
        ))}
      </section>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default PricingCards;