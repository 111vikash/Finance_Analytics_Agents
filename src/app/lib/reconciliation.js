// lib/reconciliation.js
import axiosInstance from "@/app/lib/api";

const findKpi = (kpis, name) => {
  const found = kpis.find((k) => k.kpi_name === name);
  return found ? parseFloat(found.kpi_value) : 0;
};

const formatCurrency = (val) => {
  const num = Number(val || 0);
  const abs = Math.abs(num);
  if (abs >= 1_000_000) return `USD ${(num / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `USD ${(num / 1_000).toFixed(1)}K`;
  return `USD ${num.toFixed(2)}`;
};

const safeInt = (v) => parseInt(v || 0, 10);
const safeFloat = (v) => parseFloat(v || 0);

const normalizeMatchStatus = (value, fallback = "") => {
  const raw = String(value || fallback || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw === "matched") return "Matched";
  if (raw === "partially matched" || raw === "partial" || raw === "partial match") {
    return "Partially Matched";
  }
  if (raw === "unmatched" || raw === "not found" || raw === "exception") {
    return "Unmatched";
  }
  return value || fallback || "";
};

export const getReconciliationSummary = async () => {
  const [
    kpisRes,
    statementsRes,
    reconRes,
    vendorReconRes,
    outstandingRes,
    exceptionsRes,
    supplierDashRes,
  ] = await Promise.all([
    axiosInstance.get("/api/kpis"),
    axiosInstance.get("/api/reconciliation/extracted-statements"),
    axiosInstance.get("/api/reconciliation/summary"),
    axiosInstance.get("/api/reports/vendor-reconciliation"),
    axiosInstance.get("/api/reports/outstanding-balance"),
    axiosInstance.get("/api/exceptions"),
    axiosInstance.get("/api/dashboard/supplier"),
  ]);

  const kpisRaw = kpisRes.data || [];
  const statementsRaw = statementsRes.data?.data || statementsRes.data || [];
  const statementsTotal = statementsRes.data?.total ?? statementsRaw.length;
  const reconRaw = reconRes.data || [];
  const vendorReconRaw = vendorReconRes.data?.data || vendorReconRes.data || [];
  const outstandingRaw = outstandingRes.data?.data || outstandingRes.data || [];
  const exceptionsRaw = exceptionsRes.data?.data || exceptionsRes.data || [];
  const supplierDashRaw = supplierDashRes.data || [];

  const statementAmount = statementsRaw.reduce(
    (sum, row) => sum + (safeFloat(row.amount) || 0),
    0
  );
  const erpBalance = findKpi(kpisRaw, "Vendor Outstanding Balance");
  const variance = statementAmount - erpBalance;
  const matchRate = findKpi(kpisRaw, "Auto-Match Rate %");
  const openExceptions = findKpi(kpisRaw, "Open Exceptions");
  const closedExceptions = findKpi(kpisRaw, "Closed Exceptions");
  const exceptionRate = findKpi(kpisRaw, "Exception Rate %");
  const slaCompliance = findKpi(kpisRaw, "SLA Compliance %");
  const avgResolutionTime = findKpi(kpisRaw, "Average Resolution Time");
  const automationRate = findKpi(kpisRaw, "Automation Rate %");
  const aiAcceptance = findKpi(kpisRaw, "AI Recommendation Acceptance %");
  const confidenceTrend = findKpi(kpisRaw, "Confidence Trend");
  const potentialRecovery = findKpi(kpisRaw, "Potential Recovery Amount");
  const duplicatePayments = findKpi(kpisRaw, "Duplicate Payments");

  const kpis = {
    statementAmount,
    statementFormatted: formatCurrency(statementAmount),
    statementsCount: statementsTotal,
    erpBalance,
    erpFormatted: formatCurrency(erpBalance),
    variance,
    varianceFormatted: formatCurrency(Math.abs(variance)),
    varianceDirection: variance < 0 ? "Below statement total" : "Above ERP balance",
    matchRate,
    openExceptions,
    closedExceptions,
    exceptionRate,
    slaCompliance,
    avgResolutionTime,
    automationRate,
    aiAcceptance,
    confidenceTrend,
    potentialRecovery,
    potentialRecoveryFormatted: formatCurrency(potentialRecovery),
    duplicatePayments,
  };

  const reconTotals = {
    totalInvoices: reconRaw.reduce((s, r) => s + safeInt(r.total_invoices), 0),
    matched: reconRaw.reduce((s, r) => s + safeInt(r.matched_count), 0),
    notFound: reconRaw.reduce((s, r) => s + safeInt(r.not_found_count), 0),
    blocked: reconRaw.reduce((s, r) => s + safeInt(r.blocked_count), 0),
    open: reconRaw.reduce((s, r) => s + safeInt(r.open_count), 0),
    mismatch: reconRaw.reduce((s, r) => s + safeInt(r.mismatch_count), 0),
    suppliers: reconRaw.length,
  };

  const reconciliationTable = reconRaw.map((row) => {
    const total = safeInt(row.total_invoices);
    const matched = safeInt(row.matched_count);
    const notFound = safeInt(row.not_found_count);
    const mismatch = safeInt(row.mismatch_count);

    let match_status = "Unmatched";
    if (matched === total && total > 0) match_status = "Matched";
    else if (matched > 0 && matched < total) match_status = "Partially Matched";

    return {
      ...row,
      total_invoices: total,
      matched_count: matched,
      not_found_count: notFound,
      blocked_count: safeInt(row.blocked_count),
      open_count: safeInt(row.open_count),
      mismatch_count: mismatch,
      match_status,
    };
  });

  const vendorReconciliation = vendorReconRaw.map((row, index) => ({
    id: row.id || `vendor-${index}`,
    row_type: "Matched Item",
    supplier_id: row.supplier_id || row.vendor_id || row.supplier_code || "-",
    supplier_name: row.supplier_name || row.vendor_name || row.supplier || null,
    supplier_email: row.supplier_email || row.email || null,
    vendor: row.supplier_name || row.vendor_name || row.supplier || null,
    reference: row.invoice_number || row.reference || row.reference_number || row.invoice_id || row.supplier_id || "-",
    period: row.period || row.reconciliation_date || row.run_timestamp || row.statement_date || null,
    statement_amount: safeFloat(row.statement_amount || row.total_supplier_amount || row.amount),
    erp_amount: safeFloat(row.erp_amount || row.total_paid || row.erp_total),
    outstanding_amount: safeFloat(row.net_balance || row.outstanding_amount),
    total_amount: safeFloat(row.total_amount || row.amount),
    status: normalizeMatchStatus(row.status),
    match_status: normalizeMatchStatus(row.match_status || row.status, "Matched"),
    confidence: row.confidence ?? row.avg_confidence ?? null,
    exception_type: row.exception_type || null,
    priority: row.priority || null,
    reconciliation_date: row.reconciliation_date || row.run_timestamp || null,
  }));

  const outstandingBalance = outstandingRaw.map((row, index) => ({
    id: row.id || `outstanding-${index}`,
    row_type: "Unmatched Item",
    supplier_id: row.supplier_id || row.vendor_id || row.supplier_code || "-",
    supplier_name: row.supplier_name || row.vendor_name || row.supplier || null,
    supplier_email: row.supplier_email || row.email || null,
    vendor: row.supplier_name || row.vendor_name || row.supplier || null,
    reference: row.invoice_number || row.reference || row.reference_number || "-",
    period: row.period || row.due_date || row.report_timestamp || null,
    statement_amount: safeFloat(row.statement_amount || row.amount),
    erp_amount: safeFloat(row.erp_amount || row.paid_amount),
    outstanding_amount: safeFloat(row.outstanding_amount || row.net_balance || row.amount),
    total_amount: safeFloat(row.total_amount || row.amount),
    status: "Unmatched",
    match_status: "Unmatched",
    confidence: row.confidence ?? null,
    exception_type: row.exception_type || null,
    priority: row.priority || null,
    reconciliation_date: row.reconciliation_date || row.report_timestamp || row.due_date || null,
  }));

  const exceptions = exceptionsRaw.map((row, index) => ({
    id: row.id || `exception-${index}`,
    row_type: "Exception",
    supplier_id: row.supplier_id || row.vendor_id || "-",
    supplier_name: row.supplier_name || row.vendor_name || row.supplier || null,
    supplier_email: row.supplier_email || row.email || null,
    vendor: row.supplier_name || row.vendor_name || row.supplier || null,
    reference: row.invoice_number || row.reference || row.reference_number || row.exception_type || "-",
    period: row.period || row.report_timestamp || null,
    statement_amount: safeFloat(row.statement_amount),
    erp_amount: safeFloat(row.erp_amount),
    outstanding_amount: safeFloat(row.outstanding_amount),
    total_amount: safeFloat(row.total_amount),
    status: "",
    match_status: "",
    confidence: row.confidence ?? null,
    exception_type: row.exception_type || null,
    priority: row.priority || null,
    reconciliation_date: row.report_timestamp || null,
  }));

  const summaryRows = reconciliationTable.map((row, index) => ({
    id: `summary-${index}`,
    row_type: "Summary",
    supplier_id: row.supplier_id || "-",
    supplier_name: row.supplier_name || null,
    supplier_email: row.supplier_email || null,
    vendor: row.supplier_name || row.supplier_email || null,
    reference: row.supplier_id || "-",
    period: row.reconciliation_date || null,
    statement_amount: null,
    erp_amount: null,
    outstanding_amount: null,
    total_amount: safeFloat(row.total_invoices),
    status: row.match_status,
    match_status: row.match_status,
    confidence: null,
    exception_type: safeInt(row.not_found_count) > 0 || safeInt(row.mismatch_count) > 0 ? "Needs Review" : null,
    priority: null,
    reconciliation_date: row.reconciliation_date || null,
    total_invoices: row.total_invoices,
    matched_count: row.matched_count,
    not_found_count: row.not_found_count,
    mismatch_count: row.mismatch_count,
  }));

  const workbenchRows = [
    ...vendorReconciliation,
    ...outstandingBalance,
    ...exceptions,
    ...summaryRows,
  ];

  const exceptionsByType = {};
  exceptionsRaw.forEach((e) => {
    const type = e.exception_type || "Unknown";
    exceptionsByType[type] = (exceptionsByType[type] || 0) + safeInt(e.count);
  });
  const exceptionBreakdown = Object.entries(exceptionsByType)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const exceptionsByPriority = {};
  exceptionsRaw.forEach((e) => {
    const p = e.priority || "Unknown";
    exceptionsByPriority[p] = (exceptionsByPriority[p] || 0) + safeInt(e.count);
  });

  const supplierOverview = supplierDashRaw
    .map((s) => ({
      supplier_id: s.supplier_id,
      supplier_name: s.supplier_name || s.supplier_email?.split("@")[0] || "Unknown",
      supplier_email: s.supplier_email,
      total_invoices: safeInt(s.total_invoices),
      auto_matches: safeInt(s.auto_matches),
      ai_recommended: safeInt(s.ai_recommended),
      exceptions: safeInt(s.exceptions),
      high_priority_exceptions: safeInt(s.high_priority_exceptions),
      escalated_cases: safeInt(s.escalated_cases),
      avg_confidence: safeFloat(s.avg_confidence).toFixed(1) + "%",
      outstanding_balance: safeFloat(s.outstanding_balance),
      outstanding_formatted: formatCurrency(safeFloat(s.outstanding_balance)),
    }))
    .sort((a, b) => b.exceptions - a.exceptions);

  const aiInsights = {
    attentionRequired: openExceptions,
    highConfidence: supplierDashRaw.filter((s) => safeFloat(s.avg_confidence) >= 80).length,
    pendingConfirmation: reconRaw.filter(
      (r) => r.email_sent === "false" && safeInt(r.not_found_count) > 0
    ).length,
  };

  return {
    kpis,
    reconTotals,
    reconciliationTable,
    vendorReconciliation,
    outstandingBalance,
    exceptions,
    workbenchRows,
    exceptionBreakdown,
    exceptionsByPriority,
    supplierOverview,
    aiInsights,
    lastUpdated: kpisRaw[0]?.run_timestamp || new Date().toLocaleDateString(),
  };
};
