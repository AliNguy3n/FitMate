import { api, successResponse, failResponse } from "./baseApi.js";

export const getProductCards = async() => {
  try {
    const result = await api.get("/api/productV2/cards");
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}

export const getECategories = async() => {
  try {
    const result = await api.get("/api/productV2/ecategory");
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}


export const getSCategories = async() => {
  try {
    const result = await api.get("/api/productV2/scategory");
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}

export const getEquipmentById = async(id) => {
  try {
    const result = await api.get(`/api/productV2/equipment/${id}`);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}

export const getSupplementById = async(id) => {
  try {
    const result = await api.get(`/api/productV2/supplement/${id}`);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}

export const getProductTopCards = async (limit) => {
  try {
    const result = await api.get(`/api/productV2/top/${limit}`);
    return successResponse(result);
  } catch (error) {
    return failResponse(error);
  }
}

//   {
//     "id": 6,
//     "name": "Adjustable Dumbbell Set",
//     "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
//     "price": 299.99,
//     "discount": 10,
//     "rating": 2.1,
//     "stock": 15,
//     "type": "equipment",
//     "categories": ["strength", "home-gym", "weights"] // can use id
//   },
