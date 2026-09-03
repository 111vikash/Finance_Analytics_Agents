"use client";

import {
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const templateData = [
  { label: "Initial Statement Request", count: 8 },
  { label: "Missing Invoice Request", count: 5 },
  { label: "Credit Memo Clarification", count: 6 },
  { label: "Payment Confirmation", count: 4 },
  { label: "Balance Confirmation", count: 5 },
  { label: "Escalation Notice", count: 3 },
];

const quickActions = [
  {
    icon: "➕",
    label: "Create New Rule",
    color: "text-blue-600",
  },
  {
    icon: "👥",
    label: "Add Vendor",
    color: "text-green-600",
  },
  {
    icon: "⚙️",
    label: "Import Configuration",
    color: "text-purple-600",
  },
  {
    icon: "📊",
    label: "AI Optimization Review",
    color: "text-orange-600",
  },
];

export const CommunicationTemplates = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Communication Templates */}
      <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
        <div className="flex items-center gap-3 border-b border-slate-200 p-4">
          <MessageSquare className="h-5 w-5 text-purple-600" />

          <h2 className="text-sm font-bold text-slate-800">
            7. Communication Templates
          </h2>
        </div>

        <div className="flex-1">
          {templateData.map((template, index) => (
            <button
              key={template.label}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition ${
                index !== templateData.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-400" />

                <span className="text-sm font-medium text-slate-700">
                  {template.label}
                </span>
              </div>

              <span className="min-w-[24px] rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                {template.count}
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-slate-200">
          <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
            <span>Manage All Templates</span>

            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
        <h3 className="mb-3 text-sm font-bold text-slate-800">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <span className={`text-base ${action.color}`}>
                {action.icon}
              </span>

              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};