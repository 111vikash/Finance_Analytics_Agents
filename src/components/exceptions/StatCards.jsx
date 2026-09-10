"use client";

import React from "react";
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  ShieldAlert,
  Bot,
  Timer,
} from "lucide-react";

const iconMap = {
  AlertTriangle,
  AlertCircle,
  Clock,
  Calendar,
  ShieldAlert,
  Bot,
  Timer,
};

const defaultCards = [];

export default function StatCards({ data = defaultCards }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {data.map((stat, index) => {
        const Icon = iconMap[stat.icon] || AlertTriangle;
        return (
          <div
            key={index}
            className="bg-white p-3 rounded-lg border border-slate-200 border-l-4 border-l-blue-500 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-medium text-slate-500 tracking-tight">
                  {stat.label}
                </p>
                <p className="text-xl font-bold mt-1 mb-0.5 tracking-tight text-slate-800">
                  {stat.value}
                </p>
              </div>
              <Icon className="h-4 w-4 text-slate-400" />
            </div>

            <div className="mt-1">
              <p className="text-[11px] font-semibold text-slate-500">
                {stat.amount || stat.subLabel || ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}