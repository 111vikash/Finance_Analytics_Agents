import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KpiCard({
  label,
  value,
  change,
  isTrendPositive = true,
  icon: Icon,
  iconColor = "text-dgem-blue",
  iconBgColor = "bg-dgem-blue/10",
  cardBgColor = "bg-white",
  accent = {},
}) {
  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cardBgColor} ${accent.border || "border-[var(--border)]"}`}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 ${iconBgColor}`}
      >
        <Icon className={`h-7 w-7 ${iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-semibold uppercase tracking-[0.2em] text-[12px]">
          {label}
        </div>

        <div className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)]">
          {value}
        </div>

        <div
          className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isTrendPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {isTrendPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
}