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
import { createOrder, verifyOrder } from "../../../services/paymentService";
import ConfirmPopup from "../../../components/common/confirm/ConfirmPopup";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

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
    credits: 500,
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
    credits: 1000,
    features: [
      "1000 AI Credits / Month",
      "Image Creation",
      "Image Editing",
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
    credits: 2000,
    features: [
      "2000 AI Credits",
      "Image Creation",
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
    credits: 4000,
    features: [
      "4000 AI Credits",
      "Image Creation",
      "Image Editing",
      "Image Collage Creation",
      "HD Quality",
    ],
  },
];

const PricingCards = ({ yearly }) => {
  const user = useSelector((state) => state.user.profile);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const dispatch = useDispatch();

  const buySubscriptionPlan = (plan) => {
    setSelectedPlan(plan);
    if (!user) {
      toast.error("Please login to subscribe to a plan");
      return;
    }

    if( user.memberShipStatus !== "free" && user.memberShipStatus !== "new" ) {
      setShowConfirm(true);
      return;
    }

    if (plan.title.toLowerCase() == "free") {
      freePlanSubscribe(plan);
    } else {
      subscribeToPaidPlan(plan);
    }
  };

  const subscribeToPaidPlan = async (plan) => {
    setShowConfirm(false);
    const paymentPlan = {
      name: plan.title,
      amount: yearly ? plan.yearlyPrice : plan.monthlyPrice,
      currency: "INR",
      durationDays: 30,
      credits: plan.credits,
      userId: user._id,
    };

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setLoading(false);
        toast.error("Unable to process the payment");
        return;
      }

      setLoading(true);
      const result = await createOrder(paymentPlan);

      const options = {
        key: result.keyId,
        amount: result.order.amount / 100,
        currency: result.order.currency,
        name: "AISerbisyosStudio",
        description: `${plan.title} Plan`,
        order_id: result.order.id,
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI",
                instruments: [
                  {
                    method: "upi",
                    flows: ["intent", "qr"], // Explicitly prioritises intent deep links
                  },
                ],
              },
            },
            sequence: ["block.upi", "block.card"],
          },
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.mobile || "",
        },

        theme: {
          color: "#003a6b",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        handler: async (response) => {
          try {
            setLoading(true);
            await verifyOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setLoading(false);

            toast.success("Plan subscribed successfully");
            freePlanSubscribe(plan, false);
          } catch (error) {
            setLoading(false);
            toast.error(
              `Payment failed. Check your payment history before trying again.`,
            );
          } finally {
            setLoading(false);
          }
        },
      };

      const checkout = new window.Razorpay(options);

      checkout.on("payment.failed", (response) => {
        setMessage(
          response.error?.description || "Payment failed. Please try again.",
        );
        setLoading(false);
      });

      checkout.open();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Unable to process the payment");
    }
  };

  const freePlanSubscribe = async (plan, showConfirmation = true) => {
    try {
      setLoading(true);
      const response = await updatePlan({
        userId: user._id,
        code: plan.title?.toLowerCase(),
      });
      setLoading(false);
      if (response.success) {
        dispatch(setUserPlan(response.plan));
        dispatch(
          updateUser({
            memberShipStatus: plan.title.toLowerCase(),
            availableCredits: response.plan.remainingCredits,
          }),
        );
        setSelectedPlan(null);
        if (showConfirmation) {
          toast.success("Free plan activated successfully");
        }
      } else {
        toast.error("Failed to activate plan");
      }
    } catch (error) {
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

            <div
              className={`plan-icon ${user && user.memberShipStatus == plan.title.toLowerCase() ? "active" : ""}`}
            >
              {plan.icon}
            </div>

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
              className={`plan-button ${user && user.memberShipStatus === plan.title.toLowerCase() ? "disabled" : ""}`}
              onClick={() => buySubscriptionPlan(plan)}
              disabled={
                user && user.memberShipStatus === plan.title.toLowerCase()
              }
            >
              {plan.button}
            </motion.button>
          </motion.div>
        ))}
      </section>
      {loading && <FullScreenLoader />}

      <ConfirmPopup
        isOpen={showConfirm}
        message={`You already have an active subscription plan. If you continue with this purchase, your new plan may affect your current subscription..\n\nAre you sure you want to proceed with subscribing to a new plan?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => subscribeToPaidPlan(selectedPlan)}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default PricingCards;