import { NextResponse } from "next/server";

const API_BASE = process.env.DATABRICKS_API_BASE_URL;
const DATABRICKS_HOST = process.env.DATABRICKS_HOST;

async function getServicePrincipalToken() {
  const clientId = process.env.DATABRICKS_CLIENT_ID;
  const clientSecret = process.env.DATABRICKS_CLIENT_SECRET;

  if (!DATABRICKS_HOST || !clientId || !clientSecret) {
    throw new Error(
      "Missing DATABRICKS_HOST, DATABRICKS_CLIENT_ID, or DATABRICKS_CLIENT_SECRET"
    );
  }

  if (
    clientId === "your_service_principal_client_id" ||
    clientSecret === "your_generated_secret_key"
  ) {
    throw new Error("Replace the service-principal placeholders in .env.local");
  }

  const tokenResponse = await fetch(`${DATABRICKS_HOST}/oidc/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope: "all-apis",
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    const details = await tokenResponse.text();
    throw new Error(`Databricks OAuth token request failed (${tokenResponse.status}): ${details}`);
  }

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error("Databricks OAuth response did not contain an access_token");
  }

  return tokenData.access_token;
}

async function proxyRequest(request, { params }) {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { error: "Missing DATABRICKS_API_BASE_URL" },
        { status: 500 }
      );
    }

    const resolvedParams = await params;
    const pathSegments = Array.isArray(resolvedParams?.path)
      ? resolvedParams.path
      : [];
    const path = pathSegments[0] === "api"
      ? pathSegments.slice(1).join("/")
      : pathSegments.join("/");
    const requestUrl = new URL(request.url);
    const targetUrl = `${API_BASE.replace(/\/$/, "")}/api/${path}${requestUrl.search}`;
    const accessToken = await getServicePrincipalToken();

    const headers = new Headers({
      Accept: request.headers.get("accept") || "application/json",
      Authorization: `Bearer ${accessToken}`,
    });
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    const sessionId = request.headers.get("X-Session-ID");
    if (sessionId) {
      headers.set("X-Session-ID", sessionId);
    }

    const body = ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.text();
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Databricks proxy failed:", error.message);
    return NextResponse.json(
      { error: "Databricks authentication or proxy request failed", details: error.message },
      { status: 502 }
    );
  }
}

export {
  proxyRequest as GET,
  proxyRequest as POST,
  proxyRequest as PUT,
  proxyRequest as DELETE,
};
