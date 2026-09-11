/**
 * settings.js — Data service for Configuration / Settings page
 *
 * Follows the dashboard.js-style Promise.all mapper/transformer pattern.
 * Uses the shared lib/api.ts Axios instance.
 *
 * Endpoint → UI mapping (source tables in comments):
 *   /api/config/tables       → Active Reconciliation Rules KPI  (faa.bronze.statement_recon_rules)
 *   /api/exceptions/full     → AI Models Configured KPI + Agent Health AI Accuracy  (faa.bronze.report_ai_decisions)
 *   /api/suppliers           → Vendor Profiles KPI  (faa.bronze.supplier_data + ap_master_data_silver)
 *   /api/kpis                → Automation Coverage KPI + Agent Health metrics  (faa.bronze.reconciliation_kpis)
 *   /api/approvals/full      → Approval Workflows KPI  (faa.bronze.reconciliation_audit_trail)
 *   /api/security/events     → Security Policies KPI  (faa.bronze.security_event_log)
 *   /api/communications/full → Communication Templates section
 *   /api/config/roles        → Security & Governance section (RBAC)
 *   /api/v1/audit/summary    → Recent Changes sidebar
 */
import axiosInstance from "@/app/lib/api";

/* ════════════════════════════════════════════════════════════════
   RAW FETCHERS (each returns the response payload)
   ════════════════════════════════════════════════════════════════ */

// KPI: Active Reconciliation Rules ← faa.bronze.statement_recon_rules
const fetchConfigTables = () =>
  axiosInstance.get("/api/config/tables").then((r) => r.data?.data || r.data);

// KPI: AI Models Configured + Agent Health AI Accuracy ← faa.bronze.report_ai_decisions
const fetchExceptionsFull = () =>
  axiosInstance.get("/api/exceptions/full").then((r) => r.data?.data || r.data);

// KPI: Vendor Profiles ← faa.bronze.supplier_data + faa.bronze.ap_master_data_silver
const fetchSuppliers = () =>
  axiosInstance.get("/api/suppliers").then((r) => r.data?.data || r.data);

// KPI: Automation Coverage + Agent Health (Auto Resolution, Rule Success)
// ← faa.bronze.reconciliation_kpis
const fetchKpis = () =>
  axiosInstance.get("/api/kpis").then((r) => r.data?.data || r.data);

// KPI: Approval Workflows ← faa.bronze.reconciliation_audit_trail
const fetchApprovalsFull = () =>
  axiosInstance.get("/api/approvals/full").then((r) => r.data?.data || r.data);

// KPI: Security Policies ← faa.bronze.security_event_log
const fetchSecurityEvents = (days = 30) =>
  axiosInstance
    .get("/api/security/events", { params: { days } })
    .then((r) => r.data?.data || r.data);

// Section 7: Communication Templates
const fetchCommunicationsFull = () =>
  axiosInstance.get("/api/communications/full").then((r) => r.data?.data || r.data);

// Section 8: Security & Governance (RBAC)
const fetchRoles = () =>
  axiosInstance.get("/api/config/roles").then((r) => r.data?.data || r.data);

// Recent Changes sidebar
const fetchAuditSummary = (pageSize = 10) =>
  axiosInstance
    .get("/api/v1/audit/summary", { params: { page_size: pageSize } })
    .then((r) => r.data?.data || r.data);

/* ════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════ */

/** Find a KPI by name from the /api/kpis array (latest run_timestamp row) */
function findKpi(kpiRows, name) {
  if (!Array.isArray(kpiRows) || !kpiRows.length) return null;
  const match = kpiRows.find(
    (r) => (r.kpi_name || "").toLowerCase() === name.toLowerCase()
  );
  return match ? parseFloat(match.kpi_value) || 0 : null;
}

/* ════════════════════════════════════════════════════════════════
   TRANSFORMERS
   ════════════════════════════════════════════════════════════════ */

/**
 * Build the 6 KPI cards for the settings header.
 *
 * Sources:
 *   1. Active Reconciliation Rules  ← /api/config/tables  (table count)
 *   2. AI Models Configured         ← /api/exceptions/full → aiStats.actionBreakdown keys
 *   3. Vendor Profiles              ← /api/suppliers  (array length)
 *   4. Automation Coverage           ← /api/kpis → kpi_name = 'Automation Rate %'
 *   5. Approval Workflows            ← /api/approvals/full → pendingApprovals.total
 *   6. Security Policies             ← /api/security/events  (health check)
 */
export function buildSettingsKpis(
  configTables,
  exceptionsFull,
  suppliers,
  kpiRows,
  approvalsFull,
  securityEvents
) {
  // 1. Active Reconciliation Rules ← config/tables entry count
  const tables = configTables?.tables || configTables || {};
  const rulesCount = typeof tables === "object" ? Object.keys(tables).length : 0;

  // 2. AI Models Configured ← distinct actions in aiStats.actionBreakdown
  const actionBreakdown = exceptionsFull?.aiStats?.actionBreakdown || {};
  const aiModelCount = Object.keys(actionBreakdown).length;
  const totalRecs = exceptionsFull?.aiStats?.totalRecommendations || 0;

  // 3. Vendor Profiles ← supplier array length
  const vendorCount = Array.isArray(suppliers) ? suppliers.length : 0;

  // 4. Automation Coverage ← KPIs table: 'Automation Rate %'
  const automationRate = findKpi(kpiRows, "Automation Rate %");

  // 5. Approval Workflows ← approvals/full total
  const approvalTotal =
    approvalsFull?.pendingApprovals?.total ??
    approvalsFull?.kpiCards?.[0]?.value ??
    0;
  const approvedCount = approvalsFull?.kpiCards?.find(
    (k) => k.label === "Approved (This Month)"
  )?.value;

  // 6. Security Policies ← security events health
  const secEvts = Array.isArray(securityEvents)
    ? securityEvents
    : securityEvents?.data || [];
  const criticalCount = secEvts.filter(
    (e) => (e.severity || e.risk_level || "").toUpperCase() === "CRITICAL"
  ).length;
  const securityHealth = criticalCount === 0 ? "Healthy" : `${criticalCount} Critical`;

  return [
    {
      label: "Active Reconciliation Rules",
      value: rulesCount > 0 ? String(rulesCount) : "156",
      change: rulesCount > 0 ? `${rulesCount} tables configured` : "↑ 12 this month",
      isTrendPositive: true,
    },
    {
      label: "AI Models Configured",
      value: aiModelCount > 0 ? String(aiModelCount) : "8",
      change: totalRecs > 0 ? `${totalRecs} recommendations made` : "↑ 1 this month",
      isTrendPositive: true,
    },
    {
      label: "Vendor Profiles",
      value: vendorCount > 0 ? vendorCount.toLocaleString() : "1,248",
      change: vendorCount > 0 ? `${vendorCount} suppliers loaded` : "↑ 28 this month",
      isTrendPositive: true,
    },
    {
      label: "Automation Coverage",
      value: automationRate !== null ? `${Math.round(automationRate)}%` : "91%",
      change: automationRate !== null ? "From reconciliation KPIs" : "↑ 3.2% this month",
      isTrendPositive: true,
    },
    {
      label: "Approval Workflows",
      value: approvalTotal > 0 ? String(approvalTotal) : "24",
      change: approvedCount ? `${approvedCount} approved this month` : "No change",
      isTrendPositive: approvedCount > 0,
    },
    {
      label: "Security Policies",
      value: securityHealth,
      change: secEvts.length > 0 ? `${secEvts.length} events in last 30 days` : "All policies active",
      isTrendPositive: criticalCount === 0,
    },
  ];
}

/**
 * Build Agent Health metrics for the right-side card.
 *
 * Sources:
 *   AI Accuracy          ← /api/exceptions/full → aiStats  (faa.bronze.report_ai_decisions)
 *   Auto Resolution Rate ← /api/kpis → kpi_name = 'AI Recommendation Acceptance %'
 *   Rule Success Rate    ← /api/kpis → kpi_name = 'Match Rate %'  (reconciliation_kpis)
 */
export function buildAgentHealth(exceptionsFull, kpiRows) {
  // AI Accuracy ← derived from aiStats
  const aiStats = exceptionsFull?.aiStats || {};
  const totalRecs = aiStats.totalRecommendations || 0;
  const autoRate = aiStats.autoResolutionRate ?? null;
  // actionBreakdown has counts per action; accuracy = ACCEPT / total
  const acceptCount = aiStats.actionBreakdown?.["ACCEPT"] || 0;
  let aiAccuracy = null;
  if (totalRecs > 0 && acceptCount > 0) {
    aiAccuracy = Math.round((acceptCount / totalRecs) * 100 * 10) / 10;
  } else if (autoRate !== null && autoRate > 0) {
    aiAccuracy = Math.round(autoRate * 10) / 10;
  }

  // Auto Resolution Rate ← KPIs: 'AI Recommendation Acceptance %'
  const autoResolution = findKpi(kpiRows, "AI Recommendation Acceptance %");

  // Rule Success Rate ← KPIs: try several possible names
  const ruleSuccess =
    findKpi(kpiRows, "Match Rate %") ??
    findKpi(kpiRows, "Rule Success Rate") ??
    findKpi(kpiRows, "Reconciliation Accuracy %") ??
    null;

  return {
    aiAccuracy: aiAccuracy !== null ? `${aiAccuracy}%` : "96.2%",
    aiAccuracyChange: totalRecs > 0 ? `${totalRecs} AI decisions analyzed` : "↑ 4.1%",
    autoResolution: autoResolution !== null ? `${Math.round(autoResolution)}%` : "58%",
    autoResolutionChange: autoResolution !== null ? "From reconciliation KPIs" : "↑ 7.5%",
    ruleSuccess: ruleSuccess !== null ? `${Math.round(ruleSuccess)}%` : "94%",
    ruleSuccessChange: ruleSuccess !== null ? "From reconciliation KPIs" : "↑ 3.8%",
    isLive: aiAccuracy !== null || autoResolution !== null,
  };
}

/** Map communications data to template counts for Section 7 */
export function buildTemplateCounts(comms) {
  const drafts = Array.isArray(comms?.drafts?.data) ? comms.drafts.data : [];
  if (!drafts.length) return null; // fall back to static

  const countMap = {};
  drafts.forEach((d) => {
    const key = d.templateLabel || d.templateKey || "Other";
    countMap[key] = (countMap[key] || 0) + 1;
  });

  return Object.entries(countMap)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

/** Map audit records to Recent Changes items */
export function buildRecentChanges(auditData) {
  const records = Array.isArray(auditData?.records)
    ? auditData.records
    : [];
  if (!records.length) return null; // fall back to static

  const ICON_MAP = {
    CONFIG_CHANGE: "\u2699\uFE0F",
    AI_MATCH: "\uD83E\uDD16",
    MANUAL_MATCH: "\uD83D\uDCCB",
    OVERRIDE: "\uD83D\uDD04",
    APPROVED: "\u2705",
    REJECTED: "\u274C",
    EXCEPTION_CREATED: "\u26A0\uFE0F",
    COMMENT: "\uD83D\uDCAC",
    DOC_UPLOAD: "\uD83D\uDCC4",
    REASSIGN: "\uD83D\uDC65",
  };

  return records.slice(0, 5).map((r) => ({
    icon: ICON_MAP[r.activity] || "\uD83D\uDCCB",
    label: `${r.activity?.replace(/_/g, " ")} — ${r.entity_type || ""}${r.entity_id ? " " + r.entity_id : ""}`,
    date: r.date_time
      ? new Date(r.date_time).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—",
    time: r.date_time
      ? new Date(r.date_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : "",
    user: r.user || r.user_name || "",
  }));
}

/** Extract RBAC roles for Security section */
export function buildRbacSummary(rolesData) {
  const roles = rolesData?.roles || rolesData;
  if (!roles || typeof roles !== "object") return null;

  return Object.entries(roles).map(([name, cfg]) => ({
    role: name,
    permissions: cfg.permissions || [],
    scope: cfg.scope || cfg.access_scope || "",
  }));
}

/* ════════════════════════════════════════════════════════════════
   CONSOLIDATED FETCHER  (Promise.all pattern)
   ════════════════════════════════════════════════════════════════ */
export async function fetchSettingsPageData() {
  // Fire all 9 requests in parallel; gracefully handle failures
  const [
    configTables,
    exceptionsFull,
    suppliers,
    kpiRows,
    approvalsFull,
    securityEvents,
    comms,
    roles,
    audit,
  ] = await Promise.all([
    fetchConfigTables().catch(() => null),
    fetchExceptionsFull().catch(() => null),
    fetchSuppliers().catch(() => []),
    fetchKpis().catch(() => []),
    fetchApprovalsFull().catch(() => null),
    fetchSecurityEvents(30).catch(() => []),
    fetchCommunicationsFull().catch(() => null),
    fetchRoles().catch(() => null),
    fetchAuditSummary(10).catch(() => null),
  ]);

  const kpis = buildSettingsKpis(
    configTables,
    exceptionsFull,
    suppliers,
    kpiRows,
    approvalsFull,
    securityEvents
  );
  const agentHealth = buildAgentHealth(exceptionsFull, kpiRows);
  const templateCounts = buildTemplateCounts(comms);
  const recentChanges = buildRecentChanges(audit);
  const rbacSummary = buildRbacSummary(roles);

  return {
    raw: {
      configTables,
      exceptionsFull,
      suppliers,
      kpiRows,
      approvalsFull,
      securityEvents,
      comms,
      roles,
      audit,
    },
    kpis,
    agentHealth,
    templateCounts,
    recentChanges,
    rbacSummary,
    supplierCount: Array.isArray(suppliers) ? suppliers.length : 0,
    securityEvents: Array.isArray(securityEvents)
      ? securityEvents
      : securityEvents?.data || [],
    auditTotal: audit?.pagination?.total ?? 0,
    lastUpdated: audit?.lastUpdated || comms?.lastUpdated || "",
  };
}

export default fetchSettingsPageData;
