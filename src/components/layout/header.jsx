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
    <header className="top-bar">
      <div className="top-bar-left flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="top-btn"
          type="button"
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        <div>
          <div className="title">{title}</div>
          <div className="label">Last refreshed: just now</div>
        </div>
      </div>

      <div className="top-bar-right">
        <button className="top-btn relative" type="button" title="Notifications">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-dgem-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm select-none">
            99+
          </span>
        </button>

        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="top-btn px-3"
            type="button"
            title="Profile"
          >
            <img
              src="/avatar.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <span className="hidden sm:inline text-sm font-semibold">John Doe</span>
            <ChevronDown size={16} />
          </button>

          <div className={`profile-menu ${profileOpen ? "open" : ""}`}>
            <a href="/profile" className="profile-menu-item">
              <User size={16} />
              My Profile
            </a>
            <a href="/settings" className="profile-menu-item">
              <Settings size={16} />
              Settings
            </a>
            <button className="profile-menu-item w-full text-left">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}