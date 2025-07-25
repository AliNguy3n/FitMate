import api from "./baseApi.js";
// import { createApiResponse, createApiError } from "./baseApi.js";

// User Api Functions
export const createUser = async (userData) => {
  try {
    const result = await api.post("/identity/user/create", userData);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data || { Exception: error.message || "Unknown error" },
    };
  }
};
export const getUserByUsername = async (username) => {
  try {
    const result = await api.get(`/identity/user/username/${username}`);
    return {
      success: true,
      data: result.data, // chứa user info + role
    };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data || { Exception: error.message },
    };
  }
};
