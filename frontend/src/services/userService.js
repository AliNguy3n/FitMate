import { api, apiAuth, successResponse, failResponse } from "./baseApi.js";
// import { createApiResponse, createApiError } from "./baseApi.js";

// User Api Functions
export const createUser = async (userData) => {
  try {
    const result = await api.post("/identity/user/create", userData);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};

export const loginUser = async (data) => {
  try {
    const result = await api.post("/auth/login", data, {
      headers: {
        "X-Device-Type": "MOBILE",
      },
    });
     return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const result = await apiAuth.get(`identity/user/username/${username}`);
     return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};
