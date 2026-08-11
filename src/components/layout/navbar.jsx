"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, LayoutGrid, Inbox } from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "RFQ Queue",
    href: "/rfq",
    icon: Inbox,
    // badge: "5",
  },
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
  const indentPx = "10px";
  const weightClass = level > 0 ? "font-normal" : "font-semibold";

  const textVisibilityClass = `transition-opacity duration-200 whitespace-nowrap ${isSidebarOpen
    ? "opacity-100 visible"
    : "lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible"
    }`;

  if (hasChildren) {
    const groupIsActive =
      isActive(item.href) || (item.href ? pathname.includes(item.href) : false);

    return (
      <div className="w-full">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-3 rounded-2xl transition-all duration-300
            ${item.inactive ? "text-gray-500 cursor-not-allowed" : "text-[#9aa0ad] hover:bg-[#1f232c] hover:text-text"}
            ${groupIsActive ? "bg-[#212632] text-text" : ""}
            ${weightClass}`}
          onClick={() => !item.inactive && toggle(key)}
          disabled={item.inactive}
          aria-expanded={open}
        >
          <div className="flex items-center gap-3 min-w-[20px]">
            {Icon && <Icon className="w-5 h-5 shrink-0" />}
            <span className={textVisibilityClass}>{item.name}</span>
          </div>
          <div className={textVisibilityClass}>
            {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </button>

        <div className={`flex flex-col overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}>
          {item.subItems.map((child) => (
            <MenuNode
              key={itemKeyFn(child, key)}
              item={child}
              level={level + 1}
              parentKey={key}
              itemKeyFn={itemKeyFn}
              isActive={isActive}
              openDropdowns={openDropdowns}
              toggle={toggle}
              pathname={pathname}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
      </div>
    );
  }

  const external = !!item.href && item.href.startsWith("http");
  const active = isActive(item.href);

  return (
    <Link
      href={item.inactive ? "#" : item.href || "#"}
      target={external ? "_blank" : "_self"}
      className={`group flex items-center w-full rounded-2xl gap-3 px-4 py-3 text-sm font-medium transition-all duration-200
        ${active ? "bg-[#212632] text-text shadow-sm" : "text-[#9aa0ad] hover:bg-[#1f232c] hover:text-text"}
        ${item.inactive ? "text-gray-500 cursor-not-allowed pointer-events-none" : ""}`}
      style={{ paddingLeft: indentPx }}
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 shrink-0 ${active ? "text-[#e8a030]" : "text-[#9aa0ad] group-hover:text-text"
            }`}
        />
      )}

      <span className={textVisibilityClass}>{item.name}</span>

      {item.badge && (
        <span
          className={`ml-auto rounded-full bg-accent px-3 py-1 text-[10px] font-semibold text-black transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "lg:opacity-0 lg:group-hover:opacity-100"
            }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}