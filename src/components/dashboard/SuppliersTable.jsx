import React from "react";
import CompactDataTable from "@/components/ui/table/CompactDataTable";

const statusColors = {
  Active: "bg-emerald-100 text-emerald-700",
  "De-Active": "bg-red-100 text-red-700",
  "On Hold": "bg-amber-100 text-amber-700",
};

const riskColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function SuppliersTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="font-mono text-xs text-slate-500">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Supplier Name",
        cell: (info) => (
          <span className="font-semibold text-slate-800">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
          <span className="text-xs text-blue-600 truncate max-w-[180px] block">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const val = info.getValue();
          const color = statusColors[val] || "bg-slate-100 text-slate-600";
          return (
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${color}`}>
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: "risk",
        header: "Risk",
        cell: (info) => {
          const val = info.getValue();
          const color = riskColors[val] || "bg-slate-100 text-slate-600";
          return (
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${color}`}>
              {val}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <CompactDataTable
      title={`Supplier Directory (${data.length})`}
      subtitle="All registered suppliers from faa.bronze.supplier_data"
      data={data}
      columns={columns}
      footerActionText="View All Suppliers >"
    />
  );
}