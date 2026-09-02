"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const VendorSLAMetrics = () => {
  return (
    <>
      {/* SLA COMPLIANCE */}
      <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            SLA Compliance
          </h3>

          <select className="cursor-pointer bg-transparent text-xs  font-medium text-slate-600 outline-none">
            <option>May 2025</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative h-[150px] w-[150px] shrink-0">
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900">
                95.6%
              </span>

              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                Compliant
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Compliant", value: 95.6, count: 1176 },
                    { name: "At Risk", value: 3.2, count: 40 },
                    { name: "Breached", value: 1.2, count: 15 },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={68}
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#22c55e" stroke="none" />
                  <Cell fill="#f97316" stroke="none" />
                  <Cell fill="#ef4444" stroke="none" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-1 flex-col gap-3 text-xs ">
            <div className="flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#22c55e" }}
                />
                <span className="text-slate-500">Compliant</span>
              </div>

              <span className="text-slate-800">
                95.6%{" "}
                <span className="font-normal text-slate-400">(1176)</span>
              </span>
            </div>

            <div className="flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#f97316" }}
                />
                <span className="text-slate-500">At Risk</span>
              </div>

              <span className="text-slate-800">
                3.2%{" "}
                <span className="font-normal text-slate-400">(40)</span>
              </span>
            </div>

            <div className="flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#ef4444" }}
                />
                <span className="text-slate-500">Breached</span>
              </div>

              <span className="text-slate-800">
                1.2%{" "}
                <span className="font-normal text-slate-400">(15)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSE TRACKING */}
      <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-700">
            Response Tracking
          </h4>

          <div className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4">
            {/* Circular Progress */}
            <div className="relative h-32 w-32 shrink-0">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 120 120"
                aria-label="92 percent response rate"
              >
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />

                {/* Progress Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 50 * (1 - 92 / 100)
                  }`}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-green-600">
                  92%
                </span>

                <span className="text-center text-xs text-slate-600">
                  Response Rate
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <span>Total Requests</span>
                <span className="font-bold text-slate-800">24</span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <span>Responded</span>
                <span className="font-bold text-slate-800">22</span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <span>Pending</span>
                <span className="font-bold text-slate-800">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VENDOR COMMUNICATION SCORE */}
      <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-700">Vendor Communication Score</div>
            <div className="mt-0.5 text-xs  text-slate-600">Based on last 6 months performance</div>
          </div>
          <div className="text-right">
            <div className="mb-1 inline-flex rounded bg-emerald-50 px-1.5 py-0.5 text-sm  font-semibold text-emerald-600">Good</div>
            <div className="text-base tracking-[0.18em] text-amber-400">★ ★ ★ ★ <span className="text-slate-300">☆</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
