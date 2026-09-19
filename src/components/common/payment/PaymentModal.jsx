import "./PaymentModal.css";
import { useEffect, useState } from "react";
import upiIcon from "../../../assets/icons/upi.png";
import cardIcon from "../../../assets/icons/card.png";
import bankIcon from "../../../assets/icons/bank.png";
import { toast } from "react-toastify";
import useRazorpay from "../../../hooks/useRazorpay";
import Button from "../button/Button";
import { updatePlan } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { setUserPlan, updateUser } from "../../../redux/slices/userSlice";

function PaymentModal({ currentPlan, setShowPayment, isOpen, user }) {
  const { startPayment, loading } = useRazorpay();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [oloading, setOloading] = useState(false);
  const dispatch = useDispatch();

  const plans = [
    {
      id: "101",
      title: "Free Trial",
      plan: "300 Credits",
      price: "0",
      button: "Start Free Trial",
      key: "free",
    },
    {
      id: "102",
      title: "Silver",
      plan: "400 Credits",
      price: "399",
      button: "Proceed to Pay",
      key: "silver",
    },
    {
      id: "103",
      title: "Gold",
      plan: "1000 Credits",
      price: "999",
      button: "Proceed to Pay",
      key: "gold",
    },
    {
      id: "104",
      title: "Platinum",
      plan: "1800 Credits",
      price: "1999",
      button: "Proceed to Pay",
      key: "platinum",
    },
  ];

  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  const handleProceed = () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    if (selectedPlan.id == "101") {
      updateUserPlan();
    } else {
      setShowPayment(false);
      startPayment({
        amount: parseInt(selectedPlan.price),
        userId: user._id,
        credits: parseInt(selectedPlan.plan.replaceAll("credits", "").trim()),
        name: "AISerbisyoStudio",
        description: "Purchase Credits",

        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile,
        },

        onSuccess: (data) => {
          setShowPayment(false);
          toast.success("Plan activated successfully");
        },

        onFailure: (error) => {
          toast.error(error.message || "Failed to make payemnt");
        },
      });
    }
  };

  const updateUserPlan = async () => {
    try {
      setOloading(true);

      const response = await updatePlan({ userId: user._id, code: "free" });
      setOloading(false);
      if (response.success) {
        dispatch(setUserPlan(response.plan));
        dispatch(
          updateUser({
            memberShipStatus: "free",
            availableCredits: response.plan.remainingCredits,
          }),
        );
        toast.success("Plan activated successfully");
        setShowPayment(false);
      } else {
        toast.error("Failed to activat plan");
      }
    } catch (error) {
      setOloading(false);
      toast.error(error.response?.data?.message || "Failed to activat plan");
    }
  };

  const planCardClicked = (plan) => {
    if (plan.key === currentPlan && currentPlan === "free") {
      return;
    }
    selectedPlan && selectedPlan.id == plan.id
      ? setSelectedPlan(null)
      : setSelectedPlan(plan);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h2>Simple, Transparent Pricing</h2>

          <Button className="close-btn" onClick={() => setShowPayment(false)}>
            ✕
          </Button>
        </div>

        <div className="wallet-balance">
          <span className="balance-text">Available Credits</span>
          <span className="balance-text">{user.availableCredits}</span>
        </div>

        {/* Plans */}
        <div className="plans-section">
          <h3>Select Plan</h3>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${
                  selectedPlan?.id === plan.id ? "selected" : ""
                } ${
                  currentPlan === "free" && plan.key === "free"
                    ? "disabled"
                    : ""
                }`}
                onClick={() => planCardClicked(plan)}
              >
                {currentPlan == plan.key && (
                  <span className="current-plan-badge">Active</span>
                )}

                <h4>{plan.title}</h4>

                <div className="plan-details">
                  <span>{plan.plan}</span>
                  <span>₹{plan.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
          Transaction History
        </Button>
        {selectedPlan && selectedPlan.key !== currentPlan && (
          <Button loading={oloading} onClick={() => handleProceed()}>
            {selectedPlan.button}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;