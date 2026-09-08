"use client";
/* ===========================================================================
   ExceptionsPage.jsx
   i360 Agentic Statement Reconciliation — Exceptions Dashboard
   ───────────────────────────────────────────────────────────────────────────
   Stack : Next.js 14+ (App Router) · React 18 · Tailwind CSS · TanStack Query v5
   Data  : ./exceptions.js → shared axiosInstance from @/app/lib/api
   =========================================================================== */

import React, { useState, useMemo, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  getExceptionsDashboard,
  getOpenExceptions,
  getAiRecommendations,
  submitExceptionOverride,
} from "@/app/lib/exceptions";

/* ═══════════════════════════════════════════════════════════════════════════
   1. TANSTACK QUERY HOOKS  (backed by ./exceptions.js service)
   ═══════════════════════════════════════════════════════════════════════════ */
const qOpts = { staleTime: 30_000, refetchOnWindowFocus: false };

function useExceptionsDashboard() {
  return useQuery({ queryKey: ["exceptionsDashboard"], queryFn: getExceptionsDashboard, ...qOpts });
}
function useOpenExceptions(params = {}) {
  return useQuery({ queryKey: ["openExceptions", params], queryFn: () => getOpenExceptions(params), keepPreviousData: true, ...qOpts });
}
function useAiRecommendations() {
  return useQuery({ queryKey: ["aiRecommendations"], queryFn: getAiRecommendations, ...qOpts });
}
function useOverrideMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: submitExceptionOverride,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["openExceptions"] });
      qc.invalidateQueries({ queryKey: ["aiRecommendations"] });
      qc.invalidateQueries({ queryKey: ["exceptionsDashboard"] });
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. UTILITY
   ═══════════════════════════════════════════════════════════════════════════ */
const fmtUSD = (n) =>
  n != null
    ? "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "$0.00";

/* ═══════════════════════════════════════════════════════════════════════════
   3. REUSABLE UI PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════ */
console.log(getExceptionsDashboard , "working")
/* ── SVG Donut Chart ─────────────────────────────────────────────────────── */
function DonutChart({ segments, size = 120, thickness = 18, centerLabel, centerSub }) {
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f0f0" strokeWidth={thickness} />
        {segments.map((seg) => {
          const len = total > 0 ? (seg.value / total) * C : 0;
          const gap = 2;
          const arc = (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(len - gap, 0)} ${C}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
          );
          offset += len;
          return arc;
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <span className="text-lg font-bold text-gray-800">{centerLabel}</span>}
          {centerSub && <span className="text-[10px] text-gray-500 uppercase tracking-wide">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, amount, color = "border-blue-500", valueColor = "text-gray-900", trend }) {
  return (
    <div className={`bg-white rounded-lg border-l-4 ${color} p-4 shadow-sm min-w-[150px] flex-1`}>
      <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">{label}</p>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      {amount && <p className="text-xs text-gray-400 mt-1">{amount}</p>}
      {trend && (
        <p className={`text-xs mt-1 ${trend.down ? "text-green-600" : "text-red-500"}`}>
          {trend.down ? "↓" : "↑"} {trend.value} vs last month
        </p>
      )}
    </div>
  );
}

const PRIORITY_CLS = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-blue-100 text-blue-700",
};
const STATUS_CLS = {
  "Awaiting Response": "bg-yellow-50 text-yellow-700 border border-yellow-300",
  "In Progress": "bg-blue-50 text-blue-700 border border-blue-300",
  "Awaiting Info": "bg-purple-50 text-purple-700 border border-purple-300",
  OPEN: "bg-red-50 text-red-700 border border-red-300",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border border-blue-300",
  AWAITING_RESPONSE: "bg-yellow-50 text-yellow-700 border border-yellow-300",
  RESOLVED: "bg-green-50 text-green-700 border border-green-300",
  CLOSED: "bg-gray-100 text-gray-600 border border-gray-300",
  REJECTED: "bg-red-50 text-red-600 border border-red-300",
};

function Badge({ text, palette = {} }) {
  const cls = palette[text] || "bg-gray-100 text-gray-600";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cls}`}>{text}</span>;
}

function LegendRow({ color, label, value, pctValue }) {
  return (
    <div className="flex items-center justify-between text-sm py-0.5">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-gray-700 truncate max-w-[160px]">{label}</span>
      </div>
      <span className="text-gray-500 text-xs ml-2 whitespace-nowrap">
        {value} ({pctValue}%)
      </span>
    </div>
  );
}

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. WIDGET COMPONENTS  (all driven by useExceptionsDashboard)
   ═══════════════════════════════════════════════════════════════════════════ */

function KpiSummaryRow() {
  const { data, isLoading } = useExceptionsDashboard();
  if (isLoading) {
    return (
      <div className="flex gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-24 flex-1 min-w-[150px]" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {(data?.kpiCards || []).map((card) => (
        <KpiCard
          key={card.label}
          label={card.label}
          value={card.value}
          amount={card.amount}
          color={card.color}
          valueColor={card.valueColor}
          trend={card.trend}
        />
      ))}
    </div>
  );
}

function ExceptionsByType() {
  const { data, isLoading } = useExceptionsDashboard();
  const items = data?.exceptionsByType || [];
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const segments = items.map((i) => ({ label: i.name, value: i.value, color: i.color }));

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex-1 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Exceptions by Type</h3>
        <a href="#" className="text-xs text-blue-600 hover:underline">View all exception types ›</a>
      </div>
      <div className="flex items-center gap-6">
        <DonutChart segments={segments} size={130} thickness={20} centerLabel={total} centerSub="Total" />
        <div className="flex-1 space-y-1">
          {items.map((i) => (
            <LegendRow key={i.name} color={i.color} label={i.name} value={i.value} pctValue={i.percentage} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExceptionsByPriority() {
  const { data, isLoading } = useExceptionsDashboard();
  const items = data?.exceptionsByPriority || [];
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const segments = items.map((i) => ({ label: i.name, value: i.value, color: i.color }));

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex-1 min-w-[280px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Exceptions by Priority</h3>
        <a href="#" className="text-xs text-blue-600 hover:underline">View all ›</a>
      </div>
      <div className="flex items-center gap-6">
        <DonutChart segments={segments} size={130} thickness={20} centerLabel={total} centerSub="Total" />
        <div className="flex-1 space-y-1">
          {items.map((i) => (
            <LegendRow key={i.name} color={i.color} label={i.displayName} value={i.value} pctValue={i.percentage} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlaEscalationOverview() {
  const { data, isLoading } = useExceptionsDashboard();
  const sla = data?.slaOverview;
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex-1 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">SLA & Escalation Overview</h3>
        <a href="#" className="text-xs text-blue-600 hover:underline">View SLA Policy ›</a>
      </div>
      <div className="flex items-center gap-6">
        <DonutChart segments={sla?.segments || []} size={130} thickness={20} centerLabel={`${sla?.withinSlaPct || 0}%`} centerSub="Within SLA" />
        <div className="flex-1 space-y-1">
          {(sla?.data || []).map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm py-0.5">
              <span className="text-gray-700">{item.label}</span>
              <span className={`font-semibold ${item.countColor || "text-gray-800"}`}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopVendorsTable() {
  const { data, isLoading } = useExceptionsDashboard();
  const top5 = data?.topVendors || [];
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Top Vendors with Exceptions</h3>
        <a href="#" className="text-xs text-blue-600 hover:underline">View All</a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase border-b">
            <th className="pb-2">Vendor Name</th>
            <th className="pb-2 text-center"># Exceptions</th>
            <th className="pb-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {top5.map((v, i) => (
            <tr key={v.id || i} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-3 text-gray-800">{v.name}</td>
              <td className="py-3 text-center font-medium">{v.exceptions ?? 0}</td>
              <td className="py-3 text-right font-medium text-gray-700">{v.amount}</td>
            </tr>
          ))}
          {top5.length === 0 && (
            <tr><td colSpan={3} className="py-6 text-center text-gray-400">No vendor data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const AI_STEPS = [
  { icon: "🔍", title: "1. Detect", desc: "AI detects exceptions from reconciliation" },
  { icon: "🔴", title: "2. Analyze", desc: "Classification & root cause analysis" },
  { icon: "✨", title: "3. Recommend", desc: "Suggested resolution & actions" },
  { icon: "⚙️", title: "4. Resolve", desc: "Auto-resolve or assign to user" },
  { icon: "☑️", title: "5. Track", desc: "Monitor resolution & learn" },
];

function AiPipelineSection() {
  const { data } = useExceptionsDashboard();
  const autoRate = data?.aiAutoRate || 0;
  return (
    <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl border p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <h3 className="font-semibold text-gray-700 uppercase tracking-wide text-sm">
            AI-Powered Exception Resolution Assistant
          </h3>
        </div>
        <div className="text-right bg-white rounded-lg shadow-sm border px-4 py-2">
          <p className="text-xs text-blue-600 font-semibold uppercase">AI Auto-Resolution Rate</p>
          <p className="text-3xl font-bold text-blue-700">{autoRate}%</p>
          <p className="text-xs text-gray-400">This Month</p>
          <a href="#" className="text-xs text-blue-600 hover:underline">View AI Insights ›</a>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {AI_STEPS.map((step) => (
          <div key={step.title} className="flex-1 min-w-[140px] bg-white rounded-lg border p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{step.icon}</div>
            <p className="font-semibold text-sm text-gray-800">{step.title}</p>
            <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. OPEN EXCEPTIONS TABLE — paginated via useOpenExceptions
   ═══════════════════════════════════════════════════════════════════════════ */
function OpenExceptionsTable({ onSelect, selectedId }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});

  const params = useMemo(() => ({ page, page_size: pageSize, ...filters }), [page, pageSize, filters]);
  const { data, isLoading, isFetching } = useOpenExceptions(params);

  const rows = data?.rows || [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasMore = data?.hasMore ?? page < totalPages;

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
    setPage(1);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-800 text-lg">Open Exceptions</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="text-sm text-blue-600 hover:underline">View All Exceptions</a>
          <button onClick={() => setFilters({})} className="flex items-center gap-1 text-sm text-gray-600 border rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <span>⊞</span> Filters
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <select className="text-xs border rounded px-2 py-1 bg-white" value={filters.priority || ""} onChange={(e) => handleFilterChange("priority", e.target.value)}>
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select className="text-xs border rounded px-2 py-1 bg-white" value={filters.exception_type || ""} onChange={(e) => handleFilterChange("exception_type", e.target.value)}>
          <option value="">All Types</option>
          <option value="Missing Invoice">Missing Invoice</option>
          <option value="Amount Mismatch">Amount Mismatch</option>
          <option value="Duplicate Payment">Duplicate Payment</option>
          <option value="Missing Credit Memo">Missing Credit Memo</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase border-b">
              <th className="pb-2 pr-4">Exception ID</th>
              <th className="pb-2 pr-4">Exception Type</th>
              <th className="pb-2 pr-4">Vendor</th>
              <th className="pb-2 pr-4">Request ID</th>
              <th className="pb-2 pr-4 text-right">Amount</th>
              <th className="pb-2 pr-4 text-center">Priority</th>
              <th className="pb-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="py-3 pr-4"><Skeleton className="h-4 w-full" /></td>
                    ))}
                  </tr>
                ))
              : rows.map((exc) => {
                  const id = exc.exception_id || exc.ticket_id || exc.id;
                  const isSelected = selectedId === id;
                  return (
                    <tr
                      key={id}
                      onClick={() => onSelect?.(exc)}
                      className={`border-b last:border-0 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 pr-4 text-blue-600 font-medium">{id}</td>
                      <td className="py-3 pr-4 text-gray-700">{exc.exception_type}</td>
                      <td className="py-3 pr-4 text-gray-700">{exc.supplier_name || exc.vendor}</td>
                      <td className="py-3 pr-4 text-gray-500">{exc.request_id || exc.invoice_number || "—"}</td>
                      <td className="py-3 pr-4 text-right font-medium">{fmtUSD(exc.amount)}</td>
                      <td className="py-3 pr-4 text-center">
                        <Badge text={exc.priority || "LOW"} palette={PRIORITY_CLS} />
                      </td>
                      <td className="py-3 text-center">
                        <Badge text={exc.status || exc.workbench_status || "OPEN"} palette={STATUS_CLS} />
                      </td>
                    </tr>
                  );
                })}
            {!isLoading && rows.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-gray-400">No exceptions found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>
          Showing {rows.length > 0 ? (page - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(page * pageSize, total)} of {total} exceptions
        </span>
        <div className="flex items-center gap-1">
          <button disabled={page <= 1} onClick={() => setPage(1)} className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-40">«</button>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-40">‹</button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pg = i + 1;
            return (
              <button key={pg} onClick={() => setPage(pg)} className={`px-3 py-1 border rounded font-medium ${pg === page ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50"}`}>
                {pg}
              </button>
            );
          })}
          <button disabled={!hasMore} onClick={() => setPage((p) => p + 1)} className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-40">›</button>
          <button disabled={!hasMore} onClick={() => setPage(totalPages)} className="px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-40">»</button>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="ml-2 border rounded px-2 py-1 text-xs">
            {[10, 25, 50, 100].map((s) => (<option key={s} value={s}>{s} / page</option>))}
          </select>
        </div>
      </div>
      {isFetching && !isLoading && <div className="mt-2 text-xs text-blue-500">Updating…</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. EXCEPTION SUMMARY SIDEBAR + AI ACTIONS
   ═══════════════════════════════════════════════════════════════════════════ */
function ExceptionSummarySidebar({ exception }) {
  const { data: aiRows = [] } = useAiRecommendations();
  const overrideMutation = useOverrideMutation();
  const [checkedActions, setCheckedActions] = useState({});

  const recommendations = useMemo(() => {
    if (!exception) return [];
    const excId = exception.exception_id || exception.ticket_id || exception.id;
    const matched = aiRows.filter(
      (r) => r.exception_id === excId || r.ticket_id === excId || r.invoice_number === exception.invoice_number || r.supplier_id === exception.supplier_id
    );
    return matched.length > 0 ? matched : aiRows.slice(0, 3);
  }, [aiRows, exception]);

  const toggleAction = (idx) => setCheckedActions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const handleTakeAction = () => {
    if (!exception) return;
    const selectedRecs = recommendations.filter((_, i) => checkedActions[i]);
    if (selectedRecs.length === 0) return alert("Please select at least one action.");
    overrideMutation.mutate({
      invoice_number: exception.invoice_number || exception.request_id,
      supplier_id: exception.supplier_id,
      field_overridden: "status",
      new_value: "RESOLVED",
      override_reason: selectedRecs.map((r) => r.recommendation || r.ai_action).join("; "),
    });
  };

  if (!exception) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-5 w-80 flex items-center justify-center text-gray-400 text-sm">
        Select an exception to view details
      </div>
    );
  }

  const excId = exception.exception_id || exception.ticket_id || exception.id;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 w-80 flex-shrink-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Exception Summary</h3>
          <p className="text-blue-600 font-medium text-sm">{excId}</p>
        </div>
        <a href="#" className="text-xs text-blue-600 hover:underline">View Details</a>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div>
          <p className="text-xs text-gray-500 uppercase">Type</p>
          <p className="font-medium text-gray-800">{exception.exception_type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Amount</p>
          <p className="font-bold text-gray-900">{fmtUSD(exception.amount)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Vendor</p>
          <p className="font-medium text-gray-800">{exception.supplier_name || exception.vendor}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Priority</p>
          <p className={`font-bold ${exception.priority === "HIGH" ? "text-red-600" : exception.priority === "MEDIUM" ? "text-yellow-600" : "text-blue-600"}`}>
            {exception.priority}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500 uppercase">Status</p>
          <Badge text={exception.status || exception.workbench_status || "OPEN"} palette={STATUS_CLS} />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-green-700 flex items-center gap-1">
            <span>✨</span> Recommended Actions
          </h4>
          <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            <span>🔄</span> Regenerate
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-2 italic">AI suggests the following Workflow checklist:</p>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <label
              key={i}
              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                checkedActions[i] ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <input type="checkbox" checked={!!checkedActions[i]} onChange={() => toggleAction(i)} className="accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">{rec.recommendation || rec.ai_action || `Action ${i + 1}`}</span>
            </label>
          ))}
          {recommendations.length === 0 && <p className="text-xs text-gray-400 py-2">No AI recommendations available</p>}
        </div>
      </div>

      <button
        onClick={handleTakeAction}
        disabled={overrideMutation.isPending}
        className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {overrideMutation.isPending ? "Processing…" : "Take Action ›"}
      </button>
      {overrideMutation.isSuccess && <p className="mt-2 text-xs text-green-600 text-center">Override submitted successfully!</p>}
      {overrideMutation.isError && (
        <p className="mt-2 text-xs text-red-600 text-center">
          Error: {overrideMutation.error?.response?.data?.detail || "Failed to submit"}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. MAIN PAGE COMPOSITION
   ═══════════════════════════════════════════════════════════════════════════ */
function ExceptionsPageContent() {
  const [selectedExc, setSelectedExc] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
        {/* ── Page Header ───────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exceptions</h1>
            <p className="text-sm text-gray-500">Identify, analyze and resolve all reconciliation exceptions</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 font-medium">Export</button>
            <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium flex items-center gap-1">
              Download Exceptions <span className="ml-1">▾</span>
            </button>
          </div>
        </div>

        <KpiSummaryRow />

        <div className="flex gap-4 flex-wrap">
          <ExceptionsByType />
          <ExceptionsByPriority />
          <SlaEscalationOverview />
        </div>

        <TopVendorsTable />
        <AiPipelineSection />

        <div className="flex gap-4">
          <OpenExceptionsTable
            onSelect={setSelectedExc}
            selectedId={selectedExc?.exception_id || selectedExc?.ticket_id || selectedExc?.id}
          />
          <ExceptionSummarySidebar exception={selectedExc} />
        </div>

        <footer className="text-center text-xs text-gray-400 py-4 border-t">
          © 2026 Capgemini. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. EXPORT — Wrapped with QueryClientProvider
   ═══════════════════════════════════════════════════════════════════════════ */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 30_000, refetchOnWindowFocus: false },
  },
});

export default function ExceptionsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExceptionsPageContent />
    </QueryClientProvider>
  );
}
