"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/lib/api";
import { useAutoLogin } from "@/app/hooks/useAutoLogin";
import { Button } from "@/components/common/Button";
import KpiCard from "@/components/dashboard/KpiCard";
import AuditTable from "@/components/audit/AuditTable";
import {
  Activity,
  Brain,
  Users,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  ChevronDown,
} from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const iconMap = {
  Activity,
  Brain,
  Users,
  CheckCircle2,
  AlertTriangle,
};

const styleMap = {
  blue: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    cardBgColor: "bg-blue-50/70",
    accent: { border: "border-blue-100" },
  },
  purple: {
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    cardBgColor: "bg-purple-50/70",
    accent: { border: "border-purple-100" },
  },
  green: {
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    cardBgColor: "bg-emerald-50/70",
    accent: { border: "border-emerald-100" },
  },
  teal: {
    iconColor: "text-teal-600",
    iconBgColor: "bg-teal-100",
    cardBgColor: "bg-teal-50/70",
    accent: { border: "border-teal-100" },
  },
  amber: {
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
    cardBgColor: "bg-amber-50/70",
    accent: { border: "border-amber-100" },
  },
};

const fetchAuditData = async () => {
  const res = await axiosInstance.get("/api/v1/audit/summary", {
    params: { page: 1, page_size: 20 },
  });

  // support both wrapped and direct responses
  return res.data?.data || res.data;
};

const normalizeOptions = (items, allLabel) => {
  if (!Array.isArray(items)) return [{ value: allLabel, label: allLabel }];

  const mapped = items.map((item) => {
    if (typeof item === "string") {
      return { value: item, label: item };
    }
    if (item && typeof item === "object") {
      return {
        value: String(item.value ?? item.label ?? item.name ?? ""),
        label: String(item.label ?? item.name ?? item.value ?? ""),
      };
    }
    return { value: String(item), label: String(item) };
  });

  const unique = [];
  const seen = new Set();

  for (const item of mapped) {
    if (!seen.has(item.value)) {
      seen.add(item.value);
      unique.push(item);
    }
  }

  return [{ value: allLabel, label: allLabel }, ...unique];
};

export default function AuditPage() {
  const { loading: authLoading, error: authError } = useAutoLogin();

  const {
    data: apiData,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["auditDashboard"],
    queryFn: fetchAuditData,
    enabled: !authLoading && !authError,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const [filters, setFilters] = useState({
    search: "",
    user: "All Users",
    activity: "All Activities",
    entityType: "All",
  });

  // KPI cards from summaryCards
  const auditCards = useMemo(() => {
    const cards = Array.isArray(apiData?.summaryCards) ? apiData.summaryCards : [];
    return cards.map((card) => {
      const Icon = iconMap[card.icon] || Activity;
      const styles = styleMap[card.color] || styleMap.blue;

      return {
        title: String(card.label || "").toUpperCase(),
        value: String(card.value ?? ""),
        icon: Icon,
        iconColor: styles.iconColor,
        iconBgColor: styles.iconBgColor,
        cardBgColor: styles.cardBgColor,
        accent: styles.accent,
      };
    });
  }, [apiData]);

  // Records from records[]
  const tableData = useMemo(() => {
    return Array.isArray(apiData?.records) ? apiData.records : [];
  }, [apiData]);

  // Filters from filters.users / filters.activities / filters.entityTypes
  const users = useMemo(
    () => normalizeOptions(apiData?.filters?.users, "All Users"),
    [apiData]
  );

  const activities = useMemo(
    () => normalizeOptions(apiData?.filters?.activities, "All Activities"),
    [apiData]
  );

  const entityTypes = useMemo(
    () => normalizeOptions(apiData?.filters?.entityTypes, "All"),
    [apiData]
  );

  const filteredData = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return tableData.filter((item) => {
      const searchMatch =
        !q ||
        Object.values(item)
          .filter((v) => v !== null && v !== undefined)
          .some((v) => String(v).toLowerCase().includes(q));

      const userMatch =
        filters.user === "All Users" || item.user === filters.user;

      const activityMatch =
        filters.activity === "All Activities" || item.activity === filters.activity;

      const entityMatch =
        filters.entityType === "All" || item.entity_type === filters.entityType;

      return searchMatch && userMatch && activityMatch && entityMatch;
    });
  }, [tableData, filters]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("date_time", {
        header: "Date & Time",
        cell: (info) => {
          const value = info.getValue();
          const date = value ? new Date(value) : null;
          return date ? date.toLocaleString() : "-";
        },
      }),
      columnHelper.accessor("user", {
        header: "User",
        cell: (info) => (
          <span className="font-medium text-slate-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
      }),
      columnHelper.accessor("activity", {
        header: "Activity",
      }),
      columnHelper.accessor("entity_type", {
        header: "Entity Type",
      }),
      columnHelper.accessor("entity_id", {
        header: "Entity ID",
        cell: (info) => (
          <span className="font-medium text-blue-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("details", {
        header: "Details",
      }),
    ],
    []
  );

  if (authLoading || queryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">
        <div className="text-slate-600">Loading audit data...</div>
      </div>
    );
  }

  if (authError || queryError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">
        <div className="text-red-600">
          Error: {(authError || queryError)?.message || "Failed to load data"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900">
            Audit Trail & Compliance Portal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Role definitions, responsibilities, and access governance.
          </p>
        </div>

        <Button
          variant="secondary"
          icon={Download}
          className="bg-white text-[#0b57d0] hover:bg-slate-100"
        >
          Export Report
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {auditCards.length > 0 ? (
          auditCards.map((card) => (
            <KpiCard
              key={card.title}
              vertical
              label={card.title}
              value={card.value}
              change=""
              isTrendPositive={true}
              icon={card.icon}
              iconColor={card.iconColor}
              iconBgColor={card.iconBgColor}
              cardBgColor={card.cardBgColor}
              accent={card.accent}
            />
          ))
        ) : (
          <div className="text-slate-500 col-span-full">No KPI cards found.</div>
        )}
      </div>

      <div className="rounded-[28px] border border-[#d8e1ea] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#d8e1ea] px-6 py-5">
          <h2 className="text-sm font-semibold text-slate-900">Audit Filters</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and narrow audit events by user, activity, or entity type.
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-wrap items-end gap-4 xl:flex-nowrap">
            <div className="min-w-[250px] flex-[1.5]">
              <label className="mb-2 block text-sm font-medium text-slate-500">
                Search
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="h-12 w-full rounded-xl border border-[#d8e1ea] pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="min-w-[170px] flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-500">
                User
              </label>
              <div className="relative">
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  value={filters.user}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, user: e.target.value }))
                  }
                  className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
                >
                  {users.map((user) => (
                    <option key={user.value} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="min-w-[170px] flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-500">
                Activity
              </label>
              <div className="relative">
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  value={filters.activity}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, activity: e.target.value }))
                  }
                  className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
                >
                  {activities.map((activity) => (
                    <option key={activity.value} value={activity.value}>
                      {activity.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="min-w-[170px] flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-500">
                Entity Type
              </label>
              <div className="relative">
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  value={filters.entityType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      entityType: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
                >
                  {entityTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d8e1ea]">
          <AuditTable
            data={filteredData}
            columns={columns}
            loading={queryLoading}
            emptyMessage="No matching audit records found."
          />
        </div>
      </div>
    </div>
  );
}