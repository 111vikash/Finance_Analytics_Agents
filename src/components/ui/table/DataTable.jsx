"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  SlidersHorizontal,
  Building2,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/common/Button";

const normalize = (value) => String(value ?? "").toLowerCase();

export const UniversalTable = ({ data = [], columns = [] }) => {
  const [globalFilter, setGlobalFilter] = useState({
    search: "",
    tabStatus: "All",
    vendor: "(All)",
    period: "(All)",
    status: "(All)",
  });

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const safeColumns = useMemo(
    () => (Array.isArray(columns) ? columns : []),
    [columns]
  );

  // Build filter options from data
  const uniqueVendors = useMemo(() => {
    const values = safeData
      .map((row) => row.vendor || row.supplier_name || row.name)
      .filter(Boolean);
    return ["(All)", ...new Set(values)];
  }, [safeData]);

  const uniquePeriods = useMemo(() => {
    const values = safeData
      .map((row) => row.period || row.reconciliation_date || row.report_timestamp)
      .filter(Boolean);
    return ["(All)", ...new Set(values)];
  }, [safeData]);

  const uniqueStatuses = useMemo(() => {
    const values = safeData
      .map((row) => row.status || row.match_status)
      .filter(Boolean);
    return ["(All)", ...new Set(values)];
  }, [safeData]);

  const tabs = useMemo(() => {
    const matchedCount = safeData.filter((i) =>
      normalize(i.status || i.match_status) === "matched"
    ).length;

    const partiallyMatchedCount = safeData.filter((i) =>
      normalize(i.status || i.match_status) === "partially matched"
    ).length;

    const unmatchedCount = safeData.filter((i) =>
      normalize(i.status || i.match_status) === "unmatched"
    ).length;

    const exceptionsCount = safeData.filter((i) => {
      const st = normalize(i.status || i.match_status);
      const ex = normalize(i.exception_type);
      return st === "unmatched" || ex.length > 0;
    }).length;

    return [
      { key: "All", label: "All Items", count: safeData.length },
      { key: "Matched", label: "Matched", count: matchedCount },
      {
        key: "Partially Matched",
        label: "Partially Matched",
        count: partiallyMatchedCount,
      },
      { key: "Unmatched", label: "Unmatched", count: unmatchedCount },
      { key: "Exceptions", label: "Exceptions", count: exceptionsCount },
    ];
  }, [safeData]);

  const globalFilterFn = (row) => {
    const { search, tabStatus, vendor, period, status } = globalFilter;

    const rowStatus = normalize(row.original?.status || row.original?.match_status);
    const rowVendor = row.original?.vendor || row.original?.supplier_name || row.original?.name;
    const rowPeriod =
      row.original?.period ||
      row.original?.reconciliation_date ||
      row.original?.report_timestamp;

    // Search across all cell values
    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      const matchesSearch = row
        .getAllCells()
        .some((cell) => normalize(cell.getValue()).includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Tab filter
    if (tabStatus !== "All") {
      if (tabStatus === "Exceptions") {
        const isException =
          rowStatus === "unmatched" || normalize(row.original?.exception_type).length > 0;
        if (!isException) return false;
      } else if (rowStatus !== normalize(tabStatus)) {
        return false;
      }
    }

    // Vendor filter
    if (vendor !== "(All)") {
      if (normalize(rowVendor) !== normalize(vendor)) return false;
    }

    // Period filter
    if (period !== "(All)") {
      if (normalize(rowPeriod) !== normalize(period)) return false;
    }

    // Status dropdown filter
    if (status !== "(All)") {
      if (rowStatus !== normalize(status)) return false;
    }

    return true;
  };

  const table = useReactTable({
    data: safeData,
    columns: safeColumns,
    state: { globalFilter },
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    autoResetPageIndex: false,
  });

  // Reset to page 1 when filters change
  React.useEffect(() => {
    table.setPageIndex(0);
  }, [
    globalFilter.search,
    globalFilter.tabStatus,
    globalFilter.vendor,
    globalFilter.period,
    globalFilter.status,
    table,
  ]);

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalFiltered = table.getFilteredRowModel().rows.length;
  const startItem = totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalFiltered);

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
          <SlidersHorizontal size={16} className="text-[#0b57d0]" />
          Workbench Filters
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500">
              Vendor
            </label>
            <div className="relative">
              <Building2
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <select
                value={globalFilter.vendor}
                onChange={(e) =>
                  setGlobalFilter((prev) => ({ ...prev, vendor: e.target.value }))
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pl-10 text-sm outline-none focus:border-[#0b57d0]"
              >
                {uniqueVendors.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500">
              Statement Period
            </label>
            <div className="relative">
              <CalendarDays
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <select
                value={globalFilter.period}
                onChange={(e) =>
                  setGlobalFilter((prev) => ({ ...prev, period: e.target.value }))
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pl-10 text-sm outline-none focus:border-[#0b57d0]"
              >
                {uniquePeriods.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500">
              Match Status
            </label>
            <div className="relative">
              <BadgeCheck
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <select
                value={globalFilter.status}
                onChange={(e) =>
                  setGlobalFilter((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pl-10 text-sm outline-none focus:border-[#0b57d0]"
              >
                {uniqueStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by Invoice / Reference / Amount"
              value={globalFilter.search}
              onChange={(e) =>
                setGlobalFilter((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/5"
            />
          </div>

          <Button variant="secondary" icon={SlidersHorizontal} className="whitespace-nowrap">
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="no-scrollbar flex overflow-x-auto border-b border-slate-200 bg-white">
          {tabs.map(({ key, label, count }) => {
            const isActive = globalFilter.tabStatus === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  setGlobalFilter((prev) => ({ ...prev, tabStatus: key }))
                }
                className={`whitespace-nowrap border-b-2 px-6 py-4 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}{" "}
                <span
                  className={`ml-0.5 text-[11px] font-medium ${
                    isActive ? "text-blue-500" : "text-slate-400"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-xs font-medium text-slate-600">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={safeColumns.length || 1}
                    className="bg-slate-50/20 px-6 py-12 text-center text-sm font-normal text-slate-400"
                  >
                    No matching items found. Try modifying filter parameters.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="group transition hover:bg-slate-50/80">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-6 py-3.5 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-6 py-4 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Showing {startItem} to {endItem} of {totalFiltered} items
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-lg border border-slate-200 px-0 text-slate-600 disabled:opacity-40"
            >
              ‹
            </Button>

            <span className="text-xs text-slate-500">
              Page {pageIndex + 1} of {table.getPageCount()}
            </span>

            <Button
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-lg border border-slate-200 px-0 text-slate-600 disabled:opacity-40"
            >
              ›
            </Button>

            <select
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0b57d0]"
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}