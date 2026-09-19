import api from "./axios";
import { store } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

api.interceptors.request.use(
  (config) => {
    const state = store.getState();

    const token = state.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default api;