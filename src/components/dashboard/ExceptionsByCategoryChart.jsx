import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#ef4444", "#f97316", "#6366f1", "#22c55e", "#06b6d4"];

export default function ExceptionsByCategoryChart({ barData = [] }) {
  const data = barData.length > 0
    ? barData
    : [{ name: "No Data", value: 1 }];

  const totalExceptions = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="w-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Exceptions by Category</h3>
        <span className="text-xs font-medium text-slate-400">
          {totalExceptions} total
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-[150px] w-[150px] shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-900">{totalExceptions}</span>
            <span className="text-[11px] font-medium text-slate-500">Exceptions</span>
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
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
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
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-slate-500 truncate max-w-[130px]">
                  {item.name.replace("_", " ")}
                </span>
              </div>
              <span className="text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}