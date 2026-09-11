// =============================================================================
// lib/exceptions.js
// Exceptions Dashboard — Data Service
// Pattern mirrors lib/dashboard.js: single Promise.all fetch, transform, return.
// =============================================================================
// API → UC Table Mapping:
//   GET /api/exceptions              → faa.bronze.workbench_tickets
//   GET /api/exceptions?priority=HIGH→ faa.bronze.workbench_tickets
//   GET /api/reports/exception-aging  → faa.bronze.report_exception_aging
//   GET /api/reports/sla-compliance   → faa.bronze.report_sla_compliance
//   GET /api/reports/ai-decisions     → faa.bronze.report_ai_decisions
//   GET /api/kpis                     → faa.bronze.reconciliation_kpis
//   GET /api/dashboard/supplier       → faa.bronze.reconciliation_supplier_dashboard
//   POST /api/exceptions/override     → faa.bronze.reconciliation_audit_trail
// =============================================================================

import axiosInstance from "@/app/lib/api";

// ── Helpers ──────────────────────────────────────────────────────────────────
const findKpi = (kpis, name) => {
  const found = kpis.find((k) => k.kpi_name === name);
  return found ? parseFloat(found.kpi_value) : 0;
};

const formatCurrency = (val) => {
  if (val == null) return "$0.00";
  return (
    "$" +
    Number(val).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};

const safeArr = (d) =>
  Array.isArray(d) ? d : d?.data && Array.isArray(d.data) ? d.data : [];

const pct = (part, total) =>
  total > 0 ? ((part / total) * 100).toFixed(1) : "0.0";

// ── Color Constants ─────────────────────────────────────────────────────────
const TYPE_COLORS = {
  "Missing Invoice": "#4F7CFF",
  "Amount Mismatch": "#F5A623",
  "Duplicate Payment": "#E74C6F",
  "Missing Credit Memo": "#A855F7",
  Other: "#CBD5E1",
};

const PRIORITY_COLORS = { HIGH: "#EF4444", MEDIUM: "#F59E0B", LOW: "#3B82F6" };

const SLA_COLORS = {
  "Within SLA": "#10B981",
  "SLA Breach": "#EF4444",
  "At Risk": "#F59E0B",
  Escalated: "#A855F7",
};

const SLA_COUNT_COLORS = {
  "Within SLA": "text-green-600",
  "SLA Breach": "text-red-600",
  "At Risk": "text-yellow-600",
  Escalated: "text-purple-600",
};

// =============================================================================
// MAIN: getExceptionsDashboard()
// Fetches all data needed for the Exceptions page in a single Promise.all call.
// Returns a structured object consumed by TanStack Query in ExceptionsPage.jsx.
// =============================================================================
export const getExceptionsDashboard = async () => {
  const [
    exceptionsRes,
    highPriorityRes,
    agingRes,
    slaRes,
    aiRes,
    kpisRes,
    supplierRes,
  ] = await Promise.all([
    axiosInstance.get("/api/exceptions"),
    axiosInstance.get("/api/exceptions", { params: { priority: "HIGH" } }),
    axiosInstance.get("/api/reports/exception-aging"),
    axiosInstance.get("/api/reports/sla-compliance"),
    axiosInstance.get("/api/reports/ai-decisions"),
    axiosInstance.get("/api/kpis"),
    axiosInstance.get("/api/dashboard/supplier"),
  ]);

  const allExceptions = safeArr(exceptionsRes.data);
  const totalExceptions = exceptionsRes.data?.total ?? allExceptions.length;
  const highPriorityExc = safeArr(highPriorityRes.data);
  const highPriorityTotal =
    highPriorityRes.data?.total ?? highPriorityExc.length;
  const agingRaw = safeArr(agingRes.data);
  const slaRaw = safeArr(slaRes.data);
  const aiRaw = safeArr(aiRes.data);
  const kpisRaw = safeArr(kpisRes.data);
  const supplierRaw = safeArr(supplierRes.data);

  // ── 1. KPI CARDS ──────────────────────────────────────────────────────────
  const totalAmount = allExceptions.reduce(
    (s, e) => s + (parseFloat(e.amount) || 0),
    0
  );
  const highAmount = highPriorityExc.reduce(
    (s, e) => s + (parseFloat(e.amount) || 0),
    0
  );

  // Overdue → from exception-aging where aging_bucket is 31+ days
  const overdueRows = agingRaw.filter((r) =>
    ["31-60 days", "61-90 days", "90+ days"].includes(r.aging_bucket)
  );
  const overdueCount = overdueRows.reduce(
    (s, r) => s + (parseInt(r.count) || 1),
    0
  );
  const overdueAmount = overdueRows.reduce(
    (s, r) => s + (parseFloat(r.total_amount) || 0),
    0
  );

  // Due Today → from exceptions where due_date = today
  const today = new Date().toISOString().slice(0, 10);
  const dueTodayRows = allExceptions.filter(
    (e) => e.due_date?.slice(0, 10) === today
  );
  const dueTodayCount = dueTodayRows.length;
  const dueTodayAmount = dueTodayRows.reduce(
    (s, e) => s + (parseFloat(e.amount) || 0),
    0
  );

  // SLA Breaches → from sla-compliance where tat_status = BREACHED
  const slaBreachCount = slaRaw
    .filter((r) => r.tat_status === "BREACHED")
    .reduce((s, r) => s + (parseInt(r.count) || 1), 0);
  const slaBreachAmount = slaRaw
    .filter((r) => r.tat_status === "BREACHED")
    .reduce((s, r) => s + (parseFloat(r.total_amount) || 0), 0);

  // Auto-Resolved → from ai-decisions where ai_action = AUTO_RESOLVED
  const autoResolved = aiRaw.filter(
    (r) => r.ai_action === "AUTO_RESOLVED" || r.status === "AUTO_RESOLVED"
  ).length;

  // Avg Resolution Time → from kpis
  const avgResolutionTime = findKpi(kpisRaw, "Average Resolution Time");

  const kpiCards = [
    {
      label: "Total Exceptions",
      value: totalExceptions,
      amount: formatCurrency(totalAmount),
      color: "border-blue-500",
      valueColor: "text-gray-900",
      icon: "AlertTriangle",
    },
    {
      label: "High Priority",
      value: highPriorityTotal,
      amount: formatCurrency(highAmount),
      color: "border-red-500",
      valueColor: "text-red-600",
      icon: "AlertOctagon",
    },
    {
      label: "Overdue",
      value: overdueCount,
      amount: formatCurrency(overdueAmount),
      color: "border-orange-500",
      valueColor: "text-orange-600",
      icon: "Clock",
    },
    {
      label: "Due Today",
      value: dueTodayCount,
      amount: formatCurrency(dueTodayAmount),
      color: "border-yellow-500",
      valueColor: "text-yellow-600",
      icon: "CalendarClock",
    },
    {
      label: "SLA Breaches",
      value: slaBreachCount,
      amount: formatCurrency(slaBreachAmount),
      color: "border-pink-500",
      valueColor: "text-pink-600",
      icon: "ShieldAlert",
    },
    {
      label: "Auto-Resolved (AI)",
      value: autoResolved,
      amount: "This Month",
      color: "border-indigo-500",
      valueColor: "text-indigo-600",
      icon: "Bot",
    },
    {
      label: "Avg. Resolution Time",
      value: `${avgResolutionTime || "\u2014"} Days`,
      amount: null,
      color: "border-gray-400",
      valueColor: "text-gray-900",
      icon: "Timer",
      trend: { down: true, value: "15%" },
    },
  ];

  // ── 2. EXCEPTIONS BY TYPE (donut) ─────────────────────────────────────────
  const typeMap = {};
  agingRaw.forEach((r) => {
    const t = r.exception_type || "Other";
    typeMap[t] = (typeMap[t] || 0) + (parseInt(r.count) || 1);
  });
  const exceptionsByType = Object.entries(typeMap)
    .map(([name, value]) => ({
      name,
      value,
      color: TYPE_COLORS[name] || TYPE_COLORS.Other,
      percentage: pct(value, totalExceptions),
    }))
    .sort((a, b) => b.value - a.value);

  // ── 3. EXCEPTIONS BY PRIORITY (donut) ─────────────────────────────────────
  const priorityMap = {};
  agingRaw.forEach((r) => {
    const p = r.priority || "LOW";
    priorityMap[p] = (priorityMap[p] || 0) + (parseInt(r.count) || 1);
  });
  const exceptionsByPriority = ["HIGH", "MEDIUM", "LOW"]
    .filter((k) => (priorityMap[k] || 0) > 0)
    .map((k) => ({
      name: k,
      displayName: k.charAt(0) + k.slice(1).toLowerCase(),
      value: priorityMap[k],
      color: PRIORITY_COLORS[k],
      percentage: pct(priorityMap[k], totalExceptions),
    }));

  // ── 4. SLA & ESCALATION OVERVIEW (donut) ──────────────────────────────────
  const slaMap = {
    "Within SLA": 0,
    "SLA Breach": 0,
    "At Risk": 0,
    Escalated: 0,
  };
  slaRaw.forEach((r) => {
    const status = r.tat_status || r.sla_status || "";
    if (status.includes("WITHIN") || status === "ON_TIME")
      slaMap["Within SLA"] += parseInt(r.count) || 1;
    else if (status.includes("BREACH"))
      slaMap["SLA Breach"] += parseInt(r.count) || 1;
    else if (status.includes("RISK") || status === "AT_RISK")
      slaMap["At Risk"] += parseInt(r.count) || 1;
    else if (status.includes("ESCALAT"))
      slaMap["Escalated"] += parseInt(r.count) || 1;
    else slaMap["Within SLA"] += parseInt(r.count) || 1;
  });
  const slaTotal = Object.values(slaMap).reduce((s, v) => s + v, 0);
  const withinSlaPct =
    slaTotal > 0
      ? Math.round((slaMap["Within SLA"] / slaTotal) * 100)
      : 0;

  const slaOverview = {
    withinSlaPct,
    segments: Object.entries(slaMap)
      .filter(([, v]) => v > 0)
      .map(([label, value]) => ({
        label,
        value,
        color: SLA_COLORS[label],
      })),
    data: Object.entries(slaMap).map(([label, count]) => ({
      label,
      count,
      color: SLA_COLORS[label],
      countColor: SLA_COUNT_COLORS[label],
    })),
  };

  // ── 5. TOP VENDORS WITH EXCEPTIONS ────────────────────────────────────────
  const topVendors = [...supplierRaw]
    .sort((a, b) => (b.exceptions || 0) - (a.exceptions || 0))
    .slice(0, 5)
    .map((s) => ({
      id: s.supplier_id,
      name: s.supplier_name,
      exceptions: parseInt(s.exceptions || 0),
      amount: formatCurrency(
        parseFloat(s.outstanding_balance || s.total_amount || 0)
      ),
      rawAmount: parseFloat(s.outstanding_balance || s.total_amount || 0),
    }));

  // ── 6. AI AUTO-RESOLUTION RATE ────────────────────────────────────────────
  const totalAiDecisions = aiRaw.length;
  const aiAutoRate =
    totalAiDecisions > 0
      ? Math.round((autoResolved / totalAiDecisions) * 100)
      : 0;

  return {
    kpiCards,
    exceptionsByType,
    exceptionsByPriority,
    slaOverview,
    topVendors,
    aiAutoRate,
    totalExceptions,
    lastUpdated:
      kpisRaw[0]?.run_timestamp || new Date().toLocaleDateString(),
  };
};

// =============================================================================
// PAGINATED: getOpenExceptions(params)
// Called independently by the Open Exceptions table with page/filter changes.
// =============================================================================
export const getOpenExceptions = async (params = {}) => {
  const res = await axiosInstance.get("/api/exceptions", { params });
  const data = res.data;
  return {
    rows: safeArr(data),
    total: data?.total ?? 0,
    hasMore: data?.has_more ?? false,
    page: data?.page ?? params.page ?? 1,
    pageSize: data?.page_size ?? params.page_size ?? 10,
  };
};

// =============================================================================
// AI RECOMMENDATIONS: getAiRecommendations()
// Used by the Exception Summary sidebar to display AI-suggested actions.
// =============================================================================
export const getAiRecommendations = async () => {
  const res = await axiosInstance.get("/api/reports/ai-decisions");
  return safeArr(res.data);
};

// =============================================================================
// OVERRIDE ACTION: submitExceptionOverride(body)
// Writes to faa.bronze.reconciliation_audit_trail via POST /api/exceptions/override
// =============================================================================
export const submitExceptionOverride = async (body) => {
  const res = await axiosInstance.post("/api/exceptions/override", body);
  return res.data;
};
