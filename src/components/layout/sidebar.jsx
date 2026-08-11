"use client";

import React from "react";
import Navbar from "./navbar";
import UserProfile from "./UserProfile";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile & Tablet Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          group fixed inset-y-0 left-0 z-50 flex h-full flex-col
          text-text border-r border-border
          transition-all duration-300 ease-in-out overflow-hidden

          bg-bgbase

          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}

          lg:translate-x-0 lg:absolute
          ${isOpen
            ? "lg:w-64"
            : "lg:w-16 lg:hover:w-64 lg:hover:shadow-2xl lg:hover:z-50"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="flex  p-[1.43rem_1.5rem_24px]  shrink-0 items-center justify-between px-4 border-b border-border relative overflow-hidden  bg-bgbase">
          {/*  hover-expanded header */}
          <div
            className={`
              flex items-center gap-3 transition-all duration-200 whitespace-nowrap
              ${isOpen ? "opacity-100" : "lg:group-hover:flex lg:group-hover:opacity-100 lg:opacity-0"}
            `}
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-8 shrink-0 object-contain"
            />

            <div>
              <div className="text-md font-semibold text-text">RFQ Automation</div>
              <div className="text-xs text-[#9aa0ad]">Email to Quote</div>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#9aa0ad] hover:text-text lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>


          {!isOpen && (
            <div className="hidden lg:flex lg:group-hover:hidden w-8 h-8 shrink-0 items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
          )}
        </div>

        {/* Navbar */}
        <div className="relative flex-1 w-full px-3 overflow-y-auto py-4 overflow-x-hidden scrollbar-thin">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('/bgImg.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          <div className="relative z-10">
            <Navbar isSidebarOpen={isOpen} />
          </div>
        </div>
      </aside>
    </>
  );
}