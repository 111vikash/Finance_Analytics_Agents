"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Layers3,
  AlertTriangle,
  ShieldCheck,
  MessageSquareMore,
  BarChart3,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Reconciliation Workbench", href: "/reconciliation", icon: Layers3 },
  { name: "Exceptions", href: "/exceptions", icon: AlertTriangle },
  { name: "Approvals", href: "/approvals", icon: ShieldCheck },
  { name: "Communications", href: "/vendors", icon: MessageSquareMore },
  { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { name: "Audit & Compliance", href: "/audit", icon: ShieldCheck },
  { name: "Configuration", href: "/settings", icon: Settings },
  { name: "Users & Roles", href: "/users-roles", icon: Users },
];

export default function Navbar({ isSidebarOpen }) {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const itemKey = (item, parentKey = "") => `${parentKey}/${item.href ?? item.name}`;
  const pathname = usePathname();

  const toggle = (key) => {
    setOpenDropdowns((s) => ({ ...s, [key]: !s[key] }));
  };

  const isActive = (href) =>
    !!href && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav className="flex flex-col w-full font-semibold text-sm gap-1">
      {navItems.map((item) => (
        <MenuNode
          key={itemKey(item)}
          item={item}
          level={0}
          parentKey=""
          itemKeyFn={itemKey}
          isActive={isActive}
          openDropdowns={openDropdowns}
          toggle={toggle}
          pathname={pathname}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
    </nav>
  );
}

function MenuNode({
  item,
  level,
  parentKey,
  itemKeyFn,
  isActive,
  openDropdowns,
  toggle,
  pathname,
  isSidebarOpen,
}) {
  const key = itemKeyFn(item, parentKey);
  const Icon = item.icon;
  const hasChildren = !!(item.subItems && item.subItems.length > 0);
  const open = !!openDropdowns[key];

  const textVisibilityClass = `transition-opacity duration-200 whitespace-nowrap ${
    isSidebarOpen
      ? "opacity-100 visible"
      : "lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible"
  }`;

  const active = !!item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`));

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-3 rounded-2xl transition-all duration-300
            ${active ? "bg-gradient-to-r from-dgem-blue/10 to-dgem-light-blue/10 text-dgem-blue" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
            ${item.inactive ? "text-slate-400 cursor-not-allowed" : ""}`}
          onClick={() => !item.inactive && toggle(key)}
          disabled={item.inactive}
          aria-expanded={open}
        >
          <div className="flex items-center gap-3 min-w-[20px]">
            {Icon && <Icon className={`w-5 h-5 shrink-0 ${active ? "text-dgem-blue" : "text-slate-500"}`} />}
            <span className={textVisibilityClass}>{item.name}</span>
          </div>
          <div className={textVisibilityClass}>
            {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </button>
      </div>
    );
  }

  const external = !!item.href && item.href.startsWith("http");

  return (
    <Link
      href={item.inactive ? "#" : item.href || "#"}
      target={external ? "_blank" : "_self"}
      className={`group flex items-center w-full rounded-2xl gap-3 px-4 py-3 text-sm font-medium transition-all duration-200
        ${active ? "bg-gradient-to-r from-dgem-blue to-dgem-light-blue text-white shadow-md shadow-dgem-blue/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
        ${item.inactive ? "text-slate-400 cursor-not-allowed pointer-events-none" : ""}`}
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 shrink-0 ${
            active ? "text-white" : "text-slate-500 group-hover:text-slate-900"
          }`}
        />
      )}

      <span className={textVisibilityClass}>{item.name}</span>

      {item.badge && (
        <span
          className={`ml-auto rounded-full bg-dgem-turquoise px-3 py-1 text-[10px] font-semibold text-dgem-dark-blue transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-100" : "lg:opacity-0 lg:group-hover:opacity-100"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}