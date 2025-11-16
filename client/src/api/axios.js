import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Add token automatically
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    console.log("AXIOS INTERCEPTOR TOKEN:", token, "for", config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default api;
