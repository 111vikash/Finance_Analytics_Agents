// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import axiosInstance from "@/app/lib/api";
// import { Button } from "@/components/common/Button";
// import KpiCard from "@/components/dashboard/KpiCard";
// import AuditTable from "@/components/audit/AuditTable";
// import {
//   Activity,
//   Brain,
//   Users,
//   CheckCircle,
//   AlertTriangle,
//   Download,
//   Search,
//   ChevronDown,
//   Eye,
//   RotateCcw,
// } from "lucide-react";
// import { createColumnHelper } from "@tanstack/react-table";

// const columnHelper = createColumnHelper();

// export default function AuditPage() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [selectedUser, setSelectedUser] = useState("All Users");
//   const [selectedActivity, setSelectedActivity] = useState("All Activities");
//   const [selectedEntityType, setSelectedEntityType] = useState("All");

//   const [filters, setFilters] = useState({
//     search: "",
//     user: "All Users",
//     activity: "All Activities",
//     entityType: "All",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get("/data/audit.json");
//         setData(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         console.error("Error fetching audit data:", error);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const auditCards = useMemo(
//     () => [
//       {
//         title: "TOTAL ACTIVITIES",
//         value: data.length.toLocaleString(),
//         subtitle: "Recorded audit events",
//         icon: Activity,
//         iconColor: "text-blue-600",
//         iconBgColor: "bg-blue-50",
//         borderColor: "border-blue-100",
//       },
//       {
//         title: "AI RECOMMENDATIONS",
//         value: data
//           .filter((item) => (item.activity || "").toLowerCase().includes("ai"))
//           .length.toLocaleString(),
//         subtitle: "Generated recommendations",
//         icon: Brain,
//         iconColor: "text-purple-600",
//         iconBgColor: "bg-purple-50",
//         borderColor: "border-purple-100",
//       },
//       {
//         title: "USER ACTIONS",
//         value: data
//           .filter((item) => item.user && item.user !== "System")
//           .length.toLocaleString(),
//         subtitle: "User initiated actions",
//         icon: Users,
//         iconColor: "text-green-600",
//         iconBgColor: "bg-green-50",
//         borderColor: "border-green-100",
//       },
//       {
//         title: "APPROVALS",
//         value: data
//           .filter((item) => (item.activity || "").toLowerCase().includes("approved"))
//           .length.toLocaleString(),
//         subtitle: "Approved workflows",
//         icon: CheckCircle,
//         iconColor: "text-emerald-600",
//         iconBgColor: "bg-emerald-50",
//         borderColor: "border-emerald-100",
//       },
//       {
//         title: "EXCEPTIONS CREATED",
//         value: data
//           .filter((item) => item.entityType === "Exception")
//           .length.toLocaleString(),
//         subtitle: "Open exceptions",
//         icon: AlertTriangle,
//         iconColor: "text-red-500",
//         iconBgColor: "bg-red-50",
//         borderColor: "border-red-100",
//       },
//     ],
//     [data]
//   );

//   const users = useMemo(
//     () => ["All Users", ...new Set(data.map((item) => item.user).filter(Boolean))],
//     [data]
//   );

//   const activities = useMemo(
//     () => ["All Activities", ...new Set(data.map((item) => item.activity).filter(Boolean))],
//     [data]
//   );

//   const entityTypes = useMemo(
//     () => ["All", ...new Set(data.map((item) => item.entityType).filter(Boolean))],
//     [data]
//   );

//   const handleApplyFilters = () => {
//     setFilters({
//       search,
//       user: selectedUser,
//       activity: selectedActivity,
//       entityType: selectedEntityType,
//     });
//   };

//   const handleReset = () => {
//     setSearch("");
//     setSelectedUser("All Users");
//     setSelectedActivity("All Activities");
//     setSelectedEntityType("All");
//     setFilters({
//       search: "",
//       user: "All Users",
//       activity: "All Activities",
//       entityType: "All",
//     });
//   };

//   const filteredData = useMemo(() => {
//     const q = filters.search.trim().toLowerCase();

//     return data.filter((item) => {
//       const searchMatch =
//         !q ||
//         Object.values(item)
//           .filter((v) => v !== null && v !== undefined)
//           .some((v) => String(v).toLowerCase().includes(q));

//       const userMatch =
//         filters.user === "All Users" || item.user === filters.user;

//       const activityMatch =
//         filters.activity === "All Activities" ||
//         item.activity === filters.activity;

//       const entityMatch =
//         filters.entityType === "All" ||
//         item.entityType === filters.entityType;

//       return searchMatch && userMatch && activityMatch && entityMatch;
//     });
//   }, [data, filters]);

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("date", {
//         header: "Date & Time",
//       }),
//       columnHelper.accessor("user", {
//         header: "User",
//         cell: (info) => (
//           <span className="font-medium text-slate-900">{info.getValue()}</span>
//         ),
//       }),
//       columnHelper.accessor("role", {
//         header: "Role",
//       }),
//       columnHelper.accessor("activity", {
//         header: "Activity",
//       }),
//       columnHelper.accessor("entityType", {
//         header: "Entity Type",
//       }),
//       columnHelper.accessor("entityId", {
//         header: "Entity ID",
//         cell: (info) => (
//           <span className="font-medium text-blue-600">{info.getValue()}</span>
//         ),
//       }),
//       columnHelper.accessor("details", {
//         header: "Details",
//       }),
//       // columnHelper.display({
//       //   id: "actions",
//       //   header: "Action",
//       //   cell: () => (
//       //     <div className="flex items-center gap-2 text-slate-400">
//       //       <button className="transition hover:text-slate-700">
//       //         <Eye size={18} />
//       //       </button>
//       //       <button className="transition hover:text-slate-700">
//       //         <RotateCcw size={18} />
//       //       </button>
//       //     </div>
//       //   ),
//       // }),
//     ],
//     []
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">
//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-[32px] font-bold text-slate-900">
//             Audit Trail & Compliance Portal
//           </h1>
//           <p className="mt-2 text-sm text-slate-500">
//             Role definitions, responsibilities, and access governance.
//           </p>
//         </div>

//         <Button
//           variant="secondary"
//           icon={Download}
//           className="bg-white text-[#0b57d0] hover:bg-slate-100"
//         >
//           Export Report
//         </Button>
//       </div>

//       {/* KPI Cards */}
//       <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
//         {auditCards.map((card) => (
//           <KpiCard
//             key={card.title}
//             vertical
//             label={card.title}
//             value={card.value}
//             change={card.subtitle}
//             isTrendPositive={true}
//             icon={card.icon}
//             iconColor={card.iconColor}
//             iconBgColor={card.iconBgColor}
//             cardBgColor="bg-white"
//             accent={{ border: card.borderColor }}
//           />
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="mb-6 rounded-[28px] border border-[#d8e1ea] bg-white px-6 py-8 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
//         <div className="flex flex-wrap items-end gap-4 xl:flex-nowrap">
//           <div className="min-w-[170px] flex-1">
//             <label className="mb-2 block text-sm font-medium text-slate-500">
//               User
//             </label>
//             <div className="relative">
//               <ChevronDown
//                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <select
//                 value={selectedUser}
//                 onChange={(e) => setSelectedUser(e.target.value)}
//                 className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
//               >
//                 {users.map((user) => (
//                   <option key={user} value={user}>
//                     {user}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="min-w-[170px] flex-1">
//             <label className="mb-2 block text-sm font-medium text-slate-500">
//               Activity
//             </label>
//             <div className="relative">
//               <ChevronDown
//                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <select
//                 value={selectedActivity}
//                 onChange={(e) => setSelectedActivity(e.target.value)}
//                 className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
//               >
//                 {activities.map((activity) => (
//                   <option key={activity} value={activity}>
//                     {activity}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="min-w-[170px] flex-1">
//             <label className="mb-2 block text-sm font-medium text-slate-500">
//               Entity Type
//             </label>
//             <div className="relative">
//               <ChevronDown
//                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <select
//                 value={selectedEntityType}
//                 onChange={(e) => setSelectedEntityType(e.target.value)}
//                 className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
//               >
//                 {entityTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="min-w-[250px] flex-[1.5]">
//             <label className="mb-2 block text-sm font-medium text-slate-500">
//               Search
//             </label>
//             <div className="relative">
//               <Search
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="h-12 w-full rounded-xl border border-[#d8e1ea] pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={handleApplyFilters}
//               className="h-12 whitespace-nowrap rounded-xl bg-[#2563eb] px-8 font-medium text-white hover:bg-[#1d4ed8]"
//             >
//               Apply Filters
//             </button>

//             <button
//               onClick={handleReset}
//               className="h-12 whitespace-nowrap rounded-xl bg-[#f1f5f9] px-8 font-medium text-slate-700 hover:bg-[#e2e8f0]"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <AuditTable
//         data={filteredData}
//         columns={columns}
//         loading={loading}
//         emptyMessage="No matching audit records found."
//       />
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/api";
import { Button } from "@/components/common/Button";
import KpiCard from "@/components/dashboard/KpiCard";
import AuditTable from "@/components/audit/AuditTable";
import {
  Activity,
  Brain,
  Users,
  CheckCircle,
  AlertTriangle,
  Download,
  Search,
  ChevronDown,
} from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function AuditPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    user: "All Users",
    activity: "All Activities",
    entityType: "All",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/data/audit.json");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const auditCards = useMemo(
    () => [
      {
        title: "TOTAL ACTIVITIES",
        value: data.length.toLocaleString(),
        subtitle: "Recorded audit events",
        icon: Activity,
        iconColor: "text-blue-600",
        iconBgColor: "bg-blue-50",
        borderColor: "border-blue-100",
      },
      {
        title: "AI RECOMMENDATIONS",
        value: data
          .filter((item) => (item.activity || "").toLowerCase().includes("ai"))
          .length.toLocaleString(),
        subtitle: "Generated recommendations",
        icon: Brain,
        iconColor: "text-purple-600",
        iconBgColor: "bg-purple-50",
        borderColor: "border-purple-100",
      },
      {
        title: "USER ACTIONS",
        value: data
          .filter((item) => item.user && item.user !== "System")
          .length.toLocaleString(),
        subtitle: "User initiated actions",
        icon: Users,
        iconColor: "text-green-600",
        iconBgColor: "bg-green-50",
        borderColor: "border-green-100",
      },
      {
        title: "APPROVALS",
        value: data
          .filter((item) => (item.activity || "").toLowerCase().includes("approved"))
          .length.toLocaleString(),
        subtitle: "Approved workflows",
        icon: CheckCircle,
        iconColor: "text-emerald-600",
        iconBgColor: "bg-emerald-50",
        borderColor: "border-emerald-100",
      },
      {
        title: "EXCEPTIONS CREATED",
        value: data
          .filter((item) => item.entityType === "Exception")
          .length.toLocaleString(),
        subtitle: "Open exceptions",
        icon: AlertTriangle,
        iconColor: "text-red-500",
        iconBgColor: "bg-red-50",
        borderColor: "border-red-100",
      },
    ],
    [data]
  );

  const users = useMemo(
    () => ["All Users", ...new Set(data.map((item) => item.user).filter(Boolean))],
    [data]
  );

  const activities = useMemo(
    () => ["All Activities", ...new Set(data.map((item) => item.activity).filter(Boolean))],
    [data]
  );

  const entityTypes = useMemo(
    () => ["All", ...new Set(data.map((item) => item.entityType).filter(Boolean))],
    [data]
  );

  const filteredData = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return data.filter((item) => {
      const searchMatch =
        !q ||
        Object.values(item)
          .filter((v) => v !== null && v !== undefined)
          .some((v) => String(v).toLowerCase().includes(q));

      const userMatch =
        filters.user === "All Users" || item.user === filters.user;

      const activityMatch =
        filters.activity === "All Activities" || item.activity === filters.activity;

      const entityMatch =
        filters.entityType === "All" || item.entityType === filters.entityType;

      return searchMatch && userMatch && activityMatch && entityMatch;
    });
  }, [data, filters]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date & Time",
      }),
      columnHelper.accessor("user", {
        header: "User",
        cell: (info) => (
          <span className="font-medium text-slate-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
      }),
      columnHelper.accessor("activity", {
        header: "Activity",
      }),
      columnHelper.accessor("entityType", {
        header: "Entity Type",
      }),
      columnHelper.accessor("entityId", {
        header: "Entity ID",
        cell: (info) => (
          <span className="font-medium text-blue-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("details", {
        header: "Details",
      }),
    ],
    []
  );
const styleMap = {
  Activity: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    cardBgColor: "bg-blue-50/70",
    accent: { border: "border-blue-100" },
  },
  Brain: {
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    cardBgColor: "bg-purple-50/70",
    accent: { border: "border-purple-100" },
  },
  Users: {
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    cardBgColor: "bg-emerald-50/70",
    accent: { border: "border-emerald-100" },
  },
  CheckCircle: {
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    cardBgColor: "bg-green-50/70",
    accent: { border: "border-green-100" },
  },
  AlertTriangle: {
    iconColor: "text-rose-600",  // or text-red-500 as you had
    iconBgColor: "bg-rose-100",
    cardBgColor: "bg-rose-50/70",
    accent: { border: "border-rose-100" },
  },
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f4f8fb] to-[#edf5f8] p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900">
            Audit Trail & Compliance Portal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Role definitions, responsibilities, and access governance.
          </p>
        </div>

        <Button
          variant="secondary"
          icon={Download}
          className="bg-white text-[#0b57d0] hover:bg-slate-100"
        >
          Export Report
        </Button>
      </div>

    {/* KPI Cards */}
<div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
  {auditCards.map((card) => {
   const Icon = card.icon;
const iconName = Icon.displayName || Icon.name || "Activity"; // fallback
const styles = styleMap[iconName] || styleMap.Activity;

    return (
      <KpiCard
        key={card.title}
        vertical
        label={card.title}
        value={card.value}
        change={card.subtitle}
        isTrendPositive={true}
        icon={Icon}
        iconColor={styles.iconColor}
        iconBgColor={styles.iconBgColor}
        cardBgColor={styles.cardBgColor}
        accent={styles.accent}
      />
    );
  })}
</div>

{/* Filters + Table Wrapper */}
<div className="rounded-[28px] border border-[#d8e1ea] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
  {/* Filter Header */}
  <div className="border-b border-[#d8e1ea] px-6 py-5">
    <h2 className="text-sm font-semibold text-slate-900">
      Audit Filters
    </h2>
    <p className="mt-1 text-sm text-slate-500">
      Search and narrow audit events by user, activity, or entity type.
    </p>
  </div>

  {/* Filters */}
  <div className="px-6 py-6">
    <div className="flex flex-wrap items-end gap-4 xl:flex-nowrap">
      <div className="min-w-[250px] flex-[1.5]">
        <label className="mb-2 block text-sm font-medium text-slate-500">
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
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="h-12 w-full rounded-xl border border-[#d8e1ea] pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="min-w-[170px] flex-1">
        <label className="mb-2 block text-sm font-medium text-slate-500">
          User
        </label>
        <div className="relative">
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <select
            value={filters.user}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, user: e.target.value }))
            }
            className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-w-[170px] flex-1">
        <label className="mb-2 block text-sm font-medium text-slate-500">
          Activity
        </label>
        <div className="relative">
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <select
            value={filters.activity}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, activity: e.target.value }))
            }
            className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
          >
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-w-[170px] flex-1">
        <label className="mb-2 block text-sm font-medium text-slate-500">
          Entity Type
        </label>
        <div className="relative">
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <select
            value={filters.entityType}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                entityType: e.target.value,
              }))
            }
            className="h-12 w-full rounded-xl border border-[#d8e1ea] bg-white px-4 pr-10 outline-none"
          >
            {entityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>

  {/* Table */}
  <div className="border-t border-[#d8e1ea]">
    <AuditTable
      data={filteredData}
      columns={columns}
      loading={loading}
      emptyMessage="No matching audit records found."
    />
  </div>
</div>
    </div>
  );
}