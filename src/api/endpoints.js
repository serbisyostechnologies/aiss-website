const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    UPDATE_PASSWORD: "/auth/update-password",
  },

  USER: {
    REGISTER: "/user/register",
    UPDATE_LANGUAGE: "/user/update-language",
    UPDATE_PLAN: "/user/update-plan",
    GET_PROFILE: "/user/get-profile",
    UPDATE_PHOTO: "/user/upload-photo",
    REMOVE_PHOTO: "/user/remove-photo",
  },

  ORDER: {
    CREATE: "/order/create-payment-order",
    VERIFY: "/order/create-payment-order",
  },

  CONTACT: {
    CREATE: "/contact/create-new-contact",
  },

  OTP: {
    SEND_EMAIL_OTP: "/otp/send-email-otp",
    VERIFY_EMAIL_OTP: "/otp/verify-email-otp",
    SEND_MOBILE_OTP: "/otp/send-mobile-otp",
    VERIFY_MOBILE_OTP: "/otp/verify-mobile-otp",
  },

  SERBISYOS_AI: {
    GENERATE_PROMPT: "/serbisyos/generate-prompt",
    CREATE_IMAGE: "/serbisyos/generate-image",
    EDIT_IMAGE: "/serbisyos/edit-image",
    CREATE_IMAGE_COLLAGE: "/serbisyos/create-image-collage"
  },

  STATISTICS: {
    PROFILE_STATS: "/statistics/get-profile-stats",
    TRANSACTION_HISTORY: "/statistics/get-transaction-history"
  }
};

export default ENDPOINTS;