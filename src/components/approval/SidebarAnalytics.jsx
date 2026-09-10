"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function SidebarAnalytics({
  reconciliationStatus,
  slaMonitoring,
  myWorkload,
  lastUpdated,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback chart values if backend breakdown is missing
  const fallbackChartData = [
    { name: "In Progress", value: 18, color: "#2563eb" },
    { name: "Pending Review", value: 16, color: "#f59e0b" },
    { name: "Approved", value: 6, color: "#10b981" },
    { name: "Rejected", value: 2, color: "#a855f7" },
  ];

  // Use backend breakdown if available, otherwise fallback
  const chartDataSource =
    reconciliationStatus?.breakdown && reconciliationStatus.breakdown.length > 0
      ? reconciliationStatus.breakdown
      : fallbackChartData;

  const chartData = chartDataSource.map((item) => ({
    name: item.label || item.name,
    value: Number(item.value) || 0,
    color:
      item.color ||
      (item.label === "In Progress"
        ? "#2563eb"
        : item.label === "Pending Review"
        ? "#f59e0b"
        : item.label === "Approved"
        ? "#10b981"
        : item.label === "Rejected"
        ? "#a855f7"
        : "#64748b"),
  }));

  const totalCount =
    reconciliationStatus?.total ||
    chartData.reduce((sum, item) => sum + item.value, 0);

  const overallCompletion =
    reconciliationStatus?.overallCompletion !== undefined
      ? reconciliationStatus.overallCompletion
      : 68;

  const slaBreakdown =
    slaMonitoring?.breakdown || [
      { label: "On Track", value: 28, pct: 66.7 },
      { label: "Due Today", value: 6, pct: 14.3 },
      { label: "At Risk", value: 6, pct: 14.3 },
      { label: "Overdue", value: 2, pct: 4.7 },
    ];

  const slaCompliance =
    slaMonitoring?.slaPct !== undefined ? slaMonitoring.slaPct : 85.7;

  const workloadPending =
    myWorkload?.pending !== undefined ? myWorkload.pending : 8;
  const workloadDueToday =
    myWorkload?.dueToday !== undefined ? myWorkload.dueToday : 2;
  const workloadOverdue =
    myWorkload?.overdue !== undefined ? myWorkload.overdue : 2;

  return (
    <div className="w-full flex gap-6">
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
            {mounted && chartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={35}
                    outerRadius={46}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-slate-900 leading-none">
                {totalCount}
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                Total
              </span>
            </div>
          </div>

          <div className="w-1/2 space-y-1 text-[11px]">
            {chartData.map((item, idx) => (
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
          <span className="font-bold text-blue-600">{overallCompletion}%</span>
        </div>
      </div>

      {/* SLA Target Conditions */}
      <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-900 text-xs">SLA Monitoring</h4>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">
            View SLA Policy
          </button>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {slaBreakdown.map((item, idx) => {
            const label = item.label || item.name || "";
            const value = item.value || 0;
            const pct = item.pct !== undefined ? item.pct : "";

            let rowClass = "bg-slate-50 text-slate-800";
            if (label.toLowerCase().includes("on track")) rowClass = "bg-emerald-50 text-emerald-800";
            else if (label.toLowerCase().includes("due today")) rowClass = "bg-amber-50 text-amber-800";
            else if (label.toLowerCase().includes("at risk")) rowClass = "bg-orange-50 text-orange-800";
            else if (label.toLowerCase().includes("overdue")) rowClass = "bg-red-50 text-red-800";

            return (
              <div key={idx} className={`flex justify-between p-2 rounded-lg ${rowClass}`}>
                <span>
                  {label === "On Track" ? "🟢 " : ""}
                  {label === "Due Today" ? "🟡 " : ""}
                  {label === "At Risk" ? "🟠 " : ""}
                  {label === "Overdue" ? "🔴 " : ""}
                  {label}
                </span>
                <span className="font-bold">
                  {value} ({pct !== "" ? `${pct}%` : "0%"})
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-500">SLA Compliance</span>
          <span className="font-bold text-emerald-600 text-sm">{slaCompliance}%</span>
        </div>
      </div>

      <div className="w-full">
        {/* Quick Action Matrix Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-2 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">Reviewer Actions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-100 transition shadow-sm">
              <span>✅</span> Approve
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-red-200 bg-red-50 text-red-700 rounded-lg font-semibold hover:bg-red-100 transition shadow-sm">
              <span>❌</span> Reject
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-slate-200 bg-slate-50 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition col-span-2 shadow-sm">
              <span>❓</span> Request Info
            </button>
          </div>
        </div>

        {/* Internal User Workload Distribution Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-900 text-xs">My Approval Workload</h4>
            <button className="text-[11px] font-bold text-blue-600 hover:underline">
              View Calendar
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
            <div>
              <div className="text-slate-400 font-medium">Pending</div>
              <div className="text-sm font-bold text-slate-800">{workloadPending}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Due Today</div>
              <div className="text-sm font-bold text-amber-600">{workloadDueToday}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Overdue</div>
              <div className="text-sm font-bold text-red-600">{workloadOverdue}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}