"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getReconciliationSummary } from "@/app/lib/reconciliation";
import { Button } from "@/components/common/Button";
import KpiCard from "@/components/dashboard/KpiCard";
import { UniversalTable } from "@/components/ui/table/DataTable";
import {
  Banknote,
  Landmark,
  Scale,
  Target,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Info,
  Download,
  Eye,
  RotateCcw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Column definition (tabs, search, filters, pagination handled by table)
// ---------------------------------------------------------------------------
const fmtAmount = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return "-";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const tableColumns = [
  {
    header: "Type",
    accessorKey: "row_type",
    cell: (info) => {
      const value = info.getValue();
      const styles = {
        Summary: "bg-slate-50 text-slate-700 border-slate-200",
        "Matched Item": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "Unmatched Item": "bg-rose-50 text-rose-700 border-rose-200",
        Exception: "bg-amber-50 text-amber-700 border-amber-200",
      };
      return (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
            styles[value] ?? "bg-slate-50 text-slate-700 border-slate-200"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    header: "Supplier",
    accessorKey: "supplier_name",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    header: "Reference",
    accessorKey: "reference",
    cell: (info) => (
      <span className="cursor-pointer font-medium text-blue-600 hover:underline">
        {info.getValue() ?? "-"}
      </span>
    ),
  },
  { header: "Period", accessorKey: "period" },
  {
    header: "Statement Amount",
    accessorKey: "statement_amount",
    cell: (info) => fmtAmount(info.getValue()),
  },
  {
    header: "ERP Amount",
    accessorKey: "erp_amount",
    cell: (info) => fmtAmount(info.getValue()),
  },
  {
    header: "Outstanding",
    accessorKey: "outstanding_amount",
    cell: (info) => fmtAmount(info.getValue()),
  },
  {
    header: "Match Status",
    accessorKey: "match_status",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "-";
      const styles = {
        Matched: "bg-emerald-50 text-emerald-700 border-emerald-200",
        "Partially Matched": "bg-sky-50 text-sky-700 border-sky-200",
        Unmatched: "bg-rose-50 text-rose-700 border-rose-200",
      };
      return (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
            styles[value] ?? "bg-slate-50 text-slate-700 border-slate-200"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  { header: "Confidence", accessorKey: "confidence" },
  { header: "Exception Type", accessorKey: "exception_type" },
  { header: "Priority", accessorKey: "priority" },
  // {
  //   header: "Action",
  //   id: "actions",
  //   cell: () => (
  //     <div className="flex items-center gap-2 text-slate-400">
  //       <button className="transition hover:text-slate-700">
  //         <Eye size={16} />
  //       </button>
  //       <button className="transition hover:text-slate-700">
  //         <RotateCcw size={16} />
  //       </button>
  //     </div>
  //   ),
  // },
];

// ===========================================================================
// Component
// ===========================================================================
export default function ReconciliationDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reconciliation-summary"],
    queryFn: getReconciliationSummary,
  });

  const kpis = data?.kpis ?? {};
  const aiInsights = data?.aiInsights ?? {};
  const tableData = data?.workbenchRows ?? [];

  return (
    <>
      {/* Header */}
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Reconciliation Workbench
            </h1>
            {data?.lastUpdated && (
              <p className="mt-1 text-xs text-slate-500">
                Last updated: {data.lastUpdated}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button
              variant="secondary"
              icon={Download}
              className="bg-white text-[#0b57d0] hover:bg-slate-100"
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Statement Amount"
            value={isLoading ? "Loading..." : kpis.statementFormatted}
            change={`${kpis.statementsCount ?? 0} extracted items`}
            isTrendPositive={true}
            icon={Banknote}
            iconColor="text-[#0b57d0]"
            iconBgColor="bg-[#0b57d0]/10"
          />

          <KpiCard
            label="ERP Balance"
            value={isLoading ? "Loading..." : kpis.erpFormatted}
            change="Vendor outstanding balance"
            isTrendPositive={true}
            icon={Landmark}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-50"
          />

          <KpiCard
            label="Variance"
            value={isLoading ? "Loading..." : kpis.varianceFormatted}
            change={kpis.varianceDirection ?? ""}
            isTrendPositive={(kpis.variance ?? 0) <= 0}
            icon={Scale}
            iconColor="text-rose-600"
            iconBgColor="bg-rose-50"
            accent={{ border: "border-rose-200" }}
          />

          <KpiCard
            label="Match Rate"
            value={isLoading ? "Loading..." : `${kpis.matchRate ?? 0}%`}
            change={`${kpis.openExceptions ?? 0} open exceptions`}
            isTrendPositive={(kpis.matchRate ?? 0) >= 50}
            icon={Target}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
        </div>

        {/* Table – tabs, search, filters, pagination all inside UniversalTable */}
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500 shadow-sm">
            Loading reconciliation data...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 py-16 text-center text-sm text-rose-600 shadow-sm">
            Failed to load reconciliation data. Please try again.
          </div>
        ) : (
          <UniversalTable data={tableData} columns={tableColumns} />
        )}

        {/* AI Insights */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                <Sparkles size={16} />
                AI Insights
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Automated context analysis for reconciliation exceptions and
                review prioritization.
              </p>
            </div>

            <Button
              variant="primary"
              className="bg-[#0b57d0] hover:bg-blue-700"
            >
              View All Insights
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <AlertTriangle size={15} />
                Attention Required
              </div>
              {aiInsights.attentionRequired ?? 0} items need your attention.
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <TrendingUp size={15} />
                High Confidence
              </div>
              {aiInsights.highConfidence ?? 0} items with strong matching
              recommendations.
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <Info size={15} />
                Pending Confirmation
              </div>
              {aiInsights.pendingConfirmation ?? 0} payments pending supplier
              confirmation.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
