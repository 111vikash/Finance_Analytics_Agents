"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TYPE_COLORS = ["#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#94a3b8"];
const PRIORITY_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
const SLA_COLORS = ["#ef4444", "#10b981", "#f59e0b", "#a855f7"];

export default function ChartSection({
  exceptionsByType = [],
  exceptionsByPriority = [],
  slaEscalation = {},
}) {
  const totalType = useMemo(
    () => exceptionsByType.reduce((sum, item) => sum + (Number(item.value) || 0), 0),
    [exceptionsByType]
  );

  const totalPriority = useMemo(
    () => exceptionsByPriority.reduce((sum, item) => sum + (Number(item.value) || 0), 0),
    [exceptionsByPriority]
  );

  const slaBreakdown = slaEscalation.breakdown || [];
  const slaTotal = slaBreakdown.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Exceptions by Type */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-700">Exceptions by Type</h3>
          <button className="text-[10px] text-blue-600 font-semibold hover:underline">
            View all exception types ›
          </button>
        </div>

        <div className="flex items-center gap-4 py-1 h-32">
          <div className="w-24 h-full relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exceptionsByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {exceptionsByType.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-extrabold text-slate-800 leading-none">
                {totalType}
              </span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
                Total
              </span>
            </div>
          </div>

          <div className="text-[11px] space-y-1 flex-1 text-slate-600">
            {exceptionsByType.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 truncate max-w-[110px]">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: TYPE_COLORS[idx % TYPE_COLORS.length] }}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="font-semibold text-slate-800 flex-shrink-0">
                  {item.value} ({item.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exceptions by Priority */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-700">Exceptions by Priority</h3>
          <button className="text-[10px] text-blue-600 font-semibold hover:underline">View all ›</button>
        </div>

        <div className="flex items-center gap-4 py-1 h-32">
          <div className="w-24 h-full relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exceptionsByPriority}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {exceptionsByPriority.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-extrabold text-slate-800 leading-none">
                {totalPriority}
              </span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
                Total
              </span>
            </div>
          </div>

          <div className="text-[11px] space-y-2 flex-1 text-slate-600">
            {exceptionsByPriority.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PRIORITY_COLORS[idx % PRIORITY_COLORS.length] }}
                  />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-800">
                  {item.value} ({item.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA Overview */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-700">SLA & Escalation Overview</h3>
          <button className="text-[10px] text-blue-600 font-semibold hover:underline">
            View SLA Policy ›
          </button>
        </div>

        <div className="flex items-center gap-4 py-1 h-32">
          <div className="w-24 h-full relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaBreakdown}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={-180}
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {slaBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={SLA_COLORS[index % SLA_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-slate-800 leading-none">
                {slaEscalation.slaPct}%
              </span>
              <span className="text-[7px] text-slate-400 font-bold tracking-tight uppercase mt-0.5 whitespace-nowrap">
                Within SLA
              </span>
            </div>
          </div>

          <div className="text-[11px] space-y-1.5 flex-1 text-slate-600">
            {slaBreakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="font-medium text-slate-700">
                  {item.label}
                </span>
                <span
                  className="font-bold px-1.5 py-0.5 rounded text-[10px]"
                  style={{
                    backgroundColor: `${SLA_COLORS[idx % SLA_COLORS.length]}15`,
                    color: SLA_COLORS[idx % SLA_COLORS.length],
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}