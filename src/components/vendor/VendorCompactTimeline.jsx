"use client";

import { Check, Clock3 } from "lucide-react";

export const VendorCompactTimeline = () => {
  const compactTimeline = [
    { day: "05", month: "May", title: "Initial Request Sent", time: "09:15 AM", state: "done" },
    { day: "08", month: "May", title: "First Reminder Sent", time: "10:30 AM", state: "done" },
    { day: "12", month: "May", title: "Escalation Level 1", time: "10:30 AM", state: "active" },
    { day: "16", month: "May", title: "Escalation Level 2 (Planned)", time: "--", state: "pending" },
  ];

  return (
    <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Follow-up Timeline</h2>
        <button className="text-xs  font-semibold text-blue-600 hover:text-blue-800">View Calendar</button>
      </div>
      <div className="relative space-y-3">
        <div className="absolute bottom-2 left-[31px] top-2 w-px bg-slate-200" />
        {compactTimeline.map((item) => (
          <div key={item.title} className="relative z-10 grid grid-cols-[30px_10px_1fr_auto] items-center gap-2">
            <div className="text-center leading-none">
              <div className={`text-xs font-bold ${item.state === "active" ? "text-orange-500" : "text-slate-600"}`}>{item.day}</div>
              <div className="text-xs  text-slate-400">{item.month}</div>
            </div>
            <div className={`h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm ${item.state === "done" ? "bg-emerald-500" : item.state === "active" ? "bg-orange-500" : "bg-slate-300"}`} />
            <div className={`text-xs font-semibold ${item.state === "active" ? "text-slate-800" : "text-slate-600"}`}>{item.title}</div>
            <div className="flex items-center gap-1 text-xs  text-slate-400">
              {item.time}
              {item.state === "done" && <Check size={12} className="text-emerald-500" />}
              {item.state === "active" && <Clock3 size={12} className="text-orange-500" />}
              {item.state === "pending" && <Clock3 size={12} className="text-slate-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
