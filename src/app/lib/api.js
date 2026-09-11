// lib/api.ts
import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Auto-attach X-Session-ID to every request
axiosInstance.interceptors.request.use((config) => {
  const sessionId = useAuthStore.getState().sessionId;
  if (sessionId) {
    config.headers["X-Session-ID"] = sessionId;
  }
  return config;
});

// Auto-handle 401 (expired session) → redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;