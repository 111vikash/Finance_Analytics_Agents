"use client";

import { CheckCircle } from "lucide-react";

export const VendorTimelineSection = () => {
  const timeline = [
    {
      title: "Email Sent – Initial Request",
      desc: "Statement request for Jul 2026 sent to vendor",
      status: "Completed",
      date: "05 May 2026",
      time: "09:15 AM",
      color: "bg-green-500",
    },
    {
      title: "Supplier Response Received",
      desc: "Vendor responded with statement and comments",
      status: "Completed",
      date: "08 May 2026",
      time: "02:40 PM",
      color: "bg-blue-500",
    },
    {
      title: "AI Follow-up Generated",
      desc: "Missing invoice details identified",
      status: "Completed",
      date: "09 May 2026",
      time: "11:20 AM",
      color: "bg-purple-500",
    },
    {
      title: "Escalation Triggered",
      desc: "No response for pending items",
      status: "Active",
      date: "12 May 2026",
      time: "10:30 AM",
      color: "bg-orange-500",
    },
    {
      title: "Supporting Document Uploaded",
      desc: "Vendor uploaded supporting files",
      status: "Completed",
      date: "13 May 2026",
      time: "04:05 PM",
      color: "bg-cyan-500",
    },
    {
      title: "Final Confirmation Pending",
      desc: "Pending vendor confirmation",
      status: "Pending",
      date: "--",
      time: "--",
      color: "bg-slate-400",
    },
  ];

  const statusBadge = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Active") return "bg-orange-100 text-orange-700";
    if (status === "Pending") return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
      <div className="mb-5 flex justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Follow-up Timeline
        </h2>

        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
          View All History
        </button>
      </div>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="relative grid grid-cols-[32px_minmax(0,1fr)_95px_90px] items-start gap-2"
          >
            {index !== timeline.length - 1 && (
              <div className="absolute left-4 top-8 h-14 w-px bg-slate-200" />
            )}

            {/* Icon */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-white shadow-sm`}
            >
              <CheckCircle size={14} />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <h4 className="break-words text-xs font-semibold leading-4 text-slate-700">
                {item.title}
              </h4>

              <p className="mt-1 break-words text-xs leading-4 text-slate-500">
                {item.desc}
              </p>
            </div>

            {/* Status Badge - Left Shifted & Full Width */}
            <div className="-ml-6 flex justify-start">
              <span
                className={`inline-flex min-w-[88px] items-center justify-center rounded px-2 py-1 text-xs font-semibold ${statusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            {/* Date & Time */}
            <div className="text-right">
              <div className="text-xs font-medium leading-4 text-slate-500">
                {item.date}
              </div>

              <div className="mt-1 text-xs leading-4 text-slate-400">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
