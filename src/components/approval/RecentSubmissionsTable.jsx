"use client";

import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

export function RecentSubmissionsTable({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "requestId",
        header: "Request ID",
        cell: (info) => (
          <span className="text-blue-600 font-medium cursor-pointer">
            {info.getValue()}
          </span>
        ),
      },
      { accessorKey: "vendor", header: "Vendor" },
      { accessorKey: "submittedOn", header: "Submitted On" },
      { accessorKey: "submittedBy", header: "Submitted By" },
      { accessorKey: "requestType", header: "Request Type" },
      {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: (info) => (
          <span className="font-semibold text-slate-900">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "reconciliationStatus",
        header: "Status",
        cell: (info) => {
          const val = info.getValue();
          const theme =
            val === "Approved"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : val === "In Progress"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-amber-50 text-amber-700 border-amber-200";
          return <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${theme}`}>{val}</span>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="font-bold text-slate-900 text-sm">Recent Submissions</h3>
        <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="p-3 font-semibold uppercase tracking-wider">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}