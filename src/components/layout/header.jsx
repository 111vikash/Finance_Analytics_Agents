"use client";

import { Bell, Menu, ChevronDown, Settings, User, LogOut } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header({ setIsOpen, isOpen }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  let title = "Dashboard";

  if (pathname) {
    if (pathname === "/dashboard") title = "Dashboard";
    else if (pathname === "/reconciliation") title = "Reconciliation Workbench";
    else if (pathname === "/exceptions") title = "Exceptions";
    else if (pathname === "/approvals") title = "Approvals";
    else if (pathname === "/vendors") title = "Communications";
    else if (pathname === "/reports") title = "Reports & Analytics";
    else if (pathname === "/audit") title = "Audit & Compliance";
    else if (pathname === "/settings") title = "Configuration";
    else if (pathname === "/users-roles") title = "Users & Roles";
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold tracking-tight text-slate-900">
                {title}
              </div>

             
            </div>

            {/* <div className="text-xs text-slate-500">Last refreshed: just now</div> */}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
           {/* Agents status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span>Agents Live</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>Standby</span>
              </div>
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-dgem-blue hover:shadow-md"
            type="button"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-dgem-blue px-1 text-[10px] font-bold text-white shadow-sm select-none">
              99+
            </span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
              type="button"
              title="Profile"
            >
              <img
                src="/logo.svg"
                alt="User avatar"
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
              <span className="hidden text-sm font-semibold sm:inline">
                Vigneshwaran
              </span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                profileOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <a
                href="/profile"
                className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-dgem-blue"
              >
                <User size={16} />
                My Profile
              </a>
              <a
                href="/settings"
                className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-dgem-blue"
              >
                <Settings size={16} />
                Settings
              </a>
              <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="w-32">
            <img src="/cg.png" alt="" className="h-8 w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}