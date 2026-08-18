// import { Card } from "@/components/common/Card";
// import { ROLE_MATRIX } from "@/utils/constants";

// export default function UsersRolesPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="section-title">Users & Roles</h1>
//         <p className="section-subtitle">
//           Role definitions, responsibilities, and access governance.
//         </p>
//       </div>

//       <div className="grid gap-4 lg:grid-cols-2">
//         {ROLE_MATRIX.map((item) => (
//           <Card key={item.role} className="p-5">
//             <div className="text-sm font-semibold text-brand-700">{item.role}</div>
//             <div className="mt-3">
//               <div className="text-xs uppercase tracking-wide text-slate-400">
//                 Primary Responsibility
//               </div>
//               <div className="mt-1 text-sm text-slate-900">{item.responsibility}</div>
//             </div>
//             <div className="mt-4">
//               <div className="text-xs uppercase tracking-wide text-slate-400">
//                 Key Activities
//               </div>
//               <div className="mt-1 text-sm leading-6 text-slate-600">{item.activities}</div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  Brain,
  Users,
  CheckCircle,
  AlertTriangle,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AuditPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedActivity, setSelectedActivity] =
    useState("All Activities");
  const [selectedEntityType, setSelectedEntityType] =
    useState("All");

  const [filters, setFilters] = useState({
    search: "",
    user: "All Users",
    activity: "All Activities",
    entityType: "All",
  });

  const auditCards = [
    {
      title: "TOTAL ACTIVITIES",
      value: "1,245",
      subtitle: "Recorded audit events",
      icon: Activity,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-100",
    },
    {
      title: "AI RECOMMENDATIONS",
      value: "356",
      subtitle: "Generated recommendations",
      icon: Brain,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100",
    },
    {
      title: "USER ACTIONS",
      value: "789",
      subtitle: "User initiated actions",
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-100",
    },
    {
      title: "APPROVALS",
      value: "68",
      subtitle: "Approved workflows",
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-100",
    },
    {
      title: "EXCEPTIONS CREATED",
      value: "213",
      subtitle: "Open exceptions",
      icon: AlertTriangle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      borderColor: "border-red-100",
    },
  ];

  const auditData = [
    {
      date: "20-May-2025 11:30 AM",
      user: "John Smith",
      role: "AP Analyst",
      activity: "Reconciliation Submitted",
      entityType: "Reconciliation",
      entityId: "STR-2025-0001245",
      details: "Submitted for approval",
    },
    {
      date: "20-May-2025 11:32 AM",
      user: "Emily Davis",
      role: "AP Analyst",
      activity: "AI Recommendation Accepted",
      entityType: "Exception",
      entityId: "EXC-2025-000563",
      details: "Accepted Match to INV-88795",
    },
    {
      date: "20-May-2025 11:33 AM",
      user: "John Smith",
      role: "AP Analyst",
      activity: "Exception Updated",
      entityType: "Exception",
      entityId: "EXC-2025-000563",
      details: "Status changed to In Progress",
    },
    {
      date: "20-May-2025 11:35 AM",
      user: "System",
      role: "System",
      activity: "Email Sent",
      entityType: "Communication",
      entityId: "COMM-2025-7880",
      details: "Request for Invoice Copy",
    },
    {
      date: "20-May-2025 11:40 AM",
      user: "Sarah Wilson",
      role: "Team Lead",
      activity: "Reconciliation Approved",
      entityType: "Reconciliation",
      entityId: "STR-2025-0001245",
      details: "Approved",
    },
  ];

  const users = [
    "All Users",
    ...new Set(auditData.map((item) => item.user)),
  ];

  const activities = [
    "All Activities",
    ...new Set(auditData.map((item) => item.activity)),
  ];

  const entityTypes = [
    "All",
    ...new Set(auditData.map((item) => item.entityType)),
  ];

  const handleApplyFilters = () => {
    setFilters({
      search,
      user: selectedUser,
      activity: selectedActivity,
      entityType: selectedEntityType,
    });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedUser("All Users");
    setSelectedActivity("All Activities");
    setSelectedEntityType("All");

    setFilters({
      search: "",
      user: "All Users",
      activity: "All Activities",
      entityType: "All",
    });
  };

  const filteredData = useMemo(() => {
    return auditData.filter((item) => {
      const searchMatch =
        filters.search === "" ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const userMatch =
        filters.user === "All Users" ||
        item.user === filters.user;

      const activityMatch =
        filters.activity === "All Activities" ||
        item.activity === filters.activity;

      const entityMatch =
        filters.entityType === "All" ||
        item.entityType === filters.entityType;

      return (
        searchMatch &&
        userMatch &&
        activityMatch &&
        entityMatch
      );
    });
  }, [auditData, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[42px] font-bold text-slate-900">
          Audit Trail & Compliance Portal
        </h1>

        <button className="flex items-center gap-2 bg-white border border-[#d8e1ea] px-6 py-3 rounded-xl shadow-sm hover:bg-slate-50">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-6">
        {auditCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`
                bg-white
                border
                ${card.borderColor}
                rounded-3xl
                p-6
                shadow-[0_2px_10px_rgba(15,23,42,0.06)]
                hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]
                transition-all
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    h-14
                    w-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${card.iconBg}
                  `}
                >
                  <Icon
                    className={`h-6 w-6 ${card.iconColor}`}
                  />
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-[3px] font-bold text-slate-500">
                    {card.title}
                  </div>

                  <div className="text-4xl font-bold text-slate-900">
                    {card.value}
                  </div>

                  <div className="text-sm text-emerald-600 mt-1">
                    ↗ {card.subtitle}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    {/* FILTERS */}
      <div className="bg-white border border-[#d8e1ea] rounded-[28px] px-6 py-8 shadow-[0_2px_12px_rgba(15,23,42,0.05)] mb-6">
        
        <div className="flex flex-wrap xl:flex-nowrap items-end gap-4">

          {/* Date Range */}
          <div className="min-w-[170px] flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Date Range
            </label>

            <select className="w-full h-12 rounded-xl border border-[#d8e1ea] px-4 bg-white">
              <option>Last 30 Days</option>
              <option>Last 60 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          {/* User */}
          <div className="min-w-[170px] flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              User
            </label>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full h-12 rounded-xl border border-[#d8e1ea] px-4 bg-white"
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* Activity */}
          <div className="min-w-[170px] flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Activity
            </label>

            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full h-12 rounded-xl border border-[#d8e1ea] px-4 bg-white"
            >
              {activities.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          {/* Entity Type */}
          <div className="min-w-[170px] flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Entity Type
            </label>

            <select
              value={selectedEntityType}
              onChange={(e) => setSelectedEntityType(e.target.value)}
              className="w-full h-12 rounded-xl border border-[#d8e1ea] px-4 bg-white"
            >
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="min-w-[250px] flex-[1.5]">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Search
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 rounded-xl border border-[#d8e1ea] pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-3">
            <button
              onClick={handleApplyFilters}
              className="h-12 px-8 bg-[#2563eb] text-white rounded-xl font-medium hover:bg-[#1d4ed8] whitespace-nowrap"
            >
              Apply Filters
            </button>

            <button
              onClick={handleReset}
              className="h-12 px-8 bg-[#f1f5f9] text-slate-700 rounded-xl font-medium hover:bg-[#e2e8f0] whitespace-nowrap"
            >
              Reset
            </button>
          </div>

        </div>
      </div>
      

      {/* TABLE */}

      <div className="bg-white border border-[#d8e1ea] rounded-[28px] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#d8e1ea]">
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  User
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Role
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Activity
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Entity Type
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Entity ID
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-20 text-slate-400"
                  >
                    No matching audit records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#edf2f7] hover:bg-[#fafcff]"
                  >
                    <td className="px-6 py-5 text-slate-700">
                      {row.date}
                    </td>

                    <td className="px-6 py-5 text-slate-900 font-medium">
                      {row.user}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {row.role}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {row.activity}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {row.entityType}
                    </td>

                    <td className="px-6 py-5 text-blue-600 font-medium">
                      {row.entityId}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {row.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-between px-6 py-5 border-t border-[#d8e1ea]">
          <span className="text-slate-500">
            Showing 1 - {filteredData.length} of{" "}
            {filteredData.length} items
          </span>

          <div className="flex items-center gap-3">
            <button className="h-10 w-10 rounded-lg border border-[#d8e1ea] flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>

            <span className="font-medium">1</span>

            <button className="h-10 w-10 rounded-lg border border-[#d8e1ea] flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}