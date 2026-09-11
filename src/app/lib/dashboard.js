import axiosInstance from "@/app/lib/api";

export const getDashboardSummary = async () => {
  const [fullRes, supplierRes] = await Promise.all([
    axiosInstance.get("/api/dashboard/full"),
    axiosInstance.get("/api/reports/vendor-reconciliation"), 
    axiosInstance.get("/api/dashboard/supplier"),
  ]);

  const fullRaw = fullRes.data || {};
  const supplierRaw = supplierRes.data || {};

  return {
    title: fullRaw.title || "Monthly KPI Dashboard",
    lastUpdated: fullRaw.lastUpdated || new Date().toLocaleDateString(),

    kpis: fullRaw.kpis || [],
    financialKpis: fullRaw.financialKpis || [],
    trendData: fullRaw.trendData || [],
    progressData: fullRaw.progressData || [],
    barData: fullRaw.barData || [],
    slaCompliance: fullRaw.slaCompliance || {
      percentage: 0,
      withinTat: 0,
      breached: 0,
      total: 0,
    },
    exceptionsByCategory: fullRaw.exceptionsByCategory || [],
    topVendors: fullRaw.topVendors || [],
    mockStatements: fullRaw.mockStatements || [],
    mockNotifications: fullRaw.mockNotifications || [],
    analystWorkload: fullRaw.analystWorkload || supplierRaw.analystWorkload || [],
    mockAuditLogs: fullRaw.mockAuditLogs || [],
  };
};