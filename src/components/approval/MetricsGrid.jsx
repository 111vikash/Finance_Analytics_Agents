import React from "react";
import {
  ClipboardCheck,
  Clock3,
  TriangleAlert,
  CheckCircle,
  BadgeAlert,
  Gauge,
} from "lucide-react";

const iconMap = {
  ClipboardCheck: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
  Clock: <Clock3 className="h-6 w-6 text-amber-600" />,
  AlertTriangle: <TriangleAlert className="h-6 w-6 text-red-600" />,
  CheckCircle2: <CheckCircle className="h-6 w-6 text-emerald-600" />,
  XCircle: <BadgeAlert className="h-6 w-6 text-gray-600" />,
  Timer: <Gauge className="h-6 w-6 text-purple-600" />,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  red: "bg-red-100 text-red-600",
  green: "bg-emerald-100 text-emerald-600",
  gray: "bg-gray-100 text-gray-600",
  purple: "bg-purple-100 text-purple-600",
};

export function MetricsGrid({ kpiCards }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpiCards.map((card, idx) => (
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
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                colorMap[card.color] || "bg-slate-100"
              }`}
            >
              {iconMap[card.icon]}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>

              <div className="mt-1 text-3xl font-bold leading-none text-slate-900">
                {card.value}
              </div>

              <p className="mt-3 text-lg font-bold text-slate-900">
                {card.amount || card.target || ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}