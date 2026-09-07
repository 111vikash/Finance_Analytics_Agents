// lib/dashboard.js
import axiosInstance from "@/app/lib/api";

const findKpi = (kpis, name) => {
  const found = kpis.find((k) => k.kpi_name === name);
  return found ? parseFloat(found.kpi_value) : 0;
};

const formatCurrency = (val) => {
  if (val >= 1_000_000) return `USD ${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `USD ${(val / 1_000).toFixed(1)}K`;
  return `USD ${val.toFixed(0)}`;
};

export const getDashboardSummary = async () => {
  const [
    kpisRes, reconRes, supplierDashRes, trendRes,
    exceptionsRes, slaRes, vendorReconRes, suppliersRes,
  ] = await Promise.all([
    axiosInstance.get("/api/kpis"),
    axiosInstance.get("/api/reconciliation/summary"),
    axiosInstance.get("/api/dashboard/supplier"),
    axiosInstance.get("/api/dashboard/confidence-trend?days=7"),
    axiosInstance.get("/api/exceptions"),
    axiosInstance.get("/api/reports/sla-compliance"),
    axiosInstance.get("/api/reports/vendor-reconciliation"),
    axiosInstance.get("/api/suppliers"),
  ]);

  const kpisRaw = kpisRes.data || [];
  const reconRaw = reconRes.data || [];
  const supplierDashRaw = supplierDashRes.data || [];
  const trendRaw = trendRes.data || [];
  const exceptionsRaw = exceptionsRes.data?.data || exceptionsRes.data || [];
  const slaRaw = slaRes.data?.data || slaRes.data || [];
  const vendorReconRaw = vendorReconRes.data?.data || vendorReconRes.data || [];
  const suppliersRaw = suppliersRes.data || [];

  // ── 1. KPI CARDS ──
  const openEx = findKpi(kpisRaw, "Open Exceptions");
  const closedEx = findKpi(kpisRaw, "Closed Exceptions");
  const total = openEx + closedEx;

  const kpis = [
    {
      label: "Statements Received",
      value: total.toLocaleString(),
      change: `${openEx} open + ${closedEx} closed`,
      isTrendPositive: closedEx > openEx,
      icon: "FileText",
    },
    {
      label: "Reconciliations Completed",
      value: closedEx.toLocaleString(),
      change: `of ${total} total`,
      isTrendPositive: closedEx > 0,
      icon: "CheckCircle2",
    },
    {
      label: "Match Rate",
      value: `${findKpi(kpisRaw, "Reconciliation Accuracy %")}%`,
      change: `Auto-match: ${findKpi(kpisRaw, "Auto-Match Rate %")}%`,
      isTrendPositive: findKpi(kpisRaw, "Reconciliation Accuracy %") > 50,
      icon: "Target",
    },
    {
      label: "Automation Rate",
      value: `${findKpi(kpisRaw, "Automation Rate %")}%`,
      change: `AI acceptance: ${findKpi(kpisRaw, "AI Recommendation Acceptance %")}%`,
      isTrendPositive: findKpi(kpisRaw, "Automation Rate %") > 50,
      icon: "Cpu",
    },
    {
      label: "Open Exceptions",
      value: openEx.toLocaleString(),
      change: `Exception rate: ${findKpi(kpisRaw, "Exception Rate %")}%`,
      isTrendPositive: false,
      icon: "AlertTriangle",
    },
    {
      label: "Avg. Resolution Time",
      value: `${findKpi(kpisRaw, "Average Resolution Time").toFixed(0)} hrs`,
      change: `SLA: ${findKpi(kpisRaw, "SLA Compliance %")}%`,
      isTrendPositive: findKpi(kpisRaw, "Average Resolution Time") < 100,
      icon: "Clock",
    },
  ];

  // ── 2. SLA COMPLIANCE ──
  const totalSla = slaRaw.reduce((s, r) => s + parseInt(r.count || 0), 0);
  const compliantCount = slaRaw
    .filter((r) => r.sla_bucket !== "Breached SLA")
    .reduce((s, r) => s + parseInt(r.count || 0), 0);
  const compliancePct = totalSla > 0 ? ((compliantCount / totalSla) * 100).toFixed(1) : "0.0";

  const progressData = slaRaw.map((r) => {
    const count = parseInt(r.count || 0);
    return {
      name: `${r.sla_bucket}`,
      value: totalSla > 0 ? parseFloat(((count / totalSla) * 100).toFixed(1)) : 0,
      count: count,
      role: r.owner_role,
    };
  });

  // ── 3. EXCEPTIONS BY CATEGORY ──
  const exMap = {};
  exceptionsRaw.forEach((e) => {
    const type = e.exception_type || "Unknown";
    exMap[type] = (exMap[type] || 0) + parseInt(e.count || 0);
  });
  const barData = Object.entries(exMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // ── 4. RECONCILIATION STATUS ──
  const reconTotals = {
    totalInvoices: reconRaw.reduce((s, r) => s + parseInt(r.total_invoices || 0), 0),
    matched: reconRaw.reduce((s, r) => s + parseInt(r.matched_count || 0), 0),
    notFound: reconRaw.reduce((s, r) => s + parseInt(r.not_found_count || 0), 0),
    blocked: reconRaw.reduce((s, r) => s + parseInt(r.blocked_count || 0), 0),
    open: reconRaw.reduce((s, r) => s + parseInt(r.open_count || 0), 0),
    mismatch: reconRaw.reduce((s, r) => s + parseInt(r.mismatch_count || 0), 0),
    suppliers: reconRaw.length,
  };

  const reconStatusData = [
    { name: "Matched", count: reconTotals.matched, barColor: "bg-emerald-500" },
    { name: "Not Found", count: reconTotals.notFound, barColor: "bg-red-500" },
    { name: "Blocked", count: reconTotals.blocked, barColor: "bg-orange-400" },
    { name: "Open", count: reconTotals.open, barColor: "bg-blue-500" },
    { name: "Mismatch", count: reconTotals.mismatch, barColor: "bg-amber-500" },
  ]
    .filter((r) => r.count > 0)
    .map((r) => ({
      ...r,
      percentage: reconTotals.totalInvoices > 0
        ? parseFloat(((r.count / reconTotals.totalInvoices) * 100).toFixed(1))
        : 0,
    }));

  // ── 5. FINANCIAL ──
  const totalStmtAmt = vendorReconRaw.reduce(
    (s, r) => s + Math.abs(parseFloat(r.total_supplier_amount || 0)), 0
  );
  const totalPaid = vendorReconRaw.reduce(
    (s, r) => s + parseFloat(r.total_paid || 0), 0
  );
  const totalNet = vendorReconRaw.reduce(
    (s, r) => s + Math.abs(parseFloat(r.net_balance || 0)), 0
  );

  const financialKpis = [
    {
      label: "Total Statement Amount",
      value: formatCurrency(totalStmtAmt),
      change: `${vendorReconRaw.length} vendors`,
      isTrendPositive: true,
      icon: "FileSpreadsheet",
    },
    {
      label: "Total Paid",
      value: formatCurrency(totalPaid),
      change: "Payments applied",
      isTrendPositive: true,
      icon: "CreditCard",
    },
    {
      label: "Net Outstanding",
      value: formatCurrency(totalNet),
      change: "Requires resolution",
      isTrendPositive: false,
      icon: "FolderOpen",
    },
    {
      label: "Potential Recovery",
      value: formatCurrency(findKpi(kpisRaw, "Potential Recovery Amount")),
      change: "Identified by AI",
      isTrendPositive: true,
      icon: "TrendingUp",
    },
  ];

  // ── 6. CONFIDENCE TREND ──
  const trendMap = {};
  trendRaw.forEach((r) => {
    const ts = r.run_timestamp || "Unknown";
    if (!trendMap[ts]) trendMap[ts] = { low: 0, medium: 0, high: 0 };
    const count = parseInt(r.count || 0);
    if (r.confidence_bucket === "0-50%") trendMap[ts].low += count;
    else if (r.confidence_bucket === "50-80%") trendMap[ts].medium += count;
    else trendMap[ts].high += count;
  });
  const trendData = Object.entries(trendMap).map(([ts, v]) => ({
    name: ts.split(" ")[0],
    "Low (0-50%)": v.low,
    "Medium (50-80%)": v.medium,
    "High (80%+)": v.high,
  }));

  // ── 7. TOP VENDORS ──
  const topVendors = supplierDashRaw
    .map((s) => ({
      vendor: s.supplier_name || s.supplier_email?.split("@")[0] || "Unknown",
      totalInvoices: parseInt(s.total_invoices || 0),
      exceptions: parseInt(s.exceptions || 0),
      highPriority: parseInt(s.high_priority_exceptions || 0),
      escalated: parseInt(s.escalated_cases || 0),
      avgConfidence: parseFloat(s.avg_confidence || 0).toFixed(1) + "%",
      outstanding: formatCurrency(parseFloat(s.outstanding_balance || 0)),
    }))
    .sort((a, b) => b.exceptions - a.exceptions);

  // ── 8. SUPPLIERS TABLE (NEW) ──
  const suppliers = suppliersRaw.map((s) => ({
    id: s.Supplier_ID,
    name: s.Supplier_Name,
    type: s.Supplier_Type,
    email: s.Email,
    city: s.City,
    state: s.State,
    status: s.Supplier_Status?.trim(),
    risk: s.Risk_Rating,
    bank: s.Bank_Name,
    currency: s.Currency,
  }));

  return {
    kpis,
    financialKpis,
    progressData,
    compliancePct,
    barData,
    trendData,
    topVendors,
    suppliers,
    reconStatusData,
    reconTotals,
    lastUpdated: kpisRaw[0]?.run_timestamp || new Date().toLocaleDateString(),
  };
};