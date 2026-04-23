import axios from "axios";

const normalizeApiUrl = (value) => {
  if (!value) {
    return "http://localhost:4000/api";
  }

  const trimmedValue = value.trim().replace(/\/+$/, "");
  return trimmedValue.endsWith("/api") ? trimmedValue : `${trimmedValue}/api`;
};

const api = axios.create({
  baseURL: normalizeApiUrl(import.meta.env.VITE_API_URL),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
