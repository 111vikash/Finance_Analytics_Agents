"use client";

import { Bell, Menu, MessageSquareMore } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import UserProfile from "./UserProfile";

export default function Header({ setIsOpen, isOpen }) {
  const pathname = usePathname();

  let titles = "Dashboard";


  if (pathname) {
    if (pathname === "/dashboard") {
      titles = "Dashboard";
    } else if (pathname === "/rfq") {
      titles = "AI RFQ Generator";
    } else if (pathname.startsWith("/rfq/")) {
      titles = "RFQ Details";
    }
  }
  const title = titles;

  return (
    <header className="top-bar">
      <div className="top-bar-left flex items-center gap-2">


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="top-btn"
          type="button"
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>
        <div >

          <div className="title  ">{title}</div>
          <div className="text-xs label text-[#9aa0ad]">Last Refreshed: Just now</div>
        </div>
      </div>

      <div className="top-bar-right">
        <div className="relative cursor-pointer group">
          <button className="top-btn relative" type="button" title="Notifications">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-bgbase shadow-sm select-none">
              99+
            </span>
          </button>
        </div>


      </div>
    </header >
  );
}