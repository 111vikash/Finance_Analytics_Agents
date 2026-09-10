"use client";

import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { create } from "zustand";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ClipboardCheck,
  Clock3,
  TriangleAlert,
  CheckCircle,
  BadgeAlert,
  Gauge,
  RefreshCw,
  SlidersHorizontal,
  Download,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "@/app/lib/api";

// ═══════════════════════════════════════════════════════════════
//  1. AXIOS INSTANCE
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
//  2. HELPERS
// ═══════════════════════════════════════════════════════════════

function formatCurrency(value) {
  return `$ ${Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const STATUS_COLOR_MAP = {
  OPEN: "#2563eb",
  "In Progress": "#2563eb",
  "Pending Review": "#f59e0b",
  Approved: "#10b981",
  Rejected: "#a855f7",
};

// ═══════════════════════════════════════════════════════════════
//  3. TRANSFORMERS  (dashboard.js-style mapper/transformer)
// ═══════════════════════════════════════════════════════════════

function mapApprovalRow(raw) {
  return {
    id: raw.ticket_id || raw.id,
    vendor: raw.supplier_name || raw.vendor || "Unknown Vendor",
    period: raw.statement_period || raw.period || "",
    type: raw.exception_type || raw.type || "",
    status: raw.workbench_status || raw.status || "",
    amount: Number(raw.supplier_amount ?? raw.amount ?? 0),
    priority: raw.priority || "",
    dueDate: raw.due_date || raw.dueDate || "",
    submittedBy: raw.submitted_by || raw.user_id || raw.submittedBy || "",
  };
}

function mapRecentSubmission(raw) {
  return {
    id: raw.ticket_id || raw.id,
    vendor: raw.supplier_name || raw.vendor || "Unknown Vendor",
    stamp: raw.created_at || raw.stamp || "",
    user: raw.submitted_by || raw.user_id || raw.user || "",
    type: raw.exception_type || raw.type || "",
    amount: Number(raw.supplier_amount ?? raw.amount ?? 0),
    status: raw.workbench_status || raw.status || "",
  };
}

function mapSummaryMetrics(raw) {
  return {
    pendingApprovals: { count: raw.pending_count ?? 0, amount: raw.pending_amount ?? 0 },
    dueToday: { count: raw.due_today_count ?? 0, amount: raw.due_today_amount ?? 0 },
    overdue: { count: raw.overdue_count ?? 0, amount: raw.overdue_amount ?? 0 },
    approvedThisMonth: { count: raw.approved_count ?? 0, amount: raw.approved_amount ?? 0 },
    rejectedThisMonth: { count: raw.rejected_count ?? 0, amount: raw.rejected_amount ?? 0 },
    avgApprovalTimeHrs: raw.avg_approval_time_hrs ?? 0,
    targetTatHrs: raw.target_tat_hrs ?? 24,
  };
}

function buildStatusBreakdown(raw) {
  return (raw || []).map((item) => ({
    name: item.status || item.name,
    value: item.count ?? item.value ?? 0,
    color: STATUS_COLOR_MAP[item.status || item.name] || "#94a3b8",
  }));
}

function buildSLAItems(raw) {
  const total = (raw.on_track ?? 0) + (raw.due_today ?? 0) + (raw.at_risk ?? 0) + (raw.overdue ?? 0);
  const pct = (v) => (total > 0 ? Math.round((v / total) * 1000) / 10 : 0);
  return [
    { label: "On Track", emoji: "\uD83D\uDFE2", count: raw.on_track ?? 0, percent: pct(raw.on_track ?? 0), bgClass: "bg-emerald-50", textClass: "text-emerald-800" },
    { label: "Due Today", emoji: "\uD83D\uDFE1", count: raw.due_today ?? 0, percent: pct(raw.due_today ?? 0), bgClass: "bg-amber-50", textClass: "text-amber-800" },
    { label: "At Risk", emoji: "\uD83D\uDFE0", count: raw.at_risk ?? 0, percent: pct(raw.at_risk ?? 0), bgClass: "bg-orange-50", textClass: "text-orange-800" },
    { label: "Overdue", emoji: "\uD83D\uDD34", count: raw.overdue ?? 0, percent: pct(raw.overdue ?? 0), bgClass: "bg-red-50", textClass: "text-red-800" },
  ];
}

// ═══════════════════════════════════════════════════════════════
//  4. API FETCHER  (Promise.all mapper/transformer pattern)
// ═══════════════════════════════════════════════════════════════

async function fetchApprovalDashboard() {
  const [pendingRes, summaryRes, recentRes, dashboard] = await Promise.all([
     axiosInstance.get("/api/approvals/pending"),
     axiosInstance.get("/api/approvals/summary"),
     axiosInstance.get("/api/approvals/recent"),
     axiosInstance.get("api/dashboard/full"),
  ]);
console.log(dashboard , "dashboard")
  const pendingApprovals = (pendingRes.data.approvals || []).map(mapApprovalRow);
  const recentSubmissions = (recentRes.data.submissions || []).map(mapRecentSubmission);
  const metrics = mapSummaryMetrics(summaryRes.data);
  const statusBreakdown = buildStatusBreakdown(summaryRes.data.status_breakdown || []);
  const slaRaw = summaryRes.data.sla || {};
  const slaItems = buildSLAItems(slaRaw);
  const slaCompliance = slaRaw.compliance_pct ?? 0;
  const totalItems = summaryRes.data.total_items ?? pendingApprovals.length;

  return {
    metrics,
    pendingApprovals,
    recentSubmissions,
    statusBreakdown,
    slaItems,
    slaCompliance,
    totalItems,
  };
}

// ═══════════════════════════════════════════════════════════════
//  5. ZUSTAND STORE  (global UI state)
// ═══════════════════════════════════════════════════════════════

const useApprovalStore = create((set) => ({
  selectedRows: [],
  filterOpen: false,
  toggleFilter: () => set((s) => ({ filterOpen: !s.filterOpen })),
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  clearSelection: () => set({ selectedRows: [] }),
}));

// ═══════════════════════════════════════════════════════════════
//  6. TANSTACK QUERY CLIENT
// ═══════════════════════════════════════════════════════════════

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchInterval: 60_000,
      retry: 2,
    },
  },
});

// ═══════════════════════════════════════════════════════════════
//  7. METRICS GRID COMPONENT
// ═══════════════════════════════════════════════════════════════

function MetricsGrid({ metrics, loading }) {
  const cards = [
    {
      label: "Pending Approvals",
      value: metrics?.pendingApprovals.count ?? "-",
      amount: metrics ? formatCurrency(metrics.pendingApprovals.amount) : "-",
      icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      valueColor: "text-blue-600",
    },
    {
      label: "Due Today",
      value: metrics?.dueToday.count ?? "-",
      amount: metrics ? formatCurrency(metrics.dueToday.amount) : "-",
      icon: <Clock3 className="h-6 w-6 text-amber-600" />,
      iconBg: "bg-amber-100",
      valueColor: "text-amber-600",
    },
    {
      label: "Overdue",
      value: metrics?.overdue.count ?? "-",
      amount: metrics ? formatCurrency(metrics.overdue.amount) : "-",
      icon: <TriangleAlert className="h-6 w-6 text-red-600" />,
      iconBg: "bg-red-100",
      valueColor: "text-red-600",
    },
    {
      label: "Approved (This Month)",
      value: metrics?.approvedThisMonth.count ?? "-",
      amount: metrics ? formatCurrency(metrics.approvedThisMonth.amount) : "-",
      icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      valueColor: "text-emerald-600",
    },
    {
      label: "Rejected (This Month)",
      value: metrics?.rejectedThisMonth.count ?? "-",
      amount: metrics ? formatCurrency(metrics.rejectedThisMonth.amount) : "-",
      icon: <BadgeAlert className="h-6 w-6 text-purple-600" />,
      iconBg: "bg-purple-100",
      valueColor: "text-purple-600",
    },
    {
      label: "Avg. Approval Time",
      value: metrics ? `${metrics.avgApprovalTimeHrs} hrs` : "-",
      amount: metrics ? `Target: ${metrics.targetTatHrs} hrs` : "-",
      icon: <Gauge className="h-6 w-6 text-sky-600" />,
      iconBg: "bg-sky-100",
      valueColor: "text-sky-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
            >
              {card.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>
              <div
                className={`mt-1 text-3xl font-bold leading-none ${card.valueColor}`}
              >
                {loading ? (
                  <span className="animate-pulse bg-slate-200 rounded w-12 h-8 inline-block" />
                ) : (
                  card.value
                )}
              </div>
              <p className="mt-3 text-lg font-bold text-slate-900">
                {loading ? (
                  <span className="animate-pulse bg-slate-200 rounded w-24 h-5 inline-block" />
                ) : (
                  card.amount
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  8. APPROVAL TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════

const STATUS_THEME = {
  OPEN: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Pending Review": "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const PRIORITY_THEME = {
  Critical: "text-red-700 bg-red-50",
  High: "text-red-600 bg-red-50",
  Medium: "text-amber-600 bg-amber-50",
  Low: "text-slate-500 bg-slate-100",
};

function ApprovalTable({ rows, loading }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Request ID",
        cell: (info) => (
          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
            {info.getValue()}
          </span>
        ),
      },
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "period", header: "Statement Period" },
      { accessorKey: "type", header: "Request Type" },
      {
        accessorKey: "status",
        header: "Reconciliation Status",
        cell: (info) => {
          const val = info.getValue();
          const theme =
            STATUS_THEME[val] || "bg-slate-50 text-slate-600 border-slate-200";
          return (
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold border ${theme}`}
            >
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Total Amount",
        cell: (info) => (
          <span className="font-semibold text-slate-900">
            {formatCurrency(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: (info) => {
          const val = info.getValue();
          const theme = PRIORITY_THEME[val] || "text-slate-500 bg-slate-100";
          return (
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${theme}`}>
              {val}
            </span>
          );
        },
      },
      { accessorKey: "dueDate", header: "Due Date" },
      { accessorKey: "submittedBy", header: "Submitted By" },
    ],
    []
  );

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 text-sm">Pending Approvals</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {rows.length}
          </span>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            <RefreshCw className="h-5 w-5 animate-spin inline-block mr-2" />
            Loading approvals...
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No pending approvals found.
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      onClick={h.column.getToggleSortingHandler()}
                      className="p-3 font-semibold uppercase tracking-wider cursor-pointer select-none hover:text-slate-700"
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{ asc: " \u25B2", desc: " \u25BC" }[
                        h.column.getIsSorted()
                      ] ?? ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  9. RECENT SUBMISSIONS TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════

function RecentSubmissionsTable({ rows, loading }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Request ID",
        cell: (info) => (
          <span className="text-blue-600 font-medium cursor-pointer">
            {info.getValue()}
          </span>
        ),
      },
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "stamp", header: "Submitted On" },
      { accessorKey: "user", header: "Submitted By" },
      { accessorKey: "type", header: "Request Type" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => (
          <span className="font-semibold text-slate-900">
            {formatCurrency(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const val = info.getValue();
          const theme =
            STATUS_THEME[val] || "bg-slate-50 text-slate-600 border-slate-200";
          return (
            <span
              className={`px-2 py-0.5 rounded text-xs font-semibold border ${theme}`}
            >
              {val}
            </span>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Recent Submissions</h3>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            <RefreshCw className="h-5 w-5 animate-spin inline-block mr-2" />
            Loading submissions...
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No recent submissions found.
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      onClick={h.column.getToggleSortingHandler()}
                      className="p-3 font-semibold uppercase tracking-wider cursor-pointer select-none hover:text-slate-700"
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{ asc: " \u25B2", desc: " \u25BC" }[
                        h.column.getIsSorted()
                      ] ?? ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  10. FOLLOW-UP TIMELINE COMPONENT
// ═══════════════════════════════════════════════════════════════

function FollowUpTimeline() {
  const steps = [
    { label: "Submission", meta: "12 May 2026", time: "02:30 PM", active: false, done: true },
    { label: "Pending Review", meta: "Current Step", time: "", active: true, done: false },
    { label: "Under Review", meta: "Pending", time: "", active: false, done: false },
    { label: "Decision", meta: "Pending", time: "", active: false, done: false },
    { label: "Completed", meta: "Pending", time: "", active: false, done: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-slate-900 text-xs mb-4">
        Follow-up Timeline
      </h3>
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 px-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex md:flex-col items-center md:text-center flex-1 w-full relative group"
          >
            {idx !== steps.length - 1 && (
              <div className="absolute left-3.5 top-7 w-0.5 h-10 md:left-1/2 md:top-3.5 md:w-full md:h-0.5 bg-slate-100 -z-0" />
            )}
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                step.active
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : step.done
                  ? "bg-blue-100 text-blue-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.done ? "\u2713" : idx + 1}
            </div>
            <div className="ml-4 md:ml-0 md:mt-2 text-left md:text-center min-w-0">
              <p
                className={`text-xs font-bold truncate ${
                  step.active ? "text-blue-600" : "text-slate-800"
                }`}
              >
                {step.label}
              </p>
              <p
                className={`text-[10px] truncate ${
                  step.active
                    ? "text-blue-500 font-semibold"
                    : "text-slate-400"
                }`}
              >
                {step.meta} {step.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  11. SIDEBAR ANALYTICS COMPONENT
// ═══════════════════════════════════════════════════════════════

function SidebarAnalytics({
  statusBreakdown,
  slaItems,
  slaCompliance,
  totalItems,
  metrics,
  loading,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const completionPct =
    totalItems > 0
      ? Math.round(
          ((statusBreakdown.find((s) => s.name === "Approved")?.value ?? 0) /
            totalItems) *
            100
        )
      : 0;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Reconciliation Ring Analytics */}
      <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-slate-900 text-xs">
            Reconciliation Status
          </h4>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">
            View Details
          </button>
        </div>
        <div className="flex items-center gap-4 h-32 relative">
          <div className="w-1/2 h-full relative flex items-center justify-center">
            {mounted && statusBreakdown.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    innerRadius={35}
                    outerRadius={46}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusBreakdown.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-slate-900 leading-none">
                {totalItems}
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                Total
              </span>
            </div>
          </div>
          <div className="w-1/2 space-y-1 text-[11px]">
            {statusBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-500 truncate">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Overall Completion</span>
          <span className="font-bold text-blue-600">{completionPct}%</span>
        </div>
      </div>

      {/* SLA Monitoring */}
      <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-900 text-xs">SLA Monitoring</h4>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">
            View SLA Policy
          </button>
        </div>
        <div className="space-y-1.5 text-[11px]">
          {slaItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between p-2 ${item.bgClass} ${item.textClass} rounded-lg`}
            >
              <span>
                {item.emoji} {item.label}
              </span>
              <span className="font-bold">
                {item.count} ({item.percent}%)
              </span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-500">SLA Compliance</span>
          <span className="font-bold text-emerald-600 text-sm">
            {slaCompliance}%
          </span>
        </div>
      </div>

      <div className="w-full">
        {/* Reviewer Actions */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-2 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">Reviewer Actions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-100 transition shadow-sm">
              <span>\u2705</span> Approve
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-red-200 bg-red-50 text-red-700 rounded-lg font-semibold hover:bg-red-100 transition shadow-sm">
              <span>\u274C</span> Reject
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-slate-200 bg-slate-50 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition col-span-2 shadow-sm">
              <span>\u2753</span> Request Info
            </button>
          </div>
        </div>

        {/* My Approval Workload */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-900 text-xs">
              My Approval Workload
            </h4>
            <button className="text-[11px] font-bold text-blue-600 hover:underline">
              View Calendar
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
            <div>
              <div className="text-slate-400 font-medium">Pending</div>
              <div className="text-sm font-bold text-slate-800">
                {metrics?.pendingApprovals.count ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Due Today</div>
              <div className="text-sm font-bold text-amber-600">
                {metrics?.dueToday.count ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Overdue</div>
              <div className="text-sm font-bold text-red-600">
                {metrics?.overdue.count ?? "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  12. MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

function ApprovalCenterContent() {
  const { filterOpen, toggleFilter } = useApprovalStore();

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["approval-dashboard"],
    queryFn: fetchApprovalDashboard,
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50 space-y-6 text-slate-800 min-h-screen">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Approval Center
          </h1>
          <p className="text-sm text-slate-500">
            Review and take action on reconciliation items requiring your
            approval.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFilter}
            className={`px-4 py-2 text-sm font-medium border rounded-lg shadow-sm flex items-center gap-2 transition-colors ${
              filterOpen
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Failed to load data: {error.message}
          <button
            onClick={() => refetch()}
            className="ml-2 underline font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Metrics */}
      <MetricsGrid metrics={data?.metrics ?? null} loading={loading} />

      {/* Tables + Timeline + Analytics */}
      <div className="grid grid-cols-1 gap-6 items-start">
        <ApprovalTable rows={data?.pendingApprovals ?? []} loading={loading} />
        <RecentSubmissionsTable
          rows={data?.recentSubmissions ?? []}
          loading={loading}
        />
        <FollowUpTimeline />
        <div>
          <SidebarAnalytics
            statusBreakdown={data?.statusBreakdown ?? []}
            slaItems={data?.slaItems ?? []}
            slaCompliance={data?.slaCompliance ?? 0}
            totalItems={data?.totalItems ?? 0}
            metrics={data?.metrics ?? null}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  13. DEFAULT EXPORT  (wraps with QueryClientProvider)
// ═══════════════════════════════════════════════════════════════

export default function ApprovalCenterPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApprovalCenterContent />
    </QueryClientProvider>
  );
}
