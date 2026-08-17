"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/api";
import { Button } from "@/components/common/Button";
import Input from "@/components/ui/Input";
import KpiCard from "@/components/dashboard/KpiCard";
import { UniversalTable } from "@/components/ui/table/DataTable";
import {
  Banknote,
  Landmark,
  Scale,
  Target,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Info,
  Search,
  SlidersHorizontal,
  Download,
  ChevronDown,
  Building2,
  CalendarDays,
  BadgeCheck,Eye, RotateCcw, MoreHorizontal
} from "lucide-react";

export default function ReconciliationDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    vendor: "(All)",
    period: "(All)",
    status: "(All)",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/data/transactions.json");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = useMemo(() => {
    const statementTotal = data.reduce((sum, row) => sum + (Number(row.statementAmount) || 0), 0);
    const erpTotal = data.reduce((sum, row) => sum + (Number(row.erpAmount) || 0), 0);
    const matchedCount = data.filter((row) => row.status === "Matched").length;
    const matchRate = data.length ? ((matchedCount / data.length) * 100).toFixed(1) : "0.0";
    const variance = statementTotal - erpTotal;

    return {
      statementTotal,
      erpTotal,
      variance,
      matchRate,
      matchedCount,
    };
  }, [data]);

  const uniqueVendors = useMemo(() => {
    // If your transactions don't currently have vendor, this will be empty.
    const vendors = data
      .map((row) => row.vendor)
      .filter(Boolean);
    return ["(All)", ...new Set(vendors)];
  }, [data]);

  const uniquePeriods = useMemo(() => {
    const periods = data
      .map((row) => row.period)
      .filter(Boolean);
    return ["(All)", ...new Set(periods)];
  }, [data]);

  const uniqueStatuses = ["(All)", "Matched", "Partially Matched", "Unmatched"];

  const filteredData = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return data.filter((row) => {
      const matchesVendor =
        filters.vendor === "(All)" ? true : row.vendor === filters.vendor;

      const matchesPeriod =
        filters.period === "(All)" ? true : row.period === filters.period;

      const matchesStatus =
        filters.status === "(All)" ? true : row.status === filters.status;

      const matchesSearch =
        !q ||
        Object.values(row)
          .filter((v) => v !== null && v !== undefined)
          .some((v) => String(v).toLowerCase().includes(q));

      return matchesVendor && matchesPeriod && matchesStatus && matchesSearch;
    });
  }, [data, filters]);

  const tableColumns = useMemo(
    () => [
      {
        header: "Type",
        accessorKey: "type",
        cell: (info) => {
          const type = info.getValue();
          const style =
            type === "Invoice"
              ? "text-amber-700 bg-amber-50 border-amber-200"
              : type === "Payment"
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : "text-blue-700 bg-blue-50 border-blue-200";

          return (
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
              {type}
            </span>
          );
        },
      },
      {
        header: "Invoice / Reference",
        accessorKey: "reference",
        cell: (info) => (
          <span className="cursor-pointer font-medium text-blue-600 hover:underline">
            {info.getValue()}
          </span>
        ),
      },
      { header: "Invoice Date", accessorKey: "date" },
      {
        header: "Statement Amount",
        accessorKey: "statementAmount",
        cell: (info) =>
          info.getValue() !== null && info.getValue() !== undefined
            ? Number(info.getValue()).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "-",
      },
      {
        header: "ERP Amount",
        accessorKey: "erpAmount",
        cell: (info) =>
          info.getValue() !== null && info.getValue() !== undefined
            ? Number(info.getValue()).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "-",
      },
      {
        header: "Match Status",
        accessorKey: "status",
        cell: (info) => {
          const value = info.getValue();
          const styles = {
            Matched: "bg-emerald-50 text-emerald-700 border-emerald-200",
            "Partially Matched": "bg-sky-50 text-sky-700 border-sky-200",
            Unmatched: "bg-rose-50 text-rose-700 border-rose-200",
          };

          return (
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[value]}`}>
              {value}
            </span>
          );
        },
      },
      {
        header: "Confidence",
        accessorKey: "confidence",
      },
      {
        header: "Action",
        id: "actions",
        cell: () => (
          <div className="flex items-center gap-2 text-slate-400">
            <button className="transition hover:text-slate-700"><Eye/></button>
            <button className="transition hover:text-slate-700"><RotateCcw/></button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
        <div className=" px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight ">
                Reconcilition Workbench
              </h1>
              {/* <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
                Monitor reconciliation performance, SLA compliance, exceptions,
                vendor activity, and team workload from a single operational view.
              </p> */}
            </div>

            <div className="flex flex-col items-end gap-2">
              <Button
                variant="secondary"
                icon={Download}
                className="bg-white text-[#0b57d0] hover:bg-slate-100"
              >
                Export Report
              </Button>

              {/* {dashboardData.lastUpdated && (
                <p className="text-xs font-medium text-white/80">
                  Last updated: {dashboardData.lastUpdated}
                </p>
              )} */}
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="Statement Amount"
              value={`USD ${metrics.statementTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              change="Total statement balance"
              isTrendPositive={true}
              icon={Banknote}
              iconColor="text-[#0b57d0]"
              iconBgColor="bg-[#0b57d0]/10"
            />

            <KpiCard
              label="ERP Balance"
              value={`USD ${metrics.erpTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              change="ERP ledger balance"
              isTrendPositive={true}
              icon={Landmark}
              iconColor="text-emerald-600"
              iconBgColor="bg-emerald-50"
            />

            <KpiCard
              label="Variance"
              value={`USD ${Math.abs(metrics.variance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              change={metrics.variance < 0 ? "Below statement total" : "Above ERP balance"}
              isTrendPositive={metrics.variance <= 0}
              icon={Scale}
              iconColor="text-rose-600"
              iconBgColor="bg-rose-50"
              accent={{ border: "border-rose-200" }}
            />

            <KpiCard
              label="Match Rate"
              value={`${metrics.matchRate}%`}
              change={`${metrics.matchedCount} matched items`}
              isTrendPositive={true}
              icon={Target}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-50"
            />
          </div>


          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <UniversalTable data={filteredData} columns={tableColumns} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  <Sparkles size={16} />
                  AI Insights
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Automated context analysis for reconciliation exceptions and review prioritization.
                </p>
              </div>

              <Button variant="primary" className="bg-[#0b57d0] hover:bg-blue-700">
                View All Insights
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                  <AlertTriangle size={15} />
                  Attention Required
                </div>
                10 items need your attention.
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                  <TrendingUp size={15} />
                  High Confidence
                </div>
                6 items have strong matching recommendations.
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                  <Info size={15} />
                  Pending Confirmation
                </div>
                3 payments are pending supplier confirmation.
              </div>
            </div>
          </div>

          {loading && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-500">
              Loading reconciliation data...
            </div>
          )}
        </div>
    </>
  );
}