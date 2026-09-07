import React from "react";

export default function ReconciliationStatusOverview({
  data = [],
  totals = {},
}) {
  const rows = data.length > 0
    ? data
    : [{ name: "No Data", count: 0, percentage: 0, barColor: "bg-slate-300" }];

  return (
    <div className="w-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Reconciliation Status</h3>
          <span className="text-xs font-medium text-slate-400">
            {totals.suppliers || 0} suppliers
          </span>
        </div>

        <div className="mb-4 text-xs text-slate-500">
          {totals.totalInvoices || 0} total invoices processed
        </div>

        <div className="flex flex-col gap-4">
          {rows.map((item) => (
            <div key={item.name} className="grid grid-cols-12 items-center gap-4 text-xs font-medium">
              <div className="col-span-4 text-slate-600 truncate">{item.name}</div>
              <div className="col-span-2 text-slate-800 font-semibold text-right">
                {item.count.toLocaleString()}
              </div>
              <div className="col-span-2 text-slate-400 text-right">
                {item.percentage}%
              </div>
              <div className="col-span-4 pl-2">
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
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