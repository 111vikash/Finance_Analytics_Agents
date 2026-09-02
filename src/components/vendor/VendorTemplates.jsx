"use client";

import { useState } from "react";
import {
  Mail,
  FileText,
  CircleDollarSign,
  ReceiptText,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

export const VendorTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const templates = [
    {
      title: "Initial Statement Request",
      desc: "Request supplier statement for the period",
      icon: Mail,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Missing Invoice Request",
      desc: "Request details for missing invoices",
      icon: FileText,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Payment Confirmation",
      desc: "Confirm unapplied or mismatched payments",
      icon: CircleDollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Credit Note Clarification",
      desc: "Request clarification for credit notes",
      icon: ReceiptText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Balance Confirmation",
      desc: "Request balance confirmation from vendor",
      icon: FileCheck2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="col-span-12 min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-sm font-semibold text-slate-900">
          Communication Templates
        </h2>

        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
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

                <div className="text-xs  text-slate-600">
                  {desc}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTemplate(title)}
              className={`shrink-0 rounded border px-2 py-1 text-xs  font-semibold ${
                selectedTemplate === title
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {selectedTemplate === title ? "Selected" : "Use Template"}
            </button>
          </div>
        ))}
      </div>
      <button className="mt-3 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-xs font-semibold text-blue-600 hover:text-blue-800">
        View All Templates <ArrowRight size={13} />
      </button>
    </div>
  );
};
