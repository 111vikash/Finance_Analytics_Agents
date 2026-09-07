// // test-databricks-app.mjs
// // Run: node test-databricks-app.mjs
// // Tests your Databricks App API connection with a PAT

// const DATABRICKS_APP_URL = "https://supplier-reconciliation-api-7405618958052519.19.azure.databricksapps.com";
// const DATABRICKS_TOKEN   = "dapida2557a1bb357fd1ec9be2fa63727a54"; // <-- Paste your PAT here

// // ---------- Quick connectivity test ----------
// async function testConnection() {
//   console.log("=== Databricks App API Test ===\n");
//   console.log(`App URL : ${DATABRICKS_APP_URL}`);
//   console.log(`Token   : ${DATABRICKS_TOKEN.slice(0, 8)}...****\n`);

//   try {
//     // Test 1: Root endpoint
//     console.log("[1] Testing root endpoint...");
//     const res1 = await fetch(DATABRICKS_APP_URL + "/", {
//       headers: { "Authorization": `Bearer ${DATABRICKS_TOKEN}` },
//     });
//     console.log(`    Status: ${res1.status} ${res1.statusText}`);
//     const body1 = await res1.text();
//     console.log(`    Body  : ${body1.slice(0, 300)}\n`);

//     // Test 2: Try a common API path (adjust to your actual endpoint)
//     console.log("[2] Testing /api endpoint (adjust path if needed)...");
//     const res2 = await fetch(DATABRICKS_APP_URL + "/api", {
//       headers: { "Authorization": `Bearer ${DATABRICKS_TOKEN}` },
//     });
//     console.log(`    Status: ${res2.status} ${res2.statusText}`);
//     const body2 = await res2.text();
//     console.log(`    Body  : ${body2.slice(0, 300)}\n`);

//     console.log("=== Test Complete ===");
//     console.log("\nIf you got 200, you're good! Copy the pattern below into your Next.js app.\n");

//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// testConnection();

// test-databricks-app.mjs
import { execSync } from 'child_process';

const APP_URL = "https://supplier-reconciliation-api-7405618958052519.19.azure.databricksapps.com";
const HOST    = "https://adb-7405618958052519.19.azuredatabricks.net";

// Get OAuth token from Databricks CLI
const token = execSync(`databricks auth token --host ${HOST}`, { encoding: 'utf-8' }).trim();

console.log("=== Databricks App API Test (OAuth) ===\n");
console.log(`Token: ${token.slice(0, 12)}...****\n`);

async function test() {
  // Test /api/ endpoint (Apps only support /api/ routes for token auth)
  console.log("[1] Testing /api/ endpoint...");
  const res = await fetch(`${APP_URL}/api/`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  console.log(`    Status: ${res.status} ${res.statusText}`);
  const body = await res.text();
  console.log(`    Body  : ${body.slice(0, 500)}\n`);
}

test();

// import { execSync } from 'child_process';

// function getToken() {
//   return execSync(
//     'databricks auth token --host https://adb-7405618958052519.19.azuredatabricks.net',
//     { encoding: 'utf-8' }
//   ).trim();
// }

// getToken();