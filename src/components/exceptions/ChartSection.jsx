
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Configuration data mimicking your exact blueprint layout metrics
const typeData = [
  { name: "Missing Invoice", value: 10, color: "#3b82f6" },
  { name: "Amount Mismatch", value: 7, color: "#f59e0b" },
  { name: "Duplicate Payment", value: 3, color: "#ef4444" },
  { name: "Missing Credit Memo", value: 2, color: "#a855f7" },
  { name: "Other", value: 2, color: "#94a3b8" },
];

const priorityData = [
  { name: "High", value: 8, color: "#ef4444" },
  { name: "Medium", value: 9, color: "#f59e0b" },
  { name: "Low", value: 7, color: "#3b82f6" },
];

const slaData = [
  { name: "Within SLA", value: 20, color: "#10b981" },
  { name: "SLA Breach", value: 3, color: "#ef4444" },
  { name: "At Risk", value: 4, color: "#f59e0b" },
  { name: "Escalated", value: 2, color: "#a855f7" },
];

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Exceptions Type Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-700">Exceptions by Type</h3>
          <button className="text-[10px] text-blue-600 font-semibold hover:underline">View all exception types ›</button>
        </div>
        <div className="flex items-center gap-4 py-1 h-32">
          <div className="w-24 h-full relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-extrabold text-slate-800 leading-none">24</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
            </div>
          </div>
          <div className="text-[11px] space-y-1 flex-1 text-slate-600">
            {typeData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 truncate max-w-[110px]">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate">{item.name}</span>
                </span> 
                <span className="font-semibold text-slate-800 flex-shrink-0">
                  {item.value} ({((item.value / 24) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Priority Ring Card */}
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
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-extrabold text-slate-800 leading-none">24</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Total</span>
            </div>
          </div>
          <div className="text-[11px] space-y-2 flex-1 text-slate-600">
            {priorityData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span> 
                <span className="font-semibold text-slate-800">
                  {item.value} ({((item.value / 24) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SLA Status Gauge Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-700">SLA & Escalation Overview</h3>
          <button className="text-[10px] text-blue-600 font-semibold hover:underline">View SLA Policy ›</button>
        </div>
        <div className="flex items-center gap-4 py-1 h-32">
          <div className="w-24 h-full relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaData}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={-180}
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {slaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-slate-800 leading-none">83%</span>
              <span className="text-[7px] text-slate-400 font-bold tracking-tight uppercase mt-0.5 whitespace-nowrap">Within SLA</span>
            </div>
          </div>
          <div className="text-[11px] space-y-1.5 flex-1 text-slate-600">
            {slaData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="font-medium text-slate-700">{item.name}</span>
                <span className="font-bold px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
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
