import axios from "axios";
import config from './environment';

const api = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  //baseURL: "http://192.168.1.2:8000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export default api;