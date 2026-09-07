import React from "react";
import CompactDataTable from "@/components/ui/table/CompactDataTable";

export default function TopVendorsTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "vendor",
        header: "Vendor",
        cell: (info) => (
          <span className="font-semibold text-slate-800">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "totalInvoices",
        header: "Invoices",
      },
      {
        accessorKey: "exceptions",
        header: "Exceptions",
        cell: (info) => (
          <span className="font-medium text-red-500">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "highPriority",
        header: "High Priority",
        cell: (info) => (
          <span className="font-medium text-orange-500">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "avgConfidence",
        header: "Avg Confidence",
      },
      {
        accessorKey: "outstanding",
        header: "Outstanding",
        cell: (info) => (
          <span className="font-semibold text-slate-700">{info.getValue()}</span>
        ),
      },
    ],
    []
  );

  const limitedData = React.useMemo(() => data.slice(0, 5), [data]);

  return (
    <CompactDataTable
      title="Top Vendors by Exceptions"
      subtitle="Vendors with the highest exception volume from reconciliation."
      data={limitedData}
      columns={columns}
      footerActionText="View All Vendors >"
    />
  );
}