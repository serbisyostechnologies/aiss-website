import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const createPlanOrder = async (payload) => {
  const response = await api.post(
    ENDPOINTS.ORDER.CREATE,
    payload
  );

  return response.data;
};

export const verifyPlanOrder = async (payload) => {
  const response = await api.post(
    ENDPOINTS.ORDER.VERIFY,
    payload
  );

  return response.data;
};