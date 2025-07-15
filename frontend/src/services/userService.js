import api from "./baseApi.js";
// import { createApiResponse, createApiError } from "./baseApi.js";

// User Api Functions
export const createUser = async (userData) => {
  try {
    const result = await api.post("/identity/user/create", userData);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};
