import React from "react";
import { useQuery } from "@tanstack/react-query";
import CompactDataTable from "@/components/ui/table/CompactDataTable";
import axiosInstance from "@/app/lib/api";

export default function AnalystWorkloadTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["supplier-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/dashboard/supplier");
      return res.data || [];
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "analyst",
        header: "Analyst",
        cell: (info) => {
          const name = info.getValue() || "";
          const initials = name
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${info.row.original.avatarColor} text-[10px] font-bold text-white`}
              >
                {initials || "?"}
              </div>
              <span className="font-semibold text-slate-800">{name || "Unknown"}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "progress",
        header: "In Progress",
      },
      {
        accessorKey: "open",
        header: "Open",
      },
      {
        accessorKey: "completed",
        header: "Completed",
        cell: (info) => (
          <span className="font-medium text-slate-700">{info.getValue()}</span>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-3 w-64 animate-pulse rounded bg-slate-100" />
        <div className="mt-6 h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load analyst workload.
      </div>
    );
  }

  const rows = (data || [])
    .slice(0, 5)
    .map((item, index) => ({
      analyst: item.supplier_name || item.supplier_email?.split("@")[0] || "Unknown",
      progress: item.exceptions || 0,
      open: item.high_priority_exceptions || 0,
      completed: item.escalated_cases || 0,
      avatarColor: [
        "bg-blue-500",
        "bg-emerald-500",
        "bg-violet-500",
        "bg-amber-500",
        "bg-rose-500",
      ][index % 5],
    }));

  return (
    <CompactDataTable
      title="Analyst Workload"
      subtitle="Current workload distribution across reconciliation analysts."
      data={rows}
      columns={columns}
      footerActionText="View All Analysts >"
    />
  );
}