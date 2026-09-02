"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { VendorMetricsGrid } from "../../../components/vendor/VendorMetricsGrid";
import { VendorTemplates } from "../../../components/vendor/VendorTemplates";
import { VendorTimelineSection } from "../../../components/vendor/VendorTimelineSection";
import { VendorSLAMetrics } from "../../../components/vendor/VendorSLAMetrics";
import { VendorOpenRequestsTable } from "../../../components/vendor/VendorOpenRequestsTable";
import { VendorCommunicationsTable } from "../../../components/vendor/VendorCommunicationsTable";
import { VendorCompactTimeline } from "../../../components/vendor/VendorCompactTimeline";
import { VendorQuickActions } from "../../../components/vendor/VendorQuickActions";
import { VendorNotes } from "../../../components/vendor/VendorNotes";

export default function VendorPage() {
  const [vendorMenuOpen, setVendorMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
      <div className="mx-auto max-w-[1800px] space-y-3">

        {/* HEADER ACTIONS */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Side Heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Communications
            </h1>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Change Vendor */}
            <div className="relative">
              <button
                onClick={() => {
                  setVendorMenuOpen(!vendorMenuOpen);
                  setActionsMenuOpen(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              >
                Change Vendor
                <ChevronDown size={12} />
              </button>

              {vendorMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 w-44 rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {[
                    "ABC Manufacturing Ltd.",
                    "Global Industrial Supply",
                    "Northstar Components",
                  ].map((vendor) => (
                    <button
                      key={vendor}
                      onClick={() => setVendorMenuOpen(false)}
                      className="block w-full cursor-pointer rounded px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {vendor}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="relative">
              <button
                onClick={() => {
                  setActionsMenuOpen(!actionsMenuOpen);
                  setVendorMenuOpen(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded bg-[#0969c8] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
              >
                Actions
                <ChevronDown size={12} />
              </button>

              {actionsMenuOpen && (
                <div className="absolute right-0 z-30 mt-1 w-40 rounded border border-slate-200 bg-white p-1 shadow-lg">
                  {[
                    "Send Statement Request",
                    "Export Vendor View",
                    "Mark for Review",
                  ].map((action) => (
                    <button
                      key={action}
                      onClick={() => setActionsMenuOpen(false)}
                      className="block w-full cursor-pointer rounded px-3 py-2 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* METRICS GRID */}
        <VendorMetricsGrid />

        {/* TOP GRID - Timeline & Templates */}
        <div className="grid grid-cols-12 gap-4">
          <VendorTimelineSection />
          <VendorTemplates />
        </div>

        {/* SLA METRICS */}
        <div className="grid grid-cols-12 gap-4">
          <VendorSLAMetrics />
        </div>

        {/* OPEN REQUESTS TABLE */}
        <div className="grid grid-cols-12 gap-3">
          <VendorOpenRequestsTable />
        </div>

        {/* COMMUNICATIONS TABLE */}
        <div className="grid grid-cols-12 gap-4">
          <VendorCommunicationsTable />
        </div>

        {/* BOTTOM SECTION - Timeline, Quick Actions, Notes */}
        <div className="grid grid-cols-12 gap-4">
          <VendorCompactTimeline />
          <VendorQuickActions />
          <VendorNotes />
        </div>
      </div>
    </div>
  );
}