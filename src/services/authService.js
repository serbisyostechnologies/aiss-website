import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const login = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.LOGIN,
    payload
  );

  return response.data;
};

export const logout = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.LOGOUT,
    payload
  );

  return response.data;
};

export const updatePassword = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.UPDATE_PASSWORD,
    payload
  );

  return response.data;
};

export const sendEmailOtp = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.SEND_EMAIL_OTP,
    payload
  );

  return response.data;
};