// import React from 'react';

// const metrics = [
//   { label: 'Pending Approvals', value: '8', amount: '$ 1,257,540.00', color: 'border-blue-500 text-blue-600 bg-blue-50' },
//   { label: 'Due Today', value: '2', amount: '$ 245,780.00', color: 'border-amber-500 text-amber-600 bg-amber-50' },
//   { label: 'Overdue', value: '2', amount: '$ 98,450.00', color: 'border-red-500 text-red-600 bg-red-50' },
//   { label: 'Approved (This Month)', value: '24', amount: '$ 4,852,310.00', color: 'border-emerald-500 text-emerald-600 bg-emerald-50' },
//   { label: 'Rejected (This Month)', value: '3', amount: '$ 56,230.00', color: 'border-purple-500 text-purple-600 bg-purple-50' },
//   { label: 'Avg. Approval Time', value: '18.6 hrs', amount: 'Target: 24 hrs', color: 'border-sky-400 text-sky-600 bg-sky-50' },
// ];

// export function MetricsGrid() {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
//       {metrics.map((card, idx) => (
//         <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-w-0">
//           <span className="text-xs font-semibold text-slate-500 truncate">{card.label}</span>
//           <div className="my-2.5">
//             <span className={`inline-block text-xl font-bold px-2 py-0.5 rounded-lg border ${card.color}`}>
//               {card.value}
//             </span>
//           </div>
//           <span className="text-sm font-bold text-slate-900 truncate">{card.amount}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import {
  ClipboardCheck,
  Clock3,
  TriangleAlert,
  CheckCircle,
  BadgeAlert,
  Gauge,
} from "lucide-react";

const metrics = [
  {
    label: "Pending Approvals",
    value: "8",
    amount: "$ 1,257,540.00",
    icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
    iconBg: "bg-blue-100",
    valueColor: "text-blue-600",
  },
  {
    label: "Due Today",
    value: "2",
    amount: "$ 245,780.00",
    icon: <Clock3 className="h-6 w-6 text-amber-600" />,
    iconBg: "bg-amber-100",
    valueColor: "text-amber-600",
  },
  {
    label: "Overdue",
    value: "2",
    amount: "$ 98,450.00",
    icon: <TriangleAlert className="h-6 w-6 text-red-600" />,
    iconBg: "bg-red-100",
    valueColor: "text-red-600",
  },
  {
    label: "Approved (This Month)",
    value: "24",
    amount: "$ 4,852,310.00",
    icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
    iconBg: "bg-emerald-100",
    valueColor: "text-emerald-600",
  },
  {
    label: "Rejected (This Month)",
    value: "3",
    amount: "$ 56,230.00",
    icon: <BadgeAlert className="h-6 w-6 text-purple-600" />,
    iconBg: "bg-purple-100",
    valueColor: "text-purple-600",
  },
  {
    label: "Avg. Approval Time",
    value: "18.6 hrs",
    amount: "Target: 24 hrs",
    icon: <Gauge className="h-6 w-6 text-sky-600" />,
    iconBg: "bg-sky-100",
    valueColor: "text-sky-600",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((card, idx) => (
        <div
          key={idx}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>

              <div
                className={`mt-1 text-3xl font-bold leading-none ${card.valueColor}`}
              >
                {card.value}
              </div>

              <p className="mt-3 text-lg font-bold text-slate-900">
                {card.amount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}