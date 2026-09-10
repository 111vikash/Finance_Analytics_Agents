import React from "react";
import CompactDataTable from "@/components/ui/table/CompactDataTable";

export default function TopVendorsTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "vendor",
        header: "Vendor",
        cell: (info) => (
          <span className="font-semibold text-slate-800">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "open",
        header: "Open",
        cell: (info) => (
          <span className="font-medium text-orange-500">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "totalInvoices",
        header: "Invoices",
      },
      {
        accessorKey: "outstandingBalance",
        header: "Outstanding Balance",
        cell: (info) => {
          const value = Number(info.getValue() || 0);
          return (
            <span className="font-semibold text-slate-700">
              {value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          );
        },
      },
    ],
    []
  );

  const limitedData = React.useMemo(() => data.slice(0, 5), [data]);

  return (
    <CompactDataTable
      title="Top Vendors"
      subtitle="Vendors with the highest open reconciliation volume."
      data={limitedData}
      columns={columns}
      footerActionText="View All Vendors >"
    />
  );
}