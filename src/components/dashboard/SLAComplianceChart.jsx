import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SLA_COLORS = ["#22c55e", "#f97316", "#ef4444", "#6366f1"];

export default function SLAComplianceChart({ progressData = [], compliancePct = "0.0" }) {
  const data = progressData.length > 0
    ? progressData
    : [{ name: "No Data", value: 100, count: 0 }];

  const totalCount = data.reduce((s, d) => s + (d.count || 0), 0);

  return (
    <div className="w-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">SLA Compliance</h3>
        <span className="text-xs font-medium text-slate-400">
          {totalCount} total items
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-[150px] w-[150px] shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-900">{compliancePct}%</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
              Compliant
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={68}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={SLA_COLORS[index % SLA_COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-1 flex-col gap-3 text-xs">
          {data.map((item, idx) => (
            <div key={item.name} className="flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: SLA_COLORS[idx % SLA_COLORS.length] }}
                />
                <span className="text-slate-500 truncate max-w-[120px]">{item.name}</span>
              </div>
              <span className="text-slate-800">
                {item.value}%{" "}
                <span className="font-normal text-slate-400">({item.count})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}