import axios from "axios";
import api from "./baseApi";

const API_BASE = `/api/payment`;

export const createPayment = async (data) => {
  return await api.post(`${API_BASE}/create`, data);
};

export const getAllPayments = async () => {
  return await api.get(`${API_BASE}`);
};

export const getPaymentById = async (id) => {
  return await api.get(`${API_BASE}/${id}`);
};

export const getPaymentByTransactionCode = async (code) => {
  return await api.get(`${API_BASE}/transaction`, {
    params: { code }
  });
};

export const getPaymentsByDate = async (from, to) => {
  return await api.get(`${API_BASE}/filter`, {
    params: { from, to }
  });
};

export const updatePayment = async (id, data) => {
  return await api.put(`${API_BASE}/${id}`, data);
};

export const deletePayment = async (id) => {
  return await api.delete(`${API_BASE}/${id}`);
};

export const createPaypalPayment = async (amount, orderId) => {
  return await api.post(`${API_BASE}/paypal`, null, {
    params: { amount, orderId }
  });
};


export const executePaypalPayment = async (paymentId, payerID, orderId) => {
  const params = new URLSearchParams();
  params.append("paymentId", paymentId);
  params.append("payerID", payerID);
  params.append("orderId", orderId);
  return axios.post("http://localhost:8080/api/payment/paypal/execute", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const refundPaypalPayment = async (saleId, amount) => {
  return await api.post(`${API_BASE}/refund`, null, {
    params: { saleId, amount }
  });
};

export const cancelPaypalPayment = async () => {
  return await api.get(`${API_BASE}/paypal/cancel`);
};

export const createOrder = async (data) => {
    
  return await api.post(`${API_BASE}/order`, data);
};