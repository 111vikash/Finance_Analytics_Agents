"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axiosInstance from "@/app/lib/api";
import { useAutoLogin } from "@/app/hooks/useAutoLogin";
import KpiCard from "../../../components/dashboard/KpiCard";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Check,
  CalendarDays,
  CircleDollarSign,
  FileText,
  FileCheck2,
  Mail,
  Phone,
  ReceiptText,
  Upload,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock3,
  Building2,
  AlertCircle,
  MessageSquare,
  ArrowUpDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/* ──────────────────────────────────────────────────────────────
   DATA FETCHER
   ────────────────────────────────────────────────────────────── */
const fetchVendorData = async () => {
  const res = await axiosInstance.get("/api/communications/full");
  return res.data?.data || res.data;
};

/* ──────────────────────────────────────────────────────────────
   REUSABLE TANSTACK TABLE COMPONENT
   ────────────────────────────────────────────────────────────── */
function DataTable({ columns, data, pageSize = 10, title, badge, action }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-3 px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {badge !== undefined && (
            <span className="rounded bg-blue-600 px-1.5 py-0.5 text-xs font-bold text-white">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search…"
            className="rounded border border-slate-200 bg-[#fbfcfe] px-2.5 py-1.5 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
          {action}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-xs">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-slate-500">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-3 py-2.5 text-left"
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <ArrowUpDown size={10} className="text-slate-400" />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-xs text-slate-400"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 text-slate-600 transition hover:bg-blue-50/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2.5">
        <span className="text-xs text-slate-500">
          Showing{" "}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          {"–"}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} items
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="px-2 text-xs font-medium text-slate-700">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="rounded p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
          >
            <ChevronsRight size={14} />
          </button>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="ml-2 cursor-pointer rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-600 outline-none"
          >
            {[5, 10, 20, 50].map((ps) => (
              <option key={ps} value={ps}>
                {ps} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CHART PALETTE
   ────────────────────────────────────────────────────────────── */
const INTENT_COLORS = ["#3b82f6", "#f97316", "#8b5cf6", "#22c55e", "#ef4444", "#06b6d4"];
const URGENCY_COLORS = ["#f59e0b", "#22c55e", "#ef4444", "#6366f1"];

/* ──────────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────────── */
export default function VendorPage() {
  const { loading: authLoading, error: authError } = useAutoLogin();

  const {
    data: apiData,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["vendorPage"],
    queryFn: fetchVendorData,
    enabled: !authLoading && !authError,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  /* ── Vendor list & selection ────────────────────────────── */
  const vendorList = useMemo(() => {
    const drafts = Array.isArray(apiData?.drafts?.data) ? apiData.drafts.data : [];
    const unique = [...new Set(drafts.map((d) => d.vendor).filter(Boolean))];
    return unique.sort();
  }, [apiData]);

  const [selectedVendor, setSelectedVendor] = useState("");
  useEffect(() => {
    if (vendorList.length > 0 && !selectedVendor) {
      setSelectedVendor(vendorList[0]);
    }
  }, [vendorList, selectedVendor]);

  const [vendorMenuOpen, setVendorMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  /* ── Filtered drafts for the selected vendor ───────────── */
  const vendorDrafts = useMemo(() => {
    const drafts = Array.isArray(apiData?.drafts?.data) ? apiData.drafts.data : [];
    if (!selectedVendor) return drafts;
    return drafts.filter((d) => d.vendor === selectedVendor);
  }, [apiData, selectedVendor]);

  /* ── Vendor summary for KPI cards ──────────────────────── */
  const vendorSummary = useMemo(() => {
    if (!vendorDrafts.length)
      return { vendor: selectedVendor || "—", totalDrafts: 0, exceptions: 0, statements: 0, latestDate: "—", nextFollowup: "—", status: "—", followupStage: "—" };

    const exceptions = vendorDrafts.filter((d) => d.category === "exception").length;
    const statements = vendorDrafts.filter((d) => d.category === "statement_request").length;
    const sorted = [...vendorDrafts].sort((a, b) => (b.generatedAt || "").localeCompare(a.generatedAt || ""));
    const latest = sorted[0] || {};

    return {
      vendor: selectedVendor || "—",
      totalDrafts: vendorDrafts.length,
      exceptions,
      statements,
      latestDate: latest.generatedAt ? latest.generatedAt.split(" ")[0] : "—",
      nextFollowup: latest.nextFollowup || "—",
      status: latest.status || "—",
      followupStage: latest.followupStage || "—",
    };
  }, [vendorDrafts, selectedVendor]);

  /* ── KPI cards (dynamic) ───────────────────────────────── */
  const kpiCards = useMemo(
    () => [
      {
        label: "Vendor",
        value: vendorSummary.vendor,
        change: `${vendorSummary.totalDrafts} draft(s)`,
        isTrendPositive: true,
        icon: Building2,
        iconColor: "text-violet-600",
        iconBgColor: "bg-violet-100",
      },
      {
        label: "Follow-up Stage",
        value: vendorSummary.followupStage.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        change: `Next: ${vendorSummary.nextFollowup}`,
        isTrendPositive: true,
        icon: CalendarDays,
        iconColor: "text-blue-600",
        iconBgColor: "bg-blue-100",
      },
      {
        label: "Draft Status",
        value: vendorSummary.status,
        change: `${vendorSummary.statements} statements, ${vendorSummary.exceptions} exceptions`,
        isTrendPositive: vendorSummary.status.includes("APPROVED"),
        icon: Clock3,
        iconColor: "text-cyan-600",
        iconBgColor: "bg-cyan-100",
      },
      {
        label: "SLA Status",
        value: vendorSummary.exceptions > 5 ? "At Risk" : vendorSummary.exceptions > 2 ? "Warning" : "On Track",
        change: `${vendorSummary.exceptions} exception draft(s)`,
        isTrendPositive: vendorSummary.exceptions <= 2,
        icon: AlertTriangle,
        iconColor: "text-orange-600",
        iconBgColor: "bg-orange-100",
      },
      {
        label: "Outstanding Exceptions",
        value: String(vendorSummary.exceptions),
        change: `Category: exception`,
        isTrendPositive: vendorSummary.exceptions === 0,
        icon: AlertCircle,
        iconColor: "text-red-600",
        iconBgColor: "bg-red-100",
      },
      {
        label: "Last Communication",
        value: vendorSummary.latestDate,
        change: `Generated at: ${vendorSummary.latestDate}`,
        isTrendPositive: true,
        icon: MessageSquare,
        iconColor: "text-emerald-600",
        iconBgColor: "bg-emerald-100",
      },
    ],
    [vendorSummary]
  );

  /* ── Open Requests columns (TanStack) ──────────────────── */
  const requestColumns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Request ID",
        cell: ({ getValue }) => <span className="font-semibold text-blue-600">{getValue()}</span>,
      },
      { accessorKey: "type", header: "Type" },
      {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ getValue }) => (
          <span className="max-w-[260px] truncate text-slate-700" title={getValue()}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
            {getValue()}
          </span>
        ),
      },
      { accessorKey: "owner", header: "Owner" },
      { accessorKey: "nextFollowup", header: "Due Date" },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => {
          const p = getValue();
          const cls =
            p === "High"
              ? "bg-red-50 text-red-600"
              : p === "Medium"
              ? "bg-amber-50 text-amber-600"
              : "bg-emerald-50 text-emerald-600";
          return <span className={`rounded px-2 py-1 text-xs font-semibold ${cls}`}>{p}</span>;
        },
      },
      { accessorKey: "generatedAt", header: "Generated" },
    ],
    []
  );

  const requestRows = useMemo(() => {
    return vendorDrafts.map((item, index) => ({
      id: `REQ-${String(index + 1).padStart(5, "0")}`,
      type: item.templateLabel || item.templateKey || "—",
      subject: item.subject || "—",
      status: item.status || "—",
      owner: item.vendor || item.email || "—",
      nextFollowup: item.nextFollowup || "—",
      priority:
        item.category === "exception" ? "High" : item.category === "statement_request" ? "Medium" : "Low",
      generatedAt: item.generatedAt || "—",
    }));
  }, [vendorDrafts]);

  /* ── Email Intents columns (TanStack) ──────────────────── */
  const intentColumns = useMemo(
    () => [
      { accessorKey: "senderEmail", header: "Sender Email" },
      {
        accessorKey: "primaryIntent",
        header: "Intent",
        cell: ({ getValue }) => {
          const v = getValue();
          const cls =
            v === "STATEMENT_SUBMISSION"
              ? "bg-blue-50 text-blue-700"
              : v === "MISSING_INVOICE"
              ? "bg-orange-50 text-orange-700"
              : "bg-slate-100 text-slate-700";
          return <span className={`rounded px-2 py-1 text-xs font-semibold ${cls}`}>{v}</span>;
        },
      },
      {
        accessorKey: "urgency",
        header: "Urgency",
        cell: ({ getValue }) => {
          const u = getValue();
          const cls = u === "Medium" ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold";
          return <span className={cls}>{u}</span>;
        },
      },
      { accessorKey: "sourceType", header: "Source" },
      {
        accessorKey: "aiConfidence",
        header: "AI Confidence",
        cell: ({ getValue }) => {
          const v = parseFloat(getValue());
          if (isNaN(v)) return "—";
          const pct = (v * 100).toFixed(0);
          const cls = v >= 0.8 ? "text-emerald-600" : v >= 0.6 ? "text-amber-600" : "text-red-500";
          return <span className={`font-semibold ${cls}`}>{pct}%</span>;
        },
      },
      {
        accessorKey: "aiRationale",
        header: "Rationale",
        cell: ({ getValue }) => (
          <span className="max-w-[240px] truncate text-slate-600" title={getValue() || ""}>
            {getValue() || "—"}
          </span>
        ),
      },
      { accessorKey: "classifiedAt", header: "Classified At" },
    ],
    []
  );

  const intentRows = useMemo(() => {
    return Array.isArray(apiData?.emailIntents?.data) ? apiData.emailIntents.data : [];
  }, [apiData]);

  /* ── Pie chart data ────────────────────────────────────── */
  const byIntentData = useMemo(() => {
    const raw = Array.isArray(apiData?.emailIntents?.byIntent) ? apiData.emailIntents.byIntent : [];
    return raw.map((d) => ({ name: d.intent, value: d.count }));
  }, [apiData]);

  const byUrgencyData = useMemo(() => {
    const raw = Array.isArray(apiData?.emailIntents?.byUrgency) ? apiData.emailIntents.byUrgency : [];
    return raw.map((d) => ({ name: d.urgency, value: d.count }));
  }, [apiData]);

  /* ── Follow-up Timeline (from vendor drafts) ───────────── */
  const timeline = useMemo(() => {
    if (!vendorDrafts.length) return [];
    const sorted = [...vendorDrafts].sort((a, b) => (a.generatedAt || "").localeCompare(b.generatedAt || ""));
    const STAGE_ICON_MAP = {
      initial_request: { color: "bg-blue-500", label: "Initial Request Sent" },
      first_reminder: { color: "bg-green-500", label: "First Reminder" },
      second_reminder: { color: "bg-purple-500", label: "Second Reminder" },
      escalation: { color: "bg-orange-500", label: "Escalation Triggered" },
    };
    const CATEGORY_MAP = {
      statement_request: { desc: "Statement request generated", status: "Completed" },
      exception: { desc: "Exception communication drafted", status: "Active" },
    };
    return sorted.slice(0, 6).map((d, i) => {
      const stageInfo = STAGE_ICON_MAP[d.followupStage] || { color: "bg-slate-400", label: d.followupStage || "Draft" };
      const catInfo = CATEGORY_MAP[d.category] || { desc: d.templateLabel || "", status: "Pending" };
      const dt = d.generatedAt ? new Date(d.generatedAt.replace(" ", "T")) : null;
      return {
        title: `${stageInfo.label} – ${d.templateLabel || d.templateKey || ""}`,
        desc: catInfo.desc + (d.subject ? ` — ${d.subject.slice(0, 60)}…` : ""),
        status: i === sorted.length - 1 ? "Pending" : catInfo.status,
        date: dt ? dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—",
        time: dt ? dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "—",
        color: stageInfo.color,
      };
    });
  }, [vendorDrafts]);

  /* ── Templates (static) ────────────────────────────────── */
  const templates = [
    { title: "Initial Statement Request", desc: "Request supplier statement for the period", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Missing Invoice Request", desc: "Request details for missing invoices", icon: FileText, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Payment Confirmation", desc: "Confirm unapplied or mismatched payments", icon: CircleDollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Credit Note Clarification", desc: "Request clarification for credit notes", icon: ReceiptText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Balance Confirmation", desc: "Request balance confirmation from vendor", icon: FileCheck2, color: "text-green-600", bg: "bg-green-50" },
  ];

  /* ── Status badge helper ────────────────────────────────── */
  const statusBadge = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Active") return "bg-orange-100 text-orange-700";
    if (status === "Pending") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  /* ── Pie custom label ──────────────────────────────────── */
  const renderCustomLabel = ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`;

  /* ── Loading / Error ────────────────────────────────────── */
  if (authLoading || queryLoading) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
        <div className="mx-auto max-w-[1800px] space-y-3">
          <div className="text-slate-600">Loading vendor page…</div>
        </div>
      </div>
    );
  }
  if (authError || queryError) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
        <div className="mx-auto max-w-[1800px] space-y-3">
          <div className="text-red-600">
            Error: {(authError || queryError)?.message || "Failed to load vendor data"}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
      <div className="mx-auto max-w-[1800px] space-y-3">

        {/* ─── HEADER ACTIONS ─────────────────────────────── */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Communications</h1>

          <div className="flex items-center gap-2">
            {/* Vendor Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setVendorMenuOpen(!vendorMenuOpen); setActionsMenuOpen(false); }}
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              >
                {selectedVendor || "Change Vendor"}
                <ChevronDown size={12} />
              </button>
              {vendorMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 max-h-64 w-60 overflow-y-auto rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {vendorList.map((vendor) => (
                    <button
                      key={vendor}
                      onClick={() => { setSelectedVendor(vendor); setVendorMenuOpen(false); }}
                      className={`block w-full cursor-pointer rounded px-3 py-2 text-left text-xs transition ${
                        vendor === selectedVendor
                          ? "bg-blue-50 font-semibold text-blue-700"
                          : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {vendor}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setActionsMenuOpen(!actionsMenuOpen); setVendorMenuOpen(false); }}
                className="inline-flex cursor-pointer items-center gap-1 rounded bg-[#0969c8] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
              >
                Actions <ChevronDown size={12} />
              </button>
              {actionsMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 w-40 rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {["Send Statement Request", "Export Vendor View", "Mark for Review"].map((a) => (
                    <button key={a} onClick={() => setActionsMenuOpen(false)} className="block w-full cursor-pointer rounded px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700">
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── SIX KPI CARDS ─────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {kpiCards.map((card) => (
            <KpiCard
              key={card.label}
              label={card.label}
              value={card.value}
              change={card.change}
              isTrendPositive={card.isTrendPositive}
              icon={card.icon}
              iconColor={card.iconColor}
              iconBgColor={card.iconBgColor}
            />
          ))}
        </div>

        {/* ─── TIMELINE + TEMPLATES ──────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Timeline */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
            <div className="mb-5 flex justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Follow-up Timeline</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">View All History</button>
            </div>
            {timeline.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No timeline data for this vendor.</p>
            ) : (
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="relative grid grid-cols-[32px_minmax(0,1fr)_95px_90px] items-start gap-2">
                    {index !== timeline.length - 1 && <div className="absolute left-4 top-8 h-14 w-px bg-slate-200" />}
                    <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-white shadow-sm`}>
                      <CheckCircle size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="break-words text-xs font-semibold leading-4 text-slate-700">{item.title}</h4>
                      <p className="mt-1 break-words text-xs leading-4 text-slate-500">{item.desc}</p>
                    </div>
                    <div className="-ml-6 flex justify-start">
                      <span className={`inline-flex min-w-[88px] items-center justify-center rounded px-2 py-1 text-xs font-semibold ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium leading-4 text-slate-500">{item.date}</div>
                      <div className="mt-1 text-xs leading-4 text-slate-400">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
            <div className="mb-5 flex justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Communication Templates</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Manage Templates</button>
            </div>
            <div className="space-y-3">
              {templates.map(({ title, desc, icon: Icon, color, bg }) => (
                <div key={title} className="flex items-center justify-between gap-3 rounded border border-slate-200 bg-[#fbfcfe] px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50/30">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${bg}`}>
                      <Icon size={15} className={color} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{title}</div>
                      <div className="text-xs text-slate-600">{desc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(title)}
                    className={`shrink-0 rounded border px-2 py-1 text-xs font-semibold ${
                      selectedTemplate === title
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {selectedTemplate === title ? "Selected" : "Use Template"}
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-3 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-xs font-semibold text-blue-600 hover:text-blue-800">
              View All Templates <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ─── PIE CHARTS: byIntent + byUrgency ──────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Email Intents Distribution</h3>
            <div className="flex items-center gap-6">
              <div className="h-[200px] w-[200px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byIntentData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} label={renderCustomLabel}>
                      {byIntentData.map((_, idx) => (
                        <Cell key={idx} fill={INTENT_COLORS[idx % INTENT_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {byIntentData.map((d, idx) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: INTENT_COLORS[idx % INTENT_COLORS.length] }} />
                      <span className="text-slate-600">{d.name.replace(/_/g, " ")}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Urgency Distribution</h3>
            <div className="flex items-center gap-6">
              <div className="h-[200px] w-[200px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byUrgencyData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} label={renderCustomLabel}>
                      {byUrgencyData.map((_, idx) => (
                        <Cell key={idx} fill={URGENCY_COLORS[idx % URGENCY_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {byUrgencyData.map((d, idx) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: URGENCY_COLORS[idx % URGENCY_COLORS.length] }} />
                      <span className="text-slate-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── OPEN REQUESTS TABLE (TanStack) ────────────── */}
        <DataTable
          columns={requestColumns}
          data={requestRows}
          pageSize={10}
          title="Open Requests"
          badge={requestRows.length}
          action={
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">View All</button>
          }
        />

        {/* ─── EMAIL INTENTS TABLE (TanStack) ────────────── */}
        <DataTable
          columns={intentColumns}
          data={intentRows}
          pageSize={10}
          title="Email Intent Classifications"
          badge={apiData?.emailIntents?.total ?? intentRows.length}
          action={
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Export</button>
          }
        />

        {/* ─── SLA + RESPONSE + SCORE ────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          {/* SLA Compliance */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">SLA Compliance</h3>
              <select className="cursor-pointer bg-transparent text-xs font-medium text-slate-600 outline-none">
                <option>Sep 2026</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative h-[150px] w-[150px] shrink-0">
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">95.6%</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">Compliant</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Compliant", value: 95.6 }, { name: "At Risk", value: 3.2 }, { name: "Breached", value: 1.2 }]} dataKey="value" cx="50%" cy="50%" innerRadius={54} outerRadius={68} startAngle={90} endAngle={-270}>
                      <Cell fill="#22c55e" stroke="none" />
                      <Cell fill="#f97316" stroke="none" />
                      <Cell fill="#ef4444" stroke="none" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-1 flex-col gap-3 text-xs">
                {[
                  { label: "Compliant", pct: "95.6%", count: 1176, color: "#22c55e" },
                  { label: "At Risk", pct: "3.2%", count: 40, color: "#f97316" },
                  { label: "Breached", pct: "1.2%", count: 15, color: "#ef4444" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between font-medium">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-500">{s.label}</span>
                    </div>
                    <span className="text-slate-800">{s.pct} <span className="font-normal text-slate-400">({s.count})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Tracking */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Response Tracking</h4>
            <div className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4">
              <div className="relative h-32 w-32 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`} strokeDashoffset={`${2 * Math.PI * 50 * (1 - 92 / 100)}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">92%</span>
                  <span className="text-center text-xs text-slate-600">Response Rate</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-medium text-slate-600">
                {[{ l: "Total Requests", v: "24" }, { l: "Responded", v: "22" }, { l: "Pending", v: "2" }].map((r) => (
                  <div key={r.l} className="grid grid-cols-[1fr_auto] gap-2">
                    <span>{r.l}</span><span className="font-bold text-slate-800">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vendor Score */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-700">Vendor Communication Score</div>
                <div className="mt-0.5 text-xs text-slate-600">Based on last 6 months performance</div>
              </div>
              <div className="text-right">
                <div className="mb-1 inline-flex rounded bg-emerald-50 px-1.5 py-0.5 text-sm font-semibold text-emerald-600">Good</div>
                <div className="text-base tracking-[0.18em] text-amber-400">{"★ ★ ★ ★ "}<span className="text-slate-300">☆</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM: TIMELINE + QUICK ACTIONS + NOTES ──── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Compact Follow-up Timeline */}
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Follow-up Calendar</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">View Calendar</button>
            </div>
            <div className="relative space-y-3">
              <div className="absolute bottom-2 left-[31px] top-2 w-px bg-slate-200" />
              {vendorDrafts.slice(0, 4).map((d, i) => {
                const dt = d.generatedAt ? new Date(d.generatedAt.replace(" ", "T")) : null;
                const state = i < 2 ? "done" : i === 2 ? "active" : "pending";
                return (
                  <div key={`${d.templateKey}-${i}`} className="relative z-10 grid grid-cols-[30px_10px_1fr_auto] items-center gap-2">
                    <div className="text-center leading-none">
                      <div className={`text-xs font-bold ${state === "active" ? "text-orange-500" : "text-slate-600"}`}>
                        {dt ? String(dt.getDate()).padStart(2, "0") : "--"}
                      </div>
                      <div className="text-xs text-slate-400">{dt ? dt.toLocaleString("en", { month: "short" }) : ""}</div>
                    </div>
                    <div className={`h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm ${state === "done" ? "bg-emerald-500" : state === "active" ? "bg-orange-500" : "bg-slate-300"}`} />
                    <div className={`text-xs font-semibold ${state === "active" ? "text-slate-800" : "text-slate-600"}`}>
                      {d.templateLabel || d.templateKey}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      {dt ? dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "--"}
                      {state === "done" && <Check size={12} className="text-emerald-500" />}
                      {state === "active" && <Clock3 size={12} className="text-orange-500" />}
                      {state === "pending" && <Clock3 size={12} className="text-slate-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-3">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Quick Actions</h2>
            <div className="space-y-2">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#0969c8] py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]">
                <Mail size={16} /> Send Email
              </button>
              {[{ icon: Phone, label: "Log Phone Call" }, { icon: Upload, label: "Upload Document" }, { icon: ArrowRight, label: "Create Follow-up Task" }].map(({ icon: I, label }) => (
                <button key={label} className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                  <I size={16} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Notes</h2>
            <textarea
              value={note}
              onChange={(e) => { setNote(e.target.value); setNoteSaved(false); }}
              className="h-24 w-full resize-none rounded border border-slate-200 bg-[#fbfcfe] p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Add your notes…"
            />
            <button
              onClick={() => setNoteSaved(true)}
              className="mt-2 w-full cursor-pointer rounded bg-[#0969c8] py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
            >
              {noteSaved ? "Note Saved" : "Save Note"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
