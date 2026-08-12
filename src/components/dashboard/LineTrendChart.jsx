import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Exact colors matching the three line elements in the dashboard image
const TREND_COLORS = {
  statementsReceived: "#3b82f6",     // Blue line
  reconciliationsCompleted: "#22c55e", // Green line
  openExceptions: "#8b5cf6",          // Purple line
};

export default function ReconciliationTrendChart({
  data = [
    { name: "Dec 2024", received: 700, completed: 600, exceptions: 180 },
    { name: "Jan 2025", received: 900, completed: 700, exceptions: 170 },
    { name: "Feb 2025", received: 1050, completed: 780, exceptions: 160 },
    { name: "Mar 2025", received: 1200, completed: 850, exceptions: 200 },
    { name: "Apr 2025", received: 1220, completed: 900, exceptions: 220 },
    { name: "May 2025", received: 1245, completed: 1032, exceptions: 213 },
  ],
}) {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      {/* Header and Filter Action Section */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Reconciliation Trend</h3>
        <select className="bg-transparent text-xs text-slate-500 font-medium outline-none cursor-pointer border border-slate-200 rounded px-2 py-1">
          <option>Last 6 Months</option>
        </select>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              domain={[0, 1400]}
              ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                color: "#fff",
                border: "none",
                fontSize: "12px",
              }}
            />
            
            {/* Blue Line: Statements Received */}
            <Line
              type="monotone"
              dataKey="received"
              stroke={TREND_COLORS.statementsReceived}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.statementsReceived, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Green Line: Reconciliations Completed */}
            <Line
              type="monotone"
              dataKey="completed"
              stroke={TREND_COLORS.reconciliationsCompleted}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.reconciliationsCompleted, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Purple Line: Open Exceptions */}
            <Line
              type="monotone"
              dataKey="exceptions"
              stroke={TREND_COLORS.openExceptions}
              strokeWidth={2.5}
              dot={{ r: 4, fill: TREND_COLORS.openExceptions, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Key Legend directly matching the bottom of the reference chart */}
      <div className="mt-4 flex flex-wrap items-center justify-start gap-6 pl-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: TREND_COLORS.statementsReceived }} />
          <span>Statements Received</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: TREND_COLORS.reconciliationsCompleted }} />
          <span>Reconciliations Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: TREND_COLORS.openExceptions }} />
          <span>Open Exceptions</span>
        </div>
      </div>
    </div>
  );
}
