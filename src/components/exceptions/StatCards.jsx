
"use client";

import React from "react";

const statsConfig = [
  { 
    label: "Total Exceptions", 
    count: 24, 
    value: "$ 254,780.00", 
    borderColor: "border-l-blue-500" 
  },
  { 
    label: "High Priority", 
    count: 8, 
    value: "$ 128,450.00", 
    borderColor: "border-l-red-500",
    textClass: "text-red-600"
  },
  { 
    label: "Overdue", 
    count: 5, 
    value: "$ 72,340.00", 
    borderColor: "border-l-orange-500",
    textClass: "text-orange-600"
  },
  { 
    label: "Due Today", 
    count: 4, 
    value: "$ 36,220.00", 
    borderColor: "border-l-amber-500",
    textClass: "text-amber-600"
  },
  { 
    label: "SLA Breaches", 
    count: 3, 
    value: "$ 18,900.00", 
    borderColor: "border-l-rose-600",
    textClass: "text-rose-600"
  },
  { 
    label: "Auto-Resolved (AI)", 
    count: 12, 
    value: "This Month", 
    borderColor: "border-l-emerald-500",
    textClass: "text-emerald-600"
  }
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {statsConfig.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-white p-3 rounded-lg border border-slate-200 border-l-4 ${stat.borderColor} shadow-sm flex flex-col justify-between`}
        >
          <div>
            <p className="text-[11px] font-medium text-slate-500 tracking-tight">
              {stat.label}
            </p>
            <p className={`text-xl font-bold mt-1 mb-0.5 tracking-tight ${stat.textClass || "text-slate-800"}`}>
              {stat.count}
            </p>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">
            {stat.value}
          </p>
        </div>
      ))}
      
      {/* Average Resolution Time Trend Block */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-teal-500 shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
        <div>
          <p className="text-[11px] font-medium text-slate-500 tracking-tight">
            Avg. Resolution Time
          </p>
          <p className="text-xl font-bold text-slate-800 mt-1 mb-0.5 tracking-tight">
            2.3 Days
          </p>
        </div>
        <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
          ↓ 15% <span className="text-slate-400 font-normal">vs last month</span>
        </p>
      </div>
    </div>
  );
}
