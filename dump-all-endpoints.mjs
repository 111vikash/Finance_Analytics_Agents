// dump-all-endpoints.mjs
// Run: node dump-all-endpoints.mjs
// Outputs: api-dump.json with every endpoint's response

import { writeFileSync } from "fs";

const BASE = "http://localhost:8000";
const LOGIN_EMAIL = "admin@capgemini.com";
const LOGIN_ROLE = "Admin"; // Admin has full access to all endpoints

let SESSION_ID = null;

// ── helpers ──
async function api(method, path, body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (SESSION_ID) opts.headers["X-Session-ID"] = SESSION_ID;
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(`${BASE}${path}`, opts);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    return { status: res.status, ok: res.ok, data };
  } catch (err) {
    return { status: 0, ok: false, data: { error: err.message } };
  }
}

async function get(path) { return api("GET", path); }
async function post(path, body) { return api("POST", path, body); }

// ── main ──
async function main() {
  console.log("=== Dumping All API Endpoints ===\n");
  const output = { _meta: { generated_at: new Date().toISOString(), base_url: BASE } };

  // 1. Auth — Login
  console.log("[1/20] POST /api/auth/login");
  const login = await post("/api/auth/login", { email: LOGIN_EMAIL, role: LOGIN_ROLE });
  output["auth_login"] = { endpoint: "POST /api/auth/login", ...login };
  SESSION_ID = login.data?.session_id;
  console.log(`        Session: ${SESSION_ID}\n`);

  // 2. Auth — Session
  console.log("[2/20] GET /api/auth/session");
  output["auth_session"] = { endpoint: "GET /api/auth/session", ...(await get("/api/auth/session")) };

  // 3. Health (no auth)
  console.log("[3/20] GET /api/health");
  output["health"] = { endpoint: "GET /api/health", ...(await get("/api/health")) };

  // 4. Config — Roles (no auth)
  console.log("[4/20] GET /api/config/roles");
  output["config_roles"] = { endpoint: "GET /api/config/roles", ...(await get("/api/config/roles")) };

  // 5. Config — Tables
  console.log("[5/20] GET /api/config/tables");
  output["config_tables"] = { endpoint: "GET /api/config/tables", ...(await get("/api/config/tables")) };

  // 6. Suppliers
  console.log("[6/20] GET /api/suppliers");
  output["suppliers"] = { endpoint: "GET /api/suppliers", ...(await get("/api/suppliers")) };

  // 7. Single Supplier (use first supplier ID from list)
  const firstSupplierId = output.suppliers?.data?.[0]?.Supplier_ID || "7030126";
  console.log(`[7/20] GET /api/suppliers/${firstSupplierId}`);
  output["supplier_detail"] = { endpoint: `GET /api/suppliers/${firstSupplierId}`, ...(await get(`/api/suppliers/${firstSupplierId}`)) };

  // 8. Reconciliation Summary
  console.log("[8/20] GET /api/reconciliation/summary");
  output["reconciliation_summary"] = { endpoint: "GET /api/reconciliation/summary", ...(await get("/api/reconciliation/summary")) };

  // 9. Extracted Statements
  console.log("[9/20] GET /api/reconciliation/extracted-statements");
  output["extracted_statements"] = { endpoint: "GET /api/reconciliation/extracted-statements", ...(await get("/api/reconciliation/extracted-statements")) };

  // 10. Exceptions
  console.log("[10/20] GET /api/exceptions");
  output["exceptions"] = { endpoint: "GET /api/exceptions", ...(await get("/api/exceptions")) };

  // 11. KPIs
  console.log("[11/20] GET /api/kpis");
  output["kpis"] = { endpoint: "GET /api/kpis", ...(await get("/api/kpis")) };

  // 12. Supplier Dashboard
  console.log("[12/20] GET /api/dashboard/supplier");
  output["dashboard_supplier"] = { endpoint: "GET /api/dashboard/supplier", ...(await get("/api/dashboard/supplier")) };

  // 13. Confidence Trend
  console.log("[13/20] GET /api/dashboard/confidence-trend?days=30");
  output["dashboard_confidence_trend"] = { endpoint: "GET /api/dashboard/confidence-trend?days=30", ...(await get("/api/dashboard/confidence-trend?days=30")) };

  // 14. Reports — List
  console.log("[14/20] GET /api/reports");
  output["reports_list"] = { endpoint: "GET /api/reports", ...(await get("/api/reports")) };

  // 15. Reports — All 8 types
  const reportTypes = [
    "vendor-reconciliation", "exception-aging", "outstanding-balance", "sla-compliance",
    "duplicate-payments", "ai-decisions", "analyst-productivity", "audit-trail-summary",
  ];
  output["reports"] = {};
  for (const rt of reportTypes) {
    console.log(`[15/20] GET /api/reports/${rt}`);
    output["reports"][rt] = { endpoint: `GET /api/reports/${rt}`, ...(await get(`/api/reports/${rt}`)) };
  }

  // 16. Communications — Drafts
  console.log("[16/20] GET /api/communications/drafts");
  output["communications_drafts"] = { endpoint: "GET /api/communications/drafts", ...(await get("/api/communications/drafts")) };

  // 17. Communications — Email Intents
  console.log("[17/20] GET /api/communications/email-intents");
  output["communications_email_intents"] = { endpoint: "GET /api/communications/email-intents", ...(await get("/api/communications/email-intents")) };

  // 18. Communications — Flagged Cases
  console.log("[18/20] GET /api/communications/flagged-cases");
  output["communications_flagged_cases"] = { endpoint: "GET /api/communications/flagged-cases", ...(await get("/api/communications/flagged-cases")) };

  // 19. Approvals — Pending
  console.log("[19/20] GET /api/approvals/pending");
  output["approvals_pending"] = { endpoint: "GET /api/approvals/pending", ...(await get("/api/approvals/pending")) };

  // 20. Audit Trail
  console.log("[20/20] GET /api/audit-trail");
  output["audit_trail"] = { endpoint: "GET /api/audit-trail", ...(await get("/api/audit-trail")) };

  // 21. Security Events
  console.log("[bonus] GET /api/security/events");
  output["security_events"] = { endpoint: "GET /api/security/events?days=30", ...(await get("/api/security/events?days=30")) };

  // ── Save ──
  writeFileSync("api-dump.json", JSON.stringify(output, null, 2));

  // ── Summary ──
  console.log("\n=== Summary ===\n");
  const keys = Object.keys(output).filter((k) => k !== "_meta" && k !== "reports");
  for (const k of keys) {
    const r = output[k];
    const count = Array.isArray(r.data) ? r.data.length : r.data?.total ?? "-";
    console.log(`  ${r.ok ? "✅" : "❌"} ${r.status} ${r.endpoint}  →  ${count} records`);
  }
  // reports sub-entries
  for (const [rt, r] of Object.entries(output.reports || {})) {
    const count = r.data?.total ?? "-";
    console.log(`  ${r.ok ? "✅" : "❌"} ${r.status} GET /api/reports/${rt}  →  ${count} records`);
  }

  console.log(`\n📁 Saved to: api-dump.json`);
  console.log(`📊 File size: ${(Buffer.byteLength(JSON.stringify(output, null, 2)) / 1024).toFixed(1)} KB\n`);
}

main();