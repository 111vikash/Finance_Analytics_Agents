// src/components/exceptions/ExceptionTable.jsx
"use client";

import React from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

// Utility for priority badge variations matching visual cues
const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-600 border-red-200";
    case "Medium":
      return "bg-amber-50 text-amber-600 border-amber-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

// Utility for status layout components
const getStatusStyles = (status) => {
  switch (status) {
    case "Awaiting Response":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "In Progress":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "Awaiting Info":
      return "bg-purple-50 text-purple-600 border-purple-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

const columns = [
  columnHelper.accessor("id", {
    header: "Exception ID",
    cell: (info) => <span className="text-blue-600 font-semibold hover:underline cursor-pointer">{info.getValue()}</span>,
  }),
  columnHelper.accessor("type", {
    header: "Exception Type",
    cell: (info) => <span className="text-slate-700 font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("vendor", {
    header: "Vendor",
    cell: (info) => <span className="font-semibold text-slate-800 max-w-[160px] block truncate">{info.getValue()}</span>,
  }),
  columnHelper.accessor("requestId", {
    header: "Request ID",
    cell: (info) => <span className="text-blue-500 font-medium hover:underline cursor-pointer">{info.getValue()}</span>,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => <span className="font-bold text-slate-800">${info.getValue().toLocaleString()}</span>,
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityStyles(info.getValue())}`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusStyles(info.getValue())}`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    cell: (info) => <span className="text-slate-600 font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("dueDate", {
    header: "Due Date",
    cell: (info) => <span className="text-slate-500 whitespace-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.accessor("daysOpen", {
    header: "Days Open",
    cell: (info) => (
      <span className={`font-semibold ${info.getValue() > 3 ? "text-red-500" : "text-slate-600"}`}>
        {info.getValue()}
      </span>
    ),
  }),
];

export default function ExceptionTable({ data, onSelectRow, selectedId }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Scrollable Container for Data Grid Table */}
      <div className="overflow-x-auto w-full -mx-4 px-4">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 font-semibold select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map((row) => {
              const isSelected = selectedId === row.original.id;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow(row.original)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isSelected ? "bg-blue-50/70 border-l-2 border-l-blue-600" : "hover:bg-slate-50/80"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 align-middle whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer block matching original interface footprint */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-slate-500 text-xs">
        <div>
          Showing <span className="font-semibold text-slate-700">1 to {data.length}</span> of <span className="font-semibold text-slate-700">24</span> exceptions
        </div>
        
        <div className="flex items-center gap-1.5">
          <button className="p-1 px-2 border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed text-[11px]" disabled>
            «
          </button>
          <button className="p-1 px-2 border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed text-[11px]" disabled>
            ‹
          </button>
          <button className="p-1 px-2.5 border border-blue-600 rounded bg-blue-600 text-white font-semibold text-[11px]">
            1
          </button>
          <button className="p-1 px-2.5 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 font-medium text-[11px]">
            2
          </button>
          <button className="p-1 px-2.5 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 font-medium text-[11px]">
            3
          </button>
          <button className="p-1 px-2 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 text-[11px]">
            ›
          </button>
          <button className="p-1 px-2 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 text-[11px]">
            »
          </button>
          
          <select className="ml-2 p-1 border border-slate-200 rounded bg-white text-slate-600 text-[11px] font-medium outline-none">
            <option>10 / page</option>
            <option>25 / page</option>
            <option>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
