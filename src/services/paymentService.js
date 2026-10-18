import { createPlanOrder, verifyPlanOrder } from "./orderService";

export async function createOrder(plan) {
  const response = await createPlanOrder(plan);

  if (!response.success) {
    throw new Error(data.message || "Unable to process the payment");
  }

  return response;
}

export async function verifyOrder(paymentDetails) {
  const response = await verifyPlanOrder(paymentDetails);

  if (!response.success) {
    throw new Error(data.message || "Unable to process the payment");
  }

  return response;
}