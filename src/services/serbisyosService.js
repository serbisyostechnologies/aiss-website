import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";

export const generateAiPrompt = async (payload) => {
  const response = await api.post(
    ENDPOINTS.SERBISYOS_AI.GENERATE_PROMPT,
    payload,
  );

  return response.data;
};

export const generateAiImage = async (payload) => {
  const response = await api.post(ENDPOINTS.SERBISYOS_AI.CREATE_IMAGE, payload);

  return response.data;
};

export const editAiImage = async (payload) => {
  const response = await api.post(ENDPOINTS.SERBISYOS_AI.EDIT_IMAGE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createAiImageCollage = async (payload) => {
  const response = await api.post(ENDPOINTS.SERBISYOS_AI.CREATE_IMAGE_COLLAGE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};