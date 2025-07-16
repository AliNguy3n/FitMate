import axios from "axios";

const base_url = "http://localhost:8080";

// api form

const api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if(token){
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// )


// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if available
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common errors
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem('authToken');
//       // Redirect to login page or handle as needed
//     }
//     return Promise.reject(error);
//   }
// );

export default api;


// Api Response template
// success: true | false
// code: 400, 401, ..
// message: "User Created",..
// errors: ["Exception": "...",..]
export const createApiResponse = (success, code, message, data = null) => ({
  success,
  code,
  message,
  data
});

export const createApiError = (success, code, errors = []) => ({
  success,
  code,
  errors
});

