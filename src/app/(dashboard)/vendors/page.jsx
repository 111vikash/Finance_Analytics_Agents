// "use client";


// import React from 'react';

// export default function DashboardPage() {
//     return (
//         // https://app.powerbi.com/reportEmbed?reportId=1e804c5a-5777-41e4-b303-f6caf5e6db0c&autoAuth=true&ctid=c6823a59-1301-40c3-9d06-8685d8d732d8&actionBarEnabled=true&reportCopilotInEmbed=true%22
//         // https://app.powerbi.com/reportEmbed?reportId=5485da49-f278-4e93-b904-b733d7407a15&autoAuth=true&ctid=76a2ae5a-9f00-4f6b-95ed-5d33d77c4d61&actionBarEnabled=true%22
//         <div className="space-y-6">
//             <iframe
//                 title="RFQ Automation"
//                 className="w-full rounded-lg h-screen"
//                 src="https://app.powerbi.com/reportEmbed?reportId=1e804c5a-5777-41e4-b303-f6caf5e6db0c&autoAuth=true&ctid=c6823a59-1301-40c3-9d06-8685d8d732d8&actionBarEnabled=true&reportCopilotInEmbed=true%22"
//                 frameBorder="0" allowFullScreen={true}></iframe>


//         </div >
//     );
// }

// "use client";


// import React from 'react';

// export default function DashboardPage() {
//     return (
//         // https://app.powerbi.com/reportEmbed?reportId=1e804c5a-5777-41e4-b303-f6caf5e6db0c&autoAuth=true&ctid=c6823a59-1301-40c3-9d06-8685d8d732d8&actionBarEnabled=true&reportCopilotInEmbed=true%22
//         // https://app.powerbi.com/reportEmbed?reportId=5485da49-f278-4e93-b904-b733d7407a15&autoAuth=true&ctid=76a2ae5a-9f00-4f6b-95ed-5d33d77c4d61&actionBarEnabled=true%22
//         <div className="space-y-6">
//             <iframe
//                 title="RFQ Automation"
//                 className="w-full rounded-lg h-screen"
//                 src="https://app.powerbi.com/reportEmbed?reportId=1e804c5a-5777-41e4-b303-f6caf5e6db0c&autoAuth=true&ctid=c6823a59-1301-40c3-9d06-8685d8d732d8&actionBarEnabled=true&reportCopilotInEmbed=true%22"
//                 frameBorder="0" allowFullScreen={true}></iframe>


//         </div >
//     );
// }


"use client";

import { useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Check,
  CalendarDays,
  CircleDollarSign,
  FileText,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Upload,
  ChevronDown,
  Clock3,
} from "lucide-react";

export default function VendorPage() {
  const [vendorMenuOpen, setVendorMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
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

  const requests = [
    {
      id: "REQ-00124",
      type: "Missing Invoice",
      subject: "Invoice INV-10345 details missing",
      status: "Awaiting Response",
      owner: "Anita Verma",
      dueDate: "16 May 2026",
      priority: "High",
      daysPending: 2,
    },
    {
      id: "REQ-00125",
      type: "Payment Confirmation",
      subject: "Payment of $25,000 not reflected",
      status: "Awaiting Response",
      owner: "Rohit Mehta",
      dueDate: "15 May 2026",
      priority: "High",
      daysPending: 3,
    },
    {
      id: "REQ-00126",
      type: "Credit Note Clarification",
      subject: "Credit Note CN-2045 clarification",
      status: "In Progress",
      owner: "Anita Verma",
      dueDate: "18 May 2026",
      priority: "Medium",
      daysPending: 1,
    },
    {
      id: "REQ-00127",
      type: "Balance Confirmation",
      subject: "Confirm closing balance",
      status: "Pending",
      owner: "Rohit Mehta",
      dueDate: "20 May 2026",
      priority: "Low",
      daysPending: 5,
    },
  ];

  const templates = [
    { title: "Initial Statement Request", desc: "Request supplier statement for the period", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Missing Invoice Request", desc: "Request details for missing invoices", icon: FileText, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Payment Confirmation", desc: "Confirm unapplied or mismatched payments", icon: CircleDollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Credit Note Clarification", desc: "Request clarification for credit notes", icon: ReceiptText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Balance Confirmation", desc: "Request balance confirmation from vendor", icon: FileCheck2, color: "text-green-600", bg: "bg-green-50" },
  ];

  const compactTimeline = [
    { day: "05", month: "May", title: "Initial Request Sent", time: "09:15 AM", state: "done" },
    { day: "08", month: "May", title: "First Reminder Sent", time: "10:30 AM", state: "done" },
    { day: "12", month: "May", title: "Escalation Level 1", time: "10:30 AM", state: "active" },
    { day: "16", month: "May", title: "Escalation Level 2 (Planned)", time: "--", state: "pending" },
  ];

  const communications = [
    ["12 May 2026 10:30 AM", "Anita Verma", "abc.finance@abc.com", "Escalation – Pending Items", "Sent", "2"],
    ["09 May 2026 11:20 AM", "AI Agent", "abc.finance@abc.com", "Follow-up – Missing Invoices", "Sent", "1"],
    ["08 May 2026 02:40 PM", "abc.finance@abc.com", "Anita Verma", "Re: Statement for Jul 2026", "Received", "3"],
    ["05 May 2026 09:15 AM", "Anita Verma", "abc.finance@abc.com", "Statement Request – Jul 2026", "Sent", "1"],
  ];

  const statusBadge = (status) => {
  if (status === "Completed")
    return "bg-green-100 text-green-700";

  if (status === "Active")
    return "bg-orange-100 text-orange-700";

  if (status === "Pending")
    return "bg-blue-100 text-blue-700";

  return "bg-slate-100 text-slate-700";
};

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-3 text-slate-800 sm:p-4">
      <div className="mx-auto max-w-[1800px] space-y-3">

        {/* HEADER ACTIONS */}
        <div className="flex justify-end gap-2">
          <div className="relative">
            <button
              onClick={() => { setVendorMenuOpen(!vendorMenuOpen); setActionsMenuOpen(false); }}
              className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
            >
              Change Vendor <ChevronDown size={12} />
            </button>
            {vendorMenuOpen && (
              <div className="absolute right-0 z-30 mt-1 w-44 rounded border border-slate-200 bg-white p-1 shadow-lg">
                {["ABC Manufacturing Ltd.", "Global Industrial Supply", "Northstar Components"].map((vendor) => (
                  <button key={vendor} onClick={() => setVendorMenuOpen(false)} className="block w-full rounded px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    {vendor}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => { setActionsMenuOpen(!actionsMenuOpen); setVendorMenuOpen(false); }}
              className="inline-flex items-center gap-1 rounded bg-[#0969c8] px-3 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
            >
              Actions <ChevronDown size={12} />
            </button>
            {actionsMenuOpen && (
              <div className="absolute right-0 z-30 mt-1 w-40 rounded border border-slate-200 bg-white p-1 shadow-lg">
                {["Send Statement Request", "Export Vendor View", "Mark for Review"].map((action) => (
                  <button key={action} onClick={() => setActionsMenuOpen(false)} className="block w-full rounded px-3 py-2 text-left text-[10px] text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIX HEADER CARDS */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7b54cf] text-xs font-bold text-white shadow-sm">AM</div>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold text-slate-800">ABC Manufacturing Ltd.</h1>
                <p className="text-[9px] text-slate-500">Vendor ID: VND-100234</p>
                <div className="mt-2 flex gap-3 text-slate-400">
                  <Mail size={12} /><Phone size={12} /><MapPin size={12} />
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="text-[10px] font-medium text-slate-500">Statement Period</div>
            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-800"><CalendarDays size={15} className="text-blue-500" /> Jul 2026</div>
            <div className="mt-2 text-[9px] text-slate-500">01 Jul 2026 – 31 Jul 2026</div>
          </div>

          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="text-[10px] font-medium text-slate-500">Reconciliation Status</div>
            <div className="mt-2 inline-flex rounded bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700">In Progress</div>
            <div className="mt-2 flex items-center gap-2"><span className="text-[9px] text-slate-500">65% Completed</span><div className="h-1.5 flex-1 rounded-full bg-slate-200"><div className="h-1.5 w-[65%] rounded-full bg-[#2d83cf]" /></div></div>
          </div>

          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="text-[10px] font-medium text-slate-500">SLA Status</div>
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-orange-600"><AlertTriangle size={14} /> At Risk</div>
            <div className="mt-2 text-[9px] text-slate-500">Response due in <span className="font-semibold text-orange-600">2 days</span></div>
          </div>

          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="text-[10px] font-medium text-slate-500">Outstanding Exceptions</div>
            <div className="mt-2 text-xl font-bold text-red-500">8</div>
            <div className="text-[9px] text-slate-500">Total Value: $126,540.00</div>
          </div>

          <div className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
            <div className="text-[10px] font-medium text-slate-500">Last Communication</div>
            <div className="mt-2 text-xs font-bold text-slate-800">12 May 2026, 10:30 AM</div>
            <div className="mt-2 text-[9px] text-slate-500">Email sent to vendor</div>
          </div>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-12 gap-4">

          {/* TIMELINE */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
            <div className="flex justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-800">
                Follow-up Timeline
              </h2>

              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-800">
                View All History
              </button>
            </div>

            <div className="space-y-4">

              {timeline.map((item, index) => (
                <div key={index} className="relative grid grid-cols-[32px_minmax(0,1fr)_58px_70px] items-start gap-1">

                  {index !== timeline.length - 1 && (
                    <div className="absolute left-4 top-8 h-14 w-px bg-slate-200" />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-white shadow-sm`}
                  >
                    <CheckCircle size={14} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="break-words text-[10px] font-semibold leading-3 text-slate-700">
                      {item.title}
                    </h4>

                    <p className="mt-1 break-words text-[9px] leading-3 text-slate-500">
                      {item.desc}
                    </p>
                  </div>

                  <span
                    className={`relative -left-5 mt-1 w-fit max-w-full break-words rounded px-1 py-1 text-center text-[8px] font-semibold leading-3 ${statusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  <div className="min-w-0 text-right">
                    <div className="break-words text-[9px] font-medium leading-3 text-slate-500">{item.date}</div>
                    <div className="break-words text-[8px] leading-3 text-slate-400">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TEMPLATES */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-5">
            <div className="flex justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-800">
                Communication Templates
              </h2>

              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-800">
                Manage Templates
              </button>
            </div>

            <div className="space-y-3">

              {templates.map(({ title, desc, icon: Icon, color, bg }) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3 rounded border border-slate-200 bg-[#fbfcfe] px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${bg}`}>
                      <Icon size={15} className={color} strokeWidth={1.8} />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-700">
                        {title}
                      </div>

                      <div className="text-[10px] text-slate-500">
                        {desc}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTemplate(title)}
                    className={`shrink-0 rounded border px-2 py-1 text-[9px] font-semibold ${selectedTemplate === title ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                  >
                    {selectedTemplate === title ? "Selected" : "Use Template"}
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-3 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-[10px] font-semibold text-blue-600 hover:text-blue-800">
              View All Templates <ArrowRight size={13} />
            </button>
          </div>

          {/* SLA */}
          <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-3">
            <div className="flex justify-between">
              <h2 className="text-sm font-bold text-slate-800">
                SLA Monitoring
              </h2>

              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-800">
                View SLA Policy
              </button>
            </div>

            <div className="my-3 grid grid-cols-[116px_minmax(0,1fr)] items-center gap-2 border-b border-slate-100 pb-3">
              <div className="relative h-[104px] w-[104px] shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 110 110" aria-label="2 days remaining">
                  <circle cx="55" cy="55" r="42" fill="none" stroke="#e2e8f0" strokeWidth="9" />
                  <circle cx="55" cy="55" r="42" fill="none" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round" strokeDasharray="190 264" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="mt-2 text-2xl font-bold text-orange-500">
                    2
                  </span>

                  <span className="max-w-[48px] break-words text-center text-[9px] leading-3 text-slate-600">
                    Days<br />Remaining
                  </span>
                </div>
              </div>
              <div className="min-w-0 space-y-1.5 text-[9px] font-medium text-slate-600">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <span>SLA Due Date</span>
                  <span className="font-bold text-slate-800">16 May 2026</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <span>Response Due In</span>
                  <span className="font-bold text-slate-800">2 Days</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <span>SLA Status</span>
                  <span className="rounded bg-red-50 px-1.5 py-1 font-bold text-red-500">At Risk</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <span>Escalation Level</span>
                  <span className="rounded bg-red-50 px-1.5 py-1 font-bold text-red-500">1 Active</span>
                </div>
              </div>
            </div>

            <div className="mt-2 border-t border-slate-200 pt-2">
              <h4 className="mb-2 text-xs font-semibold text-slate-700">
                Response Tracking
              </h4>

              <div className="grid grid-cols-[116px_minmax(0,1fr)] items-center gap-2">
                <div className="relative h-20 w-28 shrink-0">
                  <svg className="h-full w-full" viewBox="0 0 140 90" aria-label="92 percent response rate">
                    <path d="M 20 70 A 50 50 0 0 1 120 70" fill="none" stroke="#e2e8f0" strokeWidth="9" strokeLinecap="round" />
                    <path d="M 20 70 A 50 50 0 0 1 120 70" fill="none" stroke="#4caf50" strokeWidth="9" strokeLinecap="round" pathLength="100" strokeDasharray="92 100" />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="mt-3 text-xl font-bold leading-none text-green-600">
                      92%
                    </span>

                    <span className="whitespace-nowrap text-center text-[9px] leading-3 text-slate-600">
                      Response Rate
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-[9px] font-medium text-slate-600">
                  <div className="grid grid-cols-[1fr_auto] gap-2"><span>Total Requests</span><span className="font-bold text-slate-800">24</span></div>
                  <div className="grid grid-cols-[1fr_auto] gap-2"><span>Responded</span><span className="font-bold text-slate-800">22</span></div>
                  <div className="grid grid-cols-[1fr_auto] gap-2"><span>Pending</span><span className="font-bold text-slate-800">2</span></div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2">
              <div>
                <div className="text-xs font-semibold text-slate-700">Vendor Communication Score</div>
                <div className="mt-0.5 text-[9px] text-slate-500">Based on last 6 months performance</div>
              </div>
              <div className="text-right">
                <div className="mb-1 inline-flex rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600">Good</div>
                <div className="text-base tracking-[0.18em] text-amber-400">★ ★ ★ ★ <span className="text-slate-300">☆</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* OPEN REQUESTS */}
        <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-200 p-3 px-4">
            <h2 className="text-sm font-bold text-slate-800">
              Open Requests
              <span className="ml-2 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">4</span>
            </h2>

            <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-[10px]">
              <thead className="bg-[#f8fafc] text-[9px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2.5 text-left">Request ID</th>
                  <th className="px-3 py-2.5 text-left">Type</th>
                  <th className="px-3 py-2.5 text-left">Subject</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                  <th className="px-3 py-2.5 text-left">Owner</th>
                  <th className="px-3 py-2.5 text-left">Due Date</th>
                  <th className="px-3 py-2.5 text-left">Priority</th>
                  <th className="px-3 py-2.5 text-left">Days Pending</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 text-slate-600 transition hover:bg-blue-50/30">
                    <td className="px-3 py-2.5 font-semibold text-blue-600">
                      {row.id}
                    </td>
                    <td className="px-3 py-2.5">{row.type}</td>
                    <td className="px-3 py-2.5 text-slate-700">{row.subject}</td>
                    <td className="px-3 py-2.5"><span className="rounded bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-700">{row.status}</span></td>
                    <td className="px-3 py-2.5">{row.owner}</td>
                    <td className={`px-3 py-2.5 ${row.priority === "High" ? "font-semibold text-red-500" : ""}`}>{row.dueDate}</td>
                    <td className="px-3 py-2.5"><span className={`rounded px-2 py-1 text-[9px] font-semibold ${row.priority === "High" ? "bg-red-50 text-red-600" : row.priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{row.priority}</span></td>
                    <td className="px-3 py-2.5">{row.daysPending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Follow-up Timeline</h2>
            <button className="text-[9px] font-semibold text-blue-600 hover:text-blue-800">View Calendar</button>
          </div>
          <div className="relative space-y-3">
            <div className="absolute bottom-2 left-[31px] top-2 w-px bg-slate-200" />
            {compactTimeline.map((item) => (
              <div key={item.title} className="relative z-10 grid grid-cols-[30px_10px_1fr_auto] items-center gap-2">
                <div className="text-center leading-none">
                  <div className={`text-[10px] font-bold ${item.state === "active" ? "text-orange-500" : "text-slate-600"}`}>{item.day}</div>
                  <div className="text-[8px] text-slate-400">{item.month}</div>
                </div>
                <div className={`h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm ${item.state === "done" ? "bg-emerald-500" : item.state === "active" ? "bg-orange-500" : "bg-slate-300"}`} />
                <div className={`text-[10px] font-semibold ${item.state === "active" ? "text-slate-800" : "text-slate-600"}`}>{item.title}</div>
                <div className="flex items-center gap-1 text-[9px] text-slate-400">
                  {item.time}
                  {item.state === "done" && <Check size={12} className="text-emerald-500" />}
                  {item.state === "active" && <Clock3 size={12} className="text-orange-500" />}
                  {item.state === "pending" && <Clock3 size={12} className="text-slate-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-7">
            <div className="mb-3 flex justify-between">
              <h2 className="text-sm font-bold text-slate-800">
                Recent Communications
              </h2>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>

            <table className="w-full min-w-[680px] text-[10px]">
              <thead className="bg-[#f8fafc] text-[9px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-2 py-2 text-left">Date & Time</th>
                  <th className="px-2 py-2 text-left">From</th>
                  <th className="px-2 py-2 text-left">To</th>
                  <th className="px-2 py-2 text-left">Subject</th>
                  <th className="px-2 py-2 text-left">Status</th>
                  <th className="px-2 py-2 text-left">Attachments</th>
                </tr>
              </thead>

              <tbody>
                {communications.map(([date, from, to, subject, status, attachments]) => (
                  <tr key={`${date}-${subject}`} className="border-t border-slate-100 text-slate-600">
                    <td className="px-2 py-2.5">{date}</td>
                    <td className="px-2 py-2.5">{from}</td>
                    <td className="px-2 py-2.5">{to}</td>
                    <td className="px-2 py-2.5 text-slate-700">{subject}</td>
                    <td className={`px-2 py-2.5 font-semibold ${status === "Received" ? "text-blue-600" : "text-emerald-600"}`}>{status}</td>
                    <td className="px-2 py-2.5">{attachments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-2">
            <h2 className="mb-3 text-sm font-bold text-slate-800">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded bg-[#0969c8] py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]">
                <Mail size={16} />
                Send Email
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <Phone size={16} />
                Log Phone Call
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <Upload size={16} />
                Upload Document
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
                <ArrowRight size={16} />
                Create Follow-up Task
              </button>
            </div>
          </div>
          <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-3">
            <h2 className="mb-3 text-sm font-bold text-slate-800">
              Notes
            </h2>
            <textarea
              value={note}
              onChange={(event) => { setNote(event.target.value); setNoteSaved(false); }}
              className="h-24 w-full resize-none rounded border border-slate-200 bg-[#fbfcfe] p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Add your notes..."
            />
            <button
              onClick={() => setNoteSaved(true)}
              className="mt-2 w-full rounded bg-[#0969c8] py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
            >
              {noteSaved ? "Note Saved" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}