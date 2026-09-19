import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const sendEmailOtp = async (payload) => {
  const response = await api.post(ENDPOINTS.OTP.SEND_EMAIL_OTP, payload);

  return response.data;
};

export const verifyEmailOtp = async (payload) => {
  const response = await api.post(ENDPOINTS.OTP.VERIFY_EMAIL_OTP, payload);

  return response.data;
};

export const sendMobileOtp = async (payload) => {
  const response = await api.post(ENDPOINTS.OTP.SEND_MOBILE_OTP, payload);

  return response.data;
};

export const verifyMobileOtp = async (payload) => {
  const response = await api.post(ENDPOINTS.OTP.VERIFY_MOBILE_OTP, payload);

  return response.data;
};