// src/components/exceptions/AIAssistant.jsx
"use client";

import React from "react";

const steps = [
  { id: 1, label: "Detect", desc: "AI detects exceptions from reconciliation", icon: "🔍" },
  { id: 2, label: "Analyze", desc: "Classification & root cause analysis", icon: "🧠" },
  { id: 3, label: "Recommend", desc: "Suggested resolution & actions", icon: "✨" },
  { id: 4, label: "Resolve", desc: "Auto-resolve or assign to user", icon: "⚙️" },
  { id: 5, label: "Track", desc: "Monitor resolution & learn", icon: "📈" }
];

export default function AIAssistant() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Left-hand Progress Workflow Grid */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-purple-600 text-sm">👾</span>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">AI-Powered Exception Resolution Assistant</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center p-2 rounded-lg bg-slate-50/60 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-sm font-bold text-slate-700 relative z-10 mb-1.5">
                {step.icon}
              </div>
              <p className="text-[11px] font-bold text-slate-800">
                {step.id}. {step.label}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight max-w-[130px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right-hand Static Performance Ring */}
      <div className="w-full md:w-48 bg-purple-50/40 border border-purple-100 rounded-xl p-3 flex flex-col items-center justify-center text-center flex-shrink-0">
        <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-1">AI Auto-Resolution Rate</p>
        <div className="text-2xl font-black text-purple-900 tracking-tight">50%</div>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">This Month</p>
        <button className="text-[10px] text-purple-700 font-bold hover:underline mt-2">View AI Insights ›</button>
      </div>

    </div>
  );
}
