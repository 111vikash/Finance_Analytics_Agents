// src/app/lib/api/auth.js
import axiosInstance from "@/app/lib/api";

export const loginUser = async (email, role) => {
  const res = await axiosInstance.post("/api/auth/login", { email, role });
  return res.data;
};

export const getCurrentSession = async (sessionId) => {
  const res = await axiosInstance.get("/api/auth/session", {
    headers: { "X-Session-ID": sessionId },
  });
  return res.data;
};