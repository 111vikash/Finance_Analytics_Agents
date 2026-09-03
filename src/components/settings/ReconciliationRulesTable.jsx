"use client";

import {
  ChevronRight,
  ScanLine,
  Copy,
  FlaskConical,
  Plus,
  Pencil,
  BadgeAlert,
  Trash2,
  CopyCheck,
  ClipboardCheck,
  MailSearch,
  FileSearch,
  FileWarning,
} from "lucide-react";

export const ReconciliationRulesTable = () => {
  const actionButtons = [
    {
      label: "Add Rule",
      icon: Plus,
      className:
        "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      label: "Edit",
      icon: Pencil,
      className:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
    {
      label: "Clone",
      icon: Copy,
      className:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
    {
      label: "Test Rule",
      icon: FlaskConical,
      className:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    },
  ];

  const reconciliationRules = [
    {
      id: "RR-001",
      desc: "Invoice Match",
      type: "Automated",
      status: "Active",
      date: "16 May 2026",
    },
    {
      id: "RR-002",
      desc: "Credit Memo Validation",
      type: "Automated",
      status: "Active",
      date: "15 May 2026",
    },
    {
      id: "RR-003",
      desc: "Duplicate Payment Check",
      type: "Semi-Auto",
      status: "Active",
      date: "16 May 2026",
    },
    {
      id: "RR-004",
      desc: "Amount Tolerance Check",
      type: "Automated",
      status: "Active",
      date: "14 May 2026",
    },
    {
      id: "RR-005",
      desc: "GL Account Validation",
      type: "Automated",
      status: "Active",
      date: "13 May 2026",
    },
  ];

  const exceptionItems = [
    {
      icon: Trash2,
      title: "Missing Invoice Logic",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: CopyCheck,
      title: "Duplicate Detection Settings",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ClipboardCheck,
      title: "Balance Mismatch Rules",
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      icon: MailSearch,
      title: "Unapplied Payment Logic",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: FileSearch,
      title: "Credit Note Validation",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: FileWarning,
      title: "Materiality Thresholds",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Reconciliation Rules */}

      <div>
        <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <ScanLine
                className="h-3 w-3 text-purple-600"
                strokeWidth={2.5}
              />
            </div>

            <h2 className="text-sm font-bold text-slate-800">
              2. Reconciliation Rules Management
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-4 pb-3">
            {actionButtons.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs font-medium ${item.className}`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      item.label !== "Add Rule"
                        ? "text-blue-600"
                        : ""
                    }`}
                  />

                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="px-4 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left font-semibold text-slate-600">
                      Rule ID
                    </th>

                    <th className="py-3 text-left font-semibold text-slate-600">
                      Description
                    </th>

                    <th className="py-3 text-left font-semibold text-slate-600">
                      Type
                    </th>

                    <th className="py-3 text-left font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="py-3 text-left font-semibold text-slate-600">
                      Last Updated
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reconciliationRules.map((rule) => (
                    <tr
                      key={rule.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 font-semibold text-blue-600">
                        {rule.id}
                      </td>

                      <td className="py-3 text-slate-700">
                        {rule.desc}
                      </td>

                      <td className="py-3 text-slate-600">
                        {rule.type}
                      </td>

                      <td className="py-3">
                        <span className="font-semibold text-green-600">
                          {rule.status}
                        </span>
                      </td>

                      <td className="py-3 text-slate-500">
                        {rule.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="mt-auto flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
            <span className="cursor-pointer">
              View All Rules
            </span>

            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exception Configuration */}

      <div>
        <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
              <BadgeAlert
                className="h-3 w-3 text-purple-600"
                strokeWidth={2.5}
              />
            </div>

            <h2 className="text-sm font-bold text-slate-800">
              3. Exception Configuration
            </h2>
          </div>

          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {exceptionItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <button
                    key={index}
                    className="
                      flex flex-col items-center justify-center
                      rounded-lg border border-slate-200
                      bg-white
                      p-4
                      text-center
                      transition-all
                      hover:border-blue-200
                      hover:shadow-sm
                      min-h-[115px]
                    "
                  >
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${item.bg}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${item.color}`}
                        strokeWidth={2}
                      />
                    </div>

                    <span className="text-sm font-semibold text-slate-700 leading-5">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="
              flex items-center justify-between
              border-t border-slate-200
              px-4 py-3
              text-sm font-semibold
              text-blue-600
              hover:bg-slate-50
            "
          >
            <span className="cursor-pointer">
              View All Exception Settings
            </span>

            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}