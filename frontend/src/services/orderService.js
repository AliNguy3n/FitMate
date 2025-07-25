import { apiAuth, failResponse, successResponse } from "./baseApi";

const createOrder = async (order) => {
  try {
    const result = await apiAuth.post("/api/order/create", order);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};

const createPayment = async (payment) => {
  try {
    const result = await apiAuth.post("/api/order/create", payment);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};

const createOrderDetail = async (detail) => {
  try {
    const result = await apiAuth.post("/api/order-detail/create", detail);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
};

export { createOrder, createPayment, createOrderDetail };
