"use client";

import { Mail, Phone, Upload, ArrowRight } from "lucide-react";

export const VendorQuickActions = () => {
  return (
    <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-3">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Quick Actions
      </h2>
      <div className="space-y-2">
        <button className="flex cursor-pointer w-full items-center justify-center gap-2 rounded bg-[#0969c8] py-2 text-xs  font-semibold text-white shadow-sm transition hover:bg-[#0759aa]">
          <Mail size={16} />
          Send Email
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
          <Phone size={16} />
          Log Phone Call
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
          <Upload size={16} />
          Upload Document
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-2 text-xs  font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
          <ArrowRight size={16} />
          Create Follow-up Task
        </button>
      </div>
    </div>
  );
};
