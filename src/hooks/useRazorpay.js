import { useState } from "react";
import { createPlanOrder, verifyPlanOrder } from "../services/orderService";

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const loadScript = () => {
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
  };

  const startPayment = async ({
    amount,
    userId,
    credits,
    name,
    description,
    prefill,
    notes,
    onSuccess,
    onFailure,
  }) => {
    try {
      setLoading(true);

      const sdkLoaded = await loadScript();
      if (!sdkLoaded) {
        throw new Error("Unable to load Razorpay SDK");
      }

      const order = await createPlanOrder({
        amount,
        userId,
      });
      if (!order.success) {
        onFailure?.({
          message: "Failed to create payment order",
        });
        return;
      }

      const options = {
        key: order.key,
        amount: order.order.amount,
        currency: order.order.currency,
        order_id: order.order.id,

        name,
        description,

        prefill,
        notes,

        method: {
          upi: true,
          card: true,
          netbanking: true,

          wallet: false,
          paylater: false,
          emi: false,
        },

        theme: {
          color: "#003a6b",
        },

        handler: async (data) => {
          try {
            const response = await verifyPlanOrder({
              razorpay_order_id: data.razorpay_order_id,
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_signature: data.razorpay_signature,
            });

            const verification = response.data;
            if (!verifyResponse.success) {
              throw new Error(verification.message || "Verification failed");
            }

            onSuccess?.(verification);
          } catch (error) {
            onFailure?.(error);
          }
        },

        modal: {
          ondismiss: () => {
            onFailure?.({
              message: "Payment cancelled",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        onFailure?.(response.error);
      });

      razorpay.open();
    } catch (error) {
      onFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    startPayment,
    loading,
  };
};

export default useRazorpay;