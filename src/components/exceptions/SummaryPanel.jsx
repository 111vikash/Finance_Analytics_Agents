
"use client";

import React, { useState } from "react";

// Helper for contextual status rendering inside the side drawer panel
const getStatusTheme = (status) => {
  switch (status) {
    case "Awaiting Response":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "In Progress":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "Awaiting Info":
      return "text-purple-600 bg-purple-50 border-purple-200";
    default:
      return "text-slate-600 bg-slate-50 border-slate-200";
  }
};

export default function SummaryPanel({ selected }) {
  const [actions, setActions] = useState([
    { id: 1, text: "Request invoice from vendor", checked: true },
    { id: 2, text: "Validate goods receipt for Jul 2026", checked: true },
    { id: 3, text: "Check for duplicate invoices", checked: false },
  ]);

  const toggleAction = (id) => {
    setActions(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  if (!selected) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-400 shadow-sm">
        Select an active row from the workspace log data grid to view configuration metrics.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-5 flex flex-col justify-between">
      
      {/* Panel Top Identifier */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-xs font-bold text-slate-800 tracking-tight">Exception Summary</h3>
          <p className="text-[11px] text-blue-600 font-bold mt-0.5 tracking-wide">{selected.id}</p>
        </div>
        <button className="text-[10px] text-blue-600 font-bold hover:underline">View Details</button>
      </div>

      {/* Structured Core Balance Matrix */}
      <div className="grid grid-cols-2 gap-y-3.5 gap-x-3 text-[11px] bg-slate-50/50 p-3 rounded-lg border border-slate-100">
        <div>
          <span className="text-slate-400 block font-medium uppercase text-[9px] tracking-wider mb-0.5">Type</span>
          <span className="font-semibold text-slate-700 block truncate" title={selected.type}>{selected.type}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium uppercase text-[9px] tracking-wider mb-0.5">Amount</span>
          <span className="font-extrabold text-slate-900 text-xs">${selected.amount.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium uppercase text-[9px] tracking-wider mb-0.5">Vendor</span>
          <span className="font-semibold text-slate-700 block truncate" title={selected.vendor}>{selected.vendor}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-medium uppercase text-[9px] tracking-wider mb-0.5">Priority</span>
          <span className={`inline-block font-bold text-[10px] ${selected.priority === "High" ? "text-red-600" : "text-amber-600"}`}>
            {selected.priority}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-slate-400 block font-medium uppercase text-[9px] tracking-wider mb-0.5">Status</span>
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusTheme(selected.status)}`}>
            {selected.status}
          </span>
        </div>
      </div>

      {/* AI Smart Assistant Recommendations Panel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
            ✨ Recommended Actions
          </h4>
          <button className="text-[10px] text-slate-400 font-medium hover:text-slate-600 flex items-center gap-0.5">
            🔄 Regenerate
          </button>
        </div>
        <p className="text-[10px] text-slate-400 -mt-1 italic">AI suggests the following workflow checklist:</p>
        
        <div className="space-y-1.5">
          {actions.map((item) => (
            <label 
              key={item.id} 
              className={`flex items-start gap-2.5 p-2 rounded border transition text-[11px] cursor-pointer ${
                item.checked 
                  ? "bg-emerald-50/40 border-emerald-100 text-slate-700" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => toggleAction(item.id)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className={`leading-snug ${item.checked ? "line-through text-slate-400" : ""}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Main Execution Workflow Handler */}
      <div className="pt-2">
        <button 
          onClick={() => alert(`Initiating exception workflow strategy for item: ${selected.id}`)}
          className="w-full bg-slate-900 text-white font-bold text-xs py-2 rounded-lg hover:bg-slate-800 transition active:scale-[0.99] flex items-center justify-center gap-1 shadow-sm"
        >
          Take Action <span className="text-[10px]">❯</span>
        </button>
      </div>

    </div>
  );
}
