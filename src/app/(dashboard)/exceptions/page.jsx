// src/app/exceptions/page.jsx
"use client";

import React, { useState } from "react";

import StatCards from "@/components/exceptions/StatCards";
import ChartSection from "@/components/exceptions/ChartSection";
import ExceptionTable from "@/components/exceptions/ExceptionTable";
import SummaryPanel from "@/components/exceptions/SummaryPanel";
import AIAssistant from "@/components/exceptions/AIAssistant";
import TopVendors from "@/components/exceptions/TopVendors";

// Mock data strictly mirroring the provided UI layout
const mockExceptions = [
  { 
    id: "EXC-000124", 
    type: "Missing Invoice", 
    vendor: "ABC Manufacturing Ltd.", 
    requestId: "REQ-000124", 
    amount: 25000, 
    priority: "High", 
    status: "Awaiting Response", 
    owner: "Anita Verma", 
    dueDate: "16 May 2026", 
    daysOpen: 2 
  },
  { 
    id: "EXC-000125", 
    type: "Amount Mismatch", 
    vendor: "Global Supplies Inc.", 
    requestId: "REQ-000125", 
    amount: 12450, 
    priority: "High", 
    status: "In Progress", 
    owner: "Rohit Mehta", 
    dueDate: "15 May 2026", 
    daysOpen: 1 
  },
  { 
    id: "EXC-000126", 
    type: "Duplicate Payment", 
    vendor: "Tech Solutions Pvt. Ltd.", 
    requestId: "REQ-000126", 
    amount: 7500, 
    priority: "Medium", 
    status: "Awaiting Info", 
    owner: "Anita Verma", 
    dueDate: "18 May 2026", 
    daysOpen: 3 
  },
  { 
    id: "EXC-000127", 
    type: "Missing Credit Memo", 
    vendor: "Omega Components", 
    requestId: "REQ-000127", 
    amount: 5200, 
    priority: "Medium", 
    status: "In Progress", 
    owner: "Rohit Mehta", 
    dueDate: "20 May 2026", 
    daysOpen: 5 
  },
];

export default function ExceptionsPage() {
  // Sets the first row item as default active selection matching the UI layout state
  const [selectedException, setSelectedException] = useState(mockExceptions[0]);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans p-6 space-y-6">
      
      {/* 1. Dashboard Top Bar Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Exceptions</h1>
          <p className="text-xs text-slate-500 mt-0.5">Identify, analyze and resolve all reconciliation exceptions</p>
        </div>
        
        {/* Context Control Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded bg-white text-slate-700 hover:bg-slate-50 transition shadow-xs">
            Export
          </button>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition flex items-center gap-1 shadow-xs">
            Download Exceptions <span className="text-[10px] ml-0.5">▼</span>
          </button>
        </div>
      </div>

      {/* 2. Numeric Key Performance Indicators Banner */}
      <StatCards />

          <ChartSection /> 
      {/* 3. Visual Analytics Layer: 3 Charts (Left) + Top Vendors Leaderboard (Right) */}
          <TopVendors />
     
      <AIAssistant />

   

      {/* 5. Main Exception Workspace Desk Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Data Table Workspace Area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">Open Exceptions</h2>
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-xs">24</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                View All Exceptions
              </button>
              <button className="px-2 py-1 border border-slate-200 text-xs font-medium rounded bg-white text-slate-600 hover:bg-slate-50 transition flex items-center gap-1">
                🎛️ Filters
              </button>
            </div>
          </div>
          <ExceptionTable 
            data={mockExceptions} 
            onSelectRow={setSelectedException} 
            selectedId={selectedException?.id} 
          />
        </div>
        
        {/* Dynamic Context Summary Sidebar Drawer */}
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <SummaryPanel selected={selectedException} />
        </div>

      </div>
      
    </div>
  );
}
