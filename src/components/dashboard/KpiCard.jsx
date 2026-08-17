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
  vertical = false,
}) {
  return (
    <div
      className={`group h-full rounded-xl border p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-3.5 ${
        vertical
          ? "flex min-h-[170px] flex-col items-center text-center"
          : "flex items-center gap-2.5 sm:gap-3"
      } ${cardBgColor} ${accent.border || "border-[var(--border)]"}`}
    >
      {vertical ? (
        <>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11 ${iconBgColor}`}
          >
            <Icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${iconColor}`} />
          </div>

          <div className="mt-3 flex w-full flex-1 flex-col items-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
              {label}
            </div>

            <div className="mt-1 text-[16px] font-bold leading-tight tracking-tight text-[var(--text)] sm:text-lg">
              {value}
            </div>

            <div
              className={`mt-auto pt-3 flex items-center gap-1 text-[10px] font-medium sm:text-[11px] ${
                isTrendPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isTrendPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11 ${iconBgColor}`}
          >
            <Icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${iconColor}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
              {label}
            </div>

            <div className="mt-0.5 text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] sm:text-lg">
              {value}
            </div>

            <div
              className={`mt-1 flex items-center gap-1 text-[10px] font-medium sm:text-[11px] ${
                isTrendPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isTrendPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}