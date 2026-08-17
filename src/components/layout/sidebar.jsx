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
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`
          group fixed inset-y-0 left-0 z-50 flex h-full flex-col overflow-hidden
          bg-dgem-dark-blue text-dgem-white
          border-r border-white/10
          shadow-[0_10px_40px_rgba(18,26,56,0.18)]
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          lg:translate-x-0 lg:absolute
          ${isOpen ? "lg:w-64" : "lg:w-16 lg:hover:w-64 lg:hover:shadow-2xl lg:hover:z-50"}
        `}
      >
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-dgem-dark-blue px-4 py-4">
          <div
            className={`
              w-full flex items-center gap-3  whitespace-nowrap transition-all duration-200
              ${isOpen ? "opacity-100" : "lg:opacity-0 lg:group-hover:opacity-100"}
            `}
          >
         

            <div className="flex flex-col items-center w-full">
              <div className="text-base  font-semibold text-dgem-white">
              
         <div className=""> <img src="/pw.png" alt=""  className="h-14  mx-2"/></div>
              </div>
              <div className="pt-2 text-center text-white/70">
                Agentic Statement <br /> reconciliation
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 transition-colors hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {!isOpen && (
            <div className="absolute left-1/2 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex lg:group-hover:hidden">
              <div className="h-8 w-8 rounded-xl bg-dgem-blue" />
            </div>
          )}
        </div>

        <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 scrollbar-thin">
          <Navbar isSidebarOpen={isOpen} />
        </div>
  
        <UserProfile isSidebarOpen={isOpen} />
      </aside>
    </>
  );
}