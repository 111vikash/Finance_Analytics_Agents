import React from "react";

export default function ReconciliationStatusOverview({
  totals = {
    totalInvoices: 0,
    matched: 0,
    notFound: 0,
    blocked: 0,
    open: 0,
    mismatch: 0,
    suppliers: 0,
  },
}) {
  const totalInvoices = totals.totalInvoices || 0;

  const statusData = [
    {
      name: "Matched",
      count: totals.matched || 0,
      percentage: totalInvoices > 0 ? ((totals.matched || 0) / totalInvoices) * 100 : 0,
      barColor: "bg-emerald-500",
    },
    {
      name: "Not Found",
      count: totals.notFound || 0,
      percentage: totalInvoices > 0 ? ((totals.notFound || 0) / totalInvoices) * 100 : 0,
      barColor: "bg-blue-500",
    },
    {
      name: "Blocked",
      count: totals.blocked || 0,
      percentage: totalInvoices > 0 ? ((totals.blocked || 0) / totalInvoices) * 100 : 0,
      barColor: "bg-orange-400",
    },
    {
      name: "Open",
      count: totals.open || 0,
      percentage: totalInvoices > 0 ? ((totals.open || 0) / totalInvoices) * 100 : 0,
      barColor: "bg-amber-500",
    },
    {
      name: "Mismatch",
      count: totals.mismatch || 0,
      percentage: totalInvoices > 0 ? ((totals.mismatch || 0) / totalInvoices) * 100 : 0,
      barColor: "bg-red-500",
    },
  ];

  return (
    <div className="flex w-full max-w-md flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Reconciliation Status Overview
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {statusData.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-12 items-center gap-4 text-xs font-medium"
            >
              <div className="col-span-4 truncate text-slate-600">
                {item.name}
              </div>

              <div className="col-span-2 text-right font-semibold text-slate-800">
                {item.count.toLocaleString()}
              </div>

              <div className="col-span-2 text-right text-slate-400">
                {item.percentage.toFixed(1)}%
              </div>

              <div className="col-span-4 pl-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.barColor}`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>

      <div className="mt-6 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:underline">
          View Reconciliation List &gt;
        </button>
      </div>
    </div>
  );
}