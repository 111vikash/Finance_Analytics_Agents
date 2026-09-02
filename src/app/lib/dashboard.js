// src/app/lib/api/dashboard.js
import axiosInstance from "@/app/lib/api";

export const getDashboardSummary = async (sessionId) => {
  const [kpisRes, reconRes, supplierRes, trendRes] = await Promise.all([
    axiosInstance.get("/api/kpis", {
      headers: { "X-Session-ID": sessionId },
    }),
    axiosInstance.get("/api/reconciliation/summary", {
      headers: { "X-Session-ID": sessionId },
    }),
    axiosInstance.get("/api/dashboard/supplier", {
      headers: { "X-Session-ID": sessionId },
    }),
    axiosInstance.get("/api/dashboard/confidence-trend?days=7", {
      headers: { "X-Session-ID": sessionId },
    }),
  ]);

  return {
    kpis: kpisRes.data,
    reconciliation: reconRes.data,
    supplierDashboard: supplierRes.data,
    trendData: trendRes.data,
  };
};