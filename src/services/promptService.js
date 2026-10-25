import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const getPrompts = async (payload) => {
  const response = await api.post(ENDPOINTS.PROMPT.GET_PROMPTS, payload);

  return response.data;
};