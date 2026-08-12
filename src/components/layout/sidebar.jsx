"use client";

import React from "react";
import Navbar from "./navbar";
import UserProfile from "./UserProfile";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-dgem-dark-blue/30 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`
          group fixed inset-y-0 left-0 z-50 flex h-full flex-col
          bg-white text-dgem-dark-blue border-r border-slate-200
          shadow-[0_10px_40px_rgba(18,26,56,0.08)]
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          lg:translate-x-0 lg:absolute
          ${isOpen ? "lg:w-64" : "lg:w-16 lg:hover:w-64 lg:hover:shadow-2xl lg:hover:z-50"}
        `}
      >
        <div className="flex p-[1.43rem_1.5rem_24px] shrink-0 items-center justify-between px-4 border-b border-slate-200 relative overflow-hidden bg-white">
          <div
            className={`
              flex items-center gap-3 transition-all duration-200 whitespace-nowrap
              ${isOpen ? "opacity-100" : "lg:group-hover:flex lg:group-hover:opacity-100 lg:opacity-0"}
            `}
          >
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-dgem-blue to-dgem-light-blue flex items-center justify-center text-white font-bold shadow-md">
              R
            </div>

            <div>
              <div className="text-md font-semibold text-dgem-dark-blue">ReconFlow</div>
              <div className="text-xs text-slate-500">Statement Reconciliation</div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-dgem-dark-blue lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {!isOpen && (
            <div className="hidden lg:flex lg:group-hover:hidden w-8 h-8 shrink-0 items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-dgem-blue to-dgem-light-blue" />
            </div>
          )}
        </div>

        <div className="relative flex-1 w-full px-3 overflow-y-auto py-4 overflow-x-hidden scrollbar-thin">
          <div className="relative z-10">
            <Navbar isSidebarOpen={isOpen} />
          </div>
        </div>

        <UserProfile isSidebarOpen={isOpen} />
      </aside>
    </>
  );
}