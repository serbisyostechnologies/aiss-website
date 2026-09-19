import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const createNewContact = async (payload) => {
  const response = await api.post(
    ENDPOINTS.CONTACT.CREATE,
    payload
  );

  return response.data;
};