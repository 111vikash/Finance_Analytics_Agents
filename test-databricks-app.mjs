// test-databricks-app.mjs
// Run: node test-databricks-app.mjs

const APP_URL = "http://localhost:8000"; // Your local FastAPI backend

async function test() {
  console.log("=== Supplier Reconciliation API Test ===\n");

  // Step 1: Login to get session
  console.log("[1] Logging in...");
  const loginRes = await fetch(`${APP_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "analyst@capgemini.com", role: "AP Manager" }),
  });
  const session = await loginRes.json();
  console.log(`    Session ID: ${session.session_id}`);
  console.log(`    Role: ${session.role}`);
  console.log(`    Expires: ${session.expires_at}\n`);

  const headers = { "X-Session-ID": session.session_id };

  // Step 2: Test all 4 endpoints that were failing
  const endpoints = [
    "/api/kpis",
    "/api/reconciliation/summary",
    "/api/dashboard/supplier",
    "/api/dashboard/confidence-trend?days=7",
  ];

  for (const ep of endpoints) {
    console.log(`[>] ${ep}`);
    const res = await fetch(`${APP_URL}${ep}`, { headers });
    console.log(`    Status: ${res.status} ${res.statusText}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`    Records: ${Array.isArray(data) ? data.length : "object"}\n`);
    } else {
      const err = await res.text();
      console.log(`    Error: ${err}\n`);
    }
  }

  console.log("=== Done ===");
}

test();