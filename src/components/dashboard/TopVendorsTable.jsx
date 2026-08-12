import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function TopVendorsTable() {
  const data = React.useMemo(
    () => [
      { vendor: "ABC Manufacturing Ltd", open: 45, overdue: 8, days: 22, avgTime: 12.4 },
      { vendor: "Global Supplies Inc", open: 34, overdue: 6, days: 18, avgTime: 11.3 },
      { vendor: "Tech Parts Co.", open: 23, overdue: 3, days: 11, avgTime: 10.1 },
      { vendor: "Office Needs Pvt Ltd", open: 19, overdue: 4, days: 9, avgTime: 9.8 },
      { vendor: "Industrial Goods LLC", open: 18, overdue: 2, days: 7, avgTime: 8.6 },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "vendor",
        header: "Vendor",
        cell: (info) => <span className="font-semibold text-slate-800">{info.getValue()}</span>,
      },
      {
        accessorKey: "open",
        header: "Open Exceptions",
      },
      {
        accessorKey: "overdue",
        header: "Overdue",
        cell: (info) => <span className="text-red-500 font-medium">{info.getValue()}</span>,
      },
      {
        accessorKey: "days",
        header: ">10 Days Aging",
      },
      {
        accessorKey: "avgTime",
        header: "Avg. Days (Progress)",
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
        <h3 className="text-sm font-bold text-slate-800">Top 5 Vendors by Open Exceptions</h3>
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
                  <th key={cell.id} className="py-3 font-normal text-slate-600 first:pl-0 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View All Vendors &gt;
        </button>
      </div>
    </div>
  );
}
