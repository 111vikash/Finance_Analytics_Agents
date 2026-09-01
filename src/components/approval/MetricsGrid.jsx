import React from "react";
import {
  ClipboardCheck,
  Clock3,
  TriangleAlert,
  CheckCircle,
  BadgeAlert,
  Gauge,
} from "lucide-react";

const metrics = [
  {
    label: "Pending Approvals",
    value: "8",
    amount: "$ 1,257,540.00",
    icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
    iconBg: "bg-blue-100",
    valueColor: "text-blue-600",
  },
  {
    label: "Due Today",
    value: "2",
    amount: "$ 245,780.00",
    icon: <Clock3 className="h-6 w-6 text-amber-600" />,
    iconBg: "bg-amber-100",
    valueColor: "text-amber-600",
  },
  {
    label: "Overdue",
    value: "2",
    amount: "$ 98,450.00",
    icon: <TriangleAlert className="h-6 w-6 text-red-600" />,
    iconBg: "bg-red-100",
    valueColor: "text-red-600",
  },
  {
    label: "Approved (This Month)",
    value: "24",
    amount: "$ 4,852,310.00",
    icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
    iconBg: "bg-emerald-100",
    valueColor: "text-emerald-600",
  },
  {
    label: "Rejected (This Month)",
    value: "3",
    amount: "$ 56,230.00",
    icon: <BadgeAlert className="h-6 w-6 text-purple-600" />,
    iconBg: "bg-purple-100",
    valueColor: "text-purple-600",
  },
  {
    label: "Avg. Approval Time",
    value: "18.6 hrs",
    amount: "Target: 24 hrs",
    icon: <Gauge className="h-6 w-6 text-sky-600" />,
    iconBg: "bg-sky-100",
    valueColor: "text-sky-600",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((card, idx) => (
        <div
          key={idx}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>

              <div
                className={`mt-1 text-3xl font-bold leading-none ${card.valueColor}`}
              >
                {card.value}
              </div>

              <p className="mt-3 text-lg font-bold text-slate-900">
                {card.amount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}