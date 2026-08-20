
"use client";

import React from "react";

const vendorData = [
  { name: "ABC Manufacturing Ltd.", count: 6, amount: 78450 },
  { name: "Global Supplies Inc.", count: 5, amount: 52310 },
  { name: "Tech Solutions Pvt. Ltd.", count: 4, amount: 34780 },
  { name: "Omega Components", count: 3, amount: 22910 },
  { name: "Industrial Parts Co.", count: 2, amount: 16330 }
];

export default function TopVendors() {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-700">Top Vendors with Exceptions</h3>
        <button className="text-[10px] text-blue-600 font-semibold hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="text-slate-400 font-semibold uppercase tracking-wider text-[9px] border-b border-slate-100 bg-slate-50/50">
              <th className="p-2 font-medium">Vendor Name</th>
              <th className="p-2 font-medium text-center"># Exceptions</th>
              <th className="p-2 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {vendorData.map((vendor, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition">
                <td className="p-2 font-semibold text-slate-700 truncate max-w-[140px]" title={vendor.name}>
                  {vendor.name}
                </td>
                <td className="p-2 text-center text-slate-800 font-medium">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                    {vendor.count}
                  </span>
                </td>
                <td className="p-2 text-right font-bold text-slate-800">
                  ${vendor.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
