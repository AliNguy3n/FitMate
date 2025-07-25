// services/authService.js
import api from "./baseApi";

export const loginUser = async (credentials) => {
  try {
    const result = await api.post("/auth/login", credentials, {
      headers: {
        "X-Device-Type": "WEB", // hoặc "MOBILE", tuỳ bạn xác định
      },
    });

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data || { Exception: error.message },
    };
  }
};

export const logoutUser = async (refreshToken) => {
  try {
    const result = await api.post("/auth/logout", { refreshToken });
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data || { Exception: error.message },
    };
  }
};