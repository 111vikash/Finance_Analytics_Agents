/**
 * vendor.js — Data service for Communications / Vendor page
 *
 * Follows the dashboard.js-style Promise.all mapper/transformer pattern.
 * Uses the shared lib/api.ts Axios instance.
 */
import axiosInstance from "@/app/lib/api";

/* ────────────────────────────────────────────────────────────
   RAW FETCHERS
   ──────────────────────────────────────────────────────────── */
const fetchCommunicationsFull = () =>
  axiosInstance.get("/api/communications/full").then((r) => r.data?.data || r.data);

/* ────────────────────────────────────────────────────────────
   TRANSFORMERS
   ──────────────────────────────────────────────────────────── */

/** Extract unique vendor names from drafts */
export function extractVendorList(apiData) {
  const drafts = Array.isArray(apiData?.drafts?.data) ? apiData.drafts.data : [];
  return [...new Set(drafts.map((d) => d.vendor).filter(Boolean))].sort();
}

/** Filter drafts by vendor */
export function filterDraftsByVendor(apiData, vendorName) {
  const drafts = Array.isArray(apiData?.drafts?.data) ? apiData.drafts.data : [];
  if (!vendorName) return drafts;
  return drafts.filter((d) => d.vendor === vendorName);
}

/** Build vendor summary for KPI cards */
export function buildVendorSummary(vendorDrafts, vendorName) {
  if (!vendorDrafts.length) {
    return {
      vendor: vendorName || "\u2014",
      totalDrafts: 0,
      exceptions: 0,
      statements: 0,
      latestDate: "\u2014",
      nextFollowup: "\u2014",
      status: "\u2014",
      followupStage: "\u2014",
    };
  }

  const exceptions = vendorDrafts.filter((d) => d.category === "exception").length;
  const statements = vendorDrafts.filter((d) => d.category === "statement_request").length;
  const sorted = [...vendorDrafts].sort(
    (a, b) => (b.generatedAt || "").localeCompare(a.generatedAt || "")
  );
  const latest = sorted[0] || {};

  return {
    vendor: vendorName || "\u2014",
    totalDrafts: vendorDrafts.length,
    exceptions,
    statements,
    latestDate: latest.generatedAt ? latest.generatedAt.split(" ")[0] : "\u2014",
    nextFollowup: latest.nextFollowup || "\u2014",
    status: latest.status || "\u2014",
    followupStage: latest.followupStage || "\u2014",
  };
}

/** Map drafts to Open Requests table rows */
export function mapDraftsToRequests(vendorDrafts) {
  return vendorDrafts.map((item, index) => ({
    id: `REQ-${String(index + 1).padStart(5, "0")}`,
    type: item.templateLabel || item.templateKey || "\u2014",
    subject: item.subject || "\u2014",
    status: item.status || "\u2014",
    owner: item.vendor || item.email || "\u2014",
    nextFollowup: item.nextFollowup || "\u2014",
    priority:
      item.category === "exception"
        ? "High"
        : item.category === "statement_request"
        ? "Medium"
        : "Low",
    generatedAt: item.generatedAt || "\u2014",
  }));
}

/** Build timeline entries from vendor drafts */
export function buildTimeline(vendorDrafts) {
  if (!vendorDrafts.length) return [];

  const sorted = [...vendorDrafts].sort(
    (a, b) => (a.generatedAt || "").localeCompare(b.generatedAt || "")
  );

  const STAGE_MAP = {
    initial_request: { color: "bg-blue-500", label: "Initial Request Sent" },
    first_reminder: { color: "bg-green-500", label: "First Reminder" },
    second_reminder: { color: "bg-purple-500", label: "Second Reminder" },
    escalation: { color: "bg-orange-500", label: "Escalation Triggered" },
  };

  const CAT_MAP = {
    statement_request: { desc: "Statement request generated", status: "Completed" },
    exception: { desc: "Exception communication drafted", status: "Active" },
  };

  return sorted.slice(0, 6).map((d, i) => {
    const stage = STAGE_MAP[d.followupStage] || { color: "bg-slate-400", label: d.followupStage || "Draft" };
    const cat = CAT_MAP[d.category] || { desc: d.templateLabel || "", status: "Pending" };
    const dt = d.generatedAt ? new Date(d.generatedAt.replace(" ", "T")) : null;

    return {
      title: `${stage.label} \u2013 ${d.templateLabel || d.templateKey || ""}`,
      desc: cat.desc + (d.subject ? ` \u2014 ${d.subject.slice(0, 60)}\u2026` : ""),
      status: i === sorted.length - 1 ? "Pending" : cat.status,
      date: dt
        ? dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "\u2014",
      time: dt
        ? dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        : "\u2014",
      color: stage.color,
    };
  });
}

/** Transform byIntent for pie chart */
export function transformByIntent(apiData) {
  const raw = Array.isArray(apiData?.emailIntents?.byIntent)
    ? apiData.emailIntents.byIntent
    : [];
  return raw.map((d) => ({ name: d.intent, value: d.count }));
}

/** Transform byUrgency for pie chart */
export function transformByUrgency(apiData) {
  const raw = Array.isArray(apiData?.emailIntents?.byUrgency)
    ? apiData.emailIntents.byUrgency
    : [];
  return raw.map((d) => ({ name: d.urgency, value: d.count }));
}

/* ────────────────────────────────────────────────────────────
   CONSOLIDATED FETCHER (Promise.all pattern)
   ──────────────────────────────────────────────────────────── */
export async function fetchVendorPageData() {
  const [communicationsData] = await Promise.all([
    fetchCommunicationsFull(),
    // Add more API calls here when needed:
    // fetchSlaData(),
    // fetchResponseTracking(),
  ]);

  return {
    raw: communicationsData,
    vendorList: extractVendorList(communicationsData),
    emailIntents: communicationsData?.emailIntents?.data || [],
    byIntent: transformByIntent(communicationsData),
    byUrgency: transformByUrgency(communicationsData),
    draftsTotal: communicationsData?.drafts?.total ?? 0,
    intentsTotal: communicationsData?.emailIntents?.total ?? 0,
    byStatus: communicationsData?.drafts?.byStatus || [],
    byCategory: communicationsData?.drafts?.byCategory || [],
    flaggedCases: communicationsData?.flaggedCases?.data || [],
    lastUpdated: communicationsData?.lastUpdated || "",
  };
}

export default fetchVendorPageData;
