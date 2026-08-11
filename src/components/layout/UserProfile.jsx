"use client";

import { CircleUser, LogOut } from "lucide-react";
import React from "react";

export default function UserProfile({ isSidebarOpen = true }) {

  const handleLogout = () => {
    console.log("Logging out account framework context...");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`
          flex items-center w-full bg-slate-800/60 border border-slate-700/60 text-slate-200 transition-all duration-300 overflow-hidden
          ${isSidebarOpen
            ? 'p-2 rounded-xl justify-between'
            : 'p-2 rounded-xl justify-center lg:w-10 lg:h-10 lg:p-0 lg:bg-transparent lg:border-transparent lg:group-hover:bg-slate-800/60 lg:group-hover:border-slate-700/60 lg:group-hover:w-full lg:group-hover:h-auto lg:group-hover:p-2 lg:group-hover:justify-between'
          }
        `}
      >
        <div className="flex items-center gap-3 shrink-0 justify-center">
          <CircleUser size={24} className="text-blue-400 shrink-0" />

          <span
            className={`text-sm font-medium tracking-wide transition-opacity duration-200 whitespace-nowrap
              ${isSidebarOpen ? 'opacity-100 block' : 'hidden lg:group-hover:block lg:opacity-100'}
            `}
          >
            John Doe
          </span>
        </div>

        {/* <button
          onClick={handleLogout}
          type="button"
          title="Log Out Profile"
          className={`
            p-1.5 rounded-lg bg-slate-700 hover:bg-red-600 hover:text-white transition-all duration-200 text-slate-300 shrink-0
            ${isSidebarOpen ? 'flex' : 'hidden lg:group-hover:flex'}
          `}
        >
          <LogOut size={14} />
        </button> */}
      </div>
    </div>
  );
}
