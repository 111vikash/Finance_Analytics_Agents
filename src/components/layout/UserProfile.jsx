"use client";

import { LogOut, Settings, UserCircle2 } from "lucide-react";
import React from "react";

export default function UserProfile({ isSidebarOpen = true }) {
  const handleLogout = () => {
    console.log("Logout will be connected later.");
  };

  return (
    <div className="flex items-center justify-center m-4">
      <div
        className={`
          flex items-center w-full bg-slate-50 border border-slate-200 text-dgem-dark-blue transition-all duration-300 overflow-hidden
          shadow-sm
          ${isSidebarOpen
            ? "p-2 rounded-2xl justify-between"
            : "p-2 rounded-2xl justify-center lg:w-10 lg:h-10 lg:p-0 lg:bg-transparent lg:border-transparent lg:group-hover:bg-slate-50 lg:group-hover:border-slate-200 lg:group-hover:w-full lg:group-hover:h-auto lg:group-hover:p-2 lg:group-hover:justify-between"
          }
        `}
      >
        <div className="flex items-center gap-3 shrink-0 justify-center">
          <img
            src="/avatar.jpg"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
          />

          <span
            className={`text-sm font-semibold tracking-wide transition-opacity duration-200 whitespace-nowrap
              ${isSidebarOpen ? "opacity-100 block" : "hidden lg:group-hover:block lg:opacity-100"}
            `}
          >
            John Doe
          </span>
        </div>

        <div className={`flex items-center gap-1 ${isSidebarOpen ? "flex" : "hidden lg:group-hover:flex"}`}>
          <button
            type="button"
            title="My Profile"
            className="p-1.5 rounded-lg bg-white hover:bg-dgem-light-blue/10 hover:text-dgem-blue transition-all duration-200 text-slate-500 border border-slate-200"
          >
            <UserCircle2 size={14} />
          </button>

          <button
            type="button"
            title="Settings"
            className="p-1.5 rounded-lg bg-white hover:bg-dgem-light-blue/10 hover:text-dgem-blue transition-all duration-200 text-slate-500 border border-slate-200"
          >
            <Settings size={14} />
          </button>

          <button
            onClick={handleLogout}
            type="button"
            title="Log Out"
            className="p-1.5 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-slate-500 border border-slate-200"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}