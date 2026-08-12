import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function AnalystWorkloadTable() {
  const data = React.useMemo(
    () => [
      { analyst: "John Smith", avatarColor: "bg-blue-500", progress: 28, open: 22, completed: 48 },
      { analyst: "Emily Davis", avatarColor: "bg-emerald-500", progress: 24, open: 18, completed: 44 },
      { analyst: "Michael Brown", avatarColor: "bg-purple-500", progress: 19, open: 15, completed: 35 },
      { analyst: "Sarah Wilson", avatarColor: "bg-orange-500", progress: 16, open: 11, completed: 30 },
      { analyst: "David Johnson", avatarColor: "bg-cyan-500", progress: 14, open: 9, completed: 26 },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "analyst",
        header: "Analyst",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className={`h-6 w-6 rounded-full ${info.row.original.avatarColor} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
              {info.getValue().split(" ").map(n => n[0]).join("")}
            </div>
            <span className="font-semibold text-slate-800">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: "progress",
        header: "In Progress",
      },
      {
        accessorKey: "open",
        header: "Open Exceptions",
      },
      {
        accessorKey: "completed",
        header: "Reconciliations Completed",
        cell: (info) => <span className="font-medium text-slate-700">{info.getValue()}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Analyst Workload</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-100 text-slate-400 font-medium">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="pb-3 pt-1 font-semibold first:pl-0 px-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2.5 font-normal text-slate-600 first:pl-0 px-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View All Analysts &gt;
        </button>
      </div>
    </div>
  );
}
